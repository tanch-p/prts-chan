import "../styles/global.css";
import { useState, useEffect } from "react";
import AppContext from "../components/AppContext";
import Drawer from "../components/Drawer";
import useWindowDimensions from "../components/WindowDimensions";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const { height, width } = useWindowDimensions();
  let device = "";
  width > 800 ? (device = "desktop") : (device = "mobile");

  const router = useRouter();
  const { pathname, asPath, query, locale } = router;
  // console.log("system detected locale is", locale);

  useEffect(() => {
    setLanguage(localStorage.getItem("language") ?? locale);
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
    router.push({ pathname, query }, asPath, { locale: language });
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
      <Drawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} device={device} />
    </>
  );
}
