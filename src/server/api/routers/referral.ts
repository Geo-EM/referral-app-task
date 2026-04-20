import { referralSchema } from "@/schemas/referral";
import { db } from "@/server/db";
import { referrals } from "@/server/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const referralRouter = createTRPCRouter({
  submitReferral: publicProcedure
    .input(referralSchema)
    .mutation(async ({ input }) => {
      try {
        const [result] = await db.insert(referrals).values(input).returning();

        return {
          id: result.id,
          message: "Referral submitted successfully",
          followUp: "Our team will contact within 24 hours",
        };
      } catch (e) {
        console.error("submitReferral", e);
        throw new Error("Database error");
      }
    }),

  getReferrals: publicProcedure.query(async () => {
    try {
      return await db.select().from(referrals);
    } catch (e) {
      console.error("getReferrals", e);
      throw new Error("Database error");
    }
  }),
});
