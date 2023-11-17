import type { Book } from "@prisma/client";
import { BookCover } from "book-cover-3d";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Rating from "./rating";

export default function BookPreview({ bookData }: { bookData: Book }) {
	const { data: sessionData } = useSession();
	return (
		<a href="#">
			<div className="w-full flex flex-col md:flex-row select-none gap-4 rounded-md hover:bg-gray-100 transition duration-100 ease-in p-4">
				<div className="w-[120px] h-[180px] rounded-md relative mx-auto">
					<Image
						width={120}
						height={180}
						className="rounded-md"
						alt={bookData.title}
						src={bookData.image}
					/>
				</div>
				<div className="max-w-xl flex flex-col gap-1">
					<p className="font-bold text-lg">{bookData.title}</p>
					<p className="text-gray-500">{bookData.author}</p>
					<Rating rating={bookData.rating} />
					<button className="bg-black px-4 py-2 rounded-md mt-auto text-white font-semibold">
						Add to Library
					</button>
				</div>
			</div>
		</a>
	);
}
