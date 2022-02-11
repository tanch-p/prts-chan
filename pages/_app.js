import "../styles/global.css";
import { useState, useEffect } from "react";
import AppContext from "../components/AppContext";
import Drawer from "../components/Drawer";
import useWindowDimensions from "../components/WindowDimensions";

export default function App({ Component, pageProps }) {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const { height, width } = useWindowDimensions();
  let device = "";
  width > 800 ? (device = "desktop") : (device = "mobile");
  let langPack = require(`../components/lang/${language}.json`);
  useEffect(() => {
    device === "desktop" ? setOpen(true) : setOpen(false);
    setLanguage(localStorage.getItem("language") ?? "en")
  }, []);

  const [languagePack, setlanguagePack] = useState(langPack);

  useEffect(() => {
    langPack = require(`../components/lang/${language}.json`);
    setlanguagePack(langPack);
    console.log("langpack", langPack);
    localStorage.setItem("language",language);
  }, [language]);

  return (
    <>
      <AppContext.Provider
        value={{
          openContext: [open, setOpen],
          languageContext: [language, setLanguage],
          langPack: languagePack,
          device: device,
        }}
      >
        <Component {...pageProps} />
      </AppContext.Provider>
      <Drawer open={open} setOpen={setOpen} device={device} />
    </>
  );
}
