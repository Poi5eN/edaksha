// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import Cookies from 'js-cookie';
// // import { useStateContext } from "../contexts/ContextProvider";
// // import { Button } from '@mui/material';
// // import { toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";



// // const CreateExams = () => {
// //   const authToken = Cookies.get('token');
// //   const [loading, setLoading] = useState(false);
// //   const { currentColor} = useStateContext();
// //   const data = JSON.parse(sessionStorage.response);

// //   const [isModalOpen, setIsModalOpen] = useState(false);

// //   const [examData, setExamData] = useState([]);
// //   const [examCreated, setExamCreated] = useState(false); 
// //   const [formData, setFormData] = useState({
// //     examName: '',
// //     className: data.classTeacher,
// //     section: data.section,
// //     examInfo: [
// //       {
// //         subjectName: '',
// //         examDate: '',
// //         startTime: '',
// //         endTime: '',
// //         subjectTotalMarks: '',
// //       },
// //     ],
// //   });

// //   useEffect(() => {

// //     console.log("use effect");

// //     axios.get(`https://eserver-i5sm.onrender.com/api/v1/exam/getAllExams?className=${data.classTeacher}&section=${data.section}`, {
// //       withCredentials: true,
// //           headers: {
// //             Authorization: `Bearer ${authToken}`,
// //           },
// //     })
// //     .then((response) => {
// //       setExamData(response.data.examData);
// //     })
// //     .catch((error) => {
// //       console.log(error.message);
// //     })

// //   }, [examCreated])

// //   const handleModalOpen = () => {
// //     setIsModalOpen(true);
// //   };

// //   const handleModalClose = () => {
// //     setIsModalOpen(false);
// //   };

// //   const handleExamNameChange = (e) => {
// //     setFormData({ ...formData, examName: e.target.value });
// //   };

// //   const handleSubjectChange = (e, index) => {
// //     const updatedExamInfo = [...formData.examInfo];
// //     updatedExamInfo[index].subjectName = e.target.value;
// //     setFormData({ ...formData, examInfo: updatedExamInfo });
// //   };

// //   const handleDateChange = (e, index) => {
// //     const updatedExamInfo = [...formData.examInfo];
// //     updatedExamInfo[index].examDate = e.target.value;
// //     setFormData({ ...formData, examInfo: updatedExamInfo });
// //   };

// //   const handleStartTimeChange = (e, index) => {
// //     const updatedExamInfo = [...formData.examInfo];
// //     updatedExamInfo[index].startTime = e.target.value;
// //     setFormData({ ...formData, examInfo: updatedExamInfo });
// //   };

// //   const handleEndTimeChange = (e, index) => {
// //     const updatedExamInfo = [...formData.examInfo];
// //     updatedExamInfo[index].endTime = e.target.value;
// //     setFormData({ ...formData, examInfo: updatedExamInfo });
// //   };

// //   const handleTotalMarksChange = (e, index) => {
// //     const updatedExamInfo = [...formData.examInfo];
// //     updatedExamInfo[index].subjectTotalMarks = e.target.value;
// //     setFormData({ ...formData, examInfo: updatedExamInfo });
// //   };

// //   const handleAddSubject = () => {
// //     const updatedExamInfo = [...formData.examInfo, { subjectName: '', examDate: '', startTime: '', endTime: '', subjectTotalMarks: '' }];
// //     setFormData({ ...formData, examInfo: updatedExamInfo });
// //   };

// //   const handleDelete= async (id)=>{

// //     try {
// //       const response = await axios.delete(`https://eserver-i5sm.onrender.com/api/v1/exam/deleteExam/${id}`, {
// //         withCredentials: true,
// //           headers: {
// //             Authorization: `Bearer ${authToken}`,
// //           },
// //       });

// //       console.log("message", response);
// //       setExamCreated(!examCreated);
// //     }
// //     catch (error) {
// //       console.log("error", error.message);
// //     }

// //   }

// //   const handleSubmit = async () => {
// //     setLoading(true)
// //     try {
  
// //       await axios.post("https://eserver-i5sm.onrender.com/api/v1/exam/createExam", formData, {
// //         withCredentials: true,
// //       headers: {
// //         Authorization: `Bearer ${authToken}`,
// //         'Content-Type': 'application/json',
// //       }
// //       })
  
// //       setFormData({
// //         examName: '',
// //         className: data.classTeacher,
// //         section: data.section,
// //         examInfo: [
// //           {
// //             subjectName: '',
// //             examDate: '',
// //             startTime: '',
// //             endTime: '',
// //             subjectTotalMarks: '',
// //           },
// //         ],
// //       });
// //       toast.success("Created")
// //       setExamCreated(!examCreated);
// //       setIsModalOpen(false);
// //       setLoading(false);
// //     }
// //     catch (error) {
// //       toast.error("error",error)
// //        setLoading(false);
// //       console.log("error", error)
// //     }
// //   };

// //   return (
// //     <div className="py-8 px-4 md:px-8">
// //       <h2 className="text-4xl font-bold mb-4 uppercase text-center  hover-text"
// //       style={{color:currentColor}}
// //       >Exam</h2>
// //       <div className="">
       
// //         <Button
// //               variant="contained"
// //               style={{ backgroundColor: currentColor }}
// //               onClick={handleModalOpen}
// //             >
// //                 Create Exam 
// //             </Button>
// //       </div>

// //       {isModalOpen && (
// //         <div className=" flex items-center justify-center z-50">
          
// //           <div className="modal p-4 bg-white rounded-lg shadow-lg md:w-2/3 lg:w-1/2">
// //             <h2 className="text-2xl font-semibold mb-4 text-cyan-700 uppercase">Exam Form</h2>
// //             <div className="mb-4">
// //               <label className="block text-gray-600">Exam Name</label>
// //               <input
// //                 type="text"
// //                 className="w-full border rounded-lg p-2"
// //                 value={formData.examName}
// //                 onChange={handleExamNameChange}
// //               />
// //             </div>
// //             <div className="overflow-y-auto max-h-60 md:max-h-80 lg:max-h-96">
// //               {formData.examInfo.map((examInfo, index) => (
// //                 <div key={index} className="mb-4 border rounded p-4">
// //                   <label className="block text-gray-600">Subject</label>
// //                   <input
// //                     type="text"
// //                     className="w-full border rounded-lg p-2"
// //                     value={examInfo.subjectName}
// //                     onChange={(e) => handleSubjectChange(e, index)}
// //                   />
// //                   <div className="grid grid-cols-2 gap-4 mt-4">
// //                     <div>
// //                       <label className="block text-gray-600">Date</label>
// //                       <input
// //                         type="date"
// //                         className="w-full border rounded-lg p-2"
// //                         value={examInfo.examDate}
// //                         onChange={(e) => handleDateChange(e, index)}
// //                       />
// //                     </div>
// //                     <div>
// //                       <label className="block text-gray-600">Start Time</label>
// //                       <input
// //                         type="time"
// //                         className="w-full border rounded-lg p-2"
// //                         value={examInfo.startTime}
// //                         onChange={(e) => handleStartTimeChange(e, index)}
// //                       />
// //                     </div>
// //                     <div>
// //                       <label className="block text-gray-600">End Time</label>
// //                       <input
// //                         type="time"
// //                         className="w-full border rounded-lg p-2"
// //                         value={examInfo.endTime}
// //                         onChange={(e) => handleEndTimeChange(e, index)}
// //                       />
// //                     </div>
// //                     <div>
// //                       <label className="block text-gray-600">Total Marks</label>
// //                       <input
// //                         type="text"
// //                         className="w-full border rounded-lg p-2"
// //                         value={examInfo.subjectTotalMarks}
// //                         onChange={(e) => handleTotalMarksChange(e, index)}
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //             <Button
// //               variant="contained"
// //               style={{ backgroundColor: currentColor }}
// //               onClick={handleAddSubject}
// //             >
// //                Add Subject
// //             </Button>
// //             <div className="flex justify-end mt-4">



// //             <Button
// //              onClick={handleSubmit}
// //                         type="submit"
// //                         variant="contained"
// //                         style={{
// //                           backgroundColor: currentColor,
// //                           color: "white",
// //                           width: "100%",
// //                         }}
// //                       >
// //                         {loading ? (
// //                           <svg
// //                             aria-hidden="true"
// //                             className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
// //                             viewBox="0 0 100 101"
// //                             fill="none"
// //                             xmlns="http://www.w3.org/2000/svg"
// //                           >
// //                             <path
// //                               d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
// //                               fill="currentColor"
// //                             />
// //                             <path
// //                               d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
// //                               fill="currentFill"
// //                             />
// //                           </svg>
// //                         ) : (
// //                           " Submit"
// //                         )}
// //                       </Button>
// //                <Button
// //               variant="contained"
// //               style={{ backgroundColor: "gray",width:"100%",marginLeft:"4px" }}
// //               onClick={handleModalClose}
// //             >
// //               Cancel
// //             </Button>
// //             </div>
// //           </div>
// //           <button
// //             className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
// //             onClick={handleModalClose}
// //           >
// //             &#x2716;
// //           </button>
// //         </div>
// //       )}

    
// //       <div>
// // <div className="mt-8">
  
// //   <div className="overflow-x-auto bg-gray-100 rounded-lg p-4">
// //     <table className="w-full border-collapse table-auto">
// //       <thead>
// //         <tr className=" text-white"
// //         style={{background:currentColor}}
// //         >
// //           <th className="border text-left  p-2">Class</th>
// //           <th className="border text-left  p-2">Exam Name</th>
// //           <th className="border text-left px-4 py-2"></th>
// //           <th className="border text-left px-4 py-2">Action</th>
         
          
// //         </tr>
// //       </thead>
// //       <tbody>
       
// //         {examData.map((data, index) => (
// //           <tr key={index}>
// //             <td className="border  p-2">{data.className}-{data.section}</td>
// //             <td className="border p-2">{data.examName}</td>
// //             <div className="border p-2">
// //              <tr
// //               style={{background:currentColor}}
// //              className=" border-2 text-white border-gray-500 w-full flex justify-around">
// //              <th className="w-[100px]">Subject</th>
// //              <th className="w-[100px]">Date</th>
// //              <th className="w-[100px]">Timimg</th>
// //              <th className="w-[100px]">Total Marks</th>
// //              </tr>
// //               {data.examInfo.map((subject, i) => (
// //                   <>
              
// //                 <div key={i}>
               
             
// //                   <tr className="  border-2 border-gray-500 w-full flex justify-around">

// //                    <td  className="w-[100px] text-center">{subject.subjectName}</td> 
// //                    <td  className="w-[100px] text-center">{subject.examDate ? subject.examDate.split("T")[0] : ""}</td>
// //                <td  className="w-[100px] text-center">{subject.startTime} - {subject.endTime}</td>
// //                    <td  className="w-[100px] text-center">{subject.subjectTotalMarks}</td>
                
                  
// //                   </tr>
                 
// //                 </div>
// //                   </>
// //               ))}
// //             </div>
           
           
// //             <td className='text-center'>
// //             <Button
// //               variant="contained"
// //               style={{ backgroundColor: "red" }}
// //               onClick={() => handleDelete(data._id)}
// //             >
// //                 Delete 
// //             </Button>
// //             </td>
// //           </tr>
        
// //         ))}
        
// //       </tbody>
// //     </table>
// //   </div>
// // </div>
// // </div>
// //     </div>
// //   );
// // };

// // export default CreateExams;




// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Input } from '@/components/ui/input';
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// const ExamManagement = () => {
//   const [activeTab, setActiveTab] = useState('create');
//   const [examType, setExamType] = useState('UNIT_TEST');
//   const [subjects, setSubjects] = useState([]);
//   const [gradingScales, setGradingScales] = useState({});

//   // Form state
//   const [examForm, setExamForm] = useState({
//     academicYear: '',
//     term: '',
//     examName: '',
//     examType: 'UNIT_TEST',
//     classes: [{
//       className: '',
//       section: '',
//       subjects: []
//     }],
//     gradingScales: {},
//     resultCalculation: {
//       includePreviousTerms: false,
//       roundingMethod: 'ROUND',
//       passingCriteria: {
//         overallPercentage: 33,
//         minimumSubjects: 5,
//         includeElectives: true
//       }
//     }
//   });

//   const examTypes = [
//     { value: 'UNIT_TEST', label: 'Unit Test' },
//     { value: 'TERM', label: 'Term Exam' },
//     { value: 'SEMESTER', label: 'Semester Exam' },
//     { value: 'FINAL', label: 'Final Exam' }
//   ];

//   const assessmentTypes = [
//     { value: 'THEORY', label: 'Theory' },
//     { value: 'PRACTICAL', label: 'Practical' },
//     { value: 'PROJECT', label: 'Project' },
//     { value: 'INTERNAL', label: 'Internal Assessment' }
//   ];

//   const subjectTypes = [
//     { value: 'MAIN', label: 'Main Subject' },
//     { value: 'ELECTIVE', label: 'Elective' },
//     { value: 'CO_SCHOLASTIC', label: 'Co-Scholastic' }
//   ];

//   const handleAddSubject = () => {
//     setSubjects([...subjects, {
//       name: '',
//       code: '',
//       type: 'MAIN',
//       assessmentComponents: [{
//         name: '',
//         weightage: 0,
//         maxMarks: 0,
//         minPassMarks: 0,
//         examDate: '',
//         startTime: '',
//         endTime: ''
//       }]
//     }]);
//   };

//   const handleAddAssessment = (subjectIndex) => {
//     const newSubjects = [...subjects];
//     newSubjects[subjectIndex].assessmentComponents.push({
//       name: '',
//       weightage: 0,
//       maxMarks: 0,
//       minPassMarks: 0,
//       examDate: '',
//       startTime: '',
//       endTime: ''
//     });
//     setSubjects(newSubjects);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <Tabs value={activeTab} onValueChange={setActiveTab}>
//         <TabsList className="grid w-full grid-cols-3">
//           <TabsTrigger value="create">Create Exam</TabsTrigger>
//           <TabsTrigger value="manage">Manage Exams</TabsTrigger>
//           <TabsTrigger value="results">Results & Reports</TabsTrigger>
//         </TabsList>

//         <TabsContent value="create">
//           <Card>
//             <CardHeader>
//               <CardTitle>Create New Examination</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <form className="space-y-4">
//                 {/* Basic Exam Details */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-1">Academic Year</label>
//                     <Input 
//                       type="text" 
//                       value={examForm.academicYear}
//                       onChange={(e) => setExamForm({
//                         ...examForm,
//                         academicYear: e.target.value
//                       })}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-1">Term</label>
//                     <Input 
//                       type="text"
//                       value={examForm.term}
//                       onChange={(e) => setExamForm({
//                         ...examForm,
//                         term: e.target.value
//                       })}
//                     />
//                   </div>
//                 </div>

//                 {/* Exam Type Selection */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Exam Type</label>
//                   <Select 
//                     value={examType}
//                     onValueChange={(value) => setExamType(value)}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select exam type" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {examTypes.map(type => (
//                         <SelectItem key={type.value} value={type.value}>
//                           {type.label}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {/* Subjects Section */}
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center">
//                     <h3 className="text-lg font-medium">Subjects</h3>
//                     <Button onClick={handleAddSubject}>Add Subject</Button>
//                   </div>
                  
//                   {subjects.map((subject, index) => (
//                     <Card key={index}>
//                       <CardContent className="space-y-4">
//                         <div className="grid grid-cols-3 gap-4">
//                           <Input 
//                             placeholder="Subject Name"
//                             value={subject.name}
//                             onChange={(e) => {
//                               const newSubjects = [...subjects];
//                               newSubjects[index].name = e.target.value;
//                               setSubjects(newSubjects);
//                             }}
//                           />
//                           <Select 
//                             value={subject.type}
//                             onValueChange={(value) => {
//                               const newSubjects = [...subjects];
//                               newSubjects[index].type = value;
//                               setSubjects(newSubjects);
//                             }}
//                           >
//                             <SelectTrigger>
//                               <SelectValue placeholder="Subject Type" />
//                             </SelectTrigger>
//                             <SelectContent>
//                               {subjectTypes.map(type => (
//                                 <SelectItem key={type.value} value={type.value}>
//                                   {type.label}
//                                 </SelectItem>
//                               ))}
//                             </SelectContent>
//                           </Select>
//                         </div>

//                         {/* Assessment Components */}
//                         {subject.assessmentComponents.map((assessment, assIndex) => (
//                           <div key={assIndex} className="grid grid-cols-4 gap-4">
//                             <Input 
//                               placeholder="Component Name"
//                               value={assessment.name}
//                               onChange={(e) => {
//                                 const newSubjects = [...subjects];
//                                 newSubjects[index].assessmentComponents[assIndex].name = e.target.value;
//                                 setSubjects(newSubjects);
//                               }}
//                             />
//                             <Input 
//                               type="number"
//                               placeholder="Weightage (%)"
//                               value={assessment.weightage}
//                               onChange={(e) => {
//                                 const newSubjects = [...subjects];
//                                 newSubjects[index].assessmentComponents[assIndex].weightage = e.target.value;
//                                 setSubjects(newSubjects);
//                               }}
//                             />
//                             <Input 
//                               type="number"
//                               placeholder="Max Marks"
//                               value={assessment.maxMarks}
//                               onChange={(e) => {
//                                 const newSubjects = [...subjects];
//                                 newSubjects[index].assessmentComponents[assIndex].maxMarks = e.target.value;
//                                 setSubjects(newSubjects);
//                               }}
//                             />
//                             <Input 
//                               type="date"
//                               value={assessment.examDate}
//                               onChange={(e) => {
//                                 const newSubjects = [...subjects];
//                                 newSubjects[index].assessmentComponents[assIndex].examDate = e.target.value;
//                                 setSubjects(newSubjects);
//                               }}
//                             />
//                           </div>
//                         ))}
//                         <Button 
//                           variant="outline"
//                           onClick={() => handleAddAssessment(index)}
//                         >
//                           Add Assessment Component
//                         </Button>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>

//                 <Button type="submit" className="w-full">Create Exam</Button>
//               </form>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="manage">
//           {/* Exam Management Section */}
//         </TabsContent>

//         <TabsContent value="results">
//           {/* Results and Report Cards Section */}
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default ExamManagement;



// components/ExamManagement/ExamCreationForm.jsx
import React, { useState } from 'react';
import { Button, TextField, MenuItem, IconButton } from '@mui/material';
import { Delete, Add } from '@mui/icons-material';

const ExamCreationForm = ({ currentColor, onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    examName: '',
    academicYear: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1),
    term: '',
    examType: '',
    classes: [{
      className: '',
      section: '',
      subjects: [{
        name: '',
        code: '',
        type: 'MAIN',
        assessmentComponents: [{
          name: '',
          weightage: 0,
          maxMarks: 0,
          minPassMarks: 0,
          examDate: '',
          startTime: '',
          endTime: ''
        }]
      }]
    }],
    gradingScales: {
      PERCENTAGE: [
        { name: 'A1', minPercent: 90, maxPercent: 100, gradePoint: 10 },
        { name: 'A2', minPercent: 80, maxPercent: 89, gradePoint: 9 },
        // ... other grades
      ],
      FIVE_POINT: [
        { name: 'A+', minPercent: 90, maxPercent: 100, gradePoint: 5 },
        { name: 'A', minPercent: 75, maxPercent: 89, gradePoint: 4 },
        // ... other grades
      ]
    }
  });

  const examTypes = [
    'UNIT_TEST',
    'TERM',
    'SEMESTER',
    'FINAL',
    'PRACTICAL',
    'PROJECT'
  ];

  const subjectTypes = [
    'MAIN',
    'ELECTIVE',
    'CO_SCHOLASTIC',
    'EXTRA_CURRICULAR'
  ];

  const handleChange = (path, value) => {
    const newFormData = { ...formData };
    let current = newFormData;
    const parts = path.split('.');
    const last = parts.pop();
    
    for (const part of parts) {
      if (!current[part]) current[part] = {};
      current = current[part];
    }
    
    current[last] = value;
    setFormData(newFormData);
  };

  const addSubject = (classIndex) => {
    const newFormData = { ...formData };
    newFormData.classes[classIndex].subjects.push({
      name: '',
      code: '',
      type: 'MAIN',
      assessmentComponents: [{
        name: '',
        weightage: 0,
        maxMarks: 0,
        minPassMarks: 0,
        examDate: '',
        startTime: '',
        endTime: ''
      }]
    });
    setFormData(newFormData);
  };

  const addAssessmentComponent = (classIndex, subjectIndex) => {
    const newFormData = { ...formData };
    newFormData.classes[classIndex].subjects[subjectIndex].assessmentComponents.push({
      name: '',
      weightage: 0,
      maxMarks: 0,
      minPassMarks: 0,
      examDate: '',
      startTime: '',
      endTime: ''
    });
    setFormData(newFormData);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <TextField
          label="Exam Name"
          value={formData.examName}
          onChange={(e) => handleChange('examName', e.target.value)}
          fullWidth
        />
        <TextField
          label="Academic Year"
          value={formData.academicYear}
          onChange={(e) => handleChange('academicYear', e.target.value)}
          fullWidth
        />
        <TextField
          select
          label="Exam Type"
          value={formData.examType}
          onChange={(e) => handleChange('examType', e.target.value)}
          fullWidth
        >
          {examTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type.replace('_', ' ')}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Term"
          value={formData.term}
          onChange={(e) => handleChange('term', e.target.value)}
          fullWidth
        />
      </div>

      {formData.classes.map((classData, classIndex) => (
        <div key={classIndex} className="mb-8 p-4 border rounded">
          <h3 className="text-xl mb-4">Class Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <TextField
              label="Class"
              value={classData.className}
              onChange={(e) => handleChange(`classes.${classIndex}.className`, e.target.value)}
              fullWidth
            />
            <TextField
              label="Section"
              value={classData.section}
              onChange={(e) => handleChange(`classes.${classIndex}.section`, e.target.value)}
              fullWidth
            />
          </div>

          {classData.subjects.map((subject, subjectIndex) => (
            <div key={subjectIndex} className="mb-6 p-4 border rounded">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <TextField
                  label="Subject Name"
                  value={subject.name}
                  onChange={(e) => handleChange(`classes.${classIndex}.subjects.${subjectIndex}.name`, e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Subject Code"
                  value={subject.code}
                  onChange={(e) => handleChange(`classes.${classIndex}.subjects.${subjectIndex}.code`, e.target.value)}
                  fullWidth
                />
                <TextField
                  select
                  label="Subject Type"
                  value={subject.type}
                  onChange={(e) => handleChange(`classes.${classIndex}.subjects.${subjectIndex}.type`, e.target.value)}
                  fullWidth
                >
                  {subjectTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type.replace('_', ' ')}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              {subject.assessmentComponents.map((component, componentIndex) => (
                <div key={componentIndex} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                  <TextField
                    label="Component Name"
                    value={component.name}
                    onChange={(e) => handleChange(
                      `classes.${classIndex}.subjects.${subjectIndex}.assessmentComponents.${componentIndex}.name`,
                      e.target.value
                    )}
                    fullWidth
                  />
                  <TextField
                    type="number"
                    label="Weightage (%)"
                    value={component.weightage}
                    onChange={(e) => handleChange(
                      `classes.${classIndex}.subjects.${subjectIndex}.assessmentComponents.${componentIndex}.weightage`,
                      parseFloat(e.target.value)
                    )}
                    fullWidth
                  />
                  <TextField
                    type="number"
                    label="Max Marks"
                    value={component.maxMarks}
                    onChange={(e) => handleChange(
                      `classes.${classIndex}.subjects.${subjectIndex}.assessmentComponents.${componentIndex}.maxMarks`,
                      parseInt(e.target.value)
                    )}
                    fullWidth
                  />
                  <TextField
                    type="date"
                    label="Exam Date"
                    value={component.examDate}
                    onChange={(e) => handleChange(
                      `classes.${classIndex}.subjects.${subjectIndex}.assessmentComponents.${componentIndex}.examDate`,
                      e.target.value
                    )}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
              ))}

              <div className="flex justify-end gap-2">
                <Button
                  variant="outlined"
                  onClick={() => addAssessmentComponent(classIndex, subjectIndex)}
                  startIcon={<Add />}
                >
                  Add Component
                </Button>
              </div>
            </div>
          ))}

          <Button
            variant="outlined"
            onClick={() => addSubject(classIndex)}
            startIcon={<Add />}
          >
            Add Subject
          </Button>
        </div>
      ))}

      <div className="flex justify-end gap-4 mt-6">
        <Button
          variant="contained"
          style={{ backgroundColor: currentColor }}
          onClick={() => onSubmit(formData)}
        >
          Create Exam
        </Button>
      </div>
    </div>
  );
};


export default ExamCreationForm;