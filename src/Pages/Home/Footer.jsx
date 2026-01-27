import { Link } from "react-scroll";
import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer--container">
      <div className="footer--cta">
        <h2 className="footer--cta--title">Let's Build Something Amazing Together</h2>
        <p className="footer--cta--text">
          With over 10 years of cloud engineering experience, I'm open to new opportunities and collaborations. Let's work together on innovative cloud solutions.
        </p>
        <Link
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          to="Contact"
          className="footer--cta--button"
        >
          Contact Me
        </Link>
      </div>
      
      <div className="footer--content--wrapper">
        <div className="footer--branding">
          <span className="footer--logo-text">ADELEKE ADEBOWALE JULIUS (M.Sc., B.Tech, Mini MBA)</span>
        </div>
        
        <div className="footer--items">
          <ul>
            <li>
              <Link
                activeClass="navbar--active-content"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                to="hero-section"
                className="text-md"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                activeClass="navbar--active-content"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                to="Projects"
                className="text-md"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                activeClass="navbar--active-content"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                to="AboutMe"
                className="text-md"
              >
                About Me
              </Link>
            </li>
            <li>
              <Link
                activeClass="navbar--active-content"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                to="Contact"
                className="text-md"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="footer--social">
          <ul>
            <li>
              <a
                href="https://github.com/bowale01"
                className="social-link"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/debolek/"
                className="social-link"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a
                href="mailto:debolek4dem@gmail.com"
                className="social-link"
                target="_blank"
                rel="noreferrer"
                aria-label="Email"
              >
                <i className="fas fa-envelope"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <hr className="divider" />
      
      <div className="footer--bottom">
        <p className="footer--content">© 2026 Adebowale. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
