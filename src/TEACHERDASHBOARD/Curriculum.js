import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStateContext } from "../contexts/ContextProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from 'js-cookie';
import { Button } from '@mui/material';
const authToken = Cookies.get('token');

const Api_GetAll = "https://eserver-i5sm.onrender.com/api/v1/adminRoute/getAllCurriculum";
const Delete_API ="https://eserver-i5sm.onrender.com/api/v1/adminRoute/deleteCurriculum";

const Curriculum = () => {
  const [loading, setLoading] = useState(false);
  const classdata = JSON.parse(sessionStorage.getItem("response"));
  
  const { currentColor} = useStateContext();
  const [selectedGrade, setSelectedGrade] = useState('');
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    academicYear: '2023-2024',
    className: '',
    course: '',
    image: null,
  });

  const[curriculumData, setCurriculumData] = useState([]);
  const [shouldFetchData, setShouldFetchData] = useState(false)

  const handleGradeChange = (e) => {
    const selectedGrade = e.target.value;
    setSelectedGrade(selectedGrade);

    // Set the selected grade's courses in the form data
    const selectedClass = data.find(item => item.className === selectedGrade);
    
    if (selectedClass) {
      setFormData({ ...formData, className: selectedGrade, course: selectedClass.subject.join(',') });
    }
  };

  
  
  const handlePDFUpload = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  
 

  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    const formDataToSend = new FormData();
    formDataToSend.append("academicYear", formData.academicYear);
    formDataToSend.append("className", classdata.classTeacher);
    // formDataToSend.append("className", formData.className);
    formDataToSend.append("course", formData.course);
    formDataToSend.append("image", formData.image);

    axios
      .post("https://eserver-i5sm.onrender.com/api/v1/adminRoute/createCurriculum", formDataToSend, {
        withCredentials: true,
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "multipart/form-data"
      }
      })
      .then((response) => {
       
        setFormData({ academicYear: '2023-2024',  className: '', course: '', image: null });

        setShouldFetchData(!shouldFetchData);
       
        setLoading(false)
        toast.success(`Created Successufully!`)
      })
      .catch((error) => {
        // toast.error('Error creating curriculum:', error)
        setLoading(false);
        toast.error(`Error: ${error.response.data.error}`)
        console.error('Error creating curriculum:', error);
      });
  };
 
  useEffect(() => {
    axios.get("https://eserver-i5sm.onrender.com/api/v1/adminRoute/getAllCurriculum", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      console.log("CurriculumDATA-->", response.data)
      const {allCurriculum} = response.data;
      console.log("GetALLCLASS--->", allCurriculum)
      setCurriculumData(allCurriculum);
    })
    .catch((error) => {
      console.error('Error fetching class data:', error);
    });
  }, [shouldFetchData]);
 
 
 
  // useEffect(() => {
  //   axios.get("https://eserver-i5sm.onrender.com/api/v1/adminRoute/getAllClass", {
  //     withCredentials: true,
  //     headers: {
  //       Authorization: `Bearer ${authToken}`,
  //     },
  //   })
  //   .then((response) => {
  //     const { classList } = response.data;
  //     console.log(classList)
  //     setData(classList);
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching class data:', error);
  //   });
  // }, []);

  const handleDeleteCurriculum = (index) => {
    const curriculumId = curriculumData[index]._id; 
    axios
      .delete("https://eserver-i5sm.onrender.com/api/v1/adminRoute/deleteCurriculum/" + curriculumId, {
        withCredentials: true,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      })
      .then(() => {
        const updatedCurriculum = [...curriculumData];
        updatedCurriculum.splice(index, 1);
        setCurriculumData(updatedCurriculum);
        toast.success(`Deleted successufully!`)
      })
      .catch((error) => {
        console.error('Error deleting curriculumData:', error);
      });
  };
  


  return (
    <div className=" p-4 flex flex-col  justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full  text-center">
        <h1
          className="text-4xl font-bold mb-4 uppercase text-center  hover-text"
          style={{ color: currentColor }}
        >
          School Curriculum
        </h1>
        <form onSubmit={handleFormSubmit}>
          <div className="grid md:grid-cols-2 grid-cols-2 gap-2">
            <div className="mb-4">
              <label className="text-xl font-semibold mb-2">
                Academic Year:
              </label>
              <select
                className="text-gray-600 bg-gray-100 p-2 rounded-md w-full"
                value={formData.academicYear}
                onChange={(e) =>
                  setFormData({ ...formData, academicYear: e.target.value })
                }
              >
                <option value="2023-2024">2023-2024</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>
            {/* <div className="mb-4">
              <label className="text-xl font-semibold mb-2">Class:</label>
              <select
                className="text-gray-600 bg-gray-100 p-2 rounded-md w-full"
                value={selectedGrade}
                onChange={handleGradeChange}
              >
                <option value="">Select class</option>
                {data
                .slice()
                .sort((a, b) => parseInt(a.className, 10) - parseInt(b.className, 10))
                .map((item) => (
                  <option key={item.className} value={item.className}>
                    {item.className}
                  </option>
                ))}
               
              </select>
           
            </div> */}
            {/* <div className="mb-4">
              <label className="text-xl font-semibold mb-2">Courses:</label>
              <ul className="text-gray-600"> <li>{formData.course}</li></ul>
            </div> */}
            <div className="mb-4">
              <label className="text-xl font-semibold mb-2">Upload PDF:</label>
              <input
                type="file"
                accept=".pdf"
                onChange={handlePDFUpload}
                className="text-gray-600 bg-gray-100 p-2 rounded-md w-full"
              />
            </div>
          </div>
          <Button
            type="submit"
            variant="contained"
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
          {/* <Button
           variant="contained"
           type="submit"
           style={{ backgroundColor: currentColor, marginRight: "20px" }}
           
         >
           Submit
         </Button> */}
          {/* <button  
           className="dark:text-white dark:bg-secondary-dark-bg text-gray-800   mx-auto neu-btn border-2 "
           style={{border:`2px solid ${currentColor} `,color:currentColor}}
          type="submit">Submit</button> */}
        </form>

        {/* <div className="mt-4">
        <h2 className="text-lg font-semibold text-indigo-600">Created Curriculum</h2>
        <ul>
          {curriculumData.map((item, index) => (
            <li key={index} className="mt-2">
              <div className="bg-white pt-2 pb-2 pl-0 pr-0 rounded-md shadow-md">
              <p className="text-gray-600">AcademicYear: {item.academicYear}</p>
                 <p className="text-gray-600">Class: {item.className}</p>
                 <p className="text-gray-600">Course: {item.course}</p>
              {item.file && (
                  <div className="mb-4">
                    <label className="text-lg  mb-2">View PDF:</label>
                    <a  href={item.file.url} target="_blank" rel="noopener noreferrer"  className="text-blue-500 hover:underline">
                    View Image
                    </a>
                  </div>
                )}
              </div>
              <button
                onClick={() => handleDeleteCurriculum(index)}
                className="bg-red-500 text-white px-3 py-2 mt-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div> */}
      </div>

      <div className="mt-4 w-full">
        <h2 className="text-2xl font-semibold text-cyan-700 uppercase text-center">
          Created Curriculum
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-500">
            <thead>
              <tr className=" text-white" style={{ background: currentColor }}>
                <th className="w-1/4 p-2 border border-gray-500 whitespace-nowrap">
                  Academic Year
                </th>
                <th className="w-1/4 p-2 border border-gray-500">Class</th>
                {/* <th className="w-[100px] border">Course</th> */}
                <th className="w-1/4 p-2 border border-gray-500">Files</th>
                <th className="w-1/4 p-2 border border-gray-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {curriculumData.map((item, index) => (
                <tr key={index} className="border border-gray-500 text-center">
                  <td className="p-2 border border-gray-500 whitespace-nowrap">
                    {item.academicYear}
                  </td>
                  <td className="p-2 border border-gray-500">
                    {item.className}
                  </td>
                  {/* <td className="w-[100px] text-center  border">
            {item.course}
          </td> */}
                  <td className="p-2 border border-gray-500">
                    {item.file && (
                      <a
                        href={item.file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View
                      </a>
                    )}
                  </td>
                  <td className="p-2 border border-gray-500">
                    <IconButton
                      onClick={() => handleDeleteCurriculum(index)}
                      className=" border px-3 py-2 mt-2 w-full "
                    >
                      <DeleteIcon className="text-red-600" />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* <tbody>
          <table>
            <tr>
              <tr  className=" bg-cyan-600 border-2 border-gray-500 ">
                <th className="w-[100px] border">AcademicYear</th>
                <th className="w-[100px] border">Class</th>
               
                <th className="w-[100px] border">Files</th>
                <th className="w-[100px] border">Action</th>
              </tr>

              {curriculumData.map((item, index) => (
                
                 
                    <tr key={index} className="  border-2 border-gray-500 ">
                      <td className="w-[100px] text-center border">
                        {item.academicYear}
                      </td>
                      <td className="w-[100px] text-center border">
                        {item.className}
                      </td>
                    
                      <td className="w-[100px] text-center border">
                        {item.file && (
                         
                           
                            <a
                              href={item.file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              View
                            </a>
                         
                        )}
                      </td>
                      <td>
                        <IconButton
                          onClick={() => handleDeleteCurriculum(index)}
                          className="bg-red-500 border  px-3 py-2 mt-2 w-[100px] hover:bg-red-600"
                        >
                          <DeleteIcon className="text-red-600" />
                        </IconButton>
                      </td>
                    </tr>
                 
                
              ))}
              
            </tr>
          </table>
        </tbody> */}
      </div>
    </div>
  );


};

export default Curriculum;
