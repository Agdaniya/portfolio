import { useEffect, useRef, useState, type ReactNode } from "react";

type IconName = "arrow" | "github" | "linkedin" | "mail";

const contact = {
  email: "agdaniya345@gmail.com",
  linkedin: "https://www.linkedin.com/in/agda-niya/",
  github: "https://github.com/Agdaniya",
};

const roles = ["z/OS engineer", "Python automator", "AI/ML explorer", "VR builder"];

type Project = {
  name: string;
  description: string;
  tags: string;
  live?: string;
  code?: string;
  note?: string;
};

const projects: Project[] = [
  {
    name: "Holiday Processing Automation",
    description: "Python automation that cut manual effort in holiday processing at IBM.",
    tags: "Python · z/OS",
    note: "Internal tool",
  },
  {
    name: "FitQuest",
    description: "Real-time, video-based exercise tracking with personalised ML recommendations.",
    tags: "Python · OpenCV · MediaPipe",
    code: "https://github.com/Agdaniya/Fitquest",
  },
  {
    name: "SOT Staff Tracker",
    description: "Desktop tool for attendance, assignments, performance and Excel reports.",
    tags: "Python · Excel",
    code: "https://github.com/Agdaniya/sot_software",
  },
  {
    name: "VR Climbing Game",
    description: "Hand-based climbing with rope ladders and breakable holds in 360° worlds.",
    tags: "Unity · XR Toolkit",
  },
  {
    name: "Recipe Search",
    description: "Find recipes by ingredients and preferences using the TheMealDB API.",
    tags: "JavaScript",
    live: "https://agdaniya.github.io/RecipeSearch/",
    code: "https://github.com/Agdaniya/RecipeSearch",
  },
  {
    name: "Dr Shada's Clinic",
    description: "Appointment booking site for a holistic homeopathic clinic.",
    tags: "HTML · CSS · JS",
    live: "https://clinic-41b5c.web.app/",
  },
  {
    name: "Sketch on Thoughts",
    description: "Website for an architecture and interior design studio in Kerala.",
    tags: "Web",
    live: "https://www.sketchonthoughts.com/",
  },
];

const timeline = [
  {
    when: "Nov 2025 — now",
    title: "Application Developer, z/OS",
    where: "IBM",
    text: "Maintaining and modernizing mainframe systems with COBOL, JCL, DB2 and CICS, and automating repetitive work with Python.",
  },
  {
    when: "Jun — Jul 2024",
    title: "AI/ML Intern",
    where: "IBM CSRBox & Keltron",
    text: "Built a Watson Assistant chatbot, predictive models, and CNN/RNN image recognition.",
  },
  {
    when: "2021 — 2025",
    title: "B.Tech, Information Technology",
    where: "CUSAT",
    text: "Cochin University of Science and Technology. CGPA 8.01.",
  },
];

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <>
        <path d="M7 17 17 7" />
        <path d="M8 7h9v9" />
      </>
    ),
    github: (
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.3 4 5 5 0 0 0 19.1.5S18 0 15 2a13.4 13.4 0 0 0-7 0C5 0 3.9.5 3.9.5A5 5 0 0 0 3.7 4a5.4 5.4 0 0 0-1.5 3.7c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 8 18v4" />
    ),
    linkedin: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
        <path d="M2 9h4v12H2z" />
        <path d="M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      </>
    ),
    mail: (
      <>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-10 6L2 7" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

/** Dot grid behind the page. Dots push away from the cursor and glow lime. */
function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const GAP = 34;
    const RADIUS = 150;
    const mouse = { x: -9999, y: -9999, sx: -9999, sy: -9999 };
    let dots: { x: number; y: number; ox: number; oy: number }[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      mouse.sx += (mouse.x - mouse.sx) * 0.18;
      mouse.sy += (mouse.y - mouse.sy) * 0.18;

      ctx.fillStyle = "rgba(241, 240, 233, 0.13)";
      const glowing: [number, number, number][] = [];

      ctx.beginPath();
      for (const d of dots) {
        const dx = d.x - mouse.sx;
        const dy = d.y - mouse.sy;
        const dist = Math.hypot(dx, dy);
        let tx = 0;
        let ty = 0;
        let t = 0;
        if (dist < RADIUS && dist > 0) {
          t = 1 - dist / RADIUS;
          const push = t * t * 24;
          tx = (dx / dist) * push;
          ty = (dy / dist) * push;
        }
        d.ox += (tx - d.ox) * 0.16;
        d.oy += (ty - d.oy) * 0.16;
        if (t > 0) {
          glowing.push([d.x + d.ox, d.y + d.oy, t]);
        } else {
          ctx.moveTo(d.x + d.ox + 1.2, d.y + d.oy);
          ctx.arc(d.x + d.ox, d.y + d.oy, 1.2, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      for (const [x, y, t] of glowing) {
        ctx.fillStyle = `rgba(199, 255, 62, ${0.3 + t * 0.7})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.2 + t * 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = GAP / 2; y < h; y += GAP) {
        for (let x = GAP / 2; x < w; x += GAP) dots.push({ x, y, ox: 0, oy: 0 });
      }
      if (reduceMotion) draw();
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    build();
    if (!reduceMotion) raf = requestAnimationFrame(draw);
    window.addEventListener("resize", build);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="dots" aria-hidden="true" />;
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const sections = ["home", "about", "work", "contact"];

export default function App() {
  const active = useActiveSection(sections);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="site">
      <DotField />

      <nav className="pill" aria-label="Main navigation">
        {sections.map((id) => (
          <a key={id} href={`#${id}`} className={active === id ? "on" : ""}>
            {id}
          </a>
        ))}
      </nav>

      <main>
        <section className="wrap hero" id="home">
          <p className="role">
            <i />
            <span key={roleIndex}>{roles[roleIndex]}</span>
          </p>
          <h1>
            Agda <em>Niya</em>
          </h1>
          <p className="sub">Software engineer at IBM, building things that remove busywork.</p>
          <div className="hero-row">
            <a className="cta" href="#work">
              See my work <span>↓</span>
            </a>
            <div className="icons">
              <a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <Icon name="github" />
              </a>
              <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Icon name="linkedin" />
              </a>
              <a href={`mailto:${contact.email}`} aria-label="Email">
                <Icon name="mail" />
              </a>
            </div>
          </div>
        </section>

        <section className="wrap block" id="about">
          <h2>About</h2>
          <p className="bio">
            Hey, I'm a developer who loves <b>exploring technology</b>, <b>building things</b>, and
            turning ideas into reality.
          </p>
          <p className="bio-text">
            Currently an Application Developer at IBM, I work on enterprise applications while
            exploring my interests in AI/ML, web development, and game development. I enjoy
            experimenting with new technologies, solving problems, and building projects that bring
            ideas to life.
          </p>
          <p className="bio-text">Always curious, always learning, and always building something new.</p>
          <ul className="timeline">
            {timeline.map((item) => (
              <li key={item.title}>
                <span className="when">{item.when}</span>
                <div>
                  <h3>
                    {item.title} <em>{item.where}</em>
                  </h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="stack">
            Python · COBOL · JCL · SQL · DB2 · CICS · C/C++ · Java · Unity · OpenCV · AWS · Git
          </p>
          <p className="stack dim">
            AWS Certified Cloud Practitioner · CockroachDB Associate Developer · GitHub Copilot ·
            watsonx · Design Thinking
          </p>
        </section>

        <section className="wrap block" id="work">
          <h2>Work</h2>
          <ul className="rows">
            {projects.map((p) => (
              <li className="row" key={p.name}>
                <div className="row-main">
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <span className="tags">{p.tags}</span>
                </div>
                <div className="row-links">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer">
                      Live <Icon name="arrow" size={14} />
                    </a>
                  )}
                  {p.code && (
                    <a href={p.code} target="_blank" rel="noreferrer">
                      Code <Icon name="arrow" size={14} />
                    </a>
                  )}
                  {p.note && <em>{p.note}</em>}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="wrap block contact" id="contact">
          <h2>Say hello</h2>
          <a className="mail" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          <p className="foot">© Agda Niya</p>
        </section>
      </main>
    </div>
  );
}
