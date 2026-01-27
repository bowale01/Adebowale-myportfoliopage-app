import React from "react";
import "./ComingSoon.css";

export default function ComingSoon() {
  const placeholders = [
    { id: 1, category: "DOCKER", title: "Container Best Practices" },
    { id: 2, category: "AWS", title: "Cloud Architecture Patterns" },
    { id: 3, category: "TERRAFORM", title: "Infrastructure as Code Guide" },
    { id: 4, category: "KUBERNETES", title: "Orchestration and Scaling" }
  ];

  return (
    <section id="Blog" className="coming-soon-section">
      <div className="coming-soon-container">
        <h2 className="coming-soon-heading">
          <i className="fas fa-blog"></i> Technical Blog
        </h2>
        <h3 className="coming-soon-subheading">
          Coming Soon
        </h3>
        <p className="coming-soon-subheading">
          Technical articles and insights about cloud technologies and DevOps engineering coming soon.
        </p>
        
        <div className="placeholders-grid">
          {placeholders.map((item) => (
            <div key={item.id} className="placeholder-card">
              <div className="placeholder-category">{item.category}</div>
              <h3 className="placeholder-title">{item.title}</h3>
              <div className="placeholder-lines">
                <div className="placeholder-line"></div>
                <div className="placeholder-line short"></div>
                <div className="placeholder-line medium"></div>
              </div>
              <button className="notify-button">
                <i className="fas fa-bell"></i> Notify Me
              </button>
            </div>
          ))}
        </div>
        
        <div className="subscribe-section">
          <p>Stay updated when new articles are published!</p>
          <div className="subscribe-form">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="subscribe-input"
            />
            <button className="subscribe-button">Subscribe</button>
          </div>
        </div>
      </div>
    </section>
  );
}
