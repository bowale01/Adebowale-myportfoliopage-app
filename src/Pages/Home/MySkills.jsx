import React from "react";
import "./Skills.css";

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <h2 className="skills-heading">Technical Skills</h2>
        <p className="skills-description">
          My expertise spans across multiple domains, with a focus on cloud infrastructure and DevOps practices.
        </p>
        
        <div className="skills-grid">
          <div className="skill-card">
            <div className="icon-container red-bg">
              <i className="fab fa-aws"></i>
            </div>
            <h3 className="skill-title">Cloud Platforms</h3>
            <ul className="skill-list">
              <li className="skill-item">
                <span className="skill-name">AWS (EC2, S3, CloudFormation, RDS, ELB, EKS, IAM)</span>
              </li>
              <li className="skill-item">
                <span className="skill-name">Azure (DevOps, Repos, Pipelines, Artifacts, AKS)</span>
              </li>
            </ul>
          </div>
          
          <div className="skill-card">
            <div className="icon-container green-bg">
              <i className="fas fa-infinity"></i>
            </div>
            <h3 className="skill-title">DevOps & CI/CD Tools</h3>
            <ul className="skill-list">
              <li className="skill-item">
                <span className="skill-name">Jenkins, Terraform, Azure DevOps</span>
              </li>
              <li className="skill-item">
                <span className="skill-name">ArgoCD, Concourse, GitOps, GitHub</span>
              </li>
            </ul>
          </div>
          
          <div className="skill-card">
            <div className="icon-container blue-bg">
              <i className="fab fa-docker"></i>
            </div>
            <h3 className="skill-title">Containerization & Orchestration</h3>
            <ul className="skill-list">
              <li className="skill-item">
                <span className="skill-name">Docker, Kubernetes (EKS, AKS, GKE)</span>
              </li>
              <li className="skill-item">
                <span className="skill-name">Rancher, Kustomize, Helm</span>
              </li>
            </ul>
          </div>
          
          <div className="skill-card">
            <div className="icon-container pink-bg">
              <i className="fas fa-cogs"></i>
            </div>
            <h3 className="skill-title">Automation & Configuration</h3>
            <ul className="skill-list">
              <li className="skill-item">
                <span className="skill-name">Ansible, Terraform</span>
              </li>
            </ul>
          </div>
          
          <div className="skill-card">
            <div className="icon-container blue-bg">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3 className="skill-title">Monitoring & Logging</h3>
            <ul className="skill-list">
              <li className="skill-item">
                <span className="skill-name">Prometheus, Grafana, ELK Stack</span>
              </li>
              <li className="skill-item">
                <span className="skill-name">Nagios, Centreon, CloudWatch, Cloud Trail, Azure Monitor</span>
              </li>
            </ul>
          </div>
          
          <div className="skill-card">
            <div className="icon-container green-bg">
              <i className="fas fa-code"></i>
            </div>
            <h3 className="skill-title">Scripting & Automation</h3>
            <ul className="skill-list">
              <li className="skill-item">
                <span className="skill-name">Bash, Python, Shell Scripting, YAML</span>
              </li>
              <li className="skill-item">
                <span className="skill-name">AI Code Assistance (Copilot/Gemini)</span>
              </li>
            </ul>
          </div>
          
          <div className="skill-card">
            <div className="icon-container red-bg">
              <i className="fas fa-network-wired"></i>
            </div>
            <h3 className="skill-title">Networking & Security</h3>
            <ul className="skill-list">
              <li className="skill-item">
                <span className="skill-name">VPC, Security Groups, Route53, Auto Scaling</span>
              </li>
              <li className="skill-item">
                <span className="skill-name">IAM, VPN, HTTP, HTTPS, CDN</span>
              </li>
            </ul>
          </div>
          
          <div className="skill-card">
            <div className="icon-container pink-bg">
              <i className="fas fa-database"></i>
            </div>
            <h3 className="skill-title">Database & Systems</h3>
            <ul className="skill-list">
              <li className="skill-item">
                <span className="skill-name">Oracle DB (11g/12c), MySQL, MongoDB, RDS</span>
              </li>
              <li className="skill-item">
                <span className="skill-name">Unix, Linux (CentOS, RHEL), Windows Server</span>
              </li>
            </ul>
          </div>
          
          <div className="skill-card">
            <div className="icon-container blue-bg">
              <i className="fab fa-git-alt"></i>
            </div>
            <h3 className="skill-title">Version Control & Collaboration</h3>
            <ul className="skill-list">
              <li className="skill-item">
                <span className="skill-name">Git, GitHub, GitLab</span>
              </li>
              <li className="skill-item">
                <span className="skill-name">Jira, Confluence, Slack, Teams</span>
              </li>
            </ul>
          </div>
          
          <div className="skill-card">
            <div className="icon-container green-bg">
              <i className="fas fa-tools"></i>
            </div>
            <h3 className="skill-title">Others</h3>
            <ul className="skill-list">
              <li className="skill-item">
                <span className="skill-name">ITIL, Agile, SLAs, SLIs, SLOs, Lambda</span>
              </li>
              <li className="skill-item">
                <span className="skill-name">Video Encoders: Harmonic, Mediakind</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
