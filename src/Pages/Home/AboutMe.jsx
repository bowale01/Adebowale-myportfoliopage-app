// AboutMe.jsx
import React from "react";
import "./About.css";

export default function AboutMe() {
  return (
    <section id="AboutMe" className="about-section">
      <div className="about-container">
        <div className="about-header">
          <h2 className="about-heading">About Me</h2>
          <p className="about-subheading">Get to know more about my journey</p>
        </div>
        
        <div className="about-content">
          <div className="about-left-column">
            <div className="about-image-container">
              <img 
                src="./img/about_me.png" 
                alt="Debolek" 
                className="about-image"
              />
            </div>
            
            <div className="about-credentials">
              <div className="credential-item">
                <div className="credential-icon">
                  <i className="fas fa-briefcase"></i>
                </div>
                <div className="credential-content">
                  <h3 className="credential-title">Experience</h3>
                  <p className="credential-text">13+ Years in IT</p>
                  <p className="credential-subtext">Senior Cloud & DevOps Engineer</p>
                </div>
              </div>
              
              <div className="credential-item">
                <div className="credential-icon">
                  <i className="fas fa-award"></i>
                </div>
                <div className="credential-content">
                  <h3 className="credential-title">Certifications</h3>
                  <p className="credential-text">Cloud & DevOps Certified</p>
                  <a 
                    href="https://www.linkedin.com/in/debolek/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="credential-link"
                  >
                    View on LinkedIn <i className="fas fa-external-link-alt"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-right-column">
            <p className="about-description">
              As an experienced Senior Cloud Engineer and SRE, I bring over 10 years of IT expertise, specializing in cloud infrastructure, DevOps, and system optimization. My background spans AWS, Azure DevOps, Kubernetes (EKS, AKS, GKE), and automation, with a focus on cost reduction, reliability, and efficient CI/CD workflows.
            </p>
            
            <p className="about-description">
              I've successfully led and supported critical cloud-based systems across multiple regions, leveraging tools like Terraform, Cloudformation, ArgoCD, EKS, and Docker. My experience includes designing and implementing scalable architectures, optimizing cloud costs, and ensuring high availability of production systems.
            </p>
            
            <p className="about-description">
              Passionate about innovation and teamwork, I am eager to take on new challenges in dynamic environments, driving operational excellence and cloud transformation. I believe in continuous learning and sharing knowledge with the community.
            </p>

            {/* Certification badges */}
            <div className="cert-badge-container">
              <img
                onClick={() => {
                  window.open("./certifications/AWS Certified DevOps Engineer.pdf", '_blank', 'noopener noreferrer')
                }}
                src="./img/badges/AWS Certified DevOps Engineer.png"
                alt="AWS Certified DevOps Engineer"
                className="cert-badge-image"
                style={{cursor: 'pointer'}}
              />
              <img
                onClick={() => {
                  window.open("./certifications/AWS Certified Solutions Architect.pdf", '_blank', 'noopener noreferrer')
                }}
                src="./img/badges/AWS Certified Solutions Architect.png"
                alt="AWS Certified Solutions Architect"
                className="cert-badge-image"
                style={{cursor: 'pointer'}}
              />
              <img
                onClick={() => {
                  window.open("./certifications/AWS Certified Developer.pdf", '_blank', 'noopener noreferrer')
                }}
                src="./img/badges/AWS Certified Developer.png"
                alt="AWS Certified Developer"
                className="cert-badge-image"
                style={{cursor: 'pointer'}}
              />
              <img
                onClick={() => {
                  window.open("./certifications/Azure Certified Administrator Associate.pdf", '_blank', 'noopener noreferrer')
                }}
                src="./img/badges/Azure Certified Administrator Associate.png"
                alt="Azure Certified Administrator Associate"
                className="cert-badge-image"
                style={{cursor: 'pointer'}}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
