import React from "react";
import { AiOutlineBarChart } from "react-icons/ai";
import { FiCreditCard, FiStar, FiShoppingCart } from "react-icons/fi";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { FaFileWaveform } from "react-icons/fa6";
import { FaIdCard } from "react-icons/fa6"
import { PiExamFill } from "react-icons/pi";
import { ImBookmarks } from "react-icons/im";
import { FaCertificate } from "react-icons/fa6";
import { FaWpforms } from "react-icons/fa6";
import { FaArrowDownUpAcrossLine } from "react-icons/fa6";
import { GrCertificate } from "react-icons/gr";

import {
  BsCurrencyDollar,
  BsShield,
  BsChatLeft,
  BsPersonFillAdd,
} from "react-icons/bs";
import { BiSolidStoreAlt } from "react-icons/bi";
import { MdAccountBalanceWallet, MdGroups3, MdWork} from "react-icons/md";

import { TiTick } from "react-icons/ti";
import { ImManWoman } from "react-icons/im";
import { PiStudentFill, PiPiggyBankFill } from "react-icons/pi";
import {
  GiTeacher,
  GiTakeMyMoney,
  GiBookshelf,
 
} from "react-icons/gi";

import { MdOutlineAppRegistration } from "react-icons/md";
import Udise from "../ADMINDASHBOARD/Udise/Udise";
export const gridOrderImage = (props) => (
  <div>
    <img
      className="rounded-xl h-20 md:ml-3"
      src={props.ProductImage}
      alt="order-item"
    />
  </div>
);

export const gridOrderStatus = (props) => (
  <button
    type="button"
    style={{ background: props.StatusBg }}
    className="text-white py-1 px-2 capitalize rounded-2xl text-md"
  >
    {props.Status}
  </button>
);

export const kanbanGrid = [
  { headerText: "To Do", keyField: "Open", allowToggle: true },

  { headerText: "In Progress", keyField: "InProgress", allowToggle: true },

  {
    headerText: "Testing",
    keyField: "Testing",
    allowToggle: true,
    isExpanded: false,
  },

  { headerText: "Done", keyField: "Close", allowToggle: true },
];

export const areaPrimaryXAxis = {
  valueType: "DateTime",
  labelFormat: "y",
  majorGridLines: { width: 0 },
  intervalType: "Years",
  edgeLabelPlacement: "Shift",
  labelStyle: { color: "gray" },
};

export const areaPrimaryYAxis = {
  labelFormat: "{value}%",
  lineStyle: { width: 0 },
  maximum: 4,
  interval: 1,
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  labelStyle: { color: "gray" },
};
export const barPrimaryXAxis = {
  valueType: "Category",
  interval: 1,
  majorGridLines: { width: 0 },
};
export const barPrimaryYAxis = {
  majorGridLines: { width: 0 },
  majorTickLines: { width: 0 },
  lineStyle: { width: 0 },
  labelStyle: { color: "transparent" },
};

export const barChartData = [
  [
    { x: "USA", y: 46 },
    { x: "GBR", y: 27 },
    { x: "CHN", y: 26 },
  ],
  [
    { x: "USA", y: 37 },
    { x: "GBR", y: 23 },
    { x: "CHN", y: 18 },
  ],
  [
    { x: "USA", y: 38 },
    { x: "GBR", y: 17 },
    { x: "CHN", y: 26 },
  ],
];

export const barCustomSeries = [
  {
    dataSource: barChartData[0],
    xName: "x",
    yName: "y",
    name: "Gold",
    type: "Column",
    marker: {
      dataLabel: {
        visible: true,
        position: "Top",
        font: { fontWeight: "600", color: "#ffffff" },
      },
    },
  },
  {
    dataSource: barChartData[1],
    xName: "x",
    yName: "y",
    name: "Silver",
    type: "Column",
    marker: {
      dataLabel: {
        visible: true,
        position: "Top",
        font: { fontWeight: "600", color: "#ffffff" },
      },
    },
  },
  {
    dataSource: barChartData[2],
    xName: "x",
    yName: "y",
    name: "Bronze",
    type: "Column",
    marker: {
      dataLabel: {
        visible: true,
        position: "Top",
        font: { fontWeight: "600", color: "#ffffff" },
      },
    },
  },
];
export const colorMappingData = [
  [
    { x: "Jan", y: 6.96 },
    { x: "Feb", y: 8.9 },
    { x: "Mar", y: 12 },
    { x: "Apr", y: 17.5 },
    { x: "May", y: 22.1 },
    { x: "June", y: 25 },
    { x: "July", y: 29.4 },
    { x: "Aug", y: 29.6 },
    { x: "Sep", y: 25.8 },
    { x: "Oct", y: 21.1 },
    { x: "Nov", y: 15.5 },
    { x: "Dec", y: 9.9 },
  ],
  ["#FFFF99"],
  ["#FFA500"],
  ["#FF4040"],
];

export const rangeColorMapping = [
  { label: "1°C to 10°C", start: "1", end: "10", colors: colorMappingData[1] },

  {
    label: "11°C to 20°C",
    start: "11",
    end: "20",
    colors: colorMappingData[2],
  },

  {
    label: "21°C to 30°C",
    start: "21",
    end: "30",
    colors: colorMappingData[3],
  },
];

export const ColorMappingPrimaryXAxis = {
  valueType: "Category",
  majorGridLines: { width: 0 },
  title: "Months",
};

export const ColorMappingPrimaryYAxis = {
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  labelFormat: "{value}°C",
  title: "Temperature",
};

export const FinancialPrimaryXAxis = {
  valueType: "DateTime",
  minimum: new Date("2016, 12, 31"),
  maximum: new Date("2017, 9, 30"),
  crosshairTooltip: { enable: true },
  majorGridLines: { width: 0 },
};

export const FinancialPrimaryYAxis = {
  title: "Price",
  minimum: 100,
  maximum: 180,
  interval: 20,
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
};

export const LinePrimaryXAxis = {
  valueType: "DateTime",
  labelFormat: "y",
  intervalType: "Years",
  edgeLabelPlacement: "Shift",
  majorGridLines: { width: 0 },
  background: "white",
};

export const LinePrimaryYAxis = {
  labelFormat: "{value}%",
  rangePadding: "None",
  minimum: 0,
  maximum: 100,
  interval: 20,
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
};


export const links = [
  { name: 'Registration', link: 'registration' ,icon: <MdOutlineAppRegistration />},
  { name: 'Admission', link: 'admission' ,icon: <BsPersonFillAdd />},
  { name: 'Student', link: 'allstudent' ,icon: <PiStudentFill />},

  {
      name: 'Set Fees',
      id :2,
      icon: <GiTakeMyMoney />,
      children: [
          { name: 'Classwise', link: 'classwise',id :22 , icon: <GiTakeMyMoney />,},
          { name: 'Additional', link: 'additional' ,id :23 , icon: <GiTakeMyMoney />,},
          
      ],
  },
  { name: 'Fees Payment', link: 'checkfee' ,icon: <GiTakeMyMoney />},
  {
    name: 'Classes',
    icon: <MdGroups3 />,
    link: 'classes',
    // children: [
    //     { name: 'Primary', link: 'primary' },
    //     // { name: 'Secondary', link: 'secondary' },
    // ],
},
  {
      name: 'Teachers',
      icon: <GiTeacher />,
      children: [
          { name: 'All Teachers', link: 'allteachers' , icon: <GiTeacher />,},
          { name: 'Payment', link: 'payment' ,icon: <GiTakeMyMoney />},
         
      ],
  },

  {
      name: 'Parents',
      icon: <ImManWoman />,
      children: [
          { name: 'All Parents', link: 'allparents', icon: <ImManWoman />, },
          { name: 'Fees Status', link: 'feestatus', icon: <GiTakeMyMoney />, },
      ],
  },
  {
      name: 'Account',
      icon: <MdAccountBalanceWallet />,
      children: [
          { name: 'Income', link: 'income',   icon: <MdAccountBalanceWallet />, },
          { name: 'Expenditure', link: 'expenditure',   icon: <MdAccountBalanceWallet />, },
      ],
  },
  {
      name: 'Inventory',
      icon: <BiSolidStoreAlt />,
      children: [
          { name: 'Stocks', link: 'stocks' },
          { name: 'Sales', link: 'sales' }, 
        
      ],
  },
  {
      name: 'Library',
      icon: <GiBookshelf />,
      children: [
          { name: 'Books', link: 'books',icon: <GiBookshelf />, },
          { name: 'Issued', link: 'issued',icon: <GiBookshelf />, },
      ],
  },
  // {
  //     name: 'Admission Status',
  //     icon: <BsPersonFillAdd />, link: 'status'
  //     // children: [
  //     //     // { name: 'Admission', link: 'admission' },
  //     //     { name: 'Status', link: 'status' },
  //     // ],
  // },
  
  {
      name: 'Employee',
      icon: <MdWork />,
      children: [
          { name: 'Staff', link: 'staff' },
          { name: 'Wages', link: 'wages' },
      ],
  },
  {
      name: 'Results',
      icon: <ImBookmarks />,
      
      children: [
          { name: 'Marks', link: 'results' },
          { name: 'Admit Card', link: 'admitcard' },
      ],
  },
  {
      name: 'Curriculum',
      icon: <PiExamFill />,
      children: [
          { name: 'Exam', link: 'allexam' },
          { name: 'Syllabus', link: 'curriculum' },
      ],
  },

 
  
  {
    name: 'Certificate',
    icon: <FaCertificate />,
    children: [
        { name: 'Leaving Certificate', link: 'leavingcertificate' },
        // { name: 'Syllabus', link: 'curriculum' },
    ],
},
{ name: 'ID Card', link: 'idcard' ,icon: <FaIdCard />},
{ name: 'Udise', link: 'udise' ,icon: <FaIdCard />},
{ name: 'Admit Card', link: 'admitcards' ,icon: <BsFillCreditCard2FrontFill />},
{ name: 'All Form', link: 'allforms' ,icon: <FaWpforms />},
{
  name: 'Promotion',
  icon: <FaArrowDownUpAcrossLine />, link: 'promotion'

},
// {
//   name: 'Promotion',
//   icon: <PiStudentFill />, link: 'promotion'

// },
];


export const Studentlinks = [
  {
    title: "Student Dashboard",
    links: [


      {
        id: "2",
        name: "results",
        icon: <GiTeacher />,
        route: "student/results",
      },
      {
        id: "3",

        name: "timeTable",
        icon: <PiStudentFill />,
        route: "student/timeTable",
      },
      {
        id: "4",

        name: "Assigments",
        icon: <ImManWoman />,
        route: "student/assigments",
      },
      {
        id: "5",

        name: "Study Material",
        icon: <PiPiggyBankFill />,
        route: "student/StudyMaterial",
      },
      {
        id: "6",

        name: "syllabus",
        icon: <BiSolidStoreAlt />,
        route: "student/syllabus",
      },
      {
        id: "7",

        name: "exams",
        icon: <BiSolidStoreAlt />,
        route: "student/exams",
      },
      {
        id: "8",

        name: "admit card",
        icon: <BiSolidStoreAlt />,
        route: "student/admitcard",
      },
      {
        id: "9",
        name: "Books",
        icon: <MdWork />,
        route: "student/issuedBooks",
      },
    ],
  },
];
export const Teacherslinks = [
  {
    title: "Teacher Dashboard",
    links: [
      {
        id: "1",
        name: "MyStudents",
        icon: <GiTakeMyMoney />,
        route: "teacher/mystudents",
      },
      {
        id: "2",
        name: "Assignments",
        icon: <GiTeacher />,
        route: "teacher/assignments",
      },
      {
        id: "3",

        name: "Results",
        icon: <PiStudentFill />,
        route: "teacher/results",
      },
      {
        id: "4",

        name: "Attendance",
        icon: <ImManWoman />,
        route: "teacher/attendance",
      },
      {
        id: "5",

        name: "lectures",
        icon: <PiPiggyBankFill />,
        route: "teacher/lectures",
      },
      {
        id: "6",

        name: "curriculum",
        icon: <BiSolidStoreAlt />,
        route: "teacher/curriculum",
      },
      {
        id: "7",

        name: "study Material",
        icon: <BiSolidStoreAlt />,
        route: "teacher/study",
      },
      {
        id: "8",

        name: "Create Exam",
        icon: <BiSolidStoreAlt />,
        route: "teacher/CreateExam",
      },
      {
        id: "8",

        name: "About",
        icon: <BiSolidStoreAlt />,
        route: "teacher/AboutTeacher",
      },
      {
        id: "9",

        name: "Students Report",
        icon: <BiSolidStoreAlt />,
        route: "teacher/studentReport",
      },
    ],
  },
];
export const Parentslinks = [
  {
    title: "Parents Dashboard",
    links: [
      {
        id: "1",
        name: "mykids",
        icon: <GiTakeMyMoney />,
        route: "parent/mykids",
      },
      // {
      //   id: '2',
      //   name: 'event',
      //   icon: <GiTeacher />,
      //   route:"parent/events",

      // },
      {
        id: "2",

        name: "results",
        icon: <PiStudentFill />,
        route: "parent/results",
      },
      // {
      //   id: '4',

      //   name: 'notification',
      //   icon: <ImManWoman />,
      //   route:"parent/notification",

      // },
      {
        id: "3",

        name: "expenses",
        icon: <PiPiggyBankFill />,
        route: "parent/expenses",
      },
      {
        id: "4",

        name: "curriculum",
        icon: <BiSolidStoreAlt />,
        route: "parent/curriculum",
      },
      {
        id: "5",

        name: "exams",
        icon: <BiSolidStoreAlt />,
        route: "parent/exams",
      },
      {
        id: "6",

        name: "fees",
        icon: <BiSolidStoreAlt />,
        route: "parent/fees",
      },
      {
        id: "7",

        name: "queries",
        icon: <BiSolidStoreAlt />,
        route: "parent/queries",
      },
    ],
  },
];

export const serviceDropdown = [
  {
    name: "stacked",
    icon: <AiOutlineBarChart />,
    cName: "submenu-item",
  },
  {
    name: "stacked",
    icon: <AiOutlineBarChart />,
    cName: "submenu-item",
  },
  {
    name: "stacked",
    icon: <AiOutlineBarChart />,
    cName: "submenu-item",
  },
  {
    name: "stacked",
    icon: <AiOutlineBarChart />,
    cName: "submenu-item",
  },
];

export const recentTransactions = [
  {
    icon: <BsCurrencyDollar />,
    amount: "+$350",
    title: "Paypal Transfer",
    desc: "Money Added",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
    pcColor: "green-600",
  },
  {
    icon: <BsShield />,
    amount: "-$560",
    desc: "Bill Payment",
    title: "Wallet",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(235, 250, 242)",
    pcColor: "red-600",
  },
  {
    icon: <FiCreditCard />,
    amount: "+$350",
    title: "Credit Card",
    desc: "Money reversed",
    iconColor: "rgb(255, 244, 229)",
    iconBg: "rgb(254, 201, 15)",

    pcColor: "green-600",
  },
  {
    icon: <TiTick />,
    amount: "+$350",
    title: "Bank Transfer",
    desc: "Money Added",

    iconColor: "rgb(228, 106, 118)",
    iconBg: "rgb(255, 244, 229)",
    pcColor: "green-600",
  },
  {
    icon: <BsCurrencyDollar />,
    amount: "-$50",
    percentage: "+38%",
    title: "Refund",
    desc: "Payment Sent",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
    pcColor: "red-600",
  },
];

export const weeklyStats = [
  {
    icon: <FiShoppingCart />,
    amount: "-$560",
    title: "Top Sales",
    desc: "Johnathan Doe",
    iconBg: "#FB9678",
    pcColor: "red-600",
  },
  {
    icon: <FiStar />,
    amount: "-$560",
    title: "Best Seller",
    desc: "MaterialPro Admin",
    iconBg: "rgb(254, 201, 15)",
    pcColor: "red-600",
  },
  {
    icon: <BsChatLeft />,
    amount: "+$560",
    title: "Most Commented",
    desc: "Ample Admin",
    iconBg: "#00C292",
    pcColor: "green-600",
  },
];


export const medicalproBranding = {
  data: [
    {
      title: "Due Date",
      desc: "Oct 23, 2021",
    },
    {
      title: "Budget",
      desc: "$98,500",
    },
    {
      title: "Expense",
      desc: "$63,000",
    },
  ],
  teams: [
    {
      name: "Bootstrap",
      color: "orange",
    },
    {
      name: "Angular",
      color: "#FB9678",
    },
  ],
  // leaders: [
  //   {
  //     image: avatar2,
  //   },
  //   {
  //     image: avatar3,
  //   },
  //   {
  //     image: avatar2,
  //   },
  //   {
  //     image: avatar4,
  //   },
  //   {
  //     image: avatar,
  //   },
  // ],
};

export const themeColors = [
  {
    name: "blue-theme",
    color: "#01579b",
    // color: "#1A97F5",
  },
  {
    name: "green-theme",
    color: "#03C9D7",
  },
  {
    name: "purple-theme",
    color: "#7352FF",
  },
  {
    name: "red-theme",
    color: "#FF5C8E",
  },
  {
    name: "indigo-theme",
    color: "#1E4DB7",
  },
  {
    color: "#FB9678",
    name: "orange-theme",
  },
  {
    color: "#37474f",
    name: "gray-theme",
  },
  // {
  //   color: "#00695c",
  //   name: "green-theme",
  // },
  // {
  //   color: "#ad1457",
  //   name: "pink-theme",
  // },
];

export const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: "My Profile",
    desc: "Account Settings",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
  },
  {
    icon: <BsShield />,
    title: "My Inbox",
    desc: "Messages & Emails",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(235, 250, 242)",
  },
  {
    icon: <FiCreditCard />,
    title: "My Tasks",
    desc: "To-do and Daily Tasks",
    iconColor: "rgb(255, 244, 229)",
    iconBg: "rgb(254, 201, 15)",
  },
];

export const ordersGrid = [
  {
    headerText: "Image",
    template: gridOrderImage,
    textAlign: "Center",
    width: "120",
  },
  {
    field: "OrderItems",
    headerText: "Item",
    width: "150",
    editType: "dropdownedit",
    textAlign: "Center",
  },
  {
    field: "CustomerName",
    headerText: "Customer Name",
    width: "150",
    textAlign: "Center",
  },
  {
    field: "TotalAmount",
    headerText: "Total Amount",
    format: "C2",
    textAlign: "Center",
    editType: "numericedit",
    width: "150",
  },
  {
    headerText: "Status",
    template: gridOrderStatus,
    field: "OrderItems",
    textAlign: "Center",
    width: "120",
  },
  {
    field: "OrderID",
    headerText: "Order ID",
    width: "120",
    textAlign: "Center",
  },

  {
    field: "Location",
    headerText: "Location",
    width: "150",
    textAlign: "Center",
  },
];

export const scheduleData = [
  {
    Id: 1,
    Subject: "Explosion of Betelgeuse Star",
    Location: "Space Center USA",
    StartTime: "2021-01-10T04:00:00.000Z",
    EndTime: "2021-01-10T05:30:00.000Z",
    CategoryColor: "#1aaa55",
  },
  {
    Id: 23,
    Subject: "Sky Gazers",
    Location: "Greenland",
    StartTime: "2021-01-15T09:00:00.000Z",
    EndTime: "2021-01-15T10:30:00.000Z",
    CategoryColor: "#ea7a57",
  },
  {
    Id: 24,
    Subject: "Facts of Humming Birds",
    Location: "California",
    StartTime: "2021-01-16T07:00:00.000Z",
    EndTime: "2021-01-16T09:00:00.000Z",
    CategoryColor: "#7fa900",
  },
];

export const lineChartData = [
  [
    { x: new Date(2005, 0, 1), y: 21 },
    { x: new Date(2006, 0, 1), y: 24 },
    { x: new Date(2007, 0, 1), y: 36 },
    { x: new Date(2008, 0, 1), y: 38 },
    { x: new Date(2009, 0, 1), y: 54 },
    { x: new Date(2010, 0, 1), y: 57 },
    { x: new Date(2011, 0, 1), y: 70 },
  ],
  [
    { x: new Date(2005, 0, 1), y: 28 },
    { x: new Date(2006, 0, 1), y: 44 },
    { x: new Date(2007, 0, 1), y: 48 },
    { x: new Date(2008, 0, 1), y: 50 },
    { x: new Date(2009, 0, 1), y: 66 },
    { x: new Date(2010, 0, 1), y: 78 },
    { x: new Date(2011, 0, 1), y: 84 },
  ],

  [
    { x: new Date(2005, 0, 1), y: 10 },
    { x: new Date(2006, 0, 1), y: 20 },
    { x: new Date(2007, 0, 1), y: 30 },
    { x: new Date(2008, 0, 1), y: 39 },
    { x: new Date(2009, 0, 1), y: 50 },
    { x: new Date(2010, 0, 1), y: 70 },
    { x: new Date(2011, 0, 1), y: 100 },
  ],
];
export const dropdownData = [
  {
    Id: "1",
    Time: "March 2021",
  },
  {
    Id: "2",
    Time: "April 2021",
  },
  {
    Id: "3",
    Time: "May 2021",
  },
];
export const SparklineAreaData = [
  { x: 1, yval: 2 },
  { x: 2, yval: 6 },
  { x: 3, yval: 8 },
  { x: 4, yval: 5 },
  { x: 5, yval: 10 },
];

export const lineCustomSeries = [
  {
    dataSource: lineChartData[0],
    xName: "x",
    yName: "y",
    name: "Germany",
    width: "2",
    marker: { visible: true, width: 10, height: 10 },
    type: "Line",
  },

  {
    dataSource: lineChartData[1],
    xName: "x",
    yName: "y",
    name: "England",
    width: "2",
    marker: { visible: true, width: 10, height: 10 },
    type: "Line",
  },

  {
    dataSource: lineChartData[2],
    xName: "x",
    yName: "y",
    name: "India",
    width: "2",
    marker: { visible: true, width: 10, height: 10 },
    type: "Line",
  },
];

export const pieChartData = [
  { x: "Labour", y: 18, text: "18%" },
  { x: "Legal", y: 8, text: "8%" },
  { x: "Production", y: 15, text: "15%" },
  { x: "License", y: 11, text: "11%" },
  { x: "Facilities", y: 18, text: "18%" },
  { x: "Taxes", y: 14, text: "14%" },
  { x: "Insurance", y: 16, text: "16%" },
];

export const contextMenuItems = [
  "AutoFit",
  "AutoFitAll",
  "SortAscending",
  "SortDescending",
  "Copy",
  "Edit",
  "Delete",
  "Save",
  "Cancel",
  "PdfExport",
  "ExcelExport",
  "CsvExport",
  "FirstPage",
  "PrevPage",
  "LastPage",
  "NextPage",
];

export const ecomPieChartData = [
  { x: "2018", y: 18, text: "35%" },
  { x: "2019", y: 18, text: "15%" },
  { x: "2020", y: 18, text: "25%" },
  { x: "2021", y: 18, text: "25%" },
];

export const stackedChartData = [
  [
    { x: "Jan", y: 111.1 },
    { x: "Feb", y: 127.3 },
    { x: "Mar", y: 143.4 },
    { x: "Apr", y: 159.9 },
    { x: "May", y: 159.9 },
    { x: "Jun", y: 159.9 },
    { x: "July", y: 159.9 },
  ],
  [
    { x: "Jan", y: 111.1 },
    { x: "Feb", y: 127.3 },
    { x: "Mar", y: 143.4 },
    { x: "Apr", y: 159.9 },
    { x: "May", y: 159.9 },
    { x: "Jun", y: 159.9 },
    { x: "July", y: 159.9 },
  ],
];

export const stackedCustomSeries = [
  {
    dataSource: stackedChartData[0],
    xName: "x",
    yName: "y",
    name: "Budget",
    type: "StackingColumn",
    background: "blue",
  },

  {
    dataSource: stackedChartData[1],
    xName: "x",
    yName: "y",
    name: "Expense",
    type: "StackingColumn",
    background: "red",
  },
];

export const stackedPrimaryXAxis = {
  majorGridLines: { width: 0 },
  minorGridLines: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  interval: 1,
  lineStyle: { width: 0 },
  labelIntersectAction: "Rotate45",
  valueType: "Category",
};

export const stackedPrimaryYAxis = {
  lineStyle: { width: 0 },
  minimum: 100,
  maximum: 400,
  interval: 100,
  majorTickLines: { width: 0 },
  majorGridLines: { width: 1 },
  minorGridLines: { width: 1 },
  minorTickLines: { width: 0 },
  labelFormat: "{value}",
};

export const kanbanData = [
  {
    Id: "Task 1",
    Title: "Task - 29001",
    Status: "Open",
    Summary: "Analyze the new requirements gathered from the customer.",
    Type: "Story",
    Priority: "Low",
    Tags: "Analyze,Customer",
    Estimate: 3.5,
    Assignee: "Nancy Davloio",
    RankId: 1,
    Color: "#02897B",
    ClassName: "e-story, e-low, e-nancy-davloio",
  },
  {
    Id: "Task 2",
    Title: "Task - 29002",
    Status: "InProgress",
    Summary: "Improve application performance",
    Type: "Improvement",
    Priority: "Normal",
    Tags: "Improvement",
    Estimate: 6,
    Assignee: "Andrew Fuller",
    RankId: 1,
    Color: "#673AB8",
    ClassName: "e-improvement, e-normal, e-andrew-fuller",
  },
  {
    Id: "Task 3",
    Title: "Task - 29003",
    Status: "Open",
    Summary: "Arrange a web meeting with the customer to get new requirements.",
    Type: "Others",
    Priority: "Critical",
    Tags: "Meeting",
    Estimate: 5.5,
    Assignee: "Janet Leverling",
    RankId: 2,
    Color: "#1F88E5",
    ClassName: "e-others, e-critical, e-janet-leverling",
  },
  {
    Id: "Task 4",
    Title: "Task - 29004",
    Status: "InProgress",
    Summary: "Fix the issues reported in the IE browser.",
    Type: "Bug",
    Priority: "Critical",
    Tags: "IE",
    Estimate: 2.5,
    Assignee: "Janet Leverling",
    RankId: 2,
    Color: "#E64A19",
    ClassName: "e-bug, e-release, e-janet-leverling",
  },
  {
    Id: "Task 5",
    Title: "Task - 29005",
    Status: "Review",
    Summary: "Fix the issues reported by the customer.",
    Type: "Bug",
    Priority: "Low",
    Tags: "Customer",
    Estimate: "3.5",
    Assignee: "Steven walker",
    RankId: 1,
    Color: "#E64A19",
    ClassName: "e-bug, e-low, e-steven-walker",
  },
  {
    Id: "Task 6",
    Title: "Task - 29007",
    Status: "Validate",
    Summary: "Validate new requirements",
    Type: "Improvement",
    Priority: "Low",
    Tags: "Validation",
    Estimate: 1.5,
    Assignee: "Robert King",
    RankId: 1,
    Color: "#673AB8",
    ClassName: "e-improvement, e-low, e-robert-king",
  },
  {
    Id: "Task 7",
    Title: "Task - 29009",
    Status: "Review",
    Summary: "Fix the issues reported in Safari browser.",
    Type: "Bug",
    Priority: "Critical",
    Tags: "Fix,Safari",
    Estimate: 1.5,
    Assignee: "Nancy Davloio",
    RankId: 2,
    Color: "#E64A19",
    ClassName: "e-bug, e-release, e-nancy-davloio",
  },
  {
    Id: "Task 8",
    Title: "Task - 29010",
    Status: "Close",
    Summary: "Test the application in the IE browser.",
    Type: "Story",
    Priority: "Low",
    Tags: "Review,IE",
    Estimate: 5.5,
    Assignee: "Margaret hamilt",
    RankId: 3,
    Color: "#02897B",
    ClassName: "e-story, e-low, e-margaret-hamilt",
  },
  {
    Id: "Task 9",
    Title: "Task - 29011",
    Status: "Validate",
    Summary: "Validate the issues reported by the customer.",
    Type: "Story",
    Priority: "High",
    Tags: "Validation,Fix",
    Estimate: 1,
    Assignee: "Steven walker",
    RankId: 1,
    Color: "#02897B",
    ClassName: "e-story, e-high, e-steven-walker",
  },
  {
    Id: "Task 10",
    Title: "Task - 29015",
    Status: "Open",
    Summary: "Show the retrieved data from the server in grid control.",
    Type: "Story",
    Priority: "High",
    Tags: "Database,SQL",
    Estimate: 5.5,
    Assignee: "Margaret hamilt",
    RankId: 4,
    Color: "#02897B",
    ClassName: "e-story, e-high, e-margaret-hamilt",
  },
  {
    Id: "Task 11",
    Title: "Task - 29016",
    Status: "InProgress",
    Summary: "Fix cannot open user’s default database SQL error.",
    Priority: "Critical",
    Type: "Bug",
    Tags: "Database,Sql2008",
    Estimate: 2.5,
    Assignee: "Janet Leverling",
    RankId: 4,
    Color: "#E64A19",
    ClassName: "e-bug, e-critical, e-janet-leverling",
  },
  {
    Id: "Task 12",
    Title: "Task - 29017",
    Status: "Review",
    Summary: "Fix the issues reported in data binding.",
    Type: "Story",
    Priority: "Normal",
    Tags: "Databinding",
    Estimate: "3.5",
    Assignee: "Janet Leverling",
    RankId: 4,
    Color: "#02897B",
    ClassName: "e-story, e-normal, e-janet-leverling",
  },
  {
    Id: "Task 13",
    Title: "Task - 29018",
    Status: "Close",
    Summary: "Analyze SQL server 2008 connection.",
    Type: "Story",
    Priority: "Critical",
    Tags: "Grid,Sql",
    Estimate: 2,
    Assignee: "Andrew Fuller",
    RankId: 4,
    Color: "#02897B",
    ClassName: "e-story, e-release, e-andrew-fuller",
  },
  {
    Id: "Task 14",
    Title: "Task - 29019",
    Status: "Validate",
    Summary: "Validate databinding issues.",
    Type: "Story",
    Priority: "Low",
    Tags: "Validation",
    Estimate: 1.5,
    Assignee: "Margaret hamilt",
    RankId: 1,
    Color: "#02897B",
    ClassName: "e-story, e-low, e-margaret-hamilt",
  },
  {
    Id: "Task 15",
    Title: "Task - 29020",
    Status: "Close",
    Summary: "Analyze grid control.",
    Type: "Story",
    Priority: "High",
    Tags: "Analyze",
    Estimate: 2.5,
    Assignee: "Margaret hamilt",
    RankId: 5,
    Color: "#02897B",
    ClassName: "e-story, e-high, e-margaret-hamilt",
  },
  {
    Id: "Task 16",
    Title: "Task - 29021",
    Status: "Close",
    Summary: "Stored procedure for initial data binding of the grid.",
    Type: "Others",
    Priority: "Critical",
    Tags: "Databinding",
    Estimate: 1.5,
    Assignee: "Steven walker",
    RankId: 6,
    Color: "#1F88E5",
    ClassName: "e-others, e-release, e-steven-walker",
  },
  {
    Id: "Task 17",
    Title: "Task - 29022",
    Status: "Close",
    Summary: "Analyze stored procedures.",
    Type: "Story",
    Priority: "Critical",
    Tags: "Procedures",
    Estimate: 5.5,
    Assignee: "Janet Leverling",
    RankId: 7,
    Color: "#02897B",
    ClassName: "e-story, e-release, e-janet-leverling",
  },
  {
    Id: "Task 18",
    Title: "Task - 29023",
    Status: "Validate",
    Summary: "Validate editing issues.",
    Type: "Story",
    Priority: "Critical",
    Tags: "Editing",
    Estimate: 1,
    Assignee: "Nancy Davloio",
    RankId: 1,
    Color: "#02897B",
    ClassName: "e-story, e-critical, e-nancy-davloio",
  },
  {
    Id: "Task 19",
    Title: "Task - 29024",
    Status: "Review",
    Summary: "Test editing functionality.",
    Type: "Story",
    Priority: "Normal",
    Tags: "Editing,Test",
    Estimate: 0.5,
    Assignee: "Nancy Davloio",
    RankId: 5,
    Color: "#02897B",
    ClassName: "e-story, e-normal, e-nancy-davloio",
  },
  {
    Id: "Task 20",
    Title: "Task - 29025",
    Status: "Open",
    Summary: "Enhance editing functionality.",
    Type: "Improvement",
    Priority: "Low",
    Tags: "Editing",
    Estimate: 3.5,
    Assignee: "Andrew Fuller",
    RankId: 5,
    Color: "#673AB8",
    ClassName: "e-improvement, e-low, e-andrew-fuller",
  },
  {
    Id: "Task 21",
    Title: "Task - 29026",
    Status: "InProgress",
    Summary: "Improve the performance of the editing functionality.",
    Type: "Epic",
    Priority: "High",
    Tags: "Performance",
    Estimate: 6,
    Assignee: "Nancy Davloio",
    RankId: 5,
    Color: "#e91e64",
    ClassName: "e-epic, e-high, e-nancy-davloio",
  },
  {
    Id: "Task 22",
    Title: "Task - 29027",
    Status: "Open",
    Summary: "Arrange web meeting with the customer to show editing demo.",
    Type: "Others",
    Priority: "High",
    Tags: "Meeting,Editing",
    Estimate: 5.5,
    Assignee: "Steven walker",
    RankId: 6,
    Color: "#1F88E5",
    ClassName: "e-others, e-high, e-steven-walker",
  },
  {
    Id: "Task 23",
    Title: "Task - 29029",
    Status: "Review",
    Summary: "Fix the editing issues reported by the customer.",
    Type: "Bug",
    Priority: "Low",
    Tags: "Editing,Fix",
    Estimate: "3.5",
    Assignee: "Janet Leverling",
    RankId: 6,
    Color: "#E64A19",
    ClassName: "e-bug, e-low, e-janet-leverling",
  },
  {
    Id: "Task 24",
    Title: "Task - 29030",
    Status: "Testing",
    Summary: "Fix the issues reported by the customer.",
    Type: "Bug",
    Priority: "Critical",
    Tags: "Customer",
    Estimate: "3.5",
    Assignee: "Steven walker",
    RankId: 1,
    Color: "#E64A19",
    ClassName: "e-bug, e-critical, e-steven-walker",
  },
  {
    Id: "Task 25",
    Title: "Task - 29031",
    Status: "Testing",
    Summary: "Fix the issues reported in Safari browser.",
    Type: "Bug",
    Priority: "Critical",
    Tags: "Fix,Safari",
    Estimate: 1.5,
    Assignee: "Nancy Davloio",
    RankId: 2,
    Color: "#E64A19",
    ClassName: "e-bug, e-release, e-nancy-davloio",
  },
];

export const financialChartData = [
  {
    x: new Date("2012-04-02"),
    open: 85.9757,
    high: 90.6657,
    low: 85.7685,
    close: 90.5257,
    volume: 660187068,
  },

  {
    x: new Date("2017-09-18"),
    open: 160.11,
    high: 160.5,
    low: 157.995,
    close: 158.67,
    volume: 27939544,
  },
];
