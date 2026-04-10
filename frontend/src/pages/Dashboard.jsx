import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { FileText, Clock, MapPin, ChevronRight, UserCircle, Calendar, ChevronLeft, ArrowLeft, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import StatementOfLoss from '../components/documents/StatementOfLoss';
import ClaimFileView from "./ClaimfileView"; // 🚨 Ensure path is correct

const Dashboard = () => {
  const [userName] = useState(() => localStorage.getItem("user_name") || "Assessor");
  const [claims, setClaims] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // NAVIGATION STATES
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [activeDocument, setActiveDocument] = useState(null);

  useEffect(() => {
    const fetchRecentClaims = async () => {
      try {
        const { data } = await axios.get('http://localhost:5001/api/claims/all', { 
          withCredentials: true 
        });
        setClaims(data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };
    fetchRecentClaims();
  }, []);

  const filteredClaims = claims.filter(claim => {
    const claimDate = new Date(claim.createdAt);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const isRecent = claimDate >= sevenDaysAgo;
    const matchesSearch = claim.claimNumber?.toLowerCase().includes(search.toLowerCase()) || 
                          `${claim.client?.firstName} ${claim.client?.lastName}`.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || claim.status === filter;
    return isRecent && matchesSearch && matchesFilter;
  });

  // 🚨 VIEW 3: FULL DOCUMENT VIEW (Statement of Loss)
  if (activeDocument === 'loss') {
    return <StatementOfLoss data={selectedClaim} onBack={() => setActiveDocument(null)} />;
  }

  // 🚨 ADD SETTLEMENT ESTIMATE VIEW HERE LATER

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      <main className='mx-auto max-w-7xl p-6'>
        <AnimatePresence mode="wait">
          {!selectedClaim ? (
            /* --- VIEW 1: DASHBOARD GRID --- */
            <motion.div 
              key="dashboard-grid"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className='mb-8'>
                <h1 className="text-4xl font-black tracking-tight text-base-content">
                  Welcome back, <span style={{ color: 'var(--color-leather)' }}> {userName}</span>
                </h1>
                <p className="font-mono text-[10px] uppercase tracking-widest opacity-50 mt-2">
                  Active Ledger // Last 7 Days
                </p>
              </div>

              {/* Stats Section */}
              <div className='stats stats-vertical lg:stats-horizontal w-full rounded-md shadow-lg mb-10'
                style={{ backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--color-card-border)' }}>
                <div className='stat group border-r border-base-content/5'>
                  <div className='stat-figure text-primary'>
                    <FileText className="size-8 transition-transform group-hover:scale-110" style={{ color: 'var(--color-accent)' }} />
                  </div>
                  <div className='stat-title uppercase text-[10px] font-bold tracking-widest' style={{ color: 'var(--color-ink)' }}>Total Claims</div>
                  <div className='stat-value text-2xl' style={{ color: 'var(--color-accent)' }}>{claims.length}</div>
                </div>
                <div className='stat group'>
                  <div className='stat-figure'>
                    <Clock className='size-8 transition-transform group-hover:scale-110' style={{ color: 'var(--color-accent)' }} />
                  </div>
                  <div className="stat-title uppercase text-[10px] font-bold tracking-widest" style={{ color: 'var(--color-ink)' }}>Pending Action</div>
                  <div className="stat-value text-2xl" style={{ color: 'var(--color-accent)' }}>
                    {claims.filter(c => c.status === 'Pending').length}
                  </div>
                </div>
              </div>

              <section className="space-y-6">
                <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--color-card-border)' }}>
                  <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--color-ink-deep)' }}>Recent Assessments</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredClaims.map((claim) => {
                    const daysOld = Math.floor((new Date() - new Date(claim.createdAt)) / (1000 * 60 * 60 * 24));
                    return (
                      <motion.div 
                        key={claim._id}
                        onClick={() => setSelectedClaim(claim)}
                        className="group p-6 rounded-xl border-2 transition-all hover:shadow-2xl relative overflow-hidden cursor-pointer"
                        style={{ backgroundColor: 'var(--color-card-bg)', borderColor: 'var(--color-card-border)' }}
                      >
                        {daysOld <= 1 && (
                          <span className="absolute -top-1 -left-1 bg-accent text-white text-[8px] font-bold px-3 py-1 rounded-br-lg uppercase z-20">New</span>
                        )}
                        <div className="flex justify-between items-start mb-6 relative z-10">
                          <span className="font-mono text-[12px] uppercase tracking-widest font-bold text-[var(--color-pencil)]">{claim.claimNumber}</span>
                          <div className='px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter border'
                            style={{ color: claim.status === 'Approved' ? 'var(--color-success-ink)' : 'var(--color-error-ink)', borderColor: 'currentColor' }}>
                            {claim.status}
                          </div>
                        </div>
                        <div className="space-y-1 mb-6 relative z-10">
                          <h3 className="text-lg font-bold tracking-tight text-[var(--color-ink-deep)]">{claim.client?.firstName} {claim.client?.lastName}</h3>
                          <p className="text-sm flex items-center gap-2 text-[var(--color-ink-secondary)]">
                            <UserCircle size={14} style={{ color: 'var(--color-leather)' }} />
                            {claim.insurance?.provider}
                          </p>
                        </div>
                        <div className="pt-4 border-t flex justify-between items-center" style={{ borderColor: 'var(--color-card-border)' }}>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-[10px] font-mono opacity-50"><Clock size={10} />{new Date(claim.createdAt).toLocaleDateString()}</div>
                          </div>
                          <div className="p-2 rounded-md transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                            <ChevronRight size={16} />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            </motion.div>
          ) : (
            /* --- VIEW 2: THE SHARED FOLDER COMPONENT --- */
            <ClaimFileView 
              claim={selectedClaim}
              onBack={() => setSelectedClaim(null)}
              onOpenDocument={setActiveDocument}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;