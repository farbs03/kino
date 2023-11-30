import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userBookRouter = createTRPCRouter({
    getUserBook: protectedProcedure
    .input(z.object({ bookId: z.number() }))
    .query(async ({ctx, input}) => {
        return await ctx.db.userBook.findFirst({
            where: {
                userId: ctx.session.user.id,
                bookId: input.bookId
            },
            include: {
                book: true
            }
        })
    }),
    getUserBooks: protectedProcedure
    .query(async ({ctx}) => {
        return await ctx.db.userBook.findMany({
            where: {
                userId: ctx.session.user.id
            },
            include: {
                book: true
            }
        })
    }),
    addToLibrary: protectedProcedure
    .input(z.object({ bookId: z.number() }))
    .mutation(async ({ctx, input}) => {
        const userBook = await ctx.db.userBook.create({
            data: {
                userId: ctx.session.user.id,
                bookId: input.bookId,
            },
        })
        return {userBookId: userBook.id}
    }),
    removeFromLibrary: protectedProcedure
    .input(z.object({ userBookId: z.number() }))
    .mutation(async ({ctx, input}) => {
        await ctx.db.userBook.delete({
            where: {
                userId: ctx.session.user.id,
                id: input.userBookId
            }
        })
    }),
});
