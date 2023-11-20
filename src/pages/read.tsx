import { Tab } from "@headlessui/react";
import { Book } from "@prisma/client";
import { useSession } from "next-auth/react";
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
					{userBooks?.map((book) => (
						<p key={book.id}>{book.bookId}</p>
					))}

					{/* <Tab.Group>
						<Tab.List>
							<Tab>Notes</Tab>
							<Tab>Sessions</Tab>
						</Tab.List>
						<Tab.Panels>
							<Tab.Panel>Content 1</Tab.Panel>
							<Tab.Panel>Content 2</Tab.Panel>
						</Tab.Panels>
					</Tab.Group> */}
				</div>
			)}
		</div>
	);
}
