import React, { useState } from "react";
import { CSSTransition } from "react-transition-group"; // Import CSSTransition for simple transitions
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Testimonial.css";
const Resizable = () => {
  const [selectedFooter, setSelectedFooter] = useState(1);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (prevIndex, nextIndex) => {
      setSelectedFooter([0, 1, 2].indexOf(nextIndex) !== -1 ? 1 : 2);
    },
  };
  return (
    <div>
      <SimpleSlider settings={settings} />
      <Footer selectedFooter={selectedFooter} />
    </div>
  );
};
const SimpleSlider = ({ settings }) => {
  console.log("SimpleSlider render");
  return (
    <Slider {...settings}>
      <div>
        <div className="slide-0">
          <h3>Graph 1</h3>
        </div>
      </div>
      <div>
        <div className="slide-1">
          <h3>Graph 2</h3>
        </div>
      </div>
      <div>
        <div className="slide-2">
          <h3>Graph 3</h3>
        </div>
      </div>
      <div>
        <div className="slide-3">
          <h3>Set Up</h3>
        </div>
      </div>
    </Slider>
  );
};

const Footer = ({ selectedFooter }) => {
  console.log("Footer render");
  return (
    <div className="footer-container">
      <CSSTransition in={true} timeout={500} classNames="example" unmountOnExit>
        <div className={`footer${selectedFooter}`}>Footer {selectedFooter}</div>
      </CSSTransition>
    </div>
  );
};

export default Resizable;
