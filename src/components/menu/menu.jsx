import React, { useEffect, useState } from "react";
import { useSound } from "../useSound";

import open from "../../../public/audio/open.mp3";
import beep from "../../../public/audio/beep.mp3";

import graph2 from "../../../public/svg/graph2.svg";
import graph from "../../../public/svg/graph.svg";
import bucket from "../../../public/svg/bucket.svg";
import maze from "../../../public/svg/maze.svg";
import chess from "../../../public/svg/chess.svg";

import "./menu.css";

const LOCAL_STORAGE_KEY = "pageTurnedTo";

export default function Menu() {
  const { playSound: openSound } = useSound(open);
  const { playSound: hoverSound } = useSound(beep);

  // State to store the selected page
  const [selectedPage, setSelectedPage] = useState(getLocalStorage(LOCAL_STORAGE_KEY) || "#");

  useEffect(() => {
    if (selectedPage === "#") return; // Don't animate if the page is already home
    if (selectedPage) {
      setLocalStorage(LOCAL_STORAGE_KEY, "#"); // Reset the page to home
      const selected = document.querySelector(`li a[page="${selectedPage}"]`);
      if (selected) {
        setTimeout(() => {
          selected.parentNode.classList.remove("menu", "active", "selected");
        }, 200);

        setTimeout(() => {
          document.getElementById("menu").classList.add("active");
        }, 1200);
      }
    }
  }, []);

  const handleMenuToggle = () => {
    document.getElementById("menu").classList.toggle("active");
    openSound();
  };

  const handleMenuSelect = (e) => {
    const page = e.querySelector("a").getAttribute("page");
    document.getElementById("menu").classList.remove("active");
    openSound();

    setLocalStorage(LOCAL_STORAGE_KEY, page);
    setSelectedPage(page);

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

  return (
    <>
      <div className="soon">Coming Soon!</div>
      <ul id="menu" className="menu">
        <div className="menuToggle" onClick={handleMenuToggle}>
          <ion-icon name="add-outline"></ion-icon>
        </div>
        <li
          style={{ "--i": 0, "--clr": "#ff2972" }}
          className={selectedPage === "/apple/" ? "menu active selected" : ""}
        >
          <a page="#"><ion-icon src={bucket}></ion-icon></a>
        </li>
        <li
          style={{ "--i": 1, "--clr": "#fee800" }}
          className={selectedPage === "/maze/" ? "menu active selected" : ""}
        >
          <a page="/maze/"><ion-icon src={maze}></ion-icon></a>
        </li>
        <li
          style={{ "--i": 2, "--clr": "#04fc43" }}
          className={selectedPage === "/chess/" ? "menu active selected" : ""}
        >
          <a page="#"><ion-icon src={chess}></ion-icon></a>
        </li>
        <li
          style={{ "--i": 3, "--clr": "#fe00f1" }}
          className={selectedPage === "/key/" ? "menu active selected" : ""}
        >
          <a page="#"><ion-icon name="key-outline"></ion-icon></a>
        </li>
        <li
          style={{ "--i": 4, "--clr": "#00b0fe" }}
          className={selectedPage === "/graph2/" ? "menu active selected" : ""}
        >
          <a page="/graph2/">
            <ion-icon src={graph2} style={{ height: "32px", width: "32px" }}></ion-icon>
          </a>
        </li>
        <li
          style={{ "--i": 5, "--clr": "#fea600" }}
          className={selectedPage === "/map/" ? "menu active selected" : ""}
        >
          <a page="#"><ion-icon name="map-outline"></ion-icon></a>
        </li>
        <li
          style={{ "--i": 6, "--clr": "#a529ff" }}
          className={selectedPage === "/graph/" ? "menu active selected" : ""}
        >
          <a page="/graph/">
            <ion-icon style={{ height: "32px", width: "32px" }} src={graph}></ion-icon>
          </a>
        </li>
        <li
          style={{ "--i": 7, "--clr": "#01bdab" }}
          className={selectedPage === "/dice/" ? "menu active selected" : ""}
        >
          <a page="#"><ion-icon name="dice-outline"></ion-icon></a>
        </li>
      </ul>
    </>
  );
}

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

const getLocalStorage = (key) => {
  return localStorage.getItem(key);
};
