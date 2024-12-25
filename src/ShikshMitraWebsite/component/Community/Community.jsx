import React, { useEffect } from "react";
import "./Community.css";

import { gsap, ScrollTrigger } from "gsap/all";

const Community = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const horizontalSections = gsap.utils.toArray(".horizontal-section");

    const timeline = gsap.to(horizontalSections, {
      xPercent: -100 * (horizontalSections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: "#container",
        pin: true,
        scrub: 1,
        snap: 1 / (horizontalSections.length - 1),
        end: () => "+=" + document.querySelector("#container").offsetWidth,
      },
    });

    return () => {
      // Clean up GSAP animation on component unmount
      timeline.kill(); // Kill the GSAP timeline
      gsap.globalTimeline.clear(); // Clear all GSAP animations
    };
  }, []); // Empty dependency array for componentDidMount behavior

  return (
    <>
      <div className=" bg-[#1f2937]">
        <div className="py-16">
          {/* <div
            id="text"
            className="md:text-2xl text-center uppercase bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-[#0e7490] text-5xl font-black py-5"
          >
            OUR COMMUNITY!
          </div>
          <div
            id="text"
            className="md:text-sm text-center uppercase bg-clip-text    text-white"
          >
            Nurturing minds, shaping futures, and building a brighter tomorrow
            together.
          </div> */}
        </div>
      </div>
      <main id="container">
        {/* ---------- section 01 ---------- */}
        <section className="horizontal-section">
          <div className="flex flex-wrap items-center mt-32">
            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
              <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-100">
                <i className="fas fa-user-friends text-xl"></i>
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal text-white">
                Learning made easy
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-white">
                Our eShikshaMitra learning management system will make education
                more accessible by automating administrative processes and
                allowing educators to focus on teaching.
              </p>
              <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-white">
                It will increase communication among teachers, students, and
                parents, resulting in a better learning environment. Its
                user-friendly interfaces and advanced data tracking enable
                personalized learning paths, making education a pleasant and
                enjoyable experience for all.
              </p>
            </div>
            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
              <div className="relative flex flex-col min-w-0 break-words  w-full mb-6 shadow-lg rounded-lg bg-cyan-800">
                <img
                  alt="..."
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1051&amp;q=80"
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
                      className="text-cyan-800 fill-current"
                    ></polygon>
                  </svg>
                  <h4 className="text-xl font-bold text-white">
                    Innovate, Collaborate, Inspire
                  </h4>
                  <p className="text-md font-light mt-2 text-white">
                    Discover new teaching methods to innovate your lessons,
                    collaborate with fellow educators to share ideas and
                    resources, and inspire your students to reach new heights.
                    Let's empower you to create an enriching learning experience
                    for every student.
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- section 02 ---------- */}
        <section className="horizontal-section">
          <section className="relative py-20">
            <div className="bottom-auto h-[80px] transform translate-z-0 top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20">
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
                    src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=634&amp;q=80"
                  />
                </div>
                <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                  <div className="md:pr-12">
                    <div className="text-pink-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-pink-300">
                      <i className="fas fa-rocket text-xl"></i>
                    </div>
                    <h3 className="text-3xl font-semibold">
                      Stay hasslefree with Admin
                    </h3>
                    <p className="mt-4 text-lg leading-relaxed text-gray-600">
                      Stay hassle-free with our management system: Simplifying
                      administrative tasks and providing a user-friendly
                      platform, so you can focus on what truly matters –
                      effective teaching and student success.
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
                              Immerse in interactive experience.
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
                            <h4 className="text-gray-600">
                              Fostering creativity and critical thinking.
                            </h4>
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
                            <h4 className="text-gray-600">
                              Empowering academic and Institutions's growth
                            </h4>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* ---------- section 02 ---------- */}
        <section className="horizontal-section">
          <div className="flex flex-wrap items-center mt-32">
            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
              <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-100">
                <i className="fas fa-user-friends text-xl"></i>
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal text-white">
                Working with us is a pleasure
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4  text-white">
                Don't let your uses guess by attaching tooltips and popoves to
                any element. Just make sure you enable them first via
                JavaScript.
              </p>
              <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-white">
                The kit comes with three pre-built pages to help you get started
                faster. You can change the text and images and you're good to
                go. Just make sure you enable them first via JavaScript.
              </p>
            </div>
            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
              <div className="relative flex flex-col min-w-0 break-words  w-full mb-6 shadow-lg rounded-lg bg-cyan-800">
                <img
                  alt="..."
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1051&amp;q=80"
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
                      className="text-cyan-800 fill-current"
                    ></polygon>
                  </svg>
                  <h4 className="text-xl font-bold text-white">
                    Streamline, Manage, Analyze
                  </h4>
                  <p className="text-md font-light mt-2 text-white">
                    Streamline administrative processes to save time and
                    resources, manage staff and student data effectively, and
                    analyze key metrics to make informed decisions. Let's work
                    together to ensure smooth operations and continuous
                    improvement across the institution.
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- section 03 ---------- */}
        <section className="horizontal-section">
          {/* <h1 className="heading">03</h1> */}
          <section className="relative py-20">
            <div className="bottom-auto h-[80px] transform translate-z-0 top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20">
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
                    src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=634&amp;q=80"
                  />
                </div>
                <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                  <div className="md:pr-12">
                    <div className="text-pink-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-pink-300">
                      <i className="fas fa-rocket text-xl"></i>
                    </div>
                    <h3 className="text-3xl font-semibold">
                      Submit your Assignments and Homework
                    </h3>
                    <p className="mt-4 text-lg leading-relaxed text-gray-600">
                      With our system, students can easily upload assignments
                      and homework, while teachers can efficiently manage,
                      grade, and provide feedback, creating a seamless and
                      productive learning experience. Say goodbye to paperwork
                      and embrace a digital solution that enhances the
                      educational journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
    </>
  );
};

export default Community;
