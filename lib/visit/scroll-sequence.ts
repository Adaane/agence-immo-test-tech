// Scroll-driven frame sequences (GSAP ScrollTrigger + Lenis + canvas).
// Ported from the scroll-video-site template. Each manifest scene renders:
// pinned stage → card expands to full-bleed → frames scrub → card shrinks,
// with eyebrow/title/steps cycling.

import type { gsap as Gsap } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";
import type LenisType from "lenis";
import type { VisitManifest } from "./manifest";

type Scene = VisitManifest["scenes"][number];
type FrameSequence = Scene["frames"]["desktop"];

const pad = (n: number, width: number) => String(n).padStart(width, "0");

const frameUrl = (seq: FrameSequence, i: number) =>
  `${seq.path}${pad(i + 1, seq.pad)}.${seq.ext}`;

/** Load order: first frame, then a coarse pass (every 8th), then the rest. */
export function frameLoadOrder(count: number): number[] {
  const order = [0];
  for (let i = 8; i < count; i += 8) order.push(i);
  for (let i = 1; i < count; i++) if (i % 8) order.push(i);
  return order;
}

function loadSequence(
  seq: FrameSequence,
  order: number[],
  onFirst: () => void,
) {
  const images: (HTMLImageElement | undefined)[] = new Array(seq.count);
  let cancelled = false;
  let cursor = 0;
  const loadNext = () => {
    const i = order[cursor++];
    if (cancelled || i === undefined) return;
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      images[i] = img;
      if (i === order[0]) onFirst();
      loadNext();
    };
    img.onerror = loadNext;
    img.src = frameUrl(seq, i);
  };
  for (let lane = 0; lane < 6; lane++) loadNext();
  return {
    images,
    cancel: () => {
      cancelled = true;
    },
  };
}

function nearestLoaded(images: (HTMLImageElement | undefined)[], i: number) {
  for (let d = 0; d < images.length; d++) {
    const img = images[i - d] ?? images[i + d];
    if (img) return img;
  }
  return null;
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
) {
  const scale = Math.max(
    canvas.width / img.naturalWidth,
    canvas.height / img.naturalHeight,
  );
  const w = img.naturalWidth * scale;
  const h = img.naturalHeight * scale;
  ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
}

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className: string,
  text?: string,
) {
  const node = document.createElement(tag);
  node.className = className;
  if (text) node.textContent = text;
  return node;
}

function buildScene(scene: Scene) {
  const section = el("section", "ssq-scene");
  section.dataset.theme = scene.theme;
  const stage = el("div", "ssq-stage");
  const card = el("div", "ssq-card");
  const canvas = el("canvas", "ssq-canvas");
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", scene.title);
  card.append(canvas);
  const copy = el("div", "ssq-copy");
  if (scene.eyebrow) copy.append(el("p", "ssq-eyebrow", scene.eyebrow));
  copy.append(el("h2", "ssq-title", scene.title));
  const steps = el("ul", "ssq-steps");
  for (const step of scene.steps) steps.append(el("li", "ssq-step", step));
  copy.append(steps);
  stage.append(card, copy);
  section.append(stage);
  return {
    section,
    stage,
    card,
    canvas,
    steps: [...steps.children] as HTMLElement[],
  };
}

export type ScrollSequenceOptions = {
  root: HTMLElement;
  manifest: VisitManifest;
  gsap: typeof Gsap;
  ScrollTrigger: typeof ScrollTriggerType;
  Lenis: typeof LenisType;
  pxPerFrame?: number;
  mobileBreakpoint?: number;
};

/** Mounts the visit into `root` and returns a cleanup function. */
export function initScrollSequence({
  root,
  manifest,
  gsap,
  ScrollTrigger,
  Lenis,
  pxPerFrame = 12,
  mobileBreakpoint = 768,
}: ScrollSequenceOptions): () => void {
  gsap.registerPlugin(ScrollTrigger);

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const variant = innerWidth < mobileBreakpoint ? "mobile" : "desktop";
  const cleanups: (() => void)[] = [];
  root.classList.add("ssq-root");

  // Smooth scroll, synced with ScrollTrigger through the GSAP ticker.
  if (!reduced) {
    const lenis = new Lenis({ autoRaf: false });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    cleanups.push(() => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    });
  }

  const ctx = gsap.context(() => {
    for (const scene of manifest.scenes) {
      const seq =
        scene.frames[variant].count > 0
          ? scene.frames[variant]
          : scene.frames.desktop;
      const view = buildScene(scene);
      root.append(view.section);
      const c2d = view.canvas.getContext("2d");
      const state = { frame: reduced ? seq.count - 1 : 0 };

      const render = () => {
        const img = nearestLoaded(loader.images, Math.round(state.frame));
        if (img && c2d) drawCover(c2d, view.canvas, img);
      };
      const resize = () => {
        const rect = view.canvas.getBoundingClientRect();
        const dpr = Math.min(devicePixelRatio || 1, 2);
        view.canvas.width = Math.max(1, Math.round(rect.width * dpr));
        view.canvas.height = Math.max(1, Math.round(rect.height * dpr));
        render();
      };
      // Reduced motion only shows the last frame.
      const loader = loadSequence(
        seq,
        reduced ? [seq.count - 1] : frameLoadOrder(seq.count),
        resize,
      );
      addEventListener("resize", resize);
      cleanups.push(() => {
        removeEventListener("resize", resize);
        loader.cancel();
      });

      if (reduced) {
        view.section.classList.add("ssq-static");
        continue;
      }

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: view.section,
          start: "top top",
          end: `+=${Math.max(seq.count * pxPerFrame, innerHeight * 2)}`,
          pin: view.stage,
          scrub: true,
          onRefresh: resize,
        },
      });
      // 0 → 0.15: card expands to full-bleed; 0.15 → 0.85: frames scrub;
      // 0.85 → 1: card shrinks back.
      tl.fromTo(
        view.card,
        { "--ssq-inset": 1 },
        { "--ssq-inset": 0, duration: 0.15 },
        0,
      )
        .to(
          state,
          { frame: seq.count - 1, duration: 0.7, onUpdate: render },
          0.15,
        )
        .to(view.card, { "--ssq-inset": 1, duration: 0.15 }, 0.85);

      const n = view.steps.length;
      view.steps.forEach((step, i) => {
        const len = 0.8 / Math.max(n, 1);
        const at = 0.1 + len * i;
        tl.fromTo(
          step,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: len * 0.3 },
          at,
        );
        if (i < n - 1) {
          tl.to(
            step,
            { autoAlpha: 0, y: -16, duration: len * 0.25 },
            at + len * 0.75,
          );
        }
      });
    }
  }, root);

  ScrollTrigger.refresh();

  return () => {
    ctx.revert();
    for (const cleanup of cleanups) cleanup();
    root.replaceChildren();
    root.classList.remove("ssq-root");
  };
}
