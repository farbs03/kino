import { StarIcon } from "@heroicons/react/24/solid";
export default function Rating({ rating }: { rating: number }) {
	const stars = Math.floor(rating / 2);
	const starArr: number[] = [0, 0, 0, 0, 0];
	for (let i = 0; i < stars; i++) {
		starArr[i] = 1;
	}
	return (
		<div className="flex items-center gap-1">
			{starArr.map((star, idx) => (
				<StarIcon
					key={idx}
					className={`${
						star === 1 ? "text-black" : "text-gray-500"
					} w-4 h-4`}
				/>
			))}
		</div>
	);
}
