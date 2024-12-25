import React from "react";
import "./Testimonial.css";
const Testimonial = () => {
  return (
    <div className="bg-[#1f2937] text-gray-100 sm:px-8 py-12">
      <div className="text-center w-full"></div>
      <div className="relative max-w-screen-xl  px-8 md:px-12 lg:px-16 xl:px-32 py-16 mx-auto bg-[#1f2937]  sm:rounded-lg shadow-lg">
        <div className="absolute right-0 bottom-0 hero-pattern w-64 h-56"></div>
        <div className="relative">
          <div className="pb-16">
            {/* <div
              id="text"
              className="md:text-2xl text-center uppercase bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-[#0e7490] text-5xl font-black py-5"
            >
              {" "}
              TESTIMONIALS
            </div> */}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:mx-12">
            <div className="relative mx-auto mt-8 rounded-lg shadow max-w-sm p-10 bg-gray-100 text-gray-700 leading-snug flex flex-col justify-between">
              <div className="-ml-4"></div>
              <div className="mt-2">
                "The school management system implemented by eShikshaMitra has
                strengthened our institution's operational efficiency and
                accountability. We now have better insights into enrollment
                trends, financial data, and resource allocation, allowing us to
                make data-driven decisions that support our strategic goals. It
                has been instrumental in fostering growth and sustainability for
                our school."
              </div>
              <div>
                <div className="mx-auto w-full border border-gray-300 my-8"></div>
                <div className="flex items-center">
                  <div>
                    <img
                      className="w-12 h-12 rounded-full border-2 border-indigo-400"
                      src="https://www.spencerclarkegroup.co.uk/uploads/5005001.png"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="font-bold"> Dr. Anitha Bijesh</div>
                    <div className="text-sm text-gray-600 mt-1">principal</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto mt-8 rounded-lg shadow max-w-sm p-10 bg-gray-100 text-gray-700 leading-snug flex flex-col justify-between">
              <div className="-ml-4"></div>
              <div className="mt-2">
                "As a busy administrator, I cannot imagine managing our school
                without eShikshaMitra's comprehensive management system. It has
                simplified our day-to-day tasks, from attendance tracking to
                payroll management, and has improved communication across
                departments. This system has undoubtedly elevated our school's
                operational excellence."
              </div>
              <div>
                <div className="mx-auto w-full border border-gray-300 my-8"></div>
                <div className="flex items-center">
                  <div>
                    <img
                      className="w-12 h-12 rounded-full border-2 border-indigo-400"
                      src="https://www.forbes.com/advisor/wp-content/uploads/2023/06/teacher-and-students.jpeg.jpg"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="font-bold"> Dr. Anuja Rao</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Teacher, <a href="https://swift.org/">Java</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
