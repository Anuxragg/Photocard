import React from 'react'
import { useState } from 'react';


function Filter({ onFilterChange }) {


    const [filter, setFilter] = useState("");
    
      
        const changeFilter = (newFilter) => {
            document.documentElement.classList.remove(
            "retro",
            "sunny",
            "original",
            "bw",
            "tealOrange",
            "sunlight",
            "bright",
            "cinematic",
            );
            document.documentElement.classList.add(newFilter);
            setFilter(newFilter);
            onFilterChange(newFilter)
        };


  return (
    <div className='flex flex-col w-70 font-retro'>
      <div className='flex items-center gap-2 mb-2'>
        <span className='text-xs font-mono font-bold bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded border border-amber-900/30'>05</span>
        <h1 className='text-sm uppercase tracking-wider font-bold text-zinc-900'>Film Filters</h1>
      </div>

      <div className='rounded-lg w-70 bg-amber-50/60 p-3 flex justify-start items-center gap-2.5 flex-wrap border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b]'>
        {[
          { id: "original", name: "Original", img: "original.png", bg: "bg-[#ffc693]" },
          { id: "retro", name: "Retro", img: "retro.png", bg: "bg-[#8b4f00]" },
          { id: "sunny", name: "Sunny", img: "sunny.png", bg: "bg-[#ffb700]" },
          { id: "bw", name: "B&W", img: "bw.png", bg: "bg-zinc-800" },
          { id: "tealOrange", name: "Teal", img: "teal.png", bg: "bg-teal-700" },
          { id: "sunlight", name: "Sunlight", img: "sunlight.png", bg: "bg-amber-400" },
          { id: "bright", name: "Bright", img: "bright.png", bg: "bg-yellow-200" },
          { id: "cinematic", name: "Cinematic", img: "cinematic.png", bg: "bg-indigo-900" },
        ].map((item) => (
          <div key={item.id} className='relative group'>
            <button
              type="button"
              onClick={() => changeFilter(item.id)}
              className={`size-10 rounded-md border-2 border-zinc-900 cursor-pointer overflow-hidden transition-all ${
                filter === item.id 
                  ? "ring-2 ring-zinc-900 ring-offset-2 ring-offset-amber-50 scale-105 shadow-[2px_2px_0px_#18181b]" 
                  : "hover:scale-105 shadow-[1.5px_1.5px_0px_#18181b] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              }`}
            >
              <img src={item.img} alt={item.name} className='w-full h-full object-cover' />
            </button>
            <span className='absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-amber-100 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-zinc-700 opacity-0 group-hover:opacity-100 pointer-events-none transition z-30 whitespace-nowrap shadow-md'>
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Filter