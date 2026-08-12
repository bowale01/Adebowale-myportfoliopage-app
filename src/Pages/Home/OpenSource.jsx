import React, { useMemo, useState } from "react";
import "./Projects.css";

const contributions = [
  {
    id: 1,
    project: "OpenSRE",
    org: "Tracer Cloud",
    orgUrl: "https://github.com/Tracer-Cloud/opensre",
    title: "Fix: Catch ValidationError in Discord classify() (SM-18)",
    description: "Applied the SM-01 pattern to the Discord vendor classify() — catching pydantic.ValidationError specifically, wrapping it in a safe ValueError to prevent secret field values leaking into Sentry. Greptile confidence score: 5/5.",
    prUrl: "https://github.com/Tracer-Cloud/opensre/pull/3994",
    status: "Merged",
    date: "Jul 2026",
    tech: ["Python", "Pydantic", "Discord", "Testing"]
  },
  {
    id: 2,
    project: "InsForge",
    org: "InsForge",
    orgUrl: "https://github.com/InsForge/InsForge",
    title: "docs(openapi): Add missing endpoints across auth, secrets, storage, and AI",
    description: "Documented undocumented live endpoints across 4 OpenAPI specs — auth (ID-token sign-in, SMTP config, email templates), secrets (API key rotation), storage (config CRUD), and AI (parameterized provider key routes). Reviewed and approved by maintainer. Greptile & Cubic confidence: 5/5.",
    prUrl: "https://github.com/InsForge/InsForge/pull/1690",
    status: "Merged",
    date: "Jul 2026",
    tech: ["OpenAPI", "YAML", "REST APIs", "Documentation"]
  },
  {
    id: 3,
    project: "InsForge",
    org: "InsForge",
    orgUrl: "https://github.com/InsForge/InsForge",
    title: "fix: Set app.encryption_key GUC in deploy Docker Compose files",
    description: "Fixed a bug where schedules with HTTP headers failed because the Postgres GUC app.encryption_key was never set in deploy compose files. Added the command override to both docker-compose.yml and docker-compose.dokploy.yml mirroring the root compose pattern. Greptile & Cubic confidence: 5/5.",
    prUrl: "https://github.com/InsForge/InsForge/pull/1780",
    status: "Merged",
    date: "Jul 2026",
    tech: ["Docker", "PostgreSQL", "Docker Compose", "DevOps"]
  },
  {
    id: 4,
    project: "InsForge",
    org: "InsForge",
    orgUrl: "https://github.com/InsForge/InsForge",
    title: "fix(openapi): Add apiKey security scheme to email, functions, and logs specs",
    description: "Aligned three OpenAPI specs with the existing authentication pattern — adding the x-api-key header scheme to email (1 operation), functions (5 admin operations), and logs (3 admin operations). Approved by maintainer. Greptile & Cubic confidence: 5/5.",
    prUrl: "https://github.com/InsForge/InsForge/pull/1778",
    status: "Merged",
    date: "Jul 2026",
    tech: ["OpenAPI", "YAML", "Security", "REST APIs"]
  }
];

export default function OpenSource() {
  const [query, setQuery] = useState("");
  const [activeProject, setActiveProject] = useState("All Projects");

  const projectFilters = useMemo(() => {
    const uniqueProjects = [...new Set(contributions.map((item) => item.project))];
    return ["All Projects", ...uniqueProjects];
  }, []);

  const filteredContributions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return contributions.filter((contribution) => {
      const matchesProject =
        activeProject === "All Projects" || contribution.project === activeProject;

      if (!normalizedQuery) {
        return matchesProject;
      }

      const searchableText = [
        contribution.title,
        contribution.description,
        contribution.project,
        contribution.org,
        contribution.status,
        contribution.date,
        ...contribution.tech,
      ]
        .join(" ")
        .toLowerCase();

      return matchesProject && searchableText.includes(normalizedQuery);
    });
  }, [activeProject, query]);

  return (
    <section id="OpenSource" className="projects-section">
      <div className="projects-container">
        <div className="section-header">
          <h2 className="section-heading">
            <i className="section-icon fas fa-code-branch"></i>
            Open Source Contributions
          </h2>
          <a href="https://github.com/bowale01" target="_blank" rel="noopener noreferrer" className="view-all-btn">
            <i className="fab fa-github"></i> View GitHub Profile
          </a>
        </div>
        <p className="section-description">
          Contributing to open source projects — fixing bugs, improving reliability, and collaborating with the community.
        </p>

        <div className="open-source-controls" role="search">
          <div className="open-source-search-wrap">
            <i className="fas fa-search open-source-search-icon" aria-hidden="true"></i>
            <input
              type="search"
              className="open-source-search-input"
              placeholder="Search by PR title, details, or technologies..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search open source contributions"
            />
          </div>

          <div className="open-source-filter-row" role="tablist" aria-label="Filter by repository">
            {projectFilters.map((projectName) => (
              <button
                key={projectName}
                type="button"
                role="tab"
                aria-selected={activeProject === projectName}
                className={`open-source-filter-btn ${
                  activeProject === projectName ? "active" : ""
                }`}
                onClick={() => setActiveProject(projectName)}
              >
                {projectName}
              </button>
            ))}
          </div>

          <p className="open-source-result-count">
            Showing {filteredContributions.length} of {contributions.length} contributions
          </p>
        </div>

        <div className="projects-grid">
          {filteredContributions.map((contribution) => (
            <div key={contribution.id} className="project-card">
              <div className="project-content">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem'}}>
                  <span style={{
                    backgroundColor: '#10b981',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {contribution.status} — {contribution.date}
                  </span>
                </div>
                <h3 className="project-title">{contribution.title}</h3>
                <p style={{fontSize: '0.85rem', color: '#60a5fa', marginBottom: '0.5rem', fontWeight: '500'}}>
                  {contribution.project} • {contribution.org}
                </p>
                <p className="project-description">{contribution.description}</p>
                <div className="project-tech">
                  {contribution.tech.map((tech, index) => (
                    <span className="tech-tag-with-icon" key={index}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <a 
                    href={contribution.prUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link-btn"
                  >
                    <i className="fas fa-code-branch"></i> View PR
                  </a>
                  <a 
                    href={contribution.orgUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link-btn"
                  >
                    <i className="fab fa-github"></i> Project Repo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredContributions.length === 0 && (
          <div className="open-source-empty-state">
            <p>No contributions matched your current search/filter. Try a different keyword.</p>
          </div>
        )}
      </div>
    </section>
  );
}
