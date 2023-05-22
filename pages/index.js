import Head from "next/head";
import styles from "@/styles/home.module.css";
import GlobalHooksState from "@/components/GlobalHooksState";
import Compile from "@/components/Compile";

export default function Home() {
  return (
    <>
      <Head>
        <title>CineSync</title>
        <meta
          name="description"
          content="Our app allows you to easily play and manage your MP3 and MP4 files across all devices. With a user-friendly interface and powerful features, you can enjoy your favorite music and videos like never before. Some of the features of our app include: Support for both MP3 and MP4 files Easy-to-use playback controls Advanced search and filtering options And much more! We are constantly working to improve our app and add new features."
        />

        <meta
          name="keywords"
          content="CineSync, movie streaming, shared viewing experience, private screening room, webRTC, movie chat, movie lovers, online movies, movie-watching experience, interactive movie-watching"
        />
        <meta name="theme-color" content="#852b6a" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Kebalepile Tokyo Motshoana" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <main className={styles.main}>
        <GlobalHooksState />
        <Compile />
      </main>
    </>
  );
}
