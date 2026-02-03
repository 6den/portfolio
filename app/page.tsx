'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, FileText, ArrowUpRight } from 'lucide-react';

// --- DATA ---
const EXPERIENCE = [
  {
    id: 'zyp',
    company: "Zyp",
    role: "Software Engineering Intern",
    date: "Dec '25 - Mar '26",
    desc: "Redesigned core site architecture in Next.js and engineered an AI-assisted directory ranking algorithm that increased click-through rates by 41%.",
    color: "bg-indigo-500",
    image: "/zyp.png",
    link: "https://www.tryzyp.com/",
  },
  {
    id: 'mahidol',
    company: "Mahidol University",
    role: "Teaching Assistant",
    date: "Apr '24 - July '25",
    desc: "Developed Python auto-graders reducing workload by 70% and led weekly technical tutoring sessions for over 80 students.",
    color: "bg-pink-500",
    image: "/mahidol.png",
  }
];

const PROJECTS = [
  {
    id: 'fridge',
    title: "FridgeFinds",
    tech: "Next.js / React",
    desc: "Full-stack inventory engine enabling users to generate recipes from existing ingredients. Features complex filtering and client-side state persistence.",
    color: "bg-orange-500",
    image: "/fridgefinds.png",
    link: "https://fridge-finds.vercel.app/",
  },
  {
    id: 'mri',
    title: "Alzheimer's MRI",
    tech: "TensorFlow / Python",
    desc: "Convolutional Neural Network achieving 95.86% validation accuracy in classifying Alzheimer's severity from over 6,000 processed MRI scans.",
    color: "bg-blue-500",
  },
  {
    id: 'wordle',
    title: "Wordle Auto-Player",
    tech: "JavaScript / Chrome API",
    desc: "A Chrome extension that automatically solves Wordle using constraint-based reasoning and information theory. Features real-time game state detection.",
    color: "bg-emerald-500",
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

export default function Portfolio() {
  const [activeHue, setActiveHue] = useState(240);

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-slate-200 overflow-x-hidden selection:bg-white/20 selection:text-white">

      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{ filter: `hue-rotate(${activeHue}deg)` }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-900/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-purple-900/20 blur-[120px]" />
          <motion.div
            animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[30%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-indigo-900/10 blur-[100px]"
          />
        </motion.div>
        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />
      </div>

      {/* CONTENT */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-24 flex flex-col gap-32">

        {/* HERO */}
        <section className="flex flex-col md:flex-row items-center md:items-start gap-12 pt-12">
          <div className="w-40 h-52 md:w-52 md:h-72 rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex-shrink-0 relative shadow-2xl">
            <img src="/aden.jpg" alt="Aden Barcroft" className="object-cover object-top w-full h-full" />
          </div>

          <div className="flex-1 space-y-6 text-center md:text-left">
            <div>
              <h1
                className="text-5xl md:text-8xl font-bold tracking-tight mb-4"
                style={{
                  background: 'linear-gradient(270deg, #a78bfa, #f9a8d4, #fde68a, #6ee7b7, #93c5fd, #c4b5fd, #a78bfa)',
                  backgroundSize: '300% 300%',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'gradient-shift 8s ease infinite',
                  filter: 'drop-shadow(0 0 30px rgba(167,139,250,0.3)) drop-shadow(0 0 60px rgba(147,197,253,0.15))',
                }}
              >
                Aden Barcroft
              </h1>
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
        </section>

        {/* EXPERIENCE */}
        <ContentBlock
          title="EXPERIENCE"
          items={EXPERIENCE}
          onSelect={(hue: number) => setActiveHue(hue)}
        />

        {/* PROJECTS */}
        <ContentBlock
          title="PROJECTS"
          items={PROJECTS}
          onSelect={(hue: number) => setActiveHue(hue)}
        />

        {/* SKILLS */}
        <SkillsSection />

        {/* FOOTER */}
        <footer className="pt-12 border-t border-white/5 flex justify-between text-xs text-white/20 uppercase tracking-widest">
          <span>&copy; 2026 Aden Barcroft</span>
          <span>Washington, DC</span>
        </footer>
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
  color: string;
  image?: string;
  link?: string;
}

function ContentBlock({ title, items, onSelect }: { title: string; items: ContentItem[]; onSelect: (hue: number) => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];

  // Map color classes to hue values for background shift
  const hueMap: Record<string, number> = {
    'bg-indigo-500': 240,
    'bg-pink-500': 300,
    'bg-emerald-500': 140,
    'bg-blue-500': 200,
    'bg-orange-500': 30,
  };

  return (
    <section>
      <h2 className="text-xs font-bold tracking-[0.2em] text-white/30 mb-8 uppercase pl-1">
        {title}
      </h2>

      <div className="flex flex-wrap gap-x-8 gap-y-3 mb-12 border-b border-white/5 pb-6">
        {items.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveIndex(idx);
              onSelect(hueMap[item.color] ?? 240);
            }}
            style={{ WebkitAppearance: 'none', background: 'transparent', border: 'none' }}
            className={`cursor-pointer text-2xl md:text-4xl font-semibold tracking-tight transition-all duration-500 ${
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
            initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <div className="hidden md:flex h-[280px] w-full rounded-2xl border border-white/10 relative overflow-hidden bg-[#111] items-center justify-center">
              {activeItem.image ? (
                <>
                  {/* Blurred background fill */}
                  <img src={activeItem.image} alt="" className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 scale-110" />
                  {/* Sharp foreground image */}
                  <img src={activeItem.image} alt={activeItem.company || activeItem.title || ''} className="relative z-10 max-w-[90%] max-h-[85%] object-contain drop-shadow-2xl rounded-lg" />
                </>
              ) : (
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[50px] opacity-40 ${activeItem.color}`} />
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
    </section>
  );
}

function SkillsSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8 }}
    >
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
    </motion.section>
  );
}
