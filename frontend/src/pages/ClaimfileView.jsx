import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, TrendingUpDownIcon, ChevronLeft } from 'lucide-react';

const ClaimFileView = ({ claim, onBack, onOpenDocument }) => {
  if (!claim) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="space-y-6"
    >
      {/* Back Button */}
      <button 
        onClick={onBack} 
        className="btn p-5 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
        style={{ color: 'var(--color-accent-soft)', backgroundColor: 'var(--color-leather)' }}
      >
        <ArrowLeft size={18} /> Back
      </button>

      {/* The Physical File Card */}
      <div className="p-10 rounded-xl border-2 shadow-2xl relative overflow-hidden"
           style={{ backgroundColor: 'var(--color-card-bg)', borderColor: 'var(--color-card-border)' }}>
        
        {/* Header */}
        <div className="border-b-2 pb-6 mb-10" style={{ borderColor: 'var(--color-card-border)' }}>
          <h1 className="text-3xl font-black uppercase tracking-tighter" style={{ color: 'var(--color-ink-deep)' }}>
            FILE: {claim.claimNumber}
          </h1>
          <p className="font-mono text-sm uppercase tracking-widest mt-2" style={{ color: 'var(--color-leather)' }}>
            Subject: {claim.client?.firstName} {claim.client?.lastName}
          </p>
        </div>

        {/* Document Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* DOC 1: STATEMENT OF LOSS */}
          <div 
            className="group p-14 border-2 rounded-lg cursor-pointer transition-all hover:bg-white/50 flex flex-col items-center justify-center text-center"
            style={{ borderColor: 'var(--color-card-border)' }}
            onClick={() => onOpenDocument('loss')}
          >
            <FileText size={48} className="mb-6" style={{ color: 'var(--color-success-ink)' }} />
            <h3 className="text-2xl font-bold" style={{ color: 'var(--color-ink-deep)' }}>
              Statement of Loss
            </h3>
          </div>

          {/* DOC 2: SETTLEMENT ESTIMATE */}
          <div 
            className={`group p-14 border-2 rounded-lg cursor-pointer transition-all flex flex-col items-center justify-center text-center ${!claim.settlement ? 'opacity-70 bg-black/5' : 'hover:bg-white/50'}`}
            style={{ borderColor: 'var(--color-card-border)' }}
            onClick={() => onOpenDocument('estimate')}
          >
            <TrendingUpDownIcon size={48} className="mb-6" style={{ color: 'var(--color-success-ink)' }} />
            <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-ink-deep)' }}>
              Settlement Estimate
            </h3>
            
            <p className="text-xs font-mono uppercase opacity-60 mb-6">
              {!claim.settlement ? "No Settlement Estimate Document found." : "Financial Valuation Schedule"}
            </p>

            <button className={`btn btn-sm font-bold text-[10px] uppercase ${!claim.settlement ? 'btn-outline' : 'btn-ghost border-current'}`}>
              {!claim.settlement ? "Initialize Estimate" : "Review Document"}
            </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default ClaimFileView;