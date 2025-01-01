import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import Cookies from "js-cookie";
const authToken = Cookies.get("token");

const StudentApexChart = () => {
  const [data, setData] = useState({
    boys: null,
    girls: null,
  });
  const [loading, setLoading] = useState(true);
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      width: 280,
      type: "pie",
    },
    labels: ["Boys", "Girls"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 400,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });

  const student = JSON.parse(sessionStorage.response);
  const classTeacherClass = student.classTeacher;
  const classTeacherSection = student.section;

  useEffect(() => {
    const fetchData = async () => {
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
          const filteredStudents = response.data.allStudent.filter(
            (student) =>
              student.class === classTeacherClass &&
              student.section === classTeacherSection
          );
          localStorage.setItem('studentsData', JSON.stringify(filteredStudents));
          const boysCount = filteredStudents.filter(
            (student) => student.gender === "Male"
          ).length;
          const girlsCount = filteredStudents.length - boysCount;

          setData({
            boys: boysCount,
            girls: girlsCount,
          });

          setSeries([boysCount, girlsCount]);
          setLoading(false);
        } else {
          console.error("Data format is not as expected:", response.data);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="chart" className="dark:text-white dark:bg-secondary-dark-bg">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1 className=" dark:text-white dark:bg-secondary-dark-bg">
            All Student : {series[1] + series[0]}{" "}
          </h1>
          <ReactApexChart
            options={options}
            series={series}
            type="pie"
            width={220}
          />
        </>
      )}
    </div>
  );
};

export default StudentApexChart;
