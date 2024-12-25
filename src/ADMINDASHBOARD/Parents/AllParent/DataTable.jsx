import React from "react";
import { DataGrid } from "@mui/x-data-grid";

function DynamicDataTable({data , handleDelete}) {
    const columns = [
      { field: "id", headerName: "S. No." , width:50 },
      { field: "admissionNumber", headerName: "Admission No." ,  minWidth:80,
        renderCell: (params) => (
          <span style={{ fontSize: "14px", color: "#ff6d00", }}>
            {params.value}
          </span>
        ),
      },
     
      { field: "fullName", headerName: "Father Name" ,flex:1, minWidth:80,
        renderCell: (params) => (
          <div style={{ whiteSpace: 'pre-line', color: "#01579b", }}>
            {params.value}
          </div>
        ) 
        },
      { field: "motherName", headerName: "Mother Name" , flex:1, minWidth:80,
        renderCell: (params) => (
          <div style={{ whiteSpace: 'pre-line', color: "#01579b", }}>
            {params.value}
          </div>
        ) 
        },
      { field: "email", headerName: "Email", flex:1, minWidth:200,
        renderCell: (params) => (
          <span style={{ fontSize: "14px", color: "#1a237e" }}>
            {params.value}
          </span>
        ),
       },
      { field: "contact", headerName: "Contact", flex:1, minWidth:80  },
      // { field: "childEmails", headerName: "Child Emails", flex: 2 },
      { 
        field: "childName", 
        headerName: "Children", 
        flex: 1, 
         minWidth:100 ,
        renderCell: (params) => (
          <div style={{ whiteSpace: 'pre-line', color: "#01579b", }}>
            {params.value}
          </div>
        ) 
      },
      { 
        field: "childAdmissionNo", 
        headerName: "Admission No", 
        flex: 1, 
        minWidth:100 ,
        renderCell: (params) => (
          <div style={{ whiteSpace: 'pre-line',color: "#ff6d00", }}>
            {params.value}
          </div>
        ) 
      },
      ];


  // const dataWithIds = Array.isArray(data) ? data.map((item, index) => ({ id: index + 1, ...item})) : [];
  const dataWithIds = Array.isArray(data) ? data.map((item, index) => ({
    id: index + 1,  // Serial number
    admissionNumber:item.admissionNumber,
    email: item.email,
    fullName: item.fullName,
    motherName: item.motherName,
    contact: item.contact,
    childName: item.children.map((child) => child.fullName).join("\n"),  // Joining child emails
    childAdmissionNo: item.children.map((child) => child.admissionNumber).join("\n"),  // Joining child emails
  })) : [];
  return (
  
    // <div className="h-[350px]  mx-auto  bg-white mt-2 rounded-md">
    <div className="h-screen dark:text-white dark:bg-secondary-dark-bg mx-auto bg-white mt-2 rounded-md overflow-auto w-full">
    <div className="h-[75%] dark:text-white dark:bg-secondary-dark-bg mx-auto bg-white mt-2 rounded-md overflow-auto w-full">
    {/* <div style={{ height: 400, width: "100%" }}> */}
      <DataGrid
        rows={dataWithIds}
        columns={columns}
        className="dark:text-white dark:bg-secondary-dark-bg  mx-auto bg-white"
      />
    </div>
    </div>
  );
}

export default DynamicDataTable;