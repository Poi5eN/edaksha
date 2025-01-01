


import React, { useEffect, useState } from "react";
import "./LoginCss.css";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import axios from "axios";
import Dropdown from "./Dropdown";
import Cookies from "js-cookie";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosEyeOff,IoIosEye } from "react-icons/io";

function Login() {
  const [loading, setLoading] = useState(false);
   const [showPassword,setShowPassword] =useState(false)
  const [isClosed, setIsClosed] = useState(true);
  const [formdata, setformdata] = useState({
    Username: "",
    Password: "",
    Role: "admin",
  });

  const { setisLoggedIn } = useStateContext();
  const Navigate = useNavigate();

  function onclickHandler(event) {
    setformdata((prevdata) => {
      return {
        ...prevdata,
        [event.target.name]: event.target.value,
      };
    });
  }
  function submitHandler(e) {
    setTimeout(() => {
      setIsClosed(true);
    }, 1000);
    e.preventDefault();
    setLoading(true);

    const payload = {
      email: formdata.Username,
      password: formdata.Password,
      role: formdata.Role,
    };
    sessionStorage.setItem("userRole", formdata.Role);
    axios
      .post("https://eserver-i5sm.onrender.com/api/v1/login", payload)
      .then((response) => {
        setisLoggedIn(formdata.Role);
        Cookies.set("token", response?.data?.token, { expires: 2 });
// console.log("LOGIN",response)
        const fullName = response.data.user.fullName;
        const image = response.data.user.image.url;
        const email = response.data.user.email;
        sessionStorage.setItem("fullName", fullName);
        sessionStorage.setItem("image", image);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("response", JSON.stringify(response.data.user));
        const token = response.data.token;
        document.cookie = `token=${token}; path=/; max-age=86400`;
        showSuccessToast("Login successful!!!");
        Navigate(`/${formdata.Role}`);
        
      })
      .catch((error) => {
        setLoading(false); // Stop the loading spinner
        showErrorToast("Login failed. Please check your credentials.");
        setIsClosed(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const showErrorToast = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000, // Auto-close the notification after 3 seconds
      style: { marginTop: "50px" }, // Add margin-top
    });
  };
  const showSuccessToast = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      style: { marginTop: "50px" },
    });
  };

  const handleClick = () => {
    setIsClosed(!isClosed);
  };
  useEffect(() => {
    setTimeout(() => {
      setIsClosed(false);
    }, 1000);
  }, []);
  return (
    <>
      {loading && <Spinner />}
      {
        <div className="bg-[#1f2937] h-screen flex justify-center items-center">
          <div className="laptop js-laptop ">
            <div className="laptop-top">
              <div className={`${isClosed ? "laptop--closed" : ""}`}>
                <div className="laptop__screen overflow-y-auto">
                  <div className="py-5 md:px-10 px-5 ">
                 <div className="bg-[#d2cdcd6e]">
                 {/* <h1 className="text-white sm:text-[10px] md:text-[15px] ">Credentials of Admin user for School demo purpose</h1>
                  <h1 className="text-shadow-2xl font-semibold sm:text-[10px] md:text-[15px]" ><span className="text-white  ">Admin Email : </span> <span className="text-[#57dbff] ">projectdemo@gmail.com</span></h1>
                  <h1  className="text-shadow-2xl font-semibold sm:text-[10px] md:text-[15px]"><span className="text-white ">Password : </span> <span className="text-[#57dbff] "> projectdemo</span></h1> */}
                 </div>
                
                    <form
                      onSubmit={submitHandler}
                      className="space-y-2 md:px-20"
                    >
                      <Dropdown formdata={formdata} setformdata={setformdata} />

                      <input
                        className="rounded-md  bg-[#000102a1] text-white border-2 border-white w-full py-2 outline-none  px-3"
                        required
                        type="text"
                        name="Username"
                        id="Username"
                        placeholder="User Name"
                        value={formdata.Username}
                        onChange={onclickHandler}
                      />

                    <div  className="relative">
                    <input
                        className="rounded-md  bg-[#000102a1] text-white border-2 border-white w-full py-2 outline-none  px-3"
                        required
                        placeholder="Password"
                        type={showPassword ? 'text' : 'password'}
                        name="Password"
                        id="Password"
                        value={formdata.Password}
                        onChange={onclickHandler}
                      />
                      <span onClick={()=>setShowPassword(!showPassword)} className="text-2xl text-white absolute right-3 top-[10px] cursor-pointer">
                        {showPassword ?  <IoIosEyeOff /> :  <IoIosEye />}
                      
                     
                      </span>

                    </div>
                      <input
                        type="submit"
                        className="rounded-md w-full py-2 text-white cursor-pointer outline-none border-none px-3 bg-cyan-700"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="laptop__base cursor-pointer"
              onClick={handleClick}
            ></div>
          </div>
        </div>
      }
    </>
  );
}

export default Login;



// import React, { useEffect, useState } from "react";
// import "./LoginCss.css";
// import { useNavigate } from "react-router-dom";
// import { useStateContext } from "../../../contexts/ContextProvider";
// import axios from "axios";
// import Dropdown from "./Dropdown";
// import Cookies from "js-cookie";
// import Spinner from "./Spinner";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { IoIosEyeOff,IoIosEye } from "react-icons/io";

// function Login() {
//   const [loading, setLoading] = useState(false);
//    const [showPassword,setShowPassword] =useState(false)
//   const [isClosed, setIsClosed] = useState(true);
//   const [formdata, setformdata] = useState({
//     Username: "",
//     Password: "",
//     Role: "admin",
//   });

//   const { setisLoggedIn } = useStateContext();
//   const Navigate = useNavigate();

//   function onclickHandler(event) {
//     setformdata((prevdata) => {
//       return {
//         ...prevdata,
//         [event.target.name]: event.target.value,
//       };
//     });
//   }
//   function submitHandler(e) {
//     setTimeout(() => {
//       setIsClosed(true);
//     }, 1000);
//     e.preventDefault();
//     setLoading(true);

//     const payload = {
//       email: formdata.Username,
//       password: formdata.Password,
//       role: formdata.Role,
//     };
//     sessionStorage.setItem("userRole", formdata.Role);
//     axios
//       .post("https://eserver-i5sm.onrender.com/api/v1/login", payload)
//       .then((response) => {
//         setisLoggedIn(formdata.Role);
//         Cookies.set("token", response?.data?.token, { expires: 2 });
// // console.log("LOGIN",response)
//         const fullName = response.data.user.fullName;
//         const image = response.data.user.image.url;
//         const email = response.data.user.email;
//         sessionStorage.setItem("fullName", fullName);
//         sessionStorage.setItem("image", image);
//         sessionStorage.setItem("email", email);
//         sessionStorage.setItem("response", JSON.stringify(response.data.user));
//         const token = response.data.token;
//         document.cookie = `token=${token}; path=/; max-age=86400`;
//         showSuccessToast("Login successful!!!");
//         Navigate(`/${formdata.Role}`);
        
//       })
//       .catch((error) => {
//         setLoading(false); // Stop the loading spinner
//         showErrorToast("Login failed. Please check your credentials.");
//         setIsClosed(false);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }
//   const showErrorToast = (message) => {
//     toast.error(message, {
//       position: toast.POSITION.TOP_RIGHT,
//       autoClose: 1000, // Auto-close the notification after 3 seconds
//       style: { marginTop: "50px" }, // Add margin-top
//     });
//   };
//   const showSuccessToast = (message) => {
//     toast.success(message, {
//       position: toast.POSITION.TOP_RIGHT,
//       autoClose: 1000,
//       style: { marginTop: "50px" },
//     });
//   };

//   const handleClick = () => {
//     setIsClosed(!isClosed);
//   };
//   useEffect(() => {
//     setTimeout(() => {
//       setIsClosed(false);
//     }, 1000);
//   }, []);
//   return (
//     <>
//       {loading && <Spinner />}
//       {
//         <div className="bg-[#1f2937] h-screen flex justify-center items-center">
//           <div className="laptop js-laptop ">
//             <div className="laptop-top">
//               <div className={`${isClosed ? "laptop--closed" : ""}`}>
//                 <div className="laptop__screen overflow-y-auto">
//                   <div className="py-5 md:px-10 px-5 ">
//                  <div className="bg-[#d2cdcd6e]">
//                  {/* <h1 className="text-white sm:text-[10px] md:text-[15px] ">Credentials of Admin user for School demo purpose</h1>
//                   <h1 className="text-shadow-2xl font-semibold sm:text-[10px] md:text-[15px]" ><span className="text-white  ">Admin Email : </span> <span className="text-[#57dbff] ">projectdemo@gmail.com</span></h1>
//                   <h1  className="text-shadow-2xl font-semibold sm:text-[10px] md:text-[15px]"><span className="text-white ">Password : </span> <span className="text-[#57dbff] "> projectdemo</span></h1> */}
//                  </div>
                
//                     <form
//                       onSubmit={submitHandler}
//                       className="space-y-2 md:px-20"
//                     >
//                       <Dropdown formdata={formdata} setformdata={setformdata} />

//                       <input
//                         className="rounded-md  bg-[#000102a1] text-white border-2 border-white w-full py-2 outline-none  px-3"
//                         required
//                         type="text"
//                         name="Username"
//                         id="Username"
//                         placeholder="User Name"
//                         value={formdata.Username}
//                         onChange={onclickHandler}
//                       />

//                     <div  className="relative">
//                     <input
//                         className="rounded-md  bg-[#000102a1] text-white border-2 border-white w-full py-2 outline-none  px-3"
//                         required
//                         placeholder="Password"
//                         type={showPassword ? 'text' : 'password'}
//                         name="Password"
//                         id="Password"
//                         value={formdata.Password}
//                         onChange={onclickHandler}
//                       />
//                       <span onClick={()=>setShowPassword(!showPassword)} className="text-2xl text-white absolute right-3 top-[10px] cursor-pointer">
//                         {showPassword ?  <IoIosEyeOff /> :  <IoIosEye />}
                      
                     
//                       </span>

//                     </div>
//                       <input
//                         type="submit"
//                         className="rounded-md w-full py-2 text-white cursor-pointer outline-none border-none px-3 bg-cyan-700"
//                       />
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div
//               className="laptop__base cursor-pointer"
//               onClick={handleClick}
//             ></div>
//           </div>
//         </div>
//       }
//     </>
//   );
// }

// export default Login;
