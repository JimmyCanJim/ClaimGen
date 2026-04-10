import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router'; 
import toast from "react-hot-toast";
import { Glasses, Mail, Lock, User, ArrowRight, ShieldCheck, Cpu } from 'lucide-react'; 
import { motion, AnimatePresence } from 'framer-motion';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  const loggedInUser = localStorage.getItem("user_name");
  if (loggedInUser) {
    navigate('/'); // If we know who they are, skip the login!
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
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="flex flex-col items-center mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg border" style={{backgroundColor: "rgba(93,64,55,0.1)", borderColor: "var(--color-leather)"}}>
            <Glasses size={30} style={{color: 'var(--color-accent, #b45309)'}} />
          </div>
          <h1 style={{
            color: 'var(--color-leather, #5d4037)', 
            fontSize: '2.5rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontWeight: '900'
            }}>
              Claim<span style={{color: 'var(--color-ink, #2d2424)'}}>Gen</span>
          </h1>
        </div>
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-4"></div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[440px] backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden transition-all"
        style={{
          backgroundColor: 'var(--color-card-bg)',
          border: '1px solid var(--color-card-border)',
          boxShadow: '0 4px 6px -1px var(--color-card-shadow-heavy)'
        }}
      >
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[80px] rounded-full"></div>

        <div className="text-center mb-8">

            <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-4">
              <ShieldCheck 
                size={32} 
                style={{color: 'var(--color-accent, #b45309)'}} 
                transition={{
                  duration: 5,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.6, 1],
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              />
            </div>

            <h2 className="text-3xl font-black tracking-tighter uppercase italic">
                {isLogin ? 'Login' : 'Registration'}
                <span style={{color: "var(--color-accent)"}}>.</span>
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
                <label className="label font-bold text-[10px] uppercase tracking-widest" style={{color: "var(--color-accent)"}}>Full Name & Surname</label>
                <div className="relative">
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="Assessor Name" 
                      className="peer input w-full pl-12 rounded-xl transition-all ledger-input-dark" 
                      required onChange={handleChange}
                    />
                    <User 
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/20 transition-all duration-300 peer-focus:scale-110 peer-focus:opacity-100 opacity-40" 
                      size={18} 
                      style={{color: 'var(--color-accent, #b45309)'}}
                    />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="form-control">
            <label className="label font-bold text-[10px] uppercase tracking-widest" style={{color: "var(--color-accent)"}}>User Email</label>
            <div className="relative">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="email@agency.com" 
                  className="peer input w-full pl-12 rounded-xl transition-all ledger-input-dark"
                  required 
                  onChange={handleChange}
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/20 transition-all duration-300 peer-focus:scale-110 peer-focus:opacity-100 opacity-40" size={18} style={{color: 'var(--color-accent, #b45309)'}}/>
            </div>
          </div>

          <div className="form-control">
            <label className="label font-bold text-[10px] uppercase tracking-widest" style={{color: "var(--color-accent)"}}>User Password</label>
            <div className="relative">
                <input 
                  type="password" 
                  name="password" 
                  placeholder="••••••••" 
                  className="peer input w-full pl-12 rounded-xl transition-all ledger-input-dark"
                  required onChange={handleChange}
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/20 transition-all duration-300 peer-focus:scale-110 peer-focus:opacity-100 opacity-40" size={18} style={{color: 'var(--color-accent, #b45309)'}}/>
            </div>
            {isLogin && (
              <label className="label justify-end">
                <a href="#" className="label font-bold text-[10px] uppercase tracking-widest" style={{color: "var(--color-accent)"}}>Forgot Password?</a>
              </label>
            )}
          </div>

          <div className="form-control mt-8">
            <button 
              type="submit"
              disabled={loading}
              className={`w-full rounded-xl border-none h-14 font-bold uppercase tracking-widest text-white
                transition-all duration-300 ease-out
                hover:opacity-90 hover:shadow-xl
                active:scale-[0.98] active:translate-y-1 active:shadow-inner
                disabled:opacity-50 disabled:cursor-not-allowed`}
              style={{
                backgroundColor: 'var(--color-leather)',
                boxShadow: '0 4px 0px rgba(25, 36, 36, 0.2)'
              }}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <>
                <div className="flex items-center justify-center gap-3 w-full h-full">
                  <span className="flex items-center justify-center gap-2">
                    {isLogin ? 'Login' : 'Create Account'}
                  </span>
                  <ArrowRight 
                    size={20} 
                    className="relative -top-[1px] transition-transform group-hover:translate-x-1"
                    />
                </div>

                </>
              )}
            </button>
          </div>
        </form>

      
        <div className="mt-8 text-center border-t border-white/5 pt-6">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[12px] font-bold uppercase tracking-widest text-base-content/40 hover:text-primary transition-colors duration-1000"
              style={{color: "var(--color-accent)"}}
            >
              {isLogin ? "Not signed-up? REGISTER" : "Already signed-up? LOGIN"}
            </button>
        </div>
      </motion.div>
    </div>
  );
}

export default AuthPage;
