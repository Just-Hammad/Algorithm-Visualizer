import React, { useEffect } from "react";
import { useSound } from "../useSound";

import open from "../../../public/audio/open.mp3";
import beep from "../../../public/audio/beep.mp3";

import gameoflife from "../../../public/svg/gameoflife.svg";
import bucket from "../../../public/svg/bucket.svg";
import maze from "../../../public/svg/maze.svg";
import chess from "../../../public/svg/chess.svg";

import "./menu.css";

const LOCAL_STORAGE_KEY = "pageTurnedTo";

export default function Menu() {

  const { playSound: openSound } = useSound(open);
  const { playSound: hoverSound } = useSound(beep);

  const handleMenuToggle = () => {
    document.getElementById("menu").classList.toggle("active");
    openSound();
  };

  const handleMenuSelect = (e) => {
    const page = e.querySelector("a").getAttribute("page");
    document.getElementById("menu").classList.remove("active");
    openSound();

    setLocalStorage(LOCAL_STORAGE_KEY, page);

    e.classList.add("menu", "active", "selected");

    if (page === "#") {
      document.querySelector(".soon").classList.add("active");
    } else {
      setTimeout(() => {
        setLocalStorage(LOCAL_STORAGE_KEY, page);
        window.location.href = page;
      }, 2000);
    }

    setTimeout(() => {
      document.querySelector(".soon").classList.remove("active");
      e.classList.remove("menu", "active", "selected");
    }, 2050);
  };

  const handleLinkHover = () => {
    hoverSound();
  };

  useEffect(() => {
    console.log(getLocalStorage(LOCAL_STORAGE_KEY));

    document.querySelectorAll("li").forEach((link) => {
      link.querySelector("ion-icon").addEventListener('click', () => handleMenuSelect(link));
    });

    document.querySelectorAll("a").forEach((link) => {
      link.addEventListener('mouseenter', handleLinkHover);
    });

    return () => {
      document.querySelectorAll("li").forEach((link) => {
        link.removeEventListener('click', () => handleMenuSelect(link));
      });
      document.querySelectorAll("a").forEach((link) => {
        link.removeEventListener('mouseenter', handleLinkHover);
      });
    };
  }, []);


  // Animation for coming back to home page from a selected page
  useEffect(() => {
    const page = getLocalStorage(LOCAL_STORAGE_KEY);
    if (page === "#") return; // Don't animate if the page is already home
    if (page) {
      setLocalStorage(LOCAL_STORAGE_KEY, "#"); // Reset the page to home
      const selected = document.querySelector(`li a[page="${page}"]`);
      if (selected) {
        selected.parentNode.classList.add("menu", "active", "selected");

        setTimeout(() => {
          selected.parentNode.style.transition = "";
          selected.parentNode.classList.remove("menu", "active", "selected");
        }
        , 200);

        setTimeout(() => {
          document.getElementById("menu").classList.add("active");
        }, 1200);
      }
    }
  }), [];

  return (
    <>
      <div className="soon">Coming Soon!</div>
      <ul id="menu" className="menu">
        <div className="menuToggle" onClick={handleMenuToggle}><ion-icon name="add-outline"></ion-icon></div>
        <li style={{ "--i": 0, "--clr": "#ff2972" }}>
          <a page="#"><ion-icon src={bucket}></ion-icon></a>
        </li>
        <li style={{ "--i": 1, "--clr": "#fee800" }}>
          <a page="/maze/"><ion-icon src={maze}></ion-icon></a>
        </li>
        <li style={{ "--i": 2, "--clr": "#04fc43" }}>
          <a page="#"><ion-icon src={chess}></ion-icon></a>
        </li>
        <li style={{ "--i": 3, "--clr": "#fe00f1" }}>
          <a page="#"><ion-icon src={}></ion-icon></a>
        </li>
        <li style={{ "--i": 4, "--clr": "#00b0fe" }}>
          <a page="#"><ion-icon name="camera-outline"></ion-icon></a>
        </li>
        <li style={{ "--i": 5, "--clr": "#fea600" }}>
          <a page="#"><ion-icon name="game-controller-outline"></ion-icon></a>
        </li>
        <li style={{ "--i": 6, "--clr": "#a529ff" }}>
          <a page="#"><ion-icon name="person-outline"></ion-icon></a>
        </li>
        <li style={{ "--i": 7, "--clr": "#01bdab" }}>
          <a page="#"><ion-icon name="videocam-outline"></ion-icon></a>
        </li>
      </ul>
    </>
  );
}

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
}

const getLocalStorage = (key) => {
  return localStorage.getItem(key);
}
