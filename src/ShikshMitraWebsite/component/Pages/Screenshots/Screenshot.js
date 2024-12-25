import React from "react";
import admin from "../../../assets/screenshot/admin.png";
import aa from "../../../assets/Untitled design (7).png";
import tab from "../../../assets/Untitled design (10).png";
import laptop from "../../../assets/Untitled design (9).png";
import lapt from "../../../assets/Untitled design (12).png";
const Screenshot = () => {
  return (
    <>
      <section className="bg-[#1f2937] md:pt-20">
        <div className=" ">
          <div className="flex flex-col text-center w-full my-5 pt-1">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-300">
              ADMIN DASHBOARD
            </h1>
          </div>
          <div className="p-5   grid md:grid-cols-5  gap-3">
            <div className=" bg-[#19212c] rounded p-5 md:col-start-1 md:col-span-2">
              <div className="lg:flex-grow md:w-full lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                <h1 className="title-font sm:text-4xl md:text-2xl mb-4 font-medium text-white">
                  Gain full control and insights with our intuitive admin
                  dashboard
                </h1>
                <p className="mb-8 text-gray-200 ">
                  Empower your administrative team with our robust and intuitive
                  admin dashboard, designed to optimize school operations and
                  enhance decision-making. Our dashboard offers a comprehensive
                  view of key metrics, including attendance, academic
                  performance, and resource allocation. Administrators can
                  access real-time data visualization tools, allowing for deeper
                  insights and informed decision-making.
                </p>
              </div>
            </div>

            <div className=" md:col-start-3 md:col-span-5 bg-[#19212c] rounded  even:">
              <img
                className="object-cover object-center rounded"
                alt="hero"
                src={aa}
              />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-3 p-5 rounded">
          <div>
            <div className=" md:col-start-3 md:col-span-5 bg-[#19212c] rounded ">
              <img
                className="object-cover object-center rounded"
                alt="hero"
                src={laptop}
              />
            </div>
          </div>
          <div>
            <div className=" md:col-start-3 md:col-span-5 bg-[#19212c] rounded ">
              <img
                className="object-cover object-center rounded"
                alt="hero"
                src={lapt}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#1f2937] md:pt-20">
        <div className=" ">
          <div className="flex flex-col text-center w-full my-5 pt-1">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-300">
              TEACHER DASHBOARD
            </h1>
          </div>
          <div className="p-5   grid md:grid-cols-5  gap-3">
            <div className=" bg-[#19212c] rounded p-5 md:col-start-1 md:col-span-2">
              <div className="lg:flex-grow md:w-full lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                <h1 className="title-font sm:text-4xl md:text-2xl mb-4 font-medium text-white">
                  Empower educators with our dynamic teacher dashboard
                </h1>
                <p className="mb-8 text-gray-200 ">
                  Our intuitive platform provides teachers with valuable tools
                  to manage classes, assess student progress, and deliver
                  engaging lessons. From attendance tracking and grade
                  management to resource sharing and collaboration features, our
                  teacher dashboard enhances efficiency and promotes student
                  success. Meet the unique needs of every student, fostering a
                  positive learning experience in and out of the classroom.
                </p>
              </div>
            </div>

            <div className=" md:col-start-3 md:col-span-5 bg-[#19212c] rounded  even:">
              <img
                className="object-cover object-center rounded"
                alt="hero"
                src={lapt}
              />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-3 p-5 rounded">
          <div>
            <div className=" md:col-start-3 md:col-span-5 bg-[#19212c] rounded ">
              <img
                className="object-cover object-center rounded"
                alt="hero"
                src={aa}
              />
            </div>
          </div>
          <div>
            <div className=" md:col-start-3 md:col-span-5 bg-[#19212c] rounded ">
              <img
                className="object-cover object-center rounded"
                alt="hero"
                src={aa}
              />
            </div>
          </div>
        </div>
      </section>

      <section className=" bg-[#1f2937] text-gray-800  body-font border-t border-gray-200">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs text-cyan-500 tracking-widest font-medium title-font mb-1">
              Dashboard Insights
            </h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-300">
              Management at your fingertips
            </h1>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="p-4 md:w-1/3">
              <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">
                    Data Visualization
                  </h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base">
                    Our admin dashboard offers comprehensive data visualization
                    tools, allowing administrators to gain valuable insights
                    into enrollment trends, attendance rates, and academic
                    performance across the institution.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">
                    Seamless communication
                  </h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base">
                    Facilitate seamless communication with staff, parents, and
                    students. Easily communicate with staff, parents, and
                    students through our integrated communication hub, promoting
                    transparency and collaboration within the school community.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="6" cy="6" r="3"></circle>
                      <circle cx="6" cy="18" r="3"></circle>
                      <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                    </svg>
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">
                    Customizable Reports
                  </h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base">
                    Generate custom reports and analytics for informed
                    decision-making. Generate custom reports tailored to your
                    institution's needs, empowering administrators to make
                    data-driven decisions and optimize school operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="text-white bg-[#1f2937] body-font border-t border-gray-200 pt-10">
        <h2 className="text-xs text-cyan-500 tracking-widest font-medium title-font mb-1 text-center">
          Other Dashboard Insights
        </h2>
        <h1 className="sm:text-3xl text-2xl text-center font-medium title-font text-gray-200">
          For all your institution's needs
        </h1>
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
            <img
              alt="feature"
              className="object-cover object-center h-full w-full"
              src="https://static.vecteezy.com/system/resources/previews/000/472/134/original/teacher-at-school-isometric-composition-banner-vector.jpg"
            />
          </div>

          <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
            <div className="flex flex-col mb-10 lg:items-start items-center">
              <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>

              <div className="flex-grow">
                <h2 className="text-gray-400 text-lg title-font font-medium mb-3">
                  Student Dashboard
                </h2>
                <p className="leading-relaxed text-base">
                  Our student dashboard provides a personalized learning
                  experience, allowing students to view assignments tailored to
                  their individual needs and track their academic progress in
                  real time.
                </p>
              </div>
            </div>
            <div className="flex flex-col mb-10 lg:items-start items-center">
              <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <circle cx="6" cy="6" r="3"></circle>
                  <circle cx="6" cy="18" r="3"></circle>
                  <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                </svg>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-400 text-lg title-font font-medium mb-3">
                  Teacher Dashboard
                </h2>
                <p className="leading-relaxed text-base">
                  Our teacher dashboard streamlines class management tasks,
                  allowing educators to organize schedules, create assignments,
                  and assess student performance with ease.
                </p>
              </div>
            </div>
            <div className="flex flex-col mb-10 lg:items-start items-center">
              <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-400 text-lg title-font font-medium mb-3">
                  Parent Dashboard
                </h2>
                <p className="leading-relaxed text-base">
                  Our parent dashboard provides a comprehensive view of your
                  child's academic progress, allowing you to track grades,
                  attendance records, and upcoming assignments effortlessly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="text-white body-font bg-[#1f2937] border-t border-gray-200">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-400">
              A complete solution for your Institution
            </h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-base">
              Transform your institution with our integrated approach, designed
              to optimize operations, elevate learning outcomes, and empower
              your entire community.
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-300 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-400 font-medium title-font mb-2">
                  Data Management
                </h2>
                <p className="leading-relaxed text-base">
                  Our data management solution empowers institutions to harness
                  the full potential of their data, enabling informed
                  decision-making and driving continuous improvement
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-300 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="6" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-400 font-medium title-font mb-2">
                  User customization
                </h2>
                <p className="leading-relaxed text-base  pb-6">
                  Experience the flexibility of our customizable solutions,
                  designed to enhance efficiency and effectiveness across your
                  institution
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-300 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-400 font-medium title-font mb-2">
                  Easy communication
                </h2>
                <p className="leading-relaxed text-base">
                  Our communication interface empowers your school community to
                  stay connected, informed, and engaged, promoting a positive
                  and collaborative learning environment.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-300 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-400 font-medium title-font mb-2">
                  Leading Technology
                </h2>
                <p className="leading-relaxed text-base">
                  We are committed to leveraging cutting-edge technology to
                  drive educational excellence in shaping the future of
                  education with us.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-300 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-400 font-medium title-font mb-2">
                  User Experience
                </h2>
                <p className="leading-relaxed text-base">
                  Experience a user-friendly platform that enhances engagement,
                  efficiency, and overall satisfaction across your institution
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-300 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-400 font-medium title-font mb-2">
                  Assured Security
                </h2>
                <p className="leading-relaxed text-base">
                  We prioritize data security to protect your institution's
                  sensitive information with our comprehensive
                  security measures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Screenshot;
