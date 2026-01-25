'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import NeuralCloud from './components/NeuralCloud'
import { useEffect } from 'react'



export default function Home() {
  const [view, setView] = useState<'hero' | 'projects'>('hero')
  const [textIndex, setTextIndex] = useState(0)

  const titles = [
    "AI & Computer Vision Researcher",
    "Generative AI Specialist",
    "RAG Systems Engineer"
  ]

  const colors = [
    "#60a5fa", // Blue for CV
    "#c084fc", // Purple for Gen AI
    "#2dd4bf"  // Teal for RAG
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % titles.length)
    }, 4000) // Slightly slower for relaxed feel
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#0b0d10] text-white selection:bg-[#60a5fa] selection:text-white">

      {/* ===== BACKGROUND: NEURAL CLOUD ===== */}
      <div className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-700 ease-in-out ${view === 'projects' ? 'opacity-20' : 'opacity-100'}`}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <NeuralCloud color={colors[textIndex]} />
        </Canvas>
      </div>

      {/* ===== HEADER AREA ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6 md:px-20 flex items-center justify-between pointer-events-none">
        {/* Magic Motion Title Target */}
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

        {/* Nav Links */}
        <div className="flex gap-8 text-sm text-white/70 pointer-events-auto">
          <button
            onClick={() => setView('hero')}
            className={`hover:text-white transition-colors ${view === 'hero' ? 'text-white' : ''}`}
          >
            Home
          </button>
          <a href="/resume.pdf" target="_blank" className="hover:text-white transition-colors">
            Resume
          </a>
        </div>
      </header>

      {/* ===== SCROLLABLE CONTENT CONTAINER (LOCKED SCROLL) ===== */}
      <motion.div
        className="relative z-10 w-full h-full"
        initial={false}
        animate={{ y: view === 'hero' ? 0 : '-100%' }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }} // Slower, relaxed spring
      >

        {/* ===== HERO SECTION ===== */}
        <section className="h-screen w-full flex flex-col justify-center px-8 md:px-20 relative">
          <div className="max-w-4xl z-10">
            {view === 'hero' && (
              <motion.h1
                layoutId="name-title"
                className="
                    font-[var(--font-space)]
                    text-4xl md:text-7xl
                    font-medium
                    tracking-tight
                    leading-tight
                    inline-block
                  "
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              >
                Shaik Zaheer Hussain
              </motion.h1>
            )}

            <motion.div
              key={textIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="mt-6 text-white/60 text-sm md:text-xl max-w-lg leading-relaxed h-8"
            >
              {titles[textIndex]}
            </motion.div>
          </div>





          <motion.button
            onClick={() => setView('projects')}
            className="
              absolute bottom-12 left-1/2 -translate-x-1/2
              w-12 h-12
              flex items-center justify-center
              text-white/80 hover:text-white hover:bg-white/10
              bg-black/20 backdrop-blur-sm
              rounded-full
              transition-all
              cursor-pointer
            "
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            aria-label="View Projects"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </motion.button>
        </section>

        {/* ===== PROJECTS SECTION ===== */}
        <section className="h-screen w-full px-8 md:px-20 py-32 overflow-hidden flex flex-col">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="h-full w-full max-w-6xl mx-auto flex flex-col"
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="h-[1px] w-12 bg-[#60a5fa]/50"></div>
              <p className="text-xs font-bold tracking-[0.2em] text-[#60a5fa] uppercase">
                My Work
              </p>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 pb-6 min-h-0">
              {/* Project 1 */}
              <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[#60a5fa]/30 hover:shadow-2xl hover:shadow-[#60a5fa]/20 hover:-translate-y-1 transition-all duration-300">
                <a href="#" className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors" aria-label="GitHub Link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                </a>
                <h3 className="font-[var(--font-space)] text-2xl font-medium mb-3 group-hover:text-[#60a5fa] transition-colors">Adaptive RAG System</h3>
                <p className="text-white/60 leading-relaxed mb-6">Retrieval-augmented generation pipeline that intelligently routes user queries using semantic chunking and task-aware agents.</p>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-[#60a5fa]/80">
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">Semantic Search</span>
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">LLMs</span>
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">Agentic Routing</span>
                </div>
              </div>

              {/* Project 2 */}
              <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[#60a5fa]/30 hover:shadow-2xl hover:shadow-[#60a5fa]/20 hover:-translate-y-1 transition-all duration-300">
                <a href="#" className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors" aria-label="GitHub Link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                </a>
                <h3 className="font-[var(--font-space)] text-2xl font-medium mb-3 group-hover:text-[#60a5fa] transition-colors">Object Detection Pipeline</h3>
                <p className="text-white/60 leading-relaxed mb-6">Real-time object detection system integrated with tracking algorithms and Explainable AI (XAI) for transparent decision making.</p>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-[#60a5fa]/80">
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">Computer Vision</span>
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">XAI</span>
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">Real-time</span>
                </div>
              </div>

              {/* Project 3 */}
              <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[#60a5fa]/30 hover:shadow-2xl hover:shadow-[#60a5fa]/20 hover:-translate-y-1 transition-all duration-300">
                <a href="#" className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors" aria-label="GitHub Link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                </a>
                <h3 className="font-[var(--font-space)] text-2xl font-medium mb-3 group-hover:text-[#60a5fa] transition-colors">EEG Data Augmentation</h3>
                <p className="text-white/60 leading-relaxed mb-6">Medical data synthesis framework using Conditional GANs (CGans) to augment EEG datasets for improved classification models.</p>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-[#60a5fa]/80">
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">GANs</span>
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">Medical AI</span>
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">PyTorch</span>
                </div>
              </div>

              {/* Project 4 */}
              <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[#60a5fa]/30 hover:shadow-2xl hover:shadow-[#60a5fa]/20 hover:-translate-y-1 transition-all duration-300">
                <a href="#" className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors" aria-label="GitHub Link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                </a>
                <h3 className="font-[var(--font-space)] text-2xl font-medium mb-3 group-hover:text-[#60a5fa] transition-colors">Fortunix</h3>
                <p className="text-white/60 leading-relaxed mb-6">A finance-driven RAG system designed to provide personalized financial guidance and improve financial literacy.</p>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-[#60a5fa]/80">
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">FinTech</span>
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">RAG</span>
                  <span className="px-2 py-1 rounded bg-[#60a5fa]/10">Finance</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

      </motion.div>
    </main>
  )
}
