import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

export const trainerRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.trainer.findMany();
  }),
});
