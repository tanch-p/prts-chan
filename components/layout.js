import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { Navbar } from "./layouts/Navbar";
import AppContext from "./AppContext";
import { Footer } from "./layouts/Footer";

const name = "Your Name";
export const siteTitle = "PRTS-chan";

export default function Layout({ children, banner }) {
  const { openContext, device } = useContext(AppContext);
  const [drawerOpen, setDrawerOpen] = openContext;
  // console.log(banner)
  return (
    <div
      className={`flex flex-wrap ease-in-out duration-300 transition-[left]  motion-reduce:transition-none ${
        drawerOpen && device === "desktop"
          ? "translate-x-64 w-[calc(100%-16rem)]"
          : ""
      }`}
    >
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Arknights enemy data viewer for Roguelike"
        />
        {/* <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        /> */}
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <header
        className="w-full transition-none"
      >
        <Navbar open={drawerOpen} setOpen={setDrawerOpen} device={device}/>
      </header>
      <main className="mx-auto flex flex-wrap flex-col items-center">{children}</main>
      <Footer />
    </div>
  );
}
