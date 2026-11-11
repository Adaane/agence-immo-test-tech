# Visites immersives as pre-rendered WebP frames committed to the repo

Each Visite immersive is built from AI-generated camera transitions (Nano Banana keyframes, Kling v3.0 std clips in 1080p), cut into WebP frames and played on scroll with GSAP ScrollTrigger and Lenis. The frames live in `public/scroll-video/` and are committed, so the site runs after a clone without an OpenRouter key; the generation sources (`scroll-video/`: keyframes, mp4 clips, caches) are git-ignored.

## Considered Options

- **`<video>` with `currentTime` driven by scroll**: rejected, seeking is choppy on Safari and depends on keyframe density of the encode.
- **Regenerate frames on demand, commit nothing**: rejected, every clone would need a paid API key and minutes of generation.

## Consequences

- The repo grows by about 84 MB of frames for the three Exclusivités (12 fps, 1600 px desktop, 720 px mobile, WebP quality 60). The first extraction at 24 fps and 1920 px weighed 272 MB.
- Only Exclusivités get a Visite immersive, which bounds both the generation cost and the repo weight.
