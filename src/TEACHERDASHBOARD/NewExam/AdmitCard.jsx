import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useStateContext } from "../../contexts/ContextProvider";
import { MdDownload } from "react-icons/md";
import axios from "axios";
import Cookies from "js-cookie";

const AdmitCard = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const { currentColor } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [allStudents, setAllStudents] = useState([]);
    const [examData, setExamData] = useState([]);
    const [selectedTerm, setSelectedTerm] = useState("");
    const [resultPublishDate, setResultPublishDate] = useState(null); // New state for result publish date
    const schoolImage = sessionStorage.getItem("schoolImage");
    const SchoolDetails = JSON.parse(localStorage.getItem("SchoolDetails"));
    const componentPDF = useRef();
    const authToken = Cookies.get("token");

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: `${selectedStudent?.fullName || "Student"}_Admit_Card`,
        onAfterPrint: () => alert("Downloaded successfully"),
    });

    const getResult = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                "https://eserver-i5sm.onrender.com/api/v1/exam/getExams",
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            setLoading(false);
            setExamData(response.data.exams);
        } catch (error) {
            console.error("Error fetching exams:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getResult();
    }, []);

    useEffect(() => {
        setLoading(true);
        const students = JSON.parse(localStorage.getItem("studentsData"));
        if (students) {
            setLoading(false);
            setAllStudents(students || []);
        }
    }, []);

    const handleTermChange = (event) => {
        setSelectedTerm(event.target.value);
        //Update the resultPublishDate state when term is changed
        const selectedExam = examData.find((exam) => exam._id === event.target.value);
        if(selectedExam){
            setResultPublishDate(selectedExam.resultPublishDate);
        }else{
             setResultPublishDate(null); //Reset if nothing selected.
        }
    };

    const getDay = (date) => {
        const day = new Date(date).toLocaleDateString("en-US", { weekday: 'long' })
        return day
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }

      const formatIssueDate = (date) => { //function for date of issue
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
  };


    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        const date = new Date();
        date.setHours(parseInt(hours, 10))
        date.setMinutes(parseInt(minutes, 10))
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', });
    }

    const renderExamTable = () => {
        if (!examData || examData.length === 0) {
            return <p>No exams scheduled.</p>;
        }

        const filteredExams = selectedTerm
            ? examData.filter((exam) => exam._id === selectedTerm)
            : examData;

        return filteredExams.map((exam) => (
            <div className="mb-4 border-2" key={exam._id}>
                <h4 className="font-bold text-lg  p-2">{exam.name}</h4>
                <table className="w-full mb-1 text-sm border-collapse border border-gray-300">
                    <thead>
                        <tr className="">
                            <th className="border border-gray-300 p-2">Subject</th>
                            <th className="border border-gray-300 p-2">Examination Date</th>
                            <th className="border border-gray-300 p-2">Day</th>
                            <th className="border border-gray-300 p-2">Timing</th>
                            <th className="border border-gray-300 p-2">Checked By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exam?.subjects?.map((subject) => (
                            <tr key={subject._id}>
                                <td className="border border-gray-300 p-2">{subject.name}</td>
                                <td className="border border-gray-300 p-2">
                                    {formatDate(subject.examDate)}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {getDay(subject.examDate)}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {formatTime(subject.startTime)} to {formatTime(subject.endTime)}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    ....................
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ));
    };

    return (
        <div>
            <div
                className="rounded-tl-lg rounded-tr-lg border flex justify-between text-white  py-2 px-2"
                style={{
                    background: `linear-gradient(to bottom, ${currentColor}, #8d8b8b)`,
                }}
            >
                <p className="text-lg">Admit Card</p>
                <MdDownload onClick={generatePDF} className="text-2xl cursor-pointer" />
            </div>
           <div className="flex w-full">
           <div className="">
                {/* <h3 className="text-lg font-semibold mb-2">Select Student</h3> */}
                <select
                    className="p-2 border rounded"
                    onChange={(e) => {
                        const selected = allStudents.find(
                            (student) => student?._id === e.target.value
                        );
                        setSelectedStudent(selected);
                    }}
                >
                    <option value="">Select a student</option>
                    {allStudents.map((student) => (
                        <option key={student?._id} value={student?._id}>
                            {student?.fullName} - Class {student?.class} {student?.section}{" "}
                            (Roll No: {student?.rollNo})
                        </option>
                    ))}
                </select>
            </div>
            <div className="">
                {/* <h3 className="text-lg font-semibold mb-2">Select Term</h3> */}
                <select
                    className="p-2 border rounded"
                    value={selectedTerm}
                    onChange={handleTermChange}
                >
                    <option value="">All terms</option>
                    {examData.map((exam) => (
                        <option key={exam?._id} value={exam?._id}>
                            {exam?.name}
                        </option>
                    ))}
                </select>
            </div>
           </div>
            <div className="w-full flex justify-center">
                <div className="a4">
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
                                </div>
                                <div className="w-[70px]"></div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 border p-2 mb-1">
                                <div>
                                    <table className=" text-sm">
                                        <tbody>
                                            <tr>
                                                <td className="font-semibold py-1 whitespace-nowrap">
                                                    Admission No. :
                                                </td>
                                                <td className="whitespace-nowrap text-blue-700 font-semibold">
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

                            {renderExamTable()}

                            {/* General Instructions */}
                            <div className="mb-4 mt-4 text-[12px]">
                                <h4 className="font-semibold mb-1 ">
                                    General/Exam Instructions for Students
                                </h4>
                                <ol className="list-decimal pl-5">
                                    <li>Check the exam timetable carefully.</li>
                                    <li>Students must bring their own lunch to school.</li>
                                    <li>
                                        Students must bring the '
                                        <span className="font-semibold">Admit Card</span>' and show it
                                        to the invigilator(s) on duty and should preserve it for
                                        future requirements.
                                    </li>
                                    <li>
                                        Mobile Phone, Calculator, Digital Watch or any Electronic
                                        Device is <span className="font-semibold">NOT ALLOWED</span>.
                                    </li>
                                    <li>Arrive at the School at least 15 minutes before the start of the examination.</li>
                                    <li>
                                        Student is barred from entering the examination hall 15
                                        minutes after the written examination starts.
                                    </li>
                                    <li>
                                        Ensure that you use the washroom before arriving for your exam
                                        as you will not be permitted to leave during the first hour.
                                    </li>
                                    <li>
                                        Normally, you are required to answer questions using blue or
                                        black ink. Make sure you bring some spare pens with you.
                                    </li>
                                    <li>Keep your eyes on your own paper. Remember, copying is cheating!</li>
                                    <li>
                                        You must remain silent until after you have exited the school
                                        building.
                                    </li>
                                    
                                </ol>
                            </div>

                            <div className="flex justify-between mt-6 text-sm">
                                <div className="text-center">
                                    <p className="font-semibold">Date of Issue</p>
                                    <p className="border-t pt-1">{formatIssueDate(resultPublishDate)}</p> {/* Use formatted date */}
                                </div>
                                <div className="text-center">
                                    <p className="font-semibold">Signature of the Guardian</p>
                                    <p className="border-t pt-1">............................</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-semibold">Class Teacher</p>
                                    <p className="border-t pt-1">............................</p>
                                </div>
                              
                                <div className="text-center">
                    <p className="font-semibold">Principal</p>
                    <p className="border-t pt-1">{SchoolDetails?.fullName}</p>
                   </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdmitCard;


// import React, { useEffect, useRef, useState } from "react";
// import { useReactToPrint } from "react-to-print";
// import { useStateContext } from "../../contexts/ContextProvider";
// import { MdDownload } from "react-icons/md";
// import axios from "axios";
// import Cookies from "js-cookie";

// const AdmitCard = () => {
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const { currentColor } = useStateContext();
//   const [loading, setLoading] = useState(false);
//   const [allStudents, setAllStudents] = useState([]);
//   const [examData, setExamData] = useState([]);
//   const [selectedTerm, setSelectedTerm] = useState("");
//   const schoolImage = sessionStorage.getItem("schoolImage");
//   const SchoolDetails = JSON.parse(localStorage.getItem("SchoolDetails"));
//   const componentPDF = useRef();
//   const authToken = Cookies.get("token");

//   const generatePDF = useReactToPrint({
//     content: () => componentPDF.current,
//     documentTitle: `${selectedStudent?.fullName || "Student"}_Admit_Card`,
//     onAfterPrint: () => alert("Downloaded successfully"),
//   });

//   const getResult = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         "https://eserver-i5sm.onrender.com/api/v1/exam/getExams",
//         {
//           withCredentials: true,
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );
//       setLoading(false);
//       setExamData(response.data.exams);
//     } catch (error) {
//       console.error("Error fetching exams:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getResult();
//   }, []);

//   useEffect(() => {
//     setLoading(true);
//     const students = JSON.parse(localStorage.getItem("studentsData"));
    
//     if (students) {
//       setLoading(false);
//       setAllStudents(students || []);
//     }
//   }, []);

//   const handleTermChange = (event) => {
//     setSelectedTerm(event.target.value);
//   };
//   console.log("SchoolDetails",SchoolDetails)

//   const getDay = (date) => {
//     const day = new Date(date).toLocaleDateString("en-US", { weekday: 'long' })
//     return day
//   }

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     });
//   }

//   const formatTime = (time) => {
//     const [hours, minutes] = time.split(':');
//     const date = new Date();
//     date.setHours(parseInt(hours, 10))
//     date.setMinutes(parseInt(minutes, 10))
//     return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', });
//   }

//   const renderExamTable = () => {
//     if (!examData || examData.length === 0) {
//       return <p>No exams scheduled.</p>;
//     }

//     const filteredExams = selectedTerm
//       ? examData.filter((exam) => exam._id === selectedTerm)
//       : examData;

//     return filteredExams.map((exam) => (
//       <div className="mb-4 border-2" key={exam._id}>
//         <h4 className="font-bold text-lg bg-gray-200 p-2">{exam.name}</h4>
//         <table className="w-full mb-1 text-sm border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border border-gray-300 p-2">Subject</th>
//               <th className="border border-gray-300 p-2">Examination Date</th>
//               <th className="border border-gray-300 p-2">Day</th>
//               <th className="border border-gray-300 p-2">Timing</th>
//               <th className="border border-gray-300 p-2">Checked By</th>
//             </tr>
//           </thead>
//           <tbody>
//             {exam?.subjects?.map((subject) => (
//               <tr key={subject._id}>
//                 <td className="border border-gray-300 p-2">{subject.name}</td>
//                 <td className="border border-gray-300 p-2">
//                   {formatDate(subject.examDate)}
//                 </td>
//                 <td className="border border-gray-300 p-2">
//                   {getDay(subject.examDate)}
//                 </td>
//                 <td className="border border-gray-300 p-2">
//                   {formatTime(subject.startTime)} to {formatTime(subject.endTime)}
//                 </td>
//                 <td className="border border-gray-300 p-2">
//                   ....................
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     ));
//   };

//   return (
//     <div>
//       <div
//         className="rounded-tl-lg rounded-tr-lg border flex justify-between text-white px-2 py-2 px-2"
//         style={{
//           background: `linear-gradient(to bottom, ${currentColor}, #8d8b8b)`,
//         }}
//       >
//         <p className="text-lg">Admit Card</p>
//         <MdDownload onClick={generatePDF} className="text-2xl cursor-pointer" />
//       </div>
//       <div className="mb-4">
//         <h3 className="text-lg font-semibold mb-2">Select Student</h3>
//         <select
//           className="p-2 border rounded"
//           onChange={(e) => {
//             const selected = allStudents.find(
//               (student) => student?._id === e.target.value
//             );
//             setSelectedStudent(selected);
//           }}
//         >
//           <option value="">Select a student</option>
//           {allStudents.map((student) => (
//             <option key={student?._id} value={student?._id}>
//               {student?.fullName} - Class {student?.class} {student?.section}{" "}
//               (Roll No: {student?.rollNo})
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="mb-4">
//         <h3 className="text-lg font-semibold mb-2">Select Term</h3>
//         <select
//           className="p-2 border rounded"
//           value={selectedTerm}
//           onChange={handleTermChange}
//         >
//           <option value="">All terms</option>
//           {examData.map((exam) => (
//             <option key={exam?._id} value={exam?._id}>
//               {exam?.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="w-full flex justify-center">
//         <div className="a4">
//           <div ref={componentPDF} className="p-12">
//             <div className="bg-white border-2 rounded-md p-6 max-w-4xl mx-auto mb-6">
//               <div className="flex items-center justify-between mb-6">
//                 <div className="h-[70px] w-[70px]">
//                   <img
//                     src={schoolImage}
//                     alt="School Logo"
//                     className="w-full object-contain"
//                   />
//                 </div>
//                 <div className="text-center">
//                   <h1 className="text-red-600 font-bold text-3xl">
//                     {SchoolDetails?.schoolName}
//                   </h1>
//                   <p className="text-blue-600 text-xl">
//                     {SchoolDetails?.address}
//                   </p>
//                   <p className="text-green-600 text-sm font-bold">
//                     {SchoolDetails?.email}
//                   </p>
//                   <p className="text-green-600 text-sm font-bold">
//                     {SchoolDetails?.contact}
//                   </p>
//                 </div>
//                 <div className="w-[70px]"></div>
//               </div>

//               <div className="grid grid-cols-3 gap-4 border p-2 mb-1">
//                 <div>
//                   <table className=" text-sm">
//                     <tbody>
//                       <tr>
//                         <td className="font-semibold py-1 whitespace-nowrap">
//                           Admission No. :
//                         </td>
//                         <td className="whitespace-nowrap to-blue-700 font-semibold">
//                           {selectedStudent?.admissionNumber || "N/A"}
//                         </td>
//                       </tr>
//                       <tr>
//                         <td className="font-semibold py-1 whitespace-nowrap">
//                           Student's Name :
//                         </td>
//                         <td className="whitespace-nowrap">
//                           {selectedStudent?.fullName || "N/A"}
//                         </td>
//                       </tr>
//                       <tr>
//                         <td className="font-semibold py-1 whitespace-nowrap">
//                           Father's Name :
//                         </td>
//                         <td className="whitespace-nowrap">
//                           {selectedStudent?.fatherName || "N/A"}
//                         </td>
//                       </tr>
//                       <tr>
//                         <td className="font-semibold py-1 whitespace-nowrap">
//                           Mother's Name :
//                         </td>
//                         <td className="whitespace-nowrap">
//                           {selectedStudent?.motherName || "N/A"}
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>

//                 <div>
//                   <table className="ml-3 text-sm">
//                     <tbody>
//                       <tr>
//                         <td className="font-semibold py-1 whitespace-nowrap">
//                           Class :
//                         </td>
//                         <td>
//                           {selectedStudent?.class || "N/A"}-
//                           {selectedStudent?.section || ""}
//                         </td>
//                       </tr>
//                       <tr>
//                         <td className="font-semibold py-1 whitespace-nowrap">
//                           Roll No. :
//                         </td>
//                         <td className="whitespace-nowrap">
//                           {selectedStudent?.rollNo || "N/A"}
//                         </td>
//                       </tr>
//                       <tr>
//                         <td className="font-semibold py-1">DOB :</td>
//                         <td>
//                           {selectedStudent?.dateOfBirth
//                             ? new Date(
//                               selectedStudent.dateOfBirth
//                             ).toLocaleDateString("en-GB", {
//                               day: "2-digit",
//                               month: "2-digit",
//                               year: "numeric",
//                             })
//                             : "N/A"}
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>

//                 <div className="flex justify-end ">
//                   <img
//                     src={
//                       selectedStudent?.image?.url ||
//                       "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
//                     }
//                     alt="Student"
//                     className="w-24 h-24 object-cover border border-gray-300 "
//                   />
//                 </div>
//               </div>

//               {renderExamTable()}

//               {/* General Instructions */}
//               <div className="mb-4 mt-4">
//                 <h4 className="font-semibold mb-1">
//                   General/Exam Instructions for Students
//                 </h4>
//                 <ol className="list-decimal pl-5 text-[12px]">
//                   <li>Check the exam timetable carefully.</li>
//                   <li>Students must bring their own lunch to school.</li>
//                   <li>
//                     Students must bring the '
//                     <span className="font-semibold">Admit Card</span>' and show it
//                     to the invigilator(s) on duty and should preserve it for
//                     future requirements.
//                   </li>
//                   <li>
//                     Mobile Phone, Calculator, Digital Watch or any Electronic
//                     Device is <span className="font-semibold">NOT ALLOWED</span>.
//                   </li>
//                   <li>Arrive at the School at least 15 minutes before the start of the examination.</li>
//                   <li>
//                     Student is barred from entering the examination hall 15
//                     minutes after the written examination starts.
//                   </li>
//                   <li>
//                     Ensure that you use the washroom before arriving for your exam
//                     as you will not be permitted to leave during the first hour.
//                   </li>
//                   <li>
//                     Normally, you are required to answer questions using blue or
//                     black ink. Make sure you bring some spare pens with you.
//                   </li>
//                   <li>Keep your eyes on your own paper. Remember, copying is cheating!</li>
//                   <li>
//                     You must remain silent until after you have exited the school
//                     building.
//                   </li>
                 
//                 </ol>
//               </div>

//                <div className="flex justify-between mt-6 text-sm">
//                   <div className="text-center">
//                     <p className="font-semibold">Date of Issue</p>
//                     <p className="border-t pt-1"></p>
//                   </div>
//                    <div className="text-center">
//                    <p className="font-semibold">Signature of the Guardian</p>
//                      <p className="border-t pt-1">............................</p>
//                   </div>
//                    <div className="text-center">
//                     <p className="font-semibold">Class Teacher</p>
//                     <p className="border-t pt-1">............................</p>
//                    </div>
                   
//                    <div className="text-center">
//                     <p className="font-semibold">Principal</p>
//                     <p className="border-t pt-1">{SchoolDetails?.fullName}</p>
//                    </div>
//                 </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdmitCard;

// import React, { useEffect, useRef, useState } from "react";
// import { useReactToPrint } from "react-to-print";
// import { useStateContext } from "../../contexts/ContextProvider";
// import { MdDownload } from "react-icons/md";
// import axios from "axios";
// import Cookies from "js-cookie";

// const AdmitCard = () => {
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const { currentColor } = useStateContext();
//   const [loading, setLoading] = useState(false);
//   const [allStudents, setAllStudents] = useState([]);
//   const [examData, setExamData] = useState([]);
//   const [selectedTerm, setSelectedTerm] = useState(""); // new state
//   const schoolImage = sessionStorage.getItem("schoolImage");
//   const SchoolDetails = JSON.parse(localStorage.getItem("SchoolDetails"));
//   const componentPDF = useRef();
//   const authToken = Cookies.get("token");

//   const generatePDF = useReactToPrint({
//     content: () => componentPDF.current,
//     documentTitle: `${selectedStudent?.fullName || "Student"}_Admit_Card`,
//     onAfterPrint: () => alert("Downloaded successfully"),
//   });

//   const getResult = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         "https://eserver-i5sm.onrender.com/api/v1/exam/getExams",
//         {
//           withCredentials: true,
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );
//       setLoading(false);
//       setExamData(response.data.exams);
//     } catch (error) {
//       console.error("Error fetching exams:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getResult();
//   }, []);

//   useEffect(() => {
//     setLoading(true);
//     const students = JSON.parse(localStorage.getItem("studentsData"));
//     if (students) {
//       setLoading(false);
//       setAllStudents(students || []);
//     }
//   }, []);

//   const handleTermChange = (event) => {
//     setSelectedTerm(event.target.value);
//   };

//   const getDay = (date) => {
//     const day = new Date(date).toLocaleDateString("en-US", { weekday: 'long' })
//     return day
//   }

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     });
//   }

//     const formatTime = (time) => {
//       const [hours, minutes] = time.split(':');
//       const date = new Date();
//       date.setHours(parseInt(hours,10))
//       date.setMinutes(parseInt(minutes,10))
//       return date.toLocaleTimeString('en-US',{hour: '2-digit',minute: '2-digit',});
//     }


//   const renderExamTable = () => {
//     if (!examData || examData.length === 0) {
//       return <p>No exams scheduled.</p>;
//     }

//     const filteredExams = selectedTerm
//       ? examData.filter((exam) => exam._id === selectedTerm)
//       : examData;

//       return filteredExams.map((exam) => (
//         <div className="mb-4 border-2" key={exam._id}>
//         <h4 className="font-bold text-lg bg-gray-200 p-2">{exam.name}</h4>
//       <table className="w-full mb-1 text-sm border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border border-gray-300 p-2">Subject</th>
//             <th className="border border-gray-300 p-2">Examination Date</th>
//             <th className="border border-gray-300 p-2">Day</th>
//             <th className="border border-gray-300 p-2">Timing</th>
//             <th className="border border-gray-300 p-2">Checked By</th>
//           </tr>
//         </thead>
//         <tbody>
//           {exam?.subjects?.map((subject) => (
//             <tr key={subject._id}>
//               <td className="border border-gray-300 p-2">{subject.name}</td>
//               <td className="border border-gray-300 p-2">
//                 {formatDate(subject.examDate)}
//               </td>
//                <td className="border border-gray-300 p-2">
//                 {getDay(subject.examDate)}
//               </td>
//               <td className="border border-gray-300 p-2">
//                 {formatTime(subject.startTime)} to {formatTime(subject.endTime)}
//               </td>
//               <td className="border border-gray-300 p-2">
//                 ....................
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     ));
//   };

//   return (
//     <div>
//       <div
//         className="rounded-tl-lg rounded-tr-lg border flex justify-between text-white px-2 py-2 px-2"
//         style={{
//           background: `linear-gradient(to bottom, ${currentColor}, #8d8b8b)`,
//         }}
//       >
//         <p className="text-lg">Admit Card</p>
//         <MdDownload onClick={generatePDF} className="text-2xl cursor-pointer" />
//       </div>
//       <div className="mb-4">
//         <h3 className="text-lg font-semibold mb-2">Select Student</h3>
//         <select
//           className="p-2 border rounded"
//           onChange={(e) => {
//             const selected = allStudents.find(
//               (student) => student?._id === e.target.value
//             );
//             setSelectedStudent(selected);
//           }}
//         >
//           <option value="">Select a student</option>
//           {allStudents.map((student) => (
//             <option key={student?._id} value={student?._id}>
//               {student?.fullName} - Class {student?.class} {student?.section}{" "}
//               (Roll No: {student?.rollNo})
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="mb-4">
//       <h3 className="text-lg font-semibold mb-2">Select Term</h3>
//       <select
//           className="p-2 border rounded"
//           value={selectedTerm}
//            onChange={handleTermChange}
//           >
//           <option value="">All terms</option>
//           {examData.map((exam) => (
//             <option key={exam?._id} value={exam?._id}>
//               {exam?.name}
//             </option>
//           ))}
//         </select>
//         </div>
//       <div className="w-full flex justify-center">
//         <div className="a4">
//           <div className="content border-2 m-1">
//             <div ref={componentPDF} className="p-12">
//               <div className="bg-white border-2 rounded-md p-6 max-w-4xl mx-auto mb-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="h-[70px] w-[70px]">
//                     <img
//                       src={schoolImage}
//                       alt="School Logo"
//                       className="w-full object-contain"
//                     />
//                   </div>
//                   <div className="text-center">
//                     <h1 className="text-red-600 font-bold text-3xl">
//                       {SchoolDetails?.schoolName}
//                     </h1>
//                     <p className="text-blue-600 text-xl">
//                       {SchoolDetails?.address}
//                     </p>
//                     <p className="text-green-600 text-sm font-bold">
//                       {SchoolDetails?.email}
//                     </p>
//                     <p className="text-green-600 text-sm font-bold">
//                       {SchoolDetails?.contact}
//                     </p>
//                   </div>
//                   <div className="w-[70px]"></div>
//                 </div>

//                 <div className="grid grid-cols-3 gap-4 border p-2 mb-1">
//                   <div>
//                     <table className=" text-sm">
//                       <tbody>
//                         <tr>
//                           <td className="font-semibold py-1 whitespace-nowrap">
//                             Admission No. :
//                           </td>
//                           <td className="whitespace-nowrap to-blue-700 font-semibold">
//                             {selectedStudent?.admissionNumber || "N/A"}
//                           </td>
//                         </tr>
//                         <tr>
//                           <td className="font-semibold py-1 whitespace-nowrap">
//                             Student's Name :
//                           </td>
//                           <td className="whitespace-nowrap">
//                             {selectedStudent?.fullName || "N/A"}
//                           </td>
//                         </tr>
//                         <tr>
//                           <td className="font-semibold py-1 whitespace-nowrap">
//                             Father's Name :
//                           </td>
//                           <td className="whitespace-nowrap">
//                             {selectedStudent?.fatherName || "N/A"}
//                           </td>
//                         </tr>
//                         <tr>
//                           <td className="font-semibold py-1 whitespace-nowrap">
//                             Mother's Name :
//                           </td>
//                           <td className="whitespace-nowrap">
//                             {selectedStudent?.motherName || "N/A"}
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>

//                   <div>
//                     <table className="ml-3 text-sm">
//                       <tbody>
//                         <tr>
//                           <td className="font-semibold py-1 whitespace-nowrap">
//                             Class :
//                           </td>
//                           <td>
//                             {selectedStudent?.class || "N/A"}-
//                             {selectedStudent?.section || ""}
//                           </td>
//                         </tr>
//                         <tr>
//                           <td className="font-semibold py-1 whitespace-nowrap">
//                             Roll No. :
//                           </td>
//                           <td className="whitespace-nowrap">
//                             {selectedStudent?.rollNo || "N/A"}
//                           </td>
//                         </tr>
//                         <tr>
//                           <td className="font-semibold py-1">DOB :</td>
//                           <td>
//                             {selectedStudent?.dateOfBirth
//                               ? new Date(
//                                   selectedStudent.dateOfBirth
//                                 ).toLocaleDateString("en-GB", {
//                                   day: "2-digit",
//                                   month: "2-digit",
//                                   year: "numeric",
//                                 })
//                               : "N/A"}
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>

//                   <div className="flex justify-end ">
//                     <img
//                       src={
//                         selectedStudent?.image?.url ||
//                         "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
//                       }
//                       alt="Student"
//                       className="w-24 h-24 object-cover border border-gray-300 "
//                     />
//                   </div>
//                 </div>

//                 {renderExamTable()}

//                 <div className="mb-6">
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
//       {loading && (
//         <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-200 bg-opacity-70 z-50">
//           <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdmitCard;



// import React, { useEffect, useRef, useState } from "react";
// import { useReactToPrint } from "react-to-print";
// import { useStateContext } from "../../contexts/ContextProvider";
// import { MdDownload } from "react-icons/md";
// import axios from "axios";
// import Cookies from "js-cookie";

// const AdmitCard = () => {
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const { currentColor } = useStateContext();
//   const [loading, setLoading] = useState(false);
//   const [allStudents, setAllStudents] = useState([]);
//   const [examData, setExamData] = useState([]);
//   const schoolImage = sessionStorage.getItem("schoolImage");
//   const SchoolDetails = JSON.parse(localStorage.getItem("SchoolDetails"));
//   const componentPDF = useRef();
//   const authToken = Cookies.get("token");

//   const generatePDF = useReactToPrint({
//     content: () => componentPDF.current,
//     documentTitle: `${selectedStudent?.fullName || "Student"}_Admit_Card`,
//     onAfterPrint: () => alert("Downloaded successfully"),
//   });

//   const getResult = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         "https://eserver-i5sm.onrender.com/api/v1/exam/getExams",
//         {
//           withCredentials: true,
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );
//       setLoading(false);
//       setExamData(response.data.exams);
//     } catch (error) {
//       console.error("Error fetching exams:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getResult();
//   }, []);

//   useEffect(() => {
//     setLoading(true);
//     const students = JSON.parse(localStorage.getItem("studentsData"));
//     if (students) {
//       setLoading(false);
//       setAllStudents(students || []);
//     }
//   }, []);
//   const getDay = (date) => {
//     const day = new Date(date).toLocaleDateString("en-US", { weekday: 'long' })
//     return day
//   }

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     });
//   }
//   const formatTime = (time) => {
//     const [hours, minutes] = time.split(':');
//     const date = new Date();
//     date.setHours(parseInt(hours,10))
//     date.setMinutes(parseInt(minutes,10))
//     return date.toLocaleTimeString('en-US',{hour: '2-digit',minute: '2-digit',});
//   }

//   const renderExamTable = () => {
//     if (!examData || examData.length === 0) {
//       return <p>No exams scheduled.</p>;
//     }

//     return examData.map((exam) => (
//         <div className="mb-4 border-2" key={exam._id}>
//         <h4 className="font-bold text-lg bg-gray-200 p-2">{exam.name}</h4>
//       <table className="w-full mb-1 text-sm border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border border-gray-300 p-2">Subject</th>
//             <th className="border border-gray-300 p-2">Examination Date</th>
//             <th className="border border-gray-300 p-2">Day</th>
//             <th className="border border-gray-300 p-2">Timing</th>
//             <th className="border border-gray-300 p-2">Checked By</th>
//           </tr>
//         </thead>
//         <tbody>
//           {exam?.subjects?.map((subject) => (
//             <tr key={subject._id}>
//               <td className="border border-gray-300 p-2">{subject.name}</td>
//               <td className="border border-gray-300 p-2">
//                 {formatDate(subject.examDate)}
//               </td>
//               <td className="border border-gray-300 p-2">
//                 {getDay(subject.examDate)}
//               </td>
//               <td className="border border-gray-300 p-2">
//                   {formatTime(subject.startTime)} to {formatTime(subject.endTime)}
//               </td>
//               <td className="border border-gray-300 p-2">
//                 ....................
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     ));
//   };


//   return (
//     <div>
//       <div
//         className="rounded-tl-lg rounded-tr-lg border flex justify-between text-white px-2 py-2 px-2"
//         style={{
//           background: `linear-gradient(to bottom, ${currentColor}, #8d8b8b)`,
//         }}
//       >
//         <p className="text-lg">Admit Card</p>
//         <MdDownload onClick={generatePDF} className="text-2xl cursor-pointer" />
//       </div>
//       <div className="mb-4">
//         <h3 className="text-lg font-semibold mb-2">Select Student</h3>
//         <select
//           className="p-2 border rounded"
//           onChange={(e) => {
//             const selected = allStudents.find(
//               (student) => student?._id === e.target.value
//             );
//             setSelectedStudent(selected);
//           }}
//         >
//           <option value="">Select a student</option>
//           {allStudents.map((student) => (
//             <option key={student?._id} value={student?._id}>
//               {student?.fullName} - Class {student?.class} {student?.section}{" "}
//               (Roll No: {student?.rollNo})
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="w-full flex justify-center">
//         <div className="a4">
//           <div className="content border-2 m-1">
//             <div ref={componentPDF} className="p-12">
//               <div className="bg-white border-2 rounded-md p-6 max-w-4xl mx-auto mb-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="h-[70px] w-[70px]">
//                     <img
//                       src={schoolImage}
//                       alt="School Logo"
//                       className="w-full object-contain"
//                     />
//                   </div>
//                   <div className="text-center">
//                     <h1 className="text-red-600 font-bold text-3xl">
//                       {SchoolDetails?.schoolName}
//                     </h1>
//                     <p className="text-blue-600 text-xl">
//                       {SchoolDetails?.address}
//                     </p>
//                     <p className="text-green-600 text-sm font-bold">
//                       {SchoolDetails?.email}
//                     </p>
//                     <p className="text-green-600 text-sm font-bold">
//                       {SchoolDetails?.contact}
//                     </p>
//                   </div>
//                   <div className="w-[70px]"></div>
//                 </div>

//                 <div className="grid grid-cols-3 gap-4 border p-2 mb-1">
//                   <div>
//                     <table className=" text-sm">
//                       <tbody>
//                         <tr>
//                           <td className="font-semibold py-1 whitespace-nowrap">
//                             Admission No. :
//                           </td>
//                           <td className="whitespace-nowrap to-blue-700 font-semibold">
//                             {selectedStudent?.admissionNumber || "N/A"}
//                           </td>
//                         </tr>
//                         <tr>
//                           <td className="font-semibold py-1 whitespace-nowrap">
//                             Student's Name :
//                           </td>
//                           <td className="whitespace-nowrap">
//                             {selectedStudent?.fullName || "N/A"}
//                           </td>
//                         </tr>
//                         <tr>
//                           <td className="font-semibold py-1 whitespace-nowrap">
//                             Father's Name :
//                           </td>
//                           <td className="whitespace-nowrap">
//                             {selectedStudent?.fatherName || "N/A"}
//                           </td>
//                         </tr>
//                         <tr>
//                           <td className="font-semibold py-1 whitespace-nowrap">
//                             Mother's Name :
//                           </td>
//                           <td className="whitespace-nowrap">
//                             {selectedStudent?.motherName || "N/A"}
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>

//                   <div>
//                     <table className="ml-3 text-sm">
//                       <tbody>
//                         <tr>
//                           <td className="font-semibold py-1 whitespace-nowrap">
//                             Class :
//                           </td>
//                           <td>
//                             {selectedStudent?.class || "N/A"}-
//                             {selectedStudent?.section || ""}
//                           </td>
//                         </tr>
//                         <tr>
//                           <td className="font-semibold py-1 whitespace-nowrap">
//                             Roll No. :
//                           </td>
//                           <td className="whitespace-nowrap">
//                             {selectedStudent?.rollNo || "N/A"}
//                           </td>
//                         </tr>
//                         <tr>
//                           <td className="font-semibold py-1">DOB :</td>
//                           <td>
//                             {selectedStudent?.dateOfBirth
//                               ? new Date(
//                                   selectedStudent.dateOfBirth
//                                 ).toLocaleDateString("en-GB", {
//                                   day: "2-digit",
//                                   month: "2-digit",
//                                   year: "numeric",
//                                 })
//                               : "N/A"}
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>

//                   <div className="flex justify-end ">
//                     <img
//                       src={
//                         selectedStudent?.image?.url ||
//                         "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
//                       }
//                       alt="Student"
//                       className="w-24 h-24 object-cover border border-gray-300 "
//                     />
//                   </div>
//                 </div>

//                 {renderExamTable()}

//                 <div className="mb-6">
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
//       {loading && (
//         <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-200 bg-opacity-70 z-50">
//           <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdmitCard;






// import React, { useEffect, useRef, useState } from "react";
// import { useReactToPrint } from "react-to-print";
// import { useStateContext } from "../../contexts/ContextProvider";
// import { MdDownload } from "react-icons/md";
// import axios from "axios";
// import Cookies from "js-cookie";

// const AdmitCard = () => {
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const { currentColor } = useStateContext();
//   const [loading, setLoading] = useState(false);
//   const [allStudents, setAllStudents] = useState([]);
//   const schoolImage = sessionStorage.getItem("schoolImage");
//   const SchoolDetails = JSON.parse(localStorage.getItem("SchoolDetails"));
//   const componentPDF = useRef();
//   const authToken = Cookies.get("token");
//   const generatePDF = useReactToPrint({
//     content: () => componentPDF.current,
//     documentTitle: `${selectedStudent?.fullName || "Student"}_Report_Card`,
//     onAfterPrint: () => alert("Downloaded successfully"),
//   });
//   const getResult = async () => {
//     setLoading(true);
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
//       setLoading(false);
//       setExamData(response.data.exams); // Save exams data to state
//     } catch (error) {
//       console.error("Error fetching exams:", error);
//     }
//   };
//   useEffect(()=>{
//     getResult();
//   },[])
//   useEffect(() => {
    
//     setLoading(true);
//     const students = JSON.parse(localStorage.getItem("studentsData"));
//     if (students) {
//       setLoading(false);
//       setAllStudents(students || []);
//     }
//   }, []);
//   return (
//     <div>
//       <div
//         className="rounded-tl-lg rounded-tr-lg border flex justify-between text-white px-2 py-2 px-2"
//         style={{
//           background: `linear-gradient(to bottom, ${currentColor}, #8d8b8b)`,
//         }}
//       >
//         <p className="text-lg">Report Card</p>
//         <MdDownload onClick={generatePDF} className="text-2xl cursor-pointer" />
//       </div>
//       <div className="mb-4">
//         <h3 className="text-lg font-semibold mb-2">Select Student</h3>
//         <select
//           className="p-2 border rounded"
//           onChange={(e) => {
//             const selected = allStudents.find(
//               (student) => student?._id === e.target.value
//             );
//             setSelectedStudent(selected);
//           }}
//         >
//           <option value="">Select a student</option>
//           {allStudents.map((student) => (
//             <option key={student?._id} value={student?._id}>
//               {student?.fullName} - Class {student?.class} {student?.section}{" "}
//               (Roll No: {student?.rollNo})
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="w-full flex justify-center">
//         <div className="a4">
//           <div className="content border-2 m-1">
//             <div ref={componentPDF} className="p-12">
//               <div className="bg-white border-2 rounded-md p-6 max-w-4xl mx-auto mb-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="h-[70px] w-[70px]">
//                     <img
//                       src={schoolImage}
//                       alt="School Logo"
//                       className="w-full object-contain"
//                     />
//                   </div>
//                   <div className="text-center">
//                     <h1 className="text-red-600 font-bold text-3xl">
//                       {SchoolDetails?.schoolName}
//                     </h1>
//                     <p className="text-blue-600 text-xl">
//                       {SchoolDetails?.address}
//                     </p>
//                     <p className="text-green-600 text-sm font-bold">
//                       {SchoolDetails?.email}
//                     </p>
//                     <p className="text-green-600 text-sm font-bold">
//                       {SchoolDetails?.contact}
//                     </p>
//                   </div>
//                   <div className="w-[70px]"></div>
//                 </div>

//                 <div className="grid grid-cols-3 gap-4 border p-2 mb-1">
//                   <div>
//                     <table className=" text-sm">
//                       <tbody>
//                         <tr>
//                           <td className="font-semibold py-1 whitespace-nowrap">
//                             Admission No. :
//                           </td>
//                           <td className="whitespace-nowrap to-blue-700 font-semibold">
//                             {selectedStudent?.admissionNumber || "N/A"}
//                           </td>
//                         </tr>
//                         <tr>
//                           <td className="font-semibold py-1 whitespace-nowrap">
//                             Student's Name :
//                           </td>
//                           <td className="whitespace-nowrap">
//                             {selectedStudent?.fullName || "N/A"}
//                           </td>
//                         </tr>
//                         <tr>
//                           <td className="font-semibold py-1 whitespace-nowrap">
//                             Father's Name :
//                           </td>
//                           <td className="whitespace-nowrap">
//                             {selectedStudent?.fatherName || "N/A"}
//                           </td>
//                         </tr>
//                         <tr>
//                           <td className="font-semibold py-1 whitespace-nowrap">
//                             Mother's Name :
//                           </td>
//                           <td className="whitespace-nowrap">
//                             {selectedStudent?.motherName || "N/A"}
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>

//                   <div>
//                     <table className="ml-3 text-sm">
//                       <tbody>
//                         <tr>
//                           <td className="font-semibold py-1 whitespace-nowrap">
//                             Class :
//                           </td>
//                           <td>
//                             {selectedStudent?.class || "N/A"}-
//                             {selectedStudent?.section || ""}
//                           </td>
//                         </tr>
//                         <tr>
//                           <td className="font-semibold py-1 whitespace-nowrap">
//                             Roll No. :
//                           </td>
//                           <td className="whitespace-nowrap">
//                             {selectedStudent?.rollNo || "N/A"}
//                           </td>
//                         </tr>
//                         <tr>
//                           <td className="font-semibold py-1">DOB :</td>
//                           <td>
//                             {selectedStudent?.dateOfBirth
//                               ? new Date(
//                                   selectedStudent.dateOfBirth
//                                 ).toLocaleDateString("en-GB", {
//                                   day: "2-digit",
//                                   month: "2-digit",
//                                   year: "numeric",
//                                 })
//                               : "N/A"}
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>

//                   <div className="flex justify-end ">
//                     <img
//                       src={
//                         selectedStudent?.image?.url ||
//                         "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
//                       }
//                       alt="Student"
//                       className="w-24 h-24 object-cover border border-gray-300 "
//                     />
//                   </div>
//                 </div>
// <table>
//   <thead>
//     <tr>

//     </tr>
//   </thead>
//   <tbody>
//     <tr>

//     </tr>
//   </tbody>
// </table>
                

//                 <table className="w-full mb-1 text-sm border-collapse border border-gray-300">
//                   <thead>
//                     <tr className="bg-gray-200">
//                       <th className="border border-gray-300 p-2">Activity</th>
//                       <th className="border border-gray-300 p-2">Grade</th>
//                     </tr>
//                   </thead>

                 
//                 </table>
               
//                 <div className="mb-6">
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
//       {loading && (
//         <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-200 bg-opacity-70 z-50">
//           <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdmitCard;
