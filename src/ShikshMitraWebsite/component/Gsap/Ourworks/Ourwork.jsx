import React, { useRef } from "react";
import "./Ourwork.css";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import vid1 from "../../../assets/2759477-uhd_3840_2160_30fps.mp4";
import { Link } from "react-router-dom";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Ourwork = () => {
  const box = useRef();

  useGSAP(
    () => {
      let t17 = gsap.timeline({
        scrollTrigger: {
          trigger: ".part-7",

          start: "50% 50%",
          end: "300% 50%",
          pin: true,
          scrub: 1,
        },
      });
      t17.to("#demo", {
        bottom: "7%",
      });
      t17.to(
        ".our-work-text-div",
        {
          height: "100vh",
        },
        "height"
      );
      t17.to(
        ".our-work-txt",
        {
          height: "70vh",
        },
        "height"
      );

      t17.to(
        "#our",
        {
          left: "0%",
        },
        "height"
      );

      t17.to(
        "#work",
        {
          position: "absolute",
          right: "-130%",
        },
        "height"
      );

      t17.to(
        ".scroll-img",
        {
          marginTop: "-250%",
        },
        "height"
      );
    },
    { scope: box }
  );

  return (
    <>
      <div
        className="w-[100%] min-h-[100vh] bg-[#1f2937] "
        ref={box}

        // data-scroll data-scroll-section data-scroll-speed=".3"
      >
        <h1 className="text-gray-400 text-center ">
          Our platform offers a range of features and dashboards that empower
          educational institutions to manage their operations efficiently.
        </h1>
        <div className="part-7 bg-[#1f2937] ">
          <div className="our-work-txt">
            <h1 id="our">Our</h1>
            <h1 id="work">Work</h1>
          </div>
          <div className="our-work-text-div">
            <div className="scroll-work">
              <div className="scroll-img">
                <video
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  autoPlay
                  loop
                  muted
                >
                  <source src={vid1} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
          <button id="demo"> DEMO</button>
        </div>
      </div>
    </>
  );
};

export default Ourwork;
