import { Listbox } from "@headlessui/react";
import { useState } from "react";

export default function SelectRating({ rating }: { rating: number | null }) {
	const [selectedRating, setSelectedRating] = useState<string>(
		!rating ? "" : rating.toString(),
	);
	const ratingVals = Array.from(Array(10).keys());
	return (
		<div className="flex items-center justify-between relative">
			<p className="font-semibold text-sm">Rating</p>
			<div className="text-center relative">
				<Listbox value={selectedRating} onChange={setSelectedRating}>
					<Listbox.Button className="w-8 h-8 relative active:ring-2 transition duration-100 ease-in rounded-md ring-1 ring-black p-2 grid place-items-center">
						{selectedRating}
					</Listbox.Button>
					<Listbox.Options className="bg-white mt-1 max-h-60 w-full overflow-auto z-10 drop-shadow-sm rounded-b-md absolute bottom-0">
						{ratingVals.map((idx: number) => (
							<Listbox.Option
								key={idx}
								value={idx + 1}
								className={`hover:bg-gray-200 transition duration-100 ease-in p-2 ${
									idx === 9
										? "rounded-b-md"
										: idx === 0
										? "rounded-t-md"
										: ""
								}`}
							>
								{idx + 1}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Listbox>
			</div>
		</div>
	);
}
