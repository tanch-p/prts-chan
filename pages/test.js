import Layout from "@/components/layout";
import { parseType } from "@/lib/parseType";

function TestComponent() {
	return (
		<div className="w-[200px] h-[100px]">
			<div className="w-[200px] h-[100px]">

				<div className="">{parseType(["infected_creature"], "jp")}</div>
			</div>
		</div>
	);
}

function AnotherComponent() {
	return <div className="w-[100px] h-[100px] bg-red-300 z-[10]"></div>;
}

export default function Test() {
	return (
		<Layout>
			<AnotherComponent />
			<div>
				<TestComponent />
			</div>
		</Layout>
	);
}
