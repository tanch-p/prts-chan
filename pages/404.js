export const getStaticProps = async () => {
	return {
		redirect: {
			destination: "/",
			permanent: true,
		},
	};
};

export default function Custom404() {
	return <h1>404 - Page Not Found</h1>;
}
