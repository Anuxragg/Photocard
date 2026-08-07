import React, { useState } from 'react'

function Bgcolor({onChange, value}) {

    const [color, setColor] = useState("");

  
    const changeColor = (newColor) => {
        document.documentElement.classList.remove(
        "yellow",
        "sky",
        "pink",
        "green",
        "red",
        "indigo",
        "neutral",
        "purple",
        "orange",
        "custom",
        );
        document.documentElement.classList.add(newColor);
        setColor(newColor);
        if (onChange) onChange(newColor);
    };

    
  return (
    <div className='flex flex-col w-70 font-retro'>
      <div className='flex items-center gap-2 mb-2'>
        <span className='text-xs font-mono font-bold bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded border border-amber-900/30'>04</span>
        <h1 className='text-sm uppercase tracking-wider font-bold text-zinc-900'>Card Palette</h1>
      </div>

      <div className='rounded-lg w-70 bg-amber-50/60 p-3 flex justify-center items-center gap-2.5 flex-wrap border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b]'>

        {[
          { id: "yellow", name: "Yellow", bg: "bg-yellow-300" },
          { id: "sky", name: "Sky", bg: "bg-sky-300" },
          { id: "pink", name: "Pink", bg: "bg-pink-400" },
          { id: "green", name: "Green", bg: "bg-emerald-400" },
          { id: "red", name: "Red", bg: "bg-rose-400" },
          { id: "indigo", name: "Indigo", bg: "bg-indigo-400" },
          { id: "neutral", name: "Gray", bg: "bg-stone-300" },
          { id: "purple", name: "Purple", bg: "bg-purple-400" },
          { id: "orange", name: "Orange", bg: "bg-orange-400" },
        ].map((item) => (
          <div key={item.id} className='relative group'>
            <button
              type="button"
              onClick={() => changeColor(item.id)}
              className={`size-9 rounded-full ${item.bg} border-2 border-zinc-900 transition-all cursor-pointer ${
                color === item.id 
                  ? "ring-2 ring-zinc-900 ring-offset-2 ring-offset-amber-50 scale-110 shadow-[2px_2px_0px_#18181b]" 
                  : "hover:scale-105 shadow-[1.5px_1.5px_0px_#18181b] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              }`}
            />
            <span className='absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-amber-100 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-zinc-700 opacity-0 group-hover:opacity-100 pointer-events-none transition z-30 whitespace-nowrap shadow-md'>
              {item.name}
            </span>
          </div>
        ))}

        <div className='relative group'>
          <button
            type="button"
            onClick={() => changeColor("custom")}
            className={`relative z-10 overflow-hidden rounded-full size-9 border-2 border-zinc-900 flex justify-center items-center cursor-pointer transition-all ${
              color === "custom" 
                ? "ring-2 ring-zinc-900 ring-offset-2 ring-offset-amber-50 scale-110 shadow-[2px_2px_0px_#18181b]" 
                : "hover:scale-105 shadow-[1.5px_1.5px_0px_#18181b] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            }`}
          >
            <input
              type="color"
              value={value && typeof value === 'string' && value.startsWith('#') ? value : '#ff0000'}
              onChange={(e) => {
                changeColor("custom");
                onChange(e.target.value);
              }}
              className='absolute inset-0 size-full opacity-0 cursor-pointer scale-150'
            />
            <img src="color-wheel.png" alt="Custom color wheel" className='absolute inset-0 size-full object-cover rounded-full scale-125' />
          </button>
          <span className='absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-amber-100 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-zinc-700 opacity-0 group-hover:opacity-100 pointer-events-none transition z-30 whitespace-nowrap shadow-md'>
            Custom
          </span>
        </div>

      </div>
    </div>
  )
}

export default Bgcolor