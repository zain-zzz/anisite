import usePathname from "next/navigation";
import Link from "next/link";
import classNames from "classnames";
import axios from "axios";

import React, { useState, useEffect } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { tempSolution } from "@/public/tempSolution";

import styles from "./AnimeInfo.module.css";
import { json } from "node:stream/consumers";

export default function AnimeInfo({ show }: any) {
  function getShowInfo() {
    switch (show.type.split(" ")[0]) {
      case "tv":
      case "MOVIE":
      case "OVA":
        return (
          <p>
            <b>Release Year: </b>
            {show.releaseDate}
          </p>
        );
      case "WINTER":
      case "SUMMER":
      case "FALL":
      case "SPRING":
        return (
          <p>
            <b>Season: </b>
            {`${show.type.split(" ")[0].toLowerCase()} ${show.type
              .split(" ")[1]
              .toLowerCase()}`}
          </p>
        );
    }
  }

  function getGenres() {
    let myArray = [];
    for (var key in show.genres) {
      myArray.push(show.genres[key]);
    }
    return myArray;
  }

  function genresToString() {
    let genres = getGenres();
    let string = " ";
    genres.forEach((genre) => {
      string += genre + " ";
    });
    return string;
  }

  useEffect(() => {
    getShowInfo();
  }, []);

  return (
    <div   className={styles.animeInfoDiv}>
      <div className={styles.backgroundImage}>
        <img src={show.image} />
      </div>

      <div className={styles.placeholderDiv}></div>
      <div className={styles.flexSlider}>
        <div className={styles.showImage}>
          <img src={show.image} />
        </div>

        <div className={styles.showDescription}>
          <h1>{show.title}</h1>
          <p>{show.description}</p>
          <Link href={`/watch/${show.id}`}>
            <button>Watch now</button>
          </Link>
        </div>

        <div className={styles.showInfo}>
          {getShowInfo()}
          <p>
            <b>Status: </b>
            {show.status}
          </p>

          <p>
            <b>Type: </b>
            {show.type.length > 5 ? "Anime" : show.type}
          </p>

          <p>
            <b>Synonyms: </b>
            {show.otherName}
          </p>

          <p>
            <b>Genres: </b>
            {genresToString()}
          </p>
        </div>
        <div className={styles.hidden}></div>
      </div>
    </div>
  );
}
