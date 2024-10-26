import { z } from "zod";

const FileSchema = z.instanceof(File);

export const VideoSchema = z.object({
  model: z.string().optional(),
  prompt: z.string().optional(),
  firstFrame: z.union([FileSchema, z.null()]).optional(),
  lastFrame: z.union([FileSchema, z.null()]).optional(),
  time: z.string().optional(),
});
