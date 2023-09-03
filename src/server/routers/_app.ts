/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from '../trpc';
import { postRouter } from './post';
import { vocabularyRouter } from './vocabulary';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),

  post: postRouter,
  vocabulary: vocabularyRouter,
});

export type AppRouter = typeof appRouter;
