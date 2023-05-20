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
  })
});
