import React, { useState } from "react";
import "./Projects.css";

export default function MyProjects() {
  const projects = [
  {
    id: 1,
    title: "Cloud Portfolio Infrastructure",
    description: "Production-grade, containerized portfolio website deployed on AWS EC2 with automated CI/CD, HTTPS, and infrastructure as code.",
    image: "/img/projects/placeholder.svg",
    tech: ["AWS", "Terraform", "Docker", "NGINX", "GitHub Actions"],
    repoUrl: "https://github.com/bowale01/Adebowale-myportfoliopage-app",
    demoUrl: "https://adelekeadebowale.com"
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
              />
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, index) => (
                    <span className="tech-tag" key={index}>{tech}</span>
                  ))}
                </div>
                <div className="project-links">
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
    </section>
  );
}
