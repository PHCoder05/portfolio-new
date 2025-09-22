import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import maryway from "../../Assets/Projects/maryway.jpg";
import emotion from "../../Assets/Projects/emotion.png";
import blog from "../../Assets/Projects/blog.png";
import capriole from "../../Assets/Projects/capriole.png";
import sbspune from "../../Assets/Projects/sbspune.png";
import bitsOfCode from "../../Assets/Projects/blog.png";

function Projects() {
  const [githubProjects, setGithubProjects] = useState([]);
  const [githubLoading, setGithubLoading] = useState(false);
  const [githubError, setGithubError] = useState("");

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setGithubLoading(true);
        setGithubError("");
        const username = "PHCoder05";
        const token = process.env.REACT_APP_GITHUB_TOKEN;
        const baseHeaders = {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          "User-Agent": "portfolio-new-app"
        };
        const headers = token
          ? { ...baseHeaders, Authorization: `token ${token}` }
          : baseHeaders;

        if (!token) {
          // Helpful console hint if token was not injected at build-time
          // (Requires dev server restart after setting .env)
          // eslint-disable-next-line no-console
          console.warn("GitHub token not detected in REACT_APP_GITHUB_TOKEN. Using unauthenticated requests (lower rate limits).");
        }

        const safeFetchJson = async (url) => {
          const r = await fetch(url, { headers });
          if (!r.ok) {
            // Surface rate-limit details when present
            if (r.status === 403) {
              const reset = r.headers.get("x-ratelimit-reset");
              const resetDate = reset ? new Date(parseInt(reset, 10) * 1000) : null;
              const msg = resetDate
                ? `GitHub rate limit reached. Try again after ${resetDate.toLocaleTimeString()}.`
                : `GitHub API error: 403 (rate limited).`;
              throw new Error(msg);
            }
            throw new Error(`GitHub API error: ${r.status}`);
          }
          return r.json();
        };

        // Optional: check current rate limit to help debugging tokens
        try {
          const rate = await fetch("https://api.github.com/rate_limit", { headers });
          if (rate.ok) {
            const data = await rate.json();
            const core = data?.resources?.core;
            if (core) {
              // eslint-disable-next-line no-console
              console.log(`GitHub rate remaining: ${core.remaining}/${core.limit}, resets at ${new Date(core.reset * 1000).toLocaleTimeString()}`);
            }
          }
        } catch (_) {
          // ignore
        }

        const reposUrl = token
          ? `https://api.github.com/user/repos?per_page=100&sort=updated&visibility=all&affiliation=owner,collaborator,organization_member`
          : `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;
        const resp = await fetch(reposUrl, { headers });
        if (!resp.ok) throw new Error(`GitHub API error: ${resp.status}`);
        const repos = await resp.json();
        const owned = repos
          .map((r) => ({
            title: r.name,
            description: r.description || "",
            imgPath: blog,
            ghLink: r.html_url,
            demoLink: r.homepage || undefined,
            date: r.pushed_at,
            archived: !!r.archived,
            pushedAt: r.pushed_at,
            commitsLink: `${r.html_url}/commits`,
            commitCount: 0,
            owner: r.owner?.login,
            fullName: r.full_name,
            userCommits: 0,
            isFork: !!r.fork,
          }))
          .sort((a, b) => new Date(b.pushedAt) - new Date(a.pushedAt));

        // Fetch contributed repos via public events (Push/PR/etc.)
        const eventsResp = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`, { headers });
        let contributed = [];
        let recentUserRepoFullNames = new Set();
        if (eventsResp.ok) {
          const events = await eventsResp.json();
          const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
          recentUserRepoFullNames = new Set(
            events
              .filter((e) => {
                const t = new Date(e.created_at).getTime();
                return t >= cutoff;
              })
              .map((e) => e?.repo?.name)
              .filter(Boolean)
          );
          const eventRepoApis = Array.from(
            new Set(
              events
                .map((e) => e?.repo?.url)
                .filter(Boolean)
            )
          ).slice(0, 30); // tighten limit to reduce rate use
          const repoDetails = await Promise.all(
            eventRepoApis.map(async (apiUrl) => {
              try {
                const d = await safeFetchJson(apiUrl);
                if (!d) return null;
                return {
                  title: d.name,
                  description: d.description || "",
                  imgPath: blog,
                  ghLink: d.html_url,
                  demoLink: d.homepage || undefined,
                  date: d.pushed_at,
                  archived: !!d.archived,
                  pushedAt: d.pushed_at,
                  commitsLink: `${d.html_url}/commits`,
                  commitCount: 0,
                  owner: d.owner?.login,
                  fullName: d.full_name,
                  userCommits: 0,
                  isFork: !!d.fork,
                };
              } catch (_) {
                return null;
              }
            })
          );
          contributed = repoDetails.filter(Boolean);
        }

        // Merge owned + contributed by fullName
        const byFullName = new Map();
        [...owned, ...contributed].forEach((p) => {
          if (!byFullName.has(p.fullName)) byFullName.set(p.fullName, p);
        });
        const mapped = Array.from(byFullName.values());

        // Limit to avoid rate limits when fetching contributors
        const limited = mapped.slice(0, 25);

        // Fetch contributors to estimate commit counts
        const sinceIso = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
        const withCommits = await Promise.all(
          limited.map(async (p) => {
            try {
              const owner = p.owner || username;
              const contribs = await safeFetchJson(`https://api.github.com/repos/${owner}/${p.title}/contributors?per_page=100&anon=true`);
              let commitCount = 0;
              let userCommits = 0;
              if (Array.isArray(contribs)) {
                for (const c of contribs) {
                  commitCount += c.contributions || 0;
                  if (c.login && c.login.toLowerCase() === username.toLowerCase()) {
                    userCommits = c.contributions || 0;
                  }
                }
              }
              // Check recent commits by the user in the last 30 days
              let userRecent = false;
              let userRecentCommits = 0;
              try {
                const commits = await safeFetchJson(`https://api.github.com/repos/${owner}/${p.title}/commits?author=${username}&since=${encodeURIComponent(sinceIso)}&per_page=100`);
                userRecent = Array.isArray(commits) && commits.length > 0;
                userRecentCommits = Array.isArray(commits) ? commits.length : 0;
              } catch (_) {
                // ignore per-repo commit errors
              }
              // PRs raised by user (recent window)
              let userPRs = 0;
              try {
                const datePart = sinceIso.split("T")[0];
                const search = await safeFetchJson(`https://api.github.com/search/issues?q=is:pr+author:${username}+repo:${owner}/${p.title}+updated:>=${datePart}`);
                userPRs = search && typeof search.total_count === "number" ? search.total_count : 0;
              } catch (_) {
                // ignore search failures
              }
              return { ...p, commitCount, userCommits, userRecent, userRecentCommits, userPRs };
            } catch (_) {
              return { ...p, commitCount: 0, userCommits: 0, userRecent: false, userRecentCommits: 0, userPRs: 0 };
            }
          })
        );

        // Add status and final sort: Working first, then by commit count desc, then by recent activity
        const now = Date.now();
        const withStatus = withCommits.map((p) => {
          const days = (now - new Date(p.pushedAt).getTime()) / (1000 * 60 * 60 * 24);
          let status = "Completed";
          if (p.archived) status = "Archived";
          else if (p.userRecent) status = "Working";
          else if (recentUserRepoFullNames.has(p.fullName)) status = "Working";
          else if (days <= 30 && p.userCommits > 0) status = "Working";
          return { ...p, status };
        });

        const finalSorted = withStatus.sort((a, b) => {
          const aWork = a.status === "Working" ? 1 : 0;
          const bWork = b.status === "Working" ? 1 : 0;
          if (bWork !== aWork) return bWork - aWork;
          if (b.userCommits !== a.userCommits) return b.userCommits - a.userCommits;
          if (b.commitCount !== a.commitCount) return b.commitCount - a.commitCount;
          return new Date(b.pushedAt) - new Date(a.pushedAt);
        });

        setGithubProjects(finalSorted);
      } catch (e) {
        setGithubError(e.message || "Failed to fetch GitHub repositories.");
      } finally {
        setGithubLoading(false);
      }
    };
    fetchRepos();
  }, []);
  const projects = [
    {
      title: "KOEL WhatsApp Management System",
      description: "WhatsApp-based ticketing and customer interaction management for KOEL, with automated routing and dashboards.",
      imgPath: blog,
      ghLink: "https://github.com/PHCoder05/UltraChatAI-Frontend",
      demoLink: undefined,
      date: "2025-09-01"
    },
    {
      title: "TruSkill",
      description: "A skills assessment and tracking platform to evaluate, visualize, and improve competencies across teams.",
      imgPath: blog,
      ghLink: "#",
      demoLink: undefined,
      date: "2025-08-15"
    },
    {
      title: "Splaon",
      description: "A modern web solution (details coming soon). Built with a focus on performance and clean UX.",
      imgPath: blog,
      ghLink: "#",
      demoLink: undefined,
      date: "2025-07-20"
    },
    {
      title: "Hemkanti",
      description: "A brand presence and e‑commerce ready site for Hemkanti (details coming soon).",
      imgPath: blog,
      ghLink: "#",
      demoLink: undefined,
      date: "2025-06-10"
    },
    {
      title: "My First Website",
      description: " My personal portfolio website, my first project, is now live! Hosted using GitHub Pages, it showcases my skills, projects, and achievements. Check it out to learn more about me and my journey!.",
      imgPath: bitsOfCode,
      ghLink: "https://github.com/PHCoder05/My-Portfolio",
      demoLink: "https://phcoder05.github.io/My-Portfolio/",
      date: "2024-03-01"
    },
    {
      title: "BlogSpot",
      description: "Welcome to my blog, where I share insights, tips, and updates on web development, coding, and technology. Whether you're a beginner or an experienced developer, you'll find content designed to inspire, educate, and keep you updated on the latest trends and best practices in the tech world.",
      imgPath: blog,
      ghLink: "https://github.com/PHCoder05/BlogSpot",
      demoLink: "https://blog-phcoder05.vercel.app/",
      date: "2024-05-15"
    },
    {
      title: "Face Recognition Based Attendance System",
      description: "The Facial Recognition Based Attendance System uses advanced technology to quickly and accurately track student attendance. It captures and analyzes facial features, matches them with stored student images, and records attendance automatically. It's user-friendly, secure, and scalable for implementation in educational institutions.",
      imgPath: emotion,
      ghLink: "https://github.com/PHCoder05/Face-Recognition-Base-Attedance-System",
      demoLink: "YOUR_DEMO_LINK_HERE",
      date: "2024-02-10"
    },
    {
      title: "Markyway",
      description: "This is a social media marketing website. I started as an intern and was later hired as a Website Administrator. I developed and now maintain the website part-time.",
      imgPath: maryway,
      ghLink: "https://github.com/PHCoder05/Markyway",
      demoLink: "https://markyway.netlify.app/",
      date: "2023-11-05"
    },
    {
      title: "Capriole Sport Tech",
      description: "Capriole is committed to bridging the gap between athletes and the best sports venues. We provide a seamless experience for booking venues and managing sports academies with ease and efficiency. ",
      imgPath: blog,
      ghLink: "https://github.com/PHCoder05/Sport-Tech",
      demoLink: "https://www.capriolesportstech.com/",
      date: "2023-09-12"
    },
    {
      title: "sbspune",
      description: "Sky Blue Stationery, founded in 2011, provides high-quality office supplies, stationery, housekeeping materials, and computer consumables. We cater to the needs of businesses, educators, and home offices, ensuring every workspace is efficient, organized, and inspiring. ",
      imgPath: sbspune,
      ghLink: "https://github.com/PHCoder05/sbspune",
      demoLink: "https://www.sbspune.com/",
      date: "2023-06-01"
    }
  ];

  const sorted = [...projects].sort((a, b) => new Date(b.date) - new Date(a.date));
  const latest = sorted.slice(0, 4);
  const earlier = sorted.slice(4);

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>

        {githubProjects && githubProjects.some((p) => p.status === "Working") && (
          <>
            <h3 className="project-subheading" style={{ color: "#bbb", marginTop: 10 }}>Currently Working</h3>
            <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
              {githubProjects
                .filter((p) => p.status === "Working")
                .map((p) => (
                  <Col key={`work-${p.title}`} md={4} className="project-card">
                    <ProjectCard
                      imgPath={p.imgPath}
                      isBlog={false}
                      title={p.title}
                      description={p.description}
                      ghLink={p.ghLink}
                      demoLink={p.demoLink}
                      date={p.date}
                      status={p.status}
                      commitsLink={p.commitsLink}
                    />
                  </Col>
                ))}
            </Row>
          </>
        )}

        <h3 className="project-subheading" style={{ color: "#bbb", marginTop: 10 }}>GitHub Projects (auto)</h3>
        <div
          style={{
            color: "#e2e8f0",
            fontSize: 14,
            margin: "12px auto 20px",
            padding: "16px 20px",
            background: "linear-gradient(135deg, rgba(100, 255, 218, 0.15), rgba(199, 112, 240, 0.15))",
            border: "1px solid rgba(100, 255, 218, 0.5)",
            borderRadius: 16,
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            maxWidth: "800px",
            textAlign: "left"
          }}
        >
          <div style={{ 
            width: 6, 
            height: 6, 
            background: "var(--imp-text-color)", 
            borderRadius: "50%",
            flexShrink: 0,
            boxShadow: "0 0 8px rgba(199, 112, 240, 0.6)"
          }}></div>
          <div>
            <strong style={{ color: "var(--imp-text-color)", fontSize: "15px" }}>Note:</strong> Some repositories are private. Commit and PR activity may be hidden unless authenticated with access.
          </div>
        </div>
        {githubError && (
          <div style={{ 
            color: "#ff8080", 
            marginBottom: 10,
            padding: "8px 12px",
            background: "rgba(255, 128, 128, 0.1)",
            border: "1px solid rgba(255, 128, 128, 0.3)",
            borderRadius: 8
          }}>{githubError}</div>
        )}
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {githubLoading && (
            <Col xs={12} style={{ textAlign: "center" }}>
              <div style={{ 
                color: "#9aa0a6", 
                padding: "30px 20px",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px"
              }}>
                <div style={{ 
                  width: "24px",
                  height: "24px",
                  border: "3px solid #9aa0a6",
                  borderTop: "3px solid var(--highlight-color)",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite"
                }}></div>
                <span>Loading GitHub projects…</span>
              </div>
            </Col>
          )}
          {!githubLoading && githubProjects.map((p) => (
            <Col key={`gh-${p.title}`} md={4} className="project-card">
              <ProjectCard
                imgPath={p.imgPath}
                isBlog={false}
                title={p.title}
                description={p.description}
                ghLink={p.ghLink}
                demoLink={p.demoLink}
                date={p.date}
                status={p.status}
                commitsLink={p.commitsLink}
                prsLink={`${p.ghLink}/pulls`}
                userRecentCommits={p.userRecentCommits}
                userPRs={p.userPRs}
              />
            </Col>
          ))}
        </Row>
        <h3 className="project-subheading" style={{ color: "#bbb", marginTop: 10 }}>Latest Projects</h3>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {latest.map((p) => (
            <Col key={p.title} md={4} className="project-card">
              <ProjectCard
                imgPath={p.imgPath}
                isBlog={false}
                title={p.title}
                description={p.description}
                ghLink={p.ghLink}
                demoLink={p.demoLink}
                date={p.date}
              />
            </Col>
          ))}
        </Row>

        <h3 className="project-subheading" style={{ color: "#bbb", marginTop: 20 }}>Earlier Projects</h3>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {earlier.map((p) => (
            <Col key={p.title} md={4} className="project-card">
              <ProjectCard
                imgPath={p.imgPath}
                isBlog={false}
                title={p.title}
                description={p.description}
                ghLink={p.ghLink}
                demoLink={p.demoLink}
                date={p.date}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
