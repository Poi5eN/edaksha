import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider.js";
import DynamicDataTable from "./DataTable.jsx";
import NoDataFound from "../../NoDataFound.jsx";
import useCustomQuery from "../../useCustomQuery.jsx";
import Loading from "../../Loading.jsx";
import SomthingwentWrong from "../../SomthingwentWrong.jsx";
import RegForm from "./RegForm.jsx";
import Bulkegistration from "./Bulkegistration.jsx";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Heading from "../../Dynamic/Heading.jsx";

const Newegistrations = () => {
  const authToken = Cookies.get("token");
  const { currentColor } = useStateContext();
  const [registrationData, setRegistrationData] = useState();

  const {
    queryData: allRegistration,
    error: registrationError,
    loading: registrationLoading,
    refetch: refetchRegistrations,
  } = useCustomQuery(
    "https://eshikshaserver.onrender.com/api/v1/adminRoute/getRegistrations"
  );
  useEffect(() => {
    if (allRegistration) {
      setRegistrationData(allRegistration.data);
    }
  }, [allRegistration]);

  const handleDelete = (registrationNumber) => {
    const ConfirmToast = ({ closeToast }) => (
      <div>
        <p>Are you sure you want to delete this student?</p>
        <button
          className="text-red-700 font-bold text-xl"
          onClick={() => {
            try {
              console.log("click1");
              axios
                .delete(
                  `https://eshikshaserver.onrender.com/api/v1/adminRoute/deleteRegistration/${registrationNumber}`,
                  {
                    withCredentials: true,
                    headers: {
                      Authorization: `Bearer ${authToken}`,
                    },
                  }
                )
                .then((response) => {
                  refetchRegistrations();
                  console.log("firstresponse", response.data.message);
                  toast.success(response.data.message);
                });
            } catch (error) {
              console.log(error);
            }
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

  if (registrationLoading) {
    return <Loading />;
  }
  if (registrationError) {
    return <SomthingwentWrong />;
  }
  return (
    <div className=" mx-auto p-3 md:h-screen">
      {/* <h1
        className="text-4xl font-bold uppercase text-center hover-text "
        style={{ color: currentColor }}
      >
        Registration
      </h1> */}
      <Heading Name="Registration" />
      <div className=" my-4 flex  ">
        <RegForm refreshRegistrations={refetchRegistrations} />
        <div className="ml-5">
          <Bulkegistration refreshRegistrations={refetchRegistrations} />
        </div>
      </div>
      {registrationData && registrationData.length > 0 ? (
        <DynamicDataTable data={registrationData} handleDelete={handleDelete} />
      ) : (
        <NoDataFound />
      )}
      {/* {registrationData ? (registrationData.length>0 ? (<DynamicDataTable data={registrationData}/>):(<ErrorPage/>) ):(
        <div class="animate-pulse">
  <div class="h-4 bg-gray-200 mt-3 mb-6 rounded"></div>
  <div class="h-4 bg-gray-300 mb-6 rounded"></div>
  <div class="h-4 bg-gray-200 mb-6 rounded"></div>
  <div class="h-4 bg-gray-300 mb-6 rounded"></div>
  <div class="h-4 bg-gray-200 mb-6 rounded"></div>
</div>
)
        
      } */}
    </div>
  );
};

export default Newegistrations;
