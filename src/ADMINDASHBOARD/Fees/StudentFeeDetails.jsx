import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { format, parseISO } from 'date-fns';
const StudentFeeDetails = ({ modalData }) => {
  const [fees, setFees] = useState([]);
  const authToken = Cookies.get("token");
  console.log("fees", fees);
  useEffect(() => {
    axios
      .get(
        `https://eserver-i5sm.onrender.com/api/v1/fees/getFeeHistoryAndDues/${modalData}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        setFees(response.data.data.feeStatus);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div>
      {fees ? (
        <div className=" shadow-md sm:rounded-lg">
          <table className=" text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-2 py-3">
                  Receipt No.
                </th>
                <th scope="col" className="px-2 py-3">
                  Payment Date
                </th>
                <th scope="col" className="px-2 py-3">
                  Paid Amount
                </th>
                <th scope="col" className="px-2 py-3">
                  Dues
                </th>
                <th scope="col" className="px-2 py-3">
                  Remarks
                </th>
                <th scope="col" className="px-2 py-3">
                 Fees
                </th>
              </tr>
            </thead>
            <tbody>
              {fees.feeHistory ? fees.feeHistory.map((item) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-2 py-4">{item.feeReceiptNumber} </td>
                      <td className="px-2 py-4">{format(parseISO(item.date), 'dd/MM/yyyy')} </td>
                      <td className="px-2 py-4">{item.totalAmountPaid} </td>
                      <td className="px-2 py-4">{item.totalDues} </td>
                      <td className="px-2 py-4">{item.remark}</td>
                      <td className="px-2">
                        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                          <div class="inline-block min-w-full  rounded-lg overflow-hidden">
                            {item.regularFees  || item.additionalFees ? (
                              <table class="min-w-full leading-normal">
                                <thead>
                                  <tr>
                                    <th class="p-1  border-b-2 border-gray-200 bg-gray-50 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                      Name
                                    </th>
                                    <th class="p-1  border-b-2 border-gray-200 bg-gray-50 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                      Month
                                    </th>
                                    <th class="p-1  border-b-2 border-gray-200 bg-gray-50 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                      Amount
                                    </th>
                                    <th class="p-1  border-b-2 border-gray-200 bg-gray-50 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                      Dues
                                    </th>
                                    <th class="p-1  border-b-2 border-gray-200 bg-gray-50 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                      Status
                                    </th>
                                    <th class="p-1  border-b-2 border-gray-200 bg-gray-50"></th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {item.regularFees &&
                                    item.regularFees.map((addFee) => (
                                      <tr>
                                        <td class="px-1 border-b border-gray-200 bg-white text-sm">
                                          <p class="text-gray-900 whitespace-no-wrap">
                                            Class Fee
                                          </p>
                                        </td>
                                        <td class="px-1 border-b border-gray-200 bg-white text-sm">
                                          <p class="text-gray-900 whitespace-no-wrap">
                                            {addFee.month}
                                          </p>
                                        </td>
                                        <td class="px-1 border-b border-gray-200 bg-white text-sm">
                                          <p class="text-gray-900 whitespace-no-wrap">
                                            {addFee.paidAmount}
                                          </p>
                                        </td>
                                        <td class="px-1 border-b border-gray-200 bg-white text-sm">
                                          <p class="text-gray-900 whitespace-no-wrap">
                                            {addFee.dueAmount}
                                          </p>
                                        </td>
                                        <td class="px-1 border-b border-gray-200 bg-white text-sm">
                                          <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                            <span
                                              aria-hidden
                                              class="absolute inset-0  opacity-50 rounded-full"
                                            ></span>
                                            <span class={`${addFee.status==="Paid" ? "text-green-600":"text-red-600" }`}>
                                           
                                              {addFee.status}
                                            </span>
                                          </span>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                                <tbody>
                                  {item.additionalFees.map((addFee, index) => (
                                    <tr key={index}>
                                      <td class="px-1  border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">
                                          {addFee.name}
                                        </p>
                                      </td>
                                      <td class="px-1 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">
                                          {addFee.month}
                                        </p>
                                      </td>
                                      <td class="px-1 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">
                                          {addFee.paidAmount}
                                        </p>
                                      </td>
                                      <td class="px-1 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">
                                          {addFee.dueAmount}
                                        </p>
                                      </td>
                                      <td class="px-1 border-b border-gray-200 bg-white text-sm">
                                        <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                          <span
                                            aria-hidden
                                            class="absolute inset-0  opacity-50 rounded-full"
                                          ></span>
                                         <span class={`${addFee.status==="Paid" ? "text-green-600":"text-red-600" }`}>
                                            {addFee.status}
                                          </span>
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            ) : (
                              <h1 className="text-center">No Fee</h1>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
     
    </div>
  );
};

export default StudentFeeDetails;
