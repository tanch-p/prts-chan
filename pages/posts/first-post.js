import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import Layout from "../../components/layout";

// const myLoader = ({ src, width, quality }) => {
// 	return `../images/${src}?w=${width}&q=${quality || 75}`;
// };

export default function FirstPost() {
	return (
		<>
			<Layout>
				<Head>
					<title>First Post</title>
				</Head>
				<h1>First Post</h1>
				<Image
					src="/images/test.jpg" // Route of the image file
					width="520"
					height="300"
					alt="Your Name"
				/>
				<h2>
					<Link href="/">
						<a>Back to home</a>
					</Link>
				</h2>
			</Layout>
		</>
	);
}
