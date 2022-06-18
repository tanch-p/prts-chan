import Image from "next/image";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import collectionIcon from "../../public/images/phcs/collection.png";
import Overlay from "./Overlay";
import useToggle from "../../hooks/useToggle";

const navigation = [
	{ name: "Dashboard", href: "#", current: true },
	{ name: "Team", href: "#", current: false },
	{ name: "Projects", href: "#", current: false },
	{ name: "Calendar", href: "#", current: false },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function FooterBar() {
	const [isOpen, setOpen] = useToggle(false);

	return (
		<div className="fixed bottom-0 left-0 select-none">
			<Overlay open={isOpen} setOpen={setOpen} />
			<Disclosure
				as="nav"
				className="border-t-2 border-gray-600 bg-neutral-900 w-full mt-4 fixed bottom-0 py-2 z-[30]"
				onClick={() => {
					if (isOpen) setOpen(!isOpen);
				}}
			>
				<>
					<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
						<div className="relative flex items-center justify-between h-16">
							<Image
								src={collectionIcon}
								width="64px"
								height="56px"
								className="hover:cursor-pointer"
								unoptimized
								onClick={() => {
									setOpen(!isOpen);
								}}
							/>
							<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"></div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1">
							{navigation.map((item) => (
								<Disclosure.Button
									key={item.name}
									as="a"
									href={item.href}
									className={classNames(
										item.current
											? "bg-gray-900 text-white"
											: "text-gray-300 hover:bg-gray-700 hover:text-white",
										"block px-3 py-2 rounded-md text-base font-medium"
									)}
									aria-current={item.current ? "page" : undefined}
								>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			</Disclosure>
		</div>
	);
}
