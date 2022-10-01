import { Prisma } from "@prisma/client";

type TVote = Pick<Prisma.VoteCreateInput, "dope" | "voterToken">;
type TVoteCountGroupByType = {
  dopes: number;
  nopes: number;
};

export const groupVoteCountByType = (votes: TVote[]) => {
  return votes.reduce(
    (group: TVoteCountGroupByType, vote) => {
      if (vote.dope) {
        group.dopes++;
      } else {
        group.nopes++;
      }

      return group;
    },
    { dopes: 0, nopes: 0 }
  );
};

type TComputeLowerBoundScoreParams = {
  dopes: number;
  nopes: number;
};

// Score = Lower bound of Wilson score confidence interval for a Bernoulli parameter
// https://www.evanmiller.org/how-not-to-sort-by-average-rating.html
// NOTE: This is under the assumption that all items will have
// an equal number of votes after a voter finished voting
export const computeLowerBoundScore = ({
  dopes,
  nopes,
}: TComputeLowerBoundScoreParams) => {
  return dopes + nopes > 0
    ? ((dopes + 1.9208) / (dopes + nopes) -
        (1.96 * Math.sqrt((dopes * nopes) / (dopes + nopes) + 0.9604)) /
          (dopes + nopes)) /
        (1 + 3.8416 / (dopes + nopes))
    : 0;
};
