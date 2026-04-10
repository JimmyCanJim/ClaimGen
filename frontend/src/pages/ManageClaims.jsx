import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, DollarSign, Eye, Edit, ChevronLeft, FileSpreadsheet, ArrowLeft, TrendingUpDownIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import StatementOfLoss from '../components/documents/StatementOfLoss';
import ClaimFileView from './ClaimfileView';

const ManageClaims = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  
  // 🚨 NEW STATES FOR NAVIGATION
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [activeDocument, setActiveDocument] = useState(null); 
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const { data } = await axios.get('http://localhost:5001/api/claims/all', { withCredentials: true });
        setClaims(data);
      } catch (error) {
        toast.error("Could not retrieve the claim data.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClaims();
  }, []);

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.claimNumber.toLowerCase().includes(search.toLowerCase()) || 
                          `${claim.client.firstName} ${claim.client.lastName}`.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || claim.status === filter;
    return matchesSearch && matchesFilter;  
  });

  if (activeDocument === 'loss') {
    return (
      <StatementOfLoss 
        data={selectedClaim} 
        onBack={() => setActiveDocument(null)} 
      />
    );
  }

  if (activeDocument === 'estimate') {
    return (
      <SettlementEstimate 
        data={selectedClaim} 
        onBack={() => setActiveDocument(null)} 
      />
    );
  }
  return (
    <div className="p-9 max-w-7xl mx-auto">
      <AnimatePresence mode="wait">
        
        {/* --- VIEW 1: THE MASTER TABLE --- */}
        {!selectedClaim ? (
          <motion.div 
            key="table-view"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
              <button 
                onClick={() => navigate('/dashboard')} 
                className="btn p-5 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
                style={{ color: 'var(--color-accent-soft)', backgroundColor: 'var(--color-leather)' }}>
                <ArrowLeft size={18} /> Back
              </button>
              <div>
                <h1 className="text-4xl font-black tracking-tighter" style={{ color: 'var(--color-leather)' }}>
                  Claim <span style={{ color: 'var(--color-ink-deep)' }}>Management</span>
                </h1>
                <p className="font-bold text-s uppercase tracking-widest mt-2" style={{color: 'var(--color-accent)'}}>Total Entries: {claims.length}</p>
              </div>

              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 opacity-30" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search Claims..." 
                    className="input pl-10 w-64 rounded-md border-2 ledger-input-dark"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <select 
                  className="select border-2 rounded-md p-2"
                  style={{ backgroundColor: 'var(--color-card-bg)', borderColor: 'var(--color-card-border)', width: '8rem'}}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option vlaue="In Progress">In Progress</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border-2 shadow-xl" style={{ backgroundColor: 'var(--color-card-bg)', borderColor: 'var(--color-card-border)' }}>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr style={{ backgroundColor: 'var(--color-card-darker)', borderBottom: '2px solid var(--color-card-border)' }}>
                    <th className="p-4 font-bold text-[12px] uppercase tracking-widest">Ref. Number</th>
                    <th className="p-4 font-bold text-[12px] uppercase tracking-widest">Client Name</th>
                    <th className="p-4 font-bold text-[12px] uppercase tracking-widest">Provider</th>
                    <th className="p-4 font-bold text-[12px] uppercase tracking-widest">Date Filed</th>
                    <th className="p-4 font-bold text-[12px] uppercase tracking-widest">Status</th>
                    <th className="p-4 font-bold text-[12px] uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredClaims.map((claim) => (
                    <motion.tr 
                      key={claim._id}
                      onClick={() => setSelectedClaim(claim)} 
                      className="border-b last:border-b-0 hover:bg-black/5 transition-colors group cursor-pointer"
                      style={{ borderColor: 'var(--color-card-border)' }}
                    >
                      <td className="p-4 font-bold" style={{ color: 'var(--color-ink-deep)' }}>
                        {claim.claimNumber}
                      </td>

                      <td className="p-4">
                        <div className="font-bold">{claim.client?.firstName} {claim.client?.lastName}</div>
                        <div className="text-[10px] opacity-80 font-bold">{claim.client.email}</div>
                      </td>

                      <td className="p-4 text-sm">
                        {claim.insurance?.provider || "N/A"}
                      </td>
                      <td className="p-4 text-sm opacity-80">
                        {new Date(claim.createdAt).toLocaleDateString()}
                      </td>

                      <td className="p-4">
                        <span className="px-2 py-1 rounded text-[9px] font-black uppercase border"
                          style={{ color: claim.status === 'Approved' ? 'var(--color-success-ink)' : 'var(--color-error-ink)', borderColor: claim.status === 'Approved' ? 'var(--color-success-ink)' : 'var(--color-error-ink)' }}>
                          {claim.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Eye size={16} style={{ color: 'var(--color-leather)' }} />
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              {filteredClaims.length === 0 && !loading && (
                <div className="p-20 text-center flex flex-col items-center opacity-40">
                  <FileSpreadsheet size={48} className="mb-4" />
                  <p className="font-serif italic text-lg">No claims found.</p>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <ClaimFileView 
          key="folder"
          claim="{selectedClaim}"
          onBack={() => setSelectedClaim(null)}
          onOpenDocument={setActiveDocument}/>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageClaims;
