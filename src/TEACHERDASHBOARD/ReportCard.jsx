import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Typography,
  Divider,
  Grid
} from '@mui/material';
import { Download, Print } from '@mui/icons-material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ReportCardGenerator = ({ examData, studentData, results }) => {
  const [reportCard, setReportCard] = useState(null);

  const calculateGrade = (percentage, gradingScale) => {
    return gradingScale.find(grade => 
      percentage >= grade.minPercent && percentage <= grade.maxPercent
    ) || { name: 'N/A', gradePoint: 0 };
  };

  const calculateSubjectResult = (marks, subject) => {
    let totalObtained = 0;
    let totalWeightage = 0;

    subject.assessmentComponents.forEach(component => {
      const componentMarks = marks[component.name] || 0;
      const componentPercentage = (componentMarks / component.maxMarks) * component.weightage;
      totalObtained += componentPercentage;
      totalWeightage += component.weightage;
    });

    const percentage = totalWeightage > 0 ? (totalObtained / totalWeightage) * 100 : 0;
    const isPassing = subject.passingMarks ? totalObtained >= subject.passingMarks : true;

    return {
      totalMarks: subject.totalMarks,
      marksObtained: totalObtained,
      percentage: percentage,
      isPassing,
      grade: calculateGrade(percentage, examData.gradingScale),
      assessmentBreakdown: subject.assessmentComponents.map(component => ({
        name: component.name,
        maxMarks: component.maxMarks,
        weightage: component.weightage,
        obtained: marks[component.name] || 0,
        percentage: ((marks[component.name] || 0) / component.maxMarks) * 100
      }))
    };
  };

  useEffect(() => {
    if (examData && studentData && results) {
      const subjectResults = examData.classes[0].subjects.map(subject => ({
        subject: subject.name,
        subjectCode: subject.code,
        type: subject.type,
        ...calculateSubjectResult(results[subject.name] || {}, subject)
      }));

      const mainSubjects = subjectResults.filter(result => result.type === 'MAIN');
      const electiveSubjects = subjectResults.filter(result => result.type === 'ELECTIVE');
      const coScholasticSubjects = subjectResults.filter(result => result.type === 'CO_SCHOLASTIC');

      const totalMarks = mainSubjects.reduce((sum, result) => sum + result.totalMarks, 0);
      const totalObtained = mainSubjects.reduce((sum, result) => sum + result.marksObtained, 0);
      const overallPercentage = (totalObtained / totalMarks) * 100;

      // Calculate pass/fail status based on exam criteria
      const passingCriteria = examData.resultCalculation.passingCriteria;
      const passedSubjectsCount = mainSubjects.filter(result => result.isPassing).length;
      const hasPassed = overallPercentage >= (passingCriteria?.overallPercentage || 0) &&
                       passedSubjectsCount >= (passingCriteria?.minimumSubjects || mainSubjects.length);

      setReportCard({
        studentInfo: {
          name: studentData.name,
          rollNo: studentData.rollNo,
          class: studentData.className,
          section: studentData.section,
          admissionNo: studentData.admissionNo
        },
        examInfo: {
          name: examData.examName,
          term: examData.term,
          academicYear: examData.academicYear,
          type: examData.examType
        },
        results: {
          mainSubjects,
          electiveSubjects,
          coScholasticSubjects
        },
        overall: {
          totalMarks,
          totalObtained,
          percentage: overallPercentage,
          grade: calculateGrade(overallPercentage, examData.gradingScale),
          hasPassed,
          passedSubjects: passedSubjectsCount,
          totalSubjects: mainSubjects.length
        }
      });
    }
  }, [examData, studentData, results]);

  const downloadPDF = async () => {
    const element = document.getElementById('report-card');
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${reportCard.studentInfo.name}_report_card.pdf`);
  };

  const printReportCard = () => {
    window.print();
  };

  if (!reportCard) return <div>Loading report card...</div>;

  return (
    <div id="report-card" className="p-8 bg-white">
      {/* Header Actions */}
      <div className="flex justify-between mb-6">
        <Typography variant="h4" component="h1">Report Card</Typography>
        <div>
          <Button
            startIcon={<Print />}
            variant="outlined"
            onClick={printReportCard}
            className="mr-2"
          >
            Print
          </Button>
          <Button
            startIcon={<Download />}
            variant="contained"
            onClick={downloadPDF}
          >
            Download PDF
          </Button>
        </div>
      </div>

      {/* Student and Exam Information */}
      <Grid container spacing={4} className="mb-6">
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className="mb-2">Student Information</Typography>
          <div className="grid grid-cols-2 gap-2">
            <div>Name:</div>
            <div>{reportCard.studentInfo.name}</div>
            <div>Class:</div>
            <div>{reportCard.studentInfo.class} - {reportCard.studentInfo.section}</div>
            <div>Roll No:</div>
            <div>{reportCard.studentInfo.rollNo}</div>
            <div>Admission No:</div>
            <div>{reportCard.studentInfo.admissionNo}</div>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className="mb-2">Examination Details</Typography>
          <div className="grid grid-cols-2 gap-2">
            <div>Exam:</div>
            <div>{reportCard.examInfo.name}</div>
            <div>Type:</div>
            <div>{reportCard.examInfo.type.replace('_', ' ')}</div>
            <div>Term:</div>
            <div>{reportCard.examInfo.term}</div>
            <div>Academic Year:</div>
            <div>{reportCard.examInfo.academicYear}</div>
          </div>
        </Grid>
      </Grid>

      {/* Main Subjects Results */}
      <Typography variant="h6" className="mb-2">Main Subjects</Typography>
      <TableContainer component={Paper} className="mb-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell>Code</TableCell>
              <TableCell align="right">Max Marks</TableCell>
              <TableCell align="right">Marks Obtained</TableCell>
              <TableCell align="right">Percentage</TableCell>
              <TableCell align="right">Grade</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportCard.results.mainSubjects.map((result, index) => (
              <TableRow key={index}>
                <TableCell>{result.subject}</TableCell>
                <TableCell>{result.subjectCode}</TableCell>
                <TableCell align="right">{result.totalMarks}</TableCell>
                <TableCell align="right">{result.marksObtained.toFixed(2)}</TableCell>
                <TableCell align="right">{result.percentage.toFixed(2)}%</TableCell>
                <TableCell align="right">{result.grade.name}</TableCell>
                <TableCell align="right" className={result.isPassing ? 'text-green-600' : 'text-red-600'}>
                  {result.isPassing ? 'Pass' : 'Fail'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Elective Subjects */}
      {reportCard.results.electiveSubjects.length > 0 && (
        <>
          <Typography variant="h6" className="mb-2">Elective Subjects</Typography>
          <TableContainer component={Paper} className="mb-6">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell align="right">Max Marks</TableCell>
                  <TableCell align="right">Marks Obtained</TableCell>
                  <TableCell align="right">Percentage</TableCell>
                  <TableCell align="right">Grade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportCard.results.electiveSubjects.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell>{result.subject}</TableCell>
                    <TableCell>{result.subjectCode}</TableCell>
                    <TableCell align="right">{result.totalMarks}</TableCell>
                    <TableCell align="right">{result.marksObtained.toFixed(2)}</TableCell>
                    <TableCell align="right">{result.percentage.toFixed(2)}%</TableCell>
                    <TableCell align="right">{result.grade.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Co-Scholastic Activities */}
      {reportCard.results.coScholasticSubjects.length > 0 && (
        <>
          <Typography variant="h6" className="mb-2">Co-Scholastic Activities</Typography>
          <TableContainer component={Paper} className="mb-6">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Activity</TableCell>
                  <TableCell align="right">Grade</TableCell>
                  <TableCell>Remarks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportCard.results.coScholasticSubjects.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell>{result.subject}</TableCell>
                    <TableCell align="right">{result.grade.name}</TableCell>
                    <TableCell>{result.grade.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Overall Result */}
      <Divider className="my-4" />
      <div className="border-t pt-4">
        <Typography variant="h6" className="mb-2">Overall Result</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <div className="grid grid-cols-2 gap-2">
              <div>Total Marks:</div>
              <div>{reportCard.overall.totalMarks}</div>
              <div>Marks Obtained:</div>
              <div>{reportCard.overall.totalObtained.toFixed(2)}</div>
              <div>Percentage:</div>
              <div>{reportCard.overall.percentage.toFixed(2)}%</div>
              <div>Grade:</div>
              <div>{reportCard.overall.grade.name}</div>
              <div>Final Result:</div>
              <div className={reportCard.overall.hasPassed ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                {reportCard.overall.hasPassed ? 'PASS' : 'FAIL'}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      {/* Signatures Section */}
      <div className="mt-12 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="border-t border-black pt-2">Class Teacher</div>
        </div>
        <div className="text-center">
          <div className="border-t border-black pt-2">Examination Controller</div>
        </div>
        <div className="text-center">
          <div className="border-t border-black pt-2">Principal</div>
        </div>
      </div>
    </div>
  );
};

export default ReportCardGenerator;