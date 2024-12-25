import React, { useState } from "react";
import Tables from "../../Dynamic/Tables";

const Udise = () => {
  const [bodyData, setBodyData] = useState([
    { fullName: "Aman Kumar", class: "10", bpl: "Yes", aadhar: "1234-5678-9101", scrollership: "Scholarship A", pan: "ABCDE1234F", category: "General", motherTougue: "Hindi", minority: "No", sld_type: "None", resultPreExam: "Pass" },
    { fullName: "Suman Gupta", class: "9", bpl: "No", aadhar: "2345-6789-0123", scrollership: "Scholarship B", pan: "FGHIJ5678K", category: "OBC", motherTougue: "Bengali", minority: "No", sld_type: "None", resultPreExam: "Pass" },
    { fullName: "Ravi Singh", class: "8", bpl: "Yes", aadhar: "3456-7890-1234", scrollership: "Scholarship C", pan: "KLMNO1234P", category: "SC", motherTougue: "Hindi", minority: "No", sld_type: "None", resultPreExam: "Fail" },
    { fullName: "Pooja Sharma", class: "7", bpl: "No", aadhar: "4567-8901-2345", scrollership: "Scholarship D", pan: "PQRST6789U", category: "ST", motherTougue: "Punjabi", minority: "Yes", sld_type: "None", resultPreExam: "Pass" },
    { fullName: "Rahul Verma", class: "6", bpl: "Yes", aadhar: "5678-9012-3456", scrollership: "Scholarship E", pan: "UVWXY1234Z", category: "General", motherTougue: "Gujarati", minority: "No", sld_type: "None", resultPreExam: "Pass" },
    { fullName: "Anjali Yadav", class: "5", bpl: "No", aadhar: "6789-0123-4567", scrollership: "Scholarship F", pan: "ABCXY6789Z", category: "OBC", motherTougue: "Kannada", minority: "No", sld_type: "None", resultPreExam: "Pass" },
    { fullName: "Vikas Choudhary", class: "4", bpl: "Yes", aadhar: "7890-1234-5678", scrollership: "Scholarship G", pan: "PQRMN6789A", category: "General", motherTougue: "Hindi", minority: "No", sld_type: "None", resultPreExam: "Fail" },
    { fullName: "Sneha Mehta", class: "3", bpl: "No", aadhar: "8901-2345-6789", scrollership: "Scholarship H", pan: "LMNOP5678F", category: "General", motherTougue: "English", minority: "No", sld_type: "None", resultPreExam: "Pass" },
    { fullName: "Karan Kapoor", class: "2", bpl: "Yes", aadhar: "9012-3456-7890", scrollership: "Scholarship I", pan: "ZXYUV6789G", category: "SC", motherTougue: "Marathi", minority: "No", sld_type: "None", resultPreExam: "Pass" },
    { fullName: "Priya Desai", class: "1", bpl: "No", aadhar: "0123-4567-8901", scrollership: "Scholarship J", pan: "TUVWQ6789H", category: "ST", motherTougue: "Telugu", minority: "Yes", sld_type: "None", resultPreExam: "Pass" },

  ]);

  const THEAD = [
    "Select",
    "S.No.",
    "Student Name",
    "Class",
    "BPL",
    "Aadhar",
    "Scrollership",
    "PAN",
    "Category",
    "Mother Tongue",
    "Minority",
    "Sld_type",
    "Result preExam",
  ];

  const [selectedColumn, setSelectedColumn] = useState("BPL"); // Default column
  const [selectedValue, setSelectedValue] = useState("Yes"); // Default value
  const [selectedRows, setSelectedRows] = useState([]); // Store selected rows
  const [selectAll, setSelectAll] = useState(false); // Manage "All" selection

  // Function to handle checkbox selection
  const handleRowSelection = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  // Handle "Select All" checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]); // Deselect all
    } else {
      setSelectedRows(bodyData.map((_, index) => index)); // Select all rows
    }
    setSelectAll(!selectAll);
  };

  // Function to update selected rows based on selector
  const updateSelectedRows = () => {
    setBodyData((prevData) =>
      prevData.map((row, index) =>
        selectedRows.includes(index)
          ? { ...row, [selectedColumn.toLowerCase()]: selectedValue }
          : row
      )
    );
    setSelectedRows([]); // Reset selection after update
    setSelectAll(false); // Reset "Select All"
  };

  return (
    <div>
      {/* Selectors */}
      <div className="flex gap-4 mb-4">
        {/* Column Selector */}
        <select
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          {["BPL", "Class", "Category"].map((column) => (
            <option key={column} value={column}>
              {column}
            </option>
          ))}
        </select>

        {/* Value Selector */}
        <select
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          
          {selectedColumn === "BPL" && (
            <>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </>
          )}
          {selectedColumn === "Class" &&
            Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          {selectedColumn === "Category" && (
            <>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
            </>
          )}
        </select>

        {/* Update Button */}
        <button
          onClick={updateSelectedRows}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </div>

      {/* Table */}
      <Tables
        thead={[
          {
            name: (
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            ),
          },
          ...THEAD.slice(1),
        ]}
        tbody={bodyData.map((val, ind) => ({
          select: (
            <input
              type="checkbox"
              checked={selectedRows.includes(ind)}
              onChange={() => handleRowSelection(ind)}
            />
          ),
          Sno: ind + 1,
          "Student Name": val.fullName,
          Class: val.class,
          BPL: val.bpl,
          Aadhar: val.aadhar,
          Scrollership: val.scrollership,
          PAN: val.pan,
          Category: val.category,
          "Mother Tongue": val.motherTougue,
          Minority: val.minority,
          Sld_type: val.sld_type,
          "Result preExam": val.resultPreExam,
        }))}
      />
    </div>
  );
};

export default Udise;



// import React, { useState } from "react";
// import Tables from "../../Dynamic/Tables";

// const Udise = () => {
//   const [bodyData, setBodyData] = useState([
//     { fullName: "Aman Kumar", class: "10", bpl: "Yes", aadhar: "1234-5678-9101", scrollership: "Scholarship A", pan: "ABCDE1234F", category: "General", motherTougue: "Hindi", minority: "No", sld_type: "None", resultPreExam: "Pass" },
//     { fullName: "Suman Gupta", class: "9", bpl: "No", aadhar: "2345-6789-0123", scrollership: "Scholarship B", pan: "FGHIJ5678K", category: "OBC", motherTougue: "Bengali", minority: "No", sld_type: "None", resultPreExam: "Pass" },
//     // Add more data as required...
//   ]);

//   const THEAD = [
//     "Select",
//     "S.No.",
//     "Student Name",
//     "Class",
//     "BPL",
//     "Aadhar",
//     "Scrollership",
//     "PAN",
//     "Category",
//     "Mother Tongue",
//     "Minority",
//     "Sld_type",
//     "Result preExam",
//   ];

//   const [selectedColumn, setSelectedColumn] = useState("BPL"); // Default column
//   const [selectedValue, setSelectedValue] = useState("Yes"); // Default value
//   const [selectedRows, setSelectedRows] = useState([]); // Store selected rows
//   const [selectAll, setSelectAll] = useState(false); // Manage "All" selection

//   // Function to handle checkbox selection
//   const handleRowSelection = (index) => {
//     if (selectedRows.includes(index)) {
//       setSelectedRows(selectedRows.filter((i) => i !== index));
//     } else {
//       setSelectedRows([...selectedRows, index]);
//     }
//   };

//   // Handle "Select All" checkbox
//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedRows([]); // Deselect all
//     } else {
//       setSelectedRows(bodyData.map((_, index) => index)); // Select all rows
//     }
//     setSelectAll(!selectAll);
//   };

//   // Function to update selected rows based on selector
//   const updateSelectedRows = () => {
//     setBodyData((prevData) =>
//       prevData.map((row, index) =>
//         selectedRows.includes(index)
//           ? { ...row, [selectedColumn.toLowerCase()]: selectedValue }
//           : row
//       )
//     );
//     setSelectedRows([]); // Reset selection after update
//     setSelectAll(false); // Reset "Select All"
//   };

//   return (
//     <div>
//       {/* Selectors */}
//       <div className="flex gap-4 mb-4">
//         {/* Column Selector */}
//         <select
//           value={selectedColumn}
//           onChange={(e) => setSelectedColumn(e.target.value)}
//           className="border border-gray-300 rounded px-2 py-1"
//         >
//           {["BPL", "Class", "Category"].map((column) => (
//             <option key={column} value={column}>
//               {column}
//             </option>
//           ))}
//         </select>

//         {/* Value Selector */}
//         <select
//           value={selectedValue}
//           onChange={(e) => setSelectedValue(e.target.value)}
//           className="border border-gray-300 rounded px-2 py-1"
//         >
//           
//           {selectedColumn === "BPL" && (
//             <>
//               <option value="Yes">Yes</option>
//               <option value="No">No</option>
//             </>
//           )}
//           {selectedColumn === "Class" &&
//             Array.from({ length: 10 }, (_, i) => (
//               <option key={i + 1} value={i + 1}>
//                 {i + 1}
//               </option>
//             ))}
//           {selectedColumn === "Category" && (
//             <>
//               <option value="General">General</option>
//               <option value="OBC">OBC</option>
//               <option value="SC">SC</option>
//               <option value="ST">ST</option>
//             </>
//           )}
//         </select>

//         {/* Update Button */}
//         <button
//           onClick={updateSelectedRows}
//           className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
//         >
//           Update
//         </button>
//       </div>

//       {/* Table */}
//       <Tables
//         thead={THEAD}
//         tbody={[
//           {
//             select: (
//               <input
//                 type="checkbox"
//                 checked={selectAll}
//                 onChange={handleSelectAll}
//               />
//             ),
//             Sno: "All",
//             "Student Name": "All Rows",
//             Class: "",
//             BPL: "",
//             Aadhar: "",
//             Scrollership: "",
//             PAN: "",
//             Category: "",
//             "Mother Tongue": "",
//             Minority: "",
//             Sld_type: "",
//             "Result preExam": "",
//           },
//           ...bodyData.map((val, ind) => ({
//             select: (
//               <input
//                 type="checkbox"
//                 checked={selectedRows.includes(ind)}
//                 onChange={() => handleRowSelection(ind)}
//               />
//             ),
//             Sno: ind + 1,
//             "Student Name": val.fullName,
//             Class: val.class,
//             BPL: val.bpl,
//             Aadhar: val.aadhar,
//             Scrollership: val.scrollership,
//             PAN: val.pan,
//             Category: val.category,
//             "Mother Tongue": val.motherTougue,
//             Minority: val.minority,
//             Sld_type: val.sld_type,
//             "Result preExam": val.resultPreExam,
//           })),
//         ]}
//       />
//     </div>
//   );
// };

// export default Udise;




// import React, { useState } from "react";
// import Tables from "../../Dynamic/Tables";

// const Udise = () => {
//   const [bodyData, setBodyData] = useState([
//     { fullName: "Aman Kumar", class: "10", bpl: "Yes", aadhar: "1234-5678-9101", scrollership: "Scholarship A", pan: "ABCDE1234F", category: "General", motherTougue: "Hindi", minority: "No", sld_type: "None", resultPreExam: "Pass" },
//     { fullName: "Suman Gupta", class: "9", bpl: "No", aadhar: "2345-6789-0123", scrollership: "Scholarship B", pan: "FGHIJ5678K", category: "OBC", motherTougue: "Bengali", minority: "No", sld_type: "None", resultPreExam: "Pass" },
//     // Add more data as required...
//   ]);

//   const THEAD = [
//     "Select",
//     "S.No.",
//     "Student Name",
//     "Class",
//     "BPL",
//     "Aadhar",
//     "Scrollership",
//     "PAN",
//     "Category",
//     "Mother Tongue",
//     "Minority",
//     "Sld_type",
//     "Result preExam",
//   ];

//   const [selectedColumn, setSelectedColumn] = useState("BPL"); // Default column
//   const [selectedValue, setSelectedValue] = useState("Yes"); // Default value
//   const [selectedRows, setSelectedRows] = useState([]); // Store selected rows

//   // Function to handle checkbox selection
//   const handleRowSelection = (index) => {
//     if (selectedRows.includes(index)) {
//       setSelectedRows(selectedRows.filter((i) => i !== index));
//     } else {
//       setSelectedRows([...selectedRows, index]);
//     }
//   };

//   // Function to update selected rows based on selector
//   const updateSelectedRows = () => {
//     setBodyData((prevData) =>
//       prevData.map((row, index) =>
//         selectedRows.includes(index)
//           ? { ...row, [selectedColumn.toLowerCase()]: selectedValue }
//           : row
//       )
//     );
//     setSelectedRows([]); // Reset selection after update
//   };

//   return (
//     <div>
//       {/* Selectors */}
//       <div className="flex gap-4 mb-4">
//         {/* Column Selector */}
//         <select
//           value={selectedColumn}
//           onChange={(e) => setSelectedColumn(e.target.value)}
//           className="border border-gray-300 rounded px-2 py-1"
//         >
//           {["BPL", "Class", "Category"].map((column) => (
//             <option key={column} value={column}>
//               {column}
//             </option>
//           ))}
//         </select>

//         {/* Value Selector */}
//         <select
//           value={selectedValue}
//           onChange={(e) => setSelectedValue(e.target.value)}
//           className="border border-gray-300 rounded px-2 py-1"
//         >
//           {selectedColumn === "BPL" && (
//             <>
//               <option value="Yes">Yes</option>
//               <option value="No">No</option>
//             </>
//           )}
//           {selectedColumn === "Class" &&
//             Array.from({ length: 10 }, (_, i) => (
//               <option key={i + 1} value={i + 1}>
//                 {i + 1}
//               </option>
//             ))}
//           {selectedColumn === "Category" && (
//             <>
//               <option value="General">General</option>
//               <option value="OBC">OBC</option>
//               <option value="SC">SC</option>
//               <option value="ST">ST</option>
//             </>
//           )}
//         </select>

//         {/* Update Button */}
//         <button
//           onClick={updateSelectedRows}
//           className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
//         >
//           Update
//         </button>
//       </div>

//       {/* Table */}
//       <Tables
//         thead={THEAD}
//         tbody={bodyData?.map((val, ind) => ({
//           select: (
//             <input
//               type="checkbox"
//               checked={selectedRows.includes(ind)}
//               onChange={() => handleRowSelection(ind)}
//             />
//           ),
//           Sno: ind + 1,
//           "Student Name": val.fullName,
//           Class: val.class,
//           BPL: val.bpl,
//           Aadhar: val.aadhar,
//           Scrollership: val.scrollership,
//           PAN: val.pan,
//           Category: val.category,
//           "Mother Tongue": val.motherTougue,
//           Minority: val.minority,
//           Sld_type: val.sld_type,
//           "Result preExam": val.resultPreExam,
//         }))}
//       />
//     </div>
//   );
// };

// export default Udise;




// import React, { useState } from "react";
// import Tables from "../../Dynamic/Tables";

// const Udise = () => {
//   const [bodyData, setBodyData] = useState([
//     { fullName: "Aman Kumar", class: "10", bpl: "Yes", aadhar: "1234-5678-9101", scrollership: "Scholarship A", pan: "ABCDE1234F", category: "General", motherTougue: "Hindi", minority: "No", sld_type: "None", resultPreExam: "Pass" },
//     { fullName: "Suman Gupta", class: "9", bpl: "No", aadhar: "2345-6789-0123", scrollership: "Scholarship B", pan: "FGHIJ5678K", category: "OBC", motherTougue: "Bengali", minority: "No", sld_type: "None", resultPreExam: "Pass" },
//     { fullName: "Ravi Singh", class: "8", bpl: "Yes", aadhar: "3456-7890-1234", scrollership: "Scholarship C", pan: "KLMNO1234P", category: "SC", motherTougue: "Hindi", minority: "No", sld_type: "None", resultPreExam: "Fail" },
//     { fullName: "Pooja Sharma", class: "7", bpl: "No", aadhar: "4567-8901-2345", scrollership: "Scholarship D", pan: "PQRST6789U", category: "ST", motherTougue: "Punjabi", minority: "Yes", sld_type: "None", resultPreExam: "Pass" },
//     { fullName: "Rahul Verma", class: "6", bpl: "Yes", aadhar: "5678-9012-3456", scrollership: "Scholarship E", pan: "UVWXY1234Z", category: "General", motherTougue: "Gujarati", minority: "No", sld_type: "None", resultPreExam: "Pass" },
//     { fullName: "Anjali Yadav", class: "5", bpl: "No", aadhar: "6789-0123-4567", scrollership: "Scholarship F", pan: "ABCXY6789Z", category: "OBC", motherTougue: "Kannada", minority: "No", sld_type: "None", resultPreExam: "Pass" },
//     { fullName: "Vikas Choudhary", class: "4", bpl: "Yes", aadhar: "7890-1234-5678", scrollership: "Scholarship G", pan: "PQRMN6789A", category: "General", motherTougue: "Hindi", minority: "No", sld_type: "None", resultPreExam: "Fail" },
//     { fullName: "Sneha Mehta", class: "3", bpl: "No", aadhar: "8901-2345-6789", scrollership: "Scholarship H", pan: "LMNOP5678F", category: "General", motherTougue: "English", minority: "No", sld_type: "None", resultPreExam: "Pass" },
//     { fullName: "Karan Kapoor", class: "2", bpl: "Yes", aadhar: "9012-3456-7890", scrollership: "Scholarship I", pan: "ZXYUV6789G", category: "SC", motherTougue: "Marathi", minority: "No", sld_type: "None", resultPreExam: "Pass" },
//     { fullName: "Priya Desai", class: "1", bpl: "No", aadhar: "0123-4567-8901", scrollership: "Scholarship J", pan: "TUVWQ6789H", category: "ST", motherTougue: "Telugu", minority: "Yes", sld_type: "None", resultPreExam: "Pass" },
//   ]);

//   const THEAD = [
//     "Select",
//     "S.No.",
//     "Student Name",
//     "Class",
//     "BPL",
//     "Aadhar",
//     "Scrollership",
//     "PAN",
//     "Category",
//     "Mother Tongue",
//     "Minority",
//     "Sld_type",
//     "Result preExam",
//   ];

//   return (
//     <div>
//       <Tables
//         thead={THEAD}
//         tbody={bodyData?.map((val, ind) => ({
//           select: <input type="checkbox" />,
//           Sno: ind + 1,
//           "Student Name": val.fullName,
//           Class: val.class,
//           BPL: val.bpl,
//           Aadhar: val.aadhar,
//           Scrollership: val.scrollership,
//           PAN: val.pan,
//           Category: val.category,
//           "Mother Tongue": val.motherTougue,
//           Minority: val.minority,
//           Sld_type: val.sld_type,
//           "Result preExam": val.resultPreExam,
//         }))}
//       />
//     </div>
//   );
// };

// export default Udise;


// import React, { useState } from 'react'
// import Tables from '../../Dynamic/Tables'

// const Udise = () => {
//     const [bodyData, setBodyData] = useState([
//         { Sno: 1, ItemName: "", Qty: "", CurStock: "", Unit: "" },
//         { Sno: 1, ItemName: "", Qty: "", CurStock: "", Unit: "" },
//         { Sno: 1, ItemName: "", Qty: "", CurStock: "", Unit: "" },
//         { Sno: 1, ItemName: "", Qty: "", CurStock: "", Unit: "" },
//         { Sno: 1, ItemName: "", Qty: "", CurStock: "", Unit: "" },
//       ]);
//     const THEAD = [
//         "",
//         "S.No.",
//         "Student Name",
//         "Class",
//         "BPL",
//         "Aadhar",
//         "Scrollership",
//         "PAN",
//         "Category",
//         "Mother Tougue",
//         "Minority",
//         "Sld_type",
//         "Result preExam",
       
//       ];
//   return (
//     <div>
//      <Tables
//               thead={THEAD}
//               tbody={bodyData?.map((val, ind) => ({
//                 select: <input type='checkbox'/>,
//                 Sno: ind + 1,
//             "Student Name":val.fullName,
//             "Class":val.class,
//             "BPL":val.bpl,
//             "Aadhar":val.aadhar,
//             "Scrollership":val.scrollership,
//             "PAN":val.pan,
//             "Category":val.category,
//             "Mother Tougue":val.motherTougue,
//             "Minority":val.minority,
//             "Sld_type":val.sld_type,
//             "Result preExam":val.resultPreExam

//             }))}
//         />
//     </div>
//   )
// }

// export default Udise