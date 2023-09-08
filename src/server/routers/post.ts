/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { prisma } from "@/server/prisma";

export const postRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ input }) => {
      const items = await prisma.vocabulary.findFirst();

      return {
        items,
      };
    }),
});
