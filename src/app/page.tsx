"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Database, 
  Layers, 
  Lock, 
  Zap, 
  Award, 
  Star, 
  CheckCircle2, 
  TrendingUp, 
  Shield, 
  Quote
} from "lucide-react";

// Staggered Container Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 flex flex-col selection:bg-blue-500/30 overflow-hidden relative">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-10%] left-[-15%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[50%] h-[55%] bg-purple-600/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Sticky Navigation Bar */}
      <nav className="border-b border-zinc-900/60 bg-zinc-950/20 backdrop-blur-md sticky top-0 z-30 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center font-black text-white text-sm shadow-[0_0_12px_rgba(59,130,246,0.3)]">
              N
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white">Next-Gen Academy</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#stats" className="hover:text-white transition-colors">Stats</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
          </div>

          <div>
            <Link 
              href="/dashboard"
              className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 hover:from-blue-500/20 hover:to-indigo-500/20 border border-blue-500/30 hover:border-blue-500/50 rounded-xl text-xs font-bold text-blue-400 hover:text-blue-300 transition-all cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.1)]"
            >
              Enter Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Left Side: Copywriting */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-7 space-y-8 text-center lg:text-left"
        >
          {/* Release Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-black uppercase tracking-wider text-blue-400 mx-auto lg:mx-0">
            <Sparkles className="h-3.5 w-3.5" />
            Empowering Modern Developers
          </div>

          {/* Headlines */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.08] text-white">
              Learn at the Speed <br />
              of Next-Gen Tech.
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Step into an immersive, statistics-driven academy built on top of Next.js 16, Supabase, Framer Motion, and Tailwind CSS.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link
              href="/dashboard"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-extrabold rounded-2xl shadow-lg shadow-blue-500/15 border border-blue-400/20 hover:border-blue-400/30 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Enter Dashboard
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-zinc-900/60 hover:bg-zinc-900 text-zinc-300 hover:text-white font-bold rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all"
            >
              Explore Features
            </a>
          </div>

          {/* Mini Highlights */}
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-8 gap-y-3 pt-4 text-xs font-semibold text-zinc-500">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Free sandbox playground
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Interactive charts
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Certified tracks
            </span>
          </div>
        </motion.div>

        {/* Right Side: Interactive Mockup Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="lg:col-span-5 relative flex justify-center items-center h-[420px]"
        >
          {/* Decorative Glow Ring */}
          <div className="absolute w-72 h-72 rounded-full border border-blue-500/20 bg-blue-500/5 animate-pulse filter blur-xl pointer-events-none" />

          {/* Mockup Card 1: Completed Course */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-8 left-0 sm:left-4 p-5 bg-zinc-900/80 border border-zinc-800/90 rounded-2xl w-64 shadow-2xl backdrop-blur-md z-10"
          >
            <div className="flex justify-between items-center mb-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20">
                <Database className="h-4 w-4" />
              </div>
              <span className="text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                Completed
              </span>
            </div>
            <h4 className="text-xs font-bold text-white mb-2.5">Supabase Backend Architecture</h4>
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full w-full rounded-full" />
            </div>
            <div className="flex justify-between items-center mt-3 text-[10px] text-zinc-500 font-bold">
              <span>Progress</span>
              <span className="text-emerald-400">100%</span>
            </div>
          </motion.div>

          {/* Mockup Card 2: Active Course */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-8 right-0 sm:right-4 p-5 bg-zinc-900/80 border border-zinc-800/90 rounded-2xl w-64 shadow-2xl backdrop-blur-md z-10"
          >
            <div className="flex justify-between items-center mb-3">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
                <Cpu className="h-4 w-4" />
              </div>
              <span className="text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                In Progress
              </span>
            </div>
            <h4 className="text-xs font-bold text-white mb-2.5">Advanced Next.js 16 Routing</h4>
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full w-[72%] rounded-full" />
            </div>
            <div className="flex justify-between items-center mt-3 text-[10px] text-zinc-500 font-bold">
              <span>Progress</span>
              <span className="text-blue-400">72%</span>
            </div>
          </motion.div>

          {/* Mockup Card 3: Metrics summary */}
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute p-4 bg-zinc-900/90 border border-zinc-800/90 rounded-2xl w-48 shadow-2xl backdrop-blur-md z-20 flex items-center gap-3.5"
          >
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[9px] text-zinc-500 font-extrabold uppercase block">Weekly Growth</span>
              <span className="text-base font-black text-white block">+28.4%</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Statistics Section */}
      <section id="stats" className="border-y border-zinc-900 bg-zinc-950/40 relative z-10 py-16 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
          >
            {/* Stat Item 1 */}
            <motion.div variants={itemVariants} className="space-y-1">
              <span className="text-xs uppercase tracking-widest font-black text-zinc-500">Active Learners</span>
              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-300">
                15,200+
              </h3>
              <p className="text-[11px] text-zinc-500 font-semibold">Developers from 80+ countries</p>
            </motion.div>

            {/* Stat Item 2 */}
            <motion.div variants={itemVariants} className="space-y-1">
              <span className="text-xs uppercase tracking-widest font-black text-zinc-500">Certified Tracks</span>
              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                120+
              </h3>
              <p className="text-[11px] text-zinc-500 font-semibold">Curated engineering tracks</p>
            </motion.div>

            {/* Stat Item 3 */}
            <motion.div variants={itemVariants} className="space-y-1">
              <span className="text-xs uppercase tracking-widest font-black text-zinc-500">Completion Rate</span>
              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-300">
                98.6%
              </h3>
              <p className="text-[11px] text-zinc-500 font-semibold">Guided sandbox steps</p>
            </motion.div>

            {/* Stat Item 4 */}
            <motion.div variants={itemVariants} className="space-y-1">
              <span className="text-xs uppercase tracking-widest font-black text-zinc-500">Satisfaction Score</span>
              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                4.92 / 5
              </h3>
              <p className="text-[11px] text-zinc-500 font-semibold">Rated by senior engineers</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 z-10 relative w-full space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-black text-blue-500">Engineering Excellence</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Features Tailored for Growth
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-medium">
            No cookie-cutter templates. A robust, fast, and structured framework engineered for serious learners.
          </p>
        </div>

        {/* 3x2 Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Feature Card 1 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -4, borderColor: "rgba(59, 130, 246, 0.4)" }}
            className="p-6 bg-zinc-900/30 border border-zinc-800/80 rounded-2xl backdrop-blur-sm space-y-4 transition-colors"
          >
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl inline-block">
              <Cpu className="h-5 w-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-white">Next.js 16 Framework</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                Harness page caching, dynamic SSR routing layouts, and async response headers out of the box.
              </p>
            </div>
          </motion.div>

          {/* Feature Card 2 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -4, borderColor: "rgba(99, 102, 241, 0.4)" }}
            className="p-6 bg-zinc-900/30 border border-zinc-800/80 rounded-2xl backdrop-blur-sm space-y-4 transition-colors"
          >
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl inline-block">
              <Database className="h-5 w-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-white">Supabase SSR Auth</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                Integrated cookies handler with middleware token refresh. Zero authentication leaks or desyncs.
              </p>
            </div>
          </motion.div>

          {/* Feature Card 3 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -4, borderColor: "rgba(168, 85, 247, 0.4)" }}
            className="p-6 bg-zinc-900/30 border border-zinc-800/80 rounded-2xl backdrop-blur-sm space-y-4 transition-colors"
          >
            <div className="p-3 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl inline-block">
              <Layers className="h-5 w-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-white">Framer Motion Animation</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                Highly aesthetic page mounts, list staggered entries, and micro-hover spring effects.
              </p>
            </div>
          </motion.div>

          {/* Feature Card 4 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -4, borderColor: "rgba(59, 130, 246, 0.4)" }}
            className="p-6 bg-zinc-900/30 border border-zinc-800/80 rounded-2xl backdrop-blur-sm space-y-4 transition-colors"
          >
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl inline-block">
              <Lock className="h-5 w-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-white">Row Level Security</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                Restricted user boundaries enforced directly at the database layer. Safe by default.
              </p>
            </div>
          </motion.div>

          {/* Feature Card 5 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -4, borderColor: "rgba(99, 102, 241, 0.4)" }}
            className="p-6 bg-zinc-900/30 border border-zinc-800/80 rounded-2xl backdrop-blur-sm space-y-4 transition-colors"
          >
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl inline-block">
              <Zap className="h-5 w-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-white">WASM Fallback Engine</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                Ensures successful production compiling across locked environments by utilizing WASM compilers.
              </p>
            </div>
          </motion.div>

          {/* Feature Card 6 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -4, borderColor: "rgba(168, 85, 247, 0.4)" }}
            className="p-6 bg-zinc-900/30 border border-zinc-800/80 rounded-2xl backdrop-blur-sm space-y-4 transition-colors"
          >
            <div className="p-3 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl inline-block">
              <Shield className="h-5 w-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-white">Strict TypeScript Schema</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                Strict type boundaries mapped to database columns. Missing parameters fail compiler checks.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="border-t border-zinc-900 bg-zinc-950/20 relative z-10 py-24 w-full space-y-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-widest font-black text-indigo-500">Learner Reviews</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Trusted by Devs Worldwide
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-medium">
              Here is what software engineers, frontend architects, and systems developers say.
            </p>
          </div>

          {/* Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Testimonial 1 */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5, borderColor: "rgba(59, 130, 246, 0.3)" }}
              className="p-6 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl flex flex-col justify-between backdrop-blur-sm relative transition-all"
            >
              <Quote className="absolute top-6 right-6 h-10 w-10 text-zinc-800/45 pointer-events-none" />
              <div className="space-y-4">
                <div className="flex gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                </div>
                <p className="text-xs leading-relaxed text-zinc-300 font-medium">
                  &quot;The course layout is incredibly sleek. RLS integration on the getCourses endpoint gave me a clear reference architecture for building corporate-ready interfaces.&quot;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-6 border-t border-zinc-800/40 mt-6">
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center font-extrabold text-xs text-white">
                  SK
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Sarah K.</h4>
                  <span className="text-[10px] text-zinc-500 font-bold block">Frontend Tech Lead</span>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5, borderColor: "rgba(99, 102, 241, 0.3)" }}
              className="p-6 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl flex flex-col justify-between backdrop-blur-sm relative transition-all"
            >
              <Quote className="absolute top-6 right-6 h-10 w-10 text-zinc-800/45 pointer-events-none" />
              <div className="space-y-4">
                <div className="flex gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                </div>
                <p className="text-xs leading-relaxed text-zinc-300 font-medium">
                  &quot;Next-Gen Academy has saved me weeks of backend boilerplate setup. RLS controls combined with strict typing definitions made tracking my lessons breeze.&quot;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-6 border-t border-zinc-800/40 mt-6">
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center font-extrabold text-xs text-white">
                  ML
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Marcus L.</h4>
                  <span className="text-[10px] text-zinc-500 font-bold block">Full Stack Developer</span>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5, borderColor: "rgba(168, 85, 247, 0.3)" }}
              className="p-6 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl flex flex-col justify-between backdrop-blur-sm relative transition-all"
            >
              <Quote className="absolute top-6 right-6 h-10 w-10 text-zinc-800/45 pointer-events-none" />
              <div className="space-y-4">
                <div className="flex gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                </div>
                <p className="text-xs leading-relaxed text-zinc-300 font-medium">
                  &quot;The motion design and page loaders are fantastic. It creates an incredibly responsive experience that sets a new bar for what learning portals should feel like.&quot;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-6 border-t border-zinc-800/40 mt-6">
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center font-extrabold text-xs text-white">
                  ED
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Elena D.</h4>
                  <span className="text-[10px] text-zinc-500 font-bold block">UI/UX Engineer</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-indigo-950/30 border border-zinc-800/80 rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden space-y-6"
        >
          {/* Top light beam overlay */}
          <div className="absolute top-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
          <div className="absolute inset-0 bg-radial-gradient from-blue-500/5 to-transparent pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-black uppercase tracking-wider text-indigo-400">
            <Award className="h-3.5 w-3.5" />
            Interactive Progress Metrics
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-2xl mx-auto">
            Ready to Accelerate Your <br /> Learning Progress?
          </h2>
          
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed font-medium">
            Access secure server-rendered course lists and real-time completions metrics on your customized learning board.
          </p>

          <div className="pt-4">
            <Link
              href="/dashboard"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-zinc-100 text-black font-extrabold rounded-2xl shadow-xl shadow-white/5 border border-white hover:border-zinc-200 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
            >
              Enter Learning Dashboard
              <ArrowRight className="h-4 w-4 text-black group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950/20 py-8 relative z-10 w-full mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-medium">
          <span>&copy; {new Date().getFullYear()} Next-Gen Learning Dashboard. All rights reserved.</span>
          <div className="flex gap-6">
            <span className="flex items-center gap-1">
              <Lock className="h-3.5 w-3.5" /> Secure Session Cookies
            </span>
            <span className="flex items-center gap-1">
              <Zap className="h-3.5 w-3.5" /> WASM Webpack Fallback
            </span>
          </div>
        </div>
      </footer>

    </main>
  );
}
