import React, { useState } from "react";
import "./ContactForm.css";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const authToken = Cookies.get("token");

const API_BASE_URL = "https://eshikshaserver.onrender.com/api/v1/ContactUs";
const showErrorToast = (message) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000, // Auto-close the notification after 3 seconds
    style: { marginTop: "50px" }, // Add margin-top
  });
};
const showSuccessToast = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    style: { marginTop: "50px" },
  });
};

const Form2 = () => {
  const [formSubmitted, setFormSubmitted] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    schoolName: "",
    contact: "",
    email: "",
    message: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}`, formData);

      const responseData = response.data;
      console.log("Data successfully posted:", responseData);
      setFormSubmitted([...formSubmitted, formData]);
      setFormData({
        name: "",
        schoolName: "",
        contact: "",
        email: "",
        message: "",
      });
      showSuccessToast("Message Sent successfully!!!");
    } catch (error) {
      console.error("Error creating contact:", error);
      showErrorToast("Error on Contact Us");
    }
  };

  return (
    <>
      <div className="background">
        <div className="container">
          <div className="screen">
            <div className="screen-header">
              <div className="screen-header-left">
                <div className="screen-header-button close"></div>
                <div className="screen-header-button maximize"></div>
                <div className="screen-header-button minimize"></div>
              </div>
              <div className="screen-header-right">
                <div className="screen-header-ellipsis"></div>
                <div className="screen-header-ellipsis"></div>
                <div className="screen-header-ellipsis"></div>
              </div>
            </div>
            <div className="screen-body">
              <div className="screen-body-item left">
                <div className=" text-gray-50 gap-2">
                  <span className="text-2xl">CONTACT US</span>

                  <h1 className="text-base text-gray-300">
                    Have questions or need assistance? Contact us today! Reach
                    out to us for support or to learn more about our services.
                  </h1>
                </div>

                <div className="app-contact">CONTACT INFO : +91 8920377548</div>
              </div>
              <div className="screen-body-item">
                <form className="app-form" onSubmit={handleSubmitCreate}>
                  <div className="app-form-group">
                    <input
                      className="app-form-control"
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                  <div className="app-form-group">
                    <input
                      className="app-form-control"
                      type="text"
                      id="schoolName"
                      name="schoolName"
                      placeholder="School Name"
                      value={formData.schoolName}
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                  <div className="app-form-group">
                    <input
                      className="app-form-control"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="E-mail"
                      value={formData.email}
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                  <div className="app-form-group">
                    <input
                      className="app-form-control"
                      type="tel"
                      id="contact"
                      name="contact"
                      placeholder="Phone"
                      value={formData.contact}
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                  <div className="app-form-group message">
                    <input
                      className="app-form-control"
                      id="message"
                      name="message"
                      rows="4"
                      cols="23"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                  <div className="app-form-group buttons">
                    <button type="submit" className=" text-white">
                      Send message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form2;