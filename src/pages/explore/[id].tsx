import { redirect, usePathname } from "next/navigation";
import { api } from "~/utils/api";

export default function Book() {
	const path: string = usePathname();
	const id = path.split("/")[2];
	if (!id) {
		redirect("/explore");
	}
	const { data: bookData, isLoading } = api.book.getBook.useQuery({
		id: parseInt(id),
	});
	return (
		<div>
			{isLoading ? (
				<p>Loading ...</p>
			) : (
				<div>
					<p>{bookData?.title}</p>
				</div>
			)}
		</div>
	);
}
