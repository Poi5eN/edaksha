import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import {
  FcConferenceCall,
  FcBusinesswoman,
  FcCurrencyExchange,
} from "react-icons/fc";
import { IoBookSharp } from "react-icons/io5";
import { BiMaleFemale} from "react-icons/bi";
import Calendar from "../pages/Calendar";
import axios from "axios";
import EarningChart from "../CHART/EarningChart";
import StudentApexChart from "../CHART/StudentApexChart";
import ExamChart from "../CHART/ExamChart";
import TeacherNotice from "./TeacherNotice";
import Cookies from "js-cookie";
const authToken = Cookies.get("token");

const TeacherHome = () => {
  const { currentColor } = useStateContext();
  const { numberOfStudent } = useStateContext();
  const [teacherCount, setTeacherCount] = useState([]);
  const [studentCount, setStudentCount] = useState([]);
  const [parentCount, setParentCount] = useState([]);
  const [earningData, setEarningData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://eserver-i5sm.onrender.com/api/v1/adminRoute/getTeachers",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          
          setTeacherCount(response.data.data.length);
        } else {
          console.error("Data format is not as expected:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching teacher count:", error);
      });
  }, []);

  useEffect(() => {
   
    axios
      .get(
        "https://eserver-i5sm.onrender.com/api/v1/adminRoute/getAllParents",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          }, 
        }
      )
      .then((response) => {
        setParentCount(response.data.allParent.length);
       
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const newEarningData = [
      {
        icon: <FcConferenceCall />,
        // amount: `${studentCount}`,
        amount: `${numberOfStudent}`,
        percentage: "-4%",
        title: "Students",
        iconColor: "#03C9D7",
        iconBg: "#E5FAFB",
        pcColor: "red-600",
      },
      {
        icon: <FcBusinesswoman />,
        amount: `${teacherCount}`,
        percentage: "+23%",
        title: "Teachers",
        iconColor: "rgb(255, 244, 229)",
        iconBg: "rgb(254, 201, 15)",
        pcColor: "green-600",
      },
      {
        icon: <FcCurrencyExchange />,
        amount: "423,39",
        percentage: "+38%",
        title: "Earning",
        iconColor: "rgb(228, 106, 118)",
        iconBg: "rgb(255, 244, 229)",
        pcColor: "green-600",
      },
      {
        icon: <BiMaleFemale />,
        amount: `${parentCount}`,
        percentage: "-12%",
        title: "Parents",
        iconColor: "rgb(0, 194, 146)",
        iconBg: "rgb(235, 250, 242)",
        pcColor: "red-600",
      },
    ];
    setEarningData(newEarningData);
  }, [teacherCount, studentCount, parentCount]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
      }
    };
    const handlePopstate = (event) => {
      event.preventDefault();
      window.history.pushState(null, null, window.location.pathname);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  return (
    <div className="mt-12">
      <div className="grid gap-3 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 p-3">
        <div 
         style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
        className="p-2 rounded-md text-center bg-white col-span-2 dark:text-white dark:bg-secondary-dark-bg">
          <button
            type="button"
            className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl "
            style={{background:currentColor, color:"white"}}
           
          >
            <FcConferenceCall />
          </button>
          <StudentApexChart />
        </div>
        <div 
         style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
        className="p-2 rounded-md text-center bg-white col-span-2 dark:text-white dark:bg-secondary-dark-bg">
          <button
            type="button"
            className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl text-white "
            style={{background:currentColor}}
          >
            <IoBookSharp />
          </button>
          <ExamChart />
        </div>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 p-3 gap-3 lg:flex">
        <div
         style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
         className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-3 md:col-span-2 md:w-2/2 lg:w-1/2">
          <EarningChart />
        </div>
        <div
         style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
        className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-3 md:col-span-2 md:w-2/2  lg:w-1/2">
          <TeacherNotice />
        </div>
      </div>

      <div
       style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
      className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-3">
        <Calendar />
      </div>
    </div>
  );
};

export default TeacherHome;
