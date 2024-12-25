import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import '../../../src/index.css'
import Switch from "@mui/material/Switch";
import axios from "axios";
import "../../Dynamic/Form/FormStyle.css";
import DynamicDataTable from "./DataTable";
import { useStateContext } from "../../contexts/ContextProvider";
import Cookies from "js-cookie";
import NoDataFound from "../../NoDataFound";
import { Button, FormControlLabel, TextField } from "@mui/material";
import useCustomQuery from "../../useCustomQuery";
import Loading from "../../Loading";
import SomthingwentWrong from "../../SomthingwentWrong";
import BulkAdmission from "./BulkAdmission";
import Input from "../../Dynamic/Input";
import Selector from "../../Dynamic/Selector";
import Heading from "../../Dynamic/Heading";

function Create_Registration_Form() {
  const { currentColor } = useStateContext();
  const authToken = Cookies.get("token");
  const [sibling, setsibling] = useState(true);
  const [loading, setLoading] = useState(false);
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [getClass, setGetClass] = useState({});
  const [selectedClass, setSelectedClass] = useState("");
  const [availableSections, setAvailableSections] = useState([]);
  const [studentImagePreview, setStudentImagePreview] = useState(null);
  const [parentImagePreview, setParentImagePreview] = useState(null);
  const [studentImageBinary, setStudentImageBinary] = useState("");


  
  const [payload,setPayload]=useState(
    {

    studentFullName: "anand",
    admissionNumber: "",
    studentEmail: "",
    studentPassword: "",
    studentContact: "9999999999",
    alt_mobile_no: "77777777777",
    studentAddress: "bth",
    studentCountry: "india",
    state: "bihar",
    city: "bth",
    pincode: "845438",
    nationality: "indian",
    caste: "OBC",
    religion: "HIndu",
    guardian_name: "Guardian",
    aadhar_no: "2345678998765",
    aadhar_name: "anand",
    mothere_tougue: "mother",
    category: "OBC",
    minority: "Minority",
    is_bpl: "bpl",
    mainstramed_child: "mainstra",
    pre_year_schl_status: "preyear",
    stu_ward: "stuward",
    pre_class_exam_app: "preclass",
    perc_pre_class: "perc_pre_class",
    att_pre_class: "att_pre_class",
    fac_free_uniform: "fac_free_uniform",
    received_central_scholarship: "received_central_scholarship",
    name_central_scholarship: "",
    received_state_scholarship: "",
    received_other_scholarship: "",
    scholarship_amount: "",
    fac_provided_cwsn: "",
    SLD_type: "",
    aut_spec_disorder: "",
    ADHD: "",
    inv_ext_curr_activity: "",
    vocational_course: "",
    trade_sector_id: "",
    job_role_id: "",
    pre_app_exam_vocationalsubject: "",
    bpl_card_no: "",
    ann_card_no: "",
    studentDateOfBirth: "17-05-1996",
    studentGender: "Male",
    studentJoiningDate: "17-05-2024",
    studentClass: "III",
    studentSection: "A",
    studentImage: "",
    fatherName: "FatherName",
    motherName: "motherName",
    parentEmail: "",
    parentPassword: "",
    parentContact: "8767888999",
    parentIncome: "100000",
    parentQualification: "BCA",
    parentImage: "",
    parentAdmissionNumber: "",
    studentImage:null
    
  }
)

  // const handleImagePreview = (e, setImagePreview) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setImagePreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     setImagePreview(null);
  //   }
  // };

  const handleImagePreview = (event, setPreview) => {
    const file = event.target.files[0];

    if (file) {
      // For preview
      const previewReader = new FileReader();
      previewReader.onload = () => {
        setPreview(previewReader.result); // Set image preview
      };
      previewReader.readAsDataURL(file);

      // For binary data
      const binaryReader = new FileReader();
      binaryReader.onload = () => {
        setStudentImageBinary(binaryReader.result); // Set binary data
      };
      binaryReader.readAsBinaryString(file);
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const {
    queryData: allAdmission,
    loading: admissionLoading,
    error: admissionError,
    refetch: refetchRegistrations,
  } = useCustomQuery(
    "https://eserver-i5sm.onrender.com/api/v1/adminRoute/getLastYearStudents"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payloadData={
      "studentFullName": payload.studentFullName,
      "studentEmail": payload.studentEmail,
      "studentPassword":  payload.studentPassword,
      "studentDateOfBirth": payload.studentDateOfBirth,
      "studentGender": payload.studentGender,
      "studentJoiningDate": payload.studentJoiningDate,
      "studentAddress": payload.studentAddress,
      "studentContact": payload.studentContact,
      "studentClass":selectedClass ,
      "studentSection": "A",
      "studentCountry": payload.studentCountry,
      "studentSubject": "",
      "fatherName": payload.fatherName,
      "motherName": payload.motherName,
      "parentEmail": payload.parentEmail,
      "parentPassword":  payload.parentPassword,
      "parentContact":  payload.parentContact,
      "parentIncome":payload.parentIncome,
      "parentQualification":payload.parentQualification,
      "parentImage": parentImagePreview,
      "religion": payload.religion,
      "caste":payload.caste,
      "nationality": payload.nationality,
      "pincode": payload.pincode,
      "state":  payload.state,
      "city": payload.city,
      "admissionNumber": payload.admissionNumber,
      "studentAdmissionNumber": payload.admissionNumber,
      "stu_id": payload.admissionNumber,
      "class": selectedClass,
      "section":"A",
      "roll_no": "",
      "student_name":payload.studentFullName,
      "gender": payload.studentGender,
      "DOB": payload.studentDateOfBirth,
      "mother_name": payload.motherName,
      "father_name": payload.fatherName,
      "gaurdian_name":payload.guardian_name,
      // "guardian_name": "N/A",
      "aadhar_no":payload.aadhar_no,
      "aadhar_name": payload.aadhar_name,
      "paddress": payload.studentAddress,
      "mobile_no": payload.studentContact,
      "email_id": payload.studentEmail,
      "mothere_tougue": payload.mothere_tougue,
      "category": payload.category,
      "minority": payload.minority? payload.minority :"No",
      "is_bpl":false,
      "is_aay": payload.is_aay?payload.is_aay:0,
      "ews_aged_group": "18-30",
      "is_cwsn": 0,
      "cwsn_imp_type": "None",
      "ind_national":payload.nationality?payload.nationality: "INDIAN",
      "mainstramed_child": payload.mainstramed_child?payload.mainstramed_child:"No",
      "adm_no": payload.admissionNumber,
      "adm_date": payload.studentJoiningDate,
      "stu_stream": "Science",
      "pre_year_schl_status": payload.pre_year_schl_status?payload.pre_year_schl_status:"Passed",
      "pre_year_class": "9",
      "stu_ward": payload.stu_ward?payload.stu_ward:"N/A",
      "pre_class_exam_app": payload.pre_class_exam_app?payload.pre_class_exam_app:"N/A",
      "result_pre_exam": payload.result_pre_exam?payload.result_pre_exam:"Passed",
      "perc_pre_class": 4,
      "att_pre_class": payload.att_pre_class?payload.att_pre_class:"N/A",
      "fac_free_uniform": payload.fac_free_uniform?payload.fac_free_uniform:"Yes",
      "fac_free_textbook": "Yes",
      "received_central_scholarship":  true,
      "name_central_scholarship":payload.name_central_scholarship?payload.name_central_scholarship: "N/A",
      "received_other_scholarship":payload.received_other_scholarship?payload.received_other_scholarship: true,
      "scholarship_amount": Number(payload.scholarship_amount)?Number(payload.scholarship_amount):0,
      "fac_provided_cwsn": payload.fac_provided_cwsn? payload.fac_provided_cwsn:"N/A",
      "SLD_type":payload.SLD_type?payload.SLD_type: "N/A",
      "aut_spec_disorder":payload.aut_spec_disorder?payload.aut_spec_disorder: "N/A",
      "ADHD": payload.ADHD?payload.ADHD:"N/A",
      "inv_ext_curr_activity":payload.inv_ext_curr_activity?payload.inv_ext_curr_activity: "N/A",
      "vocational_course": payload.vocational_course? payload.vocational_course:"N/A",
      "trade_sector_id": payload.trade_sector_id? payload.trade_sector_id:"N/A",
      "job_role_id": payload.job_role_id?payload.job_role_id:"None",
      "pre_app_exam_vocationalsubject": payload.pre_app_exam_vocationalsubject?payload.pre_app_exam_vocationalsubject:"None",
      "bpl_card_no": payload.bpl_card_no ?payload.bpl_card_no:"N/A",
      "ann_card_no":   payload.ann_card_no?payload.ann_card_no:"N/A",
      "studentImage":payload.studentImage
      
    }


    const formDataToSend = new FormData();
    Object.entries(payloadData).forEach(([key, value]) => {
      if (key === "studentImage" || key === "parentImage") {
        // formDataToSend.append(key, String(value));
        if (value) {
          formDataToSend.append(key, value);
        }
      } else {
        // Convert other values to strings and append
        formDataToSend.append(key, String(value ?? ""));
      
      }
      
      // if (key !== "parentImage") {
      //   formDataToSend.append(key, String(value));
      // }
      
    });
    formDataToSend.append("studentImage", payload.studentImage);
    formDataToSend.append("parentImage", payload.parentImage);

    try {
      setLoading(true);
      const response = await axios.post(
        "https://eserver-i5sm.onrender.com/api/v1/adminRoute/createStudentParent",
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsOpen(!isOpen);
      refetchRegistrations();
      // setLoading(false);
      // setParentImagePreview(null);
      // setStudentImagePreview(null);
    } catch (error) {
      setLoading(false);
      console.error("Error submitting form:", error);
    }
  };


  const handleClassChange = (e) => {
    const selectedClassName = e.target.value;
    setSelectedClass(selectedClassName);
    const selectedClassObj = getClass.find(
      (cls) => cls.className === selectedClassName
    );

    if (selectedClassObj) {
      setAvailableSections(selectedClassObj.sections.split(", "));
    } else {
      setAvailableSections([]);
    }
  };
  useEffect(() => {
    axios
      .get(
        `https://eserver-i5sm.onrender.com/api/v1/adminRoute/getAllClasses`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        let classes = response.data.classList;

        setGetClass(classes.sort((a, b) => a - b));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleDelete = (email) => {
    const authToken = Cookies.get("token");

    const ConfirmToast = ({ closeToast }) => (
      <div>
        <p>Are you sure you want to delete this student?</p>
        <button
          className="text-red-700 font-bold text-xl"
          onClick={() => {
            axios
              .put(
                `https://eserver-i5sm.onrender.com/api/v1/adminRoute/deactivateStudent`,
                { email },
                {
                  withCredentials: true,
                  headers: {
                    Authorization: `Bearer ${authToken}`,
                  },
                }
              )
              .then((response) => {
                const updatedData = submittedData.filter(
                  (item) => item.email !== email
                );
                setSubmittedData(updatedData);
                setShouldFetchData(!shouldFetchData);
                refetchRegistrations();
                toast.success("Student data deleted successfully");
                closeToast();
              })
              .catch((error) => {
                console.error("Error deleting Student data:", error);
                toast.error(
                  "An error occurred while deleting the Student data.",
                  error
                );
                closeToast();
              });
          }}
          style={{ marginRight: "10px" }}
        >
          Yes
        </button>
        <button onClick={closeToast} className="text-green-800 text-xl">
          No
        </button>
      </div>
    );
    toast(<ConfirmToast />);
  };

  useEffect(() => {
    if (allAdmission) {
      setSubmittedData(allAdmission.allStudent);
    }
  });

  if (admissionLoading) {
    return <Loading />;
  }
  if (admissionError) {
    return <SomthingwentWrong />;
  }



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPayload({
        ...payload,
        studentImage: file,
      });
    }
  };
  const handleParentImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPayload({
        ...payload,
        parentImage: file,
      });
    }
  };



  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setFormData({
  //       ...formData,
  //       image: file,
  //     });
  //   }
  // };

  const handleChange=(e)=>{
  
   const {name,value}=e.target
   console.log("namme",name ,"value",value)
  
   setPayload(()=>(
    {
      ...payload,
      [name]:value
    }
   ))

  }
  return (
    <div className="md:h-screen mt-20 md:mt-1 px-1">
      {/* <h1
        className="text-4xl font-bold mb-4 uppercase text-center  hover-text "
        style={{ color: currentColor }}
      >
        New Admission
      </h1> */}
      <Heading Name="New Admission" />

      {/* <div className=""> */}
      <Button
        variant="contained"
        style={{
          backgroundColor: currentColor,
          marginRight: "20px",
          fontSize: "10px",
          padding: "5px",
        }}
        onClick={toggleModal}
      >
        Create Admission
      </Button>
  
      <BulkAdmission refreshRegistrations={refetchRegistrations} />
      {/* </div> */}
      {/* <div className=" mb-4"></div> */}
      {isOpen && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-[99999999] flex justify-center items-center w-full h-screen bg-gray-900 bg-opacity-50"
        >
          <div className="relative p-4 w-full  max-h-full" data-aos="fade-down">
            <div className="relative  rounded-lg shadow dark:bg-gray-700 overflow-auto ">
              <div className="flex items-center justify-between px-2 md:px-2 border-b rounded-t dark:border-gray-600 bg-white">
                <h3
                  className="text-[15px] font-semibold  dark:text-white px-5"
                  style={{ color: currentColor }}
                >
                  Admission Form
                </h3>
                <button
                  onClick={toggleModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="h-[75vh] sm:h-[70vh] md:h-[70vh] lg:h-[65vh]  overflow-auto  bg-gray-50">
                <form onSubmit={handleSubmit}>
                  <div className="mt-2 grid sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 grid-cols-1 gap-3 px-6  mx-auto bg-gray-100 rounded-md ">
                    <Input
                      type="text"
                      name="studentFullName"
                      required={true}
                      label="Full Name"
                      required_field={true}
                      onChange={handleChange}
                      value={payload.studentFullName}
                    />
                    <Input
                      type="text"
                      name="admissionNumber"
                      required={false}
                      label=" Admission No"
                      onChange={handleChange}
                      value={payload.admissionNumber}
                    />
                    <Input
                      type="email"
                      name="studentEmail"
                      required={true}
                      label="Email"
                      required_field={true}
                      onChange={handleChange}
                      value={payload.studentEmail}
                    />
                    <Input
                      type="password"
                      name="studentPassword"
                      required={true}
                      label="Password"
                      required_field={true}
                      onChange={handleChange}
                      value={payload.studentPassword}
                    />
                    <Input
                      type="tel"
                      name="studentContact"
                      required={true}
                      label="Contact"
                      maxLength={10}
                      required_field={true}
                      onChange={handleChange}
                      value={payload.studentContact}
                    />
                    <Input
                      type="tel"
                      name="alt_mobile_no"
                     
                      label="Alt Mobile No"
                      maxLength={10}
                      onChange={handleChange}
                      value={payload.alt_mobile_no}
                    />
                    <Input
                      type="text"
                      name="studentAddress"
                     
                      label="Address"
                      onChange={handleChange}
                      value={payload.studentAddress}
                    />
                    <Input
                      type="text"
                      name="studentCountry"
                     
                      label="Country"
                      onChange={handleChange}
                      value={payload.studentCountry}
                    />
                    <Input
                      type="text"
                      name="state"
                      required={false}
                      label="State"
                      onChange={handleChange}
                      value={payload.state}
                    />
                    <Input
                     type="text"
                      name="city"
                      
                       label="City" 
                       onChange={handleChange}
                       value={payload.city}
                       />
                    <Input
                      type="text"
                      name="pincode"
                      required={false}
                      label="Pincode"
                      onChange={handleChange}
                      value={payload.pincode}
                    />
                    <Input
                      type="text"
                      name="nationality"
                      required={false}
                      label="Nationality"
                      onChange={handleChange}
                      value={payload.nationality}
                    />
                    <Input
                      type="text"
                      name="caste"
                      required={false}
                      label="Caste"
                      onChange={handleChange}
                      value={payload.caste}
                    />
                    <Input
                      type="text"
                      name="religion"
                      required={false}
                      label="Religion"
                      onChange={handleChange}
                      value={payload.religion}
                    />
                    <Input
                      type="text"
                      name="guardian_name"
                      required={false}
                      label="Guardian Name"
                      onChange={handleChange}
                      value={payload.guardian_name}
                    />
                    <Input
                      type="text"
                      name="aadhar_no"
                      required={false}
                      label="Aadhar No"
                      onChange={handleChange}
                      value={payload.aadhar_no}
                    />
                    <Input
                      type="text"
                      name="aadhar_name"
                      required={false}
                      label="Aadhar Name"
                      onChange={handleChange}
                      value={payload.aadhar_name}
                    />
                    <Input
                      type="text"
                      name="mothere_tougue"
                      required={false}
                      label="Mothere Tougue"
                      onChange={handleChange}
                      value={payload.mothere_tougue}
                    />
                    <Input
                      type="text"
                      name="category"
                      required={false}
                      label="Category"
                      onChange={handleChange}
                      value={payload.category}
                    />
                    <Input
                      type="text"
                      name="minority"
                      required={false}
                      label="Minority"
                      onChange={handleChange}
                      value={payload.minority}
                    />
                    <Input
                      type="text"
                      name="is_bpl"
                      required={false}
                      label="Is BPL"
                      onChange={handleChange}
                      value={payload.is_bpl}
                    />
                    <Input
                      type="text"
                      name="mainstramed_child"
                      required={false}
                      label="Mainstramed Child"
                      onChange={handleChange}
                      value={payload.mainstramed_child}
                    />
                    <Input
                      type="text"
                      name="pre_year_schl_status"
                      required={false}
                      label="pre_year_schl_status"
                      onChange={handleChange}
                      value={payload.pre_year_schl_status}
                    />
                    <Input
                      type="text"
                      name="pre_year_class"
                      required={false}
                      label="pre_year_class"
                      onChange={handleChange}
                      value={payload.pre_year_class}
                    />
                    <Input
                      type="text"
                      name="stu_ward"
                      required={false}
                      label="stu_ward"
                      onChange={handleChange}
                      value={payload.stu_ward}
                    />
                    <Input
                      type="text"
                      name="pre_class_exam_app"
                      required={false}
                      label="pre_class_exam_app"
                      onChange={handleChange}
                      value={payload.pre_class_exam_app}
                    />
                    <Input
                      type="text"
                      name="result_pre_exam"
                      required={false}
                      label="result_pre_exam"
                      onChange={handleChange}
                      value={payload.result_pre_exam}
                    />
                    <Input
                      type="text"
                      name="perc_pre_class"
                      required={false}
                      label="perc_pre_class"
                      onChange={handleChange}
                      value={payload.perc_pre_class}
                    />
                    <Input
                      type="text"
                      name="att_pre_class"
                      required={false}
                      label="att_pre_class"
                      onChange={handleChange}
                      value={payload.att_pre_class}
                    />
                    <Input
                      type="text"
                      name="fac_free_uniform"
                      required={false}
                      label="fac_free_uniform"
                      onChange={handleChange}
                      value={payload.fac_free_uniform}
                    />
                    <Input
                      type="text"
                      name="received_central_scholarship"
                      required={false}
                      label="received_central_scholarship"
                      onChange={handleChange}
                      value={payload.received_central_scholarship}
                    />
                    <Input
                      type="text"
                      name="name_central_scholarship"
                      required={false}
                      label="name_central_scholarship"
                      onChange={handleChange}
                      value={payload.name_central_scholarship}
                    />
                    <Input
                      type="text"
                      name="received_state_scholarship"
                      required={false}
                      label="received_state_scholarship"
                      onChange={handleChange}
                      value={payload.received_state_scholarship}
                    />
                    <Input
                      type="text"
                      name="received_other_scholarship"
                      required={false}
                      label="received_other_scholarship"
                      onChange={handleChange}
                      value={payload.received_other_scholarship}
                    />
                    <Input
                      type="text"
                      name="scholarship_amount"
                      required={false}
                      label="scholarship_amount"
                      onChange={handleChange}
                      value={payload.scholarship_amount}
                    />
                    <Input
                      type="text"
                      name="fac_provided_cwsn"
                      required={false}
                      label="fac_provided_cwsn"
                      onChange={handleChange}
                      value={payload.fac_provided_cwsn}
                    />
                    <Input
                      type="text"
                      name="SLD_type"
                      required={false}
                      label="SLD_type"
                      onChange={handleChange}
                      value={payload.SLD_type}
                    />
                    <Input
                      type="text"
                      name="aut_spec_disorder	"
                      required={false}
                      label="aut_spec_disorder	"
                      onChange={handleChange}
                      value={payload.aut_spec_disorder}
                    />
                    <Input
                      type="text"
                      name="ADHD"
                      required={false}
                      label="ADHD"
                      onChange={handleChange}
                      value={payload.ADHD}
                    />
                    <Input
                      type="text"
                      name="inv_ext_curr_activity"
                      required={false}
                      label="inv_ext_curr_activity"
                      onChange={handleChange}
                      value={payload.inv_ext_curr_activity}
                    />
                    <Input
                      type="text"
                      name="vocational_course"
                      required={false}
                      label="vocational_course"
                      onChange={handleChange}
                      value={payload.vocational_course}
                    />
                    <Input
                      type="text"
                      name="trade_sector_id"
                      required={false}
                      label="trade_sector_id"
                      onChange={handleChange}
                      value={payload.trade_sector_id}
                    />
                    <Input
                      type="text"
                      name="job_role_id"
                      required={false}
                      label="job_role_id"
                      onChange={handleChange}
                      value={payload.job_role_id}
                    />
                    <Input
                      type="text"
                      name="pre_app_exam_vocationalsubject"
                      required={false}
                      label="pre_app_exam_vocationalsubject"
                      onChange={handleChange}
                      value={payload.pre_app_exam_vocationalsubject}
                    />
                    <Input
                      type="text"
                      name="bpl_card_no"
                      required={false}
                      label="bpl_card_no"
                      onChange={handleChange}
                      value={payload.bpl_card_no}
                    />
                    <Input
                      type="text"
                      name="ann_card_no"
                      required={false}
                      label="ann_card_no"
                      onChange={handleChange}
                      value={payload.ann_card_no}
                    />
                    <Input
                      type="date"
                      name="studentDateOfBirth"
                     
                      label="DOB"
                      required_field={true}
                      onChange={handleChange}
                      value={payload.studentDateOfBirth}
                    />
                    <Selector
                      label="Gender"
                      name="studentGender"
                      options={["Male", "Female", "Other"]}
                     
                      required_field={true}
                      onChange={handleChange}
                      value={payload.studentGender}
                    />
                    <Input
                      type="date"
                      name="studentJoiningDate"
                     
                      label="Admission Date"
                      required_field={true}
                      onChange={handleChange}
                      value={payload.studentJoiningDate}
                    />
                    <div className="flex flex-col space-y-1">
                      {/* <label className="block text-[12px] font-medium text-gray-700">
                        Class:
                      </label> */}
                      <select
                        name="studentClass"
                        // className="border border-gray-300 px-2 py-1  rounded"
                        className="input_text w-full"
                        onFocus={(e) =>
                          (e.target.style.borderColor = currentColor)
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                        value={selectedClass}
                        onChange={handleClassChange}
                        required
                      >
                        <option value="" disabled>
                          Select a Class
                        </option>
                        {getClass.map((cls, index) => (
                          <option key={index} value={cls.className}>
                            {cls?.className}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Selector
                      name="studentSection"
                      options={availableSections}
                      label="Select a Section"
                     
                    />

                    <Input
                      type="file"
                      name="studentImage"
                      required={false}
                      label="Student Image"
                      // onChange={(e) =>
                      //   handleImagePreview(e, setStudentImagePreview)
                      // }
                      onChange={handleImageChange}
                    />
                  </div>
                  <div className="flex flex-row gap-10  justify-center bg-gray-100   text-center">
                    <span className=" text-xl text-blue-900">
                      Parent Details
                    </span>
                    <FormControlLabel
                      control={<Switch onClick={() => setsibling(!sibling)} />}
                      label="Sibling"
                    />
                  </div>
                  {sibling ? (
                    <div className=" grid  md:grid-cols-6 grid-cols-1 gap-3 p-6  mx-auto bg-gray-100 rounded-md ">
                      <Input
                        type="text"
                        name="fatherName"
                        required={true}
                        label="Father's Name"
                        required_field={true}
                        onChange={handleChange}
                        value={payload.fatherName}
                      />
                      <Input
                        type="text"
                        name="motherName"
                        required={false}
                        label="Mother's Name"
                        onChange={handleChange}
                        value={payload.motherName}

                      />
                      <Input
                        type="email"
                        name="parentEmail"
                        required={true}
                        label="Parent Email"
                        required_field={true}
                        onChange={handleChange}
                        value={payload.parentEmail}
                      />
                      <Input
                        type="password"
                        name="parentPassword"
                        required={true}
                        label="Parent Password"
                        required_field={true}
                        onChange={handleChange}
                        value={payload.parentPassword}
                      />
                      <Input
                        type="tel"
                        name="parentContact"
                        required={true}
                        label="Parent Contact"
                        required_field={true}
                        maxLength={10}
                        onChange={handleChange}
                        value={payload.parentContact}
                      />
                      <Input
                        type="text"
                        name="parentIncome"
                        
                        label="Parent Income"
                        onChange={handleChange}
                        value={payload.parentIncome}
                      />
                      <Input
                        type="text"
                        name="parentQualification"
                       
                        label=" Parent Qualification"
                        onChange={handleChange}
                        value={payload.parentQualification}
                      />
                      <Input
                        type="file"
                        name="parentImage"
                        required={false}
                        label="Parent Image"
                        // onChange={(e) =>
                        //   handleImagePreview(e, setParentImagePreview)
                        // }
                        onChange={handleParentImageChange}
                      />


                    </div>
                  ) : (
                    <div className="  bg-gray-100">
                      <div className="px-5 md:max-w-[25%] w-full  text-center ">
                        {/* <label className="block text-[12px] font-medium text-gray-700">
                          Parent's Admission Number:
                        </label>
                        <input
                          type="text"
                          name="parentAdmissionNumber"
                          className="border border-gray-300 px-2 py-1  rounded"
                        /> */}
                        <Input
                          type="text"
                          name="parentAdmissionNumber"
                          required={true}
                          label="Parent's Admission Number"
                          onChange={handleChange}
                          value={payload.parentAdmissionNumber}
                        />
                      </div>
                    </div>
                  )}

                  <div className="md:col-span-6 text-right">
                    <div className="flex items-center gap-5 py-2 md:py-2 md:px-4 px-4 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <Button
                        type="submit"
                        variant="contained"
                        style={{
                          backgroundColor: currentColor,
                          color: "white",
                          width: "100%",
                          padding:"2px 2px"
                        }}
                      >
                        {loading ? (
                          <svg
                            aria-hidden="true"
                            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                        ) : (
                          " Submit"
                        )}
                      </Button>
                      <Button
                        variant="contained"
                        onClick={toggleModal}
                        style={{
                          backgroundColor: "#616161",
                          color: "white",
                          width: "100%",
                            padding:"2px 2px"
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className=" items-center mt-1"></div>
      {submittedData.length > 0 ? (
        <DynamicDataTable data={submittedData} handleDelete={handleDelete} />
      ) : (
        <NoDataFound />
      )}
    </div>
  );
}

export default Create_Registration_Form;




// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./index.css";
// import Switch from "@mui/material/Switch";
// import axios from "axios";
// import "../../Dynamic/Form/FormStyle.css";
// import DynamicDataTable from "./DataTable";
// import { useStateContext } from "../../contexts/ContextProvider";
// import Cookies from "js-cookie";
// import NoDataFound from "../../NoDataFound";
// import { Button, FormControlLabel, TextField } from "@mui/material";
// import useCustomQuery from "../../useCustomQuery";
// import Loading from "../../Loading";
// import SomthingwentWrong from "../../SomthingwentWrong";
// import BulkAdmission from "./BulkAdmission";
// import Input from "../../Dynamic/Input";
// import Selector from "../../Dynamic/Selector";
// import Heading from "../../Dynamic/Heading";

// function Create_Registration_Form() {
//   const { currentColor } = useStateContext();
//   const authToken = Cookies.get("token");
//   const [sibling, setsibling] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [shouldFetchData, setShouldFetchData] = useState(false);
//   const [submittedData, setSubmittedData] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [getClass, setGetClass] = useState({});
//   const [selectedClass, setSelectedClass] = useState("");
//   const [availableSections, setAvailableSections] = useState([]);
//   const [studentImagePreview, setStudentImagePreview] = useState(null);
//   const [parentImagePreview, setParentImagePreview] = useState(null);

//   const handleImagePreview = (e, setImagePreview) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setImagePreview(null);
//     }
//   };

//   const toggleModal = () => {
//     setIsOpen(!isOpen);
//   };

//   const {
//     queryData: allAdmission,
//     loading: admissionLoading,
//     error: admissionError,
//     refetch: refetchRegistrations,
//   } = useCustomQuery(
//     "https://eserver-i5sm.onrender.com/api/v1/adminRoute/getLastYearStudents"
//   );

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.target);

//     try {
//       setLoading(true);
//       const response = await axios.post(
//         "https://eserver-i5sm.onrender.com/api/v1/adminRoute/createStudentParent",
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setIsOpen(!isOpen);
//       refetchRegistrations();
//       setLoading(false);
//       setParentImagePreview(null);
//       setStudentImagePreview(null);
//     } catch (error) {
//       setLoading(false);
//       console.error("Error submitting form:", error);
//     }
//   };

//   const handleClassChange = (e) => {
//     const selectedClassName = e.target.value;
//     setSelectedClass(selectedClassName);
//     const selectedClassObj = getClass.find(
//       (cls) => cls.className === selectedClassName
//     );

//     if (selectedClassObj) {
//       setAvailableSections(selectedClassObj.sections.split(", "));
//     } else {
//       setAvailableSections([]);
//     }
//   };
//   useEffect(() => {
//     axios
//       .get(
//         `https://eserver-i5sm.onrender.com/api/v1/adminRoute/getAllClasses`,
//         {
//           withCredentials: true,
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       )
//       .then((response) => {
//         let classes = response.data.classList;

//         setGetClass(classes.sort((a, b) => a - b));
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);
//   const handleDelete = (email) => {
//     const authToken = Cookies.get("token");

//     const ConfirmToast = ({ closeToast }) => (
//       <div>
//         <p>Are you sure you want to delete this student?</p>
//         <button
//           className="text-red-700 font-bold text-xl"
//           onClick={() => {
//             axios
//               .put(
//                 `https://eserver-i5sm.onrender.com/api/v1/adminRoute/deactivateStudent`,
//                 { email },
//                 {
//                   withCredentials: true,
//                   headers: {
//                     Authorization: `Bearer ${authToken}`,
//                   },
//                 }
//               )
//               .then((response) => {
//                 const updatedData = submittedData.filter(
//                   (item) => item.email !== email
//                 );
//                 setSubmittedData(updatedData);
//                 setShouldFetchData(!shouldFetchData);
//                 refetchRegistrations();
//                 toast.success("Student data deleted successfully");
//                 closeToast();
//               })
//               .catch((error) => {
//                 console.error("Error deleting Student data:", error);
//                 toast.error(
//                   "An error occurred while deleting the Student data.",
//                   error
//                 );
//                 closeToast();
//               });
//           }}
//           style={{ marginRight: "10px" }}
//         >
//           Yes
//         </button>
//         <button onClick={closeToast} className="text-green-800 text-xl">
//           No
//         </button>
//       </div>
//     );
//     toast(<ConfirmToast />);
//   };

//   useEffect(() => {
//     if (allAdmission) {
//       setSubmittedData(allAdmission.allStudent);
//     }
//   });

//   if (admissionLoading) {
//     return <Loading />;
//   }
//   if (admissionError) {
//     return <SomthingwentWrong />;
//   }
//   return (
//     <div className="md:h-screen mt-20 md:mt-1 px-1">
//       {/* <h1
//         className="text-4xl font-bold mb-4 uppercase text-center  hover-text "
//         style={{ color: currentColor }}
//       >
//         New Admission
//       </h1> */}
//       <Heading Name="New Admission" />

//       {/* <div className=""> */}
//       <Button
//         variant="contained"
//         style={{
//           backgroundColor: currentColor,
//           marginRight: "20px",
//           fontSize: "10px",
//           padding: "5px",
//         }}
//         onClick={toggleModal}
//       >
//         Create Admission
//       </Button>
//       <BulkAdmission refreshRegistrations={refetchRegistrations} />
//       {/* </div> */}
//       {/* <div className=" mb-4"></div> */}
//       {isOpen && (
//         <div
//           id="default-modal"
//           tabIndex="-1"
//           aria-hidden="true"
//           className="fixed top-0 right-0 left-0 z-[99999999] flex justify-center items-center w-full h-screen bg-gray-900 bg-opacity-50"
//         >
//           <div className="relative p-4 w-full  max-h-full" data-aos="fade-down">
//             <div className="relative  rounded-lg shadow dark:bg-gray-700 overflow-auto ">
//               <div className="flex items-center justify-between p-2 md:p-2 border-b rounded-t dark:border-gray-600 bg-white">
//                 <h3
//                   className="text-xl font-semibold  dark:text-white px-5"
//                   style={{ color: currentColor }}
//                 >
//                   Admission Form
//                 </h3>
//                 <button
//                   onClick={toggleModal}
//                   type="button"
//                   className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//                 >
//                   <svg
//                     className="w-3 h-3"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 14 14"
//                   >
//                     <path
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
//                     />
//                   </svg>
//                   <span className="sr-only">Close modal</span>
//                 </button>
//               </div>
//               <div className="h-[75vh] sm:h-[70vh] md:h-[70vh] lg:h-[65vh]  overflow-auto  bg-gray-50">
//                 <form onSubmit={handleSubmit}>
//                   <div className="mt-2 grid sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 grid-cols-1 gap-3 px-6  mx-auto bg-gray-100 rounded-md ">
//                     <Input
//                       type="text"
//                       name="studentFullName"
//                       required={true}
//                       label="Full Name"
//                     />
//                     <Input
//                       type="text"
//                       name="admissionNumber"
//                       required={false}
//                       label=" Admission No"
//                     />
//                     <Input
//                       type="email"
//                       name="studentEmail"
//                       required={true}
//                       label="Email"
//                     />
//                     <Input
//                       type="password"
//                       name="studentPassword"
//                       required={true}
//                       label="Password"
//                     />
//                     <Input
//                       type="tel"
//                       name="studentContact"
//                       required={true}
//                       label="Contact"
//                       maxLength={10}
//                     />
//                     <Input
//                       type="text"
//                       name="studentAddress"
//                       required={true}
//                       label="Address"
//                     />
//                     <Input
//                       type="text"
//                       name="studentCountry"
//                       required={true}
//                       label="Country"
//                     />
//                     <Input
//                       type="text"
//                       name="state"
//                       required={false}
//                       label="State"
//                     />
//                     <Input type="text" name="city" required label="City" />
//                     <Input
//                       type="text"
//                       name="pincode"
//                       required={false}
//                       label="Pincode"
//                     />
//                     <Input
//                       type="text"
//                       name="nationality"
//                       required={false}
//                       label="Nationality"
//                     />
//                     <Input
//                       type="text"
//                       name="caste"
//                       required={false}
//                       label="Caste"
//                     />
//                     <Input
//                       type="text"
//                       name="religion"
//                       required={false}
//                       label="Religion"
//                     />
//                     <Input
//                       type="date"
//                       name="studentDateOfBirth"
//                       required={true}
//                       label="DOB"
//                     />
//                     <Selector
//                       label="Gender"
//                       name="studentGender"
//                       options={["Male", "Female", "Other"]}
//                       required={true}
//                     />
//                     <Input
//                       type="date"
//                       name="studentJoiningDate"
//                       required={true}
//                       label="Admission Date"
//                     />
//                     <div className="flex flex-col space-y-1">
//                       {/* <label className="block text-[12px] font-medium text-gray-700">
//                         Class:
//                       </label> */}
//                       <select
//                         name="studentClass"
//                         // className="border border-gray-300 px-2 py-1  rounded"
//                         className="input_text w-full"
//                         onFocus={(e) =>
//                           (e.target.style.borderColor = currentColor)
//                         }
//                         onBlur={(e) => (e.target.style.borderColor = "#ccc")}
//                         value={selectedClass}
//                         onChange={handleClassChange}
//                         required
//                       >
//                         <option value="" disabled>
//                           Select a Class
//                         </option>
//                         {getClass.map((cls, index) => (
//                           <option key={index} value={cls.className}>
//                             {cls?.className}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <Selector
//                       name="studentSection"
//                       options={availableSections}
//                       label="Select a Section"
//                       required={true}
//                     />

//                     <Input
//                       type="file"
//                       name="studentImage"
//                       required={false}
//                       label="Student Image"
//                       onChange={(e) =>
//                         handleImagePreview(e, setStudentImagePreview)
//                       }
//                     />
//                   </div>
//                   <div className="flex flex-row gap-10  justify-center bg-gray-100   text-center">
//                     <span className=" text-xl text-blue-900">
//                       Parent Details
//                     </span>
//                     <FormControlLabel
//                       control={<Switch onClick={() => setsibling(!sibling)} />}
//                       label="Sibling"
//                     />
//                   </div>
//                   {sibling ? (
//                     <div className=" grid  md:grid-cols-6 grid-cols-1 gap-3 p-6  mx-auto bg-gray-100 rounded-md ">
//                       <Input
//                         type="text"
//                         name="fatherName"
//                         required={true}
//                         label="Father's Name"
//                       />
//                       <Input
//                         type="text"
//                         name="motherName"
//                         required={false}
//                         label="Mother's Name"
//                       />
//                       <Input
//                         type="email"
//                         name="parentEmail"
//                         required={true}
//                         label="Parent Email"
//                       />
//                       <Input
//                         type="password"
//                         name="parentPassword"
//                         required={true}
//                         label="Parent Password"
//                       />
//                       <Input
//                         type="tel"
//                         name="parentContact"
//                         required={true}
//                         label="Parent Contact"
//                         maxLength={10}
//                       />
//                       <Input
//                         type="text"
//                         name="parentIncome"
//                         required={true}
//                         label="Parent Income"
//                       />
//                       <Input
//                         type="text"
//                         name="parentQualification"
//                         required={true}
//                         label=" Parent Qualification"
//                       />
//                       <Input
//                         type="file"
//                         name="parentImage"
//                         required={false}
//                         label="Parent Image"
//                         onChange={(e) =>
//                           handleImagePreview(e, setParentImagePreview)
//                         }
//                       />
//                     </div>
//                   ) : (
//                     <div className="  bg-gray-100">
//                       <div className="px-5 md:max-w-[25%] w-full  text-center ">
//                         {/* <label className="block text-[12px] font-medium text-gray-700">
//                           Parent's Admission Number:
//                         </label>
//                         <input
//                           type="text"
//                           name="parentAdmissionNumber"
//                           className="border border-gray-300 px-2 py-1  rounded"
//                         /> */}
//                         <Input
//                           type="text"
//                           name="parentAdmissionNumber"
//                           required={true}
//                           label="Parent's Admission Number"
//                         />
//                       </div>
//                     </div>
//                   )}

//                   <div className="md:col-span-6 text-right">
//                     <div className="flex items-center gap-5 p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
//                       <Button
//                         type="submit"
//                         variant="contained"
//                         style={{
//                           backgroundColor: currentColor,
//                           color: "white",
//                           width: "100%",
//                         }}
//                       >
//                         {loading ? (
//                           <svg
//                             aria-hidden="true"
//                             className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
//                             viewBox="0 0 100 101"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
//                               fill="currentColor"
//                             />
//                             <path
//                               d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
//                               fill="currentFill"
//                             />
//                           </svg>
//                         ) : (
//                           " Submit"
//                         )}
//                       </Button>
//                       <Button
//                         variant="contained"
//                         onClick={toggleModal}
//                         style={{
//                           backgroundColor: "#616161",
//                           color: "white",
//                           width: "100%",
//                         }}
//                       >
//                         Cancel
//                       </Button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className=" items-center mt-1"></div>
//       {submittedData.length > 0 ? (
//         <DynamicDataTable data={submittedData} handleDelete={handleDelete} />
//       ) : (
//         <NoDataFound />
//       )}
//     </div>
//   );
// }

// export default Create_Registration_Form;
