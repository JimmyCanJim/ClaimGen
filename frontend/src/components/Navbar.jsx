import React, { Profiler } from 'react'
import { Briefcase, LogOut, MapPin, PlusIcon, StoreIcon, User } from 'lucide-react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <header className='border-b transition-all duration-300' style={{backgroundColor: 'var(--color-card-bg)', borderColor: 'var(--color-card-border)'}}>
      <div className='mx-auto max-w-8xl p-2'>
        <div className='flex items-center justify-between'>
            <h1 className='text-4xl text-pr tracking-tighter' style={{color: 'var(--color-leather)', letterSpacing: '0.1em',}} >
                Claim<span style={{color: 'var(--color-ink)'}}>Gen</span>
            </h1>

            <div className='flex items-center gap-8'>

                <Link 
                    to = {"/dashboard/createclaim"} 
                    className='btn transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-primary/30'
                    style={{
                        color: 'var(--color-accent-soft)',
                        backgroundColor: 'var(--color-leather)'}}
                        >
                    <PlusIcon className='size-4'/>
                    <span>Open Claim</span>
                </Link>

                <Link 
                    to = {"/dashboard/manageclaims"} 
                    className = "btn transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 "
                    style={{
                        color: 'var(--color-ink)',
                        backgroundColor: 'var(--color-leather-soft)'
                    }}
                    >
                    <Briefcase className='size-4'/>
                    <span>Manage Claims</span>
                </Link>

                <Link 
                    to = {"/retail"} 
                    className = "btn transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
                    style={{
                        color: 'var(--color-ink)',
                        backgroundColor: 'var(--color-leather-soft)'
                    }}                    
                    >
                    <StoreIcon className='size-4'/>
                    <span>Retail</span>
                </Link>

                <Link 
                    to = {"/profile"} 
                    className = "btn transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
                    style={{
                        color: 'var(--color-ink)',
                        backgroundColor: 'var(--color-leather-soft)'
                    }}                    
                    >
                    <User className='size-4'/>
                    <span>Profile</span>
                </Link>

                <Link 
                    to = {"/"} 
                    className = "btn text-error transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
                    style={{
                        color: 'var(--color-ink)',
                        backgroundColor: 'var(--color-leather-soft)'
                    }}                     
                    >
                    <LogOut className='size-4 transition-transform group-hover:translate-x-1'/>
                    <span>Logout</span>
                </Link>

            </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
