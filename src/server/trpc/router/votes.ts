import { t } from "../trpc";
import { z } from "zod";

export const votesRouter = t.router({
  createAll: t.procedure
    .input(
      z.array(
        z.object({
          itemId: z.string(),
          dope: z.boolean(),
          voterToken: z.string(),
        })
      )
    )
    .mutation(async ({ ctx, input }) => {
      return await Promise.all(
        input.map(async ({ itemId, dope, voterToken }) => {
          return await ctx.prisma.vote.create({
            data: {
              itemId,
              dope,
              voterToken,
            },
          });
        })
      );
    }),
});
