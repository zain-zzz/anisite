import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "../components/Header/Header";
import Spotlight from "../components/Spotlight/Spotlight";
import Related from "@/components/Related/Related";
import axios from "axios";
import { tempSolution } from "@/public/tempSolution";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ shows }: any) {
  //console.log("shows:", shows)
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge charset=UTF-8" />
        <title>Template Site</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Spotlight shows={shows} />
      <Header />
    </>
  );
}

// temporary change in solution to solve lag issues

// export async function getServerSideProps() {
//   const url = "https://api.consumet.org/anime/gogoanime/top-airing";
//   const { data } = await axios.get(url);

//   let results = data.results;

//   let temparr = [];
//   const urlTwo = "https://api.consumet.org/anime/gogoanime/info/";

//   for (let i = 0; i < results.length; i++) {
//     try {
//       const { data } = await axios.get(urlTwo + results[i].id);
//       temparr.push(data);
//     } catch (err: any) {
//       console.error(err.message);
//     }
//   }

//   return {
//     props: {
//       shows: data.results,
//     },
//   };
// }


export async function getServerSideProps() {
  
  return {
    props: {
      shows: tempSolution,
    },
  };
}