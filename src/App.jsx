
import { useRef, useState } from 'react'
import './App.css'
import { toPng } from 'html-to-image'

import { MdOutlineFileDownload } from "react-icons/md";
import { TbUpload } from "react-icons/tb";
import { RiResetLeftLine } from "react-icons/ri";

import Bgcolor from './components/bgcolor';
import Filter from './components/filter';

import { Analytics } from "@vercel/analytics/react"
import Bold from './components/bold';
import Link from './components/link';
import FontStyle from './components/fontstyle';
import DotGridCanvas from './components/DotGridCanvas';



function App() {

  // all useRefs
  const dateRef = useRef()
  const titleRef = useRef()
  const imgBoxRef = useRef();

// all usestates
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState('')
  const [date, setdate] = useState()

  const [filter, setFilter] = useState("");



  
  const [color, setColor] = useState("#ff0000")

  const [textColor, setTextColor] = useState("")
  const [font, setFont] = useState("sans-serif")


  
  // for darker color genaration of border for custom color
  function darkenColor(hex, percent) {
  let r = parseInt(hex.substring(1,3), 16);
  let g = parseInt(hex.substring(3,5), 16);
  let b = parseInt(hex.substring(5,7), 16);

  r = Math.floor(r * (1 - percent));
  g = Math.floor(g * (1 - percent));
  b = Math.floor(b * (1 - percent));

  return `rgb(${r}, ${g}, ${b})`;
}





// for image upload
  function handleUpload(e){
    e.preventDefault()
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result)
    };
    reader.readAsDataURL(file);
  }


// for reset
  function handleReset(e){
    e.preventDefault()
    setImage(null)
    setTitle('')
    setdate()
    
  

    dateRef.current.value = ''
    titleRef.current.value = ''


 
  }



  // for image download
 const handleDownload = () => {
  if (!imgBoxRef.current) return;

  toPng(imgBoxRef.current, { cacheBust: true, pixelRatio: 4 })
    .then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "card.png";
      link.href = dataUrl;
      link.click();
    });
};




  return (
    <>
      <Analytics/>
      <div className='flex selection:text-amber-100 selection:bg-zinc-900 flex-col md:flex-row min-h-screen bg-[#f7f4eb] text-zinc-900 font-retro'>

        {/* Left Sidebar Control Panel */}
        <div className='h-auto md:h-screen w-full md:w-96 bg-[#f2edd9]/90 border-r-0 md:border-r-2 border-zinc-900 flex flex-col items-center pt-8 pb-12 px-6 gap-6 order-2 md:order-1 md:overflow-y-auto no-scrollbar shadow-md z-20'>

          {/* Sidebar Header Badge */}
          <div className='w-70 bg-amber-100 border-2 border-zinc-900 p-3 rounded-lg shadow-[3px_3px_0px_#18181b] flex flex-col items-start'>
            <div className='flex items-center justify-between w-full'>
              <span className='font-mono text-[11px] font-bold text-amber-900 bg-amber-300/80 px-1.5 py-0.5 rounded border border-amber-900/30 uppercase tracking-widest'>Studio Deck</span>
              <span className='size-2 rounded-full bg-emerald-500 animate-pulse border border-zinc-900'></span>
            </div>
            <h1 className='text-xl font-bold text-zinc-900 tracking-tight mt-1'>Retro Photo Studio</h1>
            <p className='text-xs font-mono text-zinc-600 mt-0.5'>Craft instant analog photo cards</p>
          </div>

          {/* Section 01: Title Input */}
          <div className='flex flex-col w-70'>
            <div className='flex items-center gap-2 mb-2'>
              <span className='text-xs font-mono font-bold bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded border border-amber-900/30'>01</span>
              <h1 className='text-sm uppercase tracking-wider font-bold text-zinc-900'>Caption / Title</h1>
            </div>
            <form action="" onSubmit={(e) => e.preventDefault()}>
              <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)} 
                type="text" 
                className='border-2 border-zinc-900 rounded-lg p-2.5 w-full text-base font-semibold bg-white shadow-[3px_3px_0px_#18181b] focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-zinc-400 placeholder:font-normal' 
                placeholder="What’s on your mind?"
                maxLength={50}
                ref={titleRef} 
              />
            </form>
          </div>

          {/* Section 02: Bold / Text Style */}
          <Bold value={textColor} onChange={setTextColor} />

          {/* Section 03: Font Style */}
          <FontStyle selectedFont={font} onFontChange={setFont} />

          {/* Section 04: Date Picker */}
          <div className='flex flex-col w-70'>
            <div className='flex items-center gap-2 mb-2'>
              <span className='text-xs font-mono font-bold bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded border border-amber-900/30'>04</span>
              <h1 className='text-sm uppercase tracking-wider font-bold text-zinc-900'>Stamp Date</h1>
            </div>
            <form action="" onClick={() => dateRef.current && dateRef.current.showPicker()}>
              <input 
                onChange={(e) => {
                  const value = e.target.value;
                  if (!value) return setdate('');
                  const [y, m, d] = value.split("-");
                  const formatted = `${d}.${m}.${y}`; 
                  setdate(formatted);
                }} 
                type="date" 
                onFocus={(e) => e.target.blur()}
                className='border-2 border-zinc-900 rounded-lg p-2.5 w-full text-base font-semibold bg-white shadow-[3px_3px_0px_#18181b] cursor-pointer focus:outline-none font-mono text-zinc-800'
                ref={dateRef}
              />
            </form>
          </div>

          {/* Section 05: Background Colors */}
          <Bgcolor value={color} onChange={setColor} />

          {/* Section 06: Photo Filters */}
          <Filter onFilterChange={setFilter}/>

        </div>

        {/* Right Canvas / Studio Workspace */}
        <div className='relative min-h-screen md:h-screen flex-1 flex flex-col justify-center items-center p-6 md:p-10 order-1 md:order-2 bg-[#f7f4eb] overflow-hidden'>
          
          <DotGridCanvas />

          <Link />

          {/* Card Frame Container */}
          <div className='relative my-auto flex flex-col items-center justify-center pt-8'>
            
            {/* Vintage Washi Tape Accent */}
            <div className='absolute -top-3 z-30 px-6 py-1 bg-amber-200/90 border border-zinc-800/40 shadow-sm rounded-sm font-mono text-[10px] tracking-widest text-zinc-800 uppercase transform -rotate-2 backdrop-blur-xs select-none pointer-events-none'>
              ★ INSTANT PRINT ★
            </div>

            <div ref={imgBoxRef} className='inline-block'>

              <div className='w-[310px] sm:w-[330px] h-[390px] sm:h-[415px] bg-[#e0f2fe] m-4 mb-6 rounded-xl shadow-[8px_8px_0px_#18181b] border-3 border-zinc-900 flex flex-col hover:rotate-1 hover:scale-[1.01] transition-all duration-300 px-5 pt-5 pb-4 overflow-hidden relative select-none

              yellow:bg-yellow-200 yellow:border-zinc-900
              sky:bg-sky-100 sky:border-zinc-900
              green:bg-emerald-200 green:border-zinc-900
              pink:bg-rose-200 pink:border-zinc-900
              red:bg-red-200 red:border-zinc-900
              indigo:bg-indigo-200 indigo:border-zinc-900
              neutral:bg-stone-200 neutral:border-zinc-900
              purple:bg-purple-200 purple:border-zinc-900
              teal:bg-teal-200 teal:border-zinc-900
              orange:bg-orange-200 orange:border-zinc-900
              custom:bg-[var(--customColor)] custom:border-zinc-900
              '
              style={{
                "--customColor": color,
              }}
              >
                
                {/* Photo Container */}
                <div className='relative w-full aspect-square rounded-md overflow-hidden border-2 border-zinc-900/80 bg-zinc-900/10 flex items-center justify-center shadow-inner'>
                  {image ? (
                    <img 
                      src={image} 
                      alt="Uploaded card"
                      className='w-full h-full object-cover 
                         
                       retro:filter 
                       retro:sepia-[100%]
                       retro:brightness-90 
                       retro:contrast-125
                       retro:saturate-170 
                       retro:hue-rotate-10

                       sunny:filter 
                       sunny:brightness-100 
                       sunny:saturate-150 
                       sunny:contrast-100

                       bw:filter 
                       bw:brightness-110 
                       bw:saturate-0 
                       bw:contrast-110 

                       tealOrange:filter 
                       tealOrange:brightness-100 
                       tealOrange:contrast-125 
                       tealOrange:saturate-125 
                       tealOrange:hue-rotate-[20deg]

                       bright:brightness-[1.12] 
                       bright:contrast-[1.0]
                       bright:saturate-[1.45]
                       bright:sepia-[0.5]
                       bright:hue-rotate-[15deg] 
                      ' 
                    />
                  ) : (
                    <div className='flex flex-col items-center justify-center p-4 text-center text-zinc-500 font-retro'>
                      <TbUpload className='size-10 mb-2 stroke-[1.5] text-zinc-600' />
                      <p className='text-xs font-semibold uppercase tracking-wider text-zinc-700'>No image loaded</p>
                      <p className='text-[11px] font-mono text-zinc-500 mt-0.5'>Click Upload below</p>
                    </div>
                  )}

                  { filter === "cinematic" && 
                    (
                      <div>
                        <div className="absolute inset-0 bg-teal-300/30 mix-blend-color"></div>
                        <div className="absolute inset-0 bg-orange-500/20 mix-blend-soft-light backdrop-brightness-110 backdrop-contrast-125"></div>
                      </div>
                    )
                  }

                  { filter === "sunlight" && 
                    (
                      <div>
                        <div className="absolute inset-0 bg-orange-400/40 mix-blend-soft-light"></div>
                        <div className="absolute inset-0 bg-yellow-200/20 mix-blend-screen"></div>
                      </div>
                    )
                  }

                  { filter === "tealOrange" && 
                    (
                      <div>
                        <div className='bg-green-500 absolute inset-0 mix-blend-soft-light'></div>
                        <div className='bg-red-400 absolute inset-0 mix-blend-soft-light'></div>
                      </div>
                    )
                  }
                </div>

                {/* Title Display */}
                <div className='flex flex-wrap mt-2 flex-1 items-start'>
                  <h1 className='text-lg break-all text-zinc-900 leading-tight

                  boldtext:font-bold
                  italicText:italic
                  underlinetext:underline
                  strike:line-through

                  customText:text-[var(--customTextColor)]'

                  style={{
                    "--customTextColor": textColor,
                    fontFamily: font
                  }}
                  >
                    {title || <span className='text-zinc-400 italic text-base font-normal'>Your caption here...</span>}
                  </h1>
                </div>

                {/* Date Stamp Display */}
                <div className='w-full flex justify-end items-end pt-1'>
                  <p className='text-xs text-zinc-700 font-stamp tracking-wider uppercase font-bold bg-amber-100/60 px-2 py-0.5 rounded border border-zinc-900/20'>
                    {date || '00.00.0000'}
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Action Toolbar */}
          <div className='flex flex-col gap-3 items-center justify-center mb-6 z-20'>
            <form action="" className='flex flex-row gap-3 justify-center items-center'>

              <input id='file' onChange={handleUpload} accept="image/*" type="file" className='hidden'/>

              <button 
                type="button"
                onClick={handleReset} 
                className='px-4 py-2.5 rounded-lg border-2 border-zinc-900 bg-white text-zinc-900 font-bold text-sm uppercase tracking-wider cursor-pointer shadow-[3px_3px_0px_#18181b] hover:bg-amber-100 transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center gap-1.5'
              >
                <RiResetLeftLine className='size-4'/>
                Reset
              </button>

              <label 
                htmlFor='file' 
                className='px-5 py-2.5 rounded-lg border-2 border-zinc-900 bg-amber-300 text-zinc-900 font-bold text-sm uppercase tracking-wider cursor-pointer shadow-[3px_3px_0px_#18181b] hover:bg-amber-400 transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center gap-1.5'
              >
                <TbUpload className='size-4'/>
                Upload
              </label>

            </form>

            {image && (
              <button 
                type="button"
                onClick={handleDownload} 
                className='w-full max-w-[270px] py-2.5 px-4 rounded-lg border-2 border-zinc-900 bg-zinc-900 text-amber-100 font-bold text-sm uppercase tracking-wider cursor-pointer shadow-[4px_4px_0px_#d97706] hover:bg-zinc-800 transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex justify-center items-center gap-2'
              >
                <MdOutlineFileDownload className='size-5'/>
                Download Photo Card
              </button>
            )}
          </div>

        </div>

      </div>
    </>
  )
}

export default App
