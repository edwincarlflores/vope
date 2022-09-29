import { t } from "../trpc";
import { z } from "zod";

export const itemsRouter = t.router({
  create: t.procedure
    .input(z.object({ topicId: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.item.create({
        data: {
          topicId: input.topicId,
          name: input.name,
        },
      });
    }),
  itemsByTopicId: t.procedure
    .input(z.object({ topicId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.item.findMany({
        where: {
          topicId: input.topicId,
        },
      });
    }),
});
