/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from "../trpc";
import { courseRouter } from "./course";
import { postRouter } from "./post";
import { vocabularyRouter } from "./vocabulary";

export const appRouter = router({
  healthcheck: publicProcedure.query(() => "yay!"),

  post: postRouter,
  vocabulary: vocabularyRouter,
  course: courseRouter,
});

export type AppRouter = typeof appRouter;
