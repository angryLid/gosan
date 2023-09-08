/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from "../trpc";
import { courseRouter } from "./course";
import { clozeRouter } from "./cloze";
import { vocabularyRouter } from "./vocabulary";

export const appRouter = router({
  healthcheck: publicProcedure.query(() => "yay!"),

  cloze: clozeRouter,
  vocabulary: vocabularyRouter,
  course: courseRouter,
});

export type AppRouter = typeof appRouter;
