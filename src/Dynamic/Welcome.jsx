import React, { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import welcome from "../../src/ShikshMitraWebsite/assets/welcome.jpg";
// import {welcome} from "../assets/welcome.jpg";

const Welcome = () => {
  const { currentColor } = useStateContext();
  const [greeting, setGreeting] = useState("Hello");
  const [dateTime, setDateTime] = useState({
    date: "",
    time: "",
  });
  const fullName = sessionStorage.getItem("fullName");
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const hours = now.getHours();

      if (hours < 12) {
        setGreeting("Good Morning");
      } else if (hours < 18) {
        setGreeting("Good Afternoon");
      } else {
        setGreeting("Good Evening");
      }

      // Format the date and time
      const formattedDate = now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setDateTime({ date: formattedDate, time: formattedTime });
    };

    // Initial update
    updateDateTime();

    // Update every second
    const interval = setInterval(updateDateTime, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex items-center justify-between text-white p-6 rounded-lg shadow-lg"
      style={{
        background: `linear-gradient(to right, ${currentColor}, ${"#ffffff"})`,
      }}
    >
      <div>
        <p className="text-lg font-semibold">{greeting} 👋</p>
        <p className="text-sm mt-1">{dateTime.date}</p>
        <p className="text-sm">{dateTime.time}</p>
        <h1 className="text-2xl font-bold mt-2">
          Welcome Back! Mr. {fullName}
        </h1>
      </div>
      <div>
        <img
          src={welcome}
          alt="Illustration"
          className="h-20 w-20 object-contain"
        />
      </div>
    </div>
  );
};

export default Welcome;
