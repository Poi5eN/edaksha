import React, { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import welcome from "../../src/ShikshMitraWebsite/assets/welcome.jpg";
// import {welcome} from "../assets/welcome.jpg";

const Welcome = () => {
    const { currentColor } = useStateContext()
  const [greeting, setGreeting] = useState("Hello");
  const [dateTime, setDateTime] = useState({
    date: "",
    time: "",
  });
  const fullName = sessionStorage.getItem("fullName");
  useEffect(() => {
    // Function to update greeting and time
    const updateDateTime = () => {
      // Get the current time to determine the greeting
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


     {/* <div className={`flex items-center justify-between bg-gradient-to-r from-[${currentColor}] to-purple-400 text-white p-6 rounded-lg shadow-lg`}> */}
    {/* <div className="flex items-center justify-between bg-gradient-to-r from-pink-500 to-purple-400 text-white p-6 rounded-lg shadow-lg"> */}
      <div>
        <p className="text-lg font-semibold">{greeting} 👋</p>
        <p className="text-sm mt-1">{dateTime.date}</p>
        <p className="text-sm">{dateTime.time}</p>
        <h1 className="text-2xl font-bold mt-2">Welcome Back! Mr. {fullName}</h1>
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


// import React, { useState, useEffect } from "react";

// const Timer = () => {
//   const [greeting, setGreeting] = useState("Hello");
//   const [date, setDate] = useState("");

//   useEffect(() => {
//     // Get current time to determine the greeting
//     const hours = new Date().getHours();
//     if (hours < 12) {
//       setGreeting("Good Morning");
//     } else if (hours < 18) {
//       setGreeting("Good Afternoon");
//     } else {
//       setGreeting("Good Evening");
//     }

//     // Get the current date in a readable format
//     const today = new Date();
//     const formattedDate = today.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//     setDate(formattedDate);
//   }, []);

//   return (
//     <div className="flex items-center justify-between bg-gradient-to-r from-pink-500 to-purple-400 text-white p-6 rounded-lg shadow-lg">
//       <div>
//         <p className="text-lg font-semibold">{greeting} 👋</p>
//         <p className="text-sm mt-1">{date}</p>
//         <h1 className="text-2xl font-bold mt-2">Welcome Back! Mr. Administrator</h1>
//       </div>
//       <div>
//         <img
//           src="https://via.placeholder.com/100"
//           alt="Illustration"
//           className="h-20 w-20 object-contain"
//         />
//       </div>
//     </div>
//   );
// };

// export default Timer;



// import React from 'react'

// const Timer = () => {
//   return (
//     <div class="flex items-center justify-between bg-gradient-to-r from-pink-500 to-purple-400 text-white p-6 rounded-lg shadow-lg">
//   <div>
//     <p class="text-lg font-semibold">Good Afternoon 👋</p>
//     <p class="text-sm mt-1">December 14, 2024</p>
//     <h1 class="text-2xl font-bold mt-2">Welcome Back! Mr. Administrator</h1>
//   </div>
//   <div>
//     <img
//       src="https://via.placeholder.com/100"
//       alt="Illustration"
//       class="h-20 w-20 object-contain"
//     />
//   </div>
// </div>

//   )
// }

// export default Timer