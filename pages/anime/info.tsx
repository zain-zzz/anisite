import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "../../components/Header/Header";
import AnimeInfo from "@/components/AnimeInfo/AnimeInfo";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge charset=UTF-8" />
        <title>Template Site</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      </Head>
      <Header />
    </>
  );
}

