import { createTRPCRouter } from "./trpc";
import { referralRouter } from "./routers/referral";

export const appRouter = createTRPCRouter({
  referral: referralRouter,
});

export type AppRouter = typeof appRouter;