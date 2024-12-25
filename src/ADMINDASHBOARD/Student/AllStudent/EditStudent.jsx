import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
const authToken = Cookies.get("token");

const EditStudent = () => {
  const [Sclass,setSClass]=useState("");
 const [section,setSection]=useState("")
  const [selectedClass, setSelectedClass] = useState(Sclass);
  const [selectedSection,setSelectedSection]=useState(section)
  const navigate = useNavigate();
  const { email } = useParams();
   
  const [getClass, setGetClass] = useState([]);
  // const [getClass, setGetClass] = useState([]);
 
  const [availableSections, setAvailableSections] = useState([]);
  // const [studentData, setStudentData] = useState({});
  const [loading, setLoading] = useState(false);
  const [parentData, setParentData] = useState({});
  const [studentData, setStudentData] = useState({
    // studentFullName: "",
    // dateOfBirth: "",
    // rollNo: "",
    // gender: "",
    // joiningDate: "",
    // address: "",
    // contact: "",
    // class: "",
    // section: "",
    // country: "",
    // subject: "",
    image: null,
  });

  const { toPDF, targetRef } = usePDF({ filename: "Student.pdf" });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
   
  };

  const parentHandleOnChange = (e) => {
    const { name, value } = e.target;

    setParentData({ ...parentData, [name]: value });
  };

  useEffect(() => {
    axios
      .get(
        `https://eshikshaserver.onrender.com/api/v1/adminRoute/getAllClasses`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        let classes = response.data.classList;

        setGetClass(classes.sort((a, b) => a - b));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  // console.log("classes",getClass)
  const handleClassChange = (e) => {
    const selectedClassName = e.target.value;
    setSelectedClass(selectedClassName);
    const selectedClassObj = getClass.find(
      (cls) => cls.className === selectedClassName
    );

    if (selectedClassObj) {
      setAvailableSections(selectedClassObj.sections.split(", "));
    } else {
      setAvailableSections([]);
    }
  };

  useEffect(() => {
    const fetchStudentAndParentData = async () => {
      try {
        const response = await axios.get(
          `https://eshikshaserver.onrender.com/api/v1/adminRoute/getStudentAndParent/${email}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const student = response.data.student;
        const parent = response.data.parent;
        setSClass(student.class)
        setSection(student.section)
      
       
        // Update student data
        setStudentData((prevFormData) => ({
          ...prevFormData,
          ...student,
          className:student.class || "",
        }));
        setSelectedClass(student.class || "");
        setSelectedSection(student.section || "")
        handleClassChange({ target: { value: student.class || "" } });
        // Update parent data
        setParentData((prevParentData) => ({
          ...prevParentData,
          ...parent,
        }));
      } catch (error) {
        console.error("Error fetching student and parent data:", error);
      }
    };

    fetchStudentAndParentData();
  }, [email, authToken]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStudentData({
        ...studentData,
        image: file,
      });
    }
  };

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  
  //   const data = new FormData();
  //   const { image, ...studentDataWithoutImage } = studentData;
  //   const { parentImages, ...parentDataWithoutImage } = parentData;
  //   // Append student data to FormData
  //   // data.append("studentFullName", studentDataWithoutImage?.["fullName"]);
  //   // data.append("studentAdmissionNumber", studentDataWithoutImage?.["admissionNumber"]);
  //   // if (studentDataWithoutImage?.["studentPassword"]) {
  //   //   data.append("studentPassword", studentDataWithoutImage?.["studentPassword"]);
  //   // }
  //   // data.append("studentDateOfBirth", studentDataWithoutImage?.["dateOfBirth"]);
  //   // data.append("rollNo", studentDataWithoutImage?.["rollNo"]);
  //   // data.append("studentGender", studentDataWithoutImage?.["gender"]);
  //   // data.append("studentJoiningDate", studentDataWithoutImage?.["joiningDate"]);
  //   // data.append("studentAddress", studentDataWithoutImage?.["address"]);
  //   // data.append("studentContact", studentDataWithoutImage?.["contact"]);
  //   // data.append("studentClass", studentDataWithoutImage?.["class"]);
  //   // data.append("studentSection", studentDataWithoutImage?.["section"]);
  //   // data.append("studentCountry", studentDataWithoutImage?.["country"]);
  //   // data.append("religion", studentDataWithoutImage?.["religion"]);
  //   // data.append("caste", studentDataWithoutImage?.["caste"]);
  //   // data.append("nationality", studentDataWithoutImage?.["nationality"]);
  //   // data.append("pincode", studentDataWithoutImage?.["pincode"]);
  //   // data.append("state", studentDataWithoutImage?.["state"]);
  //   // data.append("city", studentDataWithoutImage?.["city"]);
  //   // data.append("studentSubject", studentDataWithoutImage?.["subject"]);
  //   // data.append("fatherName", parentData?.["fullName"]);
  //   // data.append("motherName", parentData?.["motherName"]);
  //   // data.append("parentQualification", parentData?.["qualification"]);
  //   // data.append("parentContact", parentData?.["contact"]);
  //   // data.append("parentIncome", parentData?.["income"]);
  //   // data.append("parentId", studentDataWithoutImage?.["parentId"]);
  
  //   data.append("studentFullName", studentDataWithoutImage?.["fullName"]);
  //   data.append(
  //     "studentAdmissionNumber",
  //     studentDataWithoutImage?.["admissionNumber"]
  //   );
  //   if (studentDataWithoutImage?.["studentPassword"]) {
  //     data.append(
  //       "studentPassword",
  //       studentDataWithoutImage?.["studentPassword"]
  //     );
  //   }
  
  //   data.append("studentDateOfBirth", studentDataWithoutImage?.["dateOfBirth"]);
  //   data.append("rollNo", studentDataWithoutImage?.["rollNo"]);
  //   data.append("studentGender", studentDataWithoutImage?.["gender"]);
  //   data.append("studentJoiningDate", studentDataWithoutImage?.["joiningDate"]);
  //   data.append("studentAddress", studentDataWithoutImage?.["address"]);
  //   data.append("studentContact", studentDataWithoutImage?.["contact"]);
  //   data.append("studentClass", studentDataWithoutImage?.["class"]);
  //   data.append("studentSection", studentDataWithoutImage?.["section"]);
  //   data.append("studentCountry", studentDataWithoutImage?.["country"]);
  //   data.append("religion", studentDataWithoutImage?.["religion"]);
  //   data.append("caste", studentDataWithoutImage?.["caste"]);
  //   data.append("nationality", studentDataWithoutImage?.["nationality"]);
  //   data.append("pincode", studentDataWithoutImage?.["pincode"]);
  //   data.append("state", studentDataWithoutImage?.["state"]);
  //   data.append("city", studentDataWithoutImage?.["city"]);
  //   data.append("studentSubject", studentDataWithoutImage?.["subject"]);
  //   data.append("fatherName", parentDataWithoutImage?.["fullName"]);
  //   data.append("motherName", parentDataWithoutImage?.["motherName"]);
  //   data.append("parentQualification", parentDataWithoutImage?.["qualification"]);
  //   data.append("parentContact", parentDataWithoutImage?.["contact"]);
  //   data.append("parentIncome", parentDataWithoutImage?.["income"]);
  //   data.append("parentId", studentDataWithoutImage?.["parentId"]);
  
  //   // Append the image as binary data
  //   if (studentData.image && typeof studentData.image === "object" && studentData.image instanceof File) {
  //     data.append("studentImage", studentData.image);  // Send image as binary
  //   } else {
  //     toast.error("Please select a valid image");
  //     setLoading(false);
  //     return;
  //   }
  
  //   try {
  //     const response = await axios.put(
  //       `https://eshikshaserver.onrender.com/api/v1/adminRoute/editStudentParent/${email}`,
  //       data,
  //       {
  //         withCredentials: true,
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //           // No need to set "Content-Type", FormData handles it
  //         },
  //       }
  //     );
  
  //     navigate("/admin/allstudent");
  //     toast.success("Updated Successfully");
  //   } catch (error) {
  //     console.error("Error updating data:", error);
  //     toast.error("Failed to update data");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  
  //   // Use FormData instead of plain object for handling both text data and image
  //   const data = new FormData();
  
  //   const { image, ...studentDataWithoutImage } = studentData;
  //   const { parentImages, ...parentDataWithoutImage } = parentData;
  
  //   // Append student and parent data to FormData
  //   data.append("studentFullName", studentDataWithoutImage?.fullName);
  //   data.append(
  //     "studentAdmissionNumber",
  //     studentDataWithoutImage?.admissionNumber
  //   );
  //   if (studentDataWithoutImage?.studentPassword) {
  //     data.append("studentPassword", studentDataWithoutImage?.studentPassword);
  //   }
  //   data.append("studentDateOfBirth", studentDataWithoutImage?.dateOfBirth);
  //   data.append("rollNo", studentDataWithoutImage?.rollNo);
  //   data.append("studentGender", studentDataWithoutImage?.gender);
  //   data.append("studentJoiningDate", studentDataWithoutImage?.joiningDate);
  //   data.append("studentAddress", studentDataWithoutImage?.address);
  //   data.append("studentContact", studentDataWithoutImage?.contact);
  //   data.append("studentClass", studentDataWithoutImage?.class);
  //   data.append("studentSection", studentDataWithoutImage?.section);
  //   data.append("studentCountry", studentDataWithoutImage?.country);
  //   data.append("religion", studentDataWithoutImage?.religion);
  //   data.append("caste", studentDataWithoutImage?.caste);
  //   data.append("nationality", studentDataWithoutImage?.nationality);
  //   data.append("pincode", studentDataWithoutImage?.pincode);
  //   data.append("state", studentDataWithoutImage?.state);
  //   data.append("city", studentDataWithoutImage?.city);
  //   data.append("studentSubject", studentDataWithoutImage?.subject);
  //   data.append("fatherName", parentDataWithoutImage?.fullName);
  //   data.append("motherName", parentDataWithoutImage?.motherName);
  //   data.append("parentQualification", parentDataWithoutImage?.qualification);
  //   data.append("parentContact", parentDataWithoutImage?.contact);
  //   data.append("parentIncome", parentDataWithoutImage?.income);
  //   data.append("parentId", studentDataWithoutImage?.parentId);
  
  //   // Append image if it exists
  //   if (image && typeof image === "object" && image instanceof File) {
  //     data.append("studentImage", image); // Append image to FormData
  //     console.log("Appended image:", image);
  //   } else {
  //     console.log("No valid image to append");
  //   }
  
  //   try {
  //     const response = await axios.put(
  //       `https://eshikshaserver.onrender.com/api/v1/adminRoute/editStudentParent/${email}`,
  //       data, // Sending FormData as payload
  //       {
  //         withCredentials: true,
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //           // Don't set "Content-Type", it will automatically be set by axios for FormData
  //         },
  //       }
  //     );
  
  //     navigate("/admin/allstudent");
  //     toast.success("Updated Successfully");
  //   } catch (error) {
  //     console.error("Error updating student data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  
  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  
  //   const data = new FormData();
  
  //   const { image, ...studentDataWithoutImage } = studentData;
  //   const { parentImages, ...parentDataWithoutImage } = parentData;
  
  //   // Append student data
  //   data.append("studentFullName", studentDataWithoutImage?.["fullName"]);
  //   data.append(
  //     "studentAdmissionNumber",
  //     studentDataWithoutImage?.["admissionNumber"]
  //   );
  //   if (studentDataWithoutImage?.["studentPassword"]) {
  //     data.append(
  //       "studentPassword",
  //       studentDataWithoutImage?.["studentPassword"]
  //     );
  //   }
  //   // Append more student and parent data as in your original code
  //   // ...
  
  //   // Check if image is a valid file before appending
  //   if (image && typeof image === "object" && image instanceof File) {
  //     data.append("studentImage", image);
  //     console.log("Appended image:", image);
  //   } else {
  //     console.log("No valid image to append");
  //   }
  
  //   try {
  //     const response = await axios.put(
  //       `https://eshikshaserver.onrender.com/api/v1/adminRoute/editStudentParent/${email}`,
  //       data,
  //       {
  //         withCredentials: true,
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //           // Don't explicitly set Content-Type for FormData
  //         },
  //       }
  //     );
  
  //     navigate("/admin/allstudent");
  //     toast.success("Updated Successfully");
  //   } catch (error) {
  //     console.error("Error updating student data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  
  //   const data = new FormData();
  
  //   const { image, ...studentDataWithoutImage } = studentData;
  //   const { parentImages, ...parentDataWithoutImage } = parentData;
  
  //   data.append("studentFullName", studentDataWithoutImage?.["fullName"]);
  //   data.append(
  //     "studentAdmissionNumber",
  //     studentDataWithoutImage?.["admissionNumber"]
  //   );
  //   if (studentDataWithoutImage?.["studentPassword"]) {
  //     data.append(
  //       "studentPassword",
  //       studentDataWithoutImage?.["studentPassword"]
  //     );
  //   }
  
  //   data.append("studentDateOfBirth", studentDataWithoutImage?.["dateOfBirth"]);
  //   data.append("rollNo", studentDataWithoutImage?.["rollNo"]);
  //   data.append("studentGender", studentDataWithoutImage?.["gender"]);
  //   data.append("studentJoiningDate", studentDataWithoutImage?.["joiningDate"]);
  //   data.append("studentAddress", studentDataWithoutImage?.["address"]);
  //   data.append("studentContact", studentDataWithoutImage?.["contact"]);
  //   data.append("studentClass", studentDataWithoutImage?.["class"]);
  //   data.append("studentSection", studentDataWithoutImage?.["section"]);
  //   data.append("studentCountry", studentDataWithoutImage?.["country"]);
  //   data.append("religion", studentDataWithoutImage?.["religion"]);
  //   data.append("caste", studentDataWithoutImage?.["caste"]);
  //   data.append("nationality", studentDataWithoutImage?.["nationality"]);
  //   data.append("pincode", studentDataWithoutImage?.["pincode"]);
  //   data.append("state", studentDataWithoutImage?.["state"]);
  //   data.append("city", studentDataWithoutImage?.["city"]);
  //   data.append("studentSubject", studentDataWithoutImage?.["subject"]);
  //   data.append("fatherName", parentDataWithoutImage?.["fullName"]);
  //   data.append("motherName", parentDataWithoutImage?.["motherName"]);
  //   data.append("parentQualification", parentDataWithoutImage?.["qualification"]);
  //   data.append("parentContact", parentDataWithoutImage?.["contact"]);
  //   data.append("parentIncome", parentDataWithoutImage?.["income"]);
  //   data.append("parentId", studentDataWithoutImage?.["parentId"]);
  
  //   if (image && typeof image === "object" && image instanceof File) {
  //     data.append("studentImage", image);
  //     console.log("image", image);
  //   }
  
  //   try {
  //     const response = await axios.put(
  //       `https://eshikshaserver.onrender.com/api/v1/adminRoute/editStudentParent/${email}`,
  //       data,
  //       {
  //         withCredentials: true,
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
      
  //     navigate("/admin/allstudent");
  //     toast.success("Updated Successfully");
  //   } catch (error) {
  //     console.error("Error updating student data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Use FormData instead of plain object for handling both text data and image
    const data = new FormData();

    const { image, ...studentDataWithoutImage } = studentData;
    const { parentImages, ...parentDataWithoutImage } = parentData;

    // Append student and parent data to FormData
    data.append("studentFullName", studentDataWithoutImage?.["fullName"]);
    data.append("studentAdmissionNumber", studentDataWithoutImage?.["admissionNumber"]);
    if (studentDataWithoutImage?.["studentPassword"]) {
        data.append("studentPassword", studentDataWithoutImage?.["studentPassword"]);
    }
    data.append("studentDateOfBirth", studentDataWithoutImage?.["dateOfBirth"]);
    data.append("rollNo", studentDataWithoutImage?.["rollNo"]);
    data.append("studentGender", studentDataWithoutImage?.["gender"]);
    data.append("studentJoiningDate", studentDataWithoutImage?.["joiningDate"]);
    data.append("studentAddress", studentDataWithoutImage?.["address"]);
    data.append("studentContact", studentDataWithoutImage?.["contact"]);
    data.append("studentClass", studentDataWithoutImage?.["class"]);
    data.append("studentSection", studentDataWithoutImage?.["section"]);
    data.append("studentCountry", studentDataWithoutImage?.["country"]);
    data.append("religion", studentDataWithoutImage?.["religion"]);
    data.append("caste", studentDataWithoutImage?.["caste"]);
    data.append("nationality", studentDataWithoutImage?.["nationality"]);
    data.append("pincode", studentDataWithoutImage?.["pincode"]);
    data.append("state", studentDataWithoutImage?.["state"]);
    data.append("city", studentDataWithoutImage?.["city"]);
    data.append("studentSubject", studentDataWithoutImage?.["subject"]);
    data.append("fatherName", parentDataWithoutImage?.["fullName"]);
    data.append("motherName", parentDataWithoutImage?.["motherName"]);
    data.append("parentQualification", parentDataWithoutImage?.["qualification"]);
    data.append("parentContact", parentDataWithoutImage?.["contact"]);
    data.append("parentIncome", parentDataWithoutImage?.["income"]);
    data.append("parentId", studentDataWithoutImage?.["parentId"]);

    // Append image if it exists
    if (image && typeof image === "object" && image instanceof File) {
      data.append("image", image);
      // data.append("studentImage", image);
      console.log("Appended image:", image);
    } else {
      console.log("No valid image to append");
    }

    if (image && typeof image === "object" && image instanceof File) {
      data.append("image", image);
      // data.append("studentImage", image);
      console.log("Appended image:", image);
    } else {
      console.log("No valid image to append");
    }

    try {
      const response = await axios.put(
        `https://eshikshaserver.onrender.com/api/v1/adminRoute/editStudentParent/${email}`,
        data, // Sending FormData as payload
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
            // "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
            // Don't set "Content-Type", axios will automatically set it for FormData
          },
        }
      );

      navigate("/admin/allstudent");
      toast.success("Updated Successfully");
    } catch (error) {
      console.error("Error updating student data:", error);
    } finally {
      setLoading(false);
    }
};

  
  return (
    <div className="text-center p-5">
      <h1 className="text-3xl font-bold mb-6">Edit Student Profile</h1>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <div className="py-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4 bg-white rounded-md shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-700">Student Name</label>
            <input
              type="text"
              name="fullName"
              value={studentData.fullName}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Admission Number</label>
            <input
              type="text"
              name="admissionNumber"
              value={studentData.admissionNumber}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Student Password</label>
            <input
              type="text"
              name="studentPassword"
              value={studentData.studentPassword}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Roll No</label>
            <input
              type="text"
              name="rollNo"
              value={studentData.rollNo}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Date Of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={
                studentData.dateOfBirth
                  ? new Date(studentData.dateOfBirth)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={handleOnChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Gender</label>
            <input
              type="text"
              name="gender"
              value={studentData.gender}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Admission Date</label>
            <input
              type="date"
              name="joiningDate"
              value={
                studentData.joiningDate &&
                !isNaN(new Date(studentData.joiningDate).getTime())
                  ? new Date(studentData.joiningDate)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={handleOnChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={studentData.address}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              name="country"
              value={studentData.country}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Religion</label>
            <input
              type="text"
              name="religion"
              value={studentData.religion}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Caste</label>
            <input
              type="text"
              name="caste"
              value={studentData.caste}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nationality</label>
            <input
              type="text"
              name="nationality"
              value={studentData.nationality}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={studentData.pincode}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={studentData.state}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">city</label>
            <input
              type="text"
              name="city"
              value={studentData.city}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contact</label>
            <input
              type="text"
              name="contact"
              value={studentData.contact}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          {/* 
          <div className="mb-4">
            <label className="block text-gray-700">Class</label>
            <input
              type="text"
              name="class"
              value={studentData.class}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border rounded"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Section</label>
            <input
              type="text"
              name="section"
              value={studentData.section}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border rounded"
              readOnly
            />  
          </div> */}
          <div>
            <label htmlFor="image">Image</label>
            {/* <input
              className="w-full p-2 border border-gray-300 rounded"
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            /> */}
            <input
  type="file"
  name="studentImage"
  value={studentData.studentImage}
  onChange={(e) => setStudentData({ ...studentData, image: e.target.files[0] })}
/>

          </div>

          <div>
            <label htmlFor="section">Father's Name</label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              id="fullName"
              name="fullName"
              value={parentData.fullName}
              onChange={parentHandleOnChange}
              placeholder="fatherName"
            />
          </div>
          <div>
            <label htmlFor="section">Mother's Name</label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              id="motherName"
              name="motherName"
              value={parentData.motherName}
              onChange={parentHandleOnChange}
              placeholder="motherName"
            />
          </div>
          <div>
            <label htmlFor="section"> Parent's Qualification</label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              id="qualification"
              name="qualification"
              value={parentData.qualification}
              onChange={parentHandleOnChange}
              placeholder="qualification"
            />
          </div>
          <div>
            <label htmlFor="section"> Parent's Income</label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="number"
              id="income"
              name="income"
              value={parentData.income}
              onChange={parentHandleOnChange}
              placeholder="income"
            />
          </div>
          <div>
            <label htmlFor="section"> Parent's Contact</label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="number"
              id="contact"
              name="contact"
              value={parentData.contact}
              onChange={parentHandleOnChange}
              placeholder="contact"
            />
          </div>

          <TextField
            label="Class"
            name="classTeacher"
            select
            value={selectedClass}
            onChange={handleClassChange}
            required
            style={{ width: "70%", paddingBottom: "20px" }}
          >
            <MenuItem value="" disabled>
              Select a Class
            </MenuItem>
            {getClass.map((cls, index) => (
              <MenuItem key={index} value={cls.className}>
                {cls.className}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Section"
            name="section"
            select
            value={section}
            // value={studentData.section}
            onChange={(e) => setStudentData({ ...studentData, section: e.target.value })}
            required
            style={{ width: "70%", paddingBottom: "20px" }}
          >
            <MenuItem value="" disabled>
              Select a Section
            </MenuItem>
            {availableSections.map((sec, index) => (
              <MenuItem key={index} value={studentData.section}>
              {/* <MenuItem key={index} value={section}> */}
                {sec}
              </MenuItem>
            ))}
          </TextField>
           {/* <div>
            <label htmlFor="section"> Parent's Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              value={parentData.image}
              className="w-full px-3 py-2 border rounded"
              
            />
          </div>  */}
        </div>
        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
          >
            {loading ? "Updating..." : "Update"}
          </button>
          <Link
            to="/admin/allstudent"
            className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-300 ml-4"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditStudent;


// import React, { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import { Box, Button, TextField, MenuItem } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { usePDF } from "react-to-pdf";
// import Cookies from "js-cookie";
// import { toast } from "react-toastify";
// const authToken = Cookies.get("token");

// const EditStudent = () => {
//   const [Sclass,setSClass]=useState("");
//  const [section,setSection]=useState("")
//   const [selectedClass, setSelectedClass] = useState(Sclass);
//   const [selectedSection,setSelectedSection]=useState(section)
//   const navigate = useNavigate();
//   const { email } = useParams();
   
//   const [getClass, setGetClass] = useState([]);
//   // const [getClass, setGetClass] = useState([]);
 
//   const [availableSections, setAvailableSections] = useState([]);
//   // const [studentData, setStudentData] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [parentData, setParentData] = useState({});
//   const [studentData, setStudentData] = useState({
//     // studentFullName: "",
//     // dateOfBirth: "",
//     // rollNo: "",
//     // gender: "",
//     // joiningDate: "",
//     // address: "",
//     // contact: "",
//     // class: "",
//     // section: "",
//     // country: "",
//     // subject: "",
//     image: null,
//   });

//   const { toPDF, targetRef } = usePDF({ filename: "Student.pdf" });

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setStudentData({ ...studentData, [name]: value });
   
//   };

//   const parentHandleOnChange = (e) => {
//     const { name, value } = e.target;

//     setParentData({ ...parentData, [name]: value });
//   };

//   useEffect(() => {
//     axios
//       .get(
//         `https://eshikshaserver.onrender.com/api/v1/adminRoute/getAllClasses`,
//         {
//           withCredentials: true,
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       )
//       .then((response) => {
//         let classes = response.data.classList;

//         setGetClass(classes.sort((a, b) => a - b));
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);
//   // console.log("classes",getClass)
//   const handleClassChange = (e) => {
//     const selectedClassName = e.target.value;
//     setSelectedClass(selectedClassName);
//     const selectedClassObj = getClass.find(
//       (cls) => cls.className === selectedClassName
//     );

//     if (selectedClassObj) {
//       setAvailableSections(selectedClassObj.sections.split(", "));
//     } else {
//       setAvailableSections([]);
//     }
//   };

//   useEffect(() => {
//     const fetchStudentAndParentData = async () => {
//       try {
//         const response = await axios.get(
//           `https://eshikshaserver.onrender.com/api/v1/adminRoute/getStudentAndParent/${email}`,
//           {
//             withCredentials: true,
//             headers: {
//               Authorization: `Bearer ${authToken}`,
//             },
//           }
//         );

//         const student = response.data.student;
//         const parent = response.data.parent;
//         setSClass(student.class)
//         setSection(student.section)
      
       
//         // Update student data
//         setStudentData((prevFormData) => ({
//           ...prevFormData,
//           ...student,
//           className:student.class || "",
//         }));
//         setSelectedClass(student.class || "");
//         setSelectedSection(student.section || "")
//         handleClassChange({ target: { value: student.class || "" } });
//         // Update parent data
//         setParentData((prevParentData) => ({
//           ...prevParentData,
//           ...parent,
//         }));
//       } catch (error) {
//         console.error("Error fetching student and parent data:", error);
//       }
//     };

//     fetchStudentAndParentData();
//   }, [email, authToken]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setStudentData({
//         ...studentData,
//         image: file,
//       });
//     }
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
  
//     const data = new FormData();
  
//     const { image, ...studentDataWithoutImage } = studentData;
//     const { parentImages, ...parentDataWithoutImage } = parentData;
  
//     data.append("studentFullName", studentDataWithoutImage?.["fullName"]);
//     data.append(
//       "studentAdmissionNumber",
//       studentDataWithoutImage?.["admissionNumber"]
//     );
//     if (studentDataWithoutImage?.["studentPassword"]) {
//       data.append(
//         "studentPassword",
//         studentDataWithoutImage?.["studentPassword"]
//       );
//     }
  
//     data.append("studentDateOfBirth", studentDataWithoutImage?.["dateOfBirth"]);
//     data.append("rollNo", studentDataWithoutImage?.["rollNo"]);
//     data.append("studentGender", studentDataWithoutImage?.["gender"]);
//     data.append("studentJoiningDate", studentDataWithoutImage?.["joiningDate"]);
//     data.append("studentAddress", studentDataWithoutImage?.["address"]);
//     data.append("studentContact", studentDataWithoutImage?.["contact"]);
//     data.append("studentClass", studentDataWithoutImage?.["class"]);
//     data.append("studentSection", studentDataWithoutImage?.["section"]);
//     data.append("studentCountry", studentDataWithoutImage?.["country"]);
//     data.append("religion", studentDataWithoutImage?.["religion"]);
//     data.append("caste", studentDataWithoutImage?.["caste"]);
//     data.append("nationality", studentDataWithoutImage?.["nationality"]);
//     data.append("pincode", studentDataWithoutImage?.["pincode"]);
//     data.append("state", studentDataWithoutImage?.["state"]);
//     data.append("city", studentDataWithoutImage?.["city"]);
//     data.append("studentSubject", studentDataWithoutImage?.["subject"]);
//     data.append("fatherName", parentDataWithoutImage?.["fullName"]);
//     data.append("motherName", parentDataWithoutImage?.["motherName"]);
//     data.append("parentQualification", parentDataWithoutImage?.["qualification"]);
//     data.append("parentContact", parentDataWithoutImage?.["contact"]);
//     data.append("parentIncome", parentDataWithoutImage?.["income"]);
//     data.append("parentId", studentDataWithoutImage?.["parentId"]);
  
//     if (image && typeof image === "object" && image instanceof File) {
//       data.append("studentImage", image);
//       console.log("image", image);
//     }
  
//     try {
//       const response = await axios.put(
//         `https://eshikshaserver.onrender.com/api/v1/adminRoute/editStudentParent/${email}`,
//         data,
//         {
//           withCredentials: true,
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log("response", response);
//       navigate("/admin/allstudent");
//       toast.success("Updated Successfully");
//     } catch (error) {
//       console.error("Error updating student data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
//     <div className="text-center p-5">
//       <h1 className="text-3xl font-bold mb-6">Edit Student Profile</h1>
//       <form onSubmit={handleFormSubmit} encType="multipart/form-data">
//         <div className="py-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4 bg-white rounded-md shadow-lg">
//           <div className="mb-4">
//             <label className="block text-gray-700">FullName</label>
//             <input
//               type="text"
//               name="fullName"
//               value={studentData.fullName}
//               onChange={handleOnChange}
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Admission Number</label>
//             <input
//               type="text"
//               name="admissionNumber"
//               value={studentData.admissionNumber}
//               onChange={handleOnChange}
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Student Password</label>
//             <input
//               type="text"
//               name="studentPassword"
//               value={studentData.studentPassword}
//               onChange={handleOnChange}
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Roll No</label>
//             <input
//               type="text"
//               name="rollNo"
//               value={studentData.rollNo}
//               onChange={handleOnChange}
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">Date Of Birth</label>
//             <input
//               type="date"
//               name="dateOfBirth"
//               value={
//                 studentData.dateOfBirth
//                   ? new Date(studentData.dateOfBirth)
//                       .toISOString()
//                       .split("T")[0]
//                   : ""
//               }
//               onChange={handleOnChange}
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Gender</label>
//             <input
//               type="text"
//               name="gender"
//               value={studentData.gender}
//               onChange={handleOnChange}
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">Admission Date</label>
//             <input
//               type="date"
//               name="joiningDate"
//               value={
//                 studentData.joiningDate &&
//                 !isNaN(new Date(studentData.joiningDate).getTime())
//                   ? new Date(studentData.joiningDate)
//                       .toISOString()
//                       .split("T")[0]
//                   : ""
//               }
//               onChange={handleOnChange}
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">Address</label>
//             <input
//               type="text"
//               name="address"
//               value={studentData.address}
//               onChange={handleOnChange}
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Country</label>
//             <input
//               type="text"
//               name="country"
//               value={studentData.country}
//               onChange={handleOnChange}
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Religion</label>
//             <input
//               type="text"
//               name="religion"
//               value={studentData.religion}
//               onChange={handleOnChange}
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Caste</label>
//             <input
//               type="text"
//               name="caste"
//               value={studentData.caste}
//               onChange={handleOnChange}
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Nationality</label>
//             <input
//               type="text"
//               name="nationality"
//               value={studentData.nationality}
//               onChange={handleOnChange}
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Pincode</label>
//             <input
//               type="text"
//               name="pincode"
//               value={studentData.pincode}
//               onChange={handleOnChange}
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">State</label>
//             <input
//               type="text"
//               name="state"
//               value={studentData.state}
//               onChange={handleOnChange}
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">city</label>
//             <input
//               type="text"
//               name="city"
//               value={studentData.city}
//               onChange={handleOnChange}
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Contact</label>
//             <input
//               type="text"
//               name="contact"
//               value={studentData.contact}
//               onChange={handleOnChange}
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>
//           {/* 
//           <div className="mb-4">
//             <label className="block text-gray-700">Class</label>
//             <input
//               type="text"
//               name="class"
//               value={studentData.class}
//               onChange={handleOnChange}
//               className="w-full px-3 py-2 border rounded"
//               readOnly
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Section</label>
//             <input
//               type="text"
//               name="section"
//               value={studentData.section}
//               onChange={handleOnChange}
//               className="w-full px-3 py-2 border rounded"
//               readOnly
//             />  
//           </div> */}
//           <div>
//             <label htmlFor="image">Image</label>
//             <input
//               className="w-full p-2 border border-gray-300 rounded"
//               type="file"
//               id="image"
//               name="image"
//               accept="image/*"
//               onChange={handleImageChange}
//             />
//           </div>

//           <div>
//             <label htmlFor="section">Father's Name</label>
//             <input
//               className="w-full p-2 border border-gray-300 rounded"
//               type="text"
//               id="fullName"
//               name="fullName"
//               value={parentData.fullName}
//               onChange={parentHandleOnChange}
//               placeholder="fatherName"
//             />
//           </div>
//           <div>
//             <label htmlFor="section">Mother's Name</label>
//             <input
//               className="w-full p-2 border border-gray-300 rounded"
//               type="text"
//               id="motherName"
//               name="motherName"
//               value={parentData.motherName}
//               onChange={parentHandleOnChange}
//               placeholder="motherName"
//             />
//           </div>
//           <div>
//             <label htmlFor="section"> Parent's Qualification</label>
//             <input
//               className="w-full p-2 border border-gray-300 rounded"
//               type="text"
//               id="qualification"
//               name="qualification"
//               value={parentData.qualification}
//               onChange={parentHandleOnChange}
//               placeholder="qualification"
//             />
//           </div>
//           <div>
//             <label htmlFor="section"> Parent's Income</label>
//             <input
//               className="w-full p-2 border border-gray-300 rounded"
//               type="number"
//               id="income"
//               name="income"
//               value={parentData.income}
//               onChange={parentHandleOnChange}
//               placeholder="income"
//             />
//           </div>
//           <div>
//             <label htmlFor="section"> Parent's Contact</label>
//             <input
//               className="w-full p-2 border border-gray-300 rounded"
//               type="number"
//               id="contact"
//               name="contact"
//               value={parentData.contact}
//               onChange={parentHandleOnChange}
//               placeholder="contact"
//             />
//           </div>

//           <TextField
//             label="Class"
//             name="classTeacher"
//             select
//             value={selectedClass}
//             onChange={handleClassChange}
//             required
//             style={{ width: "70%", paddingBottom: "20px" }}
//           >
//             <MenuItem value="" disabled>
//               Select a Class
//             </MenuItem>
//             {getClass.map((cls, index) => (
//               <MenuItem key={index} value={cls.className}>
//                 {cls.className}
//               </MenuItem>
//             ))}
//           </TextField>

//           <TextField
//             label="Section"
//             name="section"
//             select
//             value={section}
//             // value={studentData.section}
//             onChange={(e) => setStudentData({ ...studentData, section: e.target.value })}
//             required
//             style={{ width: "70%", paddingBottom: "20px" }}
//           >
//             <MenuItem value="" disabled>
//               Select a Section
//             </MenuItem>
//             {availableSections.map((sec, index) => (
//               <MenuItem key={index} value={studentData.section}>
//               {/* <MenuItem key={index} value={section}> */}
//                 {sec}
//               </MenuItem>
//             ))}
//           </TextField>
//           {/* <div>
//             <label htmlFor="section"> Parent's Image</label>
//             <input
//               type="file"
//               name="image"
//               accept="image/*"
//               onChange={handleImageChange}
//               value={parentData.image}
//               className="w-full px-3 py-2 border rounded"
              
//             />
//           </div> */}
//         </div>
//         <div className="flex justify-between mt-6">
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
//           >
//             {loading ? "Updating..." : "Update"}
//           </button>
//           <Link
//             to="/admin/allstudent"
//             className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-300 ml-4"
//           >
//             Cancel
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditStudent;


