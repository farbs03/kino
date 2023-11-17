import { db } from "~/server/db";

async function main() {
  await db.book.createMany({
    data: [
      {
        title: "One Piece",
        author: "Eiichiro Oda",
        chapters: 1098,
        year: 1997,
        image: "/onepiece-vol-1.jpg",
        rating: 10
      },
      {
        title: "Berserk",
        author: "Kentaro Miura",
        chapters: 376,
        year: 1990,
        image: "/berserk-vol-1.jpg",
        rating: 10
      }
    ]
  })
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });