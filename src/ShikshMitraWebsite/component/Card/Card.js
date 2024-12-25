import React from "react";
import "./Card.css";
import gif from "../../assets/eShikshaMitra1.gif";
import admin from "../../assets/logo/software-engineer.png";
import teacher from "../../assets/logo/teacher.png";
import parent from "../../assets/logo/parents.png";
import student from "../../assets/logo/student-removebg-preview.png";

import { Link } from "react-router-dom";
const Card = () => {
  return (
    <>
      <div
        className="min-h-screen  flex flex-col justify-center items-center relative"
        data-scroll
        data-scroll-section
        data-scroll-speed="-.9"
      >
        <img
          className="absolute inset-0 w-full h-full object-cover object-center"
          src={gif}
          style={{
            filter:
              " brightness(73%) contrast(106%) sepia(10%) hue-rotate(19deg)",
          }}
          alt="E_ShikshaMitra"
        />

        <div></div>
      </div>
      <div
        className="main bg-[#1f2937]"
        data-scroll
        data-scroll-section
        data-scroll-speed=".1"
      >
        {/* <div
          id="text"
          className="md:text-2xl text-center uppercase bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-[#0e7490] text-5xl font-black py-16"
        >
          OUR DASHBOARD!
        </div> */}

        <section className="card-area  " data-scroll-delay="200">
          <section className="card-section">
            <div className="dashcard">
              <div className="flip-card">
                <div className="flip-card__container">
                  <div className="card-front">
                    <div className="card-front__tp card-front__tp--city">
                      <img className="w-[80px]" src={admin} alt="" />
                      <h2 className="card-front__heading">ADMIN</h2>
                    </div>

                    <div className="card-front__bt">
                      <p className="card-front__text-view card-front__text-view--city">
                        View me
                      </p>
                    </div>
                  </div>
                  <div className="card-back">
                    <img
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjljNGxzb2dibXRjeGFxbml6bmp4anF0c21pMzVlenNyeng5MDVueiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XgMEt5bBLB2Q6wBMe7/giphy.gif"
                      alt="E_ShikshaMitra"
                    />
                  </div>
                </div>
              </div>

              <div className="inside-page">
                <div className="inside-page__container">
                  <h3 className=" inside-page__heading--city">
                    Efficiency, Control, Insight
                  </h3>
                  <p className="inside-page__text">
                    With our intuitive interface and comprehensive features,
                    managing your institution's operations has
                    never been easier.
                  </p>
                  <Link
                    to="/demo"
                    className="inside-page__btn inside-page__btn--city"
                  >
                    Demo
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="card-section">
            <div className="dashcard">
              <div className="flip-card">
                <div className="flip-card__container">
                  <div className="card-front">
                    <div className="card-front__tp card-front__tp--ski">
                      <img className="w-[80px]" src={teacher} alt="logo" />
                      <h2 className="card-front__heading">TEACHER</h2>
                    </div>

                    <div className="card-front__bt">
                      <p className="card-front__text-view card-front__text-view--ski">
                        View me
                      </p>
                    </div>
                  </div>

                  <div className="card-back">
                    <img
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzhjbnN5ZjgwOHMxNmk3MTA4cmpscmN5c3Z4ODFtZHZnbXozcWQ2YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4pT1OAmnZZvNsZFe/giphy.gif"
                      alt="E_ShikshaMitra"
                    />
                  </div>
                </div>
              </div>

              <div className="inside-page">
                <div className="inside-page__container">
                  <h3 className=" inside-page__heading--ski">
                    Inspire, Innovate, Excel
                  </h3>
                  <p className="inside-page__text">
                    Let's empower you to make a lasting impact on your students'
                    learning experiences and foster a culture of excellence.
                  </p>
                  <Link
                    to="/demo"
                    className="inside-page__btn inside-page__btn--ski"
                  >
                    Demo
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="card-section">
            <div className="dashcard">
              <div className="flip-card">
                <div className="flip-card__container">
                  <div className="card-front">
                    <div className="card-front__tp card-front__tp--beach">
                      <img className="w-[80px]" src={parent} alt="logo" />

                      <h2 className="card-front__heading">PARENT</h2>
                    </div>

                    <div className="card-front__bt">
                      <p className="card-front__text-view card-front__text-view--beach">
                        View me
                      </p>
                    </div>
                  </div>
                  <div className="card-back">
                    <img
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTBuMjFwb2I2ajRxNmV3azU3aTJzZ2psMnNvaXBjcmdwM2dmanJwbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7aTmQPImd11EowFO/giphy.gif"
                      alt="E_ShikshaMitra"
                    />
                  </div>
                </div>
              </div>

              <div className="inside-page">
                <div className="inside-page__container">
                  <h3 className="inside-page__heading--beach">
                    Connect, Engage, Thrive
                  </h3>
                  <p className="inside-page__text">
                    Stay informed about their progress, upcoming events, etc.
                    let's ensure your child thrives academically and socially.
                  </p>
                  <Link
                    to="/demo"
                    className="inside-page__btn inside-page__btn--beach"
                  >
                    Demo
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="card-section">
            <div className="dashcard">
              <div className="flip-card">
                <div className="flip-card__container">
                  <div className="card-front">
                    <div className="card-front__tp card-front__tp--camping">
                      <img className="w-[80px]" src={student} alt="logo" />
                      <h2 className="card-front__heading">STUDENT</h2>{" "}
                    </div>

                    <div className="card-front__bt">
                      <p className="card-front__text-view card-front__text-view--camping">
                        View me
                      </p>
                    </div>
                  </div>
                  <div className="card-back">
                    <img
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmtvc2hxcmUyZzh5a2tlbGJsZWIzdWh4MnhpeW1ieHg4dzRnamxxZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o8dFjB7T9lNldqliM/giphy.gif"
                      alt="E_ShikshaMitra"
                    />
                  </div>
                </div>
              </div>

              <div className="inside-page">
                <div className="inside-page__container">
                  <h3 className=" inside-page__heading--camping">
                    Explore, Create, Grow
                  </h3>
                  <p className="inside-page__text">
                    Access learning materials, collaborate and engage in
                    exciting projects. Your space to unleash your potential.
                  </p>
                  <Link
                    to="/demo"
                    className="inside-page__btn inside-page__btn--camping"
                  >
                    Demo
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </section>
        <h1 className="text-gray-400  text-center">
          At eShikshaMitra, our mission is to simplify school management and
          create a more transparent and collaborative educational environment.
        </h1>
      </div>
    </>
  );
};

export default Card;
