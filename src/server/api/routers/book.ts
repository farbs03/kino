import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const bookRouter = createTRPCRouter({
    getAllBooks: publicProcedure.query(({ ctx }) => {
        return ctx.db.book.findMany()
      }),
    getBook: publicProcedure
    .input(z.object({id: z.number()}))
    .query(async ({ctx, input}) => {
      return ctx.db.book.findUnique({
        where: {
          id: input.id
        }
      })
    })
});
