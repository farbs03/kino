import { Book } from "@prisma/client";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

export default function Read() {
	const { data: sessionData } = useSession();

	function getBooks() {
		if (sessionData?.user) {
			const user = api.user.getUserBooks.useQuery();
			console.log(user.data);
		}
	}
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
					<p className="text-4xl font-bold mb-4">Read</p>
					<button
						onClick={() => getBooks()}
						className="bg-black text-white font-semibold py-2 px-4 rounded-md my-4"
					>
						Get Books
					</button>
				</div>
			)}
		</div>
	);
}
