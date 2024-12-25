import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Team from "../Team";

function About() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".accordions",
        pin: true,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        ease: "linear",
      },
    });

    tl.to(".accordion .text", {
      height: 0,
      paddingBottom: 0,
      opacity: 0,
      stagger: 0.5,
    });

    tl.to(
      ".accordion",
      {
        marginBottom: -15,
        stagger: 0.5,
      },
      "<"
    );
  }, []);

  return (
    <>
      <div className="bg-[#1f2937]">
        <div className="py-16">
          <div
            id="text"
            className="md:text-2xl text-center uppercase bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-[#0e7490] text-5xl font-black py-5"
          >
            ABOUT US
          </div>
          <div
            id="text"
            className="md:text-sm text-center uppercase bg-clip-text    text-white"
          >
            eShikshaMitra : E-Learning management system for academic
            institutions.
          </div>
          <p className="md:w-[70%] mx-auto text-center text-white mt-5">
            eShikshaMitra is a comprehensive school management system designed
            to streamline educational processes and enhance communication
            between administrators, teachers, students, and parents. Our
            platform offers a range of features and dashboards that empower
            educational institutions to manage their operations efficiently.
          </p>
        </div>

        <div id="wrapper" className=" flex justify-center items-center">
          <div id="content" className="text-white text-center">
            <div className="accordions flex flex-col items-center ">
              <div className="accordion  bg-gradient-to-r from-cyan-600 to-cyan-800 rounded-lg w-full max-w-lg p-6 mb-8 shadow-xl">
                <div className="title text-2xl pb-1">Admin Dashboard</div>
                <div className="text text-base opacity-70 ">
                  The Admin dashboard provides school administrators with a
                  central hub for managing and overseeing various aspects of the
                  institution. From user management to data analysis,
                  administrators can access the tools they need to make informed
                  decisions.
                </div>
              </div>
              <div className="accordion bg-gradient-to-r from-cyan-800 to-cyan-600 rounded-lg w-full max-w-lg p-6 mb-8 shadow-xl">
                <div className="title text-2xl pb-1">Teacher Dashboard</div>
                <div className="text text-base opacity-70">
                  Teachers can utilize the dedicated dashboard to streamline
                  classroom management, track student performance, and
                  communicate with both students and parents. Our intuitive
                  interface ensures that educators have the necessary tools to
                  excel in their roles.
                </div>
              </div>
              <div className="accordion bg-gradient-to-r from-cyan-600 to-cyan-800 rounded-lg w-full max-w-lg p-6 mb-8 shadow-xl">
                <div className="title text-2xl pb-1">Student Dashboard</div>
                <div className="text text-base opacity-70">
                  The Student dashboard is designed to empower students by
                  providing them with easy access to essential information. From
                  timetables and assignments to grades and communication tools,
                  students can stay informed and engaged with their education.
                </div>
              </div>
              <div className="accordion bg-gradient-to-r from-cyan-800 to-cyan-600 rounded-lg w-full max-w-lg p-6 mb-8 shadow-xl">
                <div className="title text-2xl pb-1">Parent Dashboard</div>
                <div className="text text-base opacity-70">
                  We understand the importance of involving parents in the
                  educational journey. The Parent dashboard offers parents
                  insights into their child's progress, attendance, and
                  communication with teachers. Keeping parents informed and
                  engaged is a cornerstone of our system.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <Team />
      </div>
    </>
  );
}

export default About;
