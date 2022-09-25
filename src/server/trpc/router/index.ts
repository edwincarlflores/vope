// src/server/router/index.ts
import { t } from "../trpc";
import { topicsRouter } from "./topics";

export const appRouter = t.router({
  topics: topicsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
