import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    findUser: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(({ ctx, input }) => {
        const user = ctx.db.user.findUnique({where: {email: input.email}})
        return user;
      }),
});
