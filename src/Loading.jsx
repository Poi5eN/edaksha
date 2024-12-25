import React from "react";
import "./Loading.css";
import logo from "../src/ShikshMitraWebsite/assets/SHIKSHAMITRA_logo.png";
const Loading = () => {
  return (
    <>
      <center className="mt-10">
        <br />
        <br />
        <br />
        <div class="loader" id="loader"></div>
        <div class="loader" id="loader2"></div>
        <div class="loader" id="loader3"></div>
        <div class="loader" id="loader4"></div>
        <span id="text">
          <img className="w-[150px] h-auto object-contain" src={logo} alt="" />
        </span>
        <br />
      </center>
    </>
  );
};

export default Loading;
