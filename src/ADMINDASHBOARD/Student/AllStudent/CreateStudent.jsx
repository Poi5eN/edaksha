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

  const { queryData: studentData, error: studentError, loading: studentLoading } = useCustomQuery("https://eserver-i5sm.onrender.com/api/v1/adminRoute/getAllStudents");
  
  useEffect(()=>{
    if(studentData){
      setSubmittedData(studentData.allStudent);
    }
  },[studentData])
  
  const handleDelete = (email) => {
    axios
      .put(
        `https://eserver-i5sm.onrender.com/api/v1/adminRoute/deactivateStudent`,
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

 
  if ( studentError) {
    return <SomthingwentWrong/>
  }
  if ( studentLoading) {
    return <Loading/>
  }
  return (
    <div className="md:h-screen mt-12 md:mt-1  mx-auto p-1 overflow-hidden">
     
     <Heading Name="Students"/>
      <div className="">
      </div>  
     {
        submittedData.length>0 ? ( <DynamicDataTable data={submittedData} handleDelete={handleDelete} />) :(<NoDataFound/>)
      }
    </div>
  );
}

export default CreateStudent;
