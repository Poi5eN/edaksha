import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Button, 
  Typography, 
  Chip,
  Grid,
  TextField,
  MenuItem,
  IconButton
} from '@mui/material';
// import { Eye, Edit, FileSpreadsheet, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const ExamList = () => {
  const [exams, setExams] = useState([]);
  const [filters, setFilters] = useState({
    academicYear: '',
    term: '',
    examType: '',
    status: ''
  });

  useEffect(() => {
    fetchExams();
  }, [filters]);

  const fetchExams = async () => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`/api/exams?${queryParams}`);
      const data = await response.json();
      if (data.success) {
        setExams(data.examData);
      }
    } catch (error) {
      console.error('Failed to fetch exams:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      DRAFT: 'bg-gray-200 text-gray-700',
      PUBLISHED: 'bg-blue-200 text-blue-700',
      IN_PROGRESS: 'bg-yellow-200 text-yellow-700',
      COMPLETED: 'bg-green-200 text-green-700'
    };
    return colors[status] || 'bg-gray-200';
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <Typography variant="h4">Examinations</Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => window.location.href = '/teacher/CreateExam'}
        >
          Create New Exam
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Academic Year"
                value={filters.academicYear}
                onChange={(e) => setFilters({...filters, academicYear: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                select
                label="Term"
                value={filters.term}
                onChange={(e) => setFilters({...filters, term: e.target.value})}
              >
                <MenuItem value="">All Terms</MenuItem>
                <MenuItem value="Term 1">Term 1</MenuItem>
                <MenuItem value="Term 2">Term 2</MenuItem>
                <MenuItem value="Final">Final</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                select
                label="Exam Type"
                value={filters.examType}
                onChange={(e) => setFilters({...filters, examType: e.target.value})}
              >
                <MenuItem value="">All Types</MenuItem>
                <MenuItem value="UNIT_TEST">Unit Test</MenuItem>
                <MenuItem value="TERM">Term</MenuItem>
                <MenuItem value="SEMESTER">Semester</MenuItem>
                <MenuItem value="FINAL">Final</MenuItem>
                <MenuItem value="PRACTICAL">Practical</MenuItem>
                <MenuItem value="PROJECT">Project</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                select
                label="Status"
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="DRAFT">Draft</MenuItem>
                <MenuItem value="PUBLISHED">Published</MenuItem>
                <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                <MenuItem value="COMPLETED">Completed</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Exam Cards */}
      <Grid container spacing={3}>
        {exams.map((exam) => (
          <Grid item xs={12} md={6} lg={4} key={exam._id}>
            <Card className="h-full">
              <CardContent>
                <div className="flex justify-between items-start mb-4">
                  <Typography variant="h6" className="font-bold">
                    {exam.examName}
                  </Typography>
                  <Chip 
                    label={exam.status} 
                    className={getStatusColor(exam.status)}
                  />
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    {/* <Calendar className="w-4 h-4" /> */}
                    <Typography variant="body2">
                      {exam.academicYear} - {exam.term}
                    </Typography>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* <FileSpreadsheet className="w-4 h-4" /> */}
                    <Typography variant="body2">
                      {exam.examType.replace('_', ' ')}
                    </Typography>
                  </div>
                  <Typography variant="body2" className="text-gray-600">
                    Classes: {exam.classes.map(c => `${c.className}-${c.section}`).join(', ')}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    Created: {format(new Date(exam.createdAt), 'MMM dd, yyyy')}
                  </Typography>
                </div>

                <div className="flex justify-end gap-2">
                  <IconButton 
                    size="small"
                    onClick={() => window.location.href = `/exams/${exam._id}`}
                  >
                    {/* <Eye className="w-5 h-5" /> */}
                  </IconButton>
                  {/* {exam.status === 'DRAFT' && (
                    <IconButton 
                      size="small"
                      onClick={() => window.location.href = `/exams/${exam._id}/edit`}
                    >
                      <Edit className="w-5 h-5" />
                    </IconButton>
                  )} */}
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ExamList;