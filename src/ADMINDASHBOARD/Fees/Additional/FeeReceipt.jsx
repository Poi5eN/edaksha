import React, { useState,useEffect } from "react";
import logo from "../../../ShikshMitraWebsite/assets/SHIKSHAMITRA_logo.png";
import axios from "axios";

const FeeReceipt = () => {
  const [studentData,setStudentData]=useState([]);

  useEffect(()=>{
   const fetchData=async()=>{
    try {
      await axios.get(``)
    } catch (error) {
      
    }
   }
  },[])

  




  return (
    <>
      <div className="w-full overflow-scroll">
        <div className="w-full flex px-3  gap-3">
          <div className=" border-dashed border-e-2 pe-5 border-gray-800   rounded-sm p-2">
            <div className="flex justify-between border-b-2 border-red-600 mb-1 ">

            <div className=" h-24 w-24 ">
              <img className="h-[100%] w-[100%]" src={logo} alt="logo"/>
            </div>
            <div className="text-end  ">
              
              <h1 className="font-semibold">Technical Help India</h1>
              <p className="text-sm">Address: faridabad </p>
              <p className="text-sm">Contact: 0123456789</p>
              <p className="text-sm">Location</p>
              <p className="mb-2 text-sm">
                <span className="border-e-2 border-blue-500 px-2 ">
                  IT Service
                </span>
                <span className="border-e-2 border-blue-500 px-2">
                  IT Service
                </span>
                <span className="border-e-2 border-blue-500 px-2">
                  IT Service
                </span>
              </p>
            </div>
            </div>
            <div className="bg-black text-white text-center">
              <h1 className="text-sm">FEE RECEIPT</h1>
            </div>
            <h1 className="text-center text-lg ">Parent Copy</h1>
            <div className="flex justify-between text-[12px]">
              <div>
                <p>
                  <span className="font-bold">F/Name :</span>Jitender
                </p>
                <p>
                  <span className="font-bold">Payment Method :</span>June 2023
                </p>
                <p>
                  <span className="font-bold">Collected By :</span>Ramesh
                </p>
                <p>
                  <span className="font-bold">Narration :</span>Ramesh
                </p>
                <p>
                  <span className="font-bold">Receipt Category :</span>Ramesh
                </p>
              </div>
              <div>
                <p>
                  <span className="font-bold">Payment Date :</span>Jitender
                </p>
                <p>
                  <span className="font-bold">Payment Id :</span>June 2023
                </p>
                <p>
                  <span className="font-bold">Ledger Number :</span>Ramesh
                </p>
                <p>
                  <span className="font-bold">Payment Mode :</span>Ramesh
                </p>
              </div>
            </div>

            <div >
              <div>
                
                <div className="-mx-4 sm:-mx-8  sm:px-8 py-4 overflow-x-auto">
                  <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                      <thead>
                        <tr className=" bg-red-400 p-1">
                          <th className="px-1  py-3 border-b-2 border-r-2 border-gray-200 bg-gray-100 text-left text-[10px] text-bold font-semibold text-gray-700 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-1  py-3 border-b-2 border-r-2 border-gray-200 bg-gray-100 text-left text-[10px] text-bold font-semibold text-gray-700 uppercase tracking-wider">
                            Class / Section
                          </th>
                          <th className="px-1  py-3 border-b-2  border-r-2  border-gray-200 bg-gray-100 text-left text-[10px] text-bold font-semibold text-gray-700 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-1  py-3 border-b-2 border-r-2 border-gray-200 bg-gray-100 text-left text-[10px] text-bold font-semibold text-gray-700 uppercase tracking-wider">
                            Discount
                          </th>
                          <th className="px-1  py-3 border-b-2 border-r-2 border-gray-200 bg-gray-100 text-left text-[10px] text-bold font-semibold text-gray-700 uppercase tracking-wider">
                            Penalty / Fine
                          </th>
                          <th className="px-1  py-3 border-b-2 border-r-2 border-gray-200 bg-gray-100 text-left text-[10px] text-bold font-semibold text-gray-700 uppercase tracking-wider">
                            Pay Amount
                          </th>
                          <th className="px-1  py-3 border-b-2 border-r-2 border-gray-200 bg-gray-100 text-left text-[10px] text-bold font-semibold text-gray-700 uppercase tracking-wider">
                            Due Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              Hemant Singh
                            </p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              One/A
                            </p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">6709</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">0</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">765</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">765</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">765</p>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              Hemant Singh
                            </p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              One/A
                            </p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">6709</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">0</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">765</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">765</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">765</p>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              Hemant Singh
                            </p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              One/A
                            </p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">6709</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">0</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">765</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">765</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">765</p>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              Hemant Singh
                            </p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              One/A
                            </p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">6709</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">0</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">765</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">765</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">765</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" rounded-sm p-2">
            <div className="flex justify-between border-b-2 border-red-600 mb-1 ">

            <div className=" h-24 w-24 ">
              <img className="h-[100%] w-[100%]" src={logo} alt="logo"/>
            </div>
            <div className="text-end  ">
              
              <h1 className="font-semibold">Technical Help India</h1>
              <p className="text-sm">Address: faridabad </p>
              <p className="text-sm">Contact: 0123456789</p>
              <p className="text-sm">Location</p>
              <p className="mb-2 text-sm">
                <span className="border-e-2 border-blue-500 px-2 ">
                  IT Service
                </span>
                <span className="border-e-2 border-blue-500 px-2">
                  IT Service
                </span>
                <span className="border-e-2 border-blue-500 px-2">
                  IT Service
                </span>
              </p>
            </div>
            </div>
            <div className="bg-black text-white text-center">
              <h1 className="text-sm">FEE RECEIPT</h1>
            </div>
            <h1 className="text-center text-lg ">Office Copy</h1>
            <div className="flex justify-between text-[12px]">
              <div>
                <p>
                  <span className="font-bold">F/Name :</span>Jitender
                </p>
                <p>
                  <span className="font-bold">Payment Method :</span>June 2023
                </p>
                <p>
                  <span className="font-bold">Collected By :</span>Ramesh
                </p>
                <p>
                  <span className="font-bold">Narration :</span>Ramesh
                </p>
                <p>
                  <span className="font-bold">Receipt Category :</span>Ramesh
                </p>
              </div>
              <div>
                <p>
                  <span className="font-bold">Payment Date :</span>Jitender
                </p>
                <p>
                  <span className="font-bold">Payment Id :</span>June 2023
                </p>
                <p>
                  <span className="font-bold">Ledger Number :</span>Ramesh
                </p>
                <p>
                  <span className="font-bold">Payment Mode :</span>Ramesh
                </p>
              </div>
            </div>

            <div >
              <div>
                
                <div className="-mx-4 sm:-mx-8  sm:px-8 py-4 overflow-x-auto">
                  <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                      <thead>
                        <tr className=" bg-red-400 p-1">
                          <th className="px-1  py-3 border-b-2 border-r-2 border-gray-200 bg-gray-100 text-left text-[10px] text-bold font-semibold text-gray-700 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-1  py-3 border-b-2 border-r-2 border-gray-200 bg-gray-100 text-left text-[10px] text-bold font-semibold text-gray-700 uppercase tracking-wider">
                            Class / Section
                          </th>
                          <th className="px-1  py-3 border-b-2  border-r-2  border-gray-200 bg-gray-100 text-left text-[10px] text-bold font-semibold text-gray-700 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-1  py-3 border-b-2 border-r-2 border-gray-200 bg-gray-100 text-left text-[10px] text-bold font-semibold text-gray-700 uppercase tracking-wider">
                            Discount
                          </th>
                          <th className="px-1  py-3 border-b-2 border-r-2 border-gray-200 bg-gray-100 text-left text-[10px] text-bold font-semibold text-gray-700 uppercase tracking-wider">
                            Penalty / Fine
                          </th>
                          <th className="px-1  py-3 border-b-2 border-r-2 border-gray-200 bg-gray-100 text-left text-[10px] text-bold font-semibold text-gray-700 uppercase tracking-wider">
                            Pay Amount
                          </th>
                          <th className="px-1  py-3 border-b-2 border-r-2 border-gray-200 bg-gray-100 text-left text-[10px] text-bold font-semibold text-gray-700 uppercase tracking-wider">
                            Due Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              Hemant Singh
                            </p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              One/A
                            </p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">6709</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">0</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">765</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">765</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">765</p>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              Hemant Singh
                            </p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              One/A
                            </p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">6709</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">0</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">765</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">765</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">765</p>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              Hemant Singh
                            </p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              One/A
                            </p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">6709</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">0</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">765</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">765</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">765</p>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              Hemant Singh
                            </p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              One/A
                            </p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">6709</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">0</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">765</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">765</p>
                          </td>
                          <td className="px-1  py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">765</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        </div>
      </div>
    </>
  );
};

export default FeeReceipt;
