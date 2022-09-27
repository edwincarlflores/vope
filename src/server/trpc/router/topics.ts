import { t } from "../trpc";
import { z } from "zod";

export const topicsRouter = t.router({
  all: t.procedure.query(async ({ ctx }) => {
    return await ctx.prisma.topic.findMany();
  }),
  topic: t.procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.topic.findFirst({
        where: {
          id: input.id,
        },
      });
    }),
  create: t.procedure
    .input(z.object({ title: z.string(), ownerToken: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.topic.create({
        data: {
          title: input.title,
          ownerToken: input.ownerToken,
        },
      });
    }),
});
