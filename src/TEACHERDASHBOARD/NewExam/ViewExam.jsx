
import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import axios from 'axios';
import Cookies from 'js-cookie';

const ViewExam = () => {
  const { currentColor } = useStateContext();
  const authToken = Cookies.get('token');
  const [examData, setExamData] = useState([]);
  const getResult = async () => {
    try {
      let response = await axios.get(
        "https://eserver-i5sm.onrender.com/api/v1/exam/getExams",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setExamData(response.data.exams); // Save exams data to state
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };
console.log("examData",examData)
  useEffect(() => {
    getResult();
  }, []);

  return (
    <div>
      <div
        className="rounded-tl-lg border rounded-tr-lg text-white text-[12px] lg:text-lg"
        style={{ background: currentColor }}
      >
        <p className="px-5">View Exam</p>
      </div>
      <div className="">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Exam Name</th>
              <th className="border border-gray-300 p-2">Exam Type</th>
              <th className="border border-gray-300 p-2">Class</th>
              <th className="border border-gray-300 p-2">Section</th>
              <th className="border border-gray-300 p-2">Grade</th>
              <th className="border border-gray-300 p-2">Subjects</th>
            </tr>
          </thead>
          <tbody>
            {examData.length > 0 ? (
              examData?.map((exam, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{exam?.name || exam?.examName}</td>
                  <td className="border border-gray-300 p-2">{exam?.examType}</td>
                  <td className="border border-gray-300 p-2">{exam?.className}</td>
                  <td className="border border-gray-300 p-2">{exam?.section}</td>
                  <td className="border border-gray-300 p-2">{exam?.gradeSystem || "N/A"}</td>
                  <td className="border border-gray-300 p-2">
                    {(exam?.subjects?.length > 0
                      ? exam?.subjects
                      : exam?.examInfo
                    )?.map((subject, subIndex) => (
                      <div key={subIndex}>
                        {subject?.name || subject?.subjectName} ({new Date(subject?.examDate).toLocaleDateString()}) -{" "}
                        {subject?.startTime} to {subject?.endTime}
                      </div>
                    ))}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No Exams Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewExam;



// import React, { useEffect, useState } from 'react';
// import { useStateContext } from '../../contexts/ContextProvider';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { toast } from "react-toastify";
// const [examData,setExamData]=useState([])
// const savedExams = [
//   {
//     name: "Term 1 Exam",
//     examType: "1st-term",
//     className: "10th",
//     section: "A",
//     maxMarks: "500",
//     subjects: [
//       { name: "Math", examDate: "2024-01-10", startTime: "10:00 AM", endTime: "12:00 PM" },
//       { name: "Science", examDate: "2024-01-11", startTime: "10:00 AM", endTime: "12:00 PM" },
//       { name: "English", examDate: "2024-01-12", startTime: "10:00 AM", endTime: "12:00 PM" },
//       { name: "Social Studies", examDate: "2024-01-13", startTime: "10:00 AM", endTime: "12:00 PM" },
//       { name: "Hindi", examDate: "2024-01-14", startTime: "10:00 AM", endTime: "12:00 PM" },
//     ],
//   },
//   {
//     name: "Term 2 Exam",
//     examType: "Mid-term",
//     className: "10th",
//     section: "A",
//     maxMarks: "500",
//     subjects: [
//       { name: "Math", examDate: "2024-01-10", startTime: "10:00 AM", endTime: "12:00 PM" },
//       { name: "Science", examDate: "2024-01-11", startTime: "10:00 AM", endTime: "12:00 PM" },
//       { name: "English", examDate: "2024-01-12", startTime: "10:00 AM", endTime: "12:00 PM" },
//       { name: "Social Studies", examDate: "2024-01-13", startTime: "10:00 AM", endTime: "12:00 PM" },
//       { name: "Hindi", examDate: "2024-01-14", startTime: "10:00 AM", endTime: "12:00 PM" },
//     ],
//   },
// ];

// const ViewExam = () => {
//     const { currentColor } = useStateContext();
//     const authToken = Cookies.get('token');
//     const getResult=async()=>{
//        try {
//       let response= await axios.get("https://eserver-i5sm.onrender.com/api/v1/exam/getExams",
//         {
//           withCredentials: true,
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           }, // Set withCredentials to true
//         }
//       )
//       console.log(response.data);
//       setExamData(response.data);
//        } catch (error) {
        
//        }
//     }


//     useEffect(()=>{
//       getResult()
//     },[])
//   return (
//     <div>
//         <div  className='rounded-tl-lg border rounded-tr-lg text-white  text-[12px] lg:text-lg'
//       style={{background:currentColor}}
//       >
//       <p 
//       className='px-5'
      
//       > View Exam</p>
//       </div>
        
//       <div className="">
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border border-gray-300 p-2">Exam Name</th>
//               <th className="border border-gray-300 p-2">Exam Type</th>
//               <th className="border border-gray-300 p-2">Class</th>
//               <th className="border border-gray-300 p-2">Section</th>
//               <th className="border border-gray-300 p-2">Grade</th>
//               <th className="border border-gray-300 p-2">Subjects</th>
//             </tr>
//           </thead>
//           <tbody>
//             {savedExams.map((exam, index) => (
//               <tr key={index}>
//                 <td className="border border-gray-300 p-2">{exam.name}</td>
//                 <td className="border border-gray-300 p-2">{exam.examType}</td>
//                 <td className="border border-gray-300 p-2">{exam.className}</td>
//                 <td className="border border-gray-300 p-2">{exam.section}</td>
//                 <td className="border border-gray-300 p-2">{exam.maxMarks}</td>
//                 <td className="border border-gray-300 p-2">
//                   {exam.subjects.map((subject, subIndex) => (
//                     <div key={subIndex}>
//                       {subject.name} ({subject.examDate}) - {subject.startTime} to {subject.endTime}
//                     </div>
//                   ))}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ViewExam;


// import React from 'react'

// const ViewExam = () => {
//   return (
//     <div>
//          <div className="mt-6">
//           <h2 className="text-xl font-bold mb-4">Saved Exams</h2>
//           <table className="w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border border-gray-300 p-2">Exam Name</th>
//                 <th className="border border-gray-300 p-2">Exam Type</th>
//                 <th className="border border-gray-300 p-2">Class</th>
//                 <th className="border border-gray-300 p-2">Section</th>
//                 <th className="border border-gray-300 p-2">Grade</th>
//                 <th className="border border-gray-300 p-2">Subjects</th>
//               </tr>
//             </thead>
//             <tbody>
//               {savedExams.map((exam, index) => (
//                 <tr key={index}>
//                   <td className="border border-gray-300 p-2">{exam.name}</td>
//                   <td className="border border-gray-300 p-2">{exam.examType}</td>
//                   <td className="border border-gray-300 p-2">{exam.className}</td>
//                   <td className="border border-gray-300 p-2">{exam.section}</td>
//                   <td className="border border-gray-300 p-2">{exam.maxMarks}</td>
//                   <td className="border border-gray-300 p-2">
//                     {exam.subjects.map((subject, subIndex) => (
//                       <div key={subIndex}>
//                         {subject.name} ({subject.examDate}) - {subject.startTime} to {subject.endTime}
//                       </div>
//                     ))}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//     </div>
//   )
// }

// export default ViewExam