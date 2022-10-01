import { t } from "../trpc";
import { z } from "zod";
import {
  computeLowerBoundScore,
  groupVoteCountByType,
} from "../../../utils/rank";

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
        include: {
          items: true,
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
  topicWithRankedItems: t.procedure
    .input(z.object({ topicId: z.string() }))
    .query(async ({ ctx, input }) => {
      const topic = await ctx.prisma.topic.findFirst({
        where: {
          id: input.topicId,
        },
        include: {
          items: {
            include: {
              Vote: {
                select: {
                  dope: true,
                  voterToken: true,
                },
              },
            },
          },
        },
      });

      if (topic === null) {
        return topic;
      }

      const topicItemsCopy = [...topic.items];

      const rankedItems = topicItemsCopy
        .map(({ id, name, image, url, Vote }) => {
          const votesByResult = groupVoteCountByType(Vote);
          const { dopes, nopes } = votesByResult;
          const score = computeLowerBoundScore({ dopes, nopes });

          return { id, name, image, url, dopes, nopes, score };
        })
        .sort((a, b) => b.score - a.score);

      const topicWithRankedItems = {
        id: topic.id,
        title: topic.title,
        ownerToken: topic.ownerToken,
        items: rankedItems,
      };

      return topicWithRankedItems;
    }),
});
