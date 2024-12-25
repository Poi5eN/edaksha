import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import Cookies from "js-cookie";
import { CiEdit } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import { Button } from "@mui/material";
import { GrFormView } from "react-icons/gr";
import Marquee from "../Marque/Marquee";
// Ensure that the modal is accessible to screen readers
Modal.setAppElement("#root");

const API_BASE_URL =
  "https://eserver-i5sm.onrender.com/api/v1/adminRoute/createNotice";
const API_EDIT =
  "https://eserver-i5sm.onrender.com/api/v1/adminRoute/updateNotice/";
const API_DELETE =
  "https://eserver-i5sm.onrender.com/api/v1/adminRoute/deleteNotice/";
const API_GET_DATA =
  "https://eserver-i5sm.onrender.com/api/v1/adminRoute/getAllNotice";

const TeacherNotice = () => {
  const authToken = Cookies.get("token");
  const { currentColor } = useStateContext();
  const [notice, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [editingNotice, setEditingNotice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldFetchData, setShouldFetchData] = useState(false);

  const handleEditNotice = (index) => {
    setEditingNotice(index);
    setIsModalOpen(true);

    // Populate newNotice with the data of the notice you are editing
    setNewNotice({
      title: notice[index].title,
      content: notice[index].content,
      image: notice[index].image, // Include the existing image
    });
  };

  const handleNoticeSubmit = () => {
    const formData = new FormData();
    formData.append("title", newNotice.title);
    formData.append("content", newNotice.content);

    if (newNotice.image) {
      formData.append("image", newNotice.image);
    } else if (editingNotice !== null && notice[editingNotice].image) {
      // Use the existing image URL when editing if no new image is provided
      formData.append("image", notice[editingNotice].image);
    }

    if (editingNotice !== null) {
      // Handle saving changes for an existing notice
      axios
        .put(API_EDIT + notice[editingNotice]._id, formData, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // Handle success and make any necessary updates
          setShouldFetchData(true);
        })
        .catch((error) => {
          console.error("Error updating notice:", error);
        });
    } else {
      // Handle adding a new notice
      axios
        .post(API_BASE_URL, formData, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // Handle success and make any necessary updates
          setShouldFetchData(true);
        })
        .catch((error) => {
          console.error("Error creating notice:", error);
        });
    }

    // Reset the state and close the modal
    setNewNotice({ title: "", content: "", image: null });
    setIsModalOpen(false);
  };

  const handleDeleteNotice = (index) => {
    const noticeId = notice[index]._id; // Replace with the actual property name for the notice ID
    axios
      .delete(API_DELETE + noticeId, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(() => {
        const updatedNotices = [...notice];
        updatedNotices.splice(index, 1);
        setNotices(updatedNotices);
      })
      .catch((error) => {
        console.error("Error deleting notice:", error);
      });
  };

  useEffect(() => {
    // GET Request to fetch existing notices
    axios
      .get(API_GET_DATA, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        const { allNotice } = response.data;

        setNotices(allNotice);
      })
      .catch((error) => {
        console.error("Error fetching notices:", error);
      });
  }, [shouldFetchData]);

  return (
    <div className=" rounded-lg  dark:text-white dark:bg-secondary-dark-bg">
      {/* <h1
        className="text-xl font-semibold  text-center"
        style={{ color: currentColor }}
      >
        Recent Activity
      </h1> */}

      {/* Create Notice Button */}
      <div className="mb-1">
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setEditingNotice(null);
          }}
          style={{ backgroundColor: currentColor,fontSize:"8px", padding:"2px"  }}
          variant="contained"
        >
          Create
        </Button>
      </div>

      {/* Modal for Creating/Editing Notice */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
          setEditingNotice(null);
        }}
        className="w-96  dark:text-white bg-gray-100 p-2 rounded-lg shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <h2
          className="text-xl text-center font-semibold  "
          style={{ color: currentColor }}
        >
          {editingNotice !== null ? "Edit Notice" : "Create Notice"}
        </h2>
        <form className="space-y-4 py-2" onSubmit={handleNoticeSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 border border-gray-300 rounded  dark:text-white dark:bg-secondary-dark-bg"
            value={newNotice.title}
            onChange={(e) =>
              setNewNotice({ ...newNotice, title: e.target.value })
            }
          />
          <textarea
            placeholder="Content"
            className="w-full p-2 border border-gray-300 rounded  dark:text-white dark:bg-secondary-dark-bg"
            value={newNotice.content}
            onChange={(e) =>
              setNewNotice({ ...newNotice, content: e.target.value })
            }
          />

          <input
            type="file"
            onChange={(e) =>
              setNewNotice({ ...newNotice, image: e.target.files[0] })
            }
            className="dark:text-white"
          />

          <Button
            variant="conatined"
            type="button"
            onClick={handleNoticeSubmit}
            style={{
              backgroundColor: currentColor,
              color: "white",
              marginRight: "10px",
            }}
          >
            {editingNotice !== null ? "Save Changes" : "Add Notice"}
          </Button>
          <Button
            variant="conatined"
            type="button"
            onClick={() => {
              setIsModalOpen(false);
              setEditingNotice(null);
            }}
            style={{ backgroundColor: "#616161", color: "white" }}
            // className="bg-gray-400 text-white px-5 py-2 ml-2 rounded hover:bg-gray-600"
          >
            Cancel
          </Button>
        </form>
      </Modal>

      <ul>
        <div className="overflow-auto  ">
        <Marquee  time={10} height={"130px"} >
        {notice.length > 0 ? (
            notice?.map((notice, index) => (
              <li
                key={index}
                className="bg-white dark:text-white dark:bg-secondary-dark-bg p-2 rounded-sm border mb-1"
                
              >
                <div className="w-full bg-red-400 relative ">
                  <div className="absolute right-0 flex space-x-3 text-2xl">
                    {notice.file && (
                      <a
                        href={notice.file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" hover:underline"
                      >
                        <GrFormView style={{ color: currentColor }} />
                      </a>
                    )}
                    <CiEdit
                      onClick={() => handleEditNotice(index)}
                      //  style={{ backgroundColor: currentColor }}
                      className="cursor-pointer text-[#2c387e] "
                    />
                    <TiDelete
                      onClick={() => handleDeleteNotice(index)}
                      className="cursor-pointer text-[#ff1744] "
                    />
                  </div>
                </div>
                <p className=" uppercase" style={{ color: currentColor }}>
                  {notice.role}
                </p>
                <h2 className="text-[14px] font-semibold  mb-2">{notice.title}</h2>
                <p className="text-gray-600 text-[12px]">{notice.content}</p>
              </li>
            ))
          ) : (
            <div className="bg-white dark:text-white dark:bg-secondary-dark-bg p-4 rounded-lg shadow-md mb-4">
              <p className="text-[#01579b]">No items created</p>
            </div>
          )}
          </Marquee>
          {/* {notice.length > 0 ? (
            notice?.map((notice, index) => (
              <li
                key={index}
                className="bg-white dark:text-white dark:bg-secondary-dark-bg p-2 rounded-sm border mb-1"
                
              >
                <div className="w-full bg-red-400 relative ">
                  <div className="absolute right-0 flex space-x-3 text-2xl">
                    {notice.file && (
                      <a
                        href={notice.file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" hover:underline"
                      >
                        <GrFormView style={{ color: currentColor }} />
                      </a>
                    )}
                    <CiEdit
                      onClick={() => handleEditNotice(index)}
                      //  style={{ backgroundColor: currentColor }}
                      className="cursor-pointer text-[#2c387e] "
                    />
                    <TiDelete
                      onClick={() => handleDeleteNotice(index)}
                      className="cursor-pointer text-[#ff1744] "
                    />
                  </div>
                </div>
                <p className=" uppercase" style={{ color: currentColor }}>
                  {notice.role}
                </p>
                <h2 className="text-[14px] font-semibold  mb-2">{notice.title}</h2>
                <p className="text-gray-600 text-[12px]">{notice.content}</p>
              </li>
            ))
          ) : (
            <div className="bg-white dark:text-white dark:bg-secondary-dark-bg p-4 rounded-lg shadow-md mb-4">
              <p className="text-[#01579b]">No items created</p>
            </div>
          )} */}
        </div>
      </ul>
    </div>
  );
};

export default TeacherNotice;
