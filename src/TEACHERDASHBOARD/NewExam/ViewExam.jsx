


import React from 'react';
import { useStateContext } from '../../contexts/ContextProvider';

const savedExams = [
  {
    name: "Term 1 Exam",
    examType: "1st-term",
    className: "10th",
    section: "A",
    maxMarks: "500",
    subjects: [
      { name: "Math", examDate: "2024-01-10", startTime: "10:00 AM", endTime: "12:00 PM" },
      { name: "Science", examDate: "2024-01-11", startTime: "10:00 AM", endTime: "12:00 PM" },
      { name: "English", examDate: "2024-01-12", startTime: "10:00 AM", endTime: "12:00 PM" },
      { name: "Social Studies", examDate: "2024-01-13", startTime: "10:00 AM", endTime: "12:00 PM" },
      { name: "Hindi", examDate: "2024-01-14", startTime: "10:00 AM", endTime: "12:00 PM" },
    ],
  },
  {
    name: "Term 2 Exam",
    examType: "Mid-term",
    className: "10th",
    section: "A",
    maxMarks: "500",
    subjects: [
      { name: "Math", examDate: "2024-01-10", startTime: "10:00 AM", endTime: "12:00 PM" },
      { name: "Science", examDate: "2024-01-11", startTime: "10:00 AM", endTime: "12:00 PM" },
      { name: "English", examDate: "2024-01-12", startTime: "10:00 AM", endTime: "12:00 PM" },
      { name: "Social Studies", examDate: "2024-01-13", startTime: "10:00 AM", endTime: "12:00 PM" },
      { name: "Hindi", examDate: "2024-01-14", startTime: "10:00 AM", endTime: "12:00 PM" },
    ],
  },
];

const ViewExam = () => {
    const { currentColor } = useStateContext();
  return (
    <div>
        <div  className='rounded-tl-lg border rounded-tr-lg text-white  text-[12px] lg:text-lg'
      style={{background:currentColor}}
      >
      <p 
      className='px-5'
      
      > View Exam</p>
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
            {savedExams.map((exam, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{exam.name}</td>
                <td className="border border-gray-300 p-2">{exam.examType}</td>
                <td className="border border-gray-300 p-2">{exam.className}</td>
                <td className="border border-gray-300 p-2">{exam.section}</td>
                <td className="border border-gray-300 p-2">{exam.maxMarks}</td>
                <td className="border border-gray-300 p-2">
                  {exam.subjects.map((subject, subIndex) => (
                    <div key={subIndex}>
                      {subject.name} ({subject.examDate}) - {subject.startTime} to {subject.endTime}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewExam;


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