import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Dynamic/Form/FormStyle.css";
import { useStateContext } from "../../contexts/ContextProvider";
import Cookies from "js-cookie";
import Tables from "../../Dynamic/Tables";
import { Link } from "react-router-dom";
import { MdRemoveRedEye } from "react-icons/md";

function Create_Student() {
  const { currentColor } = useStateContext();
  const authToken = Cookies.get("token");
  const [createdStudent, setCreatedStudent] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);
  const teacherDetails = JSON.parse(sessionStorage.response);
  const classTeacherClass = teacherDetails.classTeacher;
  const classTeacherSection = teacherDetails.section;
  const filteredData = submittedData.filter(
    (teacherDetails) =>
      teacherDetails.class == classTeacherClass &&
      teacherDetails.section == classTeacherSection
  );

  useEffect(() => {
    axios
      .get(
        "https://eserver-i5sm.onrender.com/api/v1/adminRoute/getAllStudents",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        if (Array.isArray(response.data.allStudent)) {
          setSubmittedData(response.data.allStudent);
        } else {
          console.error("Data format is not as expected:", response.allStudent);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [createdStudent]);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.response);
  }, []);

  const THEAD = [
    "S.No.",
    "Photo",
    "adm No",
    "Class",
    "Name",
    "Father",
    "Gender",
    "Email",
    "Contact",
    "Adm Date",
    "Actions",
  ];

  return (
    <div className=" mt-12 md:mt-1 p-3  ">
      <div
        className="rounded-tl-lg border rounded-tr-lg text-white  text-[12px] lg:text-lg"
        style={{ background: currentColor }}
      >
        <p className="px-5">New Student and Parent</p>
      </div>

      <Tables
        thead={THEAD}
        tbody={filteredData?.map((val, ind) => ({
          "S.No.": ind + 1,
          Photo:
            val?.image && val?.image.url ? (
              <img
                src={val?.image?.url}
                alt="Student"
                style={{
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <span>
                <img
                  className="h-[25px] w-[25px] rounded-full object-contain"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"
                  alt=""
                />
              </span>
            ),

          "adm No": val?.admissionNumber,
          Class: val?.class,
          Name:
            val?.fullName.length > 13
              ? `${val.fullName.slice(0, 13)}...`
              : val.fullName,
          Father:
            val?.fatherName.length > 13
              ? `${val.fatherName.slice(0, 13)}...`
              : val.fatherName,
          Gender: val?.gender,
          Email:
            val?.email.length > 13 ? `${val.email.slice(0, 13)}...` : val.email,
          Contact: val?.contact,
          "Adm Date": val?.joiningDate,

          Delete: (
            <div className=" w-full flex ">
              <div className="text-[16px]">
                <Link to={`/teacher/mystudents/view-profile/${val.email}`}>
                  <MdRemoveRedEye />
                </Link>
              </div>
            </div>
          ),
        }))}
      />
    </div>
  );
}

export default Create_Student;
