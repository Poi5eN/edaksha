import React from "react";

const Services = () => {
  return (
    <>
      <div className="text-gray-800 antialiased">
        <main>
          <div className="relative pt-16 pb-32 flex content-center items-center justify-center">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80")',
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-75 bg-black"
              ></span>
            </div>
            <div className=" relative mx-auto">
              <div className="items-center flex flex-wrap">
                <div className="w-full  px-4 ml-auto mr-auto text-center">
                  <div className="py-20">
                    <h2 className="text-white font-semibold text-4xl">
                      Services - School Management System
                    </h2>
                    <p className="mt-4 text-lg text-gray-300">
                      Boost Academic Performance with our Advanced Learning
                      Management Software System.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="top-auto bottom-0 h-[70px] left-0 right-0 w-full absolute pointer-events-none overflow-hidden">
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-gray-300 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </div>
          <section className="pb-20 bg-gray-300 -mt-24">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap">
                <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                        <i className="fas fa-award"></i>
                      </div>
                      <h6 className="text-xl font-semibold">
                        {" "}
                        Recognized for excellence!
                      </h6>
                      <p className="mt-2 mb-4 text-gray-600">
                        Our acclaimed system delivers seamless management
                        solutions, including attendance tracking, grade
                        management, parent-teacher communication, and more.
                        Experience the difference with us!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-4/12 px-4 text-center">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                        <i className="fas fa-retweet"></i>
                      </div>
                      <h6 className="text-xl font-semibold">
                        {" "}
                        Transform your Institution!
                      </h6>
                      <p className="mt-2 mb-4 text-gray-600">
                        With our innovative system explore interactive lessons,
                        personalized learning pathways, real-time progress
                        tracking, and seamless communication channels. Elevate
                        your learning journey with us!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-400">
                        <i className="fas fa-fingerprint"></i>
                      </div>
                      <h6 className="text-xl font-semibold">
                        {" "}
                        Discover the Success!
                      </h6>
                      <p className="mt-2 mb-4 text-gray-600">
                        behind your educational success! We are committed to
                        revolutionizing learning with cutting-edge technology,
                        empowering schools and students worldwide. Join us in
                        shaping the future of education!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center mt-32">
                <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                  <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-100">
                    <i className="fas fa-user-friends text-xl"></i>
                  </div>
                  <h3 className="text-3xl mb-2 font-semibold leading-normal">
                    Digital Marketing
                  </h3>
                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
                    By creating engaging and informative digital marketing
                    content, you can effectively promote your School Management
                    System to schools and
                  </p>
                  <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">
                    educational institutions looking to modernize their
                    operations and improve the educational experience for
                    students, teachers, and parents.
                  </p>
                </div>
                <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                  <div className="relative flex flex-col min-w-0 break-words  w-full mb-6 shadow-lg rounded-lg bg-cyan-600">
                    <img
                      alt="..."
                      src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      className="w-full align-middle rounded-t-lg"
                    />
                    <blockquote className="relative p-8 mb-4">
                      <svg
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 583 95"
                        className="absolute left-0 w-full block h-[95px] top-[-94px]"
                      >
                        <polygon
                          points="-30,95 583,95 583,65"
                          className="text-cyan-600 fill-current"
                        ></polygon>
                      </svg>
                      <h4 className="text-xl font-bold text-white">
                        Top Notch Services
                      </h4>
                      <p className="text-md font-light mt-2 text-white">
                        Boost your digital presence with our expert marketing
                        solutions! Drive engagement, enhance visibility, and
                        achieve growth with our tailored strategies. Let's
                        elevate your brand in the digital landscape together
                      </p>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="relative py-20">
            <div className="bottom-auto top-0 h-[80px] transform translate-z-0left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20">
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-white fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
            <div className="container mx-auto px-4">
              <div className="items-center flex flex-wrap">
                <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                  <img
                    alt="..."
                    className="max-w-full rounded-lg shadow-lg"
                    src="https://images.unsplash.com/photo-1496115965489-21be7e6e59a0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  />
                </div>
                <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                  <div className="md:pr-12">
                    <div className="text-pink-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-pink-300">
                      <i className="fas fa-rocket text-xl"></i>
                    </div>
                    <h3 className="text-3xl font-semibold">
                      A growing company
                    </h3>
                    <p className="mt-4 text-lg leading-relaxed text-gray-600">
                      As a dynamic and growing company! We are committed to
                      innovation, driven by passion, and dedicated to
                      transforming education. Together, let's shape the future
                      of learning and make a lasting impact.
                    </p>
                    <ul className="list-none mt-6">
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                              <i className="fas fa-fingerprint"></i>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-gray-600">
                              Innovative Solutions
                            </h4>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                              <i className="fab fa-html5"></i>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-gray-600">Passionate Team</h4>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                              <i className="far fa-paper-plane"></i>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-gray-600">Global Impact</h4>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="pt-20 pb-48">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center text-center mb-24">
                <div className="w-full lg:w-6/12 px-4">
                  <h2 className="text-4xl font-semibold">
                    Here are our Services
                  </h2>
                  <p className="text-lg leading-relaxed m-4 text-gray-600">
                    Welcome to our suite of transformative services aimed at
                    enhancing education. We offer streamlined school management
                    solutions and engaging digital learning platforms designed
                    to empower educators and inspire students.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                  <div className="px-6">
                    <img
                      alt="..."
                      src="https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNlcnZpY2VzfGVufDB8fDB8fHww"
                      className="shadow-lg rounded-full max-w-full mx-auto "
                    />
                    <div className="pt-6 text-center">
                      <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                        Digital Marketing
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                  <div className="px-6">
                    <img
                      alt="..."
                      src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2VydmljZXN8ZW58MHx8MHx8fDA%3D"
                      className="shadow-lg rounded-full max-w-full mx-auto"
                    />
                    <div className="pt-6 text-center">
                      <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                        Wev Development
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                  <div className="px-6">
                    <img
                      alt="..."
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNlcnZpY2VzfGVufDB8fDB8fHww"
                      className="shadow-lg rounded-full max-w-full mx-auto"
                    />
                    <div className="pt-6 text-center">
                      <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                        Management System
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                  <div className="px-6">
                    <img
                      alt="..."
                      src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNlcnZpY2VzfGVufDB8fDB8fHww"
                      className="shadow-lg rounded-full max-w-full mx-auto"
                    />
                    <div className="pt-6 text-center">
                      <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                        App Development
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="pb-20 relative block bg-gray-900">
            <div className="bottom-auto top-0 left-0 h-[80px] right-0 w-full absolute pointer-events-none overflow-hidden -mt-20">
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-gray-900 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
            <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
              <div className="flex flex-wrap text-center justify-center">
                <div className="w-full lg:w-6/12 px-4">
                  <h2 className="text-4xl font-semibold text-white">
                    Build something
                  </h2>
                  <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
                    Transform your educational ecosystem with our comprehensive
                    suite of innovative solutions. From streamlined school
                    management to engaging digital learning platforms, we
                    empower institutions to grow and thrive.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap mt-12 justify-center">
                <div className="w-full lg:w-3/12 px-4 ml-10 mb-5 text-center pt-2 border border-gray-500 rounded-lg ">
                  <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                    <i className="fas fa-medal text-xl"></i>
                  </div>
                  <h6 className="text-xl mt-5 font-semibold text-white">
                    Excelent Services
                  </h6>
                  <p className="mt-2 mb-4 text-gray-500">
                    From intuitive school management solutions to engaging
                    digital learning platforms, we're committed to empowering
                    educators and students alike.
                  </p>
                </div>
                <div className="w-full lg:w-3/12 px-4 ml-10 mb-5 text-center  pt-2 border border-gray-500 rounded-lg">
                  <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                    <i className="fas fa-poll text-xl"></i>
                  </div>
                  <h5 className="text-xl mt-5 font-semibold text-white">
                    Grow your Institution
                  </h5>
                  <p className="mt-2 mb-4 text-gray-500">
                    Unlock new possibilities for enrollment, engagement, and
                    excellence in education with our comprehensive
                    suite of services.
                  </p>
                </div>
                <div className="w-full lg:w-3/12 px-4 ml-10 mb-5 text-center  pt-2 border border-gray-500 rounded-lg">
                  <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                    <i className="fas fa-lightbulb text-xl"></i>
                  </div>
                  <h5 className="text-xl mt-5 font-semibold text-white">
                    Seamless user experience
                  </h5>
                  <p className="mt-2 mb-4 text-gray-500">
                    Our user-centric approach ensures effortless navigation and
                    maximized efficiency for educators, students,
                    and administrators.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Services;
