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
import Player from "../../components/Player/Player"

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = async (context: any) => {

  const id = context.params.id;

  const url = "https://api.consumet.org/anime/gogoanime/watch/" + id + "-episode-1";

  const { data } = await axios.get(url);

  data.id = id


  return {
    props: {
      show: data,
    },
  };
};



export default function Watch({ show }: any) {
  useEffect(() => {
    //console.log(show)
  });

  //   const animeId = props.animeId

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge charset=UTF-8" />
        <title>Template Site</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Player show={show}/>
      <Header />
    </>
  );
}

