import React from "react";
import "./Splash.css";
const Splash = () => {
  return (
    <div className="welcome">
      <span id="splash-overlay" className="splash"></span>
      <span id="welcome" className="z-depth-4"></span>
    </div>
  );
};

export default Splash;
