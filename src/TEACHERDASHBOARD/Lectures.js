import React, { useState, useEffect } from "react";
// import {toast} from react-toastify;
import {  toast } from 'react-toastify';
import axios from "axios";
import Cookies from 'js-cookie';
import { useStateContext } from "../contexts/ContextProvider";
import { Button } from "@mui/material";

const authToken = Cookies.get('token');


const Lectures = () => {
  const { currentColor} = useStateContext();
  // const isStudent = props.student;
  const [timetable, setTimetable] = useState(
    [
    ["", "", "", "", "", "", "", ""], // Monday
    ["", "", "", "", "", "", "", ""], // Tuesday
    ["", "", "", "", "", "", "", ""], // Wednesday
    ["", "", "", "", "", "", "", ""], // Thursday
    ["", "", "", "", "", "", "", ""], // Friday
    ["", "", "", "", "", "", "", ""], // Saturday
  ]
  );

 
  
  const [teacherid,setTeacherId] =  useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [dependency, setDependency] = useState(false);

  const handleCellChange = (dayIndex, periodIndex, value) => {
    const updatedTimetable = [...timetable];
    updatedTimetable[dayIndex][periodIndex] = value;
    setTimetable(updatedTimetable);

   
  };

  const data = JSON.parse(sessionStorage.response);


  useEffect(() => {
    axios.get(`https://eserver-i5sm.onrender.com/api/v1/timeTable/getClassTimeTable?className=${data.classTeacher}&section=${data.section}` , {
      withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          }, 
    })
    .then((res) => {

      if (res.data.timeTable && res.data.timeTable.length > 0) {
        const timetableId = res.data.timeTable[0]._id;
        console.log("Timetable ID:", timetableId);
        setTeacherId(timetableId);
      } else {
        console.log("timeTable is empty or undefined.");
      }
      

      const fetchedTimetable = res.data.timeTable[0]; // Assuming there's only one item in the array

      // const fetchedTimetable = res.data.timeTable[0]; // Assuming there's only one item in the array
      const updatedTimetable = [];

      // Define the order of days and periods
      const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
      const periods = ["period1", "period2", "period3", "period4", "period5", "period6", "period7", "period8"];

      // Iterate through days and periods to build the updatedTimetable array
      daysOfWeek.forEach((day) => {
        const daySchedule = [];
        periods.forEach((period) => {
          daySchedule.push(fetchedTimetable[day][period]);
        });
        updatedTimetable.push(daySchedule);
      });

      setTimetable(updatedTimetable);
      console.log("Updated Timetable", updatedTimetable);
    }).catch(
      (err) =>{
        console.log(err.message);
        // console.error(Error)
        console.log("Error in the ")
      }
    )
  } , [dependency])

  const handleSubmit = async () => {

      const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const formattedTimetable = daysOfWeek.reduce((result, day, dayIndex) => {
        result[day.toLowerCase()] = {
          period1: timetable[dayIndex][0],
          period2: timetable[dayIndex][1],
          period3: timetable[dayIndex][2],
          period4: timetable[dayIndex][3],
          period5: timetable[dayIndex][4],
          period6: timetable[dayIndex][5],
          period7: timetable[dayIndex][6],
          period8: timetable[dayIndex][7],
        };
        return result;
      }, {});
    
      console.log(formattedTimetable);

      await axios
      .post("https://eserver-i5sm.onrender.com/api/v1/timeTable/createClassTimeTable", formattedTimetable, {
        withCredentials: true,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      })
      .then(() => {
        console.log("Timetable submitted:", formattedTimetable);
        setIsEditing(false); // Disable editing after submission
      })
      .catch((error) => {
        console.error("Error posting timetable data:", error);
      });

      setDependency(!dependency);
  };

 

  const handleDelete = async() => {
    // Assuming `data` contains the timetable object with an `_id` property
    // const timetableId = data._id;
    const timetableId = teacherid;
    console.log(timetableId);
    // https://eserver-i5sm.onrender.com/api/v1/timeTable/deleteClassTimeTable/65449334131ddb58cb6de7f6
    await axios
      .delete(`https://eserver-i5sm.onrender.com/api/v1/timeTable/deleteClassTimeTable/${timetableId}`, {
        withCredentials: true,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      })
      .then(() => {
        console.log("Timetable deleted successfully");
        // toast.sucess("Delete the time table sucessfully ")
        toast("Deleted!");
        setTimetable( [
          ["", "", "", "", "", "", "", ""], 
          ["", "", "", "", "", "", "", ""], 
          ["", "", "", "", "", "", "", ""], 
          ["", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", ""], 
          ["", "", "", "", "", "", "", ""], 
        ])
        
        setDependency(!dependency);
        // You can also handle any additional logic or UI updates after successful deletion
        
      })
      .catch((error) => {
        console.error("Error deleting timetable:", error);
        // Handle errors or show error messages to the user
      });
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 uppercase text-center  hover-text"
      style={{color:currentColor}}
      >School Dashboard</h1>
      <table className="table-auto w-full border p-2">
        <thead>
        <tr className="  text-white"
        style={{background:currentColor}}
        >
            <th className="border border-blue-500 px-4 py-2"></th>
            <th className="border border-blue-500 px-4 py-2">Period 1</th>
            <th className="border border-blue-500 px-4 py-2">Period 2</th>
            <th className="border border-blue-500 px-4 py-2">Period 3</th>
            <th className="border border-blue-500 px-4 py-2">Period 4</th>
            <th className="border border-blue-500 px-4 py-2">Period 5</th>
            <th className="border border-blue-500 px-4 py-2">Period 6</th>
            <th className="border border-blue-500 px-4 py-2">Period 7</th>
            <th className="border border-blue-500 px-4 py-2">Period 8</th>
          </tr>
        </thead>
        <tbody>
          {
            timetable.map((day, dayIndex) => (

              <tr key={dayIndex} className="border">
                <td className="text-left px-2 py-2 font-semibold border">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayIndex]}
                </td>
                {
                day.map((subject, periodIndex) => (
                    <td key={periodIndex} className="px-4 py-2 border text-center">
                      {isEditing ? (
                        <input
                          type="text"
                          value={subject}
                          onChange={(e) => handleCellChange(dayIndex, periodIndex, e.target.value)}
                          className="border border-gray-400 p-2 w-full"
                        />
                      ) : (
                        <span>{subject}</span>
                      )
                      }
                    </td>
                  ))
                }
              </tr>
            )
            )
          }
        </tbody>
      </table>
      <div className="mt-4 ">
        {isEditing ? (
           <Button
           variant="contained"
           style={{ backgroundColor: currentColor, marginRight: "20px" }}
           onClick={handleSubmit}
         >
           Submit
         </Button>
          // <button
          //   onClick={handleSubmit}
          //   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          // >
          //   Submit
          // </button>
        ) : (
          // <button
          //   onClick={() => setIsEditing(true)}
          //   className="dark:text-white dark:bg-secondary-dark-bg text-gray-800   mx-auto neu-btn border-2 "
          //  style={{border:`2px solid ${currentColor} `,color:currentColor}}
          // >
          //   Create
          // </button>
           <Button
           variant="contained"
           style={{ backgroundColor: currentColor, marginRight: "20px" }}
           onClick={() => setIsEditing(true)}
         >
           Create
         </Button>
        )}
  {
    !isEditing &&
    <Button
           variant="contained"
           style={{ backgroundColor: "gray" }}
           onClick={handleDelete}
         >
           Delete
         </Button>
  //    <button
  //   className="dark:text-white dark:bg-secondary-dark-bg text-gray-800   mx-auto neu-btn border-2 border-red-600 ml-2"
  //   onClick={handleDelete}
  //  >Delete </button>
  }
      </div>
     
    </div>
  );
};

export default Lectures;


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Lectures = () => {
//   const [timetable, setTimetable] = useState([
//     ["", "", "", "", "", "", "", ""], // Monday
//     ["", "", "", "", "", "", "", ""], // Tuesday
//     ["", "", "", "", "", "", "", ""], // Wednesday
//     ["", "", "", "", "", "", "", ""], // Thursday
//     ["", "", "", "", "", "", "", ""], // Friday
//     ["", "", "", "", "", "", "", ""], // Saturday
//   ]);

//   const [isEditing, setIsEditing] = useState(false);

//   const handleCellChange = (dayIndex, periodIndex, value) => {
//     const updatedTimetable = [...timetable];
//     updatedTimetable[dayIndex][periodIndex] = value;
//     setTimetable(updatedTimetable);

//     console.log("P2 Time Table", timetable);
//   };

//   const handleSubmit = async () => {
//       const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//       const formattedTimetable = daysOfWeek.reduce((result, day, dayIndex) => {
//         result[day.toLowerCase()] = {
//           period1: timetable[dayIndex][0],
//           period2: timetable[dayIndex][1],
//           period3: timetable[dayIndex][2],
//           period4: timetable[dayIndex][3],
//           period5: timetable[dayIndex][4],
//           period6: timetable[dayIndex][5],
//           period7: timetable[dayIndex][6],
//           period8: timetable[dayIndex][7],
//         };
//         return result;
//       }, {});
    
//       console.log(formattedTimetable);

//       await axios
//       .post("https://eserver-i5sm.onrender.com/api/v1/timeTable/createClassTimeTable", formattedTimetable, {
//         withCredentials: true,
      // headers: {
      //   Authorization: `Bearer ${authToken}`,
      // },
//       })
//       .then(() => {
//         console.log("Timetable submitted:", formattedTimetable);
//         setIsEditing(false); // Disable editing after submission
//       })
//       .catch((error) => {
//         console.error("Error posting timetable data:", error);
//       });
//   };


//   // };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">School Dashboard</h1>
//       <table className="table-auto w-full border p-2">
//         <thead>
//           <tr className="border">
//             <th className="border"></th>
//             <th className="border">Period 1</th>
//             <th className="border">Period 2</th>
//             <th className="border">Period 3</th>
//             <th className="border">Period 4</th>
//             <th className="border">Period 5</th>
//             <th className="border">Period 6</th>
//             <th className="border">Period 7</th>
//             <th className="border">Period 8</th>
//           </tr>
//         </thead>
//         <tbody>
//           {
//             timetable.map((day, dayIndex) => (

//               <tr key={dayIndex} className="border">
//                 <td className="text-left px-2 py-2 font-semibold border">
//                   {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayIndex]}
//                 </td>
//                 {day.map((subject, periodIndex) => (
//                     <td key={periodIndex} className="px-4 py-2 border text-center">
//                       {isEditing ? (
//                         <input
//                           type="text"
//                           value={subject}
//                           onChange={(e) => handleCellChange(dayIndex, periodIndex, e.target.value)}
//                           className="border border-gray-400 p-2 w-full"
//                         />
//                       ) : (
//                         <span>{subject}</span>
//                       )
//                       }
//                     </td>
//                   ))
//                 }
//               </tr>
//             )
//             )
//           }
//         </tbody>
//       </table>
//       <div className="mt-4">
//         {isEditing ? (
//           <button
//             onClick={handleSubmit}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Submit
//           </button>
//         ) : (
//           <button
//             onClick={() => setIsEditing(true)}
//             className="bg-green-500 hover.bg-green-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Edit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Lectures;