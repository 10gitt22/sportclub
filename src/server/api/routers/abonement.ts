import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

export const abonementRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.abonement.findMany()
  }),
});