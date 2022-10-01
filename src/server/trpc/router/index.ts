import { t } from "../trpc";
import { topicsRouter } from "./topics";
import { itemsRouter } from "./items";
import { votesRouter } from "./votes";

export const appRouter = t.router({
  topics: topicsRouter,
  items: itemsRouter,
  votes: votesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
