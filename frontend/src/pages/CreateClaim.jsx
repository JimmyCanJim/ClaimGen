import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { FileText, DollarSign, AlignLeft, ArrowLeft, Send, Plus, Trash2, ShieldCheck, MapPin, Edit3 } from 'lucide-react';

const CreateClaim = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const [claimId, setClaimId] = useState("Generating...");

  const [formData, setFormData] = useState({ 
    claimId: '',
    clientName: '', 
    dasNumber: '', 
    phoneNumbers: ['+27 '],
    email: '',
    address: '',
    insuranceProvider: '',
    customInsurance: '',
    advisor: '',
    natureOfClaim: ''
    
  });

  useEffect(() => {
    const fetchUniqueId = async () => {
      try {
        const {data} = await axios.get('http://localhost:5001/api/claims/generate-id', { 
          withCredentials: true
        });
        setClaimId(data.claimId);
        setFormData(prev => ({...prev, claimId: data.claimId}));  
        
      } catch (error) {
        toast.error("Failed to connect to ID generator.", error);
        setClaimId("ERROR-REFRESH")
      }
    };

    fetchUniqueId();
  }, []);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    const {name, value} = e.target;

    if (name == 'email') {
      setEmailError(value.length > 0 && !validateEmail(value));
  } 
  
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('http://localhost:5001/api/claims/create', formData, {
        withCredentials: true,
      });

      toast.success("Claim submitted successfully!");
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to submit claim.");
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (index, value) => {
    const newPhones = [...formData.phoneNumbers];
    newPhones[index] = value;
    if (!value.startsWith('+27 ')) {
      value = '+27 ';
    }
    setFormData({ ...formData, phoneNumbers: newPhones });
  };

  const addPhoneField = () => {
    setFormData({ 
      ...formData, 
      phoneNumbers: [...formData.phoneNumbers, '+27 '] 
    });
  };

  const removePhoneField = (index) => {
    if (formData.phoneNumbers.length > 1) {
      const newPhones = formData.phoneNumbers.filter((_, i) => i !== index);
      setFormData({ ...formData, phoneNumbers: newPhones });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-base-200/50 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl"
      >
        <button onClick={() => navigate('/dashboard')} className="btn btn-ghost btn-sm gap-2">
          <ArrowLeft size={18} /> Back
        </button>

        {/* Header */}
        <div className="
          mx-auto      
          mt-10       
          mb-10       
          max-w-2xl    
          p-10         
          border      
          rounded-3xl  
          bg-base-200  
          items-center
          ">
          <h2 className="text-2xl flex font-bold text-primary justify-center mb-2">New Claim Submission</h2>
          <span className="text-sm flex font-mono opacity-50 justify-center">Reference: {claimId}</span>
        </div>

        <div className = "flex flex-col font-bold text-primary">
          <h2 className="text-2xl font-bold text-primary"></h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Client Name */}
          <div className="form-control">
            <label className="label text-xs uppercase tracking-widest opacity-60">Client Name</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3.5 opacity-40" size={20} />
              <input 
                type="text" name="clientName" required
                placeholder="Name & Surname"
                className="input input-bordered w-full pl-12 bg-base-300/50 focus:border-primary transition-all"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* DAS Number */}
          <div className="form-control">
            <label className="label text-xs uppercase tracking-widest opacity-60">DAS No.</label>
            <div className="relative">
              <input 
                type="text" name="dasNumber" required
                placeholder="123-456-789"
                className="input input-bordered w-full pl-12 bg-base-300/50"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Phone number */}
          <div className="form-control">
            <label className="label text-xs uppercase tracking-widest opacity-60">Phone Number/s</label>
          
              <div className="space-y-3">
                  {formData.phoneNumbers.map((phone, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="relative flex-grow">
                        <span className="absolute left-3 top-3.5 opacity-40 text-xs font-mono">#{index + 1}</span>
                        <input 
                          type="text" 
                          value={phone}
                          placeholder="+27 00 000 0000"
                          className="input input-bordered w-full pl-10 bg-base-300/50"
                          onChange={(e) => handlePhoneChange(index, e.target.value)}
                          required
                        />
                      </div>
                      
                      {/* Remove Button (only show if more than one field) */}
                      {formData.phoneNumbers.length > 1 && (
                        <button 
                          type="button"
                          onClick={() => removePhoneField(index)}
                          className="btn btn-square btn-outline btn-error btn-sm mt-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}

                  {/* Add Button */}
                  <button 
                    type="button" 
                    onClick={addPhoneField}
                    className="btn btn-ghost btn-xs gap-2 opacity-70 hover:opacity-100"
                  >
                    <Plus size={14} /> Add another number
                  </button>
                </div>
              </div>
                
              {/* Email */}
              <div className='form-control'>
                <label className="label text-xs uppercase tracking-widest opacity-60">Email</label>
                <div className="relative">
                  <input 
                    type="text" name="email" required
                    placeholder="example@email.com"
                    className="input input-bordered w-full pl-12 bg-base-300/50"
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              {/* Address */}
              <div className='form-control'>
                  <label className='label text-xs uppercase tracking-widest opacity-60'>Address</label>
                  <div className='relative'>
                    <input
                      type="text" name="address" required
                      placeholder="6925 Hollywood Blvd"
                      className="input input-bordered w-full pl-12 bg-base-300/50"
                      onChange={handleChange}
                    />
                    
                  </div>
              </div>

              {/* Insurance Provider */}
              <div className='form-control'>
                <label className='label text-xs uppercase tracking-widest opacity-60'>Insurance Provider</label>
                <div className='relative'>

                  <select
                    name="insuranceProvider"
                    required
                    className='select select-border w-full pl-12 bg-base-300/50 font-normal focus:border-primary'
                    onChange={handleChange}
                    value={formData.insuranceProvider}
                  >
                    <option value="" disabled>Select Provider</option>
                    <option value="Discovery">Discovery</option>
                    <option value="Old Mutual">Old Mutual</option>
                    <option value="Sanlam">Santam</option>
                    <option value="Hollard">Hollard</option>
                    <option value="Outsurance">OUTsurance</option>
                    <option value="Momentum">Momentum</option>
                    <option value="Absa Insurance">Absa Insurance</option>
                    <option value="Standard Bank Insurance">Standard Bank Insurance</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Advisor */}
              <div className='form-control'>
                <label className='label text-xs uppercase tracking-widest opacity-60'>Advisor</label>
                <div className='relative'>
                  <input
                    type="text" name="advisor" required
                    placeholder="Name & Surname"
                    className="input input-bordered w-full pl-12 bg-base-300/50"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Nature of Claim */}
              <div className='form-control'>
                <label className='label text-xs uppercase tracking-widest opacity-60'>Nature of Claim</label>
                <select
                    name="natureOfClaim"
                    required
                    className='select select-border w-full pl-12 bg-base-300/50 font-normal focus:border-primary'
                    onChange={handleChange}
                    value={formData.natureOfClaim}
                  >
                    <option value="" disabled>Select Type of Damage</option>
                    <option value="Water Damage">Water Damage</option>
                    <option value="Fire Damage">Fire Damage</option>
                    <option value="Theft & Burglary">Theft & Burglary</option>
                    <option value="Power Surge">Power Surge</option>
                    <option value="Vandalism">Vandalism</option>
                    <option value="Natural Disaster (Storm, wind, hail, or lightning strikes)">Natural Disaster (Storm, wind, hail, or lightning strikes)</option>
                    <option value="Other">Other</option>
                  </select>
              </div>


              <AnimatePresence>
                {formData.insuranceProvider == "Other" && (
                  <motion.div 
                    initial={{height: 0, opacity:0}}
                    animate={{height: 'auto', opacity:1}}
                    exit={{height: 0, opacity:0}}
                    className='overflow-hidden'  
                    >
                    <div className='form-control mt-4'>
                      <label className='label text-xs uppercase tracking-widest opacity-60'>Specify Insurance Provider</label>
                      <div className='relative'>
                        <input
                          type='text'
                          name='customInsurance'
                          required={formData.insuranceProvider == 'Other'}
                          placeholder='Enter insurance provider...'
                          className='input input-bordered w-full pl-12 bg-base-300/50 border-primary'
                          onChange={handleChange}
                          value={formData.customInsurance}
                        />
                      </div>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>


          <button 
            type="openClaim" 
            disabled={loading}
            className={`btn btn-primary w-full gap-2 text-lg ${loading ? 'loading' : ''}`}
          >
            {loading ? 'Processing...' : <><Send size={20} />Open Claim</>}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateClaim;
