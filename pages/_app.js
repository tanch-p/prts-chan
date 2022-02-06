import "../styles/global.css";
import { useState, useEffect } from "react";
import AppContext from "../components/AppContext";
import Drawer from "../components/Drawer";
import useWindowDimensions from "../components/WindowDimensions";

export default function App({ Component, pageProps }) {
  const [open, setOpen] = useState(false);
  const { height, width } = useWindowDimensions();
  let device = "";
  width > 800 ? (device = "desktop") : (device = "mobile");
  useEffect(() => {
    device === "desktop" ? setOpen(true) : setOpen(false);
  }, []);

  return (
    <>
      <AppContext.Provider value={{openContext:[open,setOpen],device:device}}>
        <Component {...pageProps}/>
      </AppContext.Provider>
      <Drawer open={open} setOpen={setOpen} device={device} />
    </>
  );
}
