import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
	const [selectedHardRelic, setSelectedHardRelic] = useState([]);
	const [selectedNormalRelic, setSelectedNormalRelic] = useState([]);
	const [hallucinations, setHallucinations] = useState([]);
	const [floor, setFloor] = useState(1);
	const [language, setLanguage] = useState("en");
	const [device, setDevice] = useState("desktop");

	return (
		<AppContext.Provider
			value={{
				selectedHardRelic,
				setSelectedHardRelic,
				selectedNormalRelic,
				setSelectedNormalRelic,
				hallucinations,
				setHallucinations,
				floor,
				setFloor,
				language,
				setLanguage,
				device,
				setDevice,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
export function useAppContext() {
	return useContext(AppContext);
}
