import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useStateContext } from "../../contexts/ContextProvider";
const authToken = Cookies.get("token");
const AllExams = () => {
  const { currentColor } = useStateContext();
  const modalStyle = {
    content: {
      // width: "80%",
      // top: "50%",
      // left: "50%",
      // right: "auto",
      // bottom: "auto",
      // marginRight: "-50%",
      // transform: "translate(-50%, -50%)",
      zIndex: 1000,
      // background:currentColor
    },
  };

  const [examData, setExamData] = useState([]);

  useEffect(() => {
  

    axios
      .get(`https://eshikshaserver.onrender.com/api/v1/exam/getAllExams`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
       
        setExamData(response.data.examData);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleDelete = async (index) => {
    try {
      const examId = examData[index]._id;

      const response = await axios.delete(
        `https://eshikshaserver.onrender.com/api/v1/exam/deleteExam/${examId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const updatedExamData = [...examData];
      updatedExamData.splice(index, 1);
      setExamData(updatedExamData);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return (
    <div>
      <div className=" mt-12 md:mt-1  mx-auto p-3 ">
        <h1
            className="text-4xl font-bold mb-4 uppercase text-center  hover-text "
            style={{color:currentColor}}
        >
          Exam
        </h1>
        <div className="overflow-x-auto bg-gray-100 rounded-lg p-4   dark:text-white dark:bg-secondary-dark-bg ">
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr 
              className="text-center bg-cyan-700 text-white"
              style={{ background: currentColor }}
              >
                <th className="border   p-2">Class</th>
                
                <th className="border   p-2">Exam Name</th>
                <th className="border px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
            
              {examData.map((data, index) => (
                <tr key={index} className="text-center">
                  <td className="border  p-2">
                    {data.className}-{data.section}
                  </td>
                  <td className="border p-2">{data.examName}</td>
                  <div className="border p-2">
                    <tr
                      className="  border-2 text-white border-gray-500 w-full flex justify-around"
                      style={{ background: currentColor }}
                    >
                      <th className="w-[100px]">Subject</th>
                      <th className="w-[100px]">Date</th>
                      <th className="w-[100px]">Timimg</th>
                      <th className="w-[100px]">Total Marks</th>
                    </tr>
                    {data.examInfo.map((subject, i) => (
                      <>
                        <div key={i}>
                          <tr className="  border-2 border-gray-500 w-full flex justify-around">
                            <td className="w-[100px] text-center">
                              {subject.subjectName}
                            </td>
                            <td className="w-[100px] text-center">
                              {subject.examDate
                                ? subject.examDate.split("T")[0]
                                : ""}
                            </td>
                            <td className="w-[100px] text-center">
                              {subject.startTime} - {subject.endTime}
                            </td>
                            <td className="w-[100px] text-center">
                              {subject.subjectTotalMarks}
                            </td>
                          </tr>
                        </div>
                      </>
                    ))}
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllExams;
