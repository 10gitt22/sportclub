import {
  createTRPCRouter,
  protectedProcedure,

} from "@/server/api/trpc";
import { prisma } from "@/server/db";
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
    profileImage: z.string().nullable(),
    email: z.string(),
    userId: z.string()
  })).mutation(async ({ ctx, input }) => {
    const profile = {
      ...input,
      profileImage: input.profileImage?.replace('s96-c', 's400-c') || null
    }
    const clientProfile = await ctx.prisma.client.create({
      data: profile
    })
    return clientProfile
  }),
  updateProfile: protectedProcedure.input(z.object({
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.string()
  })).mutation(async ({ ctx, input }) => {
    const updatedProfile = await ctx.prisma.client.update({
      where: {
        userId: ctx.session.user.id
      },
      data: input
    })
    return updatedProfile
  })
});
