import Link from "next/link";
import searchImg from "../../public/searchicon.png";
import Image from "next/image";
import axios from "axios";

import React, { useState, useEffect, useRef } from "react";

import styles from "./Header.module.css";

export default function Header({}) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<ShowsArray>([]);
  const [searchfocus, setSearchfocus] = useState<boolean>(false);

  //typescript nonsense
  interface ShowInterface {
    id: string;
    title: string;
    image: string;
    releaseDate: string | null; // or null
    subOrDub: string; // "sub" or "dub"
    type: string;
  }

  interface ShowsArray extends Array<ShowInterface> {}

  async function onChange(event: any) {
    setValue(event.target.value);
    getSuggestions(event.target.value);
  }

  function onSearch(searchTerm: string) {
    // change when you add a results page
  }

  async function getSuggestions(searchTerm: string) {
    const url = "https://api.consumet.org/anime/gogoanime/" + searchTerm;

    try {
      const { data } = await axios.get(url);
      let results = data.results;
      if (!!searchTerm && results.length) {
        setSuggestions(results.slice(0, 5));
      }
    } catch (err: any) {
      console.error(err.message);
    }
  }

  function checkIfFocused(ref: any) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        let result = true;
        if (ref.current && !ref.current.contains(event.target)) {
          result = false;
        }

        return setSearchfocus(result);
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  checkIfFocused(wrapperRef);

  return (
    <div className={styles.relative}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href={"/"}>
            <h1 className={styles.test2}>AniSite</h1>
          </Link>

          <img
            className={styles.icon}
            src={
              "https://cdn.discordapp.com/attachments/766665303589126174/1082094621137580062/02_riko.png"
            }
          />

          <div className={styles.searchBar} ref={wrapperRef}>
            <div className={styles.searchInner}>
              <input type="text" value={value} onChange={onChange} />
              <button onClick={() => onSearch(value)}>
                <Image src={searchImg} alt="" />
              </button>
            </div>

            <div className={styles.dropdown}>
              {searchfocus &&
                suggestions.map((show) => {
                  return (
                    <>
                      <Link href={"/anime/" + show.id}>
                        <div className={styles.dropdownRow}>
                          <img src={show.image} />
                          <div>
                            <h2>
                              {show.title.slice(0, 35).trimEnd()}{" "}
                              {show.title.length > 35 && "..."}
                            </h2>
                            <p>{show.releaseDate}</p>
                          </div>
                        </div>
                      </Link>
                    </>
                  );
                })}
              {searchfocus && !!suggestions.length && (
                <div className={styles.dropdownSearch}>
                  <p> View all results </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.headerRight}></div>
      </div>
    </div>
  );
}
