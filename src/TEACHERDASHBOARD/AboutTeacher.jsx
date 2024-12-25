import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";

const AboutTeacher = () => {
  const { currentColor,teacherRoleData} = useStateContext();
  function formattedDate(val) {
    const inputDate = new Date(val);
    const day = String(inputDate.getUTCDate()).padStart(2, "0");
    const month = String(inputDate.getUTCMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based (January is 0)
    const year = String(inputDate.getUTCFullYear()).slice(2);

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
  return (
    <div className=" w-full  flex items-center justify-center pt-10">
      <div className="bg-white  gap-2 sm:p-4 md:p-4 lg:p-4 p-2 pt-16 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 shadow-[rgba(0,0,_0,_0.25)_0px_25px_50px-12px]   overflow-y-auto">
        <div className="w-[330px]  rounded-md border-[#01a9ac] bg-cyan-700  p-5   hover:shadow-[rgba(6,24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]">
          {/* <div className=" flex justify-center mt-4">
            {teacherRoleData.image && teacherRoleData.image.url ? (
              <img
                className="w-[150px] h-[150px] rounded-full object-cover"
                src={teacherRoleData?.image?.url}
                alt="Image"
              />
            ) : (
              <p>No image available</p>
            )}
          </div> */}
          <div className="flex justify-center mt-4">
  {teacherRoleData.image && teacherRoleData.image.url ? (
  <div  className="w-[150px] h-[150px] rounded-full object-cover max-w-full max-h-full">
      <img
      className="w-[150px] h-[150px] rounded-full"
      src={teacherRoleData?.image?.url}
      alt="Image"
    />
  </div>
  ) : (
    <p>No image available</p>
  )}
</div>

          <div className="p-8">
            <h2 className="text-center text-lg text-white font-bold  ">
              {" "}
              {teacherRoleData.fullName}
            </h2>
            <h2 className="text-center text-lg text-white font-bold">
              {" Status: "}
              {teacherRoleData.status}
            </h2>
            <h2 className="text-center text-white font-bold">
              {"  "}
              +91{teacherRoleData.contact}
            </h2>
            <hr />
            <div className="h-14 ">
              <p className=" p-2 text-white text-center font-bold">{`Address : ${teacherRoleData.address}`}</p>
            </div>
            {/* <div
              className="dark:text-white dark:bg-secondary-dark-bg text-gray-800   mx-auto neu-btn border-2 "
              style={{
                border: `2px solid ${currentColor} `,
                color: currentColor,
              }}
            ></div> */}
          </div>
        </div>

        <div className="w-[330px] border-1 rounded-md border-[#01a9ac] hover:shadow-[rgba(6,24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]">
          <div className="relative overflow-x-auto">
            <h1 className="text-center mb-3 font-extrabold">
              {" "}
              {teacherRoleData.fullName}'s Details
            </h1>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                <tr className=" dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-2 py-2 font-medium text-gray-900  dark:text-white"
                  >
                    Employee ID:
                  </th>
                  <td className="px-2 py-2">{teacherRoleData.employeeId}</td>
                </tr>
                <tr className=" dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-2 py-2 font-medium text-gray-900  dark:text-white"
                  >
                    Email :
                  </th>
                  <td className="px-2 py-2">{teacherRoleData.email}</td>
                </tr>
                <tr className=" dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-2 py-2 font-medium text-gray-900  dark:text-white"
                  >
                    Gender :
                  </th>
                  <td className="px-2 py-2">{teacherRoleData.gender}</td>
                </tr>
                <tr className=" dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-2 py-2 font-medium text-gray-900  dark:text-white"
                  >
                    Qualification :
                  </th>
                  <td className="px-2 py-2">{teacherRoleData.qualification}</td>
                </tr>
                <tr className=" dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-2 py-2 font-medium text-gray-900  dark:text-white"
                  >
                    Salary :
                  </th>
                  <td className="px-2 py-2">{teacherRoleData.salary} / month</td>
                </tr>
                <tr className=" dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-2 py-2 font-medium text-gray-900  dark:text-white"
                  >
                    Subject :
                  </th>
                  <td className="px-2 py-2"> {teacherRoleData.subject}</td>
                </tr>
                <tr className=" dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-2 py-2 font-medium text-gray-900  dark:text-white"
                  >
                    ClassTeacher :
                  </th>
                  <td className="px-2 py-2">
                    {teacherRoleData.classTeacher}-{teacherRoleData.section}
                  </td>
                </tr>
                <tr className=" dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-2 py-2 font-medium text-gray-900  dark:text-white"
                  >
                    DOB :
                  </th>
                  <td className="px-2 py-2">
                    {formattedDate(teacherRoleData.dateOfBirth)}
                  </td>
                </tr>
                <tr className=" dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-2 py-2 font-medium text-gray-900  dark:text-white"
                  >
                    Experience :
                  </th>
                  <td className="px-2 py-2">{teacherRoleData.experience} yrs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTeacher;
