import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {

  const [isLoggedIn,setisLoggedIn] = useState("");
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor]  = useState('#1E4DB7');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [allstudentdata,setAllStudentData] = useState([]);
  const [teacherRoleData,setTeacherRoleData]=useState({});
  const [numberOfStudent,setNumberOfStudent]=useState(0);
  const [allFees,setAllFees]=useState()

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    sessionStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    sessionStorage.setItem('colorMode', color);
  };

  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  const teacherData=(data)=>{
    setTeacherRoleData(data)
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={{numberOfStudent,setNumberOfStudent,teacherRoleData,teacherData, currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState, setIsClicked, setActiveMenu, setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings  , isLoggedIn , setisLoggedIn , setAllStudentData , allstudentdata,setAllFees,allFees  }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
