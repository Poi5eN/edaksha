import React, { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa";
import Modal from '../Dynamic/Modal';
import axios from 'axios';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStateContext } from "../contexts/ContextProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from 'js-cookie';
import { Button } from '@mui/material';
import Heading2 from '../Dynamic/Heading2';
const authToken = Cookies.get('token');


const Curriculum = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const [loading, setLoading] = useState(false);
  const classdata = JSON.parse(sessionStorage.getItem("response"));
  const { currentColor} = useStateContext();
  const [formData, setFormData] = useState({
    academicYear: '2023-2024',
    className: '',
    course: '',
    image: null,
  });

  const[curriculumData, setCurriculumData] = useState([]);
  const [shouldFetchData, setShouldFetchData] = useState(false)
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
        setModalOpen(false);
        setFormData({ academicYear: '2023-2024',  className: '', course: '', image: null });
        setShouldFetchData(!shouldFetchData);
        setLoading(false)
        toast.success(`Created Successufully!`)
      })
      .catch((error) => {
    
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
    <>
    <Heading2 title={"Curriculum"}>
    <button onClick={handleOpenModal}
       className="py-1 p-3 rounded-tl-lg rounded-tr-lg  flex items-center space-x-1 text-white"
       style={{ background: currentColor }}
       >  <FaPlus /><span>Create </span>
       </button>
    </Heading2>
    <Modal isOpen={modalOpen} setIsOpen={setModalOpen} title={"Create Curriculum"}>
    <form onSubmit={handleFormSubmit}>
          <div className="grid md:grid-cols-1 grid-cols-1 gap-2 p-5">
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
          
        
        </form>
    </Modal>
    <div className="overflow-x-auto px-5">
          <table className="w-full border-collapse border border-gray-500">
            <thead>
              <tr className=" text-white" style={{ background: currentColor }}>
                <th className="w-1/4 p-2 border border-gray-500 whitespace-nowrap">
                  Academic Year
                </th>
                <th className="w-1/4 p-2 border border-gray-500">Class</th>
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
    </>
  );

};

export default Curriculum;
