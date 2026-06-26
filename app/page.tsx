'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import NeuralCloud from './components/NeuralCloud'

export default function Home() {
  const [view, setView] = useState<'hero' | 'projects'>('hero')
  const [textIndex, setTextIndex] = useState(0)
  const projectsRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const touchStart = useRef<number | null>(null)
  const isTransitioning = useRef(false)

  const titles = [
    "AI & Computer Vision Researcher",
    "Generative AI Specialist",
    "RAG Systems Engineer"
  ]

  const colors = [
    "#60a5fa",
    "#c084fc",
    "#2dd4bf"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % titles.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const lockTransition = () => {
    isTransitioning.current = true
    setTimeout(() => { isTransitioning.current = false }, 800)
  }

  const goToProjects = () => {
    setView('projects')
    lockTransition()
  }

  const scrollToContact = () => {
    setView('projects')
    lockTransition()
    setTimeout(() => {
      contactRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 700)
  }

  const handleWheel = (e: React.WheelEvent) => {
    if (isTransitioning.current) return
    if (Math.abs(e.deltaY) < 40) return

    if (view === 'hero' && e.deltaY > 0) {
      setView('projects')
      lockTransition()
    } else if (view === 'projects' && e.deltaY < 0) {
      if (projectsRef.current && projectsRef.current.scrollTop <= 0) {
        setView('hero')
        lockTransition()
      }
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null || isTransitioning.current) return

    const touchEnd = e.changedTouches[0].clientY
    const diff = touchStart.current - touchEnd

    if (diff > 60 && view === 'hero') {
      setView('projects')
      lockTransition()
    }

    if (diff < -60 && view === 'projects') {
      if (projectsRef.current && projectsRef.current.scrollTop <= 0) {
        setView('hero')
        lockTransition()
      }
    }

    touchStart.current = null
  }

  const githubIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )

  return (
    <main
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative h-screen w-screen overflow-hidden bg-[#0b0d10] text-white selection:bg-[#60a5fa] selection:text-white"
    >

      {/* BACKGROUND */}
      <div className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-700 ease-in-out ${view === 'projects' ? 'opacity-20' : 'opacity-100'}`}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <NeuralCloud color={colors[textIndex]} />
        </Canvas>
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6 md:px-20 flex items-center justify-between pointer-events-none">
        <div className="h-8 flex items-center">
          {view === 'projects' && (
            <motion.span
              layoutId="name-title"
              className="font-[var(--font-space)] text-base tracking-tight font-medium cursor-pointer pointer-events-auto"
              onClick={() => setView('hero')}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              Shaik Zaheer Hussain
            </motion.span>
          )}
        </div>

        <nav className="flex items-center gap-8 text-sm text-white/70 pointer-events-auto">
          <button
            onClick={() => setView('hero')}
            className={`hover:text-white transition-colors ${view === 'hero' ? 'text-white' : ''}`}
          >
            Home
          </button>
          <button
            onClick={goToProjects}
            className={`hover:text-white transition-colors ${view === 'projects' ? 'text-white' : ''}`}
          >
            Projects
          </button>
          <a href="/resume_zaheer.pdf" target="_blank" className="hover:text-white transition-colors">
            Resume
          </a>
          <a
            href="https://github.com/ZaheerH-03"
            target="_blank"
            className="hover:text-white transition-colors"
            aria-label="GitHub Profile"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/zaheer-hussain-9a7946251"
            target="_blank"
            className="hover:text-white transition-colors"
            aria-label="LinkedIn Profile"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </nav>
      </header>

      {/* SLIDING CONTENT */}
      <motion.div
        className="relative z-10 w-full h-full"
        initial={false}
        animate={{ y: view === 'hero' ? 0 : '-100%' }}
        transition={{ type: "spring", stiffness: 120, damping: 25, mass: 1 }}
      >

        {/* HERO SECTION */}
        <section className="h-screen w-full flex flex-col justify-center px-8 md:px-20 relative">
          {/* Gradient shield behind text — prevents nebula from washing out copy on mobile */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d10]/80 via-[#0b0d10]/40 to-transparent pointer-events-none" />
          <div className="max-w-4xl z-10">
            {view === 'hero' && (
              <motion.h1
                layoutId="name-title"
                className="font-[var(--font-space)] text-4xl md:text-7xl font-medium tracking-tight leading-tight inline-block"
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              >
                Shaik Zaheer Hussain
              </motion.h1>
            )}

            {/* Rotating title — AnimatePresence fixes exit animations */}
            <div className="mt-4 h-8">
              <AnimatePresence mode="wait">
                <motion.p
                  key={textIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="text-white/60 text-sm md:text-xl leading-relaxed"
                  style={{ color: colors[textIndex] }}
                >
                  {titles[textIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 text-white/75 text-sm md:text-base max-w-lg leading-relaxed"
            >
              I design and build end-to-end AI systems — LangGraph agents, hybrid RAG pipelines,
              and computer vision research. Recent graduate, focused on ML engineering.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-10 flex gap-4 flex-wrap"
            >
              <button
                onClick={goToProjects}
                className="px-6 py-2.5 rounded-full border border-white/20 text-sm text-white/80 hover:border-[#60a5fa]/60 hover:text-white hover:bg-[#60a5fa]/10 transition-all duration-300"
              >
                View Work
              </button>
              <button
                onClick={scrollToContact}
                className="px-6 py-2.5 rounded-full text-sm text-white/50 hover:text-white transition-colors duration-300 flex items-center gap-2"
              >
                Get in Touch
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25 cursor-pointer"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            onClick={goToProjects}
          >
            <span className="text-[10px] tracking-[0.2em] uppercase font-mono">scroll</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </section>

        {/* PROJECTS SECTION */}
        <section
          ref={projectsRef}
          className="h-screen w-full px-4 md:px-20 py-24 md:py-32 overflow-y-auto flex flex-col no-scrollbar"
          onWheel={(e) => {
            if (projectsRef.current && projectsRef.current.scrollTop > 0 && e.deltaY < 0) {
              e.stopPropagation()
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-6xl mx-auto flex flex-col"
          >

            {/* Section heading */}
            <h2 className="font-[var(--font-space)] text-xs tracking-[0.25em] uppercase text-white/30 mb-10 font-medium">
              Selected Work
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">

              {/* AMS — Featured, full width */}
              <div className="group relative md:col-span-2 p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/8 hover:border-[#60a5fa]/40 hover:shadow-2xl hover:shadow-[#60a5fa]/10 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded bg-[#60a5fa]/15 text-[#60a5fa] border border-[#60a5fa]/20">
                      Project Lead · AI Architect
                    </span>
                    <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded bg-[#2dd4bf]/10 text-[#2dd4bf] border border-[#2dd4bf]/20">
                      Live Deployment
                    </span>
                  </div>
                  <a href="https://github.com/gayathri-0902/AMS" target="_blank" className="text-white/30 hover:text-white transition-colors" aria-label="GitHub Link">
                    {githubIcon}
                  </a>
                </div>
                <h3 className="font-[var(--font-space)] text-2xl md:text-3xl font-medium mb-3 group-hover:text-[#60a5fa] transition-colors">
                  AMS — Campus AI Platform
                </h3>
                <p className="text-white/60 leading-relaxed mb-6 md:max-w-2xl">
                  Full-stack campus management system deployed at C R Rao AIMSCS, Telangana — serving real faculty, students, and parents. I architected and built the entire AI engine: a <span className="text-white/80">LangGraph Reflexion agent</span> that iteratively drafts, critiques, and revises assignments across MCQ, written, and coding formats, plus a <span className="text-white/80">hybrid RAG chatbot</span> (ChromaDB + BM25) for branch-specific academic queries — served as a Flask microservice decoupled from the Node.js/React backend.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-[#60a5fa]/80">
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">LangGraph</span>
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">Reflexion Agent</span>
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">Hybrid RAG</span>
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">ChromaDB + BM25</span>
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">Flask</span>
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">MERN</span>
                </div>
              </div>

              {/* Modular RAG */}
              <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[#60a5fa]/30 hover:shadow-2xl hover:shadow-[#60a5fa]/20 hover:-translate-y-1 transition-all duration-300">
                <a href="https://github.com/ZaheerH-03/Modular-RAG" target="_blank" className="absolute top-8 right-8 text-white/30 hover:text-white transition-colors" aria-label="GitHub Link">
                  {githubIcon}
                </a>
                <h3 className="font-[var(--font-space)] text-2xl font-medium mb-3 group-hover:text-[#60a5fa] transition-colors">Modular RAG</h3>
                <p className="text-white/60 leading-relaxed mb-6">
                  Interface-driven RAG pipeline for academic environments. Hybrid retrieval (BGE-M3 dense + BM25 sparse with Reciprocal Rank Fusion), semantic chunking, and a pluggable LLM backend — switch between 4-bit quantized local models or Ollama via a single config file.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-[#60a5fa]/80">
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">Hybrid Retrieval</span>
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">LlamaIndex</span>
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">ChromaDB</span>
                </div>
              </div>

              {/* ExplainableTrack */}
              <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[#60a5fa]/30 hover:shadow-2xl hover:shadow-[#60a5fa]/20 hover:-translate-y-1 transition-all duration-300">
                <a href="https://github.com/ZaheerH-03/ExplainableTrack" target="_blank" className="absolute top-8 right-8 text-white/30 hover:text-white transition-colors" aria-label="GitHub Link">
                  {githubIcon}
                </a>
                <h3 className="font-[var(--font-space)] text-2xl font-medium mb-3 group-hover:text-[#60a5fa] transition-colors">Explainable-Track</h3>
                <p className="text-white/60 leading-relaxed mb-6">
                  Real-time multi-object tracking (YOLOv11 + BoT-SORT) with explainability built in — EigenCAM and LIME for per-detection visual explanations. SRGAN super-resolution and DeblurGAN-v2 in the pre-processing pipeline for enhanced detection on degraded footage.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-[#60a5fa]/80">
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">YOLOv11</span>
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">XAI / EigenCAM</span>
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">BoT-SORT</span>
                </div>
              </div>

              {/* Fortunix */}
              <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[#60a5fa]/30 hover:shadow-2xl hover:shadow-[#60a5fa]/20 hover:-translate-y-1 transition-all duration-300">
                <a href="https://github.com/ZaheerH-03/fortunix" target="_blank" className="absolute top-8 right-8 text-white/30 hover:text-white transition-colors" aria-label="GitHub Link">
                  {githubIcon}
                </a>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded bg-[#c084fc]/10 text-[#c084fc] border border-[#c084fc]/20">
                    Google Solution Challenge 2024
                  </span>
                </div>
                <h3 className="font-[var(--font-space)] text-2xl font-medium mb-3 group-hover:text-[#60a5fa] transition-colors">Fortunix</h3>
                <p className="text-white/60 leading-relaxed mb-6">
                  Full-stack financial literacy platform with an AI assistant, real-time stock sentiment analysis, a gamified investment simulator with virtual funds, and a fraud detection engine — targeting financial inclusion in India. Built with Flutter, FastAPI, and Gemini.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-[#60a5fa]/80">
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">Flutter</span>
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">FastAPI</span>
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">Gemini</span>
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">FinTech</span>
                </div>
              </div>

              {/* SRGAN */}
              <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[#60a5fa]/30 hover:shadow-2xl hover:shadow-[#60a5fa]/20 hover:-translate-y-1 transition-all duration-300">
                <a href="https://github.com/ZaheerH-03/SRGAN" target="_blank" className="absolute top-8 right-8 text-white/30 hover:text-white transition-colors" aria-label="GitHub Link">
                  {githubIcon}
                </a>
                <h3 className="font-[var(--font-space)] text-2xl font-medium mb-3 group-hover:text-[#60a5fa] transition-colors">SuperRes GAN</h3>
                <p className="text-white/60 leading-relaxed mb-6">
                  Research-faithful PyTorch implementation of SRGAN for ×4 photo-realistic super-resolution. VGG16 perceptual loss, PixelShuffle upsampling, adversarial training on DIV2K — achieving PSNR 24.23 dB / SSIM 0.713 with documented training dynamics.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-[#60a5fa]/80">
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">GANs</span>
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">Super Resolution</span>
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">PyTorch</span>
                </div>
              </div>

            </div>

            {/* CONTACT */}
            <div
              ref={contactRef}
              className="mt-16 pt-16 pb-12 border-t border-white/10 flex flex-col items-center text-center"
            >
              <h2 className="font-[var(--font-space)] text-3xl md:text-5xl font-medium mb-3">
                Let&apos;s work together.
              </h2>
              <p className="text-white/40 text-sm mb-10">
                Open to ML/AI engineering roles and research collaborations.
              </p>
              <div className="flex flex-wrap gap-6 items-center justify-center text-sm">
                <a
                  href="mailto:zaheerhussain160304@gmail.com"
                  className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  zaheerhussain160304@gmail.com
                </a>
                <a
                  href="https://github.com/ZaheerH-03"
                  target="_blank"
                  className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                >
                  {githubIcon}
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/zaheer-hussain-9a7946251"
                  target="_blank"
                  className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>

          </motion.div>
        </section>

      </motion.div>
    </main>
  )
}
