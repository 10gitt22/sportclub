import {
  createTRPCRouter, protectedProcedure,
} from "@/server/api/trpc";
import { z } from "zod";

export const appointmentRouter = createTRPCRouter({
  createAppointment: protectedProcedure.input(z.object({
    clientId: z.number(),
    abonementId: z.number(),
    trainerId: z.number().nullable(),
    startDate: z.string().length(10),
    endDate: z.string().length(10)
  })).mutation(async ({ ctx, input }) => {
    const appointment = await ctx.prisma.appointment.create({
      data: input
    })
    return appointment
  }),
  getAppointments: protectedProcedure.input(z.number()).query(async ({ ctx, input }) => {
    const appointments = await ctx.prisma.appointment.findMany({
      where: {
        clientId: input, 
      },
      include: {
        client: true,
        abonement: true,
        trainer: true
      }
    })
    return appointments
  }),
  deleteAppointment: protectedProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    const appointment = await ctx.prisma.appointment.delete({
      where: {
        id: input
      }
    })
    return appointment
  })
});
