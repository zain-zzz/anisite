import usePathname from "next/navigation";
import Link from "next/link";
import classNames from "classnames";
import axios from "axios";

import React, { useState, useEffect } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { tempSolution } from "@/public/tempSolution";

import styles from "./Player.module.css";

export default function AnimeInfo({ show }: any) {
  const [showInfo, setShowInfo] = useState<ShowInterface>({
    id: "Loading...",
    title: "Loading...",
    url: "Loading...",
    image: "https://gogocdn.net/cover/lycoris-recoil.png",
    releaseDate: "Loading...",
    description: "Loading...",
    genres: ["Loading..."],
    subOrDub: "Loading...",
    type: "Loading...",
    status: "Loading...",
    otherName: "Loading...",
    totalEpisodes: 0,
    episodes: [
      {
        id: "Loading...",
        number: 0,
        url: "Loading...",
      },
    ],
  });

  const [currentShow, setCurrentShow] = useState<any>(show);

  const [showId] = useState<any>(show.id);

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

  const [currentEpisode, setCurrentEpisode] = useState<number>(1);

  async function changeCurrentEpisode(number: number) {
    const url = `https://api.consumet.org/anime/gogoanime/watch/${showId}-episode-${number}`;

    const { data } = await axios.get(url);

    setCurrentShow(data);

    setCurrentEpisode(number);
  }

  function checkCurrentEpisode(episode: any) {
    const episodeToMap = episode.id.split("-").slice(-1);

    if (currentEpisode == episodeToMap) {
      return (
        <div className={`${styles.episodeBox} ${styles.active}`}>
          <h1>{episodeToMap}</h1>
          <p>Episode {episodeToMap}</p>
        </div>
      );
    }
    return (
      <div
        onClick={() => {
          changeCurrentEpisode(episodeToMap);
          setActiveEpisode(episodeToMap);
        }}
        className={styles.episodeBox}
        id="episodeBoxComponent"
      >
        <h1>{episodeToMap}</h1>
        <p>Episode {episodeToMap}</p>
      </div>
    );
  }

  function setActiveEpisode(number: number) {
    let boxes = document.querySelectorAll("#episodeBoxComponent");
    boxes.forEach((box) => {
      if (+box.innerHTML.split(">")[1].split("<")[0] == number) {
        box.classList.add(`${styles.active}`);
      } else {
        box.classList.remove(`${styles.active}`);
      }
    });
  }

  useEffect(() => {
    getShowInfo(showId);
  }, []);

  async function getShowInfo(id: string) {
    const url = "https://api.consumet.org/anime/gogoanime/info/" + id;

    const { data } = await axios.get(url);

    setShowInfo(data);
  }

  return (
    <div className={styles.containerDiv}>
      <div className={styles.placeholderDiv}></div>
      <div className={styles.backgroundImage}>
        <img src={showInfo.image} />
      </div>
      <div className={styles.playerDiv}>
        <div className={styles.episodesDiv}>
          {showInfo.episodes.map((episode) => checkCurrentEpisode(episode))}
        </div>

        <div className={styles.videoPlayer}>
          <iframe
            className={styles.video}
            allowFullScreen={true}
            frameBorder={0}
            scrolling="no"
            src={currentShow.headers.Referer}
          ></iframe>
        </div>
      </div>
    </div>
  );
}
