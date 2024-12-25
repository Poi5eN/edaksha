import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStateContext } from "../contexts/ContextProvider";
import { Button } from "@mui/material";
const authToken = Cookies.get("token");
const Study = () => {
  const { currentColor } = useStateContext();
  // const [fetchData, setFetchData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    link: "",
    image: null,
  });

  const API_BASE_URL = "https://eserver-i5sm.onrender.com/api/v1/teacher";

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
    }
  };

  const addMaterial = () => {
    setLoading(true)
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      // if (key === "image") continue;
      // formDataToSend.append(key, String(value));
      if (key !== "image") {
        formDataToSend.append(key, String(value));
      }
    });
    formDataToSend.append("image", formData.image);

    axios
      .post(`${API_BASE_URL}/createStudyMaterial`, formDataToSend, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        }, // Set withCredentials to true
      })
      .then((response) => {
        toast.success("Added successfully!");
        const createdMaterial = response.data;
        setMaterials([...materials, createdMaterial]);
        setFormData({ title: "", type: "", link: "", image: null });
        closeModal();
        setShouldFetchData(!shouldFetchData);
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error adding material:", error.response.data.error);
        toast.error(`Error: ${error.response.data.error}`)
        setLoading(false)
      });
  };

  const deleteMaterial = (material, index) => {
    // Send a DELETE request to the server to delete the material
    // console.log("index", material);
    axios
      .delete(`${API_BASE_URL}/deleteStudyMaterial/${material._id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(() => {
        const updatedMaterials = [...materials];
        updatedMaterials.splice(index, 1);
        setMaterials(updatedMaterials);
        toast.success("deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting material:", error);
      });
  };

  useEffect(() => {
    // Fetch materials from the server using a GET request
    axios
      .get(`${API_BASE_URL}/getStudyMaterial`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        const materialsData = response.data.study;
        setMaterials(materialsData);
      })
      .catch((error) => {
        console.error("Error fetching materials:", error);
      });
  }, [shouldFetchData]);

  return (
    <div className="p-4 text-center bg-gray-100 min-h-screen">
      <h1
        className="text-4xl font-bold mb-4 uppercase text-center  hover-text"
        style={{ color: currentColor }}
      >
        Study Materials
      </h1>

      {/* <button
        className="dark:text-white dark:bg-secondary-dark-bg text-gray-800   mx-auto neu-btn border-2 "
        style={{ border: `2px solid ${currentColor} ` }}
        onClick={openModal}
      >
        Add Material
      </button> */}
      <Button
              variant="contained"
              style={{ backgroundColor: currentColor }}
              onClick={openModal}
            >
               Add Material
            </Button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-container">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2
                className="text-xl font-bold mb-4 uppercase text-center  hover-text "
                style={{ color: currentColor }}
              >
                Add New Material
              </h2>
              <input
                type="text"
                placeholder="Title"
                className="w-full border rounded p-2 mb-2"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <div className="mb-2">
                <label htmlFor="materialType">Material Type</label>
                <select
                  id="materialType"
                  className="w-full border rounded p-2"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                >
                  <option>Select Type</option>
                  <option value="video">Video</option>
                  <option value="PDF">PDF</option>
                  <option value="youtube">YouTube</option>
                  <option value="Notes">Notes</option>
                </select>
              </div>
              {(formData.type === "PDF" || formData.type === "Notes") && (
                <input
                  type="file"
                  // accept=".pdf"
                  className="w-full border rounded p-2 mb-4"
                  onChange={handleImageChange}
                />
              )}
              {(formData.type === "Video" || formData.type === "youtube") && (
                <input
                  type="text"
                  placeholder={`Link (e.g., YouTube URL)`}
                  className="w-full border rounded p-2 mb-4"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                />
              )}
              <div className="flex justify-end">
                {/* <button
                  onClick={addMaterial}
                  className="dark:text-white dark:bg-secondary-dark-bg text-gray-800    neu-btn border-2"
                  style={{
                    border: `2px solid ${currentColor} `,
                    color: currentColor,
                  }}
                >
                  Add
                </button> */}
                
                {/* <Button
              variant="contained"
              style={{ backgroundColor: currentColor,marginRight:"4px" }}
              onClick={addMaterial}
            >
               Add 
            </Button> */}
            <Button
             onClick={addMaterial}
            // type="submit"
            variant="contained"
            style={{
              backgroundColor: currentColor,
              color: "white",
              // width: "100%",
              marginRight:"4px"
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
              " Add"
            )}
          </Button>
                <Button
              variant="contained"
              style={{ backgroundColor: "gray" }}
              onClick={closeModal}
            >
               Cancel 
            </Button>
                {/* <button
                  onClick={closeModal}
                  className="dark:text-white dark:bg-secondary-dark-bg text-red-600    neu-btn border-2 ml-2"
                  style={{ border: `2px solid red ` }}
                >
                  Cancel
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}

     
      <div className="mt-8">
        <table className="border-collapse w-full">
          <thead>
            <tr className="  text-white"
            style={{background:currentColor}}
            >
              <th className="border border-blue-500 px-4 py-2">Title</th>
              <th className="border border-blue-500 px-4 py-2">Type</th>
              <th className="border border-blue-500 px-4 py-2">File</th>
              <th className="border border-blue-500 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material, index) => (
              <tr key={index} className="bg-white">
                <td className="border border-blue-500 px-4 py-2">
                  {material.title}
                </td>
                <td className="border border-blue-500 px-4 py-2">
                  {material.type}
                </td>
                <td className="border border-blue-500 px-4 py-2">
                  {material.type === "PDF" || material.type === "Notes" ? (
                    <a
                      href={material.file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline text-lg"
                    >
                      View PDF
                    </a>
                  ) : material.type === "video" ||
                    material.type === "youtube" ? (
                    <a
                      href={material.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline text-lg"
                    >
                      View Video
                    </a>
                  ) : (
                    <p className="text-lg text-blue-500 hover:underline">
                      View Notes
                    </p>
                  )}
                </td>
                <td className="text-center border border-blue-500 px-4 py-2">
                  {/* <button
                    className="dark:text-white dark:bg-secondary-dark-bg text-gray-800   mx-auto neu-btn border-2 "
                    style={{ border: `2px solid red `, color: currentColor }}
                    onClick={() => deleteMaterial(material)}
                  >
                    Delete
                  </button> */}
                  <Button
              variant="contained"
              style={{ backgroundColor: "red" }}
              onClick={() => deleteMaterial(material)}
            >
               Cancel 
            </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Study;
