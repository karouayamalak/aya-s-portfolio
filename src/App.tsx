import { useEffect, useRef, useState } from 'react';
import './index.css';

/* =============================================
   DATA TYPES
   ============================================= */
interface MediaItem {
  type: 'image' | 'video';
  src: string;
}

interface Project {
  name: string;
  img: string;
  coverImg?: string;
  year: string;
  type?: string;
  role: string;
  stack: string[];
  about?: string;
  collaborators?: { label: string; url: string }[];
  recognition?: string;
  visitUrl?: string;
  githubUrl?: string;
  media?: MediaItem[];
  nextProject?: string;
}

/* =============================================
   PROJECTS DATA
   ============================================= */
const projects: Project[] = [
  {
    name: 'Thazdayth',
    img: '/thazdaythbackground.jpg',
    coverImg: '/thazdaythbackground.jpg',
    year: '2026',
    type: 'Web Application / Collaborative Platform',
    role: 'Team Leader & Frontend Developer',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Git'],
    about: 'My first full frontend project — and a 2CP academic project built at ESTIN, where I led the team. A collaborative web platform designed to unite and connect student resources, featuring an interactive interface, modern design patterns, and a focus on clean user experiences.',
    collaborators: [{ label: 'ESTIN 2CP Team', url: 'https://github.com/prj-2cp' }],
    visitUrl: 'https://thazdayth.vercel.app',
    githubUrl: 'https://github.com/prj-2cp/thazdayth.git',
    media: [
      { type: 'video', src: '/thazdayth-record.mp4' },
      { type: 'image', src: '/Screenshot 2026-05-22 234317.png' },
    ],
    nextProject: 'Veto Care'
  },
  {
    name: 'Veto Care',
    img: '/veto-care-background.jpg',
    coverImg: '/description-veto-care-page.jpg',
    year: '2026',
    type: 'Information System / Veterinary Platform',
    role: 'Full-Stack Developer',
    stack: ['React', 'TypeScript', 'Supabase', 'CSS', 'Vite', 'Git'],
    about: 'An information system project designed for veterinary clinics and pet care management. Built using React and TypeScript on the frontend, with Supabase powering the database and backend services to ensure secure, real-time data handling.',
    visitUrl: 'https://veto-care-2f5d.vercel.app',
    githubUrl: 'https://github.com/estinaya2024/Veto-care.git',
    media: [
      { type: 'video', src: '/vetocare-record.mp4' },
      { type: 'image', src: '/description-veto-care-page.jpg' },
    ],
    nextProject: 'Focusly'
  },
  {
    name: 'Focusly',
    img: '/focusly-background.jpg',
    coverImg: '/descriptive-focusly.png',
    year: '2026',
    type: 'Productivity & Focus Application',
    role: 'Frontend Developer',
    stack: ['HTML', 'CSS', 'JavaScript', 'Vite', 'Git'],
    about: 'A productivity-oriented web platform designed to help users achieve their daily targets. It combines a robust, interactive Todo list with an integrated selection of ambient focus sounds to enhance deep work and minimize distraction.',
    visitUrl: 'https://focusly-mnw4-ten.vercel.app/',
    githubUrl: 'https://github.com/estinaya2024/focusly.git',
    media: [
      { type: 'image', src: '/focuslyproject.png' },
      { type: 'image', src: '/descriptive-focusly.png' },
    ],
    nextProject: 'Duxel'
  },
  {
    name: 'Duxel',
    img: '/duxel-background.png',
    coverImg: '/duxel-discription.png',
    year: '2026',
    type: 'Color Palette Tool & Design System Generator',
    role: 'Frontend Developer',
    stack: ['React', 'TypeScript', 'Framer Motion', 'Chroma.js', 'Vite'],
    about: 'A color palette tool built for generating and exploring design themes. You can upload any image to extract dominant colors and map them to design roles (primary, secondary, accent, etc.), or search by color name, hex, RGB, or CMYK. Features live previews across 4 mockup layouts (landing page, dashboard, mobile app, and product grid), alongside a dark mode generator, undo/redo history, palette saving, and exporting as CSS, JSON, or SVG.',
    visitUrl: 'https://duxel-j374.vercel.app',
    githubUrl: 'https://github.com/estinaya2024/Duxel.git',
    media: [
      { type: 'video', src: '/Duxel-record.mp4' },
      { type: 'image', src: '/duxel-discription.png' },
    ],
    nextProject: 'Thazdayth'
  }
];

const marqueeProjects = [...projects, ...projects, ...projects];

/* =============================================
   HELPER VIDEO COMPONENT
   ============================================= */
function CaseVideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const manualPause = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    manualPause.current = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!manualPause.current) {
            video.play().catch((err) => {
              console.log('Auto-play prevented:', err);
            });
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);

    const handlePause = () => {
      if (videoRef.current) {
        const rect = videoRef.current.getBoundingClientRect();
        if (rect.top >= -rect.height && rect.bottom <= window.innerHeight + rect.height) {
          manualPause.current = true;
        }
      }
    };

    const handlePlay = () => {
      manualPause.current = false;
    };

    video.addEventListener('pause', handlePause);
    video.addEventListener('play', handlePlay);

    return () => {
      observer.disconnect();
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('play', handlePlay);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      loop
      muted
      playsInline
      controls
      className="case-media-asset"
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
}

/* =============================================
   SCROLL-REVEAL MEDIA FIGURE (jobenetuk-style)
   ============================================= */
function CaseMediaFigure({ item }: { item: MediaItem }) {
  const figRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = figRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('case-media-revealed');
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <figure ref={figRef} className="case-media-item">
      {item.type === 'video' ? (
        <CaseVideoPlayer src={item.src} />
      ) : (
        <img src={item.src} alt="" className="case-media-asset" draggable={false} />
      )}
    </figure>
  );
}

/* =============================================
   MAIN APP COMPONENT
   ============================================= */
function App() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [time, setTime] = useState('');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date()
          .toLocaleTimeString('en-US', {
            timeZone: 'Africa/Algiers',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })
          .replace(/\s+/g, '')
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);



  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const mousePos = useRef({ x: -1000, y: -1000 });
  const timeRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (showAbout || showContact || showDetail) return;

    let frameId: number;
    const updateSpotlights = () => {
      const { x, y } = mousePos.current;
      timeRef.current += 0.035;

      const dx = Math.sin(timeRef.current * 0.4) * 80;
      const dy = Math.cos(timeRef.current * 0.3) * 80;

      document.querySelectorAll('.panel-strip').forEach((el) => {
        const htmlEl = el as HTMLElement;
        const rect = htmlEl.getBoundingClientRect();
        const relativeX = x - rect.left;
        const relativeY = y - rect.top;

        htmlEl.style.setProperty('--mouse-x', `${relativeX}px`);
        htmlEl.style.setProperty('--mouse-y', `${relativeY}px`);

        const offsetEl = htmlEl.querySelector('.spotlight-noise-offset');
        if (offsetEl) {
          offsetEl.setAttribute('dx', String(dx));
          offsetEl.setAttribute('dy', String(dy));
        }

        const groupEl = htmlEl.querySelector('.spotlight-group');
        if (groupEl) {
          groupEl.setAttribute('transform', `translate(${relativeX}, ${relativeY})`);
        }
      });

      frameId = requestAnimationFrame(updateSpotlights);
    };

    frameId = requestAnimationFrame(updateSpotlights);
    return () => cancelAnimationFrame(frameId);
  }, [showAbout, showContact, showDetail]);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let currentPos = 0;
    let velocity = 0;
    let isDragging = false;
    let startX = 0;
    let startScrollPos = 0;
    let rAFId: number;

    const getOneThirdWidth = () => marquee.scrollWidth / 3;

    const animateMarquee = () => {
      if (!isDragging) {
        currentPos += -0.8 + velocity;
        velocity *= 0.92;

        const oneThird = getOneThirdWidth();
        if (currentPos < -oneThird) {
          currentPos += oneThird;
        }
        if (currentPos > 0) {
          currentPos -= oneThird;
        }
      }

      marquee.style.transform = `translate3d(${currentPos}px, 0, 0)`;
      rAFId = requestAnimationFrame(animateMarquee);
    };

    rAFId = requestAnimationFrame(animateMarquee);

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.pageX;
      startScrollPos = currentPos;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        currentPos = startScrollPos + (e.pageX - startX);
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      if (!showAbout && !showContact && !showDetail) {
        velocity += e.deltaY * 0.06;
      }
    };

    marquee.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      cancelAnimationFrame(rAFId);
      marquee.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [showAbout, showContact, showDetail]);

  useEffect(() => {
    if (showDetail && overlayRef.current) {
      overlayRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [selectedProject, showDetail]);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setShowDetail(true);
  };

  const nextProject = selectedProject
    ? projects.find((p) => p.name === selectedProject.nextProject) ?? null
    : null;

  return (
    <>
      <div className="cursor-container">
        <div className="cursor" ref={cursorRef}>
          <span className="cursor-dot" />
          {hoveredProject && <p className="cursor-label">{hoveredProject}</p>}
        </div>
      </div>

      <header className="header">
        <div className="header-left">
          <div className="header-brand">
            <a href="/" className="logo">AYA KAROU</a>
          </div>
          <button id="contact-btn" className="nav-link" onClick={() => setShowContact(true)}>
            Contact
          </button>
        </div>
        <div className="header-center">
          <button
            id="theme-toggle-btn"
            className="theme-toggle"
            onClick={() => setIsDark((prev) => !prev)}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="theme-toggle-icon" style={{ width: 'max(14px, 1.6rem)', height: 'max(14px, 1.6rem)' }}>
              <path d="M12 2 A10 10 0 0 1 12 22 Z" fill="currentColor"/>
              <path d="M12 2 A10 10 0 0 0 12 22 Z" fill="currentColor" opacity="0.2"/>
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" fill="none"/>
              <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" stroke-width="1.5"/>
            </svg>
          </button>
        </div>
        <div className="header-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.2rem' }}>
          <p className="clock">{time}</p>
          <p className="clock">Bouira, Algeria</p>
          <span className="availability">Studying in ESTIN Bejaia ↗</span>
        </div>
      </header>

      <main className="layout">
        <div className="panels-marquee-wrapper">
          <div className="panels-container" ref={marqueeRef}>
            {marqueeProjects.map((project, idx) => (
              <div
                key={idx}
                className="panel-strip"
                onClick={() => openProject(project)}
                onMouseEnter={() => setHoveredProject(project.name)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <img
                  src={project.img}
                  alt={project.name}
                  className="grayscale-img"
                  draggable={false}
                  loading={idx < 5 ? 'eager' : 'lazy'}
                />
                <svg className="color-img" width="100%" height="100%" style={{ pointerEvents: 'none' }}>
                  <defs>
                    <filter id={`spotlight-filter-full-${idx}`} x="-100%" y="-100%" width="300%" height="300%">
                      <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="raw-noise" />
                      <feOffset className="spotlight-noise-offset" dx="0" dy="0" in="raw-noise" result="noise" />
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="55" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                    <mask id={`spotlight-mask-full-${idx}`} maskUnits="userSpaceOnUse" x="-100%" y="-100%" width="300%" height="300%">
                      <g className="spotlight-group">
                        <ellipse className="spotlight-circle" cx="0" cy="0" rx="220" ry="110" fill="white" filter={`url(#spotlight-filter-full-${idx})`} />
                      </g>
                    </mask>
                  </defs>
                  <image href={project.img} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" mask={`url(#spotlight-mask-full-${idx})`} />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-left">
          <button id="about-btn" onClick={() => setShowAbout(true)}>
            About
          </button>
        </div>
      </footer>

      <section ref={overlayRef} className={`overlay${showDetail ? ' active' : ''}`}>

        <div className="case-nav">
          <button id="case-back-btn" className="back-btn" onClick={() => setShowDetail(false)}>
            ← Back
          </button>
          <span className="case-clock">{time} — Algeria</span>
        </div>
        <div className="case-top">
          <div className="case-top-left">
            <h1 className="case-title">
              {selectedProject?.name?.split('').map((char, idx) => (
                <span
                  key={`${selectedProject.name}-${idx}`}
                  className="case-char"
                  style={{ animationDelay: `${idx * 0.035}s` }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>
            <div className="case-meta-row">
              <h2 className="case-label">Year</h2>
              <p className="case-value">{selectedProject?.year}</p>
            </div>
            {selectedProject?.about && (
              <div className="case-meta-row">
                <h2 className="case-label">About</h2>
                <p className="case-value case-about">{selectedProject.about}</p>
              </div>
            )}
            <div className="case-meta-row">
              <h2 className="case-label">Role</h2>
              <p className="case-value">{selectedProject?.role}</p>
            </div>
            <div className="case-meta-row">
              <h2 className="case-label">Stack</h2>
              <p className="case-value">{selectedProject?.stack?.join(', ')}</p>
            </div>
            {selectedProject?.collaborators && selectedProject.collaborators.length > 0 && (
              <div className="case-meta-row">
                <h2 className="case-label">Collaborators</h2>
                <div className="case-collaborators">
                  {selectedProject.collaborators.map((collab, idx) => (
                    <a
                      key={idx}
                      href={collab.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="case-collab-link"
                    >
                      {collab.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
            {selectedProject?.recognition && (
              <div className="case-meta-row">
                <h2 className="case-label">Recognition</h2>
                <p className="case-value">{selectedProject.recognition}</p>
              </div>
            )}
            {(selectedProject?.visitUrl || selectedProject?.githubUrl) && (
              <div className="case-visit-row" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {selectedProject.visitUrl && selectedProject.visitUrl !== '#' && (
                  <a
                    href={selectedProject.visitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="case-visit-btn"
                  >
                    Visit Website ↗
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="case-visit-btn"
                  >
                    GitHub Repo ↗
                  </a>
                )}
              </div>
            )}
          </div>
          <div className="case-top-right">
            <figure className="case-hero-figure">
              <img
                src={selectedProject?.coverImg ?? selectedProject?.img}
                alt={selectedProject?.name}
                className="case-hero-img"
              />
            </figure>
          </div>
        </div>
        {selectedProject?.media && selectedProject.media.length > 0 && (
          <div className="case-media-grid">
            {selectedProject.media.map((mediaItem, idx) => (
              <CaseMediaFigure key={`${selectedProject.name}-${idx}`} item={mediaItem} />
            ))}
          </div>
        )}
        {nextProject && (
          <div className="case-footer">
            <p className="case-footer-label">Next Project</p>
            <button
              id="next-project-btn"
              className="case-next-btn"
              onClick={() => openProject(nextProject)}
            >
              {nextProject.name.split('').map((char, idx) => (
                <span
                  key={`next-${nextProject.name}-${idx}`}
                  className="case-char-next"
                  style={{ animationDelay: `${idx * 0.03}s` }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </button>
          </div>
        )}
      </section>

      <section className={`overlay about-overlay${showAbout ? ' active' : ''}`}>
        <div className="about-nav">
          <button id="about-close-btn" className="about-close-btn" onClick={() => setShowAbout(false)}>
            ← Close
          </button>
        </div>
        <div className="about-content">
          <div className="about-bio">
            <h1 className="about-bio-title">
              Karou<br />Aya Malak
            </h1>
            <div className="about-bio-text">
              <h2>Bio</h2>
              <p>
                Hey, I'm Aya! I'm a 19-year-old frontend developer and a 2CP computer science student at ESTIN (École Supérieure en Sciences et Technologies de l'Informatique et du Numérique), hailing from Bouira, Algeria.
              </p>
              <p>
                My entry into web development in the summer of 2025 changed everything. It ceased being just a hobby and became my daily creative outlet — a lifestyle centered around rapid growth and continuous execution.
              </p>
              <p>
                Driven by endless curiosity, I craft polished, immersive interfaces and write elegant code. Want to know more or collaborate? Let’s connect and spark a conversation!
              </p>
            </div>
          </div>
          <div className="about-section">
            <div>
              <h2>Skills & Technologies</h2>
              <ul className="interests-list">
                {[
                  'React',
                  'TypeScript',
                  'JavaScript',
                  'HTML',
                  'CSS',
                  'Tailwind CSS',
                  'Python',
                  'C Language (Basic)',
                  'Git',
                  'Linux'
                ].map((skill) => (
                  <li key={skill} className="interest-tag">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Education & Dev Journey</h2>
              <ul className="experience-list">
                {[
                  {
                    company: 'ESTIN — Algeria',
                    role: 'Computer Science Student (2CP)',
                    timeline: '2024 - Present'
                  },
                  {
                    company: 'Independent Creative Coding',
                    role: 'Frontend Developer',
                    timeline: 'Summer 2025 - Present'
                  }
                ].map((exp) => (
                  <li key={exp.company} className="experience-item">
                    <p>{exp.company}</p>
                    <p className="role">{exp.role}</p>
                    <p className="timeline">{exp.timeline}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="recognitions-section">
            <h2>Quick Facts</h2>
            <ul className="recognitions-list">
              {[
                'Full Name: Karou Aya Malak',
                'Age: 19 Years Old',
                'From: Bouira, Algeria',
                'College: ESTIN Student',
                'Dev Style: Motion, Tailwind, React, Git, Linux',
                'Philosophy: Web dev is a lifestyle'
              ].map((fact) => (
                <li key={fact} className="recognition-tag">
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={`overlay contact-overlay${showContact ? ' active' : ''}`}>
        <div className="contact-nav">
          <button id="contact-close-btn" className="contact-close-btn" onClick={() => setShowContact(false)}>
            ← Close
          </button>
        </div>
        <div className="contact-content">
          <h2 className="contact-heading">
            Let's Create<br />Something Crazy
          </h2>
          <p className="contact-sub">Have a project in mind?</p>
          <a href="mailto:a_karou@estin.dz" className="contact-email">
            a_karou@estin.dz
          </a>
          <div className="contact-socials">
            {[
              {
                label: 'LinkedIn',
                url: 'https://www.linkedin.com/in/aya-malak-karou-15a527398?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
              },
              {
                label: 'GitHub',
                url: 'https://github.com/estinaya2024'
              }
            ].map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;