import "../styles/global.css";
import { useState, useEffect } from "react";
import AppContext from "../context/AppContext";
import Drawer from "../components/Drawer";
import useWindowDimensions from "../components/WindowDimensions";

export default function App({ Component, pageProps }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const { height, width } = useWindowDimensions();
  const [device, setDevice] = useState("desktop");

  useEffect(() => {
    width > 800 ? setDevice("desktop") : setDevice("mobile");
  }, [width]);

  useEffect(() => {
    let lang = navigator.language;
    console.log("browser language is", lang);
    lang = lang.match(/jp|ja/i) ? "jp" : "en";
    setLanguage(localStorage.getItem("language") ?? lang);
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <>
      <AppContext.Provider
        value={{
          openContext: [drawerOpen, setDrawerOpen],
          languageContext: [language, setLanguage],
          device: device,
        }}
      >
        <Component {...pageProps} />
      </AppContext.Provider>
      <Drawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        device={device}
      />
    </>
  );
}
