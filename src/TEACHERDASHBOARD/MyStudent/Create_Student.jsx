import React, { useState, useEffect } from "react";
import InputForm from "../../Dynamic/Form/InputForm";
import { toast } from "react-toastify";
import axios from "axios";
import "../../Dynamic/Form/FormStyle.css";
import { useStateContext } from "../../contexts/ContextProvider";
import DynamicDataTable from "./DataTable";
import Cookies from "js-cookie";
import { Button } from "@mui/material";
const authToken = Cookies.get("token");

function Create_Student() {
  const { currentColor } = useStateContext();
  const authToken = Cookies.get("token");

  const [loading, setLoading] = useState(false);
  const [shouldFetchData, setShouldFetchData] = useState(false);

  const [createdStudent, setCreatedStudent] = useState(false);
  const [deactivatedStudent, setDeactivatedStudent] = useState(false);

  const [formData, setFormData] = useState({
    studentFullName: "",
    studentEmail: "",
    studentPassword: "",
    studentDateOfBirth: "",
    studentRollNo: "",
    studentGender: "",
    studentJoiningDate: "",
    studentAddress: "",
    studentContact: "",
    studentClass: "",
    studentSection: "",
    studentCountry: "",
    studentSubject: "",
    fatherName: "",
    motherName: "",
    parentEmail: "",
    parentPassword: "",
    parentContact: "",
    studentImage: "",
    parentImage: "",
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    axios
      .get(
        "https://eshikshaserver.onrender.com/api/v1/adminRoute/getAllStudents",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          }, // Set withCredentials to true
        }
      )
      .then((response) => {
        if (Array.isArray(response.data.allStudent)) {
          // console.log(response.data.allStudent);
          // Update the state with the array
          setSubmittedData(response.data.allStudent);
          // console.log(response.data.allStudent);
        } else {
          console.error("Data format is not as expected:", response.allStudent);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error gracefully, e.g., show an error message to the user
      });
  }, [createdStudent, deactivatedStudent]);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.response);
  }, []);

  const handleFieldChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleImageChange = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];

    if (name) {
      // console.log("Name:", name);
    } else {
      console.error("Name attribute is missing or not set.");
    }

    if (file) {
      // console.log("File:", file);
    } else {
      console.error("File input is missing or not selected.");
    }

    setFormData({
      ...formData,
      [name]: file,
    });
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "studentImage" && key !== "parentImage") {
        formDataToSend.append(key, String(value));
      }
    });

    formDataToSend.append("studentImage", formData.studentImage);
    formDataToSend.append("parentImage", formData.parentImage);

    try {
      setLoading(true);
      const response = await axios.post(
        "https://eshikshaserver.onrender.com/api/v1/adminRoute/createStudentParent",
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setCreatedStudent(!createdStudent);
      setFormData({
        studentFullName: "",
        studentEmail: "",
        studentPassword: "",
        studentDateOfBirth: "",
        studentRollNo: "",
        studentGender: "",
        studentJoiningDate: "",
        studentAddress: "",
        studentContact: "",
        studentClass: "",
        studentSection: "",
        studentCountry: "",
        studentSubject: "",
        fatherName: "",
        motherName: "",
        parentEmail: "",
        parentPassword: "",
        parentContact: "",
        studentImage: null,
        parentImage: null,
      });
      setSubmittedData([...submittedData, response.data]);
      setLoading(false);
      toast.success("Form submitted successfully!");
      setShouldFetchData(true);
      // closeModal();
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while submitting the form.");
      setLoading(false);
    }
  };

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
        setDeactivatedStudent(!deactivatedStudent);
        const updatedData = submittedData.filter(
          (item) => item.email !== email
        );
        setSubmittedData(updatedData);
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

  const formFields = [
    {
      label: "Full Name",
      name: "studentFullName",
      type: "text",
      value: formData.studentFullName,
    
    },
    {
      label: "Email",
      name: "studentEmail",
      type: "email",
      value: formData.studentEmail,
    
    },
    {
      label: "Password",
      name: "studentPassword",
      type: "password",
      value: formData.studentPassword,
    
    },
    {
      label: "Date of Birth",
      name: "studentDateOfBirth",
      type: "date",
      value: formData.studentDateOfBirth,
    
    },
    {
      label: "Roll No",
      name: "studentRollNo",
      type: "text",
      value: formData.studentRollNo,
    
    },
    {
      label: "Gender",
      name: "studentGender",
      type: "select",
      value: formData.studentGender,
    
      selectOptions: ["Gender", "Male", "Female", "Other"],
    },
    {
      label: "Admission Date",
      name: "studentJoiningDate",
      type: "date",
      value: formData.studentJoiningDate,
    
    },
    {
      label: "Address",
      name: "studentAddress",
      type: "text",
      value: formData.studentAddress,
    
    },
    {
      label: "Contact",
      name: "studentContact",
      type: "tel",
      value: formData.studentContact,
    
    },
    {
      label: "Class Of Student",
      name: "studentClass",
      type: "select",
      value: formData.studentClass,
    
      selectOptions: [
        "Class",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ],
    },
    {
      label: "Section",
      name: "studentSection",
      type: "select",
      value: formData.studentSection,
    
      selectOptions: ["Section", "A", "B", "C"],
    },
    {
      label: "Country",
      name: "studentCountry",
      type: "text",
      value: formData.studentCountry,
    
    },
    {
      label: "Subject",
      name: "studentSubject",
      type: "text",
      value: formData.studentSubject,
    
    },
    {
      label: "Father's Name",
      name: "fatherName",
      type: "text",
      value: formData.fatherName,
    
    },
    {
      label: "Mother's Name",
      name: "motherName",
      type: "text",
      value: formData.motherName,
    
    },
    {
      label: "Parent Email",
      name: "parentEmail",
      type: "email",
      value: formData.parentEmail,
    
    },
    {
      label: "Parent Password",
      name: "parentPassword",
      type: "password",
      value: formData.parentPassword,
    
    },
    {
      label: "Parent Contact",
      name: "parentContact",
      type: "tel",
      value: formData.parentContact,
    
    },
    {
      label: "Student Pic",
      name: "studentImage",
      type: "file",
      accept: "image/*",
    
    },
    {
      label: "Parent Pic",
      name: "parentImage",
      type: "file",
      accept: "image/*",
    
    },
  ];

  return (
    <div className=" mt-12 md:mt-1 p-3  ">
      <h1
        className="text-4xl font-bold mb-4 uppercase text-center  hover-text "
        style={{ color: currentColor }}
      >
        New Student and Parent
      </h1>
      <div className=" mb-4">
      {/* <Button
          variant="contained"
          style={{ backgroundColor: currentColor,marginRight:"20px" }}
          onClick={toggleModal}
        >
          Create Admission
        </Button> */}
        </div>
       {isOpen && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-[99999999] flex justify-center items-center w-full h-screen bg-gray-900 bg-opacity-50"
        
        >
          <div className="relative p-4 w-full  max-h-full"
            data-aos="fade-down"
          >
            <div className="relative  rounded-lg shadow dark:bg-gray-700 overflow-auto ">
              <div className="flex items-center justify-between p-2 md:p-2 border-b rounded-t dark:border-gray-600 bg-white">
                <h3 className="text-xl font-semibold  dark:text-white">
                 Admission Form
                </h3>
                <button
                  onClick={toggleModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="h-[80vh] sm:h-[70vh] md:h-[70vh] lg:h-[70vh]  overflow-auto  bg-gray-50">
              {/* <div className="h-[80vh] md:h-auto overflow-auto  bg-yellow-400"> */}
                <div className="p-4 md:p-5 space-y-4  ">
                  <InputForm
                    fields={formFields}
                    handleChange={handleFieldChange}
                    handleImageChange={handleImageChange}
                  />

                  <div className="md:col-span-6 text-right mt-3 ">
                    <div className="flex items-center gap-5 p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <Button
                        type="submit"
                        variant="contained"
                        onClick={handleSubmit}
                        style={{
                          backgroundColor: currentColor,
                          color: "white",
                          width: "100%",
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
                        onClick={toggleModal}
                        style={{
                          backgroundColor: "#616161",
                          color: "white",
                          width: "100%",
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <DynamicDataTable data={submittedData} handleDelete={handleDelete} />
    </div>
  );
}

export default Create_Student;
