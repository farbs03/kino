import type { Book } from "@prisma/client";
import { useSession } from "next-auth/react";
import BookPreview from "~/components/bookpreview";
import { api } from "~/utils/api";

export default function Explore() {
	const { data: sessionData } = useSession();
	const books: Book[] | undefined = api.book.getAll.useQuery().data;
	return (
		<div className="pt-8">
			<p className="mb-4 text-4xl font-bold">Explore</p>
			<div className="flex gap-6">
				{!books && <p>Loading ...</p>}
				{books?.map((book) => (
					<BookPreview key={book.id} bookData={book} />
				))}
			</div>
		</div>
	);
}
