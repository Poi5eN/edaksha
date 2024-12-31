import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FaTrash, FaBook, FaCalendar, FaClock } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ViewExam = () => {
    const { currentColor } = useStateContext();
    const authToken = Cookies.get('token');
    const [examData, setExamData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getResult = async () => {
        setLoading(true);
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
            setExamData(response.data.exams);
        } catch (error) {
            console.error("Error fetching exams:", error);
            toast.error(`Error: ${error?.response?.data?.message || "Something went wrong!"}`);
        } finally {
            setLoading(false);
        }
    };
    const handleDelete = async (examId) => {
      setLoading(true)
        try {
            await axios.delete(
                `https://eserver-i5sm.onrender.com/api/v1/exam/deleteExam/${examId}`,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            toast.success('Exam Deleted Successfully')
            getResult() // Refresh exams after delete
        }
        catch (error) {
           toast.error(`Error: ${error?.response?.data?.message || "Something went wrong!"}`);
            console.error("Error deleting exam:", error)
        }
        finally {
           setLoading(false);
        }

    };
    useEffect(() => {
        getResult();
    }, []);
      const formatDate = (dateString) => {
    try{
          const date = new Date(dateString);
         return date.toLocaleDateString(undefined,{
             year:"numeric",
             month:"short",
             day:"numeric"
         })
     }
     catch(e){
         return "N/A"
     }
    };

    return (
        <div className="max-w-7xl mx-auto bg-gray-50 p-6 rounded-lg shadow-xl">
            <div
                className="rounded-tl-lg rounded-tr-lg text-white text-lg py-2 mb-4 flex justify-between items-center px-4"
                style={{ background: currentColor }}
            >
                <p>View Exams</p>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border-b font-medium text-gray-800">Exam Name</th>
                            <th className="px-4 py-2 border-b font-medium text-gray-800">Exam Type</th>
                            <th className="px-4 py-2 border-b font-medium text-gray-800">Class</th>
                            <th className="px-4 py-2 border-b font-medium text-gray-800">Section</th>
                            <th className="px-4 py-2 border-b font-medium text-gray-800">Grade System</th>
                            <th className="px-4 py-2 border-b font-medium text-gray-800">Subjects</th>
                            <th className="px-4 py-2 border-b font-medium text-gray-800">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                             <tr>
                                <td colSpan="7" className="text-center py-4">
                                   Loading Exams...
                                </td>
                             </tr>
                        ):examData.length > 0 ? (
                            examData?.map((exam, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-2 border-b text-gray-700">{exam?.name || exam?.examName}</td>
                                    <td className="px-4 py-2 border-b text-gray-700">{exam?.examType}</td>
                                    <td className="px-4 py-2 border-b text-gray-700">{exam?.className}</td>
                                    <td className="px-4 py-2 border-b text-gray-700">{exam?.section}</td>
                                    <td className="px-4 py-2 border-b text-gray-700">{exam?.gradeSystem || "N/A"}</td>
                                    <td className="px-4 py-2 border-b text-gray-700">
                                        {(exam?.subjects?.length > 0
                                            ? exam?.subjects
                                            : exam?.examInfo
                                        )?.map((subject, subIndex) => (
                                            <div key={subIndex} className="mb-1">
                                               <div className='flex items-center gap-1'>
                                               <FaBook className='text-gray-500'/>
                                               {subject?.name || subject?.subjectName}
                                               </div>
                                                <div className='flex space-x-1 items-center'>
                                                    <FaCalendar className="text-gray-500 text-xs"/>
                                                 <span>
                                                   { formatDate(subject?.examDate) }
                                                 </span>
                                                    <FaClock className="text-gray-500 text-xs"/>
                                                     <span>
                                                    {subject?.startTime} to {subject?.endTime}
                                                </span>
                                                </div>
                                            </div>
                                        ))}
                                    </td>
                                    <td className="px-4 py-2 border-b text-center">
                                        <button
                                            onClick={() => handleDelete(exam._id)}
                                            className="text-red-500 hover:text-red-700 focus:outline-none"
                                             disabled={loading}
                                        >
                                            <FaTrash size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-4">
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

// const ViewExam = () => {
//   const { currentColor } = useStateContext();
//   const authToken = Cookies.get('token');
//   const [examData, setExamData] = useState([]);
//   const getResult = async () => {
//     try {
//       let response = await axios.get(
//         "https://eserver-i5sm.onrender.com/api/v1/exam/getExams",
//         {
//           withCredentials: true,
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );
//       setExamData(response.data.exams); // Save exams data to state
//     } catch (error) {
//       console.error("Error fetching exams:", error);
//     }
//   };
//   const handleDelete = async () => {
//     try {
//       let response = await axios.get(
//         "https://eserver-i5sm.onrender.com/api/v1/exam/deleteMark",
//         {
//           withCredentials: true,
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );
//       setExamData(response.data.exams); // Save exams data to state
//     } catch (error) {
//       console.error("Error fetching exams:", error);
//     }
//   };
// console.log("examData",examData)
//   useEffect(() => {
//     getResult();
//   }, []);

//   return (
//     <div>
//       <div
//         className="rounded-tl-lg border rounded-tr-lg text-white text-[12px] lg:text-lg"
//         style={{ background: currentColor }}
//       >
//         <p className="px-5">View Exam</p>
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
//               <th className="border border-gray-300 p-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {examData.length > 0 ? (
//               examData?.map((exam, index) => (
//                 <tr key={index}>
//                   <td className="border border-gray-300 p-2">{exam?.name || exam?.examName}</td>
//                   <td className="border border-gray-300 p-2">{exam?.examType}</td>
//                   <td className="border border-gray-300 p-2">{exam?.className}</td>
//                   <td className="border border-gray-300 p-2">{exam?.section}</td>
//                   <td className="border border-gray-300 p-2">{exam?.gradeSystem || "N/A"}</td>
//                   <td className="border border-gray-300 p-2">
//                     {(exam?.subjects?.length > 0
//                       ? exam?.subjects
//                       : exam?.examInfo
//                     )?.map((subject, subIndex) => (
//                       <div key={subIndex}>
//                         {subject?.name || subject?.subjectName} ({new Date(subject?.examDate).toLocaleDateString()}) -{" "}
//                         {subject?.startTime} to {subject?.endTime}
//                       </div>
//                     ))}
//                   </td>
//                   <td className="border border-gray-300 p-2">
//                     <p onClick={()=>handleDelete(exam._id)}>Delete</p>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center p-4">
//                   No Exams Found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ViewExam;



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