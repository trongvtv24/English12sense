"use client"

import InteractiveTimeline from "@/components/timeline/InteractiveTimeline";
import ArcadeZone from "@/components/ArcadeZone";
import { ArrowDown } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <InteractiveTimeline />

      {/* Scroll Down Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-slate-400 bg-white/80 px-6 py-2 rounded-full cursor-pointer hover:bg-white hover:text-amber-500 transition-colors shadow-lg border-2 border-slate-100"
        onClick={() => document.getElementById('arcade-section')?.scrollIntoView({ behavior: 'smooth' })}>
        <span className="font-black uppercase tracking-widest text-xs mb-1">Xuống Khu Vui Chơi</span>
        <ArrowDown className="animate-bounce" size={20} />
      </div>

      <div id="arcade-section" className="min-h-screen bg-slate-50 pt-24 pb-32 border-t-8 border-dashed border-slate-200">
        <ArcadeZone />
      </div>
    </main>
  );
}
