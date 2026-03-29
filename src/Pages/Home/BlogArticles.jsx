import React from "react";
import "./BlogArticles.css";

export default function BlogArticles() {
  const articles = [
    {
      id: 1,
      category: "TERRAFORM / IaC",
      categoryColor: "#f59e0b",
      title: "Infrastructure as Code: A Practical Guide to Terraform on AWS",
      description: "A deep dive into IaC with Terraform — covering VPCs, security groups, remote state, CI/CD pipelines, and real examples from a production AWS Active Directory deployment.",
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&q=80",
      alt: "Terraform IaC Guide",
      link: "https://github.com/bowale01/iac-technical-blog"
    },
    {
      id: 2,
      category: "DEVOPS / NETWORKING",
      categoryColor: "#10b981",
      title: "The Reverse Proxy Shift: Why Engineers Are Moving from NGINX to Traefik and Caddy",
      description: "NGINX ruled for a decade — but Traefik and Caddy are taking over. A practical breakdown of why the shift is happening and which one belongs in your stack.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
      alt: "NGINX to Traefik and Caddy",
      link: "https://github.com/bowale01/nginx-to-traefik-caddy-blog"
    },
    {
      id: 3,
      category: "KUBERNETES",
      categoryColor: "#ef4444",
      title: "ingress-nginx is Retired: What It Means and Where to Go Next",
      description: "The ingress-nginx controller reached EOL in March 2026. No more security patches, no bug fixes. Here is what happened, why it matters, and how to migrate to Traefik, Cilium, or the Kubernetes Gateway API.",
      image: "https://images.unsplash.com/photo-1667372393086-9d4001d51cf1?w=600&q=80",
      alt: "ingress-nginx EOL migration guide",
      link: "https://github.com/bowale01/ingress-nginx-eol-blog"
    },
  ];

  return (
    <section id="Blog" className="blog-section">
      <div className="blog-container">
        <div className="section-header">
          <h2 className="section-heading">
            <i className="section-icon fas fa-book"></i>
            Technical Blog
          </h2>
          <a href="/blog" className="view-all-btn">
            <i className="fas fa-book-open"></i> View All Articles
          </a>
        </div>
        
        <p className="section-description">
          Insights and tutorials about my journey with microservices and cloud technologies.
        </p>

        <div className="articles-grid">
          {articles.map((article) => (
            <div key={article.id} className="article-card">
              <div className="article-image-container">
                <img 
                  src={article.image} 
                  alt={article.alt} 
                  className="article-image"
                />
              </div>
              <div className="article-content">
                <span 
                  className="article-category" 
                  style={{color: article.categoryColor}}
                >
                  {article.category}
                </span>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-description">{article.description}</p>
                <a href={article.link} className="read-more-link" target={article.link.startsWith("http") ? "_blank" : "_self"} rel="noreferrer">
                  Read More <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
