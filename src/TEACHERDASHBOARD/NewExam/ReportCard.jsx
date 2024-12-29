import React, { useRef, useState } from 'react';
import { useReactToPrint } from "react-to-print";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useStateContext } from '../../contexts/ContextProvider';
import { MdDownload } from "react-icons/md";
const ReportCard = () => {
  const schoolImage= sessionStorage.getItem("schoolImage");
  const { currentColor } = useStateContext();
  const componentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: `${"fullName"},Admission form`,
    onAfterPrint: () => alert("Downloaded"),
  });
  const studentsData = [
    {
      student: {
        name: 'John Doe',
        rollNo: '12345',
        class: '10',
        section: 'A',
        motherName: 'Jane Doe',
        fatherName: 'John Smith',
        dateOfBirth: '2006-05-15',
        admissionNo: 'A12345',
      },
      subjects: [
        {
          name: 'Mathematics',
          marks: [
            { examType: 'Mid-Term', marks: 80, outOf: 100 },
            { examType: 'Final', marks: 85, outOf: 100 },
            { examType: 'Pre-Board', marks: 90, outOf: 100 },
          ],
          totalMarks: 0,
          totalOutOf: 0,
          percentage: 0,
          grade: '',
        },
        {
          name: 'Science',
          marks: [
            { examType: 'Mid-Term', marks: 75, outOf: 100 },
            { examType: 'Final', marks: 78, outOf: 100 },
            { examType: 'Pre-Board', marks: 85, outOf: 100 },
          ],
          totalMarks: 0,
          totalOutOf: 0,
          percentage: 0,
          grade: '',
        },
        {
          name: 'English',
          marks: [
            { examType: 'Mid-Term', marks: 70, outOf: 100 },
            { examType: 'Final', marks: 72, outOf: 100 },
            { examType: 'Pre-Board', marks: 80, outOf: 100 },
          ],
          totalMarks: 0,
          totalOutOf: 0,
          percentage: 0,
          grade: '',
        },
      ],
    },
    // Add more student objects as needed
    // {
    //   student: {
    //     name: 'Jane Smith',
    //     rollNo: '12346',
    //     class: '10',
    //     section: 'A',
    //     motherName: 'Emily Smith',
    //     fatherName: 'James Smith',
    //     dateOfBirth: '2006-06-10',
    //     admissionNo: 'A12346',
    //   },
    //   subjects: [
    //     {
    //       name: 'Mathematics',
    //       marks: [
    //         { examType: 'Mid-Term', marks: 90, outOf: 100 },
    //         { examType: 'Final', marks: 92, outOf: 100 },
    //         { examType: 'Pre-Board', marks: 88, outOf: 100 },
    //       ],
    //       totalMarks: 0,
    //       totalOutOf: 0,
    //       percentage: 0,
    //       grade: '',
    //     },
    //     {
    //       name: 'Science',
    //       marks: [
    //         { examType: 'Mid-Term', marks: 85, outOf: 100 },
    //         { examType: 'Final', marks: 87, outOf: 100 },
    //         { examType: 'Pre-Board', marks: 90, outOf: 100 },
    //       ],
    //       totalMarks: 0,
    //       totalOutOf: 0,
    //       percentage: 0,
    //       grade: '',
    //     },
    //     {
    //       name: 'English',
    //       marks: [
    //         { examType: 'Mid-Term', marks: 80, outOf: 100 },
    //         { examType: 'Final', marks: 85, outOf: 100 },
    //         { examType: 'Pre-Board', marks: 90, outOf: 100 },
    //       ],
    //       totalMarks: 0,
    //       totalOutOf: 0,
    //       percentage: 0,
    //       grade: '',
    //     },
    //   ],
    // },
  ];

  const examTypes = ['Mid-Term', 'Final', 'Pre-Board'];

  // State to track selected exam types
  const [selectedExams, setSelectedExams] = useState(examTypes);

  // Handle checkbox change
  const handleCheckboxChange = (examType) => {
    setSelectedExams((prevSelectedExams) =>
      prevSelectedExams.includes(examType)
        ? prevSelectedExams.filter((type) => type !== examType)
        : [...prevSelectedExams, examType]
    );
  };

  // Calculate dynamic total marks, percentage, and grade for a subject
  const calculateSubjectData = (subject) => {
    let totalMarks = 0;
    let totalOutOf = 0;
    subject.marks.forEach((mark) => {
      if (selectedExams.includes(mark.examType)) {
        totalMarks += mark.marks;
        totalOutOf += mark.outOf;
      }
    });
    const percentage = totalOutOf > 0 ? (totalMarks / totalOutOf) * 100 : 0;
    let grade = '';

    if (percentage >= 90) grade = 'A1';
    else if (percentage >= 80) grade = 'A2';
    else if (percentage >= 70) grade = 'B1';
    else if (percentage >= 60) grade = 'B2';
    else if (percentage >= 50) grade = 'C1';
    else if (percentage >= 40) grade = 'C2';
    else grade = 'D';

    return { totalMarks, totalOutOf, percentage, grade };
  };

  // Calculate overall data for each student
  const calculateOverallData = (subjects) => {
    let totalMarks = 0;
    let totalOutOf = 0;

    subjects.forEach((subject) => {
      const { totalMarks: subjectTotalMarks, totalOutOf: subjectTotalOutOf } = calculateSubjectData(subject);
      totalMarks += subjectTotalMarks;
      totalOutOf += subjectTotalOutOf;
    });

    const percentage = totalOutOf > 0 ? (totalMarks / totalOutOf) * 100 : 0;
    let overallGrade = '';

    if (percentage >= 90) overallGrade = 'A1';
    else if (percentage >= 80) overallGrade = 'A2';
    else if (percentage >= 70) overallGrade = 'B1';
    else if (percentage >= 60) overallGrade = 'B2';
    else if (percentage >= 50) overallGrade = 'C1';
    else if (percentage >= 40) overallGrade = 'C2';
    else overallGrade = 'D';

    return { totalMarks, totalOutOf, percentage, overallGrade };
  };

  // Update subjects data dynamically
  const updateSubjectsData = (subjects) => {
    subjects.forEach((subject) => {
      const { totalMarks, totalOutOf, percentage, grade } = calculateSubjectData(subject);
      subject.totalMarks = totalMarks;
      subject.totalOutOf = totalOutOf;
      subject.percentage = percentage;
      subject.grade = grade;
    });
  };

  return (
    <>
      <div className="mb-4  mx-auto">
        {/* <h4 className="font-semibold">Select Exams to Display:</h4> */}
        <div 
       className='rounded-tl-lg border flex justify-between rounded-tr-lg text-white px-2 text-[12px]'
       style={{ background: `linear-gradient(to bottom, ${currentColor}, ${"#8d8b8b"})` }}
      ><p>Report Card</p> 
      <MdDownload  onClick={generatePDF} className='text-[16px] text-white cursor-pointer'/>
      
    </div>
        
        <div  className="w-full flex space-x-2">
        {examTypes.map((examType) => (
          <div key={examType} className="space-x-2">
            <div>
            <input
              type="checkbox"
              checked={selectedExams.includes(examType)}
              onChange={() => handleCheckboxChange(examType)}
              id={examType}
              className="h-4 w-4"
            />
            <label htmlFor={examType} className="text-sm">{examType}</label>
            </div>
          </div>
        ))}
        </div>
      </div>

      {studentsData.map((studentData, index) => {
        const { student, subjects } = studentData;

        // Update subjects data for each student
        updateSubjectsData(subjects);

        const { totalMarks, totalOutOf, percentage, overallGrade } = calculateOverallData(subjects);

        return (

          <div className="w-full flex justify-center">
     <div className="a4">
        <div className="content border border-2  m-1">
          <div
            ref={componentPDF}
            className="p-12 "
            // ye A4 size hai
          >
          <div key={index} className="bg-white border  border-2 rounded-md p-6  max-w-4xl mx-auto mb-6">
          
            <div className="flex items-center justify-between">
      <div  className="h-[70px] w-[70px]">
        <img src={schoolImage} alt="School Logo" className=" w-full object-contain"/>
      </div>
      <div className="text-center">
        <h1 className="text-red-600 font-bold text-xl">{"R.K.S.V.M. INTER COLLEGE"}</h1>
        <p className="text-blue-600 text-sm">Makanpur Road, Nyay Khand-1st Indirapuram Gzb</p>
        <p className="text-green-600 text-sm font-bold">U-DISE CODE 9100108110</p>
        <p className="text-green-600 text-sm font-bold">SCHOOL AFFILIATION NO G.J.H-576</p>
        <p className="text-center text-lg font-bold text-pink-500 mt-2">PROGRESS REPORT 2023-24</p>
      </div>
      <div className="text-right">
        <p className="text-black text-sm"></p>
      </div>
    </div>

            <div className="grid grid-cols-3 gap-4 mb-1 text-sm  border p-2">

                        <table className=" text-left text-sm">
                          <tbody>
                            <tr className="p-2">
                              <td className="font-semibold py-1">
                                Student's Name:
                              </td>
                              <td className="py-1">
                                Anand kumar
                                {/* {studentData.fullName?.toUpperCase()} */}
                              </td>
                            </tr>
                            <tr>
                              <td className="font-semibold py-1">
                                Father's Name :
                              </td>
                              <td className="py-1">
                               Anand Jaiswal
                              </td>
                            </tr>
                            <tr>
                              <td className="font-semibold py-1">
                                Mother's Name:
                              </td>
                              <td className="py-1">
Mother
                                {/* {studentData.motherName?.toUpperCase()} */}
                              </td>
                            </tr>
                            <tr>
                              <td className="font-semibold py-1">Class:</td>
                              <td className="py-1">
                                V-A
                                {/* {studentData.class}-{studentData.section} */}
                              </td>
                            </tr>
                           
                          </tbody>
                        </table>
                        <table className=" text-left text-sm">
                          <tbody>
                            
                            <tr>
                              <td className="font-semibold py-1">Medium:</td>
                              <td className="py-1">
                                Hindi
                                {/* {studentData.medium} */}
                                </td>
                            </tr>
                            <tr>
                              <td className="font-semibold py-1">
                                Roll No.:
                              </td>
                              <td className="py-1">
                                123456
                                {/* {studentData.scholarNumber} */}
                              </td>
                            </tr>
                            <tr>
                              <td className="font-semibold py-1">DOB:</td>
                              <td className="py-1">
                                17-05-1996
                                {/* {new Date(
                                  studentData.dateOfBirth
                                ).toLocaleDateString("en-US")} */}
                              </td>
                            </tr>
                            <tr>
                              <td className="font-semibold py-1">
                                DOB (in Words):
                              </td>
                              {/* <td className="py-1">{convertDateToWords(studentData.dateOfBirth)}</td> */}
                            </tr>
                          </tbody>
                        </table>
                      {/* </div> */}
                      <div className=" flex justify-end  pr-1 pt-1">
                        {studentData.image && studentData.image.url ? (
                          <img
                            className="w-24 h-24 object-cover border border-gray-300 rounded-md"
                            src={studentData.image.url}
                            alt="Student"
                          />
                        ) : (
                          <img
                            className="w-24 h-24 object-cover border border-gray-300 rounded-md"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"
                            alt="No Image Available"
                          />
                        )}
                      </div>
                  
            </div>

            <table className="w-full mb-4 text-sm border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">SUBJECTS</th>
                  {selectedExams.map((examType) => (
                    <th key={examType} className="border border-gray-300 p-2">{examType}</th>
                  ))}
                  <th className="border border-gray-300 p-2">TOTAL</th>
                  <th className="border border-gray-300 p-2">%</th>
                  <th className="border border-gray-300 p-2">GRADE</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                    <td className="border border-gray-300 p-2">{subject.name}</td>
                    {selectedExams.map((examType) => {
                      const mark = subject.marks.find((m) => m.examType === examType);
                      return (
                        <td key={examType} className="border border-gray-300 p-2 text-center">
                          {mark ? `${mark.marks}/${mark.outOf}` : '-'}
                        </td>
                      );
                    })}
                    <td className="border border-gray-300 p-2 text-center">{subject.totalMarks}/{subject.totalOutOf}</td>
                    <td className="border border-gray-300 p-2 text-center">{subject.percentage.toFixed(2)}%</td>
                    <td className="border border-gray-300 p-2 text-center">{subject.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mb-4 text-sm">
              <p><strong>Total Marks:</strong> {totalMarks} / {totalOutOf}</p>
              <p><strong>Percentage:</strong> {percentage.toFixed(2)}%</p>
              <p><strong>Overall Grade:</strong> {overallGrade}</p>
            </div>

            <div className="mb-4 text-sm">
              <h4 className="font-semibold mb-1">Co-Scholastic Areas</h4>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">Activity</th>
                    <th className="border border-gray-300 p-2">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border border-gray-300 p-2">Work Education</td><td className="border border-gray-300 p-2 text-center">A</td></tr>
                  <tr><td className="border border-gray-300 p-2">Art Education</td><td className="border border-gray-300 p-2 text-center">B</td></tr>
                  <tr><td className="border border-gray-300 p-2">Health & Physical Education</td><td className="border border-gray-300 p-2 text-center">A</td></tr>
                </tbody>
              </table>
            </div>

            <div className="text-sm">
              <h4 className="font-semibold mb-1">Discipline</h4>
              <p>Grade: A</p>
            </div>

            <div className="mt-4 text-sm">
              <h4 className="font-semibold mb-1">Teacher's Remarks</h4>
              <p>Excellent performance. Keep up the good work!</p>
            </div>

            <div className="mt-6 flex justify-between text-sm">
              <div>Class Teacher's Signature</div>
              <div>Principal's Signature</div>
            </div>
          </div>
          </div>
          </div>
          </div>
          </div>
        );
      })}
    </>
  );
};

export default ReportCard;




// import React, { useState } from 'react';

// const ReportCard = () => {
//   const data = {
//     student: {
//       name: 'John Doe',
//       rollNo: '12345',
//       class: '10',
//       section: 'A',
//       motherName: 'Jane Doe',
//       fatherName: 'John Smith',
//       dateOfBirth: '2006-05-15',
//       admissionNo: 'A12345',
//     },
//     subjects: [
//       {
//         name: 'Mathematics',
//         marks: [
//           { examType: 'Mid-Term', marks: 80, outOf: 100 },
//           { examType: 'Final', marks: 85, outOf: 100 },
//           { examType: 'Pre-Board', marks: 90, outOf: 100 }, // Added Pre-Board marks
//         ],
//         totalMarks: 0, // Dynamic total marks
//         totalOutOf: 0, // Dynamic total outOf
//         percentage: 0, // Dynamic percentage
//         grade: '', // Dynamic grade
//       },
//       {
//         name: 'Science',
//         marks: [
//           { examType: 'Mid-Term', marks: 75, outOf: 100 },
//           { examType: 'Final', marks: 78, outOf: 100 },
//           { examType: 'Pre-Board', marks: 85, outOf: 100 }, // Added Pre-Board marks
//         ],
//         totalMarks: 0, // Dynamic total marks
//         totalOutOf: 0, // Dynamic total outOf
//         percentage: 0, // Dynamic percentage
//         grade: '', // Dynamic grade
//       },
//       {
//         name: 'English',
//         marks: [
//           { examType: 'Mid-Term', marks: 70, outOf: 100 },
//           { examType: 'Final', marks: 72, outOf: 100 },
//           { examType: 'Pre-Board', marks: 80, outOf: 100 }, // Added Pre-Board marks
//         ],
//         totalMarks: 0, // Dynamic total marks
//         totalOutOf: 0, // Dynamic total outOf
//         percentage: 0, // Dynamic percentage
//         grade: '', // Dynamic grade
//       },
//     ],
//     totalMarks: 0, // Dynamic total marks
//     totalOutOf: 0, // Dynamic total outOf
//     percentage: 0, // Dynamic percentage
//     overallGrade: '', // Dynamic overall grade
//     examTypes: ['Mid-Term', 'Final', 'Pre-Board'], // Added Pre-Board exam type
//   };

//   const { student, subjects, examTypes } = data;

//   // State to track selected exam types
//   const [selectedExams, setSelectedExams] = useState(examTypes);

//   // Handle checkbox change
//   const handleCheckboxChange = (examType) => {
//     setSelectedExams((prevSelectedExams) =>
//       prevSelectedExams.includes(examType)
//         ? prevSelectedExams.filter((type) => type !== examType)
//         : [...prevSelectedExams, examType]
//     );
//   };

//   // Calculate dynamic total marks, percentage, and grade
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
//     let grade = '';

//     if (percentage >= 90) grade = 'A1';
//     else if (percentage >= 80) grade = 'A2';
//     else if (percentage >= 70) grade = 'B1';
//     else if (percentage >= 60) grade = 'B2';
//     else if (percentage >= 50) grade = 'C1';
//     else if (percentage >= 40) grade = 'C2';
//     else grade = 'D';

//     return { totalMarks, totalOutOf, percentage, grade };
//   };

//   // Calculate overall total marks, percentage, and grade
//   const calculateOverallData = () => {
//     let totalMarks = 0;
//     let totalOutOf = 0;

//     subjects.forEach((subject) => {
//       const { totalMarks: subjectTotalMarks, totalOutOf: subjectTotalOutOf } = calculateSubjectData(subject);
//       totalMarks += subjectTotalMarks;
//       totalOutOf += subjectTotalOutOf;
//     });

//     const percentage = totalOutOf > 0 ? (totalMarks / totalOutOf) * 100 : 0;
//     let overallGrade = '';

//     if (percentage >= 90) overallGrade = 'A1';
//     else if (percentage >= 80) overallGrade = 'A2';
//     else if (percentage >= 70) overallGrade = 'B1';
//     else if (percentage >= 60) overallGrade = 'B2';
//     else if (percentage >= 50) overallGrade = 'C1';
//     else if (percentage >= 40) overallGrade = 'C2';
//     else overallGrade = 'D';

//     return { totalMarks, totalOutOf, percentage, overallGrade };
//   };

//   // Update subjects data
//   subjects.forEach((subject) => {
//     const { totalMarks, totalOutOf, percentage, grade } = calculateSubjectData(subject);
//     subject.totalMarks = totalMarks;
//     subject.totalOutOf = totalOutOf;
//     subject.percentage = percentage;
//     subject.grade = grade;
//   });

//   // Calculate overall data
//   const { totalMarks: overallTotalMarks, totalOutOf: overallTotalOutOf, percentage: overallPercentage, overallGrade } = calculateOverallData();

//   return (
//     <>
//     <div className="mb-4 max-w-4xl mx-auto">
//         <h4 className="font-semibold">Select Exams to Display:</h4>
//         {examTypes.map((examType) => (
//           <div key={examType} className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               checked={selectedExams.includes(examType)}
//               onChange={() => handleCheckboxChange(examType)}
//               id={examType}
//               className="h-4 w-4"
//             />
//             <label htmlFor={examType} className="text-sm">{examType}</label>
//           </div>
//         ))}
//       </div>
   
//     <div className="bg-white shadow-lg rounded-lg p-6 mt-8 max-w-4xl mx-auto">
      
//       <div className="text-center mb-4">
//         <h2 className="text-2xl font-bold">R.K.S.V.M. INTER COLLEGE</h2>
//         <p>Makanpur Road, Nyay Khand-1st Indirapuram Gzb</p>
//         <p>09090900621</p>
//         <h3 className="text-xl font-semibold mt-2">PROGRESS REPORT 2023-24</h3>
//         <p>SCHOOL AFFILIATION NO G.J.H-576</p>
//         <p>U-DISE CODE 9100108110</p>
//       </div>

//       {/* Checkbox selection for exam types */}
//       {/* <div className="mb-4">
//         <h4 className="font-semibold">Select Exams to Display:</h4>
//         {examTypes.map((examType) => (
//           <div key={examType} className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               checked={selectedExams.includes(examType)}
//               onChange={() => handleCheckboxChange(examType)}
//               id={examType}
//               className="h-4 w-4"
//             />
//             <label htmlFor={examType} className="text-sm">{examType}</label>
//           </div>
//         ))}
//       </div> */}

//       <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
//         <div>
//           <p><strong>Student's Name:</strong> {student.name}</p>
//           <p><strong>Mother's Name:</strong> {student.motherName}</p>
//           <p><strong>Father's Name:</strong> {student.fatherName}</p>
//           <p><strong>Date of Birth:</strong> {student.dateOfBirth}</p>
//         </div>
//         <div>
//           <p><strong>Class:</strong> {student.class} {student.section}</p>
//           <p><strong>Roll No.:</strong> {student.rollNo}</p>
//           <p><strong>Admission No.:</strong> {student.admissionNo}</p>
//         </div>
//       </div>

//       <table className="w-full mb-4 text-sm border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border border-gray-300 p-2">SUBJECTS</th>
//             {selectedExams.map((examType) => (
//               <th key={examType} className="border border-gray-300 p-2">{examType}</th>
//             ))}
//             <th className="border border-gray-300 p-2">TOTAL</th>
//             <th className="border border-gray-300 p-2">%</th>
//             <th className="border border-gray-300 p-2">GRADE</th>
//           </tr>
//         </thead>
//         <tbody>
//           {subjects.map((subject, index) => (
//             <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
//               <td className="border border-gray-300 p-2">{subject.name}</td>
//               {selectedExams.map((examType) => {
//                 const mark = subject.marks.find((m) => m.examType === examType);
//                 return (
//                   <td key={examType} className="border border-gray-300 p-2 text-center">
//                     {mark ? `${mark.marks}/${mark.outOf}` : '-'}
//                   </td>
//                 );
//               })}
//               <td className="border border-gray-300 p-2 text-center">{subject.totalMarks}/{subject.totalOutOf}</td>
//               <td className="border border-gray-300 p-2 text-center">{subject.percentage.toFixed(2)}%</td>
//               <td className="border border-gray-300 p-2 text-center">{subject.grade}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="mb-4 text-sm">
//         <p><strong>Total Marks:</strong> {overallTotalMarks} / {overallTotalOutOf}</p>
//         <p><strong>Percentage:</strong> {overallPercentage.toFixed(2)}%</p>
//         <p><strong>Overall Grade:</strong> {overallGrade}</p>
//       </div>

//       <div className="mb-4 text-sm">
//         <h4 className="font-semibold mb-1">Co-Scholastic Areas</h4>
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border border-gray-300 p-2">Activity</th>
//               <th className="border border-gray-300 p-2">Grade</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr><td className="border border-gray-300 p-2">Work Education</td><td className="border border-gray-300 p-2 text-center">A</td></tr>
//             <tr><td className="border border-gray-300 p-2">Art Education</td><td className="border border-gray-300 p-2 text-center">B</td></tr>
//             <tr><td className="border border-gray-300 p-2">Health & Physical Education</td><td className="border border-gray-300 p-2 text-center">A</td></tr>
//           </tbody>
//         </table>
//       </div>

//       <div className="text-sm">
//         <h4 className="font-semibold mb-1">Discipline</h4>
//         <p>Grade: A</p>
//       </div>

//       <div className="mt-4 text-sm">
//         <h4 className="font-semibold mb-1">Teacher's Remarks</h4>
//         <p>Excellent performance. Keep up the good work!</p>
//       </div>

//       <div className="mt-6 flex justify-between text-sm">
//         <div>Class Teacher's Signature</div>
//         <div>Principal's Signature</div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default ReportCard;


// import React, { useState } from 'react';

// const ReportCard = () => {
//   const data = {
//     student: {
//       name: 'John Doe',
//       rollNo: '12345',
//       class: '10',
//       section: 'A',
//       motherName: 'Jane Doe',
//       fatherName: 'John Smith',
//       dateOfBirth: '2006-05-15',
//       admissionNo: 'A12345',
//     },
//     subjects: [
//       {
//         name: 'Mathematics',
//         marks: [
//           { examType: 'Mid-Term', marks: 80, outOf: 100 },
//           { examType: 'Final', marks: 85, outOf: 100 },
//         ],
//         totalMarks: 165,
//         totalOutOf: 200,
//         percentage: 82.5,
//         grade: 'A2',
//       },
//       {
//         name: 'Science',
//         marks: [
//           { examType: 'Mid-Term', marks: 75, outOf: 100 },
//           { examType: 'Final', marks: 78, outOf: 100 },
//         ],
//         totalMarks: 153,
//         totalOutOf: 200,
//         percentage: 76.5,
//         grade: 'B1',
//       },
//       {
//         name: 'English',
//         marks: [
//           { examType: 'Mid-Term', marks: 70, outOf: 100 },
//           { examType: 'Final', marks: 72, outOf: 100 },
//         ],
//         totalMarks: 142,
//         totalOutOf: 200,
//         percentage: 71,
//         grade: 'B2',
//       },
//     ],
//     totalMarks: 460,
//     totalOutOf: 600,
//     percentage: 76.67,
//     overallGrade: 'B1',
//     examTypes: ['Mid-Term', 'Final', 'Pre-Board'], // Added a third exam type
//   };

//   const { student, subjects, totalMarks, totalOutOf, percentage, overallGrade, examTypes } = data;

//   // State to track selected exam types
//   const [selectedExams, setSelectedExams] = useState(examTypes);

//   // Handle checkbox change
//   const handleCheckboxChange = (examType) => {
//     setSelectedExams((prevSelectedExams) =>
//       prevSelectedExams.includes(examType)
//         ? prevSelectedExams.filter((type) => type !== examType)
//         : [...prevSelectedExams, examType]
//     );
//   };

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-6 mt-8 max-w-4xl mx-auto">
//       <div className="text-center mb-4">
//         <h2 className="text-2xl font-bold">R.K.S.V.M. INTER COLLEGE</h2>
//         <p>Makanpur Road, Nyay Khand-1st Indirapuram Gzb</p>
//         <p>09090900621</p>
//         <h3 className="text-xl font-semibold mt-2">PROGRESS REPORT 2023-24</h3>
//         <p>SCHOOL AFFILIATION NO G.J.H-576</p>
//         <p>U-DISE CODE 9100108110</p>
//       </div>

//       {/* Checkbox selection for exam types */}
//       <div className="mb-4">
//         <h4 className="font-semibold">Select Exams to Display:</h4>
//         {examTypes.map((examType) => (
//           <div key={examType} className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               checked={selectedExams.includes(examType)}
//               onChange={() => handleCheckboxChange(examType)}
//               id={examType}
//               className="h-4 w-4"
//             />
//             <label htmlFor={examType} className="text-sm">{examType}</label>
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
//         <div>
//           <p><strong>Student's Name:</strong> {student.name}</p>
//           <p><strong>Mother's Name:</strong> {student.motherName}</p>
//           <p><strong>Father's Name:</strong> {student.fatherName}</p>
//           <p><strong>Date of Birth:</strong> {student.dateOfBirth}</p>
//         </div>
//         <div>
//           <p><strong>Class:</strong> {student.class} {student.section}</p>
//           <p><strong>Roll No.:</strong> {student.rollNo}</p>
//           <p><strong>Admission No.:</strong> {student.admissionNo}</p>
//         </div>
//       </div>

//       <table className="w-full mb-4 text-sm border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border border-gray-300 p-2">SUBJECTS</th>
//             {selectedExams.map((examType) => (
//               <th key={examType} className="border border-gray-300 p-2">{examType}</th>
//             ))}
//             <th className="border border-gray-300 p-2">TOTAL</th>
//             <th className="border border-gray-300 p-2">%</th>
//             <th className="border border-gray-300 p-2">GRADE</th>
//           </tr>
//         </thead>
//         <tbody>
//           {subjects.map((subject, index) => (
//             <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
//               <td className="border border-gray-300 p-2">{subject.name}</td>
//               {selectedExams.map((examType) => {
//                 const mark = subject.marks.find((m) => m.examType === examType);
//                 return (
//                   <td key={examType} className="border border-gray-300 p-2 text-center">
//                     {mark ? `${mark.marks}/${mark.outOf}` : '-'}
//                   </td>
//                 );
//               })}
//               <td className="border border-gray-300 p-2 text-center">{subject.totalMarks}/{subject.totalOutOf}</td>
//               <td className="border border-gray-300 p-2 text-center">{subject.percentage.toFixed(2)}%</td>
//               <td className="border border-gray-300 p-2 text-center">{subject.grade}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="mb-4 text-sm">
//         <p><strong>Total Marks:</strong> {totalMarks} / {totalOutOf}</p>
//         <p><strong>Percentage:</strong> {percentage.toFixed(2)}%</p>
//         <p><strong>Overall Grade:</strong> {overallGrade}</p>
//       </div>

//       <div className="mb-4 text-sm">
//         <h4 className="font-semibold mb-1">Co-Scholastic Areas</h4>
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border border-gray-300 p-2">Activity</th>
//               <th className="border border-gray-300 p-2">Grade</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr><td className="border border-gray-300 p-2">Work Education</td><td className="border border-gray-300 p-2 text-center">A</td></tr>
//             <tr><td className="border border-gray-300 p-2">Art Education</td><td className="border border-gray-300 p-2 text-center">B</td></tr>
//             <tr><td className="border border-gray-300 p-2">Health & Physical Education</td><td className="border border-gray-300 p-2 text-center">A</td></tr>
//           </tbody>
//         </table>
//       </div>

//       <div className="text-sm">
//         <h4 className="font-semibold mb-1">Discipline</h4>
//         <p>Grade: A</p>
//       </div>

//       <div className="mt-4 text-sm">
//         <h4 className="font-semibold mb-1">Teacher's Remarks</h4>
//         <p>Excellent performance. Keep up the good work!</p>
//       </div>

//       <div className="mt-6 flex justify-between text-sm">
//         <div>Class Teacher's Signature</div>
//         <div>Principal's Signature</div>
//       </div>
//     </div>
//   );
// };

// export default ReportCard;



// import React from 'react';

// const ReportCard = () => {
//   const data = {
//     student: {
//       name: 'John Doe',
//       rollNo: '12345',
//       class: '10',
//       section: 'A',
//       motherName: 'Jane Doe',
//       fatherName: 'John Smith',
//       dateOfBirth: '2006-05-15',
//       admissionNo: 'A12345',
//     },
//     subjects: [
//       {
//         name: 'Mathematics',
//         marks: [
//           { examType: 'Mid-Term', marks: 80, outOf: 100 },
//           { examType: 'Final', marks: 85, outOf: 100 },
//         ],
//         totalMarks: 165,
//         totalOutOf: 200,
//         percentage: 82.5,
//         grade: 'A2',
//       },
//       {
//         name: 'Science',
//         marks: [
//           { examType: 'Mid-Term', marks: 75, outOf: 100 },
//           { examType: 'Final', marks: 78, outOf: 100 },
//         ],
//         totalMarks: 153,
//         totalOutOf: 200,
//         percentage: 76.5,
//         grade: 'B1',
//       },
//       {
//         name: 'English',
//         marks: [
//           { examType: 'Mid-Term', marks: 70, outOf: 100 },
//           { examType: 'Final', marks: 72, outOf: 100 },
//         ],
//         totalMarks: 142,
//         totalOutOf: 200,
//         percentage: 71,
//         grade: 'B2',
//       },
//     ],
//     totalMarks: 460,
//     totalOutOf: 600,
//     percentage: 76.67,
//     overallGrade: 'B1',
//     examTypes: ['Mid-Term', 'Final'],
//   };

//   const { student, subjects, totalMarks, totalOutOf, percentage, overallGrade, examTypes } = data;

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-6 mt-8 max-w-4xl mx-auto">
//       <div className="text-center mb-4">
//         <h2 className="text-2xl font-bold">R.K.S.V.M. INTER COLLEGE</h2>
//         <p>Makanpur Road, Nyay Khand-1st Indirapuram Gzb</p>
//         <p>09090900621</p>
//         <h3 className="text-xl font-semibold mt-2">PROGRESS REPORT 2023-24</h3>
//         <p>SCHOOL AFFILIATION NO G.J.H-576</p>
//         <p>U-DISE CODE 9100108110</p>
//       </div>
//       <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
//         <div>
//           <p><strong>Student's Name:</strong> {student.name}</p>
//           <p><strong>Mother's Name:</strong> {student.motherName}</p>
//           <p><strong>Father's Name:</strong> {student.fatherName}</p>
//           <p><strong>Date of Birth:</strong> {student.dateOfBirth}</p>
//         </div>
//         <div>
//           <p><strong>Class:</strong> {student.class} {student.section}</p>
//           <p><strong>Roll No.:</strong> {student.rollNo}</p>
//           <p><strong>Admission No.:</strong> {student.admissionNo}</p>
//         </div>
//       </div>
//       <table className="w-full mb-4 text-sm border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border border-gray-300 p-2">SUBJECTS</th>
//             {examTypes.map(examType => (
//               <th key={examType} className="border border-gray-300 p-2">{examType}</th>
//             ))}
//             <th className="border border-gray-300 p-2">TOTAL</th>
//             <th className="border border-gray-300 p-2">%</th>
//             <th className="border border-gray-300 p-2">GRADE</th>
//           </tr>
//         </thead>
//         <tbody>
//           {subjects.map((subject, index) => (
//             <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
//               <td className="border border-gray-300 p-2">{subject.name}</td>
//               {examTypes.map(examType => {
//                 const mark = subject.marks.find(m => m.examType === examType);
//                 return (
//                   <td key={examType} className="border border-gray-300 p-2 text-center">
//                     {mark ? `${mark.marks}/${mark.outOf}` : '-'}
//                   </td>
//                 );
//               })}
//               <td className="border border-gray-300 p-2 text-center">{subject.totalMarks}/{subject.totalOutOf}</td>
//               <td className="border border-gray-300 p-2 text-center">{subject.percentage.toFixed(2)}%</td>
//               <td className="border border-gray-300 p-2 text-center">{subject.grade}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="mb-4 text-sm">
//         <p><strong>Total Marks:</strong> {totalMarks} / {totalOutOf}</p>
//         <p><strong>Percentage:</strong> {percentage.toFixed(2)}%</p>
//         <p><strong>Overall Grade:</strong> {overallGrade}</p>
//       </div>
//       <div className="mb-4 text-sm">
//         <h4 className="font-semibold mb-1">Co-Scholastic Areas</h4>
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border border-gray-300 p-2">Activity</th>
//               <th className="border border-gray-300 p-2">Grade</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr><td className="border border-gray-300 p-2">Work Education</td><td className="border border-gray-300 p-2 text-center">A</td></tr>
//             <tr><td className="border border-gray-300 p-2">Art Education</td><td className="border border-gray-300 p-2 text-center">B</td></tr>
//             <tr><td className="border border-gray-300 p-2">Health & Physical Education</td><td className="border border-gray-300 p-2 text-center">A</td></tr>
//           </tbody>
//         </table>
//       </div>
//       <div className="text-sm">
//         <h4 className="font-semibold mb-1">Discipline</h4>
//         <p>Grade: A</p>
//       </div>
//       <div className="mt-4 text-sm">
//         <h4 className="font-semibold mb-1">Teacher's Remarks</h4>
//         <p>Excellent performance. Keep up the good work!</p>
//       </div>
//       <div className="mt-6 flex justify-between text-sm">
//         <div>Class Teacher's Signature</div>
//         <div>Principal's Signature</div>
//       </div>
//     </div>
//   );
// };

// export default ReportCard;



// import React from 'react';

// interface ReportCardProps {
//   data: {
//     student: {
//       name: string;
//       rollNo: string;
//       class: string;
//       section: string;
//       motherName: string;
//       fatherName: string;
//       dateOfBirth: string;
//       admissionNo: string;
//     };
//     subjects: {
//       name: string;
//       marks: {
//         examType: string;
//         marks: number;
//         outOf: number;
//       }[];
//       totalMarks: number;
//       totalOutOf: number;
//       percentage: number;
//       grade: string;
//     }[];
//     totalMarks: number;
//     totalOutOf: number;
//     percentage: number;
//     overallGrade: string;
//     examTypes: string[];
//   };
// }

// const ReportCard: React.FC<ReportCardProps> = ({ data }) => {
//   const { student, subjects, totalMarks, totalOutOf, percentage, overallGrade, examTypes } = data;

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-6 mt-8 max-w-4xl mx-auto">
//       <div className="text-center mb-4">
//         <h2 className="text-2xl font-bold">R.K.S.V.M. INTER COLLEGE</h2>
//         <p>Makanpur Road, Nyay Khand-1st Indirapuram Gzb</p>
//         <p>09090900621</p>
//         <h3 className="text-xl font-semibold mt-2">PROGRESS REPORT 2023-24</h3>
//         <p>SCHOOL AFFILIATION NO G.J.H-576</p>
//         <p>U-DISE CODE 9100108110</p>
//       </div>
//       <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
//         <div>
//           <p><strong>Student's Name:</strong> {student.name}</p>
//           <p><strong>Mother's Name:</strong> {student.motherName}</p>
//           <p><strong>Father's Name:</strong> {student.fatherName}</p>
//           <p><strong>Date of Birth:</strong> {student.dateOfBirth}</p>
//         </div>
//         <div>
//           <p><strong>Class:</strong> {student.class} {student.section}</p>
//           <p><strong>Roll No.:</strong> {student.rollNo}</p>
//           <p><strong>Admission No.:</strong> {student.admissionNo}</p>
//         </div>
//       </div>
//       <table className="w-full mb-4 text-sm border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border border-gray-300 p-2">SUBJECTS</th>
//             {examTypes.map(examType => (
//               <th key={examType} className="border border-gray-300 p-2">{examType}</th>
//             ))}
//             <th className="border border-gray-300 p-2">TOTAL</th>
//             <th className="border border-gray-300 p-2">%</th>
//             <th className="border border-gray-300 p-2">GRADE</th>
//           </tr>
//         </thead>
//         <tbody>
//           {subjects.map((subject, index) => (
//             <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
//               <td className="border border-gray-300 p-2">{subject.name}</td>
//               {examTypes.map(examType => {
//                 const mark = subject.marks.find(m => m.examType === examType);
//                 return (
//                   <td key={examType} className="border border-gray-300 p-2 text-center">
//                     {mark ? `${mark.marks}/${mark.outOf}` : '-'}
//                   </td>
//                 );
//               })}
//               <td className="border border-gray-300 p-2 text-center">{subject.totalMarks}/{subject.totalOutOf}</td>
//               <td className="border border-gray-300 p-2 text-center">{subject.percentage.toFixed(2)}%</td>
//               <td className="border border-gray-300 p-2 text-center">{subject.grade}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="mb-4 text-sm">
//         <p><strong>Total Marks:</strong> {totalMarks} / {totalOutOf}</p>
//         <p><strong>Percentage:</strong> {percentage.toFixed(2)}%</p>
//         <p><strong>Overall Grade:</strong> {overallGrade}</p>
//       </div>
//       <div className="mb-4 text-sm">
//         <h4 className="font-semibold mb-1">Co-Scholastic Areas</h4>
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border border-gray-300 p-2">Activity</th>
//               <th className="border border-gray-300 p-2">Grade</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr><td className="border border-gray-300 p-2">Work Education</td><td className="border border-gray-300 p-2 text-center">A</td></tr>
//             <tr><td className="border border-gray-300 p-2">Art Education</td><td className="border border-gray-300 p-2 text-center">B</td></tr>
//             <tr><td className="border border-gray-300 p-2">Health & Physical Education</td><td className="border border-gray-300 p-2 text-center">A</td></tr>
//           </tbody>
//         </table>
//       </div>
//       <div className="text-sm">
//         <h4 className="font-semibold mb-1">Discipline</h4>
//         <p>Grade: A</p>
//       </div>
//       <div className="mt-4 text-sm">
//         <h4 className="font-semibold mb-1">Teacher's Remarks</h4>
//         <p>Excellent performance. Keep up the good work!</p>
//       </div>
//       <div className="mt-6 flex justify-between text-sm">
//         <div>Class Teacher's Signature</div>
//         <div>Principal's Signature</div>
//       </div>
//     </div>
//   );
// };

// export default ReportCard;

