import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Drawer } from "./Drawer";
import { Navbar } from "./Navbar";
import useWindowDimensions from "./WindowDimensions";

const name = "Your Name";
export const siteTitle = "PRTS-chan";

export default function Layout({ children, home }) {
  const [open, setOpen] = useState(false);
  const { height, width } = useWindowDimensions();
  let device = "";
  width > 1024 ? (device = "desktop") : (device = "mobile");

  return (
    <div className={`flex flex-wrap`}>
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
      <Drawer open={open} setOpen={setOpen} device={device} />
      <header
        className={`${open && device === "desktop" ? "translate-x-64"  : ""} ease-in-out transition-all duration-300`}
      >
        <Navbar open={open} setOpen={setOpen} />
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className=""
              height={144}
              width={144}
              alt={name}
            />
            <h1 className="">{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/profile.jpg"
                  className=""
                  height={108}
                  width={108}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className="">
              <Link href="/">
                <a className="">{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main
        className={`${open && device === "desktop" ? "translate-x-64" : ""} ease-in-out transition-all duration-300`}
      >
        {children}
      </main>
      {!home && (
        <div className="">
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
