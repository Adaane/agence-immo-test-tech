import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { z } from "zod";

const frameSequenceSchema = z.object({
  path: z
    .string()
    .regex(/^\/scroll-video\/[a-z0-9-]+\/[a-z0-9-]+\/(desktop|mobile)\/$/),
  count: z.number().int().nonnegative(),
  ext: z.literal("webp"),
  pad: z.number().int().positive(),
});

export const visitManifestSchema = z.object({
  version: z.literal(1),
  fps: z.number().positive(),
  scenes: z
    .array(
      z.object({
        id: z.string().min(1),
        theme: z.enum(["light", "dark"]),
        eyebrow: z.string(),
        title: z.string().min(1),
        steps: z.array(z.string().min(1)).max(3),
        frames: z.object({
          desktop: frameSequenceSchema.extend({
            count: z.number().int().positive(),
          }),
          mobile: frameSequenceSchema,
        }),
      }),
    )
    .min(1),
});

export type VisitManifest = z.infer<typeof visitManifestSchema>;

/** Reads and validates a visit manifest served from `public/`. */
export async function loadVisitManifest(
  manifestUrl: string,
): Promise<VisitManifest> {
  // Manifests are build artifacts: cache the read so the Fiche prerenders.
  "use cache";
  const file = join(process.cwd(), "public", manifestUrl);
  return visitManifestSchema.parse(JSON.parse(await readFile(file, "utf8")));
}
