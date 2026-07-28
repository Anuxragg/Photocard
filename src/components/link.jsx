import React from 'react'
import { SiGithub } from "react-icons/si";


function Link() {
  return (
    <div className='absolute z-10 top-4 md:top-6 right-4 md:right-8 flex items-center gap-3 font-retro'>
      <a 
        href="https://github.com/Anuxragg/photo-card" 
        target="_blank" 
        rel="noopener noreferrer"
        className='flex items-center gap-2 px-3 py-1.5 bg-amber-50 border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] hover:shadow-[3px_3px_0px_#18181b] text-zinc-900 rounded-md font-semibold text-xs md:text-sm tracking-wide transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
      >
        <SiGithub className='size-4 md:size-5'/>
        <span className='hidden sm:inline'>GitHub</span>
      </a>
    </div>
  )
}

export default Link