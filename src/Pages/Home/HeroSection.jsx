// HeroSection.jsx
import { Link } from "react-scroll";
import "./Hero.css";

export default function HeroSection() {
  return (
    <header className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h2 className="hero-subtitle">Hello, I'm Adebowale</h2>
          <h1 className="hero-title">
            <span className="hero-title-primary">Senior Cloud &</span> 
            <span className="hero-title-secondary"> DevOps Engineer</span>
          </h1>
          <p className="hero-description">
            Turning code into containers and pipelines into production.
            I design and operate secure, automated cloud platforms that scale with your business.
          </p>
          <div className="hero-buttons">
            <Link
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              to="Contact"
              className="btn btn-primary"
            >
              Get In Touch
            </Link>
            <button 
              onClick={() => {
                window.open("/Adeleke_Adebowale_Julius_Resume_.pdf", '_blank', 'noopener noreferrer')
              }}
              className="btn btn-outline-primary"
            >
              View Resume
            </button>
          </div>
          <div className="social-links">
            <a href="https://github.com/bowale01" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/debolek/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="mailto:debolek4dem@gmail.com" className="social-icon">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
        <div className="hero-image-container">
          <img src="./img/hero_img.png" alt="Debolek" className="hero-image" />
        </div>
      </div>
    </header>
  );
}
