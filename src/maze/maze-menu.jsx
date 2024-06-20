import React, { useEffect } from "react";
import { useSound } from "../components/useSound";
import "./maze-menu.css";

import open from "../../public/audio/open.mp3";
import beep from "../../public/audio/beep.mp3";

import bucket from "../../public/svg/bucket.svg";
import maze from "../../public/svg/maze.svg";
import chess from "../../public/svg/chess.svg";

export default function MazeMenu() {

  const { playSound: openSound } = useSound(open);
  const { playSound: hoverSound } = useSound(beep);

  const handleMenuToggle = () => {
    document.getElementById("maze-menu").classList.toggle("active");
    openSound();
  };

  const handleMenuSelect = (e) => {
    const page = e.getAttribute("page");
    document.getElementById("maze-menu").classList.remove("active");
    openSound();

    setTimeout(() => {
    window.location.href = page;
    }
    , 1300);
  }

  useEffect(() => {
    const handleLinkHover = () => {
      hoverSound();
    };

    document.querySelectorAll("a").forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHover);
      link.addEventListener("click", () => handleMenuSelect(link));
    });

    return () => {
      document.querySelectorAll("a").forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHover);
        link.removeEventListener("click", () => handleMenuSelect(link));
      });
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      document.getElementById("maze-menu").classList.add("active");
    }, 200);
  }, []);

  return (
    <>
      <ul id="maze-menu" className="maze-menu">
        <div onClick={handleMenuToggle} className="maze-menuToggle"><ion-icon src={maze}></ion-icon></div>
        <li style={{ "--i": 0, "--clr": "#ff2972" }}>
          <a page="/">
            <ion-icon name="home-outline"></ion-icon>
          </a>
        </li>
        <li style={{ "--i": 1, "--clr": "#fee800" }}>
          <a page="#">
            <ion-icon src={maze}></ion-icon>
          </a>
        </li>
        <li style={{ "--i": 2, "--clr": "#04fc43" }}>
          <a page="#">
            <ion-icon src={chess}></ion-icon>
          </a>
        </li>
        <li style={{ "--i": 3, "--clr": "#fe00f1" }}>
          <a page="#">
            <ion-icon name="key-outline"></ion-icon>
          </a>
        </li>
        <li style={{ "--i": 4, "--clr": "#01bdab" }}>
          <a page="#">
            <ion-icon name="videocam-outline"></ion-icon>
          </a>
        </li>
      </ul>
    </>
  );
}
