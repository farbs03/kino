import { Fragment, useState } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { UserIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import { Popover, Transition } from "@headlessui/react";
import { usePopper } from "react-popper";
import type { CSSProperties } from "react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import Drawer from "../ui/drawer";

export default function Navbar() {
	type Page = {
		path: string;
		title: string;
	};
	const pages: Page[] = [
		{
			path: "/read",
			title: "Read",
		},
		{
			path: "/explore",
			title: "Explore",
		},
		{
			path: "/about",
			title: "About",
		},
	];

	const { data: sessionData } = useSession();
	const pathname = usePathname();

	const [referenceElement, setReferenceElement] =
		useState<HTMLButtonElement | null>(null);
	const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
		null,
	);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		strategy: "fixed",
	});

	const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

	return (
		<div className="flex items-center justify-between text-lg">
			<Link href="/" className="text-2xl font-bold">
				Kino
			</Link>
			<div className="md:flex items-center gap-4 hidden md:visible">
				{pages.map((page) => (
					<Link
						href={page.path}
						key={page.path}
						className={`font-semibold ${
							pathname !== page.path
								? "text-gray-500"
								: "text-black"
						} transition duration-100 ease-in hover:text-black`}
					>
						{page.title}
					</Link>
				))}
				{!sessionData && (
					<button
						className="rounded-full bg-black px-6 py-3 font-semibold text-white transition duration-100 ease-in hover:bg-black/90"
						onClick={() => void signIn()}
					>
						Sign In
					</button>
				)}

				{sessionData && (
					<Popover className="relative">
						<Popover.Button
							ref={setReferenceElement}
							className="origin-center grid aspect-square h-10 place-items-center rounded-full bg-black text-white active:scale-95 transition duration-100 ease-in"
						>
							<UserIcon className="h-4 w-4" />
						</Popover.Button>
						<Transition
							enter="transition duration-100 ease-out origin-center"
							enterFrom="transform scale-95 opacity-0 origin-center"
							enterTo="transform scale-100 opacity-100 origin-center"
							leave="transition duration-75 ease-out origin-center"
							leaveFrom="transform scale-100 opacity-100 origin-center"
							leaveTo="transform scale-95 opacity-0 origin-center"
						>
							<Popover.Panel
								ref={setPopperElement}
								// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
								style={styles?.popper}
								// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
								{...attributes?.popper}
								className="w-52 rounded-md origin-top drop-shadow-md bg-white z-10 flex flex-col gap-2 p-2 text-left font-semibold"
							>
								<Link href="/account">
									<Popover.Button className="bg-black text-white transition duration-100 ease-in py-2 rounded-md w-full">
										Account
									</Popover.Button>
								</Link>
								<Popover.Button
									className="bg-gray-200 hover:bg-gray-300 transition duration-100 ease-in py-2 rounded-md"
									onClick={() => void signOut()}
								>
									Sign Out
								</Popover.Button>
							</Popover.Panel>
						</Transition>
					</Popover>
				)}
			</div>
			<div className="md:hidden">
				<button
					onClick={() => setDrawerOpen(true)}
					className="w-8 h-8 inline-flex items-center justify-center flex-shrink-0 hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-200 ease-in rounded-full"
				>
					<Bars3Icon className="w-6 h-6" />
				</button>
				<Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
					<div className="flex flex-col text-center gap-4 p-4 justify-between h-full">
						<div className="flex flex-col text-center gap-4 p-4">
							{pages.map((page) => (
								<Link
									href={page.path}
									key={page.path}
									onClick={() => setDrawerOpen(false)}
									className={`font-semibold ${
										pathname !== page.path
											? "text-gray-500"
											: "text-black bg-gray-100"
									} transition duration-100 ease-in hover:text-black p-2 rounded-md`}
								>
									{page.title}
								</Link>
							))}
						</div>
						<div className="font-semibold flex flex-col text-white gap-2">
							{!sessionData && (
								<button
									className="rounded-full bg-black px-6 py-3 font-semibold text-white transition duration-100 ease-in hover:bg-black/90"
									onClick={() => void signIn()}
								>
									Sign In
								</button>
							)}

							{sessionData && (
								<>
									<Link
										href="/account"
										onClick={() => setDrawerOpen(false)}
										className="bg-black transition duration-100 ease-in py-2 rounded-md w-full"
									>
										Account
									</Link>
									<button
										className="bg-gray-200 text-black transition duration-100 ease-in py-2 rounded-md"
										onClick={() => void signOut()}
									>
										Sign Out
									</button>
								</>
							)}
						</div>
					</div>
				</Drawer>
			</div>
		</div>
	);
}
