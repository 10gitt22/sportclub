import {
  createTRPCRouter,
  protectedProcedure,

} from "@/server/api/trpc";
import { prisma } from "@/server/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";


export const profileRouter = createTRPCRouter({
  getUser: protectedProcedure.query(async ({ ctx }) => {
    const dbUser = await prisma.user.findFirst({
      where: {
        id: ctx.session.user.id
      }
    })
    return dbUser
  }),
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const clientProfile = await prisma.client.findFirst({
      where: {
        userId: ctx.session.user.id
      }
    })
    return clientProfile
  }),
  createProfile: protectedProcedure.input(z.object({
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.string(),
    email: z.string(),
    userId: z.string()
  })).mutation(async ({ ctx, input }) => {
    const clientProfile = await ctx.prisma.client.create({
      data: input
    })
    return clientProfile
  })
});
