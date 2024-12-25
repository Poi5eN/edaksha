import React from "react";
import { useRef, useEffect } from "react";
import gsap from "gsap"; // Import GSAP

const Nav = () => {
  const tl = useRef(
    gsap.timeline({ defaults: { duration: 1, ease: "expo.inOut" } })
  );

  useEffect(() => {
    const open = document.querySelector(".container");
    const close = document.querySelector(".close");

    open.addEventListener("click", () => {
      if (tl.current.reversed()) {
        tl.current.play();
      } else {
        tl.current
          .to(".nav-body .container nav", { right: 0 })
          .to(".nav-body .container nav", { height: "100vh" }, "-=.1")
          .to(
            ".nav-body .container nav ul li a",
            { opacity: 1, pointerEvents: "all", stagger: 0.2 },
            "-=.8"
          )
          .to(".close", { opacity: 1, pointerEvents: "all" }, "-=.8")
          .to(".nav-body .container nav h2", { opacity: 1 }, "-=1");
      }
    });

    close.addEventListener("click", () => {
      tl.current.reverse();
    });

    // Cleanup event listeners when component unmounts
    return () => {
      open.removeEventListener("click", () => {
        if (tl.current.reversed()) {
          tl.current.play();
        } else {
          tl.current
            .to(".nav-body .container nav", { right: 0 })
            .to(".nav-body .container nav", { height: "100vh" }, "-=.1")
            .to(
              ".nav-body .container nav ul li a",
              { opacity: 1, pointerEvents: "all", stagger: 0.2 },
              "-=.8"
            )
            .to(".close", { opacity: 1, pointerEvents: "all" }, "-=.8")
            .to(".nav-body .container nav h2", { opacity: 1 }, "-=1");
        }
      });

      close.removeEventListener("click", () => {
        tl.current.reverse();
      });
    };
  }, []); // Run effect only on component mount and unmount

  return (
    <>
      <div className="nav-body">
        <div className="container">
          <div className="bars"></div>
        </div>
        <h1>Animated Nav With GSAP 3.0</h1>
        <nav>
          <h2>Ahmed</h2>
          <div className="close">
            <div></div>
          </div>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Projects</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Nav;
