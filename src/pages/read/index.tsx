import { Tab } from "@headlessui/react";
import { Book } from "@prisma/client";
import { useSession } from "next-auth/react";
import UserBookPreview from "~/components/user-book-preview";
import { api } from "~/utils/api";

export default function Read() {
	const { data: sessionData } = useSession();
	const { data: userBooks, isLoading } = api.userBook.getUserBooks.useQuery();
	return (
		<div>
			{!sessionData ? (
				<div>
					<p className="text-center">
						Must be logged in to begin reading!
					</p>
				</div>
			) : (
				<div>
					<p className="text-4xl font-bold my-4">Read</p>
					{isLoading && <p>Loading...</p>}
					<div className="flex gap-6">
						{userBooks?.map((userBook) => (
							<UserBookPreview
								key={userBook.id}
								userBook={userBook}
								bookData={userBook.book}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
