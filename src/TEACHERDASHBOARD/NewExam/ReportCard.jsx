import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useStateContext } from "../../contexts/ContextProvider";
import { MdDownload } from "react-icons/md";
import axios from "axios";
import Cookies from "js-cookie";

const ReportCard = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [examName, setExamName] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [examResults, setExamResults] = useState([]);
  const [marks, setMarks] = useState([]);
  const [examData, setExamData] = useState([]);
  const [selectedExams, setSelectedExams] = useState([]);
  const [coScholasticMarks, setCoScholasticMarks] = useState([]);

  const schoolImage = sessionStorage.getItem("schoolImage");
  const schoolName = localStorage.getItem("schoolName");
  const SchoolDetails = JSON.parse(localStorage.getItem("SchoolDetails"));
  console.log("schoolName", schoolName);
  const { currentColor } = useStateContext();
  const componentPDF = useRef();
  const authToken = Cookies.get("token");

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: `${selectedStudent?.fullName || "Student"}_Report_Card`,
    onAfterPrint: () => alert("Downloaded successfully"),
  });

  useEffect(() => {
    const students = JSON.parse(localStorage.getItem("studentsData"));
    setAllStudents(students || []);
  }, []);

  const getResult = async () => {
    try {
      const response = await axios.get(
        "https://eserver-i5sm.onrender.com/api/v1/marks/getmarks",
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setMarks(response.data.marks);
    } catch (error) {
      console.error("Error fetching marks:", error);
    }
  };

  useEffect(() => {
    getResult();
  }, []);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(
          "https://eserver-i5sm.onrender.com/api/v1/exam/getExams",
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        setExamData(response.data.exams);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };
    fetchExams();
  }, [authToken]);

  const handleCheckboxChange = (exam) => {
    setSelectedExams((prevSelected) => {
      const isExamSelected = prevSelected.includes(exam._id);
      const updatedSelectedExams = isExamSelected
        ? prevSelected.filter((id) => id !== exam._id)
        : [...prevSelected, exam._id];

      const updatedExamNames = examData
        .filter((ex) => updatedSelectedExams.includes(ex._id))
        .map((ex) => ex.name);
      setExamName(updatedExamNames);

      // Filter and collect all selected exam results
      const allSelectedResults = marks.filter((mark) =>
        updatedSelectedExams.includes(mark.examId)
      );

      // Combine results from all selected terms
      const combinedResults = {
        marks: allSelectedResults.reduce((acc, curr) => {
          curr.marks.forEach((mark) => {
            const existingMark = acc.find(
              (m) => m.subjectName === mark.subjectName
            );
            if (!existingMark) {
              acc.push({
                ...mark,
                examResults: [
                  {
                    examId: curr.examId,
                    marks: mark.marks,
                    totalMarks: mark.totalMarks,
                  },
                ],
              });
            } else {
              existingMark.examResults = [
                ...existingMark.examResults,
                {
                  examId: curr.examId,
                  marks: mark.marks,
                  totalMarks: mark.totalMarks,
                },
              ];
            }
          });
          return acc;
        }, []),
      };

      // Set the coScholastic marks dynamically
      const coScholasticData = allSelectedResults.flatMap(
        (result) => result.coScholasticMarks
      );
      setCoScholasticMarks(coScholasticData);

      setExamResults(combinedResults);
      return updatedSelectedExams;
    });
  };

  const calculateGrade = (percentage) => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B+";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C";
    return "F";
  };

  return (
    <>
      <div className="mb-4 mx-auto">
        <div
          className="rounded-tl-lg rounded-tr-lg border flex justify-between text-white px-2 py-2 px-2"
          style={{
            background: `linear-gradient(to bottom, ${currentColor}, #8d8b8b)`,
          }}
        >
          <p className="text-lg">Report Card</p>
          <MdDownload
            onClick={generatePDF}
            className="text-2xl cursor-pointer"
          />
        </div>
        <div className="w-full flex">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Select Student</h3>
            <select
              className="p-2 border rounded"
              onChange={(e) => {
                const selected = allStudents.find(
                  (student) => student._id === e.target.value
                );
                setSelectedStudent(selected);
              }}
            >
              <option value="">Select a student</option>
              {allStudents.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.fullName} - Class {student.class} {student.section}{" "}
                  (Roll No: {student.rollNo})
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Select Exams</h3>
            <form className="flex gap-4 items-center justify-center border-2 p-2">
              {examData.map((exam) => (
                <div key={exam._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={exam._id}
                    value={exam._id}
                    checked={selectedExams.includes(exam._id)}
                    onChange={() => handleCheckboxChange(exam)}
                    className="mr-2"
                  />
                  <label htmlFor={exam._id}>{exam.name}</label>
                </div>
              ))}
            </form>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="a4">
          <div className="content border-2 m-1">
            <div ref={componentPDF} className="p-12">
              <div className="bg-white border-2 rounded-md p-6 max-w-4xl mx-auto mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-[70px] w-[70px]">
                    <img
                      src={schoolImage}
                      alt="School Logo"
                      className="w-full object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <h1 className="text-red-600 font-bold text-3xl">
                      {SchoolDetails?.schoolName}
                    </h1>
                    <p className="text-blue-600 text-xl">
                      {SchoolDetails?.address}
                    </p>
                    <p className="text-green-600 text-sm font-bold">
                      {SchoolDetails?.email}
                    </p>
                    <p className="text-green-600 text-sm font-bold">
                      {SchoolDetails?.contact}
                    </p>
                    {/* <p className="text-pink-500 text-lg font-bold mt-2">
                      PROGRESS REPORT 2023-24
                    </p> */}
                  </div>
                  <div className="w-[70px]"></div>
                </div>

                <div className="grid grid-cols-3 gap-4 border p-2 mb-1">
                  <div>
                    <table className=" text-sm">
                      <tbody>
                        {console.log("selectedStudent", selectedStudent)}
                        <tr>
                          <td className="font-semibold py-1 whitespace-nowrap">
                            Admission No. :
                          </td>
                          <td className="whitespace-nowrap to-blue-700 font-semibold">
                            {selectedStudent?.admissionNumber || "N/A"}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-semibold py-1 whitespace-nowrap">
                            Student's Name :
                          </td>
                          <td className="whitespace-nowrap">
                            {selectedStudent?.fullName || "N/A"}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-semibold py-1 whitespace-nowrap">
                            Father's Name :
                          </td>
                          <td className="whitespace-nowrap">
                            {selectedStudent?.fatherName || "N/A"}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-semibold py-1 whitespace-nowrap">
                            Mother's Name :
                          </td>
                          <td className="whitespace-nowrap">
                            {selectedStudent?.motherName || "N/A"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <table className="ml-3 text-sm">
                      <tbody>
                        {/* <tr>
                          <td className="font-semibold py-1 whitespace-nowrap">Medium :</td>
                          <td>Hindi</td>
                        </tr> */}
                        <tr>
                          <td className="font-semibold py-1 whitespace-nowrap">
                            Class :
                          </td>
                          <td>
                            {selectedStudent?.class || "N/A"}-
                            {selectedStudent?.section || ""}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-semibold py-1 whitespace-nowrap">
                            Roll No. :
                          </td>
                          <td className="whitespace-nowrap">
                            {selectedStudent?.rollNo || "N/A"}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-semibold py-1">DOB :</td>
                          <td>
                            {selectedStudent?.dateOfBirth
                              ? new Date(
                                  selectedStudent.dateOfBirth
                                ).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                })
                              : "N/A"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-end ">
                    <img
                      src={
                        selectedStudent?.image?.url ||
                        "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
                      }
                      alt="Student"
                      className="w-24 h-24 object-cover border border-gray-300 "
                    />
                  </div>
                </div>

                <table className="w-full mb-1 text-sm border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 p-2">SUBJECTS</th>
                      {examName.map((name) => (
                        <th key={name} className="border border-gray-300 p-2">
                          {name}
                        </th>
                      ))}
                      <th className="border border-gray-300 p-2">TOTAL</th>
                      <th className="border border-gray-300 p-2">%</th>
                      <th className="border border-gray-300 p-2">GRADE</th>
                    </tr>
                  </thead>
                  {console.log("examResults", examResults)}
                  <tbody>
                    {examResults?.marks?.map((subject, index) => {
                      const totalMarks = subject.examResults?.reduce(
                        (sum, result) => sum + (result.marks || 0),
                        0
                      );
                      const totalPossible = subject.examResults?.reduce(
                        (sum, result) => sum + (result.totalMarks || 0),
                        0
                      );
                      const percentage =
                        totalPossible > 0
                          ? (totalMarks / totalPossible) * 100
                          : 0;

                      return (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "bg-gray-100" : ""}
                        >
                          <td className="border border-gray-300 p-2">
                            {subject.subjectName}
                          </td>
                          {examName.map((name) => {
                            const examResult = subject.examResults?.find(
                              (result) =>
                                examData.find((exam) => exam.name === name)
                                  ?._id === result.examId
                            );
                            return (
                              <td
                                key={name}
                                className="border border-gray-300 p-2 text-center"
                              >
                                {examResult
                                  ? `${examResult.marks}/${examResult.totalMarks}`
                                  : "-/-"}
                              </td>
                            );
                          })}
                          <td className="border border-gray-300 p-2 text-center">
                            {totalMarks}/{totalPossible}
                          </td>
                          <td className="border border-gray-300 p-2 text-center">
                            {percentage.toFixed(2)}%
                          </td>
                          <td className="border border-gray-300 p-2 text-center">
                            {calculateGrade(percentage)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <table className="w-full mb-1 text-sm border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 p-2">Activity</th>
                      <th className="border border-gray-300 p-2">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coScholasticMarks.map((activity, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 p-2">
                          {activity.activityName}
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          {activity.grade}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mb-6">
                  <div className="mb-4">
                    <h4 className="font-semibold mb-1">Discipline</h4>
                    <p>Grade: A</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Teacher's Remarks</h4>
                    <p>Excellent performance. Keep up the good work!</p>
                  </div>
                </div>
                <div className="mt-8 flex justify-between text-sm">
                  <div>
                    <div className="mb-8"></div>
                    <div>Class Teacher's Signature</div>
                  </div>
                  <div>
                    <div className="mb-8"></div>
                    <div>Principal's Signature</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportCard;

// import React, { useEffect, useRef, useState } from "react";
// import { useReactToPrint } from "react-to-print";
// import { useStateContext } from "../../contexts/ContextProvider";
// import { MdDownload } from "react-icons/md";
// import axios from "axios";
// import Cookies from "js-cookie";

// const ReportCard = () => {
//   const [allStudents, setAllStudents] = useState([]);
//   const [examName, setExamName] = useState([]);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [examResults, setExamResults] = useState([]);
//   const [marks, setMarks] = useState([]);
//   const [examData, setExamData] = useState([]);
//   const [selectedExams, setSelectedExams] = useState([]);

//   const schoolImage = sessionStorage.getItem("schoolImage");
//   const { currentColor } = useStateContext();
//   const componentPDF = useRef();
//   const authToken = Cookies.get("token");

//   const generatePDF = useReactToPrint({
//     content: () => componentPDF.current,
//     documentTitle: `${selectedStudent?.fullName || "Student"}_Report_Card`,
//     onAfterPrint: () => alert("Downloaded successfully"),
//   });

//   useEffect(() => {
//     const students = JSON.parse(localStorage.getItem("studentsData"));
//     setAllStudents(students || []);
//   }, []);

//   const getResult = async () => {
//     try {
//       const response = await axios.get(
//         "https://eserver-i5sm.onrender.com/api/v1/marks/getmarks",
//         {
//           withCredentials: true,
//           headers: { Authorization: `Bearer ${authToken}` },
//         }
//       );
//       setMarks(response.data.marks);
//     } catch (error) {
//       console.error("Error fetching marks:", error);
//     }
//   };

//   useEffect(() => {
//     getResult();
//   }, []);

//   useEffect(() => {
//     const fetchExams = async () => {
//       try {
//         const response = await axios.get(
//           "https://eserver-i5sm.onrender.com/api/v1/exam/getExams",
//           {
//             withCredentials: true,
//             headers: { Authorization: `Bearer ${authToken}` },
//           }
//         );
//         setExamData(response.data.exams);
//       } catch (error) {
//         console.error("Error fetching exams:", error);
//       }
//     };
//     fetchExams();
//   }, [authToken]);

//   const handleCheckboxChange = (exam) => {
//     setSelectedExams((prevSelected) => {
//       const isExamSelected = prevSelected.includes(exam._id);
//       const updatedSelectedExams = isExamSelected
//         ? prevSelected.filter((id) => id !== exam._id)
//         : [...prevSelected, exam._id];

//       const updatedExamNames = examData
//         .filter((ex) => updatedSelectedExams.includes(ex._id))
//         .map((ex) => ex.name);
//       setExamName(updatedExamNames);

//       // Filter and collect all selected exam results
//       const allSelectedResults = marks.filter((mark) =>
//         updatedSelectedExams.includes(mark.examId)
//       );

//       // Combine results from all selected terms
//       const combinedResults = {
//         marks: allSelectedResults.reduce((acc, curr) => {
//           curr.marks.forEach((mark) => {
//             const existingMark = acc.find(
//               (m) => m.subjectName === mark.subjectName
//             );
//             if (!existingMark) {
//               acc.push({
//                 ...mark,
//                 examResults: [
//                   {
//                     examId: curr.examId,
//                     marks: mark.marks,
//                     totalMarks: mark.totalMarks,
//                   },
//                 ],
//               });
//             } else {
//               existingMark.examResults = [
//                 ...existingMark.examResults,
//                 {
//                   examId: curr.examId,
//                   marks: mark.marks,
//                   totalMarks: mark.totalMarks,
//                 },
//               ];
//             }
//           });
//           return acc;
//         }, []),
//       };

//       setExamResults(combinedResults);
//       return updatedSelectedExams;
//     });
//   };

//   const calculateGrade = (percentage) => {
//     if (percentage >= 90) return "A+";
//     if (percentage >= 80) return "A";
//     if (percentage >= 70) return "B+";
//     if (percentage >= 60) return "B";
//     if (percentage >= 50) return "C";
//     return "F";
//   };

//   return (
//     <>
//       <div className="mb-4 mx-auto">

//         <div
//           className="rounded-tl-lg rounded-tr-lg border flex justify-between text-white px-2 py-2 px-2"
//           style={{
//             background: `linear-gradient(to bottom, ${currentColor}, #8d8b8b)`,
//           }}
//         >
//           <p className="text-lg">Report Card</p>
//           <MdDownload
//             onClick={generatePDF}
//             className="text-2xl cursor-pointer"
//           />
//         </div>
//         <div className="w-full flex">
//        <div className="mb-4">
//           <h3 className="text-lg font-semibold mb-2">Select Student</h3>
//           <select
//             className=" p-2 border rounded"
//             onChange={(e) => {
//               const selected = allStudents.find(
//                 (student) => student._id === e.target.value
//               );
//               setSelectedStudent(selected);
//             }}
//           >
//             <option value="">Select a student</option>
//             {allStudents.map((student) => (
//               <option key={student._id} value={student._id}>
//                 {student.fullName} - Class {student.class} {student.section}{" "}
//                 (Roll No: {student.rollNo})
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Select Exams</h3>
//           <form className=" flex gap-4 items-center justify-center border-2 p-2 ">
//             {examData.map((exam) => (
//               <div key={exam._id} className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id={exam._id}
//                   value={exam._id}
//                   checked={selectedExams.includes(exam._id)}
//                   onChange={() => handleCheckboxChange(exam)}
//                   className="mr-2"
//                 />
//                 <label htmlFor={exam._id}>{exam.name}</label>
//               </div>
//             ))}
//           </form>
//         </div>
//        </div>
//       </div>

//       <div className="w-full flex justify-center">
//         <div className="a4">
//           <div className="content border-2 m-1">
//             <div ref={componentPDF} className="p-12">
//               <div className="bg-white border-2 rounded-md p-6 max-w-4xl mx-auto mb-6">
//                 {/* Header Section */}
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="h-[70px] w-[70px]">
//                     <img
//                       src={schoolImage}
//                       alt="School Logo"
//                       className="w-full object-contain"
//                     />
//                   </div>
//                   <div className="text-center">
//                     <h1 className="text-red-600 font-bold text-xl">
//                       R.K.S.V.M. INTER COLLEGE
//                     </h1>
//                     <p className="text-blue-600 text-sm">
//                       Makanpur Road, Nyay Khand-1st Indirapuram Gzb
//                     </p>
//                     <p className="text-green-600 text-sm font-bold">
//                       U-DISE CODE 9100108110
//                     </p>
//                     <p className="text-green-600 text-sm font-bold">
//                       SCHOOL AFFILIATION NO G.J.H-576
//                     </p>
//                     <p className="text-pink-500 text-lg font-bold mt-2">
//                       PROGRESS REPORT 2023-24
//                     </p>
//                   </div>
//                   <div className="w-[70px]"></div>
//                 </div>

//                 <div className="grid grid-cols-3 gap-4 border p-2 ">
//                   <div>
//                     <table className=" text-sm">
//                       <tbody>
//                         <tr>
//                           <td className="font-semibold py-1 whitespace-nowrap">Student's Name :</td>
//                           <td className="whitespace-nowrap">{selectedStudent?.fullName || "N/A"}</td>
//                         </tr>
//                         <tr>
//                           <td className="font-semibold py-1 whitespace-nowrap">Father's Name :</td>
//                           <td className="whitespace-nowrap">{selectedStudent?.fatherName || "N/A"}</td>
//                         </tr>
//                         <tr>
//                           <td className="font-semibold py-1 whitespace-nowrap">Mother's Name :</td>
//                           <td className="whitespace-nowrap">{selectedStudent?.motherName || "N/A"}</td>
//                         </tr>
//                         <tr>
//                           <td className="font-semibold py-1 whitespace-nowrap">Class :</td>
//                           <td>{selectedStudent?.class || "N/A"}-{selectedStudent?.section || ""}</td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>

//                   <div>
//                     <table className=" text-sm">
//                       <tbody>
//                         <tr>
//                           <td className="font-semibold py-1 whitespace-nowrap">Medium :</td>
//                           <td>Hindi</td>
//                         </tr>
//                         <tr>
//                           <td className="font-semibold py-1 whitespace-nowrap">Roll No. :</td>
//                           <td className="whitespace-nowrap">{selectedStudent?.rollNo || "N/A"}</td>
//                         </tr>
//                         <tr>
//                           <td className="font-semibold py-1">DOB :</td>
//                           {/* <td>{selectedStudent?.dateOfBirth || "N/A"}</td> */}
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>

//                   <div className="flex justify-end">
//                     <img
//                       src={selectedStudent?.image?.url || "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"}
//                       alt="Student"
//                       className="w-24 h-24 object-cover border border-gray-300 rounded-md"
//                     />
//                   </div>
//                 </div>

//                 <table className="w-full mb-1 text-sm border-collapse border border-gray-300">
//                   <thead>
//                     <tr className="bg-gray-200">
//                       <th className="border border-gray-300 p-2">SUBJECTS</th>
//                       {examName.map((name) => (
//                         <th key={name} className="border border-gray-300 p-2">
//                           {name}
//                         </th>
//                       ))}
//                       <th className="border border-gray-300 p-2">TOTAL</th>
//                       <th className="border border-gray-300 p-2">%</th>
//                       <th className="border border-gray-300 p-2">GRADE</th>
//                     </tr>
//                   </thead>
//                  { console.log("examResults",examResults)}
//                   <tbody>
//                     {examResults?.marks?.map((subject, index) => {
//                       const totalMarks = subject.examResults?.reduce(
//                         (sum, result) => sum + (result.marks || 0),
//                         0
//                       );
//                       const totalPossible = subject.examResults?.reduce(
//                         (sum, result) => sum + (result.totalMarks || 0),
//                         0
//                       );
//                       const percentage =
//                         totalPossible > 0
//                           ? (totalMarks / totalPossible) * 100
//                           : 0;

//                       return (
//                         <tr
//                           key={index}
//                           className={index % 2 === 0 ? "bg-gray-100" : ""}
//                         >
//                           <td className="border border-gray-300 p-2">
//                             {subject.subjectName}
//                           </td>
//                           {examName.map((name) => {
//                             const examResult = subject.examResults?.find(
//                               (result) =>
//                                 examData.find((exam) => exam.name === name)
//                                   ?._id === result.examId
//                             );
//                             return (
//                               <td
//                                 key={name}
//                                 className="border border-gray-300 p-2 text-center"
//                               >
//                                 {examResult
//                                   ? `${examResult.marks}/${examResult.totalMarks}`
//                                   : "-/-"}
//                               </td>
//                             );
//                           })}
//                           <td className="border border-gray-300 p-2 text-center">
//                             {totalMarks}/{totalPossible}
//                           </td>
//                           <td className="border border-gray-300 p-2 text-center">
//                             {percentage.toFixed(2)}%
//                           </td>
//                           <td className="border border-gray-300 p-2 text-center">
//                             {calculateGrade(percentage)}
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>

//                 {/* Co-Scholastic Areas */}
//                 <div className="mb-6">
//                   <h4 className="font-semibold mb-2">Co-Scholastic Areas</h4>
//                   <table className="w-full border-collapse border border-gray-300">
//                     <thead>
//                       <tr className="bg-gray-200">
//                         <th className="border border-gray-300 p-2">Activity</th>
//                         <th className="border border-gray-300 p-2">Grade</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td className="border border-gray-300 p-2">
//                           Work Education
//                         </td>
//                         <td className="border border-gray-300 p-2 text-center">
//                           A
//                         </td>
//                       </tr>
//                       <tr>
//                         <td className="border border-gray-300 p-2">
//                           Art Education
//                         </td>
//                         <td className="border border-gray-300 p-2 text-center">
//                           B
//                         </td>
//                       </tr>
//                       <tr>
//                         <td className="border border-gray-300 p-2">
//                           Health & Physical Education
//                         </td>
//                         <td className="border border-gray-300 p-2 text-center">
//                           A
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>

//                 <div className="mb-6">
//                   <div className="mb-4">
//                     <h4 className="font-semibold mb-1">Discipline</h4>
//                     <p>Grade: A</p>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold mb-1">Teacher's Remarks</h4>
//                     <p>Excellent performance. Keep up the good work!</p>
//                   </div>
//                 </div>
//                 <div className="mt-8 flex justify-between text-sm">
//                   <div>
//                     <div className="mb-8"></div>
//                     <div>Class Teacher's Signature</div>
//                   </div>
//                   <div>
//                     <div className="mb-8"></div>
//                     <div>Principal's Signature</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ReportCard;

// import React, { useEffect, useRef, useState } from "react";
// import { useReactToPrint } from "react-to-print";
// import { useStateContext } from "../../contexts/ContextProvider";
// import { MdDownload } from "react-icons/md";
// import axios from "axios";
// import Cookies from "js-cookie";

// const ReportCard = () => {
//   const [allStudents, setAllStudents] = useState([]);
//   const [examName, setExamName] = useState([]);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [examResults, setExamResults] = useState([]);
//   const [marks, setMarks] = useState([]);
//   const [examData, setExamData] = useState([]);
//   const [selectedExams, setSelectedExams] = useState([]);

//   const schoolImage = sessionStorage.getItem("schoolImage");
//   const { currentColor } = useStateContext();
//   const componentPDF = useRef();
//   const authToken = Cookies.get("token");

//   const generatePDF = useReactToPrint({
//     content: () => componentPDF.current,
//     documentTitle: `${selectedStudent?.fullName || "Student"}_Report_Card`,
//     onAfterPrint: () => alert("Downloaded successfully"),
//   });

//   useEffect(() => {
//     const students = JSON.parse(localStorage.getItem("studentsData"));
//     setAllStudents(students || []);
//   }, []);

//   const getResult = async () => {
//     try {
//       const response = await axios.get(
//         "https://eserver-i5sm.onrender.com/api/v1/marks/getmarks",
//         {
//           withCredentials: true,
//           headers: { Authorization: `Bearer ${authToken}` },
//         }
//       );
//       setMarks(response.data.marks);
//     } catch (error) {
//       console.error("Error fetching marks:", error);
//     }
//   };

//   useEffect(() => {
//     getResult();
//   }, []);

//   useEffect(() => {
//     const fetchExams = async () => {
//       try {
//         const response = await axios.get(
//           "https://eserver-i5sm.onrender.com/api/v1/exam/getExams",
//           {
//             withCredentials: true,
//             headers: { Authorization: `Bearer ${authToken}` },
//           }
//         );
//         setExamData(response.data.exams);
//       } catch (error) {
//         console.error("Error fetching exams:", error);
//       }
//     };
//     fetchExams();
//   }, [authToken]);

//   const handleCheckboxChange = (exam) => {
//     setSelectedExams((prevSelected) => {
//       const isExamSelected = prevSelected.includes(exam._id);
//       const updatedSelectedExams = isExamSelected
//         ? prevSelected.filter((id) => id !== exam._id)
//         : [...prevSelected, exam._id];

//       const updatedExamNames = examData
//         .filter((ex) => updatedSelectedExams.includes(ex._id))
//         .map((ex) => ex.name);
//       setExamName(updatedExamNames);

//       // Filter and collect all selected exam results
//       const allSelectedResults = marks.filter((mark) =>
//         updatedSelectedExams.includes(mark.examId)
//       );

//       // Combine results from all selected terms
//       const combinedResults = {
//         marks: allSelectedResults.reduce((acc, curr) => {
//           curr.marks.forEach((mark) => {
//             const existingMark = acc.find(
//               (m) => m.subjectName === mark.subjectName
//             );
//             if (!existingMark) {
//               acc.push({
//                 ...mark,
//                 examResults: [
//                   {
//                     examId: curr.examId,
//                     marks: mark.marks,
//                     totalMarks: mark.totalMarks,
//                   },
//                 ],
//               });
//             } else {
//               existingMark.examResults = [
//                 ...existingMark.examResults,
//                 {
//                   examId: curr.examId,
//                   marks: mark.marks,
//                   totalMarks: mark.totalMarks,
//                 },
//               ];
//             }
//           });
//           return acc;
//         }, []),
//       };

//       setExamResults(combinedResults);
//       return updatedSelectedExams;
//     });
//   };

//   const calculateGrade = (percentage) => {
//     if (percentage >= 90) return "A+";
//     if (percentage >= 80) return "A";
//     if (percentage >= 70) return "B+";
//     if (percentage >= 60) return "B";
//     if (percentage >= 50) return "C";
//     return "F";
//   };

//   return (
//     <>
//       <div className="mb-4 mx-auto">

//         <div
//           className="rounded-tl-lg rounded-tr-lg border flex justify-between text-white px-2 py-2 px-2"
//           style={{
//             background: `linear-gradient(to bottom, ${currentColor}, #8d8b8b)`,
//           }}
//         >
//           <p className="text-lg">Report Card</p>
//           <MdDownload
//             onClick={generatePDF}
//             className="text-2xl cursor-pointer"
//           />
//         </div>
//         <div className="w-full flex">
//        <div className="mb-4">
//           <h3 className="text-lg font-semibold mb-2">Select Student</h3>
//           <select
//             className=" p-2 border rounded"
//             onChange={(e) => {
//               const selected = allStudents.find(
//                 (student) => student._id === e.target.value
//               );
//               setSelectedStudent(selected);
//             }}
//           >
//             <option value="">Select a student</option>
//             {allStudents.map((student) => (
//               <option key={student._id} value={student._id}>
//                 {student.fullName} - Class {student.class} {student.section}{" "}
//                 (Roll No: {student.rollNo})
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Select Exams</h3>
//           <form className=" flex gap-4 items-center justify-center border-2 p-2 ">
//             {examData.map((exam) => (
//               <div key={exam._id} className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id={exam._id}
//                   value={exam._id}
//                   checked={selectedExams.includes(exam._id)}
//                   onChange={() => handleCheckboxChange(exam)}
//                   className="mr-2"
//                 />
//                 <label htmlFor={exam._id}>{exam.name}</label>
//               </div>
//             ))}
//           </form>
//         </div>
//        </div>
//       </div>

//       <div className="w-full flex justify-center">
//         <div className="a4">
//           <div className="content border-2 m-1">
//             <div ref={componentPDF} className="p-12">
//               <div className="bg-white border-2 rounded-md p-6 max-w-4xl mx-auto mb-6">
//                 {/* Header Section */}
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="h-[70px] w-[70px]">
//                     <img
//                       src={schoolImage}
//                       alt="School Logo"
//                       className="w-full object-contain"
//                     />
//                   </div>
//                   <div className="text-center">
//                     <h1 className="text-red-600 font-bold text-xl">
//                       R.K.S.V.M. INTER COLLEGE
//                     </h1>
//                     <p className="text-blue-600 text-sm">
//                       Makanpur Road, Nyay Khand-1st Indirapuram Gzb
//                     </p>
//                     <p className="text-green-600 text-sm font-bold">
//                       U-DISE CODE 9100108110
//                     </p>
//                     <p className="text-green-600 text-sm font-bold">
//                       SCHOOL AFFILIATION NO G.J.H-576
//                     </p>
//                     <p className="text-pink-500 text-lg font-bold mt-2">
//                       PROGRESS REPORT 2023-24
//                     </p>
//                   </div>
//                   <div className="w-[70px]"></div>
//                 </div>

//                 <div className="grid grid-cols-3 gap-4 border p-2 ">
//                   <div>
//                     <table className=" text-sm">
//                       <tbody>
//                         <tr>
//                           <td className="font-semibold py-1 whitespace-nowrap">Student's Name :</td>
//                           <td className="whitespace-nowrap">{selectedStudent?.fullName || "N/A"}</td>
//                         </tr>
//                         <tr>
//                           <td className="font-semibold py-1 whitespace-nowrap">Father's Name :</td>
//                           <td className="whitespace-nowrap">{selectedStudent?.fatherName || "N/A"}</td>
//                         </tr>
//                         <tr>
//                           <td className="font-semibold py-1 whitespace-nowrap">Mother's Name :</td>
//                           <td className="whitespace-nowrap">{selectedStudent?.motherName || "N/A"}</td>
//                         </tr>
//                         <tr>
//                           <td className="font-semibold py-1 whitespace-nowrap">Class :</td>
//                           <td>{selectedStudent?.class || "N/A"}-{selectedStudent?.section || ""}</td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>

//                   <div>
//                     <table className=" text-sm">
//                       <tbody>
//                         <tr>
//                           <td className="font-semibold py-1 whitespace-nowrap">Medium :</td>
//                           <td>Hindi</td>
//                         </tr>
//                         <tr>
//                           <td className="font-semibold py-1 whitespace-nowrap">Roll No. :</td>
//                           <td className="whitespace-nowrap">{selectedStudent?.rollNo || "N/A"}</td>
//                         </tr>
//                         <tr>
//                           <td className="font-semibold py-1">DOB :</td>
//                           {/* <td>{selectedStudent?.dateOfBirth || "N/A"}</td> */}
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>

//                   <div className="flex justify-end">
//                     <img
//                       src={selectedStudent?.image?.url || "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"}
//                       alt="Student"
//                       className="w-24 h-24 object-cover border border-gray-300 rounded-md"
//                     />
//                   </div>
//                 </div>

//                 <table className="w-full mb-1 text-sm border-collapse border border-gray-300">
//                   <thead>
//                     <tr className="bg-gray-200">
//                       <th className="border border-gray-300 p-2">SUBJECTS</th>
//                       {examName.map((name) => (
//                         <th key={name} className="border border-gray-300 p-2">
//                           {name}
//                         </th>
//                       ))}
//                       <th className="border border-gray-300 p-2">TOTAL</th>
//                       <th className="border border-gray-300 p-2">%</th>
//                       <th className="border border-gray-300 p-2">GRADE</th>
//                     </tr>
//                   </thead>
//                  { console.log("examResults",examResults)}
//                   <tbody>
//                     {examResults?.marks?.map((subject, index) => {
//                       const totalMarks = subject.examResults?.reduce(
//                         (sum, result) => sum + (result.marks || 0),
//                         0
//                       );
//                       const totalPossible = subject.examResults?.reduce(
//                         (sum, result) => sum + (result.totalMarks || 0),
//                         0
//                       );
//                       const percentage =
//                         totalPossible > 0
//                           ? (totalMarks / totalPossible) * 100
//                           : 0;

//                       return (
//                         <tr
//                           key={index}
//                           className={index % 2 === 0 ? "bg-gray-100" : ""}
//                         >
//                           <td className="border border-gray-300 p-2">
//                             {subject.subjectName}
//                           </td>
//                           {examName.map((name) => {
//                             const examResult = subject.examResults?.find(
//                               (result) =>
//                                 examData.find((exam) => exam.name === name)
//                                   ?._id === result.examId
//                             );
//                             return (
//                               <td
//                                 key={name}
//                                 className="border border-gray-300 p-2 text-center"
//                               >
//                                 {examResult
//                                   ? `${examResult.marks}/${examResult.totalMarks}`
//                                   : "-/-"}
//                               </td>
//                             );
//                           })}
//                           <td className="border border-gray-300 p-2 text-center">
//                             {totalMarks}/{totalPossible}
//                           </td>
//                           <td className="border border-gray-300 p-2 text-center">
//                             {percentage.toFixed(2)}%
//                           </td>
//                           <td className="border border-gray-300 p-2 text-center">
//                             {calculateGrade(percentage)}
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>

//                 {/* Co-Scholastic Areas */}
//                 <div className="mb-6">
//                   <h4 className="font-semibold mb-2">Co-Scholastic Areas</h4>
//                   <table className="w-full border-collapse border border-gray-300">
//                     <thead>
//                       <tr className="bg-gray-200">
//                         <th className="border border-gray-300 p-2">Activity</th>
//                         <th className="border border-gray-300 p-2">Grade</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td className="border border-gray-300 p-2">
//                           Work Education
//                         </td>
//                         <td className="border border-gray-300 p-2 text-center">
//                           A
//                         </td>
//                       </tr>
//                       <tr>
//                         <td className="border border-gray-300 p-2">
//                           Art Education
//                         </td>
//                         <td className="border border-gray-300 p-2 text-center">
//                           B
//                         </td>
//                       </tr>
//                       <tr>
//                         <td className="border border-gray-300 p-2">
//                           Health & Physical Education
//                         </td>
//                         <td className="border border-gray-300 p-2 text-center">
//                           A
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>

//                 <div className="mb-6">
//                   <div className="mb-4">
//                     <h4 className="font-semibold mb-1">Discipline</h4>
//                     <p>Grade: A</p>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold mb-1">Teacher's Remarks</h4>
//                     <p>Excellent performance. Keep up the good work!</p>
//                   </div>
//                 </div>
//                 <div className="mt-8 flex justify-between text-sm">
//                   <div>
//                     <div className="mb-8"></div>
//                     <div>Class Teacher's Signature</div>
//                   </div>
//                   <div>
//                     <div className="mb-8"></div>
//                     <div>Principal's Signature</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ReportCard;

// import React, { useEffect, useRef, useState } from "react";
// import { useReactToPrint } from "react-to-print";
// import { useStateContext } from "../../contexts/ContextProvider";
// import { MdDownload } from "react-icons/md";
// import axios from "axios";
// import Cookies from "js-cookie";
// const ReportCard = () => {
//   const [allStudents, setAllStudents] = useState([]);
//   const [examName, setExamName] = useState([]);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [examResults, setExamResults] = useState([]);

//   const schoolImage = sessionStorage.getItem("schoolImage");
//   const { currentColor } = useStateContext();
//   const componentPDF = useRef();
//   const generatePDF = useReactToPrint({
//     content: () => componentPDF.current,
//     documentTitle: `${"fullName"},Admission form`,
//     onAfterPrint: () => alert("Downloaded"),
//   });
//   useEffect(() => {
//     const students = JSON.parse(localStorage.getItem("studentsData"));
//     setAllStudents(students || []);
//   }, []);

//   const authToken = Cookies.get("token");
//   const [marks, setMarks] = useState([]);
//   const getResult = async () => {
//     try {
//       let response = await axios.get(
//         "https://eserver-i5sm.onrender.com/api/v1/marks/getmarks",
//         {
//           withCredentials: true,
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );

//       setMarks(response.data.marks);
//     } catch (error) {
//       console.error("Error fetching exams:", error);
//     }
//   };
//   useEffect(() => {
//     getResult();
//   }, []);

//   const [examData, setExamData] = useState([]);
//   const [selectedExams, setSelectedExams] = useState([]);
//   useEffect(() => {
//     const fetchExams = async () => {
//       try {
//         const response = await axios.get(
//           "https://eserver-i5sm.onrender.com/api/v1/exam/getExams",
//           {
//             withCredentials: true,
//             headers: {
//               Authorization: `Bearer ${authToken}`,
//             },
//           }
//         );
//         setExamData(response.data.exams);
//       } catch (error) {
//         console.error("Error fetching exams:", error);
//       }
//     };
//     fetchExams();
//   }, [authToken]);

//   const handleCheckboxChange = (exam) => {
//     setSelectedExams((prevSelected) => {
//       const isExamSelected = prevSelected.includes(exam._id);
//       const updatedSelectedExams = isExamSelected
//         ? prevSelected.filter((id) => id !== exam._id) // Remove if unchecked
//         : [...prevSelected, exam._id]; // Add if checked

//       // Update exam names
//       const updatedExamNames = examData
//         .filter((ex) => updatedSelectedExams.includes(ex._id))
//         .map((ex) => ex.name);
//       setExamName(updatedExamNames);

//       // Filter results dynamically
//       const filteredResults = marks.filter((mark) =>
//         updatedSelectedExams.includes(mark.examId)
//       );

//       console.log("Filtered Results:", filteredResults); // Debugging
//       if (filteredResults.length > 0) {
//         setExamResults(filteredResults[0]);
//       } else {
//         setExamResults([]); // Default empty state
//       }

//       return updatedSelectedExams;
//     });
//   };

//   // const handleCheckboxChange = (exam) => {

//   //   setExamName((preV) => [...preV, exam?.name]);
//   //   setSelectedExams((prevSelected) => {
//   //     const updatedSelectedExams = prevSelected.includes(exam._id)
//   //       ? prevSelected.filter((id) => id !== exam._id)
//   //       : [...prevSelected, exam._id];

//   //     const filteredResults = marks?.filter((mark) =>
//   //       updatedSelectedExams.includes(mark.examId)
//   //     );
//   //     setExamResults(filteredResults[0]);
//   //     return updatedSelectedExams;
//   //   });
//   // };
//   const studentsData = [
//     {
//       student: {
//         name: "John Doe",
//         rollNo: "12345",
//         class: "10",
//         section: "A",
//         motherName: "Jane Doe",
//         fatherName: "John Smith",
//         dateOfBirth: "2006-05-15",
//         admissionNo: "A12345",
//       },
//       subjects: [
//         {
//           name: "Mathematics",
//           marks: [
//             { examType: "Mid-Term", marks: 80, outOf: 100 },
//             { examType: "Final", marks: 85, outOf: 100 },
//             { examType: "Pre-Board", marks: 90, outOf: 100 },
//           ],
//           // totalMarks: 0,
//           totalOutOf: 0,
//           percentage: 0,
//           grade: "",
//         },
//         {
//           name: "Science",
//           marks: [
//             { examType: "Mid-Term", marks: 75, outOf: 100 },
//             { examType: "Final", marks: 78, outOf: 100 },
//             { examType: "Pre-Board", marks: 85, outOf: 100 },
//           ],
//           totalOutOf: 0,
//           percentage: 0,
//           grade: "",
//         },
//         {
//           name: "English",
//           marks: [
//             { examType: "Mid-Term", marks: 70, outOf: 100 },
//             { examType: "Final", marks: 72, outOf: 100 },
//             { examType: "Pre-Board", marks: 80, outOf: 100 },
//           ],
//           totalOutOf: 0,
//           percentage: 0,
//           grade: "",
//         },
//       ],
//     },
//   ];

//   return (
//     <>
//       <div className="mb-4  mx-auto">
//         <div>
//           <h3>Select Exams</h3>
//           {/* <form>

//             {examData.map((exam) => (
//               <div key={exam._id}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     value={exam._id}
//                     checked={selectedExams.includes(exam._id)}
//                     onChange={() => handleCheckboxChange(exam)}
//                   />
//                   {exam.name}
//                 </label>
//               </div>
//             ))}
//           </form> */}
//           <form>
//   {examData.map((exam) => (
//     <div key={exam._id} className="mb-2">
//       <label>
//         <input
//           type="checkbox"
//           value={exam._id}
//           checked={selectedExams.includes(exam._id)}
//           onChange={() => handleCheckboxChange(exam)}
//           className="mr-2"
//         />
//         {exam.name}
//       </label>
//     </div>
//   ))}
// </form>

//         </div>
//         <div
//           className="rounded-tl-lg border flex justify-between rounded-tr-lg text-white px-2 text-[12px] lg:text-lg"
//           style={{
//             background: `linear-gradient(to bottom, ${currentColor}, ${"#8d8b8b"})`,
//           }}
//         >
//           <p>Report Card</p>
//           <MdDownload
//             onClick={generatePDF}
//             className="text-[16px] lg:text-[25px] text-white cursor-pointer"
//           />
//         </div>

//       </div>

//       {studentsData.map((studentData, index) => {
//         const { student, subjects } = studentData;

//         return (
//           <div className="w-full flex justify-center">
//             <div className="a4">
//               <div className="content  border-2  m-1">
//                 <div ref={componentPDF}className="p-12 "
//                   // ye A4 size hai
//                 >
//                   <div key={index}
//                     className="bg-white   border-2 rounded-md p-6  max-w-4xl mx-auto mb-6"
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="h-[70px] w-[70px]">
//                         <img
//                           src={schoolImage}
//                           alt="School Logo"
//                           className=" w-full object-contain"
//                         />
//                       </div>
//                       <div className="text-center">
//                         <h1 className="text-red-600 font-bold text-xl">
//                           {"R.K.S.V.M. INTER COLLEGE"}
//                         </h1>
//                         <p className="text-blue-600 text-sm">
//                           Makanpur Road, Nyay Khand-1st Indirapuram Gzb
//                         </p>
//                         <p className="text-green-600 text-sm font-bold">
//                           U-DISE CODE 9100108110
//                         </p>
//                         <p className="text-green-600 text-sm font-bold">
//                           SCHOOL AFFILIATION NO G.J.H-576
//                         </p>
//                         <p className="text-center text-lg font-bold text-pink-500 mt-2">
//                           PROGRESS REPORT 2023-24
//                         </p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-black text-sm"></p>
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-3 gap-4 mb-1 text-sm  border p-2">
//                       <table className=" text-left text-sm">
//                         <tbody>
//                           <tr className="p-2">
//                             <td className="font-semibold py-1">
//                               Student's Name:
//                             </td>
//                             <td className="py-1">
//                               Anand kumar
//                               {/* {studentData.fullName?.toUpperCase()} */}
//                               {selectedStudent?.fullName || "N/A"}
//                             </td>
//                           </tr>
//                           <tr>
//                             <td className="font-semibold py-1">
//                               Father's Name :
//                             </td>
//                             <td className="py-1">
//                               {/* Anand Jaiswal */}
//                               {selectedStudent?.fatherName || "N/A"}
//                             </td>
//                           </tr>
//                           <tr>
//                             <td className="font-semibold py-1">
//                               Mother's Name:
//                             </td>
//                             <td className="py-1">
//                               {selectedStudent?.motherName || "N/A"}

//                             </td>
//                           </tr>
//                           <tr>
//                             <td className="font-semibold py-1">Class:</td>
//                             <td className="py-1">
//                               {selectedStudent?.class || "N/A"}-
//                               {selectedStudent?.section || ""}
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>
//                       <table className=" text-left text-sm">
//                         <tbody>
//                           <tr>
//                             <td className="font-semibold py-1">Medium:</td>
//                             <td className="py-1">
//                               Hindi
//                             </td>
//                           </tr>
//                           <tr>
//                             <td className="font-semibold py-1">Roll No.:</td>
//                             <td className="py-1">123456</td>
//                           </tr>
//                           <tr>
//                             <td className="font-semibold py-1">DOB:</td>
//                             <td className="py-1">17-05-1996</td>
//                           </tr>
//                           <tr>
//                             <td className="font-semibold py-1">
//                               DOB (in Words):
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>
//                       <div className=" flex justify-end  pr-1 pt-1">
//                         {selectedStudent?.image?.url ? (
//                           <img
//                             className="w-24 h-24 object-cover border border-gray-300 rounded-md"
//                             src={selectedStudent.image.url}
//                             alt="Student"
//                           />
//                         ) : (
//                           <img
//                             className="w-24 h-24 object-cover border border-gray-300 rounded-md"
//                             src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
//                             alt="No Image Available"
//                           />
//                         )}
//                       </div>
//                     </div>

//                     <table className="w-full mb-4 text-sm border-collapse border border-gray-300">
//                       <thead>
//                         <tr className="bg-gray-200">
//                           <th className="border border-gray-300 p-2">
//                             SUBJECTS
//                           </th>

//                           {examName.map((name) => (
//                             <th
//                               key={name}
//                               className="border border-gray-300 p-2"
//                             >
//                               {name}
//                             </th>
//                           ))}
//                           <th className="border border-gray-300 p-2">TOTAL</th>
//                           <th className="border border-gray-300 p-2">%</th>
//                           <th className="border border-gray-300 p-2">GRADE</th>
//                         </tr>
//                       </thead>

//                       <tbody>
//                         {console.log(
//                           "examResultsexamResultsexamResults",
//                           examResults?.marks
//                         )}
//                         {examResults?.marks?.map((subject, index) => (
//                           <tr
//                             key={index}
//                             className={index % 2 === 0 ? "bg-gray-100" : ""}
//                           >
//                             <td className="border border-gray-300 p-2">
//                               {subject.subjectName}
//                             </td>

//                             <td className="border border-gray-300 p-2 text-center">
//                               {subject?.marks}/{subject?.totalMarks}
//                             </td>
//                             <td className="border border-gray-300 p-2 text-center">
//                               {/* {subject?.percentage.toFixed(2)}% */}
//                             </td>
//                             <td className="border border-gray-300 p-2 text-center">
//                               {subject?.grade}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>

//                     <div className="mb-4 text-sm">
//                       <p>
//                         <strong>Total Marks:</strong>
//                         {/* {totalMarks} / {totalOutOf} */}
//                       </p>
//                       <p>
//                         {/* <strong>Percentage:</strong> {percentage.toFixed(2)}% */}
//                       </p>
//                       <p>
//                         {/* <strong>Overall Grade:</strong> {overallGrade} */}
//                       </p>
//                     </div>

//                     <div className="mb-4 text-sm">
//                       <h4 className="font-semibold mb-1">
//                         Co-Scholastic Areas
//                       </h4>
//                       <table className="w-full border-collapse border border-gray-300">
//                         <thead>
//                           <tr className="bg-gray-200">
//                             <th className="border border-gray-300 p-2">
//                               Activity
//                             </th>
//                             <th className="border border-gray-300 p-2">
//                               Grade
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           <tr>
//                             <td className="border border-gray-300 p-2">
//                               Work Education
//                             </td>
//                             <td className="border border-gray-300 p-2 text-center">
//                               A
//                             </td>
//                           </tr>
//                           <tr>
//                             <td className="border border-gray-300 p-2">
//                               Art Education
//                             </td>
//                             <td className="border border-gray-300 p-2 text-center">
//                               B
//                             </td>
//                           </tr>
//                           <tr>
//                             <td className="border border-gray-300 p-2">
//                               Health & Physical Education
//                             </td>
//                             <td className="border border-gray-300 p-2 text-center">
//                               A
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>

//                     <div className="text-sm">
//                       <h4 className="font-semibold mb-1">Discipline</h4>
//                       <p>Grade: A</p>
//                     </div>

//                     <div className="mt-4 text-sm">
//                       <h4 className="font-semibold mb-1">Teacher's Remarks</h4>
//                       <p>Excellent performance. Keep up the good work!</p>
//                     </div>

//                     <div className="mt-6 flex justify-between text-sm">
//                       <div>Class Teacher's Signature</div>
//                       <div>Principal's Signature</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </>
//   );
// };

// export default ReportCard;

// import React, { useEffect, useRef, useState } from "react";
// import { useReactToPrint } from "react-to-print";
// import { Button } from "@mui/material";
// import DownloadIcon from "@mui/icons-material/Download";
// import { useStateContext } from "../../contexts/ContextProvider";
// import { MdDownload } from "react-icons/md";
// import axios from 'axios';
// import Cookies from 'js-cookie';
// const ReportCard = () => {
//   const schoolImage = sessionStorage.getItem("schoolImage");
//   const { currentColor } = useStateContext();
//   const componentPDF = useRef();
//   const generatePDF = useReactToPrint({
//     content: () => componentPDF.current,
//     documentTitle: `${"fullName"},Admission form`,
//     onAfterPrint: () => alert("Downloaded"),
//   });

//   const authToken = Cookies.get('token');
//   const [marks, setMarks] = useState([]);
//   const getResult = async () => {
//     try {
//       let response = await axios.get(
//         "https://eserver-i5sm.onrender.com/api/v1/marks/getmarks",
//         {
//           withCredentials: true,
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );
//       setMarks(response.data.exams); // Save exams data to state
//     } catch (error) {
//       console.error("Error fetching exams:", error);
//     }
//   };
// console.log("marks",marks)
//   useEffect(() => {
//     getResult();
//   }, []);

//   const studentsData = [
//     {
//       student: {
//         name: "John Doe",
//         rollNo: "12345",
//         class: "10",
//         section: "A",
//         motherName: "Jane Doe",
//         fatherName: "John Smith",
//         dateOfBirth: "2006-05-15",
//         admissionNo: "A12345",
//       },
//       subjects: [
//         {
//           name: "Mathematics",
//           marks: [
//             { examType: "Mid-Term", marks: 80, outOf: 100 },
//             { examType: "Final", marks: 85, outOf: 100 },
//             { examType: "Pre-Board", marks: 90, outOf: 100 },
//           ],
//           totalMarks: 0,
//           totalOutOf: 0,
//           percentage: 0,
//           grade: "",
//         },
//         {
//           name: "Science",
//           marks: [
//             { examType: "Mid-Term", marks: 75, outOf: 100 },
//             { examType: "Final", marks: 78, outOf: 100 },
//             { examType: "Pre-Board", marks: 85, outOf: 100 },
//           ],
//           totalMarks: 0,
//           totalOutOf: 0,
//           percentage: 0,
//           grade: "",
//         },
//         {
//           name: "English",
//           marks: [
//             { examType: "Mid-Term", marks: 70, outOf: 100 },
//             { examType: "Final", marks: 72, outOf: 100 },
//             { examType: "Pre-Board", marks: 80, outOf: 100 },
//           ],
//           totalMarks: 0,
//           totalOutOf: 0,
//           percentage: 0,
//           grade: "",
//         },
//       ],
//     },

//   ];

//   const examTypes = ["Mid-Term", "Final", "Pre-Board"];

//   const [selectedExams, setSelectedExams] = useState(examTypes);

//   // Handle checkbox change
//   const handleCheckboxChange = (examType) => {
//     setSelectedExams((prevSelectedExams) =>
//       prevSelectedExams.includes(examType)
//         ? prevSelectedExams.filter((type) => type !== examType)
//         : [...prevSelectedExams, examType]
//     );
//   };

//   // Calculate dynamic total marks, percentage, and grade for a subject
//   const calculateSubjectData = (subject) => {
//     let totalMarks = 0;
//     let totalOutOf = 0;
//     subject.marks.forEach((mark) => {
//       if (selectedExams.includes(mark.examType)) {
//         totalMarks += mark.marks;
//         totalOutOf += mark.outOf;
//       }
//     });
//     const percentage = totalOutOf > 0 ? (totalMarks / totalOutOf) * 100 : 0;
//     let grade = "";

//     if (percentage >= 90) grade = "A1";
//     else if (percentage >= 80) grade = "A2";
//     else if (percentage >= 70) grade = "B1";
//     else if (percentage >= 60) grade = "B2";
//     else if (percentage >= 50) grade = "C1";
//     else if (percentage >= 40) grade = "C2";
//     else grade = "D";

//     return { totalMarks, totalOutOf, percentage, grade };
//   };

//   // Calculate overall data for each student
//   const calculateOverallData = (subjects) => {
//     let totalMarks = 0;
//     let totalOutOf = 0;

//     subjects.forEach((subject) => {
//       const { totalMarks: subjectTotalMarks, totalOutOf: subjectTotalOutOf } =
//         calculateSubjectData(subject);
//       totalMarks += subjectTotalMarks;
//       totalOutOf += subjectTotalOutOf;
//     });

//     const percentage = totalOutOf > 0 ? (totalMarks / totalOutOf) * 100 : 0;
//     let overallGrade = "";

//     if (percentage >= 90) overallGrade = "A1";
//     else if (percentage >= 80) overallGrade = "A2";
//     else if (percentage >= 70) overallGrade = "B1";
//     else if (percentage >= 60) overallGrade = "B2";
//     else if (percentage >= 50) overallGrade = "C1";
//     else if (percentage >= 40) overallGrade = "C2";
//     else overallGrade = "D";

//     return { totalMarks, totalOutOf, percentage, overallGrade };
//   };

//   // Update subjects data dynamically
//   const updateSubjectsData = (subjects) => {
//     subjects.forEach((subject) => {
//       const { totalMarks, totalOutOf, percentage, grade } =
//         calculateSubjectData(subject);
//       subject.totalMarks = totalMarks;
//       subject.totalOutOf = totalOutOf;
//       subject.percentage = percentage;
//       subject.grade = grade;
//     });
//   };

//   return (
//     <>
//       <div className="mb-4  mx-auto">
//         <div
//           className="rounded-tl-lg border flex justify-between rounded-tr-lg text-white px-2 text-[12px] lg:text-lg"
//           style={{
//             background: `linear-gradient(to bottom, ${currentColor}, ${"#8d8b8b"})`,
//           }}
//         >
//           <p>Report Card</p>
//           <MdDownload
//             onClick={generatePDF}
//             className="text-[16px] lg:text-[25px] text-white cursor-pointer"
//           />
//         </div>
//         <div className="w-full flex space-x-2">
//           {examTypes.map((examType) => (
//             <div key={examType} className="space-x-2">
//               <div>
//                 <input
//                   type="checkbox"
//                   checked={selectedExams.includes(examType)}
//                   onChange={() => handleCheckboxChange(examType)}
//                   id={examType}
//                   className="h-4 w-4"
//                 />
//                 <label htmlFor={examType} className="text-sm">
//                   {examType}
//                 </label>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {studentsData.map((studentData, index) => {
//         const { student, subjects } = studentData;

//         // Update subjects data for each student
//         updateSubjectsData(subjects);

//         const { totalMarks, totalOutOf, percentage, overallGrade } =
//           calculateOverallData(subjects);

//         return (
//           <div className="w-full flex justify-center">
//             <div className="a4">
//               <div className="content  border-2  m-1">
//                 <div
//                   ref={componentPDF}
//                   className="p-12 "
//                   // ye A4 size hai
//                 >
//                   <div
//                     key={index}
//                     className="bg-white   border-2 rounded-md p-6  max-w-4xl mx-auto mb-6"
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="h-[70px] w-[70px]">
//                         <img
//                           src={schoolImage}
//                           alt="School Logo"
//                           className=" w-full object-contain"
//                         />
//                       </div>
//                       <div className="text-center">
//                         <h1 className="text-red-600 font-bold text-xl">
//                           {"R.K.S.V.M. INTER COLLEGE"}
//                         </h1>
//                         <p className="text-blue-600 text-sm">
//                           Makanpur Road, Nyay Khand-1st Indirapuram Gzb
//                         </p>
//                         <p className="text-green-600 text-sm font-bold">
//                           U-DISE CODE 9100108110
//                         </p>
//                         <p className="text-green-600 text-sm font-bold">
//                           SCHOOL AFFILIATION NO G.J.H-576
//                         </p>
//                         <p className="text-center text-lg font-bold text-pink-500 mt-2">
//                           PROGRESS REPORT 2023-24
//                         </p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-black text-sm"></p>
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-3 gap-4 mb-1 text-sm  border p-2">
//                       <table className=" text-left text-sm">
//                         <tbody>
//                           <tr className="p-2">
//                             <td className="font-semibold py-1">
//                               Student's Name:
//                             </td>
//                             <td className="py-1">
//                               Anand kumar
//                               {/* {studentData.fullName?.toUpperCase()} */}
//                             </td>
//                           </tr>
//                           <tr>
//                             <td className="font-semibold py-1">
//                               Father's Name :
//                             </td>
//                             <td className="py-1">Anand Jaiswal</td>
//                           </tr>
//                           <tr>
//                             <td className="font-semibold py-1">
//                               Mother's Name:
//                             </td>
//                             <td className="py-1">
//                               Mother
//                               {/* {studentData.motherName?.toUpperCase()} */}
//                             </td>
//                           </tr>
//                           <tr>
//                             <td className="font-semibold py-1">Class:</td>
//                             <td className="py-1">
//                               V-A
//                               {/* {studentData.class}-{studentData.section} */}
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>
//                       <table className=" text-left text-sm">
//                         <tbody>
//                           <tr>
//                             <td className="font-semibold py-1">Medium:</td>
//                             <td className="py-1">
//                               Hindi
//                               {/* {studentData.medium} */}
//                             </td>
//                           </tr>
//                           <tr>
//                             <td className="font-semibold py-1">Roll No.:</td>
//                             <td className="py-1">
//                               123456
//                               {/* {studentData.scholarNumber} */}
//                             </td>
//                           </tr>
//                           <tr>
//                             <td className="font-semibold py-1">DOB:</td>
//                             <td className="py-1">
//                               17-05-1996
//                               {/* {new Date(
//                                   studentData.dateOfBirth
//                                 ).toLocaleDateString("en-US")} */}
//                             </td>
//                           </tr>
//                           <tr>
//                             <td className="font-semibold py-1">
//                               DOB (in Words):
//                             </td>
//                             {/* <td className="py-1">{convertDateToWords(studentData.dateOfBirth)}</td> */}
//                           </tr>
//                         </tbody>
//                       </table>
//                       {/* </div> */}
//                       <div className=" flex justify-end  pr-1 pt-1">
//                         {studentData.image && studentData.image.url ? (
//                           <img
//                             className="w-24 h-24 object-cover border border-gray-300 rounded-md"
//                             src={studentData.image.url}
//                             alt="Student"
//                           />
//                         ) : (
//                           <img
//                             className="w-24 h-24 object-cover border border-gray-300 rounded-md"
//                             src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"
//                             alt="No Image Available"
//                           />
//                         )}
//                       </div>
//                     </div>

//                     <table className="w-full mb-4 text-sm border-collapse border border-gray-300">
//                       <thead>
//                         <tr className="bg-gray-200">
//                           <th className="border border-gray-300 p-2">
//                             SUBJECTS
//                           </th>
//                           {selectedExams.map((examType) => (
//                             <th
//                               key={examType}
//                               className="border border-gray-300 p-2"
//                             >
//                               {examType}
//                             </th>
//                           ))}
//                           <th className="border border-gray-300 p-2">TOTAL</th>
//                           <th className="border border-gray-300 p-2">%</th>
//                           <th className="border border-gray-300 p-2">GRADE</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {subjects.map((subject, index) => (
//                           <tr
//                             key={index}
//                             className={index % 2 === 0 ? "bg-gray-100" : ""}
//                           >
//                             <td className="border border-gray-300 p-2">
//                               {subject.name}
//                             </td>
//                             {selectedExams.map((examType) => {
//                               const mark = subject.marks.find(
//                                 (m) => m.examType === examType
//                               );
//                               return (
//                                 <td
//                                   key={examType}
//                                   className="border border-gray-300 p-2 text-center"
//                                 >
//                                   {mark ? `${mark.marks}/${mark.outOf}` : "-"}
//                                 </td>
//                               );
//                             })}
//                             <td className="border border-gray-300 p-2 text-center">
//                               {subject.totalMarks}/{subject.totalOutOf}
//                             </td>
//                             <td className="border border-gray-300 p-2 text-center">
//                               {subject.percentage.toFixed(2)}%
//                             </td>
//                             <td className="border border-gray-300 p-2 text-center">
//                               {subject.grade}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>

//                     <div className="mb-4 text-sm">
//                       <p>
//                         <strong>Total Marks:</strong> {totalMarks} /{" "}
//                         {totalOutOf}
//                       </p>
//                       <p>
//                         <strong>Percentage:</strong> {percentage.toFixed(2)}%
//                       </p>
//                       <p>
//                         <strong>Overall Grade:</strong> {overallGrade}
//                       </p>
//                     </div>

//                     <div className="mb-4 text-sm">
//                       <h4 className="font-semibold mb-1">
//                         Co-Scholastic Areas
//                       </h4>
//                       <table className="w-full border-collapse border border-gray-300">
//                         <thead>
//                           <tr className="bg-gray-200">
//                             <th className="border border-gray-300 p-2">
//                               Activity
//                             </th>
//                             <th className="border border-gray-300 p-2">
//                               Grade
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           <tr>
//                             <td className="border border-gray-300 p-2">
//                               Work Education
//                             </td>
//                             <td className="border border-gray-300 p-2 text-center">
//                               A
//                             </td>
//                           </tr>
//                           <tr>
//                             <td className="border border-gray-300 p-2">
//                               Art Education
//                             </td>
//                             <td className="border border-gray-300 p-2 text-center">
//                               B
//                             </td>
//                           </tr>
//                           <tr>
//                             <td className="border border-gray-300 p-2">
//                               Health & Physical Education
//                             </td>
//                             <td className="border border-gray-300 p-2 text-center">
//                               A
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>

//                     <div className="text-sm">
//                       <h4 className="font-semibold mb-1">Discipline</h4>
//                       <p>Grade: A</p>
//                     </div>

//                     <div className="mt-4 text-sm">
//                       <h4 className="font-semibold mb-1">Teacher's Remarks</h4>
//                       <p>Excellent performance. Keep up the good work!</p>
//                     </div>

//                     <div className="mt-6 flex justify-between text-sm">
//                       <div>Class Teacher's Signature</div>
//                       <div>Principal's Signature</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </>
//   );
// };

// export default ReportCard;
