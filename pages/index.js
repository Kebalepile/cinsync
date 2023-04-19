import Head from "next/head";
import styles from "@/styles/home.module.css";
import Compile from "@/components/Compile";

export default function Home() {
  return (
    <>
      <Head>
        <title>CineSync</title>
        <meta
          name="description"
          content="CineSync is the ultimate web application for movie lovers, offering a shared movie-watching experience that brings people together from around the world. Stream your favorite movies and TV shows, chat with friends and family, and enjoy a private screening room like no other."
        />

        <meta
          name="keywords"
          content="CineSync, movie streaming, shared viewing experience, private screening room, webRTC, movie chat, movie lovers, online movies, movie-watching experience, interactive movie-watching"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Kebalepile Tokyo Motshoana" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Compile />
      </main>
    </>
  );
}
