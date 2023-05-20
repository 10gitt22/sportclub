import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import { z } from "zod";

export const abonementRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.abonement.findMany()
  }),
  getById: publicProcedure.input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.abonement.findFirst({
        where: {
          id: Number(input.id)
        }
      })
    })
});
