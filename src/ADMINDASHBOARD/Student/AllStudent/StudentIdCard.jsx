import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import generatePDF, { Resolution, Margin } from "react-to-pdf";

const authToken = Cookies.get("token");
const options = {
  method: "open",

  resolution: Resolution.HIGH,
  page: {
    margin: Margin.SMALL,
    format: "a4",
    orientation: "portrait",
  },
  canvas: {
    // default is 'image/jpeg' for better size performance
    mimeType: "image/png",
    qualityRatio: 1,
  },

  overrides: {
    pdf: {
      compress: true,
    },
    canvas: {
      useCORS: true,
    },
  },
};

const StudentIdCard = () => {
  const { email } = useParams();
  const targetRef = useRef();
  const [studentData, setStudentData] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://eserver-i5sm.onrender.com/api/v1/adminRoute/getAllStudents?email=${email}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        const data = response.data.allStudent[0];
        setStudentData(data);
      })
      .catch((error) => {
        console.error("Error fetching Student data:", error);
      });
  }, [email]);

  return (
    <>
      <div className="text-end">
        <button
          className="border p-2 rounded-md bg-gray-700 text-gray-200 mt-7 me-20 "
          onClick={() => generatePDF(targetRef, { filename: "page.pdf" })}
        >
          Download PDF
        </button>
      </div>

      <div ref={targetRef} className="flex justify-center  ">
        <div className=" border-4 rounded-xl w-400 p-2 relative ">
          <div className=" text-end p-2 bg-blue-950 text-white">
            <h1 className="text-2xl font-bold">Govt High School </h1>
            <p> {studentData.address} </p>
          </div>
          <p className="h-1 bg-blue-600"></p>
          <p className="h-[2px] bg-blue-950"></p>
          <div className="w-20 h-auto rounded-full overflow-hidden border-4 border-white absolute top-8 left-10 ">
            <img
              className="h-[100%] w-[100%]"
              src={studentData.image.url}
            />
          </div>
          <div className="flex justify-center mt-1 dark:text-white">
            <h1 className="bg-red-500 text-sm text-white rounded-md pb-[5px] px-2 capitalize ">
              Identity Card
            </h1>
          </div>
          <div>
            <div className="flex justify-between relative">
              <div className="ms-4 ">
                <table>
                  <tbody className="text-sm  ">
                    <tr>
                      <td className="font-bold ">Name </td>
                      <td className="ps-4">
                        : {studentData.fullName?.slice(0, 15)}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-bold">F/Name</td>
                      <td className="ps-4">: {studentData.fatherName}</td>
                    </tr>
                    <tr>
                      <td className="font-bold">D.O.B</td>
                      <td className="ps-4">
                        : {new Date(studentData.dateOfBirth).toLocaleDateString(
                          "en-US"
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-bold">Class</td>
                      <td className="ps-4">
                     
                        : {studentData.class}-{studentData.section}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-bold">Address</td>
                      <td className="ps-4">: {studentData.address}</td>
                    </tr>
                    <tr>
                      <td className="font-bold">Tel</td>
                      <td className="ps-4">: +91{studentData.contact}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <p className="ms-4 font-bold mb-4 absolute top-[-30px]">
                  2023-2024
                </p>
                <div className="w-28 me-2 h-32 border-blue-950 border-4 rounded-xl overflow-hidden">
                  {studentData.image && studentData.image.url ? (
                    <img
                      className="w-[100%] h-[100%]"
                      src={studentData.image.url}
                      alt="Image"
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <p className="h-1 mt-2 bg-blue-950"></p>
        </div>
      </div>
    </>
  );
};

export default StudentIdCard;
