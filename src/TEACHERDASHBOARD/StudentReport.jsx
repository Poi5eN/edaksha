import React from 'react'

const StudentReport = () => {
  return (
   
  <div class="max-w-5xl mx-auto bg-[#daf2c3] border-2 border-green-400 rounded-lg shadow-md">
  <h1 class="text-5xl font-extrabold text-center text-gray-800 pt-6 mb-4 shadow-md">
    <span class="drop-shadow-md">Student Report Card</span>
  </h1>
  
  <div class="px-6 pb-2">
    <p class="text-lg font-bold mb-2">
      Student Report Card &nbsp;&nbsp;<span class="font-normal">Name: <span class="font-bold">Yad Ali</span></span>
    </p>
  </div>

  <div class="overflow-x-auto px-6 pb-6">
    <table class="w-full border-collapse text-center text-gray-800">
      <thead>
        <tr class="bg-[#b8e194] text-gray-800">
          <th class="border border-green-500 py-2 px-2">Subjects</th>
          <th colspan="3" class="border border-green-500 py-2 px-2">1st Term Exam</th>
          <th colspan="3" class="border border-green-500 py-2 px-2">2nd Term Exam</th>
          <th colspan="3" class="border border-green-500 py-2 px-2">Final Term Exam</th>
        </tr>
        <tr class="bg-[#b8e194]">
          <th class="border border-green-500 py-1 px-1"></th>
          <th class="border border-green-500 py-1 px-1">Total Marks</th>
          <th class="border border-green-500 py-1 px-1">Obt Marks</th>
          <th class="border border-green-500 py-1 px-1">Status</th>
          <th class="border border-green-500 py-1 px-1">Total Marks</th>
          <th class="border border-green-500 py-1 px-1">Obt Marks</th>
          <th class="border border-green-500 py-1 px-1">Status</th>
          <th class="border border-green-500 py-1 px-1">Total Marks</th>
          <th class="border border-green-500 py-1 px-1">Obt Marks</th>
          <th class="border border-green-500 py-1 px-1">Status</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td class="border border-green-400 py-2 px-2">English</td>
          <td class="border border-green-400">100</td>
          <td class="border border-green-400">78</td>
          <td class="border border-green-400">Pass</td>
          <td class="border border-green-400">100</td>
          <td class="border border-green-400">89</td>
          <td class="border border-green-400">Pass</td>
          <td class="border border-green-400">100</td>
          <td class="border border-green-400">91</td>
          <td class="border border-green-400">Pass</td>
        </tr>
        <tr>
          <td class="border border-green-400 py-2 px-2">Urdu</td>
          <td class="border border-green-400">100</td>
          <td class="border border-green-400">79</td>
          <td class="border border-green-400">Pass</td>
          <td class="border border-green-400">100</td>
          <td class="border border-green-400">80</td>
          <td class="border border-green-400">Pass</td>
          <td class="border border-green-400">100</td>
          <td class="border border-green-400">92</td>
          <td class="border border-green-400">Pass</td>
        </tr>
        <tr class="bg-[#e2f4d7] font-bold">
          <td class="border border-green-500 py-2">Total Marks</td>
          <td class="border border-green-500">800</td>
          <td class="border border-green-500">625</td>
          <td class="border border-green-500"></td>
          <td class="border border-green-500">800</td>
          <td class="border border-green-500">667</td>
          <td class="border border-green-500"></td>
          <td class="border border-green-500">800</td>
          <td class="border border-green-500">690</td>
          <td class="border border-green-500"></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="grid grid-cols-3 px-6 py-6 gap-4">
    <div>
      <p class="text-sm font-semibold">Incharge Sign:</p>
      <div class="border-t border-gray-500 mt-4"></div>
    </div>
    <div>
      <p class="text-sm font-semibold">Principal/Headmaster Sign:</p>
      <div class="border-t border-gray-500 mt-4"></div>
    </div>
    <div>
      <p class="text-sm font-semibold">Guardian Sign:</p>
      <div class="border-t border-gray-500 mt-4"></div>
    </div>
  </div>
</div>


  )
}

export default StudentReport