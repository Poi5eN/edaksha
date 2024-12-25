import React, { useState } from "react";
import v1 from "./demo.mp4";

const App = () => {
  const VIDEOS = {
    ITS: v1,
    landing: "https://www.youtube.com/embed/4jEz03Z8azc",
    grassHopper: "https://www.youtube.com/embed/ZwwS4YOTbbw",
    story: "https://www.youtube.com/embed/tU1b1H2EWU4",
  };

  const [src, setSrc] = useState(VIDEOS.ITS);

  const handleMenuClick = (newSrc) => {
    setSrc(newSrc);
  };

  return (
    <div className="bg-[#19212c] min-h-screen flex flex-col justify-center items-center md:pt-24">
      <div className="w-full  lg:w-1/2 relative mb-8">
        <div
          className="relative overflow-hidden"
          style={{ paddingTop: "56.25%" }}
        >
          <iframe
            title="video"
            src={src}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
      </div>

      {/* Radio Inputs Section */}
      <form
        className="w-full md:flex gap-5 lg:w-1/2"
        onChange={(e) => handleMenuClick(e.target.value)}
      >
        <label className="block text-white mb-2">
          <input type="radio" name="src" value={VIDEOS.ITS} defaultChecked />{" "}
          ADMIN
        </label>
        <label className="block text-white mb-2">
          <input type="radio" name="src" value={VIDEOS.landing} /> TEACHER
        </label>
        <label className="block text-white mb-2">
          <input type="radio" name="src" value={VIDEOS.grassHopper} /> STUDENT
        </label>
        <label className="block text-white mb-2">
          <input type="radio" name="src" value={VIDEOS.story} /> PARENT
        </label>
      </form>
    </div>
  );
};

export default App;
