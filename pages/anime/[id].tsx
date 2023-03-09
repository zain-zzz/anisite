import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../../components/Header/Header";
import AnimeInfo from "@/components/AnimeInfo/AnimeInfo";
import Head from "next/head";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import axios from "axios";
import Related from "../../components/Related/Related"

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = async (context: any) => {

  const id = context.params.id;

  // console.log("id is ", id);

  const url = "https://api.consumet.org/anime/gogoanime/info/" + id;

  const { data } = await axios.get(url);

  return {
    props: {
      show: data,
    },
  };
};

export default function Home({ show }: any) {
  useEffect(() => {

  });

  //   const animeId = props.animeId

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge charset=UTF-8" />
        <title>Template Site</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <AnimeInfo show={show} />
      <Related show={show} />
      
      <Header />
    </>
  );
}

