import React, { useState } from "react";
import moment from 'moment';
const Card = ({
  filteredStudentData,
  componentPDF,
  selectedExamData,
  formatExamDate,
  getDayOfWeek,
  total
}) => {
  const [toggleState, setToggleState] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
 
  const itemsPerPage = 10;

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const getActiveClass = (index, className) =>
    toggleState === index ? className : "";

  const schoolName = sessionStorage.getItem("schoolName");
  const schoolContact = sessionStorage.getItem("schoolContact");
  const schoolAddress = sessionStorage.getItem("schooladdress");
  const schoolImage = sessionStorage.getItem("image");

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the items to display based on current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudentData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  
  const totalPages = Math.ceil(filteredStudentData.length / itemsPerPage);

  return (
    <>
    <h1>Total no. of Student = {total}</h1>
      <div ref={componentPDF} className="pdf-content">
        
        {currentItems.map((item, index) => (
          <div
          
            key={index}
            className="relative max-w-4xl mx-auto p-6 bg-white border border-gray-300 shadow-md  mb-20 pt-5 pb-20"
          >
           <div className="absolute top-5 left-5">
          <div className="h-[100px] w-[100px]  object-contain ">
          <img src={schoolImage} alt=""  />
          </div>
           </div>
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">{schoolName}</h1>
              <p className="text-sm">{schoolAddress}</p>
              <p className="text-sm">Mobile - {schoolContact}</p>
              <h2 className="text-lg font-bold mt-4">Examination Admit Card</h2>
              <p className="text-sm">
                (Academic Session 2024-25) - Final Examination
              </p>
            </div>
            <div className="flex justify-between gap-4 mb-6 ">
              <div className="text-start">
                <p>
                  <strong>Student's Name</strong> : {item.fullName}
                </p>
                <p>
                  <strong>Father's Name</strong> : {item.fatherName}
                </p>
                <p>
                  <strong>DOB</strong> : {moment(item.dateOfBirth).format('DD-MM-YYYY')}
                </p>
              </div>
              <div className="text-start">
                <p>
                  <strong>Admission No</strong> : {" "}
                  <span className="text-blue-800">{item.admissionNumber}</span>
                </p>
                <p>
                  <strong>Class</strong> : <span className="text-blue-800">{item.class}-{item.section}</span> 
                </p>
                <p>
                  <strong>Roll No</strong> : <span className="text-blue-800">{item.rollNo}</span>
                </p>
              </div>
              <div className="text-end  p-3 border border-gray-300 h-24 w-24">
                <img src={item.image?.url} alt="" />
              </div>
            </div>
            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">Subject</th>
                  <th className="border border-gray-300 p-2">
                    Examination Date
                  </th>
                  <th className="border border-gray-300 p-2">Day</th>
                  <th className="border border-gray-300 p-2">Timing</th>
                  <th className="border border-gray-300 p-2">Checked By</th>
                </tr>
              </thead>
              <tbody>
                {selectedExamData &&
                  selectedExamData.examInfo.map((data, idx) => (
                    <tr key={idx}>
                      <td className="border border-gray-300 p-2 text-start">
                        {data.subjectName}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {formatExamDate(data.examDate)}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {getDayOfWeek(data.examDate)}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {data.startTime} to {data.endTime}
                      </td>
                      <td className="border border-gray-300 p-2">.............</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="mb-6">
              <h3 className="text-sm font-bold mb-2">
                General/Exam Instructions for Students
              </h3>
              <ol className="list-decimal list-inside text-sm text-start">
                <li>Check the exam timetable carefully.</li>
                <li>Students must bring their own lunch to school.</li>
                <li>
                  Students must bring the Admit Card and show it to the
                  invigilator(s) on duty and should preserve it for future
                  requirements.
                </li>
                <li>
                  Mobile Phone, Calculator, Digital Watch or any Electronic
                  Device is NOT ALLOWED.
                </li>
                <li>
                  Arrive at the School at least 15 minutes before the start of
                  the examination.
                </li>
                <li>
                  Students are expected to maintain discipline for 15 minutes
                  after written examination starts.
                </li>
                <li>
                  Ensure that you use the washroom before examination starts as
                  you will not be permitted to leave during the first hour.
                </li>
                <li>
                  Normally, you are required to answer questions using blue or
                  black ink. Make sure you bring some spare pens with you.
                </li>
                <li>
                  Plan your answers on your own paper. Remember, copying is
                  cheating.
                </li>
                <li>
                  You must remain silent until after you have exited the school
                  building.
                </li>
                <li>
                  Result to be published in the school website
                  (https://www.singhpublicschool.com) in due time.
                </li>
              </ol>
            </div>
            <div className="flex justify-between items-center text-sm">
              {/* <div>
                <p>
                  <strong>Date of Issue</strong>
                </p>
                <p>09-Mar-2020</p>
              </div> */}
              <div className="text-center">
                <p>
                  <strong>Class Teacher</strong>
                </p>
                <p className="border-b border-gray-300 w-32 mx-auto"></p>
              </div>
              <div className="text-center">
                <p>
                  <strong>Principal</strong>
                </p>
                <p className="border-b border-gray-300 w-32 mx-auto"></p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 mx-1 border ${
              currentPage === page ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </>
  );
};

export default Card;



// import React, { useState } from "react";
// const Card = ({
//   filteredStudentData,
//   componentPDF,
//   selectedExamData,
//   formatExamDate,
//   getDayOfWeek,
// }) => {
//   const [ToggleState, setToggleState] = useState(1);

//   const toggleTab = (index) => {
//     setToggleState(index);
//   };

//   const getActiveClass = (index, className) =>
//     ToggleState === index ? className : "";

//   const schoolName = sessionStorage.getItem("schoolName");
//   const schoolContact = sessionStorage.getItem("schoolContact");
//   const schoolAddress = sessionStorage.getItem("schooladdress");
//   const SchoolImage = sessionStorage.getItem("image");

//   return (
//     <>
//       <div ref={componentPDF} className="pdf-content">
//         {filteredStudentData.map((item, index) => (
//           <div className="max-w-4xl mx-auto p-6 bg-white border border-gray-300 shadow-md  mb-20 pt-10 pb-20">
//             <div className="text-center mb-6">
//               <h1 className="text-2xl font-bold">{schoolName}</h1>
//               <p className="text-sm">{schoolAddress}</p>
//               {/* <p className="text-sm">Village - Falaida, Greater Noida, Gautam Budha Nagar- 203209</p> */}
//               <p className="text-sm">Mobile - {schoolContact}</p>
//               {/* <p className="text-sm">Email - info@singhpublicschool.com</p> */}
//               {/* <p className="text-sm">Website - https://www.singhpublicschool.com</p> */}
//               <h2 className="text-lg font-bold mt-4">Examination Admit Card</h2>
//               <p className="text-sm">
//                 (Academic Session 2024-25) - Final Examination
//               </p>
//             </div>
//             <div className="grid grid-cols-3 gap-4 mb-6">
//               <div className="text-start">
//                 <p>
//                   <strong>Student's Name</strong>: {item.fullName}
//                 </p>
//                 <p>
//                   <strong>Father's Name</strong>: {item.fatherName}
//                 </p>
//               </div>
//               <div className="text-start">
//                 <p>
//                   <strong>Admission/Roll No</strong>:{" "}
//                   <span className="text-blue-800">{item.admissionNumber}</span>
//                 </p>
//                 <p>
//                   <strong>Class</strong>: {item.class}-{item.section}
//                 </p>
//               </div>
//               <div className="flex justify-center items-center border border-gray-300 h-24 w-24 mx-auto">
//                 {/* <p className="text-gray-500">Photo</p> */}
//                 <img src={item.image?.url} alt="" />
//               </div>
//             </div>
//             <table className="w-full border-collapse border border-gray-300 mb-6">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="border border-gray-300 p-2">Subject</th>
//                   <th className="border border-gray-300 p-2">
//                     Examination Date
//                   </th>
//                   <th className="border border-gray-300 p-2">Day</th>
//                   <th className="border border-gray-300 p-2">Timing</th>
//                   <th className="border border-gray-300 p-2">Checked By</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {console.log("selectedExamData", selectedExamData)}
//                 {selectedExamData &&
//                   selectedExamData.examInfo.map((data) => (
//                     <tr>
//                       <td className="border border-gray-300 p-2 text-start">
//                         {data.subjectName}
//                       </td>
//                       <td className="border border-gray-300 p-2">
//                         {" "}
//                         {formatExamDate(data.examDate)}
//                       </td>
//                       <td className="border border-gray-300 p-2">
//                         {" "}
//                         {getDayOfWeek(data.examDate)}
//                       </td>
//                       <td className="border border-gray-300 p-2">
//                         {data.startTime} to {data.endTime}
//                       </td>
//                       <td className="border border-gray-300 p-2">
//                         .............
//                       </td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//             <div className="mb-6">
//               <h3 className="text-sm font-bold mb-2">
//                 General/Exam Instructions for Students
//               </h3>
//               <ol className="list-decimal list-inside text-sm text-start">
//                 <li>Check the exam timetable carefully.</li>
//                 <li>Students must bring their own lunch to school.</li>
//                 <li>
//                   Students must bring the Admit Card and show it to the
//                   invigilator(s) on duty and should preserve it for future
//                   requirements.
//                 </li>
//                 <li>
//                   Mobile Phone, Calculator, Digital Watch or any Electronic
//                   Device is NOT ALLOWED.
//                 </li>
//                 <li>
//                   Arrive at the School at least 15 minutes before the start of
//                   the examination.
//                 </li>
//                 <li>
//                   Students are expected to maintain discipline for 15 minutes
//                   after written examination starts.
//                 </li>
//                 <li>
//                   Ensure that you use the washroom before examination starts as
//                   you will not be permitted to leave during the first hour.
//                 </li>
//                 <li>
//                   Normally, you are required to answer questions using blue or
//                   black ink. Make sure you bring some spare pens with you.
//                 </li>
//                 <li>
//                   Plan your answers on your own paper. Remember, copying is
//                   cheating.
//                 </li>
//                 <li>
//                   You must remain silent until after you have exited the school
//                   building.
//                 </li>
//                 <li>
//                   Result to be published in the school website
//                   (https://www.singhpublicschool.com) in due time.
//                 </li>
//               </ol>
//             </div>
//             <div className="flex justify-between items-center text-sm">
//               <div>
//                 <p>
//                   <strong>Date of Issue</strong>
//                 </p>
//                 <p>09-Mar-2020</p>
//               </div>
//               {/* <div className="text-center">
//                     <p>
//                       <strong>Signature of the Guardian</strong>
//                     </p>
//                     <p className="border-b border-gray-300 w-32 mx-auto"></p>
//                   </div> */}
//               <div className="text-center">
//                 <p>
//                   <strong>Class Teacher</strong>
//                 </p>
//                 <p className="border-b border-gray-300 w-32 mx-auto"></p>
//               </div>
//               {/* <div className="text-center">
//                     <p>
//                       <strong>Rechecked By</strong>
//                     </p>
//                     <p className="border-b border-gray-300 w-32 mx-auto"></p>
//                   </div> */}
//               <div className="text-center">
//                 <p>
//                   <strong>Principal</strong>
//                 </p>
//                 <p className="border-b border-gray-300 w-32 mx-auto"></p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Card;
