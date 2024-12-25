import React, { useState, useEffect } from "react";
// import InputForm from "../../..//Dynamic/Form/InputForm";
import { toast } from "react-toastify";
import Loading from "../../../Loading"
import SomthingwentWrong from "../../../SomthingwentWrong"
import useCustomQuery from "../../../useCustomQuery";
// import DataTable from "../../Dynamic/DataTable/DynamicDataTable";
import axios from "axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import DynamicDataTable from "./DataTable";
import Cookies from 'js-cookie';
import NoDataFound from "../../../NoDataFound";
import Heading from "../../../Dynamic/Heading";
const authToken = Cookies.get('token');



function CreateParents() {
  const { currentColor } = useStateContext();
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
  const [submittedData, setSubmittedData] = useState([]);
  const {queryData:allParent,loading:parentLoading,error:parentError} =useCustomQuery("https://eserver-i5sm.onrender.com/api/v1/adminRoute/getAllParentsWithChildren")
  // const {queryData:allParent,loading:parentLoading,error:parentError} =useCustomQuery("https://eserver-i5sm.onrender.com/api/v1/adminRoute/getAllParents")

  useEffect(()=>{
if(allParent){
  setSubmittedData(allParent.data.map((p)=>p.parent));
  
}
  },[allParent])
  
  const handleDelete = (email) => {
    axios.put(`https://eserver-i5sm.onrender.com/api/v1/adminRoute/deactivateParent`, {email}, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        console.log("Parent data deleted successfully");
  
        // Update the state to remove the deleted data from the data table
        const updatedData = submittedData.filter((item) => item.email !== email);
        setSubmittedData(updatedData);
        toast.success("Parent data deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting Parent data:", error);
        toast.error("An error occurred while deleting the Parent data.");
      });
  };
  

  if(parentLoading){
    return <Loading/>
  }

  // if(parentError){
  //   return <SomthingwentWrong/>
  // }
  return (
    <div className="md:h-screen mt-12 md:mt-1  mx-auto p-3 ">
    {/* <h1 
    className="text-4xl font-bold mb-4 uppercase text-center  hover-text "
    style={{color:currentColor}}
    > Parent Details</h1> */}
     <Heading Name="Parent Details" />
      {/* {submittedData.length === 0 ? (
        <div className="alert alert-warning uppercase text-center text-cyan-700">Parents are empty</div>
      ) : (
        <DynamicDataTable data={submittedData} handleDelete={handleDelete} />
      )} */}
      {
        submittedData.length>0 ?( <DynamicDataTable data={submittedData} handleDelete={handleDelete} />) : <NoDataFound/>
      }
     
    </div>
  );
  
}

export default CreateParents;




// import React, { useState, useEffect } from "react";
// // import InputForm from "../../..//Dynamic/Form/InputForm";
// import { toast } from "react-toastify";
// import Loading from "../../../Loading"
// import SomthingwentWrong from "../../../SomthingwentWrong"
// import useCustomQuery from "../../../useCustomQuery";
// // import DataTable from "../../Dynamic/DataTable/DynamicDataTable";
// import axios from "axios";
// import { useStateContext } from "../../../contexts/ContextProvider";
// import DynamicDataTable from "./DataTable";
// import Cookies from 'js-cookie';
// const authToken = Cookies.get('token');



// function CreateParents() {
//   const { currentColor } = useStateContext();
//   const modalStyle = {
//     content: {
//       width: "80%",
//       top: "50%",
//       left: "50%",
//       right: "auto",
//       bottom: "auto",
//       marginRight: "-50%",
//       transform: "translate(-50%, -50%)",
//       zIndex: 1000,
//       background:currentColor
//     },
//   };
//   const [submittedData, setSubmittedData] = useState([]);
//   const {queryData:allParent,loading:parentLoading,error:parentError} =useCustomQuery("https://eserver-i5sm.onrender.com/api/v1/adminRoute/getAllParents")

//   useEffect(()=>{
// if(allParent){
//   setSubmittedData(allParent.allParent);
// }
//   },[allParent])
  
//   const handleDelete = (email) => {
//     axios.put(`https://eserver-i5sm.onrender.com/api/v1/adminRoute/deactivateParent`, {email}, {
//       withCredentials: true,
//       headers: {
//         Authorization: `Bearer ${authToken}`,
//       },
//     })
//       .then((response) => {
//         console.log("Parent data deleted successfully");
  
//         // Update the state to remove the deleted data from the data table
//         const updatedData = submittedData.filter((item) => item.email !== email);
//         setSubmittedData(updatedData);
//         toast.success("Parent data deleted successfully");
//       })
//       .catch((error) => {
//         console.error("Error deleting Parent data:", error);
//         toast.error("An error occurred while deleting the Parent data.");
//       });
//   };
  

//   if(parentLoading){
//     return <Loading/>
//   }

//   if(parentError){
//     return <SomthingwentWrong/>
//   }
//   return (
//     <div className=" mt-12 md:mt-1  mx-auto p-3 ">
//     <h1 
//     className="text-4xl font-bold mb-4 uppercase text-center  hover-text "
//     style={{color:currentColor}}
//     > Parent Details</h1>
//       {submittedData.length === 0 ? (
//         <div className="alert alert-warning uppercase text-center text-cyan-700">Parents are empty</div>
//       ) : (
//         <DynamicDataTable data={submittedData} handleDelete={handleDelete} />
//       )}
//     </div>
//   );
  
// }

// export default CreateParents;