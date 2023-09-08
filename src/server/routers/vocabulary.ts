import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "../prisma";

export const vocabularyRouter = router({
  save: publicProcedure
    .input(
      z.object({
        courseName: z.string(),
        list: z.array(
          z.object({
            word: z.string(),
            explaination: z.string(),
            pronunciation: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      const course = await prisma.course.create({
        data: {
          name: input.courseName,
        },
      });
      const courseId = course.id;
      for (const w of input.list) {
        await prisma.vocabulary.create({
          data: {
            ...w,
            courseId,
          },
        });
      }
    }),
  saveToExistedCourse: publicProcedure
    .input(
      z.object({
        courseId: z.number(),
        list: z.array(
          z.object({
            word: z.string(),
            explaination: z.string(),
            pronunciation: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      const promises = input.list.map((w) =>
        prisma.vocabulary.create({
          data: {
            ...w,
            courseId: input.courseId,
          },
        })
      );

      await Promise.all(promises);
    }),
});
