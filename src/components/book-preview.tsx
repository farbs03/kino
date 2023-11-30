import type { Book, UserBook } from "@prisma/client";
import { BookCover } from "book-cover-3d";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Rating from "./rating";
import { api } from "~/utils/api";
import {
	BookmarkIcon,
	CheckCircleIcon,
	XCircleIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

export default function BookPreview({ bookData }: { bookData: Book }) {
	const { data: foundBook, isLoading } = api.userBook.getUserBook.useQuery({
		bookId: bookData.id,
	});
	const [added, setAdded] = useState<boolean>(foundBook !== null);

	const ctx = api.useContext();
	const addBook = api.userBook.addToLibrary.useMutation({
		onSuccess: () => {
			setAdded(true);
			void ctx.userBook.getUserBook.invalidate();
			toast.success("Added book to library", {
				icon: <CheckCircleIcon className="w-6 h-6 text-green-500" />,
				className: "border-b-4 border-green-500 font-sans",
			});
		},
		onError: () => {
			toast.error("Error adding book to library!", {
				icon: <XCircleIcon className="w-6 h-6 text-red-500" />,
				className: "border-b-4 border-red-500 font-sans",
			});
		},
	});
	const removeBook = api.userBook.removeFromLibrary.useMutation({
		onSuccess: () => {
			setAdded(false);
			void ctx.userBook.getUserBook.invalidate();
		},
		onError: () => {
			console.log("wee woo wee woo");
		},
	});

	function toggleAdded(e: MouseEvent) {
		e.preventDefault();
		if (!added) {
			addBook.mutate({ bookId: bookData.id });
		} else if (foundBook) {
			removeBook.mutate({ userBookId: foundBook.id });
		}
		/* toast popup */
	}
	useEffect(() => {
		setAdded(foundBook !== null);
	}, [foundBook]);
	return (
		<Link href={`/explore/${bookData.id}`} className="z-0">
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
					{bookData.totalRatings === 0 ? (
						"No ratings"
					) : (
						<Rating
							rating={bookData.numRatings / bookData.totalRatings}
						/>
					)}
					<button
						onClick={(e) => toggleAdded(e)}
						disabled={isLoading || added}
						className="z-10 group disabled:cursor-not-allowed md:bg-black w-8 h-8 rounded-full mt-auto ml-auto text-white grid place-items-center active:scale-95 disabled:active:scale-100 transition duration-100 ease-in"
					>
						<BookmarkIcon
							className={`${
								added ? "text-yellow-500" : "text-gray-200"
							} w-4 h-4`}
						/>
					</button>
				</div>
			</div>
		</Link>
	);
}
