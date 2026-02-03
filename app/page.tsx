'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Github, Linkedin, Mail, FileText, ArrowUpRight } from 'lucide-react';

// --- DATA ---
const SECTIONS = ["Intro", "Experience", "Projects", "Skills"];

const EXPERIENCE = [
  {
    id: 'zyp',
    company: "Zyp",
    role: "Software Engineering Intern",
    date: "Dec '25 - Mar '26",
    desc: "Redesigned core site architecture in Next.js and engineered an AI-assisted directory ranking algorithm that increased click-through rates by 41%.",
    image: "/zyp.png",
    link: "https://www.tryzyp.com/",
  },
  {
    id: 'mahidol',
    company: "Mahidol University",
    role: "Teaching Assistant",
    date: "Apr '24 - July '25",
    desc: "Developed Python auto-graders reducing workload by 70% and led weekly technical tutoring sessions for over 80 students.",
    image: "/mahidol.png",
  }
];

const PROJECTS = [
  {
    id: 'fridge',
    title: "FridgeFinds",
    tech: "Next.js / React",
    desc: "Full-stack inventory engine enabling users to generate recipes from existing ingredients. Features complex filtering and client-side state persistence.",
    image: "/fridgefinds.png",
    link: "https://fridge-finds.vercel.app/",
  },
  {
    id: 'mri',
    title: "Alzheimer's MRI",
    tech: "TensorFlow / Python",
    desc: "Convolutional Neural Network achieving 95.86% validation accuracy in classifying Alzheimer's severity from over 6,000 processed MRI scans.",
  },
  {
    id: 'wordle',
    title: "Wordle Auto-Player",
    tech: "JavaScript / Chrome API",
    desc: "A Chrome extension that automatically solves Wordle using constraint-based reasoning and information theory. Features real-time game state detection.",
    link: "https://github.com/6den/wsolve",
  }
];

const SKILLS = [
  {
    category: "Languages",
    items: ["Python", "Java", "JavaScript", "C", "Bash/Shell", "HTML/CSS", "R"],
  },
  {
    category: "Frameworks",
    items: ["React", "Node.js", "Tailwind CSS", "TensorFlow"],
  },
  {
    category: "Tools",
    items: ["Git", "Jupyter Notebook", "VS Code", "PyCharm", "IntelliJ", "GitHub", "Linux", "Google Colab", "Figma"],
  },
  {
    category: "Libraries",
    items: ["pandas", "NumPy", "Matplotlib", "scikit-learn", "Seaborn"],
  },
];

// --- ANIMATION CONFIG ---
const FADE_ANIM = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { 
    duration: 1.1, 
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    delay: 0.1
  }
};

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);

  // Scroll Progress Logic
  const { scrollYProgress } = useScroll({ container: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { mass: 0.1, stiffness: 50, damping: 20 });
  const bgHue = useTransform(smoothProgress, [0, 1], [0, 360]);
  const bgFilter = useTransform(bgHue, (h) => `hue-rotate(${h}deg)`);

  // Observer Logic to track active section (throttled with rAF)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId = 0;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const scrollPosition = container.scrollTop;
        const windowHeight = container.clientHeight;
        const index = Math.round(scrollPosition / windowHeight);
        setActiveSection(index);
        rafId = 0;
      });
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToSection = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({
      top: index * container.clientHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative h-screen w-full bg-[#050505] text-slate-200 overflow-hidden selection:bg-fuchsia-500/30 selection:text-fuchsia-100">

      {/* --- BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 w-full h-full will-change-[filter]"
          style={{ filter: bgFilter, transform: 'translateZ(0)' }}
        >
          <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-violet-900/20 blur-[120px]" style={{ transform: 'translateZ(0)' }} />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-fuchsia-900/15 blur-[120px]" style={{ transform: 'translateZ(0)' }} />
          <motion.div
            animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-[30%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-purple-800/10 blur-[100px]"
            style={{ transform: 'translateZ(0)' }}
          />
        </motion.div>
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* --- NAVIGATION DOTS (RIGHT SIDE) --- */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {SECTIONS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToSection(idx)}
            className="group relative flex items-center justify-end"
            aria-label={`Scroll to section ${idx + 1}`}
          >
            {/* Hover Label */}
            <span className={`
              absolute right-8 px-2 py-1 rounded bg-white/10 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-white/80 
              transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0
              ${activeSection === idx ? 'opacity-100 translate-x-0' : ''}
            `}>
              {SECTIONS[idx]}
            </span>

            {/* The Dot */}
            <div className={`
              w-3 h-3 rounded-full border border-white/20 transition-all duration-500
              ${activeSection === idx ? 'bg-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'bg-transparent hover:bg-white/20'}
            `} />
          </button>
        ))}
      </div>

      {/* --- SCROLL CONTAINER --- */}
      <main 
        ref={containerRef}
        className="relative z-10 h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      >
        
        {/* SECTION 1: HERO */}
        <section className="h-screen w-full snap-start flex flex-col justify-center items-center px-6">
          <motion.div 
            className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-center gap-12"
            {...FADE_ANIM}
          >
            <div className="w-40 h-52 md:w-52 md:h-72 rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex-shrink-0 relative shadow-2xl group">
              <img src="/aden.jpg" alt="Aden Barcroft" className="object-cover object-top w-full h-full transition-transform duration-700 group-hover:scale-105" />
            </div>

            <div className="space-y-6 text-center md:text-left">
              <div>
                <motion.h1
                  className="text-5xl md:text-8xl font-bold tracking-tight mb-4"
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  style={{
                    background: 'linear-gradient(90deg, #e879f9, #c084fc, #93c5fd, #6ee7b7, #fde68a, #fca5a1, #e879f9)',
                    backgroundSize: '300% 100%',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Aden Barcroft
                </motion.h1>
                <p className="text-xl text-white/50 font-light max-w-lg mx-auto md:mx-0">
                  Full Stack Developer @ Georgetown University
                </p>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-4">
                <SocialLink href="https://github.com/6den" icon={<Github size={18} />} />
                <SocialLink href="https://linkedin.com/in/adenbarcroft" icon={<Linkedin size={18} />} />
                <SocialLink href="mailto:adenbarcroft@gmail.com" icon={<Mail size={18} />} />
                <a
                  href="/resume.pdf"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium hover:bg-white hover:text-black transition-colors"
                >
                  <FileText size={16} /> Resume
                </a>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 animate-bounce text-white/20 text-xs uppercase tracking-widest"
          >
            Scroll
          </motion.div>
        </section>

        {/* SECTION 2: EXPERIENCE */}
        <section className="h-screen w-full snap-start flex flex-col justify-center items-center px-6">
          <motion.div className="max-w-5xl w-full" {...FADE_ANIM}>
            <ContentBlock title="EXPERIENCE" items={EXPERIENCE} />
          </motion.div>
        </section>

        {/* SECTION 3: PROJECTS */}
        <section className="h-screen w-full snap-start flex flex-col justify-center items-center px-6">
          <motion.div className="max-w-5xl w-full" {...FADE_ANIM}>
            <ContentBlock title="PROJECTS" items={PROJECTS} />
          </motion.div>
        </section>

        {/* SECTION 4: SKILLS & FOOTER */}
        <section className="h-screen w-full snap-start flex flex-col justify-center items-center px-6 relative">
          <motion.div className="max-w-5xl w-full" {...FADE_ANIM}>
            <SkillsSection />
          </motion.div>
          
          <footer className="absolute bottom-8 w-full max-w-5xl border-t border-white/5 flex justify-between text-xs text-white/20 uppercase tracking-widest pt-6">
            <span>&copy; 2026 Aden Barcroft</span>
            <span>Washington, DC</span>
          </footer>
        </section>

      </main>
    </div>
  );
}

// --- SUB COMPONENTS ---

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all hover:scale-105"
    >
      {icon}
    </a>
  );
}

interface ContentItem {
  id: string;
  company?: string;
  title?: string;
  role?: string;
  tech?: string;
  date?: string;
  desc: string;
  image?: string;
  link?: string;
}

function ContentBlock({ title, items }: { title: string; items: ContentItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];

  return (
    <div className="w-full">
      <h2 className="text-xs font-bold tracking-[0.2em] text-white/30 mb-8 uppercase pl-1">
        {title}
      </h2>

      <div className="flex flex-wrap gap-x-8 gap-y-3 mb-12 border-b border-white/5 pb-6">
        {items.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setActiveIndex(idx)}
            style={{ WebkitAppearance: 'none', background: 'transparent', border: 'none' }}
            className={`cursor-pointer text-2xl md:text-4xl font-semibold tracking-tight transition-all duration-300 ${
              idx === activeIndex ? "text-white scale-100 opacity-100" : "text-white/20 scale-95 opacity-50 hover:text-white/50"
            }`}
          >
            {item.company || item.title}
          </button>
        ))}
      </div>

      <div className="relative min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }} 
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <div className="hidden md:flex h-[280px] w-full rounded-2xl border border-white/10 relative overflow-hidden bg-[#111] items-center justify-center group">
              {activeItem.image ? (
                <>
                  <img src={activeItem.image} alt="" className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 scale-110" />
                  <img src={activeItem.image} alt={activeItem.company || activeItem.title || ''} className="relative z-10 max-w-[90%] max-h-[85%] object-contain drop-shadow-2xl rounded-lg transition-transform duration-500 group-hover:scale-[1.02]" />
                </>
              ) : (
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-20 bg-white`} />
              )}
            </div>

            <div className="flex flex-col gap-4 py-2">
              <div className="flex flex-col">
                <h3 className="text-3xl font-bold text-white mb-1">
                  {activeItem.company || activeItem.title}
                </h3>
                <span className="text-sm font-mono uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
                  {activeItem.role || activeItem.tech}
                </span>
              </div>

              <p className="text-lg text-white/60 font-light leading-relaxed">
                {activeItem.desc}
              </p>

              {activeItem.date && (
                <div className="mt-4 pt-4 border-t border-white/5 text-xs text-white/30 font-mono">
                  {activeItem.date}
                </div>
              )}

              {activeItem.link && (
                <a
                  href={activeItem.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-2 px-4 py-2 w-fit rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/70 hover:bg-white hover:text-black transition-all"
                >
                  Visit <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function SkillsSection() {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold tracking-[0.2em] text-white/80 mb-10 uppercase pl-1">
        What I Use:
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {SKILLS.map((group) => (
          <div key={group.category} className="space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-white/50">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-sm rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}