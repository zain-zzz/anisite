import usePathname from "next/navigation";
import Link from "next/link";
import classNames from "classnames";
import axios from "axios";

import React, { useState, useEffect } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { tempSolution } from "@/public/tempSolution";

import arrowImage from "../../public/play-button.png";
import arrowImageHollow from "../../public/play-button-arrowhead.png";

import styles from "./Related.module.css";

interface ShowInterface {
  id: string;
  title: string;
  url: string;
  image: string;
  releaseDate: string; // or null
  description: string; // or null
  genres: [string];
  subOrDub: string; // sub or dub
  type: string; // or null
  status: string; //eg 'ongoing'
  otherName: string; // or null
  totalEpisodes: number;
  episodes: [
    {
      id: string;
      number: number;
      url: string;
    }
  ];
}

export default function Related({ show }: any) {
  // const [topAiring, setTopAiring] = useState<ShowsArray>([]);


  function getGenres(){
    let myArray = []
    for (var key in show.genres) {
      myArray.push(show.genres[key])
    }
    return myArray
  }

  function genresToString(){
    let genres = getGenres()
    let string = ' '
    genres.forEach(genre => {
      string += (genre + ' ')
    })
    return string
  }

  useEffect(() => {}, []);

  useEffect(() => {}, []);

  const array = [1,2,3,4,5]

  return (
    <>
    <div className={styles.relatedShowsDiv}>

        <h1>Related Shows</h1>

      <div className={styles.showCardsDiv}>
      {tempSolution.map((show) => (
        
        <div className={styles.showCard}>
          <Link href={"/anime/" + show.id}>
            <div>
              <img src={show.image}/>
              <p>{show.title.slice(0,20)} {show.title.length>20&& "..."}</p>
            </div>
          </Link>
        </div>
      ))}
      </div>
    </div>
    </>
  );
}


// show.type.length > 5 ? (
//   <p>
//     <b>Season: </b>
//     {`${show.type.split(" ")[0].toLowerCase()} ${show.type
//       .split(" ")[1]
//       .toLowerCase()}`}
//   </p>
// ) : (
//   <p>
//     <b>Release Year: </b>
//     {show.releaseDate}
//   </p>
// )