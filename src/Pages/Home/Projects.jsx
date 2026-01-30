import React, { useState } from "react";
import "./Projects.css";

export default function MyProjects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const techIcons = {
    "AWS EC2": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "VPC": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "Security Groups": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "Route 53": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "Certbot": "https://eff.org/files/certbot-logo-1A.svg",
    "Let's Encrypt": "https://letsencrypt.org/images/le-logo-lockonly.svg",
    "Terraform": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg",
    "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    "GitHub Actions": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    "NGINX": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg",
    "React": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    "Bash": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg",
    "AWS CLI": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
  };

  const projects = [
  {
    id: 1,
    title: "Secured Cloud Portfolio Infrastructure",
    description: "Production-grade, containerized portfolio website deployed on AWS EC2 with automated CI/CD, HTTPS, and infrastructure as code.",
    image: "https://github.com/user-attachments/assets/7298da32-7021-4696-a0be-e286905be045",
    tech: ["AWS", "Terraform", "Docker", "NGINX", "GitHub Actions"],
    repoUrl: "https://github.com/bowale01/Adebowale-myportfoliopage-app",
    demoUrl: "https://adelekeadebowale.com",
    details: {
      overview: "Built a secure and scalable portfolio website infrastructure from scratch using AWS, Docker, Terraform, and GitHub Actions. Features HTTPS via Certbot, automated deployments, and resilient architecture in a custom VPC with complete infrastructure as code implementation.",
      techStack: {
        infrastructure: ["AWS EC2", "VPC", "Security Groups", "Route 53", "Certbot", "Let's Encrypt"],
        development: ["Terraform", "Docker", "GitHub Actions", "NGINX", "React", "Bash", "AWS CLI"]
      },
      highlights: [
        "Terraform-based infrastructure as code (IaC) for AWS resource provisioning",
        "CI/CD pipeline with GitHub Actions and Docker Hub integration",
        "HTTPS with automated SSL certificate renewal via Certbot and Let's Encrypt",
        "Custom VPC and public subnet with hardened security groups",
        "NGINX reverse proxy configuration with multi-stage Docker builds",
        "Route 53 DNS management with domain configuration",
        "Production-grade deployment with container restart policies"
      ]
    }
  },
  {
    id: 2,
    title: "Multi-Environment CI/CD Pipeline",
    description: "Enterprise-grade CI/CD system deploying Dockerized apps across dev, staging, and production environments with GitHub Actions.",
    image: "/img/projects/placeholder.svg",
    tech: ["GitHub Actions", "Docker", "AWS ECR", "NGINX"],
    repoUrl: "https://github.com/bowale01/cicd-pipeline",
    demoUrl: "https://github.com/bowale01"
  },
  {
    id: 3,
    title: "Monitoring Stack",
    description: "Comprehensive containerized monitoring solution with Prometheus and Grafana for real-time infrastructure visibility.",
    image: "/img/projects/placeholder.svg",
    tech: ["Prometheus", "Grafana", "Docker", "Node Exporter"],
    repoUrl: "https://github.com/bowale01/monitoring",
    demoUrl: "https://adelekeadebowale.com"
  }
];

  return (
    <section id="Projects" className="projects-section">
      <div className="projects-container">
        <div className="section-header">
          <h2 className="section-heading">
            <i className="section-icon fas fa-code-branch"></i>
            Featured Projects
          </h2>
          <a href="https://github.com/bowale01" target="_blank" rel="noopener noreferrer" className="view-all-btn">
            <i className="fab fa-github"></i> View All Projects
          </a>
        </div>
        <p className="section-description">
          Here are some of my recent DevOps and cloud infrastructure projects that demonstrate 
          my technical expertise and problem-solving abilities.
        </p>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div 
                className="project-image"
                style={{ backgroundImage: `url(${project.image})` }}
              >
                {project.id === 1 && (
                  <div className="project-status-badge">Completed</div>
                )}
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, index) => (
                    <span className="tech-tag" key={index}>{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.details && (
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="project-link-btn"
                    >
                      <i className="fas fa-info-circle"></i> Details
                    </button>
                  )}
                  <a 
                    href={project.repoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link-btn"
                  >
                    <i className="fab fa-github"></i> Repository
                  </a>
                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link-btn"
                  >
                    <i className="fas fa-external-link-alt"></i> Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="project-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>
              <i className="fas fa-times"></i>
            </button>
            <h2 className="modal-title">{selectedProject.title}</h2>
            
            <div className="modal-section">
              <h3 className="modal-section-title">
                <i className="fas fa-info-circle"></i> Overview
              </h3>
              <p className="modal-text">{selectedProject.details.overview}</p>
            </div>

            <div className="modal-section">
              <h3 className="modal-section-title">
                <i className="fas fa-layer-group"></i> Tech Stack
              </h3>
              
              {selectedProject.details.techStack ? (
                <>
                  <div className="tech-category">
                    <h4 className="tech-category-title">Infrastructure</h4>
                    <div className="modal-tech-tags">
                      {selectedProject.details.techStack.infrastructure.map((tech, index) => (
                        <span className="modal-tech-tag-with-icon" key={index}>
                          {techIcons[tech] && (
                            <img src={techIcons[tech]} alt={tech} className="tech-icon" />
                          )}
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="tech-category">
                    <h4 className="tech-category-title">Development</h4>
                    <div className="modal-tech-tags">
                      {selectedProject.details.techStack.development.map((tech, index) => (
                        <span className="modal-tech-tag-with-icon" key={index}>
                          {techIcons[tech] && (
                            <img src={techIcons[tech]} alt={tech} className="tech-icon" />
                          )}
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="modal-tech-tags">
                  {selectedProject.tech.map((tech, index) => (
                    <span className="modal-tech-tag" key={index}>{tech}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="modal-section">
              <h3 className="modal-section-title">
                <i className="fas fa-star"></i> Key Highlights
              </h3>
              <ul className="modal-highlights">
                {selectedProject.details.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>

            <div className="modal-actions">
              <a 
                href={selectedProject.repoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="modal-btn modal-btn-primary"
              >
                <i className="fab fa-github"></i> View Repository
              </a>
              <a 
                href={selectedProject.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="modal-btn modal-btn-secondary"
              >
                <i className="fas fa-external-link-alt"></i> Live Demo
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
