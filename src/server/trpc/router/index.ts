import { t } from "../trpc";
import { topicsRouter } from "./topics";
import { itemsRouter } from "./items";

export const appRouter = t.router({
  topics: topicsRouter,
  items: itemsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
