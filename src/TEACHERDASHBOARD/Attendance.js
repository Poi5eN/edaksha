import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import axios from "axios";
import "tailwindcss/tailwind.css";
import Cookies from "js-cookie";

import { useStateContext } from "../contexts/ContextProvider";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
const authToken = Cookies.get("token");
const Attendance = () => {
  const [loading, setLoading] = useState(false);
  const { currentColor} = useStateContext();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [studentPresent, setStudentPresent] = useState([]);
  const [date, setDate] = useState(getFormattedDate(new Date()));
  const [isEditing, setIsEditing] = useState(true);
  const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(new Date()));
  const [currentDate, setCurrentDate] = useState("");
  const [studentAttendance, setStudentAttendance] = useState([]);
  const [studentTotalPresents, setStudentTotalPresents] = useState([]);
  const [dataAvailable, setDataAvailable] = useState(false);
  const [hoverMessage, setHoverMessage] = useState(""); // State to store the hover message

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      if (studentTotalPresents) {
        setStudentTotalPresents(
          Array(students.length).fill(studentTotalPresents)
        );
      } else {
        setStudentTotalPresents(Array(students.length).fill(0));
      }
      isFirstRender.current = false;
    }
  }, []);
  // console.log(studentTotalPresents);

  // Get Students
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(
          "https://eserver-i5sm.onrender.com/api/v1/adminRoute/getAllStudents",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (Array.isArray(response.data.allStudent)) {
          const classTeacher = JSON.parse(sessionStorage.response).classTeacher;
          const classTeacherSection = JSON.parse(sessionStorage.response).section;
          // console.log("first,",JSON.parse(sessionStorage.response))
          const updatedStudents = response.data.allStudent
            // .filter((student) => student.class === classTeacher)
            .filter((student) => student.class === classTeacher  && student.section === classTeacherSection)
            // (student) => student.class === classTeacherClass && student.section === classTeacherSection
            .map((student) => ({
              id: student._id,
              name: student.fullName,
              rollNo: student.rollNo,
              attendance: false,
            }));

          setStudents(updatedStudents);
        } else {
          console.error(
            "Data format is not as expected:",
            response.data.allStudent
          );
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, []);

  const toggleAttendance = (studentId) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId
          ? { ...student, attendance: !student.attendance }
          : student
      )
    );
  };

  

  useEffect(() => {
    setDataAvailable(true);
    fetchData();
  }, [date]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const selectedDate = new Date(date);
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    try {
      const response = await axios.get(
        "https://eserver-i5sm.onrender.com/api/v1/teacher/getAttendance",
        {
          params: {
            year: year,
            month: month,
          },
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data && response.data.data) {
        // console.log(response.data.data[0].attendanceData[0].date);
        const attendanceData = response.data.data;
        if (attendanceData.length > 0) {
          // console.log(attendanceData);
          const updatedStudentTotalPresents = attendanceData.map(
            (studentData) => {
              const studentId = studentData.studentId;
              const totalAttendance = studentData.attendanceData.reduce(
                (total, data) => total + data.present,
                0
              );
              // console.log(
              //   `Student Id: ${studentId}, Total Attendance: ${totalAttendance}`
              // );
              return totalAttendance;
            }
          );
          setStudentAttendance(attendanceData);
          setStudentTotalPresents(updatedStudentTotalPresents);
        } else {
          console.log("No student attendance data found in the response.");
          setDataAvailable(false); // Data is not available for the selected month
        }
      } else {
        console.log("No attendance data found in the response.");
        setDataAvailable(false); // Data is not available for the selected month
      }

      // console.log("Response from the backend:", response.data);
    } catch (error) {
      console.error("Error while fetching attendance data:", error);
      setDataAvailable(false); // Data is not available for the selected month
    }
  };

  useEffect(() => {
    setDaysInMonth(getDaysInMonth(new Date(date)));
  }, [date]);
  const handleSubmit = async () => {
    setModalIsOpen(false);
    setLoading(true)
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    // const formattedDate = `${2023}-${11}-${30}`;
    const formattedDate = `${year}-${month}-${day}`;

    const studentInfo = students.map((student) => ({
      studentId: student.id,
      rollNo: student.rollNo,
      present: student.attendance,
      date: formattedDate,
      className: student.className,
      section: student.section,
    }));

    try {
       await axios.post(
        "https://eserver-i5sm.onrender.com/api/v1/teacher/createAttendance",
        {
          attendanceRecords: studentInfo,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      ).then((response) => {
          //  console.log("response",response)
           setStudents((prevStudents) =>
            prevStudents.map((student) => ({
              ...student,
              attendance: false,
            }))
          )
          fetchData()
          setLoading(false)
      }).catch((error)=>{
        // console.log("first",error.response.data.message)
        setLoading(false);
        toast.error(error.response.data.message)
      })
      // console.log("Attendance data sent:", response.data);

      
    } catch (error) {
      console.error("Error sending attendance data:", error);
   
      // toast.error()
    }
  };

  const handleToggleAttendance = (studentId, day) => {
    setStudents((prevStudents) => {
      const updatedStudents = prevStudents.map((student) => {
        if (student.id === studentId) {
          return {
            ...student,
            attendance: [
              ...student.attendance.slice(0, day),
              !student.attendance[day],
              ...student.attendance.slice(day + 1),
            ],
          };
        }
        return student;
      });
      return updatedStudents;
    });
  };

  function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${year}-${month}`;
  }

  function getDaysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  const dateHeaders = [...Array(daysInMonth)].map((_, index) => (
    <th key={index} className="px-2 py-1 border bg-gray-300">
      {index + 1}
    </th>
  ));

  useEffect(() => {
    const today = new Date();
    const formattedDate = getFormattedDate(today);
    setCurrentDate(formattedDate);

  }, []);

  const dateLabels = Array.from({ length: daysInMonth }, (_, day) => {
    const date = new Date(new Date().setDate(day + 1));
    const formattedDate = date.getDate().toString().padStart(2, "0");
    return formattedDate;
  });
  // console.log(dateLabels);

  const studentRows = students.map((student, index) => {
    // console.log("totalAttendance", attendanceData);

    return (
      <tr key={student.id}>
        <td className="px-2 py-1 border">{index + 1}</td>
        <td className="px-2 py-1 border">{student.name}</td>
        {/* Issue */}
        {dateLabels.map((dateLabel, dateIndex) => {
          const attendanceData = studentAttendance.find(
            (data) => data.studentId === student.id
          );

          const formattedResponseDate = (responseDate) => {
            const dateObject = new Date(responseDate);
            const day = dateObject.getDate(); // Get the day part (1-31)
            return day.toString().padStart(2, "0"); // Format it as "DD"
          };

          const cellContent = () => {
            if (attendanceData) {
              const matchingDateData = attendanceData.attendanceData.find(
                (data) =>
                  formattedResponseDate(data.date) === dateLabel.toString()
              );

              if (matchingDateData) {
                const inputDate = new Date(matchingDateData.date);
                const year = inputDate.getFullYear();
                const month = (inputDate.getMonth() + 1)
                  .toString()
                  .padStart(2, "0");
                const day = inputDate.getDate().toString().padStart(2, "0");
                const formatDate = `${day}-${month}-${year}`;

                return (
                  <td
                    key={dateIndex}
                    className="px-2 py-1 border text-center"
                    onMouseEnter={() =>
                      handleMouseEnter(student.name, formatDate, dateLabel)
                    }
                  >
                    <span
                      className={
                        matchingDateData.present
                          ? "text-green-600" /* Add a green color class for '✅' */
                          : "text-red-600" /* Add a red color class for '❌' */
                      }
                    >
                      {matchingDateData.present ? "✅" : "❌"}
                    </span>
                  </td>
                );
              } else {
                return (
                  <td key={dateIndex} className="px-2 py-1 border text-center">
                    {/* Render date labels in this cell */}
                    {/* {dateLabel} */}
                  </td>
                ); // Render an empty cell if no data is available for the specific date label
              }
            }
          };

          return cellContent();
        })}
        <td className="px-2 py-1 border">{studentTotalPresents[index]}</td>{" "}
        {/* Issue */}
      </tr>
    );
  });

  const handleMouseEnter = (studentName, date, dateLabel) => {
    const message = `Student Name: ${studentName}, Date: ${date} `;
    // console.log(message); // Log the message to the console
    setHoverMessage(message); // Update the state with the message
    document.body.style.cursor = "pointer";
  };

  const handleMouseLeave = () => {
   
    setHoverMessage("");
  };

  return (
    <div className="px-5 py-6">
       <h1 className="text-4xl font-bold mb-4 uppercase text-center  hover-text"
       style={{color:currentColor}}
       >
          Student Attendance 
        </h1>
        <Button
              variant="contained"
              style={{ backgroundColor: currentColor, marginRight: "20px" }}
              onClick={() => setModalIsOpen(true)}
            >
              Mark Attendance
            </Button>
     
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Mark Attendance Modal"
        style={{
          overlay: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          content: {
            width: "50%",
            height: "50%",
            position: "relative",
          },
        }}
      >
        <h2 className="text-2xl mb-4 font-semibold">
          Mark Attendance for {currentDate}
        </h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2">Student</th>
              <th className="py-2">Roll No.</th>
              <th className="py-2">Present</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b">
                
                <td className="py-2">{student.name}</td>
                <td className="py-2">{student.rollNo}</td>
                <td className="py-2">
                  <input
                    type="checkbox"
                    checked={student.attendance}
                    onChange={() => toggleAttendance(student.id)}
                    className="form-checkbox h-5 w-5 text-blue-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-center">
         
          {/* <Button
              variant="contained"
              style={{ backgroundColor: currentColor, marginRight: "20px" }}
              onClick={handleSubmit}
            >
              Submit
            </Button> */}

            <Button
              onClick={handleSubmit}
                        type="submit"
                        variant="contained"
                        style={{
                          backgroundColor: currentColor,
                          color: "white",
                           marginRight: "20px"
                        }}
                      >
                        {loading ? (
                          <svg
                            aria-hidden="true"
                            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                        ) : (
                          " Submit"
                        )}
                      </Button>
          <Button
              variant="contained"
              style={{ backgroundColor: "gray" }}
              onClick={() => setModalIsOpen(false)}
            >
              Cancel
            </Button>
         
        </div>
      </Modal>

      <div className="grid mx-auto p-4 overflow-hidden">
        {/* <h1 className="text-4xl font-bold mb-4 uppercase text-center  hover-text">
          Student Attendance Management System
        </h1> */}
        <div className="mb-4">
          <label className="mr-2">Month:</label>
          <input
            type="month"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled={!isEditing}
            className="rounded p-2 border border-gray-300"
          />
          {hoverMessage && (
            <div className="mt-4">
              <p>{hoverMessage}</p>
            </div>
          )}
        </div>
        <div className="overflow-x-auto w-full p-3 flex justify-center">
          <div
            className="w-full overflow-scroll"
            onMouseLeave={handleMouseLeave}
          >
            {dataAvailable ? (
              <table className="table-auto">
                <thead>
                  <tr className="bg-cyan-700 text-white">
                    <th className="px-2 py-1 border ">S.N</th>
                    <th className="px-2 py-1 border ">Student</th>
                    {dateLabels.map((dateLabel, dateIndex) => (
                      <th key={dateIndex} className="px-2 py-1 border ">
                        {dateLabel}
                      </th>
                    ))}
                    <th className="px-2 py-1 border ">Presents</th>
                  </tr>
                </thead>
                <tbody>{studentRows}</tbody>
              </table>
            ) : (
              <h1>No Records found for the {date}.</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;



// import React, { useState, useEffect, useRef } from "react";
// import Modal from "react-modal";
// import axios from "axios";
// import "tailwindcss/tailwind.css";
// import Cookies from "js-cookie";

// import { useStateContext } from "../contexts/ContextProvider";
// import { toast } from "react-toastify";
// const authToken = Cookies.get("token");
// const Attendance = () => {
//   const { currentColor} = useStateContext();
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [students, setStudents] = useState([]);
//   const [studentPresent, setStudentPresent] = useState([]);
//   const [date, setDate] = useState(getFormattedDate(new Date()));
//   const [isEditing, setIsEditing] = useState(true);
//   const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(new Date()));
//   const [currentDate, setCurrentDate] = useState("");
//   const [studentAttendance, setStudentAttendance] = useState([]);
//   const [studentTotalPresents, setStudentTotalPresents] = useState([]);
//   const [dataAvailable, setDataAvailable] = useState(false);
//   const [hoverMessage, setHoverMessage] = useState(""); // State to store the hover message

//   const isFirstRender = useRef(true);

//   useEffect(() => {
//     if (isFirstRender.current) {
//       if (studentTotalPresents) {
//         setStudentTotalPresents(
//           Array(students.length).fill(studentTotalPresents)
//         );
//       } else {
//         setStudentTotalPresents(Array(students.length).fill(0));
//       }
//       isFirstRender.current = false;
//     }
//   }, []);
//   // console.log(studentTotalPresents);

//   // Get Students
//   useEffect(() => {
//     const fetchStudentData = async () => {
//       try {
//         const response = await axios.get(
//           "https://eserver-i5sm.onrender.com/api/v1/adminRoute/getAllStudents",
//           {
//             withCredentials: true,
//             headers: {
//               Authorization: `Bearer ${authToken}`,
//             },
//           }
//         );

//         if (Array.isArray(response.data.allStudent)) {
//           const classTeacher = JSON.parse(sessionStorage.response).classTeacher;
//           const classTeacherSection = JSON.parse(sessionStorage.response).section;
//           // console.log("first,",JSON.parse(sessionStorage.response))
//           const updatedStudents = response.data.allStudent
//             // .filter((student) => student.class === classTeacher)
//             .filter((student) => student.class === classTeacher  && student.section === classTeacherSection)
//             // (student) => student.class === classTeacherClass && student.section === classTeacherSection
//             .map((student) => ({
//               id: student._id,
//               name: student.fullName,
//               rollNo: student.rollNo,
//               attendance: false,
//             }));

//           setStudents(updatedStudents);
//         } else {
//           console.error(
//             "Data format is not as expected:",
//             response.data.allStudent
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching student data:", error);
//       }
//     };

//     fetchStudentData();
//   }, []);

//   const toggleAttendance = (studentId) => {
//     setStudents((prevStudents) =>
//       prevStudents.map((student) =>
//         student.id === studentId
//           ? { ...student, attendance: !student.attendance }
//           : student
//       )
//     );
//   };

//   const handleSubmit = async () => {
//     setModalIsOpen(false);
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = (today.getMonth() + 1).toString().padStart(2, "0");
//     const day = today.getDate().toString().padStart(2, "0");
//     // const formattedDate = `${2023}-${11}-${30}`;
//     const formattedDate = `${year}-${month}-${day}`;

//     const studentInfo = students.map((student) => ({
//       studentId: student.id,
//       rollNo: student.rollNo,
//       present: student.attendance,
//       date: formattedDate,
//     }));

//     try {
//        await axios.post(
//         "https://eserver-i5sm.onrender.com/api/v1/teacher/createAttendance",
//         {
//           attendanceRecords: studentInfo,
//         },
//         {
//           withCredentials: true,
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       ).then((response) => {
//           //  console.log("response",response)
//            setStudents((prevStudents) =>
//             prevStudents.map((student) => ({
//               ...student,
//               attendance: false,
//             }))
//           )
//       }).catch((error)=>{
//         // console.log("first",error.response.data.message)
//         toast.error(error.response.data.message)
//       })
//       // console.log("Attendance data sent:", response.data);

      
//     } catch (error) {
//       console.error("Error sending attendance data:", error);
   
//       // toast.error()
//     }
//   };

//   useEffect(() => {
//     setDataAvailable(true);
//     fetchData();
//   }, [date]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const selectedDate = new Date(date);
//     const year = selectedDate.getFullYear();
//     const month = selectedDate.getMonth() + 1;
//     try {
//       const response = await axios.get(
//         "https://eserver-i5sm.onrender.com/api/v1/teacher/getAttendance",
//         {
//           params: {
//             year: year,
//             month: month,
//           },
//           withCredentials: true,
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );

//       if (response.data && response.data.data) {
//         // console.log(response.data.data[0].attendanceData[0].date);
//         const attendanceData = response.data.data;
//         if (attendanceData.length > 0) {
//           // console.log(attendanceData);
//           const updatedStudentTotalPresents = attendanceData.map(
//             (studentData) => {
//               const studentId = studentData.studentId;
//               const totalAttendance = studentData.attendanceData.reduce(
//                 (total, data) => total + data.present,
//                 0
//               );
//               // console.log(
//               //   `Student Id: ${studentId}, Total Attendance: ${totalAttendance}`
//               // );
//               return totalAttendance;
//             }
//           );
//           setStudentAttendance(attendanceData);
//           setStudentTotalPresents(updatedStudentTotalPresents);
//         } else {
//           console.log("No student attendance data found in the response.");
//           setDataAvailable(false); // Data is not available for the selected month
//         }
//       } else {
//         console.log("No attendance data found in the response.");
//         setDataAvailable(false); // Data is not available for the selected month
//       }

//       // console.log("Response from the backend:", response.data);
//     } catch (error) {
//       console.error("Error while fetching attendance data:", error);
//       setDataAvailable(false); // Data is not available for the selected month
//     }
//   };

//   useEffect(() => {
//     setDaysInMonth(getDaysInMonth(new Date(date)));
//   }, [date]);

//   const handleToggleAttendance = (studentId, day) => {
//     setStudents((prevStudents) => {
//       const updatedStudents = prevStudents.map((student) => {
//         if (student.id === studentId) {
//           return {
//             ...student,
//             attendance: [
//               ...student.attendance.slice(0, day),
//               !student.attendance[day],
//               ...student.attendance.slice(day + 1),
//             ],
//           };
//         }
//         return student;
//       });
//       return updatedStudents;
//     });
//   };

//   function getFormattedDate(date) {
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     return `${year}-${month}`;
//   }

//   function getDaysInMonth(date) {
//     return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
//   }

//   const dateHeaders = [...Array(daysInMonth)].map((_, index) => (
//     <th key={index} className="px-2 py-1 border bg-gray-300">
//       {index + 1}
//     </th>
//   ));

//   useEffect(() => {
//     const today = new Date();
//     const formattedDate = getFormattedDate(today);
//     setCurrentDate(formattedDate);

//   }, []);

//   const dateLabels = Array.from({ length: daysInMonth }, (_, day) => {
//     const date = new Date(new Date().setDate(day + 1));
//     const formattedDate = date.getDate().toString().padStart(2, "0");
//     return formattedDate;
//   });
//   // console.log(dateLabels);

//   const studentRows = students.map((student, index) => {
//     // console.log("totalAttendance", attendanceData);

//     return (
//       <tr key={student.id}>
//         <td className="px-2 py-1 border">{index + 1}</td>
//         <td className="px-2 py-1 border">{student.name}</td>
//         {/* Issue */}
//         {dateLabels.map((dateLabel, dateIndex) => {
//           const attendanceData = studentAttendance.find(
//             (data) => data.studentId === student.id
//           );

//           const formattedResponseDate = (responseDate) => {
//             const dateObject = new Date(responseDate);
//             const day = dateObject.getDate(); // Get the day part (1-31)
//             return day.toString().padStart(2, "0"); // Format it as "DD"
//           };

//           const cellContent = () => {
//             if (attendanceData) {
//               const matchingDateData = attendanceData.attendanceData.find(
//                 (data) =>
//                   formattedResponseDate(data.date) === dateLabel.toString()
//               );

//               if (matchingDateData) {
//                 const inputDate = new Date(matchingDateData.date);
//                 const year = inputDate.getFullYear();
//                 const month = (inputDate.getMonth() + 1)
//                   .toString()
//                   .padStart(2, "0");
//                 const day = inputDate.getDate().toString().padStart(2, "0");
//                 const formatDate = `${day}-${month}-${year}`;

//                 return (
//                   <td
//                     key={dateIndex}
//                     className="px-2 py-1 border text-center"
//                     onMouseEnter={() =>
//                       handleMouseEnter(student.name, formatDate, dateLabel)
//                     }
//                   >
//                     <span
//                       className={
//                         matchingDateData.present
//                           ? "text-green-600" /* Add a green color class for '✅' */
//                           : "text-red-600" /* Add a red color class for '❌' */
//                       }
//                     >
//                       {matchingDateData.present ? "✅" : "❌"}
//                     </span>
//                   </td>
//                 );
//               } else {
//                 return (
//                   <td key={dateIndex} className="px-2 py-1 border text-center">
//                     {/* Render date labels in this cell */}
//                     {/* {dateLabel} */}
//                   </td>
//                 ); // Render an empty cell if no data is available for the specific date label
//               }
//             }
//           };

//           return cellContent();
//         })}
//         <td className="px-2 py-1 border">{studentTotalPresents[index]}</td>{" "}
//         {/* Issue */}
//       </tr>
//     );
//   });

//   const handleMouseEnter = (studentName, date, dateLabel) => {
//     const message = `Student Name: ${studentName}, Date: ${date} `;
//     // console.log(message); // Log the message to the console
//     setHoverMessage(message); // Update the state with the message
//     document.body.style.cursor = "pointer";
//   };

//   const handleMouseLeave = () => {
//     // Clear the hover message when the mouse leaves the table
//     setHoverMessage("");
//   };

//   return (
//     <div className="text-center py-6">
//        <h1 className="text-4xl font-bold mb-4 uppercase text-center  hover-text"
//        style={{color:currentColor}}
//        >
//           Student Attendance Management System
//         </h1>
//       <button
//         onClick={() => setModalIsOpen(true)}
//         className="dark:text-white dark:bg-secondary-dark-bg text-gray-800   mx-auto neu-btn border-2 "
//         style={{border:`2px solid ${currentColor} `,color:currentColor}}
//         // style={{color:currentColor}}
//       >
//         Mark Attendance
//       </button>
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={() => setModalIsOpen(false)}
//         contentLabel="Mark Attendance Modal"
//         style={{
//           overlay: {
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           },
//           content: {
//             width: "50%",
//             height: "50%",
//             position: "relative",
//           },
//         }}
//       >
//         <h2 className="text-2xl mb-4 font-semibold">
//           Mark Attendance for {currentDate}
//         </h2>
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="border-b">
//               <th className="py-2">Student</th>
//               <th className="py-2">Roll No.</th>
//               <th className="py-2">Present</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((student) => (
//               <tr key={student.id} className="border-b">
//                 {console.log("firststudent",student)}
//                 <td className="py-2">{student.name}</td>
//                 <td className="py-2">{student.rollNo}</td>
//                 <td className="py-2">
//                   <input
//                     type="checkbox"
//                     checked={student.attendance}
//                     onChange={() => toggleAttendance(student.id)}
//                     className="form-checkbox h-5 w-5 text-blue-500"
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="mt-4 flex justify-center">
//           <button
//             onClick={handleSubmit}
//             className="bg-green-500 hover-bg-green-700 text-white font-bold py-2 px-4 rounded-md mr-4"
//           >
//             Submit
//           </button>
//           <button
//             onClick={() => setModalIsOpen(false)}
//             className="bg-red-500 hover-bg-red-700 text-white font-bold py-2 px-4 rounded-md"
//           >
//             Cancel
//           </button>
//         </div>
//       </Modal>

//       <div className="grid mx-auto p-4 overflow-hidden">
//         {/* <h1 className="text-4xl font-bold mb-4 uppercase text-center  hover-text">
//           Student Attendance Management System
//         </h1> */}
//         <div className="mb-4">
//           <label className="mr-2">Month:</label>
//           <input
//             type="month"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             disabled={!isEditing}
//             className="rounded p-2 border border-gray-300"
//           />
//           {hoverMessage && (
//             <div className="mt-4">
//               <p>{hoverMessage}</p>
//             </div>
//           )}
//         </div>
//         <div className="overflow-x-auto w-full p-3 flex justify-center">
//           <div
//             className="w-full overflow-scroll"
//             onMouseLeave={handleMouseLeave}
//           >
//             {dataAvailable ? (
//               <table className="table-auto">
//                 <thead>
//                   <tr className="bg-cyan-700 text-white">
//                     <th className="px-2 py-1 border ">S.N</th>
//                     <th className="px-2 py-1 border ">Student</th>
//                     {dateLabels.map((dateLabel, dateIndex) => (
//                       <th key={dateIndex} className="px-2 py-1 border ">
//                         {dateLabel}
//                       </th>
//                     ))}
//                     <th className="px-2 py-1 border ">Presents</th>
//                   </tr>
//                 </thead>
//                 <tbody>{studentRows}</tbody>
//               </table>
//             ) : (
//               <h1>No Records found for the {date}.</h1>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Attendance;











// import React, { useState, useEffect, useRef } from "react";
// import Modal from "react-modal";
// import axios from "axios";
// import "tailwindcss/tailwind.css";
// import Cookies from "js-cookie";

// import { useStateContext } from "../contexts/ContextProvider";
// const authToken = Cookies.get("token");
// const Attendance = () => {
//   const { currentColor} = useStateContext();
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [students, setStudents] = useState([]);
//   const [studentPresent, setStudentPresent] = useState([]);
//   const [date, setDate] = useState(getFormattedDate(new Date()));
//   const [isEditing, setIsEditing] = useState(true);
//   const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(new Date()));
//   const [currentDate, setCurrentDate] = useState("");
//   const [studentAttendance, setStudentAttendance] = useState([]);
//   const [studentTotalPresents, setStudentTotalPresents] = useState([]);
//   const [dataAvailable, setDataAvailable] = useState(false);
//   const [hoverMessage, setHoverMessage] = useState(""); // State to store the hover message

//   const isFirstRender = useRef(true);

//   useEffect(() => {
//     if (isFirstRender.current) {
//       if (studentTotalPresents) {
//         setStudentTotalPresents(
//           Array(students.length).fill(studentTotalPresents)
//         );
//       } else {
//         setStudentTotalPresents(Array(students.length).fill(0));
//       }
//       isFirstRender.current = false;
//     }
//   }, []);
//   console.log(studentTotalPresents);

//   // Get Students
//   useEffect(() => {
//     const fetchStudentData = async () => {
//       try {
//         const response = await axios.get(
//           "https://eserver-i5sm.onrender.com/api/v1/adminRoute/getAllStudents",
//           {
//             withCredentials: true,
//             headers: {
//               Authorization: `Bearer ${authToken}`,
//             },
//           }
//         );

//         if (Array.isArray(response.data.allStudent)) {
//           const classTeacher = JSON.parse(sessionStorage.response).classTeacher;
//           const updatedStudents = response.data.allStudent
//             .filter((student) => student.class === classTeacher)
//             .map((student) => ({
//               id: student._id,
//               name: student.fullName,
//               rollNo: student.rollNo,
//               attendance: false,
//             }));

//           setStudents(updatedStudents);
//         } else {
//           console.error(
//             "Data format is not as expected:",
//             response.data.allStudent
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching student data:", error);
//       }
//     };

//     fetchStudentData();
//   }, []);

//   const toggleAttendance = (studentId) => {
//     setStudents((prevStudents) =>
//       prevStudents.map((student) =>
//         student.id === studentId
//           ? { ...student, attendance: !student.attendance }
//           : student
//       )
//     );
//   };

//   const handleSubmit = async () => {
//     setModalIsOpen(false);
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = (today.getMonth() + 1).toString().padStart(2, "0");
//     const day = today.getDate().toString().padStart(2, "0");
//     // const formattedDate = `${2023}-${11}-${30}`;
//     const formattedDate = `${year}-${month}-${day}`;

//     const studentInfo = students.map((student) => ({
//       studentId: student.id,
//       rollNo: student.rollNo,
//       present: student.attendance,
//       date: formattedDate,
//     }));

//     try {
//       const response = await axios.post(
//         "https://eserver-i5sm.onrender.com/api/v1/teacher/createAttendance",
//         {
//           attendanceRecords: studentInfo,
//         },
//         {
//           withCredentials: true,
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );
//       console.log("Attendance data sent:", response.data);

//       // Clear the attendance status after a successful POST request
//       setStudents((prevStudents) =>
//         prevStudents.map((student) => ({
//           ...student,
//           attendance: false,
//         }))
//       );
//     } catch (error) {
//       console.error("Error sending attendance data:", error);
//     }
//   };

//   useEffect(() => {
//     setDataAvailable(true);
//     fetchData();
//   }, [date]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const selectedDate = new Date(date);
//     const year = selectedDate.getFullYear();
//     const month = selectedDate.getMonth() + 1;
//     try {
//       const response = await axios.get(
//         "https://eserver-i5sm.onrender.com/api/v1/teacher/getAttendance",
//         {
//           params: {
//             year: year,
//             month: month,
//           },
//           withCredentials: true,
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );

//       if (response.data && response.data.data) {
//         console.log(response.data.data[0].attendanceData[0].date);
//         const attendanceData = response.data.data;
//         if (attendanceData.length > 0) {
//           console.log(attendanceData);
//           const updatedStudentTotalPresents = attendanceData.map(
//             (studentData) => {
//               const studentId = studentData.studentId;
//               const totalAttendance = studentData.attendanceData.reduce(
//                 (total, data) => total + data.present,
//                 0
//               );
//               console.log(
//                 `Student Id: ${studentId}, Total Attendance: ${totalAttendance}`
//               );
//               return totalAttendance;
//             }
//           );
//           setStudentAttendance(attendanceData);
//           setStudentTotalPresents(updatedStudentTotalPresents);
//         } else {
//           console.log("No student attendance data found in the response.");
//           setDataAvailable(false); // Data is not available for the selected month
//         }
//       } else {
//         console.log("No attendance data found in the response.");
//         setDataAvailable(false); // Data is not available for the selected month
//       }

//       console.log("Response from the backend:", response.data);
//     } catch (error) {
//       console.error("Error while fetching attendance data:", error);
//       setDataAvailable(false); // Data is not available for the selected month
//     }
//   };

//   useEffect(() => {
//     setDaysInMonth(getDaysInMonth(new Date(date)));
//   }, [date]);

//   const handleToggleAttendance = (studentId, day) => {
//     setStudents((prevStudents) => {
//       const updatedStudents = prevStudents.map((student) => {
//         if (student.id === studentId) {
//           return {
//             ...student,
//             attendance: [
//               ...student.attendance.slice(0, day),
//               !student.attendance[day],
//               ...student.attendance.slice(day + 1),
//             ],
//           };
//         }
//         return student;
//       });
//       return updatedStudents;
//     });
//   };

//   function getFormattedDate(date) {
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     return `${year}-${month}`;
//   }

//   function getDaysInMonth(date) {
//     return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
//   }

//   const dateHeaders = [...Array(daysInMonth)].map((_, index) => (
//     <th key={index} className="px-2 py-1 border bg-gray-300">
//       {index + 1}
//     </th>
//   ));

//   useEffect(() => {
//     const today = new Date();
//     const formattedDate = getFormattedDate(today);
//     setCurrentDate(formattedDate);
//     console.log(formattedDate);
//   }, []);

//   const dateLabels = Array.from({ length: daysInMonth }, (_, day) => {
//     const date = new Date(new Date().setDate(day + 1));
//     const formattedDate = date.getDate().toString().padStart(2, "0");
//     return formattedDate;
//   });
//   // console.log(dateLabels);

//   const studentRows = students.map((student, index) => {
//     // console.log("totalAttendance", attendanceData);

//     return (
//       <tr key={student.id}>
//         <td className="px-2 py-1 border">{index + 1}</td>
//         <td className="px-2 py-1 border">{student.name}</td>
//         {/* Issue */}
//         {dateLabels.map((dateLabel, dateIndex) => {
//           const attendanceData = studentAttendance.find(
//             (data) => data.studentId === student.id
//           );

//           const formattedResponseDate = (responseDate) => {
//             const dateObject = new Date(responseDate);
//             const day = dateObject.getDate(); // Get the day part (1-31)
//             return day.toString().padStart(2, "0"); // Format it as "DD"
//           };

//           const cellContent = () => {
//             if (attendanceData) {
//               const matchingDateData = attendanceData.attendanceData.find(
//                 (data) =>
//                   formattedResponseDate(data.date) === dateLabel.toString()
//               );

//               if (matchingDateData) {
//                 const inputDate = new Date(matchingDateData.date);
//                 const year = inputDate.getFullYear();
//                 const month = (inputDate.getMonth() + 1)
//                   .toString()
//                   .padStart(2, "0");
//                 const day = inputDate.getDate().toString().padStart(2, "0");
//                 const formatDate = `${day}-${month}-${year}`;

//                 return (
//                   <td
//                     key={dateIndex}
//                     className="px-2 py-1 border text-center"
//                     onMouseEnter={() =>
//                       handleMouseEnter(student.name, formatDate, dateLabel)
//                     }
//                   >
//                     <span
//                       className={
//                         matchingDateData.present
//                           ? "text-green-600" /* Add a green color class for '✅' */
//                           : "text-red-600" /* Add a red color class for '❌' */
//                       }
//                     >
//                       {matchingDateData.present ? "✅" : "❌"}
//                     </span>
//                   </td>
//                 );
//               } else {
//                 return (
//                   <td key={dateIndex} className="px-2 py-1 border text-center">
//                     {/* Render date labels in this cell */}
//                     {/* {dateLabel} */}
//                   </td>
//                 ); // Render an empty cell if no data is available for the specific date label
//               }
//             }
//           };

//           return cellContent();
//         })}
//         <td className="px-2 py-1 border">{studentTotalPresents[index]}</td>{" "}
//         {/* Issue */}
//       </tr>
//     );
//   });

//   const handleMouseEnter = (studentName, date, dateLabel) => {
//     const message = `Student Name: ${studentName}, Date: ${date} `;
//     console.log(message); // Log the message to the console
//     setHoverMessage(message); // Update the state with the message
//     document.body.style.cursor = "pointer";
//   };

//   const handleMouseLeave = () => {
//     // Clear the hover message when the mouse leaves the table
//     setHoverMessage("");
//   };

//   return (
//     <div className="text-center py-6">
//        <h1 className="text-4xl font-bold mb-4 uppercase text-center  hover-text"
//        style={{color:currentColor}}
//        >
//           Student Attendance Management System
//         </h1>
//       <button
//         onClick={() => setModalIsOpen(true)}
//         className="dark:text-white dark:bg-secondary-dark-bg text-gray-800   mx-auto neu-btn border-2 "
//         style={{border:`2px solid ${currentColor} `,color:currentColor}}
//         // style={{color:currentColor}}
//       >
//         Mark Attendance
//       </button>
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={() => setModalIsOpen(false)}
//         contentLabel="Mark Attendance Modal"
//         style={{
//           overlay: {
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           },
//           content: {
//             width: "50%",
//             height: "50%",
//             position: "relative",
//           },
//         }}
//       >
//         <h2 className="text-2xl mb-4 font-semibold">
//           Mark Attendance for {currentDate}
//         </h2>
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="border-b">
//               <th className="py-2">Student</th>
//               <th className="py-2">Present</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((student) => (
//               <tr key={student.id} className="border-b">
//                 <td className="py-2">{student.name}</td>
//                 <td className="py-2">
//                   <input
//                     type="checkbox"
//                     checked={student.attendance}
//                     onChange={() => toggleAttendance(student.id)}
//                     className="form-checkbox h-5 w-5 text-blue-500"
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="mt-4 flex justify-center">
//           <button
//             onClick={handleSubmit}
//             className="bg-green-500 hover-bg-green-700 text-white font-bold py-2 px-4 rounded-md mr-4"
//           >
//             Submit
//           </button>
//           <button
//             onClick={() => setModalIsOpen(false)}
//             className="bg-red-500 hover-bg-red-700 text-white font-bold py-2 px-4 rounded-md"
//           >
//             Cancel
//           </button>
//         </div>
//       </Modal>

//       <div className="grid mx-auto p-4 overflow-hidden">
//         {/* <h1 className="text-4xl font-bold mb-4 uppercase text-center  hover-text">
//           Student Attendance Management System
//         </h1> */}
//         <div className="mb-4">
//           <label className="mr-2">Month:</label>
//           <input
//             type="month"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             disabled={!isEditing}
//             className="rounded p-2 border border-gray-300"
//           />
//           {hoverMessage && (
//             <div className="mt-4">
//               <p>{hoverMessage}</p>
//             </div>
//           )}
//         </div>
//         <div className="overflow-x-auto w-full p-3 flex justify-center">
//           <div
//             className="w-full overflow-scroll"
//             onMouseLeave={handleMouseLeave}
//           >
//             {dataAvailable ? (
//               <table className="table-auto">
//                 <thead>
//                   <tr className="bg-cyan-700 text-white">
//                     <th className="px-2 py-1 border ">S.N</th>
//                     <th className="px-2 py-1 border ">Student</th>
//                     {dateLabels.map((dateLabel, dateIndex) => (
//                       <th key={dateIndex} className="px-2 py-1 border ">
//                         {dateLabel}
//                       </th>
//                     ))}
//                     <th className="px-2 py-1 border ">Presents</th>
//                   </tr>
//                 </thead>
//                 <tbody>{studentRows}</tbody>
//               </table>
//             ) : (
//               <h1>No Records found for the {date}.</h1>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Attendance;
