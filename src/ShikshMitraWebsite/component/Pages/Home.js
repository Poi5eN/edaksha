import React from "react";
import Community from "../Community/Community";
import Testimonial from "../Testimonial/Testimonial";
import ContactForm from "../ContactForm/ContactForm";
import Card from "../Card/Card";
import Ourwork from "../Gsap/Ourworks/Ourwork";


const Home = () => {
  return (
    <div className="bg-[#1f2937]">
      
      <Card />
      <Ourwork />
      
      <Community />
      <Testimonial />
     
      <ContactForm />
    </div>
  );
};

export default Home;
