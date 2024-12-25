import React, { useState, useRef, useEffect, Children } from 'react';


const Marquee = ({ list, time, height ,children }) => {
  console.log("ChildrenChildrenChildrenChildren",children)
  // console.log("listlistlistlistlist",list)
    const marqueeContainer = useRef(null);
    const marqueeArea = useRef(null);
    const [moveUp, setMoveUp] = useState(0);
    // const [showList, setShowList] = useState([]);
    const [showList, setShowList] = useState(list);
    const [realTime, setRealTime] = useState(time);
    const [isHovered, setIsHovered] = useState(false);

    // Calculate the scroll position and adjust animation properties
    useEffect(() => {
        const containerHeight = Math.floor(marqueeContainer.current.offsetHeight);
        const areaHeight = Math.floor(marqueeArea.current.scrollHeight);
        const copyTimes = Math.max(2, Math.ceil((containerHeight * 2) / areaHeight));
        const newMoveUp = areaHeight * Math.floor(copyTimes / 2);
        const newRealTime = time * parseFloat((newMoveUp / containerHeight).toFixed(2));
        // setShowList([...list]); // Duplicate list items to keep the scroll going
        // setShowList([...list, ...list]); // Duplicate list items to keep the scroll going
        setMoveUp(newMoveUp);
        setRealTime(newRealTime);
    }, [ time]);
    // }, [list, time]);

    // Handle mouse hover to pause the marquee at the current position
    const handleMouseEnter = () => {
        setIsHovered(true);
        if (marqueeArea.current) {
            const currentScroll = marqueeArea.current.scrollTop;
            marqueeArea.current.style.animationPlayState = 'paused';
            setMoveUp(currentScroll); // Pause at the current scroll position
        }
    };

    // Handle mouse leave to resume the marquee animation
    const handleMouseLeave = () => {
        setIsHovered(false);
        if (marqueeArea.current) {
            marqueeArea.current.style.animationPlayState = 'running';
        }
    };

    return (
        <div
            ref={marqueeContainer}
            className={`relative w-full  overflow-hidden `}
            style={{ height: height }}
            //   className={`relative w-64 h-32 mt-4 overflow-hidden bg-white`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                ref={marqueeArea}
                className={`absolute w-full transition-all duration-[${realTime}s]`}
                style={{
                    transform: `translateY(-${moveUp}px)`,
                    animation: `marqueeY ${realTime}s linear infinite`,
                    animationPlayState: isHovered ? 'paused' : 'running'
                }}
            >
              {children}
                {/* {showList.map((item, index) => (
                    //   <div key={index} className="text-xl text-blue-600 mb-4">
                    //     🎉 {item} 🎉
                    //   </div>
                    <div class=" items-center gap-4 p-1 border rounded-sm shadow-sm bg-white my-[1px] mx-1 ">

                        <span class="px-2 py-1 bg-gray-100 text-gray-800 text-[10px] font-semibold rounded">
                            {item.role}
                        </span>


                        <div class="flex items-center justify-between w-full">

                            <div>
                                <h4 class=" font-bold text-[12px]"> {item.fullName}</h4>
                                <h4 class="text-gray-600 font-bold text-[10px]"> Class : {item.class}-{item.section} </h4>
                                <p class="text-gray-600 text-sm">{item.bday} Birthday 🎂 🎉</p>
                            </div>


                            <div>
                                <img
                                    class="w-10 h-10 rounded-full"
                                    src="https://via.placeholder.com/40"
                                    alt="User Avatar"
                                />
                            </div>
                        </div>
                    </div>

                ))} */}
            </div>
        </div>
    );
};
export default Marquee



// import React, { useEffect, useRef, useState } from "react";

// const Marquee = ({ children, height }) => {
//   const marqueeWrapperRef = useRef(null);
//   const marqueeContentRef = useRef(null);
//   const [animationDuration, setAnimationDuration] = useState(null);
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     const wrapperHeight = marqueeWrapperRef.current.offsetHeight;
//     const contentHeight = marqueeContentRef.current.scrollHeight;

//     if (contentHeight > wrapperHeight) {
//       const speed = contentHeight / wrapperHeight; // Dynamic speed calculation
//       const duration = speed * 5; // Adjust the multiplier as needed (5s per screen height)
//       setAnimationDuration(duration); // Set dynamic animation duration
//     } else {
//       setAnimationDuration(null); // No animation if content is smaller
//     }
//   }, [children]);

//   // Event handlers to manage hover state
//   const handleMouseEnter = () => {
//     setIsHovered(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//   };

//   return (
//     <div
//       className="marquee-wrapper"
//       style={{ height: height, overflow: "hidden" }}
//       ref={marqueeWrapperRef}
//     >
//       <div
//         className="marquee-content"
//         style={{
//           animation: animationDuration
//             ? `scroll-up ${animationDuration}s linear infinite`
//             : "none",
//           animationPlayState: isHovered ? "paused" : "running", // Pause/resume animation on hover
//         }}
//         ref={marqueeContentRef}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Marquee;