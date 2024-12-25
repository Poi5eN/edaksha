import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Button,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Grid,
} from '@mui/material';
import {
  FileSpreadsheet,
  Calendar,
  Users,
  Download,
  Edit,
} from 'lucide-react';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';

const ExamDetail = () => {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    fetchExamDetails();
  }, [id]);

  const fetchExamDetails = async () => {
    try {
      const response = await fetch(`/api/exams/${id}`);
      const data = await response.json();
      if (data.success) {
        setExam(data.examData);
        if (data.examData.classes.length > 0) {
          setSelectedClass(data.examData.classes[0]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch exam details:', error);
    }
  };

  const calculateDuration = (startTime, endTime) => {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);

    const start = new Date(0, 0, 0, startHour, startMin, 0);
    const end = new Date(0, 0, 0, endHour, endMin, 0);
    const diff = end - start;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  };

  if (!exam) return <div>Loading...</div>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Typography variant="h4">{exam.examName}</Typography>
          <Typography variant="subtitle1" className="text-gray-600">
            {exam.academicYear} - {exam.term}
          </Typography>
        </div>
        <div className="flex gap-2">
          {exam.status === 'DRAFT' && (
            <Button
              variant="outlined"
              startIcon={<Edit />}
              onClick={() => (window.location.href = `/exams/${exam._id}/edit`)}
            >
              Edit
            </Button>
          )}
          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={() => {
              /* Add download logic */
            }}
          >
            Export Data
          </Button>
        </div>
      </div>

      {/* Overview Card */}
      <Card className="mb-6">
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5" />
                  <Typography>
                    Type: {exam.examType.replace('_', ' ')}
                  </Typography>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <Typography>
                    Classes:{' '}
                    {exam.classes
                      .map((c) => `${c.className}-${c.section}`)
                      .join(', ')}
                  </Typography>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <Typography>
                    Schedule:{' '}
                    {format(new Date(exam.schedule.examStart), 'MMM dd')} -{' '}
                    {format(
                      new Date(exam.schedule.examEnd),
                      'MMM dd, yyyy'
                    )}
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="space-y-3">
                <Typography variant="subtitle2">Status Timeline</Typography>
                <div className="flex items-center gap-4">
                  <Chip
                    label={`Created: ${format(
                      new Date(exam.createdAt),
                      'MMM dd, yyyy'
                    )}`}
                    size="small"
                  />
                  <Chip
                    label={`Last Updated: ${format(
                      new Date(exam.updatedAt),
                      'MMM dd, yyyy'
                    )}`}
                    size="small"
                  />
                  <Chip
                    label={`Status: ${exam.status}`}
                    className={`text-white ${
                      exam.status === 'COMPLETED'
                        ? 'bg-green-500'
                        : 'bg-blue-500'
                    }`}
                    size="small"
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={(e, val) => setActiveTab(val)}
        className="mb-4"
      >
        <Tab label="Schedule" />
        <Tab label="Classes & Subjects" />
        <Tab label="Results" />
      </Tabs>

      {/* Schedule Tab */}
      {activeTab === 0 && (
        <Card>
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Class</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Room</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {exam.classes.map((classData) =>
                    classData.subjects.map((subject) => (
                      <TableRow
                        key={`${classData.className}-${subject.code}`}
                      >
                        <TableCell>{`${classData.className}-${classData.section}`}</TableCell>
                        <TableCell>{subject.name}</TableCell>
                        <TableCell>
                          {subject.examDate
                            ? format(
                                new Date(subject.examDate),
                                'MMM dd, yyyy'
                              )
                            : '-'}
                        </TableCell>
                        <TableCell>
                          {subject.startTime} - {subject.endTime}
                        </TableCell>
                        <TableCell>
                          {subject.startTime && subject.endTime
                            ? calculateDuration(
                                subject.startTime,
                                subject.endTime
                              )
                            : '-'}
                        </TableCell>
                        <TableCell>TBD</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {/* Classes & Subjects Tab */}
      {activeTab === 1 && (
        <div className="space-y-4">
          <div className="flex gap-2 mb-4">
            {exam.classes.map((classData) => (
              <Button
                key={`${classData.className}-${classData.section}`}
                variant={
                  selectedClass?.className === classData.className
                    ? 'contained'
                    : 'outlined'
                }
                onClick={() => setSelectedClass(classData)}
              >
                {classData.className}-{classData.section}
              </Button>
            ))}
          </div>

          {selectedClass && (
            <Card>
              <CardContent>
                <Typography variant="h6" className="mb-4">
                  Subjects for {selectedClass.className}-
                  {selectedClass.section}
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Subject</TableCell>
                        <TableCell>Code</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Total Marks</TableCell>
                        <TableCell>Passing Marks</TableCell>
                        <TableCell>Components</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedClass.subjects.map((subject) => (
                        <TableRow key={subject.code}>
                          <TableCell>{subject.name}</TableCell>
                          <TableCell>{subject.code}</TableCell>
                          <TableCell>{subject.type}</TableCell>
                          <TableCell>{subject.totalMarks}</TableCell>
                          <TableCell>{subject.passingMarks}</TableCell>
                          <TableCell>
                            {subject.assessmentComponents.map((comp) => (
                              <Chip
                                key={comp.name}
                                label={`${comp.name} (${comp.weightage}%)`}
                                size="small"
                                className="m-1"
                              />
                            ))}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Results Tab */}
      {activeTab === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-4">
              Results
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Student Name</TableCell>
                    <TableCell>Roll Number</TableCell>
                    <TableCell>Total Marks</TableCell>
                    <TableCell>Obtained Marks</TableCell>
                    <TableCell>Percentage</TableCell>
                    <TableCell>Result</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {exam.results.map((result) => (
                    <TableRow key={result.rollNumber}>
                      <TableCell>{result.studentName}</TableCell>
                      <TableCell>{result.rollNumber}</TableCell>
                      <TableCell>{result.totalMarks}</TableCell>
                      <TableCell>{result.obtainedMarks}</TableCell>
                      <TableCell>
                        {((result.obtainedMarks / result.totalMarks) * 100).toFixed(
                          2
                        )}
                        %
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={result.isPassed ? 'Passed' : 'Failed'}
                          className={`text-white ${
                            result.isPassed
                              ? 'bg-green-500'
                              : 'bg-red-500'
                          }`}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ExamDetail;
