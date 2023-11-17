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
    getUserBooks: protectedProcedure
    .query(async ({ctx}) => {
      return await ctx.db.user.findUnique({
        where: {
          id: ctx.session.user.id
        },
        include: {
          books: true
        }
      })
    })
});
