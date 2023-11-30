import { Tab } from "@headlessui/react";
import Image from "next/image";
import { redirect, usePathname } from "next/navigation";
import { api } from "~/utils/api";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function ReadBook() {
	const path: string = usePathname();
	const id = path?.split("/")[2];
	if (!id) {
		redirect("/read");
	}
	const { data: userBook, isLoading } = api.userBook.getUserBook.useQuery({
		bookId: parseInt(id),
	});
	const book = userBook?.book;
	return (
		<div className="mt-4">
			{isLoading ? (
				<p>Loading ...</p>
			) : (
				<div className="flex justify-between">
					{book && (
						<div className="flex">
							<div className="w-32 aspect-[2/3] rounded-md relative">
								<Image
									src={book.image}
									alt={book.title}
									width={128}
									height={192}
									className="object-fill rounded-md"
								/>
							</div>
							<p className="font-bold text-2xl">{book.title}</p>
						</div>
					)}
					<div>
						<Tab.Group>
							<Tab.List className="p-2 flex gap-2 bg-white drop-shadow-md font-semibold rounded-md w-fit">
								{["Chapters", "Sessions"].map((title) => (
									<Tab
										key={title}
										className={({ selected }) =>
											classNames(
												"px-4 py-2 transition duration-100 ease-in rounded-md",
												selected
													? "bg-black text-white"
													: "hover:bg-gray-100 ",
											)
										}
									>
										{title}
									</Tab>
								))}
							</Tab.List>
							<Tab.Panels className="p-2">
								<Tab.Panel>Content 1</Tab.Panel>
								<Tab.Panel>Content 2</Tab.Panel>
							</Tab.Panels>
						</Tab.Group>
					</div>
				</div>
			)}
		</div>
	);
}
