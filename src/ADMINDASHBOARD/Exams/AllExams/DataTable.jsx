import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function DynamicDataTable({data , handleDelete}) {
    const columns = [
      { field: "id", headerName: "S. No." , width:50 },
      { field: "fullName", headerName: "Full Name" , width:150 },
      { field: "employeeId", headerName: "Employee ID", width:100 },
      { field: "email", headerName: "Email",  width:190 },
      { field: "salary", headerName: "Salary",  width:100 },
      { field: "joiningDate", headerName: "Joining Date",  width:106 },
      { field: "contact", headerName: "Contact",  width:100 },
        { field: "actions", headerName: "Actions", width: 150,
          renderCell: (params) => (
            <div>
              <Link to={`/admin/staff/view-profile/${params.row.email}`}>
                <IconButton>
                  <VisibilityIcon  className="text-blue-600"/>
                </IconButton>
              </Link>
              <Link to={`/admin/staff/edit-profile/${params.row.email}`}>
                <IconButton>
                  <EditIcon  className="text-green-600"/>
                </IconButton>
              </Link>
              <IconButton onClick={() => handleDelete(params.row.email)}>
                <DeleteIcon  className="text-red-600" />
              </IconButton>
            </div>
          ),
        },
      ];

  const dataWithIds = Array.isArray(data) ? data.map((item, index) => ({ id: index + 1, ...item})) : [];
  return (
    
    // <div className="h-[350px]  mx-auto  bg-white mt-2 rounded-md">
    <div className="h-[450px] mx-auto bg-white mt-2 rounded-md overflow-scroll w-full">
    <div className=" min-w-[1000px]  w-full">
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


