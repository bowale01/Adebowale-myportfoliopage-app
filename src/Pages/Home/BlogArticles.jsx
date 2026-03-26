import React from "react";
import "./BlogArticles.css";

export default function BlogArticles() {
  const articles = [
    {
      id: 1,
      category: "TERRAFORM / IaC",
      categoryColor: "#f59e0b", // Amber
      title: "Infrastructure as Code: A Practical Guide to Terraform on AWS",
      description: "A deep dive into IaC with Terraform — covering VPCs, security groups, remote state, CI/CD pipelines, and real examples from a production AWS Active Directory deployment.",
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&q=80",
      alt: "Terraform IaC Guide",
      link: "https://github.com/bowale01/iac-technical-blog"
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
