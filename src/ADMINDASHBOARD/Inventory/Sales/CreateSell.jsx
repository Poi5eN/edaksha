import React, { useState, useEffect } from "react";

import axios from "axios";
import StockTable from "./StockDataTable";
import Cookies from 'js-cookie';
import { useStateContext } from "../../../contexts/ContextProvider";
const authToken = Cookies.get('token');
function CreateSell() { const { currentColor } = useStateContext();
const modalStyle = {
  content: {
    width: "80%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1000,
    background:currentColor
  },
};

  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    quantity: "",
    price: "",


  });
  const [submittedData, setSubmittedData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldFetchData, setShouldFetchData] = useState(false);


  const handleFieldChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const updateDependency = () => {
    setShouldFetchData(!shouldFetchData);
  }


  useEffect(() => {

    axios.get('https://eshikshaserver.onrender.com/api/v1/adminRoute/getAllItems', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${authToken}`,
      }, // Set withCredentials to true
    })
      .then((response) => {
        setSubmittedData(response.data.listOfAllItems);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [shouldFetchData]);

  return (
    <div className=" mt-12 md:mt-1  mx-auto p-3">
    <h1 
    className="text-4xl font-bold mb-4 uppercase text-center  hover-text "
    style={{color:currentColor}}
    >Products Sell</h1>
    
      <StockTable data={submittedData} updateDependency={updateDependency}
      //  handleDelete={handleDelete}
      />
    </div>
  );
}

export default CreateSell;
