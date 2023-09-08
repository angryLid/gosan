import { z } from "zod";
import { prisma } from "../prisma";
import { publicProcedure, router } from "../trpc";

export const courseRouter = router({
  getAll: publicProcedure.query(() => {
    return prisma.course.findMany();
  }),
  insertOne: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      return prisma.course.create({
        data: input,
      });
    }),
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return prisma.course.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
});
