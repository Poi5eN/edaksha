import React from "react";
import gaurav from "../../assets/images/Gaurav.jpeg";
import chhaya from "../../assets/images/Chhaya.jpeg";
import aman from "../../assets/images/amanimg.jpeg";
import anand from "../../assets/images/annadimg.jpg";
import praveen from "../../assets/images/praveenimg.jpeg";
import ajay from "../../assets/images/ajayimage.jpeg";
import badal from "../../assets/images/Badal.jpeg";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Team = () => {
  const Team1 = [
    {
      name: "Gourav Upadhyay",
      designation: "Software Engineer ",
      img: gaurav,
      des: " Software Engineer & Team Leader orchestrating the robust development, blending frontend finesse with backend prowess to deliver innovative solutions.",
      linkedin: "https://www.linkedin.com/in/gourav-kumar-upadhyay-0731b41b4",
      github: "https://github.com/Poi5eN",
      email: "poi5en.here@gmail.com",
    },
    {
      name: "Anand Jaiswal",
      designation: "Frontend Developer",
      img: anand,
      des: " React Frontend Developer specializing in state management and component architecture for seamless user experiences.",
      linkedin: "https://www.linkedin.com/in/anandkumarjaiswal/",
      github: "https://github.com/ANAND2023?tab=repositories",
      email: "anandkumar2022bth@gmail.com",
    },
    // {
    //   name: "Ajay Raj",
    //   designation: "Backend Developer",
    //   img: ajay,
    //   des: "Node.js Backend Developer experienced in database design, optimization, and cloud-based deployments.",
    //   linkedin:
    //     "https://www.linkedin.com/in/ajay-raj-850774280?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    //   github: "https://github.com/ajayraj2001",
    //   email: "ajayraj200119@gmail.com",
    // },
  ];
  const Team2 = [
    // {
    //   name: "Parveen Pal",
    //   designation: "Backend Developer ",
    //   img: praveen,
    //   des: " Node.js Backend Developer with expertise in building scalable APIs  using JavaScript.",
    //   linkedin: "https://www.linkedin.com/in/anandkumarjaiswal/",
    //   github: "https://github.com/Parveen-Pal",
    //   email: "",
    // },
    // {
    //   name: "Aman Sharma",
    //   designation: "Frontend Developer",
    //   img: aman,
    //   des: " React Frontend Developer enthusiastic about crafting interactive and visually appealing web applications with a focus on user experience",
    //   linkedin: "https://www.linkedin.com/in/anandkumarjaiswal/",
    //   github: "https://github.com/half-1999",
    //   email: "",
    // },

    // {
    //   name: "Badal Kumar",
    //   designation: " Frontend Developer",
    //   img: badal,
    //   des: " React Frontend Developer focused on optimizing performance and accessibility in web applications.",
    //   linkedin: "https://www.linkedin.com/in/badalkumar-singh-5577781b7",
    //   github: "https://github.com/BadalkumarSingh11",
    //   email: "dev.badalsingh@gmail.com",
    // },

    // {
    //   name: "Chhaya Sengar",
    //   designation: "Frontend Developer",
    //   img: chhaya,
    //   des: " React Frontend Developer passionate about creating elegant user interfaces with a knack for responsive design.",
    //   linkedin: "https://www.linkedin.com/in/anandkumarjaiswal/",
    //   github: "https://github.com/ChhayaSengar",
    //   email: "",
    // },
  ];
  return (
    <>
      <div className="w-full space-y-3 pb-5 bg-[#1f2937]">
        <div className="pb-16">
          <div
            id="text"
            className="md:text-2xl text-center uppercase bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-[#0e7490] text-5xl font-black py-5"
          >
            OUR TEAM
          </div>
        </div>
        <div className=" md:w-[70%] mx-auto grid md:grid-cols-3 grid-cols-1 gap-2">
          {Team1.map((item, index) => (
            <div className="max-w-[280px] rounded-2xl border bg-[#263243]  text-center shadow-lg py-3">
              <img
                className="mx-auto mb-4 h-32 w-32 rounded-full shadow-lg"
                src={item.img}
                alt="profile picture"
              />
              <h1 className="text-xl font-semibold text-white">{item.name}</h1>
              <h2 className="font-semibold text-slate-500">
                {item.designation}
              </h2>
              <span className="flex justify-center gap-2">
                <a href={item.linkedin} target="_blank">
                  <FaLinkedin className="text-2xl text-[#0a66c2]" />
                </a>
                <a href={item.github} target="_blank">
                  <FaGithub className="text-2xl text-[#0a66c2]" />
                </a>
              </span>
              <p className="mt-5 text-sm font-normal text-white">{item.des}</p>
              <a href={`mailto:${item.email}`} target="_blank">
                <button className="mt-2 rounded-3xl border border-solid border-gray-300 px-8 py-2 font-semibold uppercase tracking-wide text-white hover:bg-cyan-700 hover:text-white">
                  Contact
                </button>
              </a>
            </div>
          ))}
        </div>
        <div className=" w-[90%] mx-auto grid md:grid-cols-4 grid-cols-1 gap-4">
          {Team2.map((item, index) => (
            <div className="max-w-[280px] rounded-2xl border bg-[#263243]  text-center shadow-lg py-3">
              <img
                className="mx-auto mb-4 h-32 w-32 rounded-full shadow-lg"
                src={item.img}
                alt="profile picture"
              />
              <h1 className="text-xl font-semibold text-white">{item.name}</h1>
              <h2 className="font-semibold text-slate-500">
                {item.designation}
              </h2>
              <span className="flex justify-center gap-2">
                <a href={item.linkedin} target="_blank">
                  <FaLinkedin className="text-2xl text-[#0a66c2]" />
                </a>
                <a href={item.github} target="_blank">
                  <FaGithub className="text-2xl text-[#0a66c2]" />
                </a>
              </span>
              <p className="mt-5 text-sm font-normal text-white">{item.des}</p>
              <a href={`mailto:${item.email}`} target="_blank">
                <button className="mt-2 rounded-3xl border border-solid border-gray-300 px-8 py-2 font-semibold uppercase tracking-wide text-white hover:bg-cyan-700 hover:text-white">
                  Contact
                </button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Team;
