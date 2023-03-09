import usePathname from "next/navigation";
import Link from "next/link";
import classNames from "classnames";
import axios from "axios";

import React, { useState, useEffect } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { tempSolution } from "@/public/tempSolution";

import arrowImage from "../../public/play-button.png"
import arrowImageHollow from "../../public/play-button-arrowhead.png"

import styles from "./Spotlight.module.css";

export default function Spotlight({shows}:any) {

  const [topAiring, setTopAiring] = useState<ShowsArray>(shows);
  const [backgroundImage, setBackgroundmage] = useState<string>(shows[0].image)

  interface ShowInterface{
    id: string,
    title: string,
    url: string,
    image: string,
    releaseDate: string, // or null
    description: string, // or null
    genres: [
      string
    ],
    subOrDub: string,// sub or dub
    type: string, // or null
    status: string, //eg 'ongoing'
    otherName: string, // or null
    totalEpisodes: number,
    episodes: [
      {
        id: string,
        number: number,
        url: string
      }
    ]
  }

  // console.log(shows)

  interface ShowsArray extends Array<ShowInterface>{}

  const slideInProperties = {
    indicators: true,
    scale: 1.2,
    duration: 20000,
    transitionDuration: 200,
    infinite: true,

    prevArrow: (
      <div className={styles.arrowStyle}>
        <div className={styles.squareLeft}>
          <p>{"<"}</p>
        </div>
      </div>
    ),

    nextArrow: (
      <div className={styles.arrowStyle}>
        <div className={styles.squareRight}>
          <p>{">"}</p>
        </div>
      </div>
    ),

  };

  useEffect(() => {
    topAiring.forEach((show) => {console.log(show.episodes[0].url)})
  }, []);

  useEffect(() => {
    
    setInterval( () => {
      let imageToSet = (document.querySelector("#__next > main > div:nth-child(1) > div > div > div > div.react-slideshow-wrapper.slide > div > div.active > div.Spotlight_flexSlider___zhui > div.Spotlight_showImage__zhMlk > img")?.getAttribute('src'))

      if (imageToSet && imageToSet != backgroundImage) {
        setBackgroundmage(imageToSet)
      }
    }, 500)
  }, [])

  return (
    <div>
      <div className={styles.sliderDiv}>
      <div className={styles.backgroundImage}>
        <img src={backgroundImage} />
      </div>
      <Slide {...slideInProperties}>
        {topAiring.map((show, index) => (
        <>

        <div key={"uuid:" + index}className={styles.placeholderDiv}></div>
        <div key={index} className={styles.flexSlider}>
          
          <div className={styles.showImage}>
            <img src={show.image} />
          </div>

          <div className={styles.showDescription}>
            <h2>#{index+1} Spotlight</h2>
            <h1>{show.title}</h1>
            <p>{show.description}</p>
            <Link href={"/watch/" + show.id}>
              <button className={styles.buttonOne}>
                Watch now
              </button>
            </Link>
            <Link className={styles.detailButton} href={"/anime/" + show.id}>
            <button className={styles.buttonTwo}>
                View Details
              </button>
            </Link>

          </div>

          <div className={styles.showInfo}>

          </div>

          <div className={styles.hidden}>

          </div>

        </div>
        </>
        ))}
      </Slide>
      </div>

    </div>
  );
}

