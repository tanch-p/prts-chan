import "../styles/global.css";
import { AppWrapper } from "context/AppContext";

export default function App({ Component, pageProps }) {
	return (
		<>
			<AppWrapper>
				<Component {...pageProps} />
			</AppWrapper>
		</>
	);
}
