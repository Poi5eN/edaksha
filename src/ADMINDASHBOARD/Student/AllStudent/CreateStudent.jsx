import React, { useState, useEffect } from "react";
// import InputForm from "../../../Dynamic/Form/InputForm";
import { toast } from "react-toastify";
import axios from "axios";
import "../../../Dynamic/Form/FormStyle.css";
import DynamicDataTable from "./DataTable";
import { useStateContext } from "../../../contexts/ContextProvider.js";
import Cookies from "js-cookie";
import Loading from "../../../Loading";

import useCustomQuery from '../../../useCustomQuery'
import SomthingwentWrong from "../../../SomthingwentWrong";
import NoDataFound from "../../../NoDataFound.jsx";
import Heading from "../../../Dynamic/Heading.jsx";


function CreateStudent() {
  const authToken = Cookies.get("token");
  const { currentColor } = useStateContext();
 

  const [submittedData, setSubmittedData] = useState([]);

  const { queryData: studentData, error: studentError, loading: studentLoading } = useCustomQuery("https://eshikshaserver.onrender.com/api/v1/adminRoute/getAllStudents");
  
// console.log("firststudentData",studentData)
  useEffect(()=>{
    if(studentData){
      setSubmittedData(studentData.allStudent);
    }
  },[studentData])
  console.log("studentDatastudentDatastudentData",studentData)
  // const handleFieldChange = (fieldName, value) => {
  //   setFormData({
  //     ...formData,
  //     [fieldName]: value,
  //   });
  // };

  // const handleImageChange = (e) => {
  //   const name = e.target.name;
  //   const file = e.target.files[0];

  //   if (name) {
  //     console.log("Name:", name);
  //   } else {
  //     console.error("Name attribute is missing or not set.");
  //   }

  //   if (file) {
  //     console.log("File:", file);
  //   } else {
  //     console.error("File input is missing or not selected.");
  //   }

  //   setFormData({
  //     ...formData,
  //     [name]: file,
  //   });
  // };

  // const handleSubmit = async () => {
  //   const formDataToSend = new FormData();
  //   Object.entries(formData).forEach(([key, value]) => {
  //     if (key !== "studentImage" && key !== "parentImage") {
  //       formDataToSend.append(key, String(value));
  //     }
  //   });

  //   formDataToSend.append("studentImage", formData.studentImage);
  //   formDataToSend.append("parentImage", formData.parentImage);

  //   try {
  //     setLoading(true);
  //     const response = await axios.post(
  //       "https://eshikshaserver.onrender.com/api/v1/adminRoute/createStudentParent",
  //       formDataToSend,
  //       {
  //         withCredentials: true,
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     setFormData({
  //       studentFullName: "",
  //       studentEmail: "",
  //       studentPassword: "",
  //       studentDateOfBirth: "",
  //       studentRollNo: "",
  //       studentGender: "",
  //       studentJoiningDate: "",
  //       studentAddress: "",
  //       studentContact: "",
  //       studentClass: "",
  //       studentSection: "",
  //       studentCountry: "",
  //       studentSubject: "",
  //       fatherName: "",
  //       motherName: "",
  //       parentEmail: "",
  //       parentPassword: "",
  //       parentContact: "",
  //       studentImage: null,
  //       parentImage: null,
  //     });

  //     setSubmittedData([...submittedData, formData]);
  //     setLoading(false);
  //     toast.success("Student Created successfully!");
  //     setShouldFetchData(true);
  //     closeModal();
  //   } catch (error) {
  //     console.error("Error:", error);
  //     toast.error("An error occurred while creating a student.");
  //     setLoading(false);
  //   }
  // };

  const handleDelete = (email) => {
    axios
      .put(
        `https://eshikshaserver.onrender.com/api/v1/adminRoute/deactivateStudent`,
        { email },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        const filterData = submittedData.filter(
          (item) => item.email !== email
        );
        setSubmittedData(filterData);
        toast.success("Student data deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting Student data:", error);
        toast.error("An error occurred while deleting the Student data.");
      });
  };

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  // const formFields = [
  //   {
  //     label: "Full Name",
  //     name: "studentFullName",
  //     type: "text",
  //     value: formData.studentFullName,
  //     required: true,
  //   },
  //   {
  //     label: "Email",
  //     name: "studentEmail",
  //     type: "email",
  //     value: formData.studentEmail,
  //     required: true,
  //   },
  //   {
  //     label: "Password",
  //     name: "studentPassword",
  //     type: "password",
  //     value: formData.studentPassword,
  //     required: true,
  //   },
  //   {
  //     label: "Date of Birth",
  //     name: "studentDateOfBirth",
  //     type: "date",
  //     value: formData.studentDateOfBirth,
  //     required: true,
  //   },
  //   {
  //     label: "Roll No",
  //     name: "studentRollNo",
  //     type: "text",
  //     value: formData.studentRollNo,
  //     required: true,
  //   },
  //   {
  //     label: "Gender",
  //     name: "studentGender",
  //     type: "select",
  //     value: formData.studentGender,
  //     required: true,
  //     selectOptions: ["Gender", "Male", "Female", "Other"],
  //   },
  //   {
  //     label: "Joining Date",
  //     name: "studentJoiningDate",
  //     type: "date",
  //     value: formData.studentJoiningDate,
  //     required: true,
  //   },
  //   {
  //     label: "Address",
  //     name: "studentAddress",
  //     type: "text",
  //     value: formData.studentAddress,
  //     required: true,
  //   },
  //   {
  //     label: "Contact",
  //     name: "studentContact",
  //     type: "tel",
  //     value: formData.studentContact,
  //     required: true,
  //   },
  //   {
  //     label: "Class Of Student",
  //     name: "studentClass",
  //     type: "select",
  //     value: formData.studentClass,
  //     required: true,
  //     selectOptions: [
  //       "Class",
  //       "1",
  //       "2",
  //       "3",
  //       "4",
  //       "5",
  //       "6",
  //       "7",
  //       "8",
  //       "9",
  //       "10",
  //       "11",
  //       "12",
  //     ],
  //   },
  //   {
  //     label: "Section",
  //     name: "studentSection",
  //     type: "select",
  //     value: formData.studentSection,
  //     required: true,
  //     selectOptions: ["Section", "A", "B", "C"],
  //   },
  //   {
  //     label: "Country",
  //     name: "studentCountry",
  //     type: "text",
  //     value: formData.studentCountry,
  //     required: true,
  //   },
  //   {
  //     label: "Subject",
  //     name: "studentSubject",
  //     type: "text",
  //     value: formData.studentSubject,
  //     required: true,
  //   },
  //   {
  //     label: "Father's Name",
  //     name: "fatherName",
  //     type: "text",
  //     value: formData.fatherName,
  //     required: true,
  //   },
  //   {
  //     label: "Mother's Name",
  //     name: "motherName",
  //     type: "text",
  //     value: formData.motherName,
  //     required: true,
  //   },
  //   {
  //     label: "Parent Email",
  //     name: "parentEmail",
  //     type: "email",
  //     value: formData.parentEmail,
  //     required: true,
  //   },
  //   {
  //     label: "Parent Password",
  //     name: "parentPassword",
  //     type: "password",
  //     value: formData.parentPassword,
  //     required: true,
  //   },
  //   {
  //     label: "Parent Contact",
  //     name: "parentContact",
  //     type: "tel",
  //     value: formData.parentContact,
  //     required: true,
  //   },
  //   {
  //     label: "Student Pic",
  //     name: "studentImage",
  //     type: "file",
  //     accept: "image/*",
  //     required: true,
  //   },
  //   {
  //     label: "Parent Pic",
  //     name: "parentImage",
  //     type: "file",
  //     accept: "image/*",
  //     required: true,
  //   },
  // ];
 
  if ( studentError) {
    return <SomthingwentWrong/>
  }
  if ( studentLoading) {
    return <Loading/>
  }
  return (
    <div className="md:h-screen mt-12 md:mt-1  mx-auto p-1 overflow-hidden">
      {/* <h1
        className="text-4xl font-bold mb-4 uppercase text-center  hover-text "
        style={{ color: currentColor }}
      >
      Students
      </h1> */}
     <Heading Name="Students"/>
      <div className="">
        {/* <Link
          to="/admin"
          className="dark:text-white dark:bg-secondary-dark-bg neu-btn"
          style={{ color: currentColor, border: `2px solid ${currentColor}` }}
        >
          Back
        </Link> */}
        
        {/* <button
        onClick={openModal}
        className="dark:text-white dark:bg-secondary-dark-bg text-gray-800  neu-btn border-2 mb-2"
        style={{ border: `2px solid ${currentColor} `, color: currentColor }}
      >
        Add Student & Parent
      </button> */}
      </div>
     
      {/* {console.log("create_student")} */}
      {/* {isModalOpen && <div className="modal-blur"></div>} */}
      {/* Modal */}
      {/* <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Create Form"
        style={modalStyle}
        overlayClassName="overlay"
      >
        <div className=" rounded-md dark:text-white dark:bg-secondary-dark-bg">
          <h1
            className=" text-center text-2xl pb-2"
            style={{ color: currentColor }}
          >
            Create Student and Parent
          </h1>
          <InputForm
            fields={formFields}
            handleChange={handleFieldChange}
            handleImageChange={handleImageChange}
          />
          <div
          className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="dark:text-white dark:bg-secondary-dark-bg text-gray-800  neu-btn border-2 "
              style={{
                border: `2px solid ${currentColor} `,
                color: currentColor,
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
            </button>
            <button
              onClick={closeModal}
              className="dark:text-white dark:bg-secondary-dark-bg text-red-600 ml-2 neu-btn border-2 "
              style={{ border: `2px solid red ` }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal> */}{
        submittedData.length>0 ? ( <DynamicDataTable data={submittedData} handleDelete={handleDelete} />) :(<NoDataFound/>)
      }
    
    
    </div>
  );
}

export default CreateStudent;
