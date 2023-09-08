/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { prisma } from "@/server/prisma";

export const clozeRouter = router({
  save: publicProcedure
    .input(
      z.object({
        id: z.number(),
        content: z.array(z.string()),
      })
    )
    .mutation(async ({ input }) => {
      const promises = [];
      for (const c of input.content) {
        promises.push(
          prisma.cloze.create({
            data: {
              courseId: input.id,
              content: c,
            },
          })
        );
      }
      await Promise.all(promises);
    }),

  getAllByCourse: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return prisma.cloze.findMany({
        where: {
          courseId: input.id,
        },
      });
    }),
});
