import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import "./Navbar.css"; 

function Navbar() {
  const [navActive, setNavActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleNav = () => {
    setNavActive(!navActive);
  };

  const closeMenu = () => {
    setNavActive(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        closeMenu();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 1200) {
      closeMenu();
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${navActive ? "active" : ""} ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="https://adelekeadebowale.com" className="logo-text">
            <span className="logo-name">ADELEKE ADEBOWALE JULIUS (M.Sc., B.Tech, Mini MBA)</span>
          </a>
        </div>
        
        <div className={`navbar--items ${navActive ? "active" : ""}`}>
          <ul>
            <li>
              <Link
                onClick={closeMenu}
                activeClass="navbar--active-content"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                to="hero-section"
                className="navbar--content"
              >
                Home
              </Link>
            </li>
            
            <li>
              <Link
                onClick={closeMenu}
                activeClass="navbar--active-content"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                to="skills"
                className="navbar--content"
              >
                Skills
              </Link>
            </li>

            <li>
              <Link
                onClick={closeMenu}
                activeClass="navbar--active-content"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                to="AboutMe"
                className="navbar--content"
              >
                About Me
              </Link>
            </li>

            <li>
              <Link
                onClick={closeMenu}
                activeClass="navbar--active-content"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                to="Projects"
                className="navbar--content"
              >
                Projects
              </Link>
            </li>
            
            <li>
              <Link
                onClick={closeMenu}
                activeClass="navbar--active-content"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                to="Blog"
                className="navbar--content"
              >
                Blog
              </Link>
            </li>
            
            <li>
              <Link
                onClick={() => {
                  closeMenu();
                  window.open("/certifications/Adeleke_Adebowale_Julius_Resume_.pdf", "_blank", "noopener,noreferrer");
                }}
                className="navbar--content"
              >
                Resume
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="navbar-cta">
          <Link
            onClick={closeMenu}
            activeClass="navbar--active-content"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            to="Contact"
            className="btn btn-outline-primary"
          >
            Contact Me
          </Link>
        </div>

        <button
          type="button"
          className={`nav__hamburger ${navActive ? "active" : ""}`}
          onClick={toggleNav}
        >
          <span className="nav__hamburger__line"></span>
          <span className="nav__hamburger__line"></span>
          <span className="nav__hamburger__line"></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
