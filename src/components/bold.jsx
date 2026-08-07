import React, { useState } from 'react'
import { FaItalic } from "react-icons/fa";
import { HiBold } from "react-icons/hi2";

function Bold({ onChange, value }) {

  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [strike, setStrike] = useState(false);

  const [textColor, setTextColor] = useState("");


  const toggleBold = () => {
    document.documentElement.classList.toggle("boldtext");
    setBold(bold => !bold)
  }

  const toggleItalic = () => {
    document.documentElement.classList.toggle("italicText");
    setItalic(italic => !italic)
  }

  const toggleUnderline = () => {
    document.documentElement.classList.toggle("underlinetext");
    setUnderline(underline => !underline)
  }

  const toggleStrike = () => {
    document.documentElement.classList.toggle("strike");
    setStrike(strike => !strike)
  }



  const changeTextColor = () => {

    document.documentElement.classList.add("customText");
    setTextColor("customColor");
  };




  return (
    <div className='flex flex-col w-70 font-retro'>
      <div className='flex items-center gap-2 mb-2'>
        <span className='text-xs font-mono font-bold bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded border border-amber-900/30'>02</span>
        <h1 className='text-sm uppercase tracking-wider font-bold text-zinc-900'>Text Style</h1>
      </div>

      <div className='bg-amber-50/60 p-3 rounded-lg border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] flex items-center justify-between gap-2'>
        <button
          type="button"
          onClick={toggleBold}
          className={`size-10 rounded-md border-2 border-zinc-900 text-lg font-bold cursor-pointer flex justify-center items-center transition-all ${bold
              ? "bg-zinc-900 text-amber-100 shadow-none translate-x-0.5 translate-y-0.5"
              : "bg-white text-zinc-900 shadow-[2px_2px_0px_#18181b] hover:bg-amber-100"
            }`}
          title="Bold"
        >
          <HiBold />
        </button>

        <button
          type="button"
          onClick={toggleItalic}
          className={`size-10 rounded-md border-2 border-zinc-900 text-lg font-serif italic cursor-pointer flex justify-center items-center transition-all ${italic
              ? "bg-zinc-900 text-amber-100 shadow-none translate-x-0.5 translate-y-0.5"
              : "bg-white text-zinc-900 shadow-[2px_2px_0px_#18181b] hover:bg-amber-100"
            }`}
          title="Italic"
        >
          I
        </button>

        <button
          type="button"
          onClick={toggleUnderline}
          className={`size-10 rounded-md border-2 border-zinc-900 text-lg font-semibold underline cursor-pointer flex justify-center items-center transition-all ${underline
              ? "bg-zinc-900 text-amber-100 shadow-none translate-x-0.5 translate-y-0.5"
              : "bg-white text-zinc-900 shadow-[2px_2px_0px_#18181b] hover:bg-amber-100"
            }`}
          title="Underline"
        >
          U
        </button>

        <button
          type="button"
          onClick={toggleStrike}
          className={`size-10 rounded-md border-2 border-zinc-900 text-lg line-through cursor-pointer flex justify-center items-center transition-all ${strike
              ? "bg-zinc-900 text-amber-100 shadow-none translate-x-0.5 translate-y-0.5"
              : "bg-white text-zinc-900 shadow-[2px_2px_0px_#18181b] hover:bg-amber-100"
            }`}
          title="Strikethrough"
        >
          S
        </button>

        <div className='relative group'>
          <div
            onClick={changeTextColor}
            className='size-10 rounded-md border-2 border-zinc-900 bg-white shadow-[2px_2px_0px_#18181b] hover:bg-amber-100 cursor-pointer overflow-hidden flex justify-center items-center relative transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
          >
            <input
              type="color"
              value={value || "#000000"}
              onChange={(e) => {
                changeTextColor();
                onChange(e.target.value);
              }}
              className='absolute inset-0 size-full opacity-0 cursor-pointer scale-150'
            />
            <div
              className='size-6 rounded border border-zinc-900'
              style={{ backgroundColor: value || '#18181b' }}
            />
          </div>
          <span className='absolute -top-9 left-1/2 -translate-x-1/2 bg-zinc-900 text-amber-100 font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded border border-zinc-700 opacity-0 group-hover:opacity-100 pointer-events-none transition z-30 whitespace-nowrap shadow-md'>
            Color
          </span>
        </div>
      </div>
    </div>
  )
}

export default Bold