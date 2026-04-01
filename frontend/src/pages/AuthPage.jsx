import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router'; 
import toast from "react-hot-toast";
import { Glasses, Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react'; 
import { motion, AnimatePresence } from 'framer-motion';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user_name");
    if (loggedInUser) {
      navigate('/dashboard'); 
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const { data } = await axios.post(`http://localhost:5001${endpoint}`, formData, {
        withCredentials: true,
      });
      localStorage.setItem("user_name", data.name);
      toast.success(isLogin ? `Welcome back, ${data.name}!` : "Account created!");
      navigate('/dashboard'); 
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-6">  
      
      {/* HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col items-center mb-8"
      >
        <div className="flex items-center gap-3">
          {/* Using Primary/5 for a subtle 'stamp' background effect */}
          <div className="p-2 bg-primary/5 rounded-lg border border-primary/20">
            <Glasses size={24} className="text-primary animate-[pulse_4s_infinite]" />
          </div>
          <h1 className="text-4xl font-black tracking-[0.3em] uppercase text-neutral">
            Claim<span className="text-primary">Gen</span>
          </h1>
        </div>
        {/* Decorative divider line using Ink color */}
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-neutral/20 to-transparent mt-4"></div>
      </motion.div>
      
      {/* AUTH CARD */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        /* Removed backdrop-blur for a solid 'Paper' feel */
        className="w-full max-w-[440px] bg-base-200 border border-neutral/10 p-10 rounded-2xl shadow-xl relative overflow-hidden"
      >
        {/* Subtle decorative glow replaced with a light coffee stain effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 blur-[80px] rounded-full"></div>

        <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-4">
                <ShieldCheck size={32} />
            </div>
            <h2 className="text-3xl font-black tracking-tighter uppercase italic text-neutral">
                {isLogin ? 'Login' : 'Registration'}
                <span className="text-primary">.</span>
            </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="form-control"
              >
                <label className="label font-mono text-[10px] uppercase text-neutral/50 tracking-widest">Full Name & Surname</label>
                <div className="relative">
                    {/* Changed bg-black/20 to bg-base-100 (Clean paper color) */}
                    <input 
                      type="text" name="name" placeholder="Assessor Name" 
                      className="input input-bordered w-full bg-base-100 border-neutral/20 focus:border-primary pl-12 rounded-xl transition-all text-neutral" 
                      required onChange={handleChange}
                    />
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/30" size={18} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* EMAIL INPUT */}
          <div className="form-control">
            <label className="label font-mono text-[10px] uppercase text-neutral/50 tracking-widest">User Email</label>
            <div className="relative">
                <input 
                  type="email" name="email" placeholder="email@agency.com" 
                  className="input input-bordered w-full bg-base-100 border-neutral/20 focus:border-primary pl-12 rounded-xl transition-all text-neutral" 
                  required onChange={handleChange}
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/30" size={18} />
            </div>
          </div>

          {/* PASSWORD INPUT */}
          <div className="form-control">
            <label className="label font-mono text-[11px] uppercase text-neutral/50 tracking-widest">User Password</label>
            <div className="relative">
                <input 
                  type="password" name="password" placeholder="••••••••" 
                  className="input input-bordered w-full bg-base-100 border-neutral/20 focus:border-primary pl-12 rounded-xl transition-all text-neutral" 
                  required onChange={handleChange}
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/30" size={18} />
            </div>
            {isLogin && (
              <label className="label justify-end">
                <button type="button" className="label-text-alt text-primary/70 hover:text-primary transition-colors font-mono uppercase text-[11px]">Forgot Password?</button>
              </label>
            )}
          </div>

          {/* ACTION BUTTON */}
          <div className="form-control mt-8">
            <button 
              type="submit"
              disabled={loading}
              className={`btn btn-primary w-full rounded-xl border-none h-14 group shadow-md hover:shadow-lg transition-all duration-500 text-white`}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <>
                  <span className="uppercase tracking-widest font-bold">
                    {isLogin ? 'Login' : 'Create Account'}
                  </span>
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-700" size={18} />
                </>
              )}
            </button>
          </div>
        </form>

        {/* TOGGLE SECTION */}
        <div className="mt-8 text-center border-t border-neutral/10 pt-6">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[12px] font-mono uppercase tracking-widest text-neutral/40 hover:text-primary transition-colors duration-300"
            >
              {isLogin ? "Not signed-up? REGISTER" : "Already signed-up? LOGIN"}
            </button>
        </div>
      </motion.div>
    </div>
  );
}

export default AuthPage;