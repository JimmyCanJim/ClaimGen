import React, { Profiler } from 'react'
import { Briefcase, LogOut, MapPin, PlusIcon, StoreIcon, User } from 'lucide-react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <header className='bg-base-300 border-base-content/10'>
      <div className='mx-auto max-w-8xl p-2'>
        <div className='flex items-center justify-between'>
            <h1 className='text-3xl font-bold text-primary font-mono tracking-tighter'>
                Claim Gen
            </h1>

            <div className='flex items-center gap-8'>

                <Link to = {"/dashboard/createclaim"} className='btn btn-primary transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-primary/30'>
                    <PlusIcon className='size-4'/>
                    <span>Open Claim</span>
                </Link>

                <Link to = {"/dashboard/manageclaims"} className = "btn btn-ghost gap-2 transition-transform hover:-translate-y-0.5">
                    <Briefcase className='size-4'/>
                    <span>Manage Claims</span>
                </Link>

                <Link to = {"/retail"} className = "btn btn-ghost gap-2">
                    <StoreIcon className='size-4'/>
                    <span>Retail</span>
                </Link>

                <Link to = {"/profile"} className = "btn btn-ghost gap-2">
                    <User className='size-4'/>
                    <span>Profile</span>
                </Link>

                <Link to = {"/"} className = "btn btn-ghost text-error gap-2">
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
