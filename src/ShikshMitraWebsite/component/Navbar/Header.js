import React, { useState } from "react";
import logo from "../../assets/SHIKSHAMITRA_logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bg_color, setBg_color] = useState(false);
  const Navigate = useNavigate();
  const handleHamburgerClick = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollHandler = () => {
    if (window.scrollY > 0) {
      setBg_color(true);
    } else {
      setBg_color(false);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  function navigateToAdmin() {
    closeMenu();
    Navigate("Admin");
  }

  // scrole navbar
  window.addEventListener("scroll", scrollHandler);
  return (
    <header className="hearder_section z-[99999999] sm:mb-20 md:mb-20 mb-0">
      <div
        className={`menu-toggle ${menuOpen ? "menu-open" : ""}`}
        id="hamburger"
        onClick={handleHamburgerClick}
      >
        <div className="flex justify-between items-center px-4 mx-auto w-[100vw] ">
          <img src={logo} className="w-12" alt="logo" />
          <i className={`w-8  fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
        </div>
      </div>
      <div className={`overlay ${menuOpen ? "menu-open" : ""}`}></div>
      <div className="container_nav">
        <div
          className={`w-full  fixed top-0  ${
            bg_color ? "nav_bg z-[9999999]  " : ""
          }`}
        >
          <div className="nav_content">
            <nav className={`home_navbar  ${menuOpen ? "menu-open" : ""}`}>
              <div className={`home_navbar ${!menuOpen ? "menu-open" : ""}`}>
                <img src={logo} className="w-28 " alt="logo" />
              </div>
              <ul>
                <li className={` ${bg_color ? " " : ""}`}>
                  <Link
                    className={`header_content cursor-pointer hover:text-[#00bf63] ${
                      bg_color ? "text-white" : ""
                    }`}
                    to="/"
                    onClick={closeMenu}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className={`header_content cursor-pointer  hover:text-[#00bf63] ${
                      bg_color ? "text-white" : ""
                    }`}
                    to="/services"
                    onClick={closeMenu}
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    className={`header_content cursor-pointer  hover:text-[#00bf63] ${
                      bg_color ? "text-white" : ""
                    }`}
                    to="/screenshot"
                    onClick={closeMenu}
                  >
                    ScreenShot
                  </Link>
                </li>
                <li>
                  <Link
                    className={`header_content cursor-pointer  hover:text-[#00bf63] ${
                      bg_color ? "text-white" : ""
                    }`}
                    to="/about"
                    onClick={closeMenu}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    className={`header_content cursor-pointer  hover:text-[#00bf63] ${
                      bg_color ? "text-white" : ""
                    }`}
                    to="/contact"
                    onClick={closeMenu}
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    className={`header_content cursor-pointer  ${
                      bg_color ? "text-white" : ""
                    }`}
                    to="demo"
                    onClick={closeMenu}
                  >
                    <button
                      className={` px-5 py-1 text-sm font-large  border bg-[#f84444] rounded hover:bg-[#3de0d7] hover:text-white active:bg-red-800    ${
                        bg_color ? "text-white" : "text-white"
                      }`}
                      onclick={navigateToAdmin}
                    >
                      Demo
                    </button>
                  </Link>
                </li>
                <li>
                  <Link
                    className={`header_content cursor-pointer  ${
                      bg_color ? "text-white" : ""
                    }`}
                    to="login"
                    onClick={closeMenu}
                  >
                    <button
                      className={` px-5 py-1 text-sm font-large  border bg-[#00bf63] rounded hover:bg-[#3de0d7] hover:text-white active:bg-red-800    ${
                        bg_color ? "text-white" : "text-white"
                      }`}
                      onclick={navigateToAdmin}
                    >
                      Login
                    </button>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
