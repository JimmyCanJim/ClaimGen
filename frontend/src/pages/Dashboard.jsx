import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { FileText, Clock, MapPin, ChevronRight, ShieldAlert, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [userName] = useState(() => {
    return localStorage.getItem("user_name") || "Assessor";
  });
  
  const recentClaims = [
    { id: "CLM-8821", policy: "Auto - Full Coverage", holder: "Sarah Jenkins", status: "In Review", date: "2 Hours ago", urgency: "High" },
    { id: "CLM-8822", policy: "Property - Structural", holder: "Marcus Thorne", status: "Approved", date: "5 Hours ago", urgency: "Medium" },
    { id: "CLM-8823", policy: "Marine - Cargo", holder: "Logistics Pro Ltd", status: "Pending", date: "1 Day ago", urgency: "Low" },
  ];
  
  return (
    <div className="min-h-screen">
      <Navbar/>

      <main className='mx-auto max-w-8xl p-6'>

        <div className = 'mb-8'>
            <h1 className="text-4xl font-black tracking-tight text-neutral">
              Welcome back, <span className="text-primary italic"> {userName}</span>
            </h1>
        </div>

        <div className='stats stats-vertical lg:stats-horizontal shadow-sm bg-base-200 w-full border border-neutral/10 rounded-xl'>
            <div className='stat transition-all duration-400 hover:bg-base-300 group border-r border-neutral/5'> 
                <div className='stat-figure text-primary'>
                    <FileText className="size-8 group-hover:scale-110 transition-transform"/>
                </div>
                <div className='stat-title text-neutal/60 uppercase text-[10px] tracking-widest'>Total Claims</div>
                <div className='stat-value text-primary'>48</div>

            </div>

            <div className='stat transition-all duration-400 hover:bg-base-300 group'>
                <div className='stat-figure text-secondary'>
                    <Clock className='size-8 group-hover:animate-spin-slow transition-transform'/>
                </div>
                <div className="stat-title text-base-content/70">Pending Assessment</div>
                <div className="stat-value text-secondary">12</div>
                <div className="stat-desc">6 high-priority (KZN Floods)</div>
            </div>
        </div>

        <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="text-primary" size={20} />
            Recent Assessments
          </h2>
          <button className="text-[10px] font-mono uppercase tracking-widest text-primary hover:underline">
            View All Records
          </button>
        </div>

        {/* THE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentClaims.map((claim) => (
            <motion.div 
              key={claim.id}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group bg-base-100 border border-neutral/20 p-6 rounded-lg hover:shadow-2xl hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden"
            >
              {/* Subtle accent glow in the corner of the card */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 blur-2xl rounded-full group-hover:bg-primary/10 transition-colors"></div>

              {/* Header: ID and Status */}
              <div className="flex justify-between items-start mb-6">
                <span className="font-mono text-[10px] text-neutral/40 uppercase tracking-widest">
                  {claim.id}
                </span>
                {/* DYNAMIC BADGE */}
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                  claim.status === 'Approved' ? 'bg-success-20 text-success' : 'bg-warning/20 text-warning'
                }`}>
                  {claim.status}
                </div>
              </div>

              {/* Content: Title and Holder */}
              <div className="space-y-1 mb-6">
                <h3 className="text-lg font-bold text-neutral group-hover:text-primary transition-colors">
                  {claim.policy}
                </h3>
                <p className="text-sm text-neutral/60 flex items-center gap-2">
                  <UserCircle size={14} className="opacity-40" />
                  {claim.holder}
                </p>
              </div>

              {/* Footer: Date and Action */}
              <div className="pt-4 border-t border-neutral/5 flex justify-between items-center">
                <div className="flex items-center gap-2 text-xs text-neutral/40 font-mono">
                  <Clock size={12} />
                  {claim.date}
                </div>
                <div className="p-2 rounded-md bg-neutral/5 text-white/20 group-hover:bg-primary group-hover:text-black transition-all">
                  <ChevronRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      </main>
      
    </div>
  )
}

export default Dashboard
