import React, { useState } from "react";
import "./Projects.css";

export default function MyProjects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const techIcons = {
    "AWS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "AWS EC2": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "VPC": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "Security Groups": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "Route 53": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "Certbot": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='65' text-anchor='middle' font-size='60' font-weight='bold' fill='%233b82f6'%3E%3C/%3E%3C/text%3E%3C/svg%3E",
    "Let's Encrypt": "https://letsencrypt.org/images/le-logo-lockonly.svg",
    "Terraform": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg",
    "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    "GitHub Actions": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    "NGINX": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg",
    "React": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    "Bash": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg",
    "AWS CLI": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "AWS ECR": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "SSH": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ssh/ssh-original.svg",
    "YAML": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/yaml/yaml-original.svg",
    "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    "Git Workflow": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    "FastAPI": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
    "OpenAI": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23412991'/%3E%3Ctext x='50' y='60' text-anchor='middle' font-size='50' font-weight='bold' fill='white'%3EAI%3C/text%3E%3C/svg%3E",
    "Amazon Bedrock": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "ESPN API": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23ff6600'/%3E%3Ctext x='50' y='60' text-anchor='middle' font-size='40' font-weight='bold' fill='white'%3EAPI%3C/text%3E%3C/svg%3E",
    "Agentic AI": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%234a90e2'/%3E%3Ctext x='50' y='60' text-anchor='middle' font-size='40' font-weight='bold' fill='white'%3E🤖%3C/text%3E%3C/svg%3E",
    "AWS MediaLive": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "AWS Elemental Inference": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "AWS MediaPackage": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "AWS CloudFront": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "AWS MediaConvert": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "CloudFormation": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "OBS Studio": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23302E31'/%3E%3Ctext x='50' y='65' text-anchor='middle' font-size='35' font-weight='bold' fill='white'%3EOBS%3C/text%3E%3C/svg%3E",
    "Amazon Comprehend": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "Amazon SageMaker": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "DynamoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "Amazon Translate": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "LangChain": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%231C3C3C'/%3E%3Ctext x='50' y='60' text-anchor='middle' font-size='30' font-weight='bold' fill='white'%3ELC%3C/text%3E%3C/svg%3E",
    "LangGraph": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%231C3C3C'/%3E%3Ctext x='50' y='60' text-anchor='middle' font-size='30' font-weight='bold' fill='white'%3ELG%3C/text%3E%3C/svg%3E",
    "EKS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "Kubernetes": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg",
    "PyTorch": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
    "CUDA": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='12' fill='%2376b900'/%3E%3Ctext x='50' y='62' text-anchor='middle' font-size='30' font-weight='bold' fill='white'%3ECU%3C/text%3E%3C/svg%3E",
    "NVIDIA T4 GPU": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='12' fill='%2376b900'/%3E%3Ctext x='50' y='62' text-anchor='middle' font-size='28' font-weight='bold' fill='white'%3EGPU%3C/text%3E%3C/svg%3E",
    "AWS SSM": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "S3": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
  };

  const projects = [
  {
    id: 1,
    title: "Secured Cloud Portfolio Infrastructure",
    description: "Production-grade, containerized portfolio website deployed on AWS EC2 with automated CI/CD, HTTPS, and infrastructure as code.",
    image: "https://github.com/user-attachments/assets/7298da32-7021-4696-a0be-e286905be045",
    tech: ["AWS", "Terraform", "Docker", "NGINX", "Route 53", "GitHub Actions", "Certbot"],
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
    title: "Multi-Platform CI/CD Pipeline",
    description: "Enterprise-grade CI/CD system deploying Dockerized apps across dev, staging, and production environments with GitHub Actions.",
    image: "/img/projects/placeholder.svg",
    tech: ["GitHub Actions", "Docker", "AWS ECR", "NGINX", "Route 53", "Let's Encrypt"],
    repoUrl: "https://github.com/bowale01/Multi-Platform-CICD-Workflow",
    demoUrl: "https://github.com/bowale01/Multi-Platform-CICD-Workflow",
    details: {
      overview: "Designed and deployed a full-scale, production-grade multi-platform CI/CD pipeline. Each GitHub branch (develop, staging, main) automatically triggers environment-specific Docker builds, pushes to ECR with matching tags, and deploys to dedicated containers with subdomain routing via NGINX and SSL management.",
      techStack: {
        infrastructure: ["Docker", "GitHub Actions", "AWS ECR", "AWS EC2", "NGINX", "Route 53", "Let's Encrypt"],
        development: ["Bash", "YAML", "JavaScript", "React", "SSH", "Git Workflow"]
      },
      highlights: [
        "Isolated development, staging, and production pipelines via branch-based GitHub Actions",
        "Environment-specific Docker tags (:dev, :staging, :latest) with separate container instances",
        "Subdomain routing (dev.*, staging.*, prod.*) with NGINX reverse proxy configuration",
        "Individual SSL certificate provisioning for each environment using Certbot & Let's Encrypt",
        "Route 53 DNS with wildcard support for flexible subdomain management",
        "Secured SSH deployments using GitHub Secrets and automated container lifecycle management",
        "Production-grade deployment patterns with zero-downtime container replacement"
      ]
    }
  },
  {
    id: 3,
    title: "Monitoring Stack",
    description: "Comprehensive containerized monitoring solution with Prometheus and Grafana for real-time infrastructure visibility.",
    image: "/img/projects/placeholder.svg",
    tech: ["Prometheus", "Grafana", "Docker", "Node Exporter"],
    repoUrl: "https://github.com/bowale01/monitoring",
    demoUrl: "https://adelekeadebowale.com"
  },
  {
    id: 4,
    title: "NBA GamePredict AI Agent",
    description: "Intelligent AI-powered NBA betting prediction system combining real ESPN H2H data with dual AI validation for professional-grade betting intelligence and capital protection.",
    image: "https://upload.wikimedia.org/wikipedia/en/0/03/National_Basketball_Association_logo.svg",
    tech: ["Python", "FastAPI", "OpenAI", "Amazon Bedrock", "Agentic AI", "ESPN API", "AWS"],
    repoUrl: "https://github.com/bowale01/nba-gamepredict-ai-agent",
    demoUrl: "https://github.com/bowale01/nba-gamepredict-ai-agent",
    details: {
      overview: "Built a hybrid AI-powered NBA betting prediction system that combines real ESPN H2H game data with dual AI validation layers for high-confidence predictions. The system uses an agentic AI approach with autonomous decision-making, integrating GPT-4o and Amazon Bedrock Claude for comprehensive data validation and capital protection. Only recommends bets with 85%+ confidence threshold.",
      techStack: {
        infrastructure: ["AWS", "Amazon Bedrock", "FastAPI", "Docker"],
        development: ["Python", "OpenAI", "Agentic AI", "ESPN API"]
      },
      highlights: [
        "Hybrid architecture combining real ESPN API H2H data with zero fallback/simulated data",
        "Dual AI validation layers: GPT-4o for historical context + Bedrock Claude for data quality checking",
        "Agentic AI agent with autonomous decision-making and reasoning capabilities",
        "Capital protection through rigorous 85% confidence threshold enforcement",
        "Multi-market support: Moneyline, Over/Under, Player Props, Halftime predictions",
        "Real-time H2H analysis, injury detection, and current form analysis",
        "FastAPI REST service with Swagger documentation for easy integration",
        "AWS serverless deployment with SAM templates and cost optimization"
      ]
    }
  },
  {
    id: 5,
    title: "AWS Infrastructure Deployment with Terraform — Auto Scaling, ALB, VPC, RDS",
    description: "Production-grade AWS infrastructure provisioned entirely with Terraform, featuring Auto Scaling Groups, Application Load Balancer, custom VPC networking, RDS database, and S3 remote state with DynamoDB locking.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
    tech: ["Terraform", "AWS", "Docker", "VPC", "Bash"],
    repoUrl: "https://github.com/bowale01/cloudops-task",
    demoUrl: "https://github.com/bowale01/cloudops-task",
    details: {
      overview: "Designed and deployed a complete AWS infrastructure stack using Terraform, including a custom VPC with public and private subnets, an Application Load Balancer for traffic distribution, Auto Scaling Groups for high availability, RDS for managed database, IAM roles with least-privilege access, and hardened security groups. Infrastructure state is managed remotely with S3 and DynamoDB locking.",
      techStack: {
        infrastructure: ["AWS", "VPC", "Security Groups", "Terraform"],
        development: ["Docker", "Bash", "Terraform"]
      },
      highlights: [
        "Custom VPC with public and private subnets across multiple AZs",
        "Application Load Balancer with health checks and target groups",
        "Auto Scaling Group with launch templates for automatic scaling",
        "RDS database instance in private subnet for data persistence",
        "IAM roles and instance profiles with least-privilege access",
        "Security groups with strict ingress/egress rules",
        "S3 remote state backend with DynamoDB locking",
        "Dockerized application with automated deployment"
      ]
    }
  },
  {
    id: 6,
    title: "AWS Elemental Inference – AI-Powered Vertical Video (9:16) Workflow",
    description: "Real-time 16:9 to 9:16 live stream conversion with AI smart cropping, powered by AWS Elemental Inference. Built for social media delivery (TikTok, Instagram Reels, YouTube Shorts) from a standard widescreen broadcast source.",
    image: "https://raw.githubusercontent.com/bowale01/aws-ai-vertical-video-workflow/main/screenshots/03-smart-crop-preview.png",
    tech: ["AWS MediaLive", "AWS Elemental Inference", "AWS MediaPackage", "AWS CloudFront", "CloudFormation", "OBS Studio", "PowerShell"],
    repoUrl: "https://github.com/bowale01/aws-ai-vertical-video-workflow",
    demoUrl: "https://github.com/bowale01/aws-ai-vertical-video-workflow",
    details: {
      overview: "Built a real-time AI-powered vertical video workflow that converts standard 16:9 widescreen broadcasts into 9:16 portrait format for social media platforms. Uses AWS Elemental Inference for intelligent smart cropping that dynamically tracks subjects (players, ball, action) instead of a static centre-crop. Deployed entirely via CloudFormation with 22 resources including MediaLive, MediaPackage v2, CloudFront CDN, S3 archiving, and multi-platform RTMP delivery to TikTok, YouTube Shorts, Instagram Reels, and Facebook Live simultaneously.",
      techStack: {
        infrastructure: ["AWS MediaLive", "AWS Elemental Inference", "AWS MediaPackage", "AWS CloudFront", "AWS MediaConvert", "CloudFormation", "AWS"],
        development: ["PowerShell", "OBS Studio", "YAML"]
      },
      highlights: [
        "AI-powered smart cropping via AWS Elemental Inference — dynamically follows action in real-time",
        "Real-time 16:9 → 9:16 conversion at 1080x1920, H.264 High Profile @ 4.5-6 Mbps, 30fps",
        "Multi-platform simultaneous delivery: TikTok LIVE, YouTube Shorts, Instagram Reels, Facebook LIVE via RTMP",
        "HLS low-latency streaming via MediaPackage v2 with 2-second segments and CloudFront CDN",
        "Highlight clip automation: EventBridge → Step Functions → MediaConvert for VOD asset generation",
        "Full Infrastructure as Code: 22 AWS resources deployed via single CloudFormation template",
        "Automated deployment script (deploy.ps1) handling credentials, CloudFront origin fix, and endpoint policy",
        "Cost-optimized architecture: channel runs only during active streaming, stack remains deployed at minimal cost"
      ]
    }
  },
  {
    id: 7,
    title: "AI Customer Review Intelligence Platform",
    description: "AI-powered platform that automatically analyzes customer reviews at scale — extracting sentiment, discovering topics, detecting fraud, generating summaries, and autonomously responding to feedback using AWS managed AI services.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    tech: ["Go", "Python", "React", "Amazon Comprehend", "Amazon Bedrock", "Amazon SageMaker", "DynamoDB", "Terraform"],
    repoUrl: "https://github.com/bowale01/ai-customer-review-intelligence-platform",
    demoUrl: "https://github.com/bowale01/ai-customer-review-intelligence-platform",
    details: {
      overview: "Built a full-stack AI platform that ingests customer product reviews from any source and delivers instant, actionable intelligence. The system uses multiple AWS AI/ML services in parallel — Amazon Comprehend for sentiment and NLP, Bedrock Claude for generative summaries and autonomous responses, SageMaker for custom ML models (fraud detection, topic clustering, trend forecasting), and Translate for multilingual support. Deployed entirely with Terraform and destroyed after testing to avoid ongoing charges.",
      techStack: {
        infrastructure: ["AWS", "Amazon Comprehend", "Amazon Bedrock", "Amazon SageMaker", "DynamoDB", "Amazon Translate", "Terraform", "CloudFormation"],
        development: ["Go", "Python", "React", "JavaScript"]
      },
      highlights: [
        "Sentiment analysis and key phrase extraction via Amazon Comprehend in real-time",
        "AI-generated executive summaries condensing hundreds of reviews into 3-sentence briefs (Bedrock Claude 3 Haiku)",
        "Autonomous response agent — reads complaints, checks policies, drafts replies via Bedrock Agents",
        "Custom ML models on SageMaker: fraud/spam detection, K-Means topic clustering, DeepAR+ trend forecasting",
        "RAG-powered Q&A grounded in actual review data with Bedrock Guardrails for PII/toxicity filtering",
        "Multilingual support via Amazon Translate — processes reviews in any language",
        "Go + Gin API server with React 18 dashboard featuring live metrics and GenAI Lab",
        "Full Terraform IaC — deploys in 3 minutes, destroys completely, cost ~$0.50 per demo run"
      ]
    }
  },
  {
    id: 8,
    title: "AI-Powered Incident Response Agent",
    description: "Intelligent agent that automatically triages, investigates, and recommends remediation for infrastructure incidents. Built with LangChain, LangGraph, Amazon Bedrock, and deployed on AWS EKS with Terraform.",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&q=80",
    tech: ["Python", "LangChain", "LangGraph", "Amazon Bedrock", "EKS", "Kubernetes", "Terraform", "Docker"],
    repoUrl: "https://github.com/bowale01/ai-incident-response-agent",
    demoUrl: "https://github.com/bowale01/ai-incident-response-agent",
    details: {
      overview: "Built an AI-powered incident response agent that automatically triages CloudWatch alarms, investigates root causes using real AWS tools, correlates with past incidents via RAG over runbooks, and recommends remediation with human-in-the-loop approval via Slack. Uses LangGraph state machine for multi-step workflow orchestration, Amazon Bedrock Claude 3.5 Sonnet for reasoning, ChromaDB for vector search, and LangSmith for full observability. Deployed on EKS with Karpenter for spot instance autoscaling.",
      techStack: {
        infrastructure: ["EKS", "Kubernetes", "Terraform", "Amazon Bedrock", "DynamoDB", "AWS", "Docker", "CloudFormation"],
        development: ["Python", "LangChain", "LangGraph", "Docker"]
      },
      highlights: [
        "LangGraph state machine workflow: Triage → Investigate → Correlate → Recommend → Approve → Execute",
        "Amazon Bedrock (Claude 3.5 Sonnet) for severity classification, log analysis, and remediation generation",
        "RAG pipeline: ChromaDB + Bedrock Titan embeddings over S3-stored runbooks for incident correlation",
        "Human-in-the-loop: agent pauses at approval gate, notifies via Slack, persists state in DynamoDB",
        "Real AWS tool integration: agent queries CloudWatch Logs/Metrics, ECS, DynamoDB in real-time",
        "EKS + Karpenter for spot instance autoscaling (~60% compute cost savings)",
        "Full Terraform IaC with modular design: VPC, EKS, DynamoDB, S3, SNS, IAM, Secrets Manager",
        "LangSmith observability: traces every agent run, tracks latency/cost per investigation"
      ]
    }
  },
  {
    id: 9,
    title: "AI Infra Lab — CPU vs GPU Performance for Machine Learning",
    description: "Hands-on AI infrastructure project that provisions a GPU-backed AWS EC2 instance (NVIDIA Tesla T4) with Terraform, runs PyTorch CPU-vs-GPU benchmarks, publishes the charts, and tears everything down — so you never pay for an idle GPU.",
    image: "https://images.unsplash.com/photo-1591405351990-4726e331f141?w=600&q=80",
    tech: ["Terraform", "AWS", "PyTorch", "CUDA", "NVIDIA T4 GPU", "AWS SSM", "S3", "Python"],
    repoUrl: "https://github.com/bowale01/ai-infra-gpu-lab",
    demoUrl: "https://github.com/bowale01/ai-infra-gpu-lab",
    details: {
      overview: "Built as a portfolio piece for AI Infrastructure / GPU / HPC work. Terraform provisions an AWS EC2 GPU instance (NVIDIA T4 on the Deep Learning AMI), PyTorch/CUDA run the CPU-vs-GPU benchmarks, and access is via AWS SSM Session Manager — no SSH and no open ports. Terraform state lives remotely in S3 with DynamoDB locking. Everything is defined as code: spin the environment up with one command, run the benchmarks, publish the results, then terraform destroy so the accelerator never sits idle. It proves the full loop an infra engineer owns end-to-end on live AWS hardware — a real GPU server provisioned, secured, benchmarked, and torn down.",
      techStack: {
        infrastructure: ["AWS", "AWS EC2", "NVIDIA T4 GPU", "AWS SSM", "S3", "DynamoDB", "Terraform"],
        development: ["Python", "PyTorch", "CUDA", "Bash", "Terraform"]
      },
      highlights: [
        "GPU compute provisioned as code with Terraform — reproducible and disposable",
        "SSM-only access (no SSH, no open ports) with a least-privilege IAM role",
        "Remote Terraform state in S3 with DynamoDB state locking",
        "Real CPU-vs-GPU benchmarks on an NVIDIA Tesla T4 (16 GB) using PyTorch + CUDA",
        "Verified live on hardware via nvidia-smi and PyTorch CUDA checks through SSM Session Manager",
        "Cost discipline: accelerator runs for minutes, is auto-shutdown-protected, and destroyed when done",
        "Published benchmark charts showing where the GPU wins (and where it doesn't)"
      ]
    }
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
                className={`project-image${project.id === 4 ? " project-image-nba" : ""}`}
                style={{ backgroundImage: `url(${project.image})` }}
              >
                {(project.id === 1 || project.id === 4 || project.id === 5 || project.id === 6 || project.id === 7 || project.id === 8) && (
                  <div className="project-status-badge">
                    {project.id === 1 && "Completed Jan 2026"}
                    {project.id === 4 && "Completed Feb 2026"}
                    {project.id === 5 && "Completed Apr 2026"}
                    {project.id === 6 && "Completed May 2026"}
                    {project.id === 7 && "Completed May 2026"}
                    {project.id === 8 && "Completed Aug 2026"}
                  </div>
                )}
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, index) => (
                    <span className="tech-tag-with-icon" key={index}>
                      {techIcons[tech] && <img src={techIcons[tech]} alt={tech} className="tech-icon-small" />}
                      {tech}
                    </span>
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
