import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Printer } from 'lucide-react';

const StatementOfLoss = ({ data, onBack }) => {
  if (!data) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto p-4">
       {/* UI Controls (Hidden on Print) */}
       <div className="flex justify-between mb-6 print:hidden">
          <button onClick={onBack} className="flex items-center gap-2 text-xs font-bold uppercase opacity-60">
            <ArrowLeft size={14} /> Return to File
          </button>
          <button onClick={() => window.print()} className="btn btn-sm bg-stone-800 text-white gap-2">
            <Printer size={14} /> Print Statement
          </button>
       </div>

       {/* THE PHYSICAL SHEET */}
       <div className="bg-[#fdfaf6] p-16 shadow-2xl border border-black/10 min-h-[1056px] text-stone-900 font-serif">
          <header className="border-b-4 border-black pb-4 mb-8">
            <h1 className="text-3xl font-black uppercase italic">Statement of Loss</h1>
            <p className="font-mono text-xs">Official Record // Ref: {data.claimNumber}</p>
          </header>

          {/* Data Mapping Here */}
          <div className="space-y-8">
            <section>
              <h4 className="font-mono text-[10px] uppercase font-bold mb-2">I. Insured Information</h4>
              <p><strong>Name:</strong> {data.client.firstName} {data.client.lastName}</p>
              <p><strong>Address:</strong> {data.client.address}</p>
            </section>
            {/* ... more sections */}
          </div>
       </div>
    </motion.div>
  );
};

export default StatementOfLoss;