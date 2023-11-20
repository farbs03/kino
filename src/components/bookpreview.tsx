import type { Book, UserBook } from "@prisma/client";
import { BookCover } from "book-cover-3d";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Rating from "./rating";
import { api } from "~/utils/api";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

/*
	Problem: foundBook is not being updated properly after adding/deleting it frmro database
		- It is considered null after adding, and nonnull after deleting
			- Only properly updates when page refreshes, but that's obviously unacceptable
		- How the fuck do I fix this?
		- 
	
*/

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
		},
		onError: () => {
			console.log("wee woo wee woo");
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

	function toggleAdded() {
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
		<a href="#">
			<div className="z-0 w-full flex flex-col md:flex-row select-none gap-4 rounded-md hover:bg-gray-100 transition duration-100 ease-in p-4">
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
					<p className="font-bold text-lg line-clamp-1">
						{bookData.title}
					</p>
					<p className="text-gray-500 line-clamp-1">
						{bookData.author}
					</p>
					<Rating rating={bookData.rating} />
					<button
						onClick={() => toggleAdded()}
						disabled={isLoading}
						className="z-10 group disabled:cursor-not-allowed md:bg-black w-8 h-8 rounded-full mt-auto ml-auto text-white grid place-items-center active:scale-95 disabled:active:scale-100 transition duration-100 ease-in"
					>
						<BookmarkIcon
							className={`${
								added ? "text-yellow-500" : "text-gray-500"
							} w-4 h-4`}
						/>
					</button>
				</div>
			</div>
		</a>
	);
}
