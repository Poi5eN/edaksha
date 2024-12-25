import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import Loading from "../../../Loading";
import SomthingwentWrong from "../../../SomthingwentWrong";
import useCustomQuery from "../../../useCustomQuery";
import axios from "axios";
import "./printSize.css";
import Cookies from "js-cookie";
import { useReactToPrint } from "react-to-print";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Card from "./Card";
const authToken = Cookies.get("token");

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

const AdmitCardUi = () => {
  const { currentColor } = useStateContext();
  const [filterName, setFilterName] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [filteredStudentData, setFilterdStudentData] = useState([]);
  const componentPDF = useRef();
 
  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    onBeforeGetContent: () => {
      document.title = `All Admit Card`;
    },
    onAfterPrint: () => {
      alert("modalData saved in PDF");
      setTimeout(() => {
        document.title = "OriginalTitle";
      }, 100);
    },
  });

  const [examData, setExamData] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [total, SetTotal] = useState(0);
  const { email } = useParams();
  const [studentData, setStudentData] = useState([]);

  const {
    queryData: admitCard,
    loading: admitCardLoading,
    error: admitCardError,
  } = useCustomQuery(
    "https://eserver-i5sm.onrender.com/api/v1/adminRoute/getAllStudents"
  );
// console.log("firstadmitCard".admitCard)
  const {
    queryData: allExam,
    loading: allExamLoading,
    error: allExamError,
  } = useCustomQuery(
    "https://eserver-i5sm.onrender.com/api/v1/exam/getAllExams"
  );

  useEffect(() => {
    if (admitCard) {
      setStudentData(admitCard.allStudent);
      setFilterdStudentData(admitCard.allStudent);
    }
  }, [admitCard]);
  useEffect(() => {
    if (allExam) {
      setExamData(allExam.examData);
      SetTotal(allExam.examData.length);
    }
  }, [allExam]);
  



  const handleExamChange = (e) => {
    setSelectedExam(e.target.value);
  };

  const selectedExamData = examData.find(
    (exam) => exam.examName === selectedExam
  );

  const getDayOfWeek = (dateString) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  };
  const formatExamDate = (examDate) => {
    const date = new Date(examDate);
    return date.toISOString().split("T")[0];
  };

  const handleFilterbyname = (e) => {
    const value = e.target.value;
    setFilterName(value);
    filterStudents(filterClass, value);
  };
  const handleFilterByClass = (e) => {
    let value = e.target.value;
    setFilterClass(value);
    filterStudents(value, filterName);
  };
  const filterStudents = (filterClass, nameFilter) => {
    let filteredData = studentData;

    if (filterClass) {
      filteredData = filteredData.filter((student) =>
        student.class.includes(filterClass.toLowerCase())
      );
    }
    // if (nameFilter) {
    //   filteredData = filteredData.filter((student) =>
    //     student.fullName.includes(nameFilter.toLowerCase())
    //   );
    // }
    if (nameFilter) {
      const nameFilterRegex = new RegExp(nameFilter, 'i'); // 'i' makes it case-insensitive
      filteredData = filteredData.filter((student) =>
        nameFilterRegex.test(student.fullName)
      );
    }
    
    setFilterdStudentData(filteredData);
    SetTotal(filteredData.length);
  };

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

 

  if (admitCardLoading) {
    return <Loading />;
  }

  if (admitCardError) {
    return <SomthingwentWrong />;
  }
  if (allExamLoading) {
    return <Loading />;
  }

  if (allExamError) {
    return <SomthingwentWrong />;
  }
  return (
    <>
      <div className="">
        <div className="mb-5">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 80, width: "100%" }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Select Exam
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={selectedExam}
                  onChange={handleExamChange}
                  label="Select Exam"
                >
                  {examData.map((exam) => (
                    <MenuItem key={exam._id} value={exam.examName}>
                      {exam.examName} - class:{exam.className}
                      {exam.section}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                id="filled-basic"
                label="searchBy class"
                variant="filled"
                type="text"
                onChange={handleFilterByClass}
                value={filterClass}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                id="filled-basic"
                label="filterBy Name"
                variant="filled"
                type="text"
                onChange={handleFilterbyname}
                value={filterName}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Button
                variant="contained"
                onClick={generatePDF}
                style={{ backgroundColor: currentColor, width: "100%" }}
                className="h-12"
              >
                Download
              </Button>
            </Grid>
          </Grid>
        </div>

        <Box
          sx={{
            bgcolor: "background.paper",
            position: "relative",
            minHeight: 200,
          }}
        >
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="action tabs example"
            >
              <Tab label="Theme One" {...a11yProps(0)} />
              <Tab label="Theme Two" {...a11yProps(1)} />
              <Tab label="Theme Three" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Card
                filteredStudentData={filteredStudentData}
                componentPDF={componentPDF}
                selectedExamData={selectedExamData}
                formatExamDate={formatExamDate}
                getDayOfWeek={getDayOfWeek}
                total={total}
              />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              Comming soon.....
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              Comming soon.....
            </TabPanel>
          </SwipeableViews>
         
        </Box>
       
      </div>
    </>
  );
};

export default AdmitCardUi;
