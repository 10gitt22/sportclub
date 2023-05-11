import { createTRPCRouter } from "@/server/api/trpc";
import { trainerRouter } from "./routers/trainer";
import { abonementRouter } from "./routers/abonement";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  trainer: trainerRouter,
  abonement: abonementRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
