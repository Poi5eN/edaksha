import React, { useState } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { FaPlus, FaCalendar, FaClock, FaCheckCircle, FaTimesCircle, FaBook } from 'react-icons/fa';


export default function CreateExam() {
  const { currentColor, teacherRoleData } = useStateContext();
  const authToken = Cookies.get('token');
  const [examCreated, setExamCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [examData, setExamData] = useState({
    examName: '',
    examType: '',
    className: '',
    section: '',
    startDate: '',
    endDate: '',
    Grade: "",
    resultPublishDate: '',
    subjects: [],
  });

  const [savedExams, setSavedExams] = useState([]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExamData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...examData.subjects];
    updatedSubjects[index] = { ...updatedSubjects[index], [field]: value };
    setExamData((prevData) => ({ ...prevData, subjects: updatedSubjects }));
  };

  const addSubject = () => {
    setExamData((prevData) => ({
      ...prevData,
      subjects: [
        ...prevData.subjects,
        { name: '', examDate: '', startTime: '', endTime: '', totalMarks: '', passingMarks: '' },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
        !examData?.examName ||
        !examData?.examType ||
        !teacherRoleData?.classTeacher ||
        !teacherRoleData?.section ||
        !examData?.Grade ||
        !examData?.startDate ||
        !examData?.endDate ||
        !examData?.resultPublishDate ||
        examData?.subjects.length === 0
      ) {
        toast.error("Please fill in all the required fields!");
        setLoading(false);
        return;
      }
    let payload = {
      "name": examData?.examName,
      "examType": examData?.examType,
      "className": teacherRoleData?.classTeacher,
      "section": teacherRoleData?.section,
      "gradeSystem": examData?.Grade,
      "startDate": examData?.startDate,
      "endDate": examData?.endDate,
      "resultPublishDate": examData?.resultPublishDate,
      subjects: examData?.subjects,
    };

    try {
      await axios.post("https://eserver-i5sm.onrender.com/api/v1/exam/createExams", payload, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        }
      });
      setExamData({
        examName: '',
        examType: '',
        startDate: '',
        endDate: '',
        resultPublishDate: '',
        subjects: [],
        Grade: ""
      });
      toast.success("Exam Created Successfully!");
      setExamCreated(!examCreated);
      setLoading(false);
    } catch (error) {
      setLoading(false);
        console.log("error", error)
        toast.error(`Error: ${error?.response?.data?.message || "Something went wrong!"}`);
    }
  };
    const removeSubject = (index) => {
        const updatedSubjects = examData.subjects.filter((_, i) => i !== index);
        setExamData((prevData) => ({ ...prevData, subjects: updatedSubjects }));
      };
  return (
    <div className="max-w-4xl mx-auto bg-gray-50 p-6 rounded-lg shadow-xl">
      
      <div
        className="rounded-tl-lg rounded-tr-lg text-white text-lg py-2 mb-4 flex justify-between items-center px-4"
        style={{ background: currentColor }}
      >
        <p>Create Exam</p>
       {/*  <FaCheckCircle className="text-white"  /> */}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-md">
        
          <div>
            <label className="block text-sm font-medium text-gray-700">Exam Name</label>
            <input
              type="text"
              name="examName"
              value={examData.examName}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Exam Type</label>
            <select
              name="examType"
              value={examData.examType}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
            >
              <option value="">Select Exam Type</option>
              <option value="TERM">Term</option>
              <option value="UNIT_TEST">Unit Test</option>
              <option value="FINAL">Final</option>
              <option value="ENTRANCE">Entrance</option>
              <option value="COMPETITIVE">Competitive</option>
            </select>
          </div>

            <div>
            <label className="block text-sm font-medium text-gray-700">Grade System</label>
            <select
              name="Grade"
              value={examData.Grade}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
            >
              <option value="">Grade System</option>
              <option value="Percentage">Percentage</option>
              <option value="Grade">Grade</option>
              <option value="CGPA">CGPA</option>

            </select>
          </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <div className="relative">
                <input
                  type="date"
                  name="startDate"
                  value={examData.startDate}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200 focus:outline-none pr-10" // Added padding for the icon
                />
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <FaCalendar className="text-gray-500" />
                </div>
              </div>
            </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <div className="relative">
                <input
                  type="date"
                  name="endDate"
                  value={examData.endDate}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200 focus:outline-none pr-10" // Added padding for the icon
                />
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <FaCalendar className="text-gray-500" />
                </div>
              </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Result Publish Date</label>
             <div className="relative">
                <input
                  type="date"
                  name="resultPublishDate"
                  value={examData.resultPublishDate}
                  onChange={handleInputChange}
                  required
                 className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200 focus:outline-none pr-10"
                />
                   <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <FaCalendar className="text-gray-500" />
                </div>
              </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold text-gray-800">Subjects</h3>
            <button
              type="button"
              onClick={addSubject}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded flex items-center space-x-1"
            >
                <FaPlus/>
              <span>Add Subject</span>
            </button>
          </div>
          {examData.subjects.map((subject, index) => (
            <div key={index} className="border p-4 mb-2 rounded-md  grid grid-cols-1 md:grid-cols-6 gap-3">
                <div>
                <label className="block text-sm font-medium text-gray-700">Subject Name</label>
                <input
                  type="text"
                  value={subject.name}
                  onChange={(e) =>
                    handleSubjectChange(index, 'name', e.target.value)
                  }
                  className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
                  required
                />
              </div>
              
                <div>
                <label className="block text-sm font-medium text-gray-700">Exam Date</label>
               <div className="relative">
                <input
                  type="date"
                  value={subject.examDate}
                  onChange={(e) =>
                    handleSubjectChange(index, 'examDate', e.target.value)
                  }
                  className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200 focus:outline-none pr-10"
                  required
                />
                   <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <FaCalendar className="text-gray-500" />
                </div>
                  </div>
              </div>
              <div className='col-span-2 flex space-x-2'>
              <div>
              <label className="block text-sm font-medium text-gray-700">Start Time</label>
                  <div className="relative">
                <input
                  type="time"
                  value={subject.startTime}
                  onChange={(e) =>
                    handleSubjectChange(index, 'startTime', e.target.value)
                  }
                  className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200 focus:outline-none pr-10"
                  required
                />
                 <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <FaClock className="text-gray-500" />
                  </div>
                  </div>
                </div>
                
              <div>
                <label className="block text-sm font-medium text-gray-700">End Time</label>
                   <div className="relative">
                <input
                  type="time"
                  value={subject.endTime}
                  onChange={(e) =>
                    handleSubjectChange(index, 'endTime', e.target.value)
                  }
                  className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200 focus:outline-none pr-10"
                  required
                />
                 <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <FaClock className="text-gray-500" />
                </div>
                  </div>
              </div>
             </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Marks</label>
                <input
                  type="number"
                  value={subject.totalMarks}
                  onChange={(e) =>
                    handleSubjectChange(index, 'totalMarks', e.target.value)
                  }
                  className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Passing Marks</label>
                <input
                  type="number"
                  value={subject.passingMarks}
                  onChange={(e) =>
                    handleSubjectChange(index, 'passingMarks', e.target.value)
                  }
                  className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
                  required
                />
              </div>
              <div className="flex items-center justify-center">
              <button
                  type="button"
                  onClick={() => removeSubject(index)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                     <FaTimesCircle size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md focus:outline-none disabled:bg-indigo-300 disabled:cursor-not-allowed"
          disabled={loading}
        >
           {loading ?  'Saving Exam...' : 'Save Exam'}
        </button>
      </form>


    </div>
  );
}



// import React, { useState } from 'react';
// import { useStateContext } from '../../contexts/ContextProvider';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { toast } from "react-toastify";
// export default function CreateExam() {
//   const { currentColor,teacherRoleData} = useStateContext();
//   const authToken = Cookies.get('token');
//   const [examCreated, setExamCreated] = useState(false); 
//   const [loading, setLoading] = useState(false);
//   const [examData, setExamData] = useState({
//     examName: '',
//     examType: '',
//     className: '',
//     section: '',
//     startDate: '',
//     endDate: '',
//     Grade:"",
//     resultPublishDate: '',
//     subjects: [],
    
//   });

//   // console.log("teacherRoleData",teacherRoleData)
//   const [savedExams, setSavedExams] = useState([]); // To store all submitted exams
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setExamData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubjectChange = (index, field, value) => {
//     const updatedSubjects = [...examData.subjects];
//     updatedSubjects[index] = { ...updatedSubjects[index], [field]: value };
//     setExamData((prevData) => ({ ...prevData, subjects: updatedSubjects }));
//   };

//   const addSubject = () => {
//     setExamData((prevData) => ({
//       ...prevData,
//       subjects: [
//         ...prevData.subjects,
//         { name: '', examDate: '', startTime: '', endTime: '', totalMarks: '', passingMarks: '' },
//       ],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     if (
//       !examData?.examName ||
//       !examData?.examType ||
//       !teacherRoleData?.classTeacher ||
//       !teacherRoleData?.section ||
//       !examData?.Grade ||
//       !examData?.startDate ||
//       !examData?.endDate ||
//       !examData?.resultPublishDate ||
//       examData?.subjects.length === 0
//     ) {
//       alert("Please fill in all the required fields!");
//       setLoading(false);
//       return;
//     }
//     let payload={
//       "name": examData?.examName,
//       "examType": examData?.examType,
//       "className":teacherRoleData?.classTeacher,
//       "section": teacherRoleData?.section,
//       "gradeSystem":examData?.Grade,
//       "startDate":examData?.startDate,
//       "endDate":examData?.endDate,
//       "resultPublishDate":examData?.resultPublishDate,
//       subjects:examData?.subjects,
//     }

//     try {
//       await axios.post("https://eserver-i5sm.onrender.com/api/v1/exam/createExams", payload, {
//         withCredentials: true,
//       headers: {
//         Authorization: `Bearer ${authToken}`,
//         'Content-Type': 'application/json',
//       }
//       })
//       setExamData({
//         examName: '',
//         examType: '',    
//         startDate: '',
//         endDate: '',
//         resultPublishDate: '',
//         subjects: [],
//         Grade:""
//       });
//       toast.success("Created")
//       setExamCreated(!examCreated);
//       // setIsModalOpen(false);
//       setLoading(false);
//       alert('Exam saved successfully!');
//     }
//     catch (error) {
   
//        setLoading(false);
//       //  toast.error("error",error)
//       console.log("error", error)
//     }
//   };

//   return (
//     <div className=" mx-auto">
//       <div  className='rounded-tl-lg border rounded-tr-lg text-white  text-[12px] lg:text-lg'
//       //  style={{ background: `linear-gradient(to bottom, ${currentColor}, ${"#8d8b8b"})` }}
//       style={{background:currentColor}}
//       >
//       <p 
//       className='px-5'
      
//       >Create Exam</p>
//       </div>
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-2 shadow-md rounded-md space-y-4 "
//       >
//         <div className="border p-4 mb-2 rounded space-y-2 grid md:grid-cols-4 gap-2">

//           <div>
//             <label className="block text-[12px] lg:text-lg">Exam Name</label>
//             <input
//               type="text"
//               name="examName"
//               value={examData.examName}
//               onChange={handleInputChange}
//               required
//               className="w-full border outline-none text-[12px] lg:text-lg  px-2"
//             />
//           </div>
       
//           <div>
//             <label className="block text-[12px] lg:text-lg">Exam Type</label>
//             <select
//               name="examType"
//               value={examData.examType}
//               onChange={handleInputChange}
//               required
//               className="w-full border outline-none text-[12px] lg:text-lg  px-2"
//             >
//               <option value="">Select Exam Type</option>
//               <option value="TERM">Term</option>
//               <option value="UNIT_TEST">Unit Test</option>
//               <option value="FINAL">Final</option>
//               <option value="ENTRANCE">Entrance</option>
//               <option value="COMPETITIVE">Competitive</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-[12px] lg:text-lg">Grade System</label>
//             <select
//               name="Grade"
//               value={examData.Grade}
//               onChange={handleInputChange}
//               required
//               className="w-full border outline-none text-[12px] lg:text-lg  px-2"
//             >
//               <option value="">Grade System</option>
//               <option value="Percentage">Percentage</option>
//               <option value="Grade">Grade</option>
//               <option value="CGPA">CGPA</option>
              
//             </select>
//           </div>

//           <div>
//             <label className="block text-[12px] lg:text-lg">Start Date</label>
//             <input
//               type="date"
//               name="startDate"
//               value={examData.startDate}
//               onChange={handleInputChange}
//               required
//               className="w-full border outline-none text-[12px] lg:text-lg  px-2"
//             />
//           </div>

//           <div>
//             <label className="block text-[12px] lg:text-lg">End Date</label>
//             <input
//               type="date"
//               name="endDate"
//               value={examData.endDate}
//               onChange={handleInputChange}
//               required
//               className="w-full border outline-none text-[12px] lg:text-lg  px-2"
//             />
//           </div>

//           <div>
//             <label className="block text-[12px] lg:text-lg">Result Publish Date</label>
//             <input
//               type="date"
//               name="resultPublishDate"
//               value={examData.resultPublishDate}
//               onChange={handleInputChange}
//               required
//               className="w-full border outline-none text-[12px] lg:text-lg  px-2"
//             />
//           </div>
//         </div>

//         <div>
//           <h3 className="text-lg font-bold">Subjects</h3>
//           {examData.subjects.map((subject, index) => (
//             <div key={index} className="border p-2 mb-2 rounded  gap-3 grid md:grid-cols-6 outline-none text-[12px] lg:text-lg ">
//               <div>
//                 <label className="block text-[12px] lg:text-lg">Subject Name</label>
//                 <input
//                   type="text"
//                   value={subject.name}
//                   onChange={(e) =>
//                     handleSubjectChange(index, 'name', e.target.value)
//                   }
//                   className="w-full border outline-none text-[12px] lg:text-lg  px-2"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-[12px] lg:text-lg">Exam Date</label>
//                 <input
//                   type="date"
//                   value={subject.examDate}
//                   onChange={(e) =>
//                     handleSubjectChange(index, 'examDate', e.target.value)
//                   }
//                   className="w-full border outline-none text-[12px] lg:text-lg  px-2"
//                   required
//                 />
//               </div>
//              <div className='flex gap-10'>
//              <div>
//                 <label className="block text-[12px] lg:text-lg">Start Time</label>
//                 <input
//                   type="time"
//                   value={subject.startTime}
//                   onChange={(e) =>
//                     handleSubjectChange(index, 'startTime', e.target.value)
//                   }
//                   className="w-full border outline-none text-[12px] lg:text-lg  px-2"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-[12px] lg:text-lg">End Time</label>
//                 <input
//                   type="time"
//                   value={subject.endTime}
//                   onChange={(e) =>
//                     handleSubjectChange(index, 'endTime', e.target.value)
//                   }
//                   className="w-full border outline-none text-[12px] lg:text-lg  px-2"
//                   required
//                 />
//               </div>
//               </div>
//               <div>
//                 <label className="block text-[12px] lg:text-lg">Total Marks</label>

//                 <input
//                   type="number"
//                   value={subject.totalMarks}
//                   onChange={(e) =>
//                     handleSubjectChange(index, 'totalMarks', e.target.value)
//                   }
//                   className="w-full border outline-none text-[12px] lg:text-lg  px-2"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-[12px] lg:text-lg">Passing Marks</label>
//                 <input
//                   type="number"
//                   value={subject.passingMarks}
//                   onChange={(e) =>
//                     handleSubjectChange(index, 'passingMarks', e.target.value)
//                   }
//                   className="w-full border outline-none text-[12px] lg:text-lg px-2"
//                   required
//                 />
//               </div>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addSubject}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Add Subject
//           </button>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-green-500 text-white py-1 rounded hover:bg-green-600"
//         >
//           Save Exam
//         </button>
//       </form>

//       {/* Table Section */}
//       {savedExams.length > 0 && (
//         <div className="mt-6">
//           <h2 className="text-xl font-bold mb-4">Saved Exams</h2>
//           <table className="w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border border-gray-300 p-2">Exam Name</th>
//                 <th className="border border-gray-300 p-2">Exam Type</th>
//                 <th className="border border-gray-300 p-2">Class</th>
//                 <th className="border border-gray-300 p-2">Section</th>
//                 <th className="border border-gray-300 p-2">Max Marks</th>
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
//       )}
//     </div>
//   );
// }



// import React, { useState } from 'react';

// export default function CreateExam() {
//   const [examData, setExamData] = useState({
//     name: '',
//     examType: '',
//     className: '',
//     section: '',
//     subjects: [],
//     maxMarks: 0,
//     startDate: '',
//     endDate: '',
//     resultPublishDate: '',
//   });

//   const [savedExams, setSavedExams] = useState([]); // To store submitted exams

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setExamData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubjectChange = (index, field, value) => {
//     const updatedSubjects = [...examData.subjects];
//     updatedSubjects[index] = { ...updatedSubjects[index], [field]: value };
//     setExamData((prevData) => ({ ...prevData, subjects: updatedSubjects }));
//   };

//   const addSubject = () => {
//     setExamData((prevData) => ({
//       ...prevData,
//       subjects: [
//         ...prevData.subjects,
//         { name: '', examDate: '', startTime: '', endTime: '', totalMarks: 0, passingMarks: 0 },
//       ],
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Add the current exam to the list of saved exams
//     setSavedExams((prevExams) => [...prevExams, examData]);

//     // Reset form for reuse
//     setExamData({
//       name: '',
//       examType: '',
//       className: '',
//       section: '',
//       subjects: [],
//       maxMarks: 0,
//       startDate: '',
//       endDate: '',
//       resultPublishDate: '',
//     });

//     alert('Exam created and saved successfully!');
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       {/* Form Section */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 shadow-md rounded-md space-y-6"
//       >
//         <h2 className="text-2xl font-bold mb-4">Create Exam</h2>

//         <div>
//           <label className="block font-sm mb-1">Exam Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={examData.name}
//             onChange={handleInputChange}
//             required
//             className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block font-sm mb-1">Exam Type:</label>
//           <select
//             name="examType"
//             value={examData.examType}
//             onChange={handleInputChange}
//             required
//             className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Select Exam Type</option>
//             <option value="TERM">Term</option>
//             <option value="UNIT_TEST">Unit Test</option>
//             <option value="FINAL">Final</option>
//             <option value="ENTRANCE">Entrance</option>
//             <option value="COMPETITIVE">Competitive</option>
//           </select>
//         </div>
//         <div>
//           <label className="block font-sm mb-1">Class:</label>
//           <input
//             type="text"
//             name="className"
//             value={examData.className}
//             onChange={handleInputChange}
//             required
//             className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block font-sm mb-1">Section:</label>
//           <input
//             type="text"
//             name="section"
//             value={examData.section}
//             onChange={handleInputChange}
//             required
//             className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block font-sm mb-1">Max Marks:</label>
//           <input
//             type="number"
//             name="maxMarks"
//             value={examData.maxMarks}
//             onChange={handleInputChange}
//             required
//             className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block font-sm mb-1">Start Date:</label>
//           <input
//             type="date"
//             name="startDate"
//             value={examData.startDate}
//             onChange={handleInputChange}
//             required
//             className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block font-sm mb-1">End Date:</label>
//           <input
//             type="date"
//             name="endDate"
//             value={examData.endDate}
//             onChange={handleInputChange}
//             required
//             className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block font-sm mb-1">Result Publish Date:</label>
//           <input
//             type="date"
//             name="resultPublishDate"
//             value={examData.resultPublishDate}
//             onChange={handleInputChange}
//             required
//             className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Subjects</h3>
//           {examData.subjects.map((subject, index) => (
//             <div key={index} className="space-y-2 mb-4">
//               <label className="block font-sm mb-1">Subject Name:</label>
//               <input
//                 type="text"
//                 value={subject.name}
//                 onChange={(e) =>
//                   handleSubjectChange(index, 'name', e.target.value)
//                 }
//                 required
//                 className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <label className="block font-sm mb-1">Exam Date:</label>
//               <input
//                 type="date"
//                 value={subject.examDate}
//                 onChange={(e) =>
//                   handleSubjectChange(index, 'examDate', e.target.value)
//                 }
//                 required
//                 className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <label className="block font-sm mb-1">Start Time:</label>
//               <input
//                 type="time"
//                 value={subject.startTime}
//                 onChange={(e) =>
//                   handleSubjectChange(index, 'startTime', e.target.value)
//                 }
//                 required
//                 className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <label className="block font-sm mb-1">End Time:</label>
//               <input
//                 type="time"
//                 value={subject.endTime}
//                 onChange={(e) =>
//                   handleSubjectChange(index, 'endTime', e.target.value)
//                 }
//                 required
//                 className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <label className="block font-sm mb-1">Total Marks:</label>
//               <input
//                 type="number"
//                 value={subject.totalMarks}
//                 onChange={(e) =>
//                   handleSubjectChange(index, 'totalMarks', e.target.value)
//                 }
//                 required
//                 className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <label className="block font-sm mb-1">Passing Marks:</label>
//               <input
//                 type="number"
//                 value={subject.passingMarks}
//                 onChange={(e) =>
//                   handleSubjectChange(index, 'passingMarks', e.target.value)
//                 }
//                 required
//                 className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addSubject}
//             className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//           >
//             Add Subject
//           </button>
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600"
//         >
//           Create Exam
//         </button>
//       </form>

//       {/* Render Saved Exams */}
//       {savedExams.length > 0 && (
//         <div className="mt-8">
//           <h2 className="text-2xl font-bold mb-4">Saved Exams</h2>
//           <table className="table-auto w-full border-collapse border border-gray-300">
//             <thead>
//               <tr>
//                 <th className="border border-gray-300 p-2">Exam Name</th>
//                 <th className="border border-gray-300 p-2">Class</th>
//                 <th className="border border-gray-300 p-2">Section</th>
//                 <th className="border border-gray-300 p-2">Subjects</th>
//               </tr>
//             </thead>
//             <tbody>
//               {savedExams.map((exam, idx) => (
//                 <tr key={idx}>
//                   <td className="border border-gray-300 p-2">{exam.name}</td>
//                   <td className="border border-gray-300 p-2">{exam.className}</td>
//                   <td class
// className="border border-gray-300 p-2">{exam.section}</td>
// <td className="border border-gray-300 p-2">
//   {exam.subjects.map((subject, subIdx) => (
//     <div key={subIdx}>
//       {subject.name} - {subject.examDate}
//     </div>
//   ))}
// </td>
// </tr>
// ))}
// </tbody>
// </table>
// </div>
// )}
// </div>
// );
// }



// import React, { useState } from 'react';

// export default function CreateExam() {
//   const [examData, setExamData] = useState({
//     name: '',
//     examType: '',
//     className: '',
//     section: '',
//     subjects: [],
//     maxMarks: 0,
//     startDate: '',
//     endDate: '',
//     resultPublishDate: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setExamData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubjectChange = (index, field, value) => {
//     const updatedSubjects = [...examData.subjects];
//     updatedSubjects[index] = { ...updatedSubjects[index], [field]: value };
//     setExamData((prevData) => ({ ...prevData, subjects: updatedSubjects }));
//   };

//   const addSubject = () => {
//     setExamData((prevData) => ({
//       ...prevData,
//       subjects: [
//         ...prevData.subjects,
//         { name: '', examDate: '', startTime: '', endTime: '', totalMarks: 0, passingMarks: 0 },
//       ],
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Exam Data:', examData);
//     alert('Exam created successfully!');
//     // Reset form for reuse
//     setExamData({
//       name: '',
//       examType: '',
//       className: '',
//       section: '',
//       subjects: [],
//       maxMarks: 0,
//       startDate: '',
//       endDate: '',
//       resultPublishDate: '',
//     });
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-md space-y-6"
//     >
//       <div>
//         <label className="block font-sm mb-1">Exam Name:</label>
//         <input
//           type="text"
//           name="name"
//           value={examData.name}
//           onChange={handleInputChange}
//           required
//           className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <div>
//         <label className="block font-sm mb-1">Exam Type:</label>
//         <select
//           name="examType"
//           value={examData.examType}
//           onChange={handleInputChange}
//           required
//           className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="">Select Exam Type</option>
//           <option value="TERM">Term</option>
//           <option value="UNIT_TEST">Unit Test</option>
//           <option value="FINAL">Final</option>
//           <option value="ENTRANCE">Entrance</option>
//           <option value="COMPETITIVE">Competitive</option>
//         </select>
//       </div>
//       <div>
//         <label className="block font-sm mb-1">Class:</label>
//         <input
//           type="text"
//           name="className"
//           value={examData.className}
//           onChange={handleInputChange}
//           required
//           className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <div>
//         <label className="block font-sm mb-1">Section:</label>
//         <input
//           type="text"
//           name="section"
//           value={examData.section}
//           onChange={handleInputChange}
//           required
//           className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <div>
//         <label className="block font-sm mb-1">Max Marks:</label>
//         <input
//           type="number"
//           name="maxMarks"
//           value={examData.maxMarks}
//           onChange={handleInputChange}
//           required
//           className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <div>
//         <label className="block font-sm mb-1">Start Date:</label>
//         <input
//           type="date"
//           name="startDate"
//           value={examData.startDate}
//           onChange={handleInputChange}
//           required
//           className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <div>
//         <label className="block font-sm mb-1">End Date:</label>
//         <input
//           type="date"
//           name="endDate"
//           value={examData.endDate}
//           onChange={handleInputChange}
//           required
//           className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <div>
//         <label className="block font-sm mb-1">Result Publish Date:</label>
//         <input
//           type="date"
//           name="resultPublishDate"
//           value={examData.resultPublishDate}
//           onChange={handleInputChange}
//           required
//           className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <div>
//         <h3 className="text-lg font-semibold mb-2">Subjects</h3>
//         {examData.subjects.map((subject, index) => (
//           <div key={index} className="space-y-2 mb-4">
//             <label className="block font-sm mb-1">Subject Name:</label>
//             <input
//               type="text"
//               value={subject.name}
//               onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
//               required
//               className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <label className="block font-sm mb-1">Exam Date:</label>
//             <input
//               type="date"
//               value={subject.examDate}
//               onChange={(e) => handleSubjectChange(index, 'examDate', e.target.value)}
//               required
//               className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <label className="block font-sm mb-1">Start Time:</label>
//             <input
//               type="time"
//               value={subject.startTime}
//               onChange={(e) => handleSubjectChange(index, 'startTime', e.target.value)}
//               required
//               className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <label className="block font-sm mb-1">End Time:</label>
//             <input
//               type="time"
//               value={subject.endTime}
//               onChange={(e) => handleSubjectChange(index, 'endTime', e.target.value)}
//               required
//               className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <label className="block font-sm mb-1">Total Marks:</label>
//             <input
//               type="number"
//               value={subject.totalMarks}
//               onChange={(e) => handleSubjectChange(index, 'totalMarks', e.target.value)}
//               required
//               className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <label className="block font-sm mb-1">Passing Marks:</label>
//             <input
//               type="number"
//               value={subject.passingMarks}
//               onChange={(e) => handleSubjectChange(index, 'passingMarks', e.target.value)}
//               required
//               className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={addSubject}
//           className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//         >
//           Add Subject
//         </button>
//       </div>
//       <button
//         type="submit"
//         className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600"
//       >
//         Create Exam
//       </button>
//     </form>
//   );
// }




// import React, { useState } from 'react';
// import { api } from '../api/api';
// import { Button, Input, Select, DatePicker } from '@/components/ui';

// export default function CreateExam() {
//   const [examData, setExamData] = useState({
//     name: '',
//     examType: '',
//     className: '',
//     section: '',
//     subjects: [],
//     maxMarks: 0,
//     startDate: '',
//     endDate: '',
//     resultPublishDate: '',
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setExamData(prevData => ({ ...prevData, [name]: value }));
//   };

//   const handleDateChange = (name: string) => (date: Date | null) => {
//     setExamData(prevData => ({ ...prevData, [name]: date }));
//   };

//   const handleSubjectChange = (index: number, field: string, value: string | number) => {
//     const updatedSubjects = [...examData.subjects];
//     updatedSubjects[index] = { ...updatedSubjects[index], [field]: value };
//     setExamData(prevData => ({ ...prevData, subjects: updatedSubjects }));
//   };

//   const addSubject = () => {
//     setExamData(prevData => ({
//       ...prevData,
//       subjects: [
//         ...prevData.subjects,
//         { name: '', examDate: '', startTime: '', endTime: '', totalMarks: 0, passingMarks: 0 }
//       ]
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await api.createExam(examData);
//       alert('Exam created successfully!');
//       // Reset form or redirect
//     } catch (error) {
//       console.error('Error creating exam:', error);
//       alert('Failed to create exam. Please try again.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <Input
//         label="Exam Name"
//         name="name"
//         value={examData.name}
//         onChange={handleInputChange}
//         required
//       />
//       <Select
//         label="Exam Type"
//         name="examType"
//         value={examData.examType}
//         onChange={handleInputChange}
//         required
//       >
//         <option value="">Select Exam Type</option>
//         <option value="TERM">Term</option>
//         <option value="UNIT_TEST">Unit Test</option>
//         <option value="FINAL">Final</option>
//         <option value="ENTRANCE">Entrance</option>
//         <option value="COMPETITIVE">Competitive</option>
//       </Select>
//       <Input
//         label="Class"
//         name="className"
//         value={examData.className}
//         onChange={handleInputChange}
//         required
//       />
//       <Input
//         label="Section"
//         name="section"
//         value={examData.section}
//         onChange={handleInputChange}
//         required
//       />
//       <Input
//         label="Max Marks"
//         name="maxMarks"
//         type="number"
//         value={examData.maxMarks}
//         onChange={handleInputChange}
//         required
//       />
//       <DatePicker
//         label="Start Date"
//         selected={examData.startDate}
//         onChange={handleDateChange('startDate')}
//         required
//       />
//       <DatePicker
//         label="End Date"
//         selected={examData.endDate}
//         onChange={handleDateChange('endDate')}
//         required
//       />
//       <DatePicker
//         label="Result Publish Date"
//         selected={examData.resultPublishDate}
//         onChange={handleDateChange('resultPublishDate')}
//         required
//       />
//       <div>
//         <h3 className="text-lg font-semibold mb-2">Subjects</h3>
//         {examData.subjects.map((subject, index) => (
//           <div key={index} className="space-y-2 mb-4">
//             <Input
//               label="Subject Name"
//               value={subject.name}
//               onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
//               required
//             />
//             <DatePicker
//               label="Exam Date"
//               selected={subject.examDate}
//               onChange={(date) => handleSubjectChange(index, 'examDate', date)}
//               required
//             />
//             <Input
//               label="Start Time"
//               type="time"
//               value={subject.startTime}
//               onChange={(e) => handleSubjectChange(index, 'startTime', e.target.value)}
//               required
//             />
//             <Input
//               label="End Time"
//               type="time"
//               value={subject.endTime}
//               onChange={(e) => handleSubjectChange(index, 'endTime', e.target.value)}
//               required
//             />
//             <Input
//               label="Total Marks"
//               type="number"
//               value={subject.totalMarks}
//               onChange={(e) => handleSubjectChange(index, 'totalMarks', parseInt(e.target.value))}
//               required
//             />
//             <Input
//               label="Passing Marks"
//               type="number"
//               value={subject.passingMarks}
//               onChange={(e) => handleSubjectChange(index, 'passingMarks', parseInt(e.target.value))}
//               required
//             />
//           </div>
//         ))}
//         <Button type="button" onClick={addSubject}>Add Subject</Button>
//       </div>
//       <Button type="submit">Create Exam</Button>
//     </form>
//   );
// }

