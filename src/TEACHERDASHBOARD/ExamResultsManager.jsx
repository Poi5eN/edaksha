import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
// import { FileSpreadsheet, Download, Printer, Eye, Upload } from 'lucide-react';
import { useParams } from 'react-router-dom';
import ReportCardGenerator from './ReportCard';

const ExamResultsManager = () => {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [results, setResults] = useState({});
  const [showReportCard, setShowReportCard] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchExamDetails();
  }, [examId]);

  useEffect(() => {
    if (selectedClass) {
      fetchStudents();
      fetchResults();
    }
  }, [selectedClass]);

  const fetchExamDetails = async () => {
    try {
      const response = await fetch(`/api/exams/${examId}`);
      const data = await response.json();
      if (data.success) {
        setExam(data.examData);
        setSelectedClass(data.examData.classes[0]);
      }
    } catch (error) {
      console.error('Failed to fetch exam details:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch(
        `/api/students?class=${selectedClass.className}&section=${selectedClass.section}`
      );
      const data = await response.json();
      if (data.success) {
        setStudents(data.students);
      }
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };

  const fetchResults = async () => {
    try {
      const response = await fetch(
        `/api/results?examId=${examId}&class=${selectedClass.className}&section=${selectedClass.section}`
      );
      const data = await response.json();
      if (data.success) {
        setResults(data.results);
      }
    } catch (error) {
      console.error('Failed to fetch results:', error);
    }
  };

  const handleMarkUpdate = async (studentId, subjectCode, componentName, value) => {
    try {
      await fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examId,
          studentId,
          subjectCode,
          componentName,
          marks: parseFloat(value)
        })
      });
      fetchResults(); // Refresh results after update
    } catch (error) {
      console.error('Failed to update marks:', error);
    }
  };

  const downloadResultSheet = async () => {
    try {
      const response = await fetch(
        `/api/results/download?examId=${examId}&class=${selectedClass.className}&section=${selectedClass.section}`,
        { responseType: 'blob' }
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${exam.examName}_${selectedClass.className}_${selectedClass.section}_results.xlsx`;
      a.click();
    } catch (error) {
      console.error('Failed to download result sheet:', error);
    }
  };

  const uploadResultSheet = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('examId', examId);
    formData.append('class', selectedClass.className);
    formData.append('section', selectedClass.section);

    try {
      const response = await fetch('/api/results/upload', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        fetchResults(); // Refresh results after upload
      }
    } catch (error) {
      console.error('Failed to upload result sheet:', error);
    }
  };

  const generateBulkReportCards = async () => {
    try {
      const response = await fetch(
        `/api/reports/bulk?examId=${examId}&class=${selectedClass.className}&section=${selectedClass.section}`,
        { responseType: 'blob' }
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${exam.examName}_${selectedClass.className}_${selectedClass.section}_report_cards.pdf`;
      a.click();
    } catch (error) {
      console.error('Failed to generate bulk report cards:', error);
    }
  };

  if (!exam || !selectedClass) return <div>Loading...</div>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Typography variant="h4">{exam.examName} Results</Typography>
          <Typography variant="subtitle1" className="text-gray-600">
            {selectedClass.className}-{selectedClass.section}
          </Typography>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            // startIcon={<Upload />}
            component="label"
          >
            Upload Results
            <input
              type="file"
              hidden
              accept=".xlsx,.xls"
              onChange={(e) => uploadResultSheet(e.target.files[0])}
            />
          </Button>
          <Button
            variant="outlined"
            // startIcon={<Download />}
            onClick={downloadResultSheet}
          >
            Download Template
          </Button>
          <Button
            variant="contained"
            // startIcon={<FileSpreadsheet />}
            onClick={generateBulkReportCards}
          >
            Generate All Report Cards
          </Button>
        </div>
      </div>

      {/* Class Selection */}
      <div className="flex gap-2 mb-4">
        {exam.classes.map(classData => (
          <Button
            key={`${classData.className}-${classData.section}`}
            variant={selectedClass?.className === classData.className ? "contained" : "outlined"}
            onClick={() => setSelectedClass(classData)}
          >
            {classData.className}-{classData.section}
          </Button>
        ))}
      </div>

      {/* Results Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Roll No</TableCell>
              <TableCell>Name</TableCell>
              {selectedClass.subjects.map(subject => (
                <TableCell key={subject.code} colSpan={subject.assessmentComponents.length}>
                  {subject.name}
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell />
              {selectedClass.subjects.map(subject =>
                subject.assessmentComponents.map(component => (
                  <TableCell key={`${subject.code}-${component.name}`}>
                    {component.name} ({component.weightage}%)
                  </TableCell>
                ))
              )}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map(student => (
              <TableRow key={student._id}>
                <TableCell>{student.rollNo}</TableCell>
                <TableCell>{student.name}</TableCell>
                {selectedClass.subjects.map(subject =>
                  subject.assessmentComponents.map(component => (
                    <TableCell key={`${student._id}-${subject.code}-${component.name}`}>
                      <TextField
                        type="number"
                        size="small"
                        value={
                          results[student._id]?.[subject.code]?.[component.name] || ''
                        }
                        onChange={(e) => 
                          handleMarkUpdate(
                            student._id,
                            subject.code,
                            component.name,
                            e.target.value
                          )
                        }
                        InputProps={{ inputProps: { min: 0, max: component.maxMarks } }}
                      />
                    </TableCell>
                  ))
                )}
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setSelectedStudent(student);
                      setShowReportCard(true);
                    }}
                  >
                    {/* <Eye /> */}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Report Card Dialog */}
      <Dialog
        open={showReportCard}
        onClose={() => setShowReportCard(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          Student Report Card
          <IconButton
            onClick={() => setShowReportCard(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            &times;
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedStudent && (
            <ReportCardGenerator
              examData={exam}
              studentData={selectedStudent}
              results={results[selectedStudent._id] || {}}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowReportCard(false)}>Close</Button>
          <Button
            variant="contained"
            // startIcon={<Printer />}
            onClick={() => window.print()}
          >
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ExamResultsManager;