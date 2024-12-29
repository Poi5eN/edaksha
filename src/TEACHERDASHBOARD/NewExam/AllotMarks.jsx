import React, { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import Tables from "../../Dynamic/Tables";
import { Button } from "@mui/material";

const AllotMarks = () => {
  const { currentColor } = useStateContext();
  const [submittedData, setSubmittedData] = useState([
    { 
      Student_ID: "S001", 
      Student_Name: "John Doe", 
      Math: "", 
      Hindi: "", 
      Eng: "", 
      WorkEducation: "", 
      ArtEducation: "", 
      PhysicalEducation: "", 
      selected: false 
    },
    { 
      Student_ID: "S002", 
      Student_Name: "Anand", 
      Math: "", 
      Hindi: "", 
      Eng: "", 
      WorkEducation: "", 
      ArtEducation: "", 
      PhysicalEducation: "", 
      selected: false 
    },
    { 
      Student_ID: "S003", 
      Student_Name: "Vishal", 
      Math: "", 
      Hindi: "", 
      Eng: "", 
      WorkEducation: "", 
      ArtEducation: "", 
      PhysicalEducation: "", 
      selected: false 
    },
  ]);

  const [selectAll, setSelectAll] = useState(false);

  const handleInputChange = (index, field, value) => {
    const newData = [...submittedData];
    newData[index][field] = value;
    setSubmittedData(newData);
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    const newData = submittedData.map((data) => ({ ...data, selected: newSelectAll }));
    setSubmittedData(newData);
    setSelectAll(newSelectAll);
  };

  const handleCheckboxChange = (index, isChecked) => {
    const newData = [...submittedData];
    newData[index].selected = isChecked;
    setSubmittedData(newData);

    // Update "Select All" based on individual selections
    const allSelected = newData.every((data) => data.selected);
    setSelectAll(allSelected);
  };

  const handleSubmit = async () => {
    const selectedData = submittedData.filter((data) => data.selected);
    console.log("Selected Data to Post:", selectedData);

    try {
      const response = await fetch("/api/submit-marks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedData),
      });

      if (response.ok) {
        alert("Data successfully submitted!");
      } else {
        alert("Failed to submit data.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const THEAD = [
    <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />,
    "ID",
    "Name",
    "Math",
    "Hindi",
    "Eng",
    "Work Education",
    "Art Education",
    "Health & Physical Education",
  ];

  return (
    <div>
      <p
        className="rounded-tl-lg border rounded-tr-lg text-white px-2 text-[12px] lg:text-lg"
        // style={{ background: `linear-gradient(to bottom, ${currentColor}, ${"#8d8b8b"})` }}
        
      >
        Allot Marks
      </p>
      <div>
        <Tables
          thead={THEAD}
          tbody={submittedData.map((val, ind) => ({
            "": (
              <input
                type="checkbox"
                checked={val.selected}
                onChange={(e) => handleCheckboxChange(ind, e.target.checked)}
              />
            ),
            "ID": val.Student_ID,
            "Name": val.Student_Name,
            "Math": (
              <input
                type="number"
                value={val.Math}
                onChange={(e) => handleInputChange(ind, "Math", e.target.value)}
              />
            ),
            "Hindi": (
              <input
                type="number"
                value={val.Hindi}
                onChange={(e) => handleInputChange(ind, "Hindi", e.target.value)}
              />
            ),
            "Eng": (
              <input
                type="number"
                value={val.Eng}
                onChange={(e) => handleInputChange(ind, "Eng", e.target.value)}
              />
            ),
            "Work Education": (
              <select
                value={val.WorkEducation}
                onChange={(e) => handleInputChange(ind, "WorkEducation", e.target.value)}
              >
                <option value="">Select Grade</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            ),
            "Art Education": (
              <select
                value={val.ArtEducation}
                onChange={(e) => handleInputChange(ind, "ArtEducation", e.target.value)}
              >
                <option value="">Select Grade</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            ),
            "Health & Physical Education": (
              <select
                value={val.PhysicalEducation}
                onChange={(e) => handleInputChange(ind, "PhysicalEducation", e.target.value)}
              >
                <option value="">Select Grade</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            ),
          }))}
        />
        <Button onClick={handleSubmit} style={{ marginTop: "10px", background: currentColor, color: "white" }}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AllotMarks;



// import React, { useState } from "react";
// import { useStateContext } from "../../contexts/ContextProvider";
// import Tables from "../../Dynamic/Tables";
// import { Button } from "@mui/material";

// const AllotMarks = () => {
//   const { currentColor } = useStateContext();
//   const [submittedData, setSubmittedData] = useState([
//     { 
//       Student_ID: "S001", 
//       Student_Name: "John Doe", 
//       Math: "", 
//       Hindi: "", 
//       Eng: "", 
//       WorkEducation: "", 
//       ArtEducation: "", 
//       PhysicalEducation: "", 
//       selected: false 
//     },
//     { 
//       Student_ID: "S002", 
//       Student_Name: "Anand", 
//       Math: "", 
//       Hindi: "", 
//       Eng: "", 
//       WorkEducation: "", 
//       ArtEducation: "", 
//       PhysicalEducation: "", 
//       selected: false 
//     },
//     { 
//       Student_ID: "S003", 
//       Student_Name: "Vishal", 
//       Math: "", 
//       Hindi: "", 
//       Eng: "", 
//       WorkEducation: "", 
//       ArtEducation: "", 
//       PhysicalEducation: "", 
//       selected: false 
//     },
//   ]);

//   const handleInputChange = (index, field, value) => {
//     const newData = [...submittedData];
//     newData[index][field] = value;
//     setSubmittedData(newData);
//   };

//   const THEAD = [
//     "",
//     "ID",
//     "Name",
//     "Math",
//     "Hindi",
//     "Eng",
//     "Work Education",
//     "Art Education",
//     "Health & Physical Education",
//   ];

//   const handleSubmit = async () => {
//     const selectedData = submittedData.filter((data) => data.selected);
//     console.log("Selected Data to Post:", selectedData);

//     try {
//       const response = await fetch("/api/submit-marks", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(selectedData),
//       });

//       if (response.ok) {
//         alert("Data successfully submitted!");
//       } else {
//         alert("Failed to submit data.");
//       }
//     } catch (error) {
//       console.error("Error submitting data:", error);
//     }
//   };

//   return (
//     <div>
//       <p
//         className="rounded-tl-lg border rounded-tr-lg text-white px-2 text-[12px] lg:text-lg shadow-2xl"
//         // style={{ background: `linear-gradient(to left,${"#8d8b8b"} , ${currentColor})` }}
//         style={{background:currentColor}}
//       >
//         Allot Marks
//       </p>
//       <div>
//         <Tables
//           thead={THEAD}
//           tbody={submittedData.map((val, ind) => ({
//             "": (
//               <input
//                 type="checkbox"
//                 checked={val.selected}
//                 onChange={(e) => handleInputChange(ind, "selected", e.target.checked)}
//               />
//             ),
//             "ID": val.Student_ID,
//             "Name": val.Student_Name,
//             "Math": (
//               <input
//                 type="number"
//                 value={val.Math}
//                 onChange={(e) => handleInputChange(ind, "Math", e.target.value)}
//               />
//             ),
//             "Hindi": (
//               <input
//                 type="number"
//                 value={val.Hindi}
//                 onChange={(e) => handleInputChange(ind, "Hindi", e.target.value)}
//               />
//             ),
//             "Eng": (
//               <input
//                 type="number"
//                 value={val.Eng}
//                 onChange={(e) => handleInputChange(ind, "Eng", e.target.value)}
//               />
//             ),
//             "Work Education": (
//               <select
//                 value={val.WorkEducation}
//                 onChange={(e) => handleInputChange(ind, "WorkEducation", e.target.value)}
//               >
//                 <option value="">Select Grade</option>
//                 <option value="A">A</option>
//                 <option value="B">B</option>
//                 <option value="C">C</option>
//               </select>
//             ),
//             "Art Education": (
//               <select
//                 value={val.ArtEducation}
//                 onChange={(e) => handleInputChange(ind, "ArtEducation", e.target.value)}
//               >
//                 <option value="">Select Grade</option>
//                 <option value="A">A</option>
//                 <option value="B">B</option>
//                 <option value="C">C</option>
//               </select>
//             ),
//             "Health & Physical Education": (
//               <select
//                 value={val.PhysicalEducation}
//                 onChange={(e) => handleInputChange(ind, "PhysicalEducation", e.target.value)}
//               >
//                 <option value="">Select Grade</option>
//                 <option value="A">A</option>
//                 <option value="B">B</option>
//                 <option value="C">C</option>
//               </select>
//             ),
//           }))}
//         />
//         <Button onClick={handleSubmit} style={{ marginTop: "10px", background: currentColor, color: "white" }}>
//           Submit
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default AllotMarks;



// import React, { useState } from "react";
// import { useStateContext } from "../../contexts/ContextProvider";
// import Tables from "../../Dynamic/Tables";
// import { Button } from "@mui/material";

// const AllotMarks = () => {
//   const { currentColor } = useStateContext();
//   const [submittedData, setSubmittedData] = useState([
//     { Student_ID: "S001", Student_Name: "John Doe", Math: "", Hindi: "", Eng: "", selected: false },
//     { Student_ID: "S002", Student_Name: "Anand", Math: "", Hindi: "", Eng: "", selected: false },
//     { Student_ID: "S003", Student_Name: "Vishal", Math: "", Hindi: "", Eng: "", selected: false },
//   ]);
//   const [selectAll, setSelectAll] = useState(false);

//   const handleInputChange = (index, subject, value) => {
//     const newData = [...submittedData];
//     newData[index][subject] = value;
//     setSubmittedData(newData);
//   };

//   const handleCheckboxChange = (index, isChecked) => {
//     const newData = [...submittedData];
//     newData[index].selected = isChecked;
//     setSubmittedData(newData);
//   };

//   const handleSelectAll = () => {
//     const newData = submittedData.map((data) => ({ ...data, selected: !selectAll }));
//     setSubmittedData(newData);
//     setSelectAll(!selectAll);
//   };

//   const handleSubmit = async () => {
//     const selectedData = submittedData.filter((data) => data.selected);
//     console.log("Selected Data to Post:", selectedData);

//     try {
//       const response = await fetch("/api/submit-marks", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(selectedData),
//       });

//       if (response.ok) {
//         alert("Data successfully submitted!");
//       } else {
//         alert("Failed to submit data.");
//       }
//     } catch (error) {
//       console.error("Error submitting data:", error);
//     }
//   };

//   const THEAD = [
//     <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />,
//     "ID",
//     "Name",
//     "Math",
//     "Hindi",
//     "Eng",
//   ];

//   return (
//     <div>
//       <p
//         className="rounded-tl-lg border rounded-tr-lg text-white px-2 text-[12px] lg:text-lg"
//         style={{ background: `linear-gradient(to bottom, ${currentColor}, ${"#8d8b8b"})` }}
//       >
//         Allot Marks
//       </p>
//       <div>
//         <Tables
//           thead={THEAD}
//           tbody={submittedData.map((val, ind) => ({
//             "": (
//               <input
//                 type="checkbox"
//                 checked={val.selected}
//                 onChange={(e) => handleCheckboxChange(ind, e.target.checked)}
//               />
//             ),
//             "ID": val.Student_ID,
//             "Name": val.Student_Name,
//             "Math": (
//               <input
//                 type="number"
//                 value={val.Math}
//                 onChange={(e) => handleInputChange(ind, "Math", e.target.value)}
//               />
//             ),
//             "Hindi": (
//               <input
//                 type="number"
//                 value={val.Hindi}
//                 onChange={(e) => handleInputChange(ind, "Hindi", e.target.value)}
//               />
//             ),
//             "Eng": (
//               <input
//                 type="number"
//                 value={val.Eng}
//                 onChange={(e) => handleInputChange(ind, "Eng", e.target.value)}
//               />
//             ),
//           }))}
//         />
//         <Button onClick={handleSubmit} style={{ marginTop: "10px", background: currentColor, color: "white" }}>
//           Submit
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default AllotMarks;




// import React, { useState } from 'react'
// import { useStateContext } from '../../contexts/ContextProvider';
// import Tables from '../../Dynamic/Tables';
// import { Button } from '@mui/material';

// const AllotMarks = () => {
//   const { currentColor } = useStateContext();
//   const [submittedData, setSubmittedData] = useState([
//     {
//       "Student_ID": "S001",
//       "Student_Name": "John Doe",
//     },
//     {
//       "Student_ID": "S002",
//       "Student_Name": "Anand ",
//     },
//     {
//       "Student_ID": "S003",
//       "Student_Name": "Vishal",
//     },
//   ]);
//   const THEAD = [
   
//     "",
//     "ID",
//     "Name",
//     "Math",
//     "Hindi",
//     "Eng",
   
   
//   ];
//   return (
//     <div>
//         <p 
//        className='rounded-tl-lg border rounded-tr-lg text-white px-2 text-[12px] lg:text-lg'
//        style={{ background: `linear-gradient(to bottom, ${currentColor}, ${"#8d8b8b"})` }}
//       >AllotMarks</p>
//       <div>
//        <Tables  thead={THEAD} 
//        tbody={ submittedData?.map((val, ind) => ({
//         "":<input type="checkbox" key={ind} />,
//         "S.No.":val.Student_ID,
//         "Name": val.Student_Name,
//         "Math": <input type='number'/>,
//         "Hindi":<input type='number'/>,
//         "Eng": <input type='number'/>,
      
//       }))}
            
//             />
//             <Button>
//               submit
//             </Button>
//         </div>
//       </div>
//   )
// }

// export default AllotMarks



// import React, { useState, useEffect } from 'react';

// export default function AllotMarks() {
//   const [exams, setExams] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [selectedExam, setSelectedExam] = useState('');
//   const [selectedStudent, setSelectedStudent] = useState('');
//   const [marks, setMarks] = useState({});

//   useEffect(() => {
//     fetchExams();
//     fetchStudents();
//   }, []);

//   // Static data for exams
//   const fetchExams = () => {
//     const staticExams = [
//       {
//         id: 'exam1',
//         name: 'Midterm Exam',
//         subjects: [
//           { id: 'sub1', name: 'Math', totalMarks: 100 },
//           { id: 'sub2', name: 'Science', totalMarks: 100 },
//         ],
//       },
//       {
//         id: 'exam2',
//         name: 'Final Exam',
//         subjects: [
//           { id: 'sub1', name: 'Math', totalMarks: 100 },
//           { id: 'sub3', name: 'History', totalMarks: 50 },
//         ],
//       },
//     ];
//     setExams(staticExams);
//   };

//   // Static data for students
//   const fetchStudents = () => {
//     const staticStudents = [
//       { id: 'student1', name: 'Alice', rollNo: 101 },
//       { id: 'student2', name: 'Bob', rollNo: 102 },
//     ];
//     setStudents(staticStudents);
//   };

//   const handleExamChange = (e) => {
//     setSelectedExam(e.target.value);
//     setMarks({});
//   };

//   const handleStudentChange = (e) => {
//     setSelectedStudent(e.target.value);
//     setMarks({});
//   };

//   const handleMarkChange = (subjectId, value) => {
//     setMarks((prevMarks) => ({ ...prevMarks, [subjectId]: parseInt(value) }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Marks allotted:', {
//       student: selectedStudent,
//       exam: selectedExam,
//       marks,
//     });
//     alert('Marks allotted successfully!');
//     setMarks({});
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
//       <div style={{ marginBottom: '1rem' }}>
//         <label htmlFor="exam-select">Select Exam</label>
//         <select
//           id="exam-select"
//           value={selectedExam}
//           onChange={handleExamChange}
//           required
//           style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
//         >
//           <option value="">Select an exam</option>
//           {exams.map((exam) => (
//             <option key={exam.id} value={exam.id}>
//               {exam.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div style={{ marginBottom: '1rem' }}>
//         <label htmlFor="student-select">Select Student</label>
//         <select
//           id="student-select"
//           value={selectedStudent}
//           onChange={handleStudentChange}
//           required
//           style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
//         >
//           <option value="">Select a student</option>
//           {students.map((student) => (
//             <option key={student.id} value={student.id}>
//               {student.name} - Roll No: {student.rollNo}
//             </option>
//           ))}
//         </select>
//       </div>
//       {selectedExam && selectedStudent && (
//         <div>
//           <h3>Enter Marks</h3>
//           {exams.find((e) => e.id === selectedExam)?.subjects.map((subject) => (
//             <div key={subject.id} style={{ marginBottom: '1rem' }}>
//               <label htmlFor={`subject-${subject.id}`}>
//                 {subject.name} (Max: {subject.totalMarks})
//               </label>
//               <input
//                 id={`subject-${subject.id}`}
//                 type="number"
//                 value={marks[subject.id] || ''}
//                 onChange={(e) => handleMarkChange(subject.id, e.target.value)}
//                 min="0"
//                 max={subject.totalMarks}
//                 required
//                 style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
//               />
//             </div>
//           ))}
//         </div>
//       )}
//       <button
//         type="submit"
//         style={{
//           padding: '0.75rem 1.5rem',
//           backgroundColor: '#007bff',
//           color: '#fff',
//           border: 'none',
//           borderRadius: '4px',
//           cursor: 'pointer',
//         }}
//       >
//         Allot Marks
//       </button>
//     </form>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { api } from '../api/api';
// import { Button, Input, Select } from '@/components/ui';

// export default function AllotMarks() {
//   const [exams, setExams] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [selectedExam, setSelectedExam] = useState('');
//   const [selectedStudent, setSelectedStudent] = useState('');
//   const [marks, setMarks] = useState({});

//   useEffect(() => {
//     fetchExams();
//     fetchStudents();
//   }, []);

//   const fetchExams = async () => {
//     try {
//       const response = await api.getExams();
//       setExams(response.data);
//     } catch (error) {
//       console.error('Error fetching exams:', error);
//     }
//   };

//   const fetchStudents = async () => {
//     try {
//       const response = await api.getStudents();
//       setStudents(response.data);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//     }
//   };

//   const handleExamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedExam(e.target.value);
//     setMarks({});
//   };

//   const handleStudentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedStudent(e.target.value);
//     setMarks({});
//   };

//   const handleMarkChange = (subjectId: string, value: string) => {
//     setMarks(prevMarks => ({ ...prevMarks, [subjectId]: parseInt(value) }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await Promise.all(
//         Object.entries(marks).map(([subjectId, mark]) =>
//           api.createMark({
//             student: selectedStudent,
//             exam: selectedExam,
//             subject: subjectId,
//             marks: mark,
//           })
//         )
//       );
//       alert('Marks allotted successfully!');
//       setMarks({});
//     } catch (error) {
//       console.error('Error allotting marks:', error);
//       alert('Failed to allot marks. Please try again.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <Select
//         label="Select Exam"
//         value={selectedExam}
//         onChange={handleExamChange}
//         required
//       >
//         <option value="">Select an exam</option>
//         {exams.map(exam => (
//           <option key={exam.id} value={exam.id}>{exam.name}</option>
//         ))}
//       </Select>
//       <Select
//         label="Select Student"
//         value={selectedStudent}
//         onChange={handleStudentChange}
//         required
//       >
//         <option value="">Select a student</option>
//         {students.map(student => (
//           <option key={student.id} value={student.id}>{student.name} - Roll No: {student.rollNo}</option>
//         ))}
//       </Select>
//       {selectedExam && selectedStudent && (
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Enter Marks</h3>
//           {exams.find(e => e.id === selectedExam)?.subjects.map(subject => (
//             <Input
//               key={subject.id}
//               label={`${subject.name} (Max: ${subject.totalMarks})`}
//               type="number"
//               value={marks[subject.id] || ''}
//               onChange={(e) => handleMarkChange(subject.id, e.target.value)}
//               min="0"
//               max={subject.totalMarks}
//               required
//             />
//           ))}
//         </div>
//       )}
//       <Button type="submit">Allot Marks</Button>
//     </form>
//   );
// }
