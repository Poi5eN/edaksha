import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./../../../Dynamic/Form/FormStyle.css";
import { useStateContext } from "../../../contexts/ContextProvider";
import InputForm from "./../../../Dynamic/Form/InputForm";
import Additional_Fees_DataTable from "./DataTable";
import Cookies from "js-cookie";
import { Button } from "@mui/material";
import Loading from "../../../Loading";
import SomthingwentWrong from "../../../SomthingwentWrong";
import useCustomQuery from "../../../useCustomQuery";
import NoDataFound from "../../../NoDataFound";
const authToken = Cookies.get("token");

function CreateAdditionalFee() {
  const { currentColor } = useStateContext();
  const {
    queryData: additionalFee,
    loading: additionalFeeLoading,
    error: additionalFeeError,
  } = useCustomQuery(
    "https://eserver-i5sm.onrender.com/api/v1/adminRoute/getAdditionalFees"
  );

  const toastifyTiming = {
    autoClose: 1000,
  };
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    className: "",
    name: "",
    feeType: "",
    amount: "",
  });
  const [submittedData, setSubmittedData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [getClass, setGetClass] = useState([]);
  const [registrationData, setRegistrationData] = useState();
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (additionalFee) {
      setSubmittedData(additionalFee);
    }
  }, [additionalFee]);
  // useEffect(() => {
  //   axios
  //     .get("https://eserver-i5sm.onrender.com/api/v1/adminRoute/getAdditionalFees", {
  //       withCredentials: true,
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //     })
  //     .then((response) => {
  //       setSubmittedData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, [shouldFetchData]);
  useEffect(() => {
    axios
      .get(
        `https://eserver-i5sm.onrender.com/api/v1/adminRoute/getAllClasses`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        let classes=response.data.classList.map((cls)=>cls.className)
      
        setGetClass(classes.sort((a,b)=>a-b));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleFieldChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "image") {
        formDataToSend.append(key, String(value));
      }
    });
  

    try {
      setLoading(true);
      await axios.post(
        "https://eserver-i5sm.onrender.com/api/v1/adminRoute/createAdditionalFees",
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setFormData({
        className: "",
        name: "",
        feeType: "",
        amount: "",
      });
      setSubmittedData([...submittedData, formData]);
      setLoading(false);
      toast.success("Form submitted successfully!", toastifyTiming);
      setShouldFetchData(!shouldFetchData);
      closeModal();
      setIsOpen(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);

      if (error.response && error.response.status === 400) {
        toast.error("Fees already exist.", toastifyTiming);
        return;
      }
      toast.error(
        "An error occurred while submitting the form.",
        toastifyTiming
      );
    }
  };

  const handleDelete = (itemId) => {
    axios
      .delete(
        `https://eserver-i5sm.onrender.com/api/v1/adminRoute/deleteFees/${itemId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
       
        const updatedData = submittedData.filter((item) => item._id !== itemId);
        setSubmittedData(updatedData);

        toast.success("Fees deleted successfully", toastifyTiming);
      })
      .catch((error) => {
        console.error("Error deleting Fees:", error);
        toast.error(
          "An error occurred while deleting the Fees.",
          toastifyTiming
        );
      });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      className: "",
      name: "",
      feeType: "",
      amount: "",
    });
  };

  const formFields = [
    {
      label: "Class",
      name: "className",
      type: "select",
      value: formData.className,
      required: true,

      selectOptions: [
        "Class",
        ...getClass 
      ],
    },
    {
      label: "Name",
      name: "name",
      type: "text",
      value: formData.name,
      required: true,
    },
    {
      label: "Fee Type",
      name: "feeType",
      type: "select",
      value: formData.feeType,
      required: true,
      selectOptions: [
        "Fee Type",
        "Exam Fee",
        "One Time",
        "Monthly",
        "Quarterly",
        "Half Yearly",
        "Annually",
      ],
    },
    {
      label: "Amount",
      name: "amount",
      type: "number",
      value: formData.amount,
      required: true,
    },
  ];

  if (additionalFeeLoading) {
    return <Loading />;
  }

  if (additionalFeeError) {
    return <SomthingwentWrong />;
  }
  return (
    <div className="md:h-screen mt-12 md:mt-1  mx-auto p-3 ">
      <h1
        className="text-4xl font-bold mb-4 uppercase text-center dark:text-white  hover-text "
        style={{ color: currentColor }}
      >
        {" "}
        Additional Fee
      </h1>
      <div className=" mb-4">
        <Button
          variant="contained"
          style={{ backgroundColor: currentColor }}
          onClick={toggleModal}
        >
          Create Fee
        </Button>
      </div>

      {isOpen && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-[99999999] flex justify-center items-center w-full h-screen bg-gray-900 bg-opacity-50"
        >
          <div className="relative p-4 w-full  max-h-full" data-aos="fade-down">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 overflow-auto ">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Additional Create Fee
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
              <div className=" md:h-auto overflow-auto  ">
                <div className="p-4 md:p-5 space-y-4  ">
                  <InputForm
                    fields={formFields}
                    handleChange={handleFieldChange}
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

     {
      submittedData.length > 0
      ?( <Additional_Fees_DataTable
        data={submittedData}
        handleDelete={handleDelete}
      />):<NoDataFound/>
     }
    </div>
  );
}

export default CreateAdditionalFee;
