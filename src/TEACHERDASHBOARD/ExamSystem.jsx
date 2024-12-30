import React, { useState } from 'react';
import CreateExam from './NewExam/CreateExam';
import ViewExam from './NewExam/ViewExam';
import AllotMarks from './NewExam/AllotMarks';
import ReportCard from './NewExam/ReportCard';
import { useStateContext } from '../contexts/ContextProvider';

const ExamSystem = () => {
  const [activeTab, setActiveTab] = useState('createExam');
  const { currentColor } = useStateContext();
  const data = {
    createExam: <CreateExam/>,
    viewEcam: <ViewExam/>,
    allotMarks: <AllotMarks/>,
    reportCard: <ReportCard/>,
    // reportCard: <ReportCard/>,
   
  };
  
  return (
    <div>
     
      <div className="tabs  w-full px-5 pt-0 lg:pt-2"
    //   style={{background:currentColor}}
    style={{ background: `linear-gradient(to bottom, ${currentColor}, ${"#8d8b8b"})` }}
      >
        <button
          onClick={() => setActiveTab('createExam')}
          className={`px-4 py-[1px] lg:py-2 text-[12px] lg:text-[14px]   ${activeTab === 'createExam' ? ' text-white  border-b-0 rounded-tl-lg border rounded-tr-lg ' : 'border rounded-tl-lg rounded-tr-lg'}`}
          style={{ background: activeTab === 'createExam' ? currentColor : 'transparent' }}
       >
          Create Exam
        </button>
        <button
          onClick={() => setActiveTab('viewEcam')}
          className={`px-4 py-[1px] lg:py-2 text-[12px] lg:text-[14px]    ${activeTab === 'viewEcam' ? '  text-white  border-b-0 rounded-tl-lg border rounded-tr-lg ' : 'border rounded-tl-lg rounded-tr-lg'}`}
          style={{ background: activeTab === 'viewEcam' ? currentColor : 'transparent' }}
       >
          View Exam
        </button>
        <button
          onClick={() => setActiveTab('allotMarks')}
          className={`px-4 py-[1px] lg:py-2 text-[12px] lg:text-[14px]   ${activeTab === 'allotMarks' ? '  text-white  border-b-0 rounded-tl-lg border rounded-tr-lg ' : 'border rounded-tl-lg rounded-tr-lg'}`}
          style={{ background: activeTab === 'allotMarks' ? currentColor : 'transparent' }}
        >
          Allot Marks
        </button>
        <button
          onClick={() => setActiveTab('reportCard')}
          className={`px-4 py-[1px] lg:py-2 text-[12px] lg:text-[14px]    ${activeTab === 'reportCard' ? '  text-white  border-b-0 rounded-tl-lg border rounded-tr-lg ' : 'border rounded-tl-lg rounded-tr-lg'}`}
          style={{ background: activeTab === 'reportCard' ? currentColor : 'transparent' }}
       >
          Report Card
        </button>
      
      </div>
      
      <div>
        {/* <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2> */}
        {data[activeTab]}
      </div>
    </div>
  );
};

export default ExamSystem;


// import React, { useState } from 'react';

// const ExamSystem = () => {
//   const [activeTab, setActiveTab] = useState('examDetails');

//   const data = {
//     examDetails: "This section contains details about the exam such as schedule, subjects, and format.",
//     syllabus: "This section lists the topics covered in the exam.",
//     results: "This section shows the results of previous exams.",
//     guidelines: "This section provides guidelines on how to prepare for the exam."
//   };

//   return (
//     <div>
//       <h1>Exam System</h1>
//       <div className="tabs">
//         <button onClick={() => setActiveTab('examDetails')}>Exam Details</button>
//         <button onClick={() => setActiveTab('syllabus')}>Syllabus</button>
//         <button onClick={() => setActiveTab('results')}>Results</button>
//         <button onClick={() => setActiveTab('guidelines')}>Guidelines</button>
//       </div>
      
//       <div className="content">
//         <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
//         <p>{data[activeTab]}</p>
//       </div>
//     </div>
//   );
// };

// export default ExamSystem;



// import React from 'react'

// const ExamSystem = () => {
//   return (
//     <div></div>
//   )
// }

// export default ExamSystem