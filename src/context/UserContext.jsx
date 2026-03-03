import React, { createContext, useState, useEffect, useRef } from "react";
import { songsData } from "../songs";

export const datacontext = createContext();

function UserContext({ children }) {
  let audioRef = useRef(new Audio());
  let [index, setIndex] = useState(0);
  let [playingSong, setPlayingSong] = useState(false);

  // 🎵 Change song when index changes
  useEffect(() => {
    const audio = audioRef.current;
    audio.src = songsData[index].song;
    audio.load();

    if (playingSong) {
      audio.play();
    }
  }, [index]);


  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      setIndex((prev) => (prev + 1) % songsData.length);
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  function playSong() {
    setPlayingSong(true);
    audioRef.current.play();
  }

  function pauseSong() {
    setPlayingSong(false);
    audioRef.current.pause();
  }

  function nextSong() {
    setIndex((prev) => (prev + 1) % songsData.length);
  }

  function prevSong() {
    setIndex((prev) => (prev - 1 + songsData.length) % songsData.length);
  }

  let value = {
    audioRef,
    playSong,
    pauseSong,
    playingSong,
    setPlayingSong,
    nextSong,
    index,
    setIndex,
    prevSong,
  };

  return <datacontext.Provider value={value}>{children}</datacontext.Provider>;
}

export default UserContext;
 