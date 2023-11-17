import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type ModalProps = {
	open: boolean;
	setOpen: (val: boolean) => void;
	children: React.ReactNode;
};

export default function Modal({ open, setOpen, children }: ModalProps) {
	return (
		<Transition appear show={open} as={Fragment}>
			<Dialog onClose={() => setOpen(false)} className="relative z-50">
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div
						className="fixed inset-0 bg-black/30"
						aria-hidden="true"
					/>
				</Transition.Child>

				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					<div className="fixed inset-0 flex items-center justify-center p-4">
						<Dialog.Panel className="mx-auto max-w-xl rounded-xl bg-white">
							{children}
						</Dialog.Panel>
					</div>
				</Transition.Child>
			</Dialog>
		</Transition>
	);
}
