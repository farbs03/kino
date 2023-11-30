import { Book, UserBook } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import Rating from "./rating";
import SelectRating from "./ui/select-rating";

export default function UserBookPreview({
	userBook,
	bookData,
}: {
	userBook: UserBook;
	bookData: Book;
}) {
	const progress = userBook.chaptersRead / bookData.chapters;
	return (
		<Link href={`/read/${bookData.id}`} className="z-0">
			<div className="z-0 w-full flex flex-col md:flex-row select-none gap-4 rounded-md hover:bg-gray-100 transition duration-100 ease-in p-4">
				<div className="w-32 aspect-[2/3] rounded-md mx-auto">
					<Image
						width={128}
						height={192}
						className="rounded-md object-fill"
						alt={bookData.title}
						src={bookData.image}
					/>
				</div>
				<div className="w-32 flex flex-col gap-1">
					<p className="font-bold text-lg line-clamp-1">
						{bookData.title}
					</p>
					<p className="text-gray-500 line-clamp-1">
						{bookData.author}
					</p>
					<div className="flex items-center gap-1 relative text-sm">
						<p className="font-semibold">Rating </p>
						<p>{userBook.rating ?? "None"}</p>
					</div>
					<div className="mt-auto flex flex-col text-sm gap-1">
						<div className="flex items-center gap-1">
							<p className="font-semibold">Progress </p>
							<p>{Math.round(progress * 100)} %</p>
						</div>
						<div className="rounded-full bg-gray-200 h-2">
							<div
								className={`bg-black ${
									progress === 1 ? "rounded-r-full" : ""
								} rounded-l-full`}
								style={{ width: progress }}
							></div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
