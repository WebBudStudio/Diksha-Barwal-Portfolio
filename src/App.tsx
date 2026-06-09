import { useEffect, useRef, useState } from "react";

const NAME = "Diksha Barwal";
const INITIALS = "AB";
const DEGREE = "[B.E./BCA — Your College, Pune]";

const PHRASES = ["Frontend Developer", "UI Enthusiast", "Available for Hire"];

const SKILLS = [
  { name: "HTML5", icon: "🌐" },
  { name: "CSS3", icon: "🎨" },
  { name: "JavaScript", icon: "⚡" },
  { name: "React.js", icon: "⚛️" },
  { name: "Git / GitHub", icon: "🔀" },
  { name: "VS Code", icon: "💻" },
  { name: "Figma", icon: "🎯" },
  { name: "Tailwind CSS", icon: "🌪️" },
  { name: "SASS", icon: "💅" },
  { name: "Node.js", icon: "🟢" },
  { name: "Responsive", icon: "📱" },
  { name: "REST APIs", icon: "🔗" },
];

const SKILL_BARS = [
  { name: "HTML / CSS", pct: 90 },
  { name: "JavaScript", pct: 75 },
  { name: "React.js", pct: 65 },
  { name: "UI Design", pct: 70 },
];

type Project = {
  title: string;
  desc: string;
  tags: string[];
  cat: "Frontend" | "UI Clone" | "Freelance";
  featured?: boolean;
  live?: string;
  github?: string;
};

const PROJECTS: Project[] = [
  {
    title: "Portfolio Website",
    desc: "The very site you're viewing. Built from scratch as a showcase of clean HTML, CSS & JavaScript — glassmorphism, custom cursor, typewriter effect, scroll progress, all hand-coded.",
    tags: ["HTML", "CSS", "JavaScript"],
    cat: "Frontend",
    featured: true,
    live: "#",
    github: "#",
  },
  {
    title: "Pune Cafe Landing Page",
    desc: "A high-converting landing page for a local Pune cafe — hero, menu, testimonials, online order CTA. Fully responsive and performance-optimized.",
    tags: ["HTML", "CSS", "JS"],
    cat: "Freelance",
    live: "#",
    github: "#",
  },
  {
    title: "E-commerce Product Page",
    desc: "A pixel-perfect product detail page UI clone — image gallery, variant selector, reviews section, and add-to-cart micro-interactions.",
    tags: ["React", "CSS"],
    cat: "UI Clone",
    live: "#",
    github: "#",
  },
  {
    title: "Weather Dashboard",
    desc: "A JavaScript mini-app that fetches real-time weather data from a public API, with location search, 5-day forecast, and smooth loading states.",
    tags: ["JavaScript", "API", "CSS"],
    cat: "Frontend",
    live: "#",
    github: "#",
  },
];

const FILTERS = ["All", "Frontend", "UI Clone", "Freelance"] as const;

const TIMELINE = [
  {
    date: "2022 — Present",
    title: DEGREE,
    desc: "Pursuing Computer Science with a sharp focus on web technologies, UI engineering, and modern frontend tooling.",
    tag: "Education",
  },
  {
    date: "2023 — Present",
    title: "Personal Projects & Open Source",
    desc: "Built 10+ frontend projects, actively contributing to GitHub, self-teaching React, TypeScript & modern design systems.",
    tag: "Projects",
  },
  {
    date: "2024",
    title: "First Freelance Client",
    desc: "Delivered a landing page for a local Pune business — first paid project, first 5-star review, first real-world deadline met.",
    tag: "Freelance",
  },
  {
    date: "2022",
    title: "Started Coding Journey",
    desc: "Discovered frontend development, fell down the CSS rabbit hole, and never looked back. Built my first webpage and was hooked.",
    tag: "Milestone",
  },
];

const SERVICES = [
  {
    icon: "🌐",
    title: "Landing Pages",
    desc: "High-converting landing pages for local businesses, startups, and personal brands — fast, responsive, SEO-ready.",
    price: "Starting ₹5,000",
  },
  {
    icon: "🎨",
    title: "UI Development",
    desc: "Pixel-perfect implementation of Figma or design files into clean, maintainable HTML/CSS/JS that looks identical to the mockup.",
    price: "Starting ₹3,000",
  },
  {
    icon: "⚡",
    title: "Website Redesign",
    desc: "Transform outdated, slow websites into modern, mobile-first experiences that actually convert visitors into customers.",
    price: "Starting ₹4,000",
  },
];

export default function App() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [formSent, setFormSent] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  // Page load fade in
  useEffect(() => {
    document.body.style.opacity = "0";
    const raf = requestAnimationFrame(() => {
      document.body.style.transition = "opacity .5s ease";
      document.body.style.opacity = "1";
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Custom cursor
  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;
    const move = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };
    const animate = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }
      requestAnimationFrame(animate);
    };
    window.addEventListener("mousemove", move);
    const raf = requestAnimationFrame(animate);

    const handleOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, [data-cursor='hover']");
      const card = t.closest("[data-cursor='card']");
      if (ringRef.current) {
        ringRef.current.classList.toggle("hover", !!interactive && !card);
        ringRef.current.classList.toggle("card-hover", !!card);
      }
    };
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", () => {
      if (ringRef.current) ringRef.current.classList.remove("hover", "card-hover");
    });

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Scroll progress + back to top
  useEffect(() => {
    const btt = document.getElementById("back-to-top");
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? (window.scrollY / h) * 100 : 0;
      if (progressRef.current) progressRef.current.style.width = p + "%";
      if (btt) btt.classList.toggle("show", window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Typing effect
  const [typed, setTyped] = useState("");
  useEffect(() => {
    let phrase = 0, char = 0, deleting = false;
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      const current = PHRASES[phrase];
      if (!deleting) {
        char++;
        setTyped(current.slice(0, char));
        if (char === current.length) {
          deleting = true;
          timeout = setTimeout(tick, 2000);
          return;
        }
        timeout = setTimeout(tick, 100);
      } else {
        char--;
        setTyped(current.slice(0, char));
        if (char === 0) {
          deleting = false;
          phrase = (phrase + 1) % PHRASES.length;
        }
        timeout = setTimeout(tick, 50);
      }
    };
    timeout = setTimeout(tick, 1000);
    return () => clearTimeout(timeout);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [filter]);

  // Skill bars animate when visible
  useEffect(() => {
    const section = document.getElementById("skills");
    if (!section) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            document.querySelectorAll<HTMLElement>(".skill-bar-fill").forEach((el) => {
              const p = el.dataset.pct || "0";
              el.style.width = p + "%";
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(section);
  }, []);

  // Active nav section
  useEffect(() => {
    const ids = ["about", "skills", "projects", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"));
            const link = document.querySelector(`.nav-link[data-target="${e.target.id}"]`);
            if (link) link.classList.add("active");
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const filtered =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter);

  const featured = filtered.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 3500);
  };

  const githubIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 .5C5.6.5.5 5.6.5 12a11.5 11.5 0 008 11c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 016 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1 .8 2.2v3.2c0 .3.2.7.8.6a11.5 11.5 0 008-11C23.5 5.6 18.4.5 12 .5z"/></svg>
  );
  const linkedinIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.4 3H3.6C3.3 3 3 3.3 3 3.6v16.8c0 .3.3.6.6.6h16.8c.3 0 .6-.3.6-.6V3.6c0-.3-.3-.6-.6-.6zM8.3 18H5.8V9.7h2.5V18zM7 8.6c-.8 0-1.5-.7-1.5-1.5S6.2 5.6 7 5.6s1.5.7 1.5 1.5S7.8 8.6 7 8.6zM18.5 18h-2.5v-4.3c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2V18h-2.5V9.7H13v1.1h.1c.3-.6 1.2-1.4 2.5-1.4 2.7 0 3.2 1.8 3.2 4.1V18z"/></svg>
  );
  const twitterIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  );
  const mailIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
  );
  const arrowIcon = <span>→</span>;
  const extIcon = <span style={{ fontSize: 18 }}>↗</span>;

  const renderContribCells = () => {
    const cells = [];
    for (let w = 0; w < 52; w++) {
      for (let d = 0; d < 7; d++) {
        const r = Math.random();
        let lvl = "";
        if (r > 0.55) lvl = "l1";
        if (r > 0.75) lvl = "l2";
        if (r > 0.88) lvl = "l3";
        if (r > 0.96) lvl = "l4";
        cells.push(<div key={`${w}-${d}`} className={`contrib-cell ${lvl}`} />);
      }
    }
    return cells;
  };

  return (
    <>
      <div id="scroll-progress" ref={progressRef} />
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />

      {/* NAV */}
      <nav className="nav-wrap">
        <div className="nav-inner">
          <a href="#hero" className="logo" aria-label="Home">{INITIALS}</a>
          <div className="nav-links">
            <a href="#about" className="nav-link" data-target="about">About</a>
            <a href="#skills" className="nav-link" data-target="skills">Skills</a>
            <a href="#projects" className="nav-link" data-target="projects">Projects</a>
            <a href="#contact" className="nav-link" data-target="contact">Contact</a>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a href="#contact" className="btn-outline-green nav-cta-desktop">Hire Me</a>
            <button
              className={`hamburger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button className="hamburger open mobile-close" onClick={closeMenu} aria-label="Close">
          <span /><span /><span />
        </button>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#skills" onClick={closeMenu}>Skills</a>
        <a href="#projects" onClick={closeMenu}>Work</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
        <a href="#contact" className="btn-primary" onClick={closeMenu}>Hire Me</a>
      </div>

      {/* HERO */}
      <section id="hero" className="hero">
        <div className="hero-brackets">{`{ }`}</div>
        <div className="hero-content">
          <div className="hero-greeting">Hello World</div>
          <div className="hero-hi">Hi, I'm</div>
          <h1 className="hero-name">{NAME}</h1>
          <div className="hero-typing">
            <span>{typed}</span>
          </div>
          <p className="hero-desc">
            A frontend developer based in Pune who builds clean, fast, and visually impressive web experiences.
            Open to full-time roles and freelance projects.
          </p>
          <div className="hero-ctas">
            <a href="#projects" className="btn-primary">View My Work {arrowIcon}</a>
            <a href="#" className="btn-outline">⬇ Download CV</a>
            <a href="#contact" className="link-arrow">Let's Talk →</a>
          </div>
          <div className="hero-socials">
            <a className="social-btn" href="#" aria-label="GitHub">{githubIcon}</a>
            <a className="social-btn" href="#" aria-label="LinkedIn">{linkedinIcon}</a>
            <a className="social-btn" href="#" aria-label="Twitter">{twitterIcon}</a>
            <a className="social-btn" href="mailto:hello@example.com" aria-label="Email">{mailIcon}</a>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>scroll to explore</span>
          <span className="scroll-arrow">↓</span>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="reveal">
          <div className="sec-num">// 01</div>
          <div className="sec-label">ABOUT ME</div>
          <h2 className="sec-title">The Developer <br style={{ display: "none" }} />Behind The Code</h2>
        </div>
        <div className="about-grid">
          <div className="about-left reveal">
            <div className="profile-img" aria-label="Profile photo">{INITIALS}</div>
            <span className="badge-pill"><span className="pulse-dot" /> Available for Work</span>
            <div className="about-socials">
              <a className="social-btn" href="#" aria-label="GitHub">{githubIcon}</a>
              <a className="social-btn" href="#" aria-label="LinkedIn">{linkedinIcon}</a>
              <a className="social-btn" href="mailto:hello@example.com" aria-label="Email">{mailIcon}</a>
            </div>
          </div>
          <div className="about-right reveal">
            <p>
              I'm a frontend web developer based in Pune, Maharashtra, with a sharp focus on building
              interfaces that feel as good as they look. I started coding with pure curiosity and quickly
              fell in love with the craft — the way a few lines of CSS can turn a blank page into something
              people actually want to use.
            </p>
            <p>
              What drives me is simple: clean code, sharp design, and pixel-perfect execution.
              I care deeply about typography, spacing, performance and the tiny details that separate
              an average site from a memorable one. Every project is a chance to level up.
            </p>
            <p>
              Right now I'm actively looking for <strong style={{ color: "var(--accent)" }}>full-time frontend roles</strong> at Pune or remote teams,
              and I'm also taking on <strong style={{ color: "var(--accent)" }}>freelance projects</strong> for local businesses and startups
              who need a modern, fast website that actually works.
            </p>
            <div className="fact-chips">
              <span className="chip">📍 Pune, Maharashtra</span>
              <span className="chip">🎓 {DEGREE}</span>
              <span className="chip">💼 Open to Work</span>
              <span className="chip">🌐 Available Remotely</span>
            </div>
            <a href="#" className="btn-primary">⬇ Download Resume</a>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="skills-section">
        <div className="skills-inner">
          <div className="reveal">
            <div className="sec-num">// 02</div>
            <div className="sec-label">TECH STACK</div>
            <h2 className="sec-title">My Tech Stack</h2>
            <p style={{ color: "var(--muted)", marginBottom: 36, marginTop: -24 }}>Tools and technologies I work with</p>
          </div>
          <div className="skills-grid reveal">
            {SKILLS.map((s) => (
              <div key={s.name} className="skill-card" data-cursor="card">
                <div className="skill-icon">{s.icon}</div>
                <div className="skill-name">{s.name}</div>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ marginBottom: 40 }}>
            <h3 style={{ fontFamily: "Space Grotesk", fontSize: 22, color: "var(--text)", marginBottom: 24 }}>
              Core Competency
            </h3>
            <div className="skill-bars">
              {SKILL_BARS.map((s) => (
                <div key={s.name} className="skill-bar-row">
                  <div className="skill-bar-head">
                    <span className="skill-bar-name">{s.name}</span>
                    <span className="skill-bar-pct">{s.pct}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill" data-pct={s.pct} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="learning-strip reveal">
            <span className="learning-label">⚡ Currently Learning:</span>
            <div className="learning-tags">
              <span className="tag">React.js</span>
              <span className="tag">TypeScript</span>
              <span className="tag">Next.js</span>
              <span className="tag">Framer Motion</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="reveal">
          <div className="sec-num">// 03</div>
          <div className="sec-label">SELECTED WORK</div>
          <h2 className="sec-title">Things I've Built</h2>
        </div>

        <div className="filter-tabs reveal">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-tab ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {featured && (
          <div className="featured-project reveal" data-cursor="card">
            <div className="project-mock">
              <div className="browser-bar"><span /><span /><span /></div>
              <div className="mock-body" />
            </div>
            <div className="featured-info">
              <span className="pill-green">FEATURED PROJECT</span>
              <h3>{featured.title}</h3>
              <p>{featured.desc}</p>
              <div className="featured-tags">
                {featured.tags.map((t) => (
                  <span key={t} className="feat-tag">{t}</span>
                ))}
              </div>
              <div className="feat-links">
                <a href={featured.live} className="link-arrow">Live Demo {extIcon}</a>
                <a href={featured.github} className="btn-outline-green" style={{ padding: "8px 16px", fontSize: 13 }}>
                  GitHub →
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="projects-grid">
          {rest.map((p) => (
            <div key={p.title} className="glass-card project-card reveal" data-cursor="card">
              <div className="project-card-top">
                <span className="folder-icon" style={{ fontSize: 32 }}>📁</span>
                <div className="project-links">
                  <a href={p.github} aria-label="GitHub">{githubIcon}</a>
                  <a href={p.live} aria-label="Live">{extIcon}</a>
                </div>
              </div>
              <div className="project-title">{p.title}</div>
              <p className="project-desc">{p.desc}</p>
              <div className="project-tags">
                {p.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="github-cta reveal">
          <a href="#" className="btn-outline-green">
            {githubIcon} See more on GitHub →
          </a>
        </div>
      </section>

      {/* TIMELINE */}
      <section id="journey" style={{ background: "var(--surface)", maxWidth: "none", paddingLeft: 0, paddingRight: 0 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
          <div className="reveal">
            <div className="sec-num">// 04</div>
            <div className="sec-label">MY JOURNEY</div>
            <h2 className="sec-title">My Journey</h2>
          </div>
          <div className="timeline">
            {TIMELINE.map((t, i) => (
              <div className="tl-entry reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="tl-dot" />
                <div className="tl-card" data-cursor="card">
                  <div className="tl-date">{t.date}</div>
                  <div className="tl-title">{t.title}</div>
                  <div className="tl-desc">{t.desc}</div>
                  <span className="tl-tag">{t.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <div className="reveal">
          <div className="sec-num">// 05</div>
          <div className="sec-label">FREELANCE SERVICES</div>
          <h2 className="sec-title">What I Can Build For You</h2>
          <p className="services-sub">Available for freelance projects in <strong>Pune</strong> and <strong>remotely</strong>.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div key={s.title} className="service-card reveal" data-cursor="card" style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className="service-icon">{s.icon}</div>
              <div className="service-title">{s.title}</div>
              <p className="service-desc">{s.desc}</p>
              <div className="service-price">{s.price}</div>
              <a href="#contact" className="link-arrow">Let's Discuss →</a>
            </div>
          ))}
        </div>
        <p className="services-cta reveal">
          Need something custom? <a href="#contact">Let's talk →</a>
        </p>
      </section>

      {/* GITHUB STATS */}
      <section className="stats-section">
        <div className="stats-inner">
          <div className="reveal">
            <div className="sec-label">OPEN SOURCE ACTIVITY</div>
            <h2 className="sec-title">Code I've Shipped</h2>
          </div>
          <div className="stats-grid reveal">
            <div className="stat-box" data-cursor="card">
              <div className="stat-num">15+</div>
              <div className="stat-label">Public Repos</div>
            </div>
            <div className="stat-box" data-cursor="card">
              <div className="stat-num">120+</div>
              <div className="stat-label">GitHub Stars</div>
            </div>
            <div className="stat-box" data-cursor="card">
              <div className="stat-num">480+</div>
              <div className="stat-label">Commits This Year</div>
            </div>
            <div className="stat-box" data-cursor="card">
              <div className="stat-num">8</div>
              <div className="stat-label">Projects Live</div>
            </div>
          </div>
          <div className="contrib-graph reveal">
            <h4>// contribution activity — last year</h4>
            <div className="contrib-grid">{renderContribCells()}</div>
          </div>
          <div style={{ textAlign: "center" }} className="reveal">
            <a href="#" className="btn-outline-green">Follow on GitHub →</a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="reveal">
          <div className="sec-num">// 06</div>
          <div className="sec-label">GET IN TOUCH</div>
          <h2 className="sec-title">Let's Build <br style={{ display: "none" }} />Something Together</h2>
          <p style={{ color: "var(--muted)", marginTop: -24, marginBottom: 50, maxWidth: 600 }}>
            Whether you're a recruiter, a startup, or a local business — I'd love to hear from you.
          </p>
        </div>
        <div className="contact-grid">
          <div className="contact-left reveal">
            <h3>Contact Info</h3>
            <div className="contact-item">
              <div className="contact-label">Email</div>
              <a href="mailto:hello@example.com" className="contact-value">hello@example.com</a>
            </div>
            <div className="contact-item">
              <div className="contact-label">Location</div>
              <span className="contact-value">📍 Pune, Maharashtra</span>
            </div>
            <div className="contact-item">
              <div className="contact-label">Open To</div>
              <div className="available-list">
                <span>Full-time</span>
                <span>Internship</span>
                <span>Freelance</span>
              </div>
            </div>
            <div className="resp-note">⚡ Usually replies within 24 hours</div>

            <a
              className="wa-btn"
              href="https://wa.me/910000000000?text=Hi%20there%2C%20I%27m%20interested%20in%20working%20with%20you%20on%20a%20web%20project."
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 WhatsApp Me
            </a>

            <div className="about-socials" style={{ justifyContent: "flex-start", marginTop: 28 }}>
              <a className="social-btn" href="#" aria-label="GitHub">{githubIcon}</a>
              <a className="social-btn" href="#" aria-label="LinkedIn">{linkedinIcon}</a>
              <a className="social-btn" href="#" aria-label="Twitter">{twitterIcon}</a>
              <a className="social-btn" href="mailto:hello@example.com" aria-label="Email">{mailIcon}</a>
            </div>
          </div>

          <form onSubmit={handleForm} className="reveal">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input id="name" name="name" type="text" required placeholder="John Doe" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input id="email" name="email" type="email" required placeholder="john@company.com" />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select id="subject" name="subject" defaultValue="Job Opportunity">
                <option>Job Opportunity</option>
                <option>Freelance Project</option>
                <option>Collaboration</option>
                <option>Just Saying Hi 👋</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea id="message" name="message" rows={5} required placeholder="Tell me about your project..." />
            </div>
            <button type="submit" className={`form-submit ${formSent ? "sent" : ""}`}>
              {formSent ? "✓ Message Sent!" : "Send Message →"}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-logo">
            <span className="mono">{INITIALS}</span> {NAME}
          </div>
          <div className="footer-tagline">// building the web, one line at a time</div>
          <div className="footer-socials">
            <a className="social-btn" href="#" aria-label="GitHub">{githubIcon}</a>
            <a className="social-btn" href="#" aria-label="LinkedIn">{linkedinIcon}</a>
            <a className="social-btn" href="#" aria-label="Twitter">{twitterIcon}</a>
            <a className="social-btn" href="mailto:hello@example.com" aria-label="Email">{mailIcon}</a>
          </div>
          <div className="footer-bottom">
            <span>© 2025 {NAME}. Built with HTML, CSS & JS.</span>
            <span className="easter-egg">Made with ☕ in Pune</span>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      <a id="back-to-top" href="#hero" aria-label="Back to top">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15"/></svg>
      </a>

      {/* WhatsApp float */}
      <a
        id="wa-float"
        href="https://wa.me/910000000000?text=Hi%20there%2C%20I%27d%20like%20to%20discuss%20a%20project."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.8-.9-2-1s-.5-.2-.7.1-.8 1-1 1.2-.4.2-.6 0c-.7-.4-1.4-.8-2-1.4-.5-.5-.9-1.1-1.2-1.7-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5s0-.3 0-.5-.7-1.7-.9-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.5 1 2.9 1.2 3c.2.3 2.1 3.2 5 4.4 2.3.9 2.7.7 3.2.7.5 0 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.3-.5-.4M12 2.1C6.5 2.1 2 6.6 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.4.8 3.1 1.2 4.9 1.2 5.5 0 9.9-4.5 9.9-9.9S17.5 2.1 12 2.1z"/></svg>
      </a>
    </>
  );
}
