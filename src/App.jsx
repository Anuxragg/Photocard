
import { useRef, useState } from 'react'
import './App.css'
import { toPng } from 'html-to-image'

import { MdOutlineFileDownload } from "react-icons/md";
import { TbUpload } from "react-icons/tb";
import { RiResetLeftLine } from "react-icons/ri";
import { HiOutlineSparkles } from "react-icons/hi2";

import Bgcolor from './components/bgcolor';
import Filter from './components/filter';

import { Analytics } from "@vercel/analytics/react"
import Bold from './components/bold';
import Link from './components/link';
import FontStyle from './components/fontstyle';
import DotGridCanvas from './components/DotGridCanvas';
import CometCard from './components/ui/comet-card';
import TemplateSelector, { TEMPLATES } from './components/TemplateSelector';
import TylerIdForm from './components/TylerIdForm';



function App() {

  // all useRefs
  const dateRef = useRef()
  const titleRef = useRef()
  const imgBoxRef = useRef();

  // all usestates
  const [selectedTemplate, setSelectedTemplate] = useState('polaroid')
  const [tylerFields, setTylerFields] = useState({
    issuedTo: 'Tyler Baudelaire',
    dob: '03/06/91',
    placeOfIssue: 'Hawthorne, CA',
    dateOfIssue: '06/25/2021',
    signature: 'Tyler',
  })
  const [cardTheme, setCardTheme] = useState('yellow')
  const [color, setColor] = useState('#ff0000')
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState('')
  const [date, setdate] = useState()

  const [filter, setFilter] = useState("");

  const getCardFilter = (theme) => {
    switch (theme) {
      case 'green':
        return 'hue-rotate(85deg) saturate(0.85)';
      case 'pink':
        return 'hue-rotate(275deg) saturate(0.85)';
      case 'sky':
        return 'hue-rotate(150deg) saturate(0.85)';
      case 'red':
        return 'hue-rotate(315deg) saturate(1.1)';
      case 'indigo':
        return 'hue-rotate(190deg) saturate(0.9)';
      case 'purple':
        return 'hue-rotate(220deg) saturate(0.9)';
      case 'orange':
        return 'hue-rotate(340deg) saturate(1.1)';
      case 'neutral':
        return 'grayscale(100%)';
      default:
        return 'none';
    }
  };

  const [textColor, setTextColor] = useState("")
  const [font, setFont] = useState("sans-serif")



  // for darker color genaration of border for custom color
  function darkenColor(hex, percent) {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    r = Math.floor(r * (1 - percent));
    g = Math.floor(g * (1 - percent));
    b = Math.floor(b * (1 - percent));

    return `rgb(${r}, ${g}, ${b})`;
  }





  // for image upload
  function handleUpload(e) {
    e.preventDefault()
    const file = e.target?.files?.[0];
    if (file) {
      try {
        new Audio('/mixkit-old-camera-shutter-click-1137.wav').play().catch(() => { });
      } catch (_) { }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result)
      };
      reader.readAsDataURL(file);
    }
  }

  // for reset
  function handleReset(e) {
    e.preventDefault()
    try {
      new Audio('/mixkit-clear-mouse-clicks-2997.wav').play().catch(() => { });
    } catch (_) { }
    setImage(null)
    setTitle('')
    setdate()
    setTylerFields({
      issuedTo: 'Tyler Baudelaire',
      dob: '03/06/91',
      placeOfIssue: 'Hawthorne, CA',
      dateOfIssue: '06/25/2021',
      signature: 'Tyler',
    })

    if (dateRef.current) dateRef.current.value = ''
    if (titleRef.current) titleRef.current.value = ''
  }

  // for image download
  const handleDownload = () => {
    try {
      new Audio('/mixkit-old-camera-shutter-click-1137.wav').play().catch(() => { });
    } catch (_) { }
    if (!imgBoxRef.current) return;

    toPng(imgBoxRef.current, { cacheBust: true, pixelRatio: 4 })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "card.png";
        link.href = dataUrl;
        link.click();
      })
      .catch(() => { });
  };




  const [activeTab, setActiveTab] = useState('template');

  return (
    <>
      <Analytics />
      <div className='relative selection:text-amber-100 selection:bg-zinc-900 w-screen h-screen min-h-screen bg-[#f7f4eb] text-zinc-900 font-retro overflow-hidden flex flex-col justify-between items-center'>

        {/* Top Header Navigation */}
        <div className='w-full px-6 py-4 flex justify-between items-center z-30 pointer-events-none'>
          <div className='flex items-center gap-3 pointer-events-auto'>
            <div className='bg-zinc-900 text-amber-300 px-3 py-1 rounded-lg border-2 border-zinc-900 shadow-[2px_2px_0px_#d97706] font-mono text-xs font-bold tracking-wider uppercase flex items-center gap-1.5'>
              <HiOutlineSparkles className='size-4 text-amber-400' />
              INSTANT PRINT STUDIO
            </div>
          </div>
          <div className='pointer-events-auto'>
            <Link />
          </div>
        </div>

        {/* Main Canvas Workspace Area */}
        <div className='relative flex-1 w-full flex flex-col justify-center items-center p-4 z-10 overflow-hidden'>
          <DotGridCanvas />

          {/* Card Frame Container */}
          <div className='relative my-auto flex flex-col items-center justify-center pt-2 z-10'>
            {/* Vintage Washi Tape Accent */}
            <div className='absolute -top-3 z-30 px-6 py-1 bg-amber-200/90 border border-zinc-800/40 shadow-sm rounded-sm font-mono text-[10px] tracking-widest text-zinc-800 uppercase transform -rotate-2 backdrop-blur-xs select-none pointer-events-none'>
              ★ INSTANT PRINT ★
            </div>

            <CometCard>
              <div ref={imgBoxRef} className='inline-block'>

                {selectedTemplate !== 'polaroid' ? (
                  (() => {
                    const activeTmpl = TEMPLATES.find(t => t.id === selectedTemplate) || TEMPLATES[1];
                    return (
                      /* Custom Image Card Template Layout (.jfif) */
                      <div className={`${activeTmpl.cardDimensions || 'w-[310px] sm:w-[330px] h-[390px] sm:h-[415px]'} m-4 mb-6 rounded-xl shadow-xl flex flex-col relative overflow-hidden select-none hover:rotate-1 hover:scale-[1.01] transition-all duration-300 bg-transparent`}>
                        {/* Full Template Image Background */}
                        <img
                          src={activeTmpl.src}
                          alt={activeTmpl.name}
                          className={`absolute inset-0 w-full h-full object-fill pointer-events-none z-0 transition-all duration-300 ${selectedTemplate === 'download' ? 'scale-[1.07]' : ''
                            }`}
                          style={{
                            filter: getCardFilter(cardTheme),
                          }}
                        />

                        {/* Photo Container Overlay - Exact Slot */}
                        <div
                          className="absolute overflow-hidden z-10 flex items-center justify-center border border-zinc-900/40 shadow-inner rounded-xs bg-zinc-900/20"
                          style={{
                            left: activeTmpl.photoSlot?.left || '10%',
                            top: activeTmpl.photoSlot?.top || '16%',
                            width: activeTmpl.photoSlot?.width || '80%',
                            height: activeTmpl.photoSlot?.height || '54%',
                          }}
                        >
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
                            <div className='flex flex-col items-center justify-center p-2 text-center text-zinc-800 bg-amber-50/80 backdrop-blur-xs w-full h-full font-retro border border-amber-900/20'>
                              <TbUpload className='size-6 mb-1 stroke-[1.8] text-zinc-900' />
                              <p className='text-[10px] font-bold uppercase tracking-wider text-zinc-900'>Upload Photo</p>
                            </div>
                          )}

                          {filter === "cinematic" &&
                            (
                              <div>
                                <div className="absolute inset-0 bg-teal-300/30 mix-blend-color"></div>
                                <div className="absolute inset-0 bg-orange-500/20 mix-blend-soft-light backdrop-brightness-110 backdrop-contrast-125"></div>
                              </div>
                            )
                          }

                          {filter === "sunlight" &&
                            (
                              <div>
                                <div className="absolute inset-0 bg-orange-400/40 mix-blend-soft-light"></div>
                                <div className="absolute inset-0 bg-yellow-200/20 mix-blend-screen"></div>
                              </div>
                            )
                          }

                          {filter === "tealOrange" &&
                            (
                              <div>
                                <div className='bg-green-500 absolute inset-0 mix-blend-soft-light'></div>
                                <div className='bg-red-400 absolute inset-0 mix-blend-soft-light'></div>
                              </div>
                            )
                          }
                        </div>

                        {/* Text Slots for Specific Templates like Tyler ID */}
                        {selectedTemplate === 'tyler' ? (
                          <>
                            {/* Issued to */}
                            <div className="absolute z-20 overflow-hidden truncate" style={{ left: '68.5%', top: '19.5%', width: '28%' }}>
                              <span className="text-base sm:text-xl text-zinc-900 leading-none" style={{ fontFamily: "'Nanum Pen Script', cursive" }}>
                                {tylerFields.issuedTo}
                              </span>
                            </div>

                            {/* Date of birth */}
                            <div className="absolute z-20 overflow-hidden truncate" style={{ left: '68.5%', top: '26.8%', width: '28%' }}>
                              <span className="text-sm sm:text-lg text-zinc-900 leading-none" style={{ fontFamily: "'Nanum Pen Script', cursive" }}>
                                {tylerFields.dob}
                              </span>
                            </div>

                            {/* Place of issue */}
                            <div className="absolute z-20 overflow-hidden truncate" style={{ left: '68.5%', top: '32.5%', width: '26.5%' }}>
                              <span className="text-sm sm:text-lg text-zinc-900 leading-none" style={{ fontFamily: "'Nanum Pen Script', cursive" }}>
                                {tylerFields.placeOfIssue}
                              </span>
                            </div>

                            {/* Signature */}
                            <div className="absolute z-40 overflow-hidden truncate" style={{ left: '62%', bottom: '12%', width: '32%' }}>
                              <span className="text-base sm:text-lg text-zinc-900 leading-none" style={{ fontFamily: "'Rock Salt', cursive" }}>
                                {tylerFields.signature}
                              </span>
                            </div>
                          </>
                        ) : (
                          activeTmpl.textSlots && (
                            <>
                              {title && (
                                <div
                                  className="absolute z-20 overflow-hidden truncate"
                                  style={{
                                    left: activeTmpl.textSlots.name.left,
                                    top: activeTmpl.textSlots.name.top,
                                    width: activeTmpl.textSlots.name.width,
                                  }}
                                >
                                  <span className="text-xs sm:text-sm font-bold text-zinc-900 font-mono tracking-tight" style={{ fontFamily: font, color: textColor || '#18181b' }}>
                                    {title}
                                  </span>
                                </div>
                              )}
                              {date && (
                                <div
                                  className="absolute z-20 overflow-hidden truncate"
                                  style={{
                                    left: activeTmpl.textSlots.date.left,
                                    top: activeTmpl.textSlots.date.top,
                                    width: activeTmpl.textSlots.date.width,
                                  }}
                                >
                                  <span className="text-xs sm:text-sm font-bold text-zinc-900 font-mono tracking-tight">
                                    {date}
                                  </span>
                                </div>
                              )}
                            </>
                          )
                        )}

                        {/* Foreground Copy Overlay Layer (Stars, Borders, Stamp & Signature) */}
                        {activeTmpl.copySrc && (
                          <img
                            src={activeTmpl.copySrc}
                            alt="Template Overlay"
                            className="absolute inset-0 w-full h-full object-fill pointer-events-none z-30"
                          />
                        )}

                        {/* Optional Banner only if captionSlot is specified */}
                        {activeTmpl.captionSlot && (
                          <div
                            className='absolute z-20 flex flex-col justify-end bg-zinc-900/85 backdrop-blur-md p-2.5 rounded-lg border border-amber-400/30 text-white shadow-lg'
                            style={{
                              left: activeTmpl.captionSlot.left,
                              bottom: activeTmpl.captionSlot.bottom,
                              width: activeTmpl.captionSlot.width,
                            }}
                          >
                            <h1 className='text-sm break-all text-amber-100 font-semibold leading-tight'
                              style={{
                                color: textColor || '#fef3c7',
                                fontFamily: font
                              }}
                            >
                              {title || <span className='text-amber-200/60 italic text-xs font-normal'>Your caption here...</span>}
                            </h1>
                            <div className='flex justify-between items-center mt-1.5 pt-1 border-t border-amber-400/20'>
                              <span className='text-[9px] font-mono tracking-widest text-amber-300 uppercase'>
                                {activeTmpl.name}
                              </span>
                              <p className='text-[10px] font-stamp font-mono tracking-wider font-bold text-amber-300'>
                                {date || '00.00.0000'}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()
                ) : (
                  /* Classic CSS Polaroid Card Layout */
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

                      {filter === "cinematic" &&
                        (
                          <div>
                            <div className="absolute inset-0 bg-teal-300/30 mix-blend-color"></div>
                            <div className="absolute inset-0 bg-orange-500/20 mix-blend-soft-light backdrop-brightness-110 backdrop-contrast-125"></div>
                          </div>
                        )
                      }

                      {filter === "sunlight" &&
                        (
                          <div>
                            <div className="absolute inset-0 bg-orange-400/40 mix-blend-soft-light"></div>
                            <div className="absolute inset-0 bg-yellow-200/20 mix-blend-screen"></div>
                          </div>
                        )
                      }

                      {filter === "tealOrange" &&
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
                )}
              </div>
            </CometCard>

          </div>
        </div>

        {/* Floating Control Dock & Popover Panels */}
        <div className='fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center max-w-[95vw] pointer-events-auto'>

          {/* Popover Floating Drawer Window */}
          {activeTab && (
            <div className='mb-3 bg-[#f2edd9]/95 backdrop-blur-xl border-2 border-zinc-900 shadow-[6px_6px_0px_#18181b] rounded-2xl p-4 md:p-5 max-h-[60vh] overflow-y-auto no-scrollbar max-w-[90vw] md:max-w-md w-full relative animate-in fade-in slide-in-from-bottom-3 duration-200 z-50'>

              {/* Popover Header */}
              <div className='flex justify-between items-center mb-3 pb-2 border-b border-zinc-900/15'>
                <span className='text-xs font-mono font-bold uppercase tracking-wider text-zinc-800 flex items-center gap-1.5'>
                  {activeTab === 'template' && <>Select Card Template</>}
                  {activeTab === 'inputs' && <>Card Details</>}
                  {activeTab === 'style' && <>Text & Typography</>}
                  {activeTab === 'color' && <>Card Palette</>}
                  {activeTab === 'filter' && <>Photo Filters</>}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab(null)}
                  className='p-1 rounded-md text-zinc-700 hover:bg-amber-200/60 hover:text-zinc-900 transition-all cursor-pointer'
                >
                  ✕
                </button>
              </div>

              {/* Popover Active Component */}
              <div className='flex justify-center'>
                {activeTab === 'template' && (
                  <TemplateSelector selectedTemplate={selectedTemplate} onSelectTemplate={(t) => { setSelectedTemplate(t); }} />
                )}

                {activeTab === 'inputs' && (
                  selectedTemplate === 'tyler' ? (
                    <TylerIdForm values={tylerFields} onChange={setTylerFields} />
                  ) : (
                    <div className='flex flex-col gap-4 w-full max-w-xs'>
                      <div className='flex flex-col w-full'>
                        <label className='text-xs uppercase tracking-wider font-bold text-zinc-900 mb-1'>Caption / Title</label>
                        <input
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          type="text"
                          className='border-2 border-zinc-900 rounded-lg p-2.5 w-full text-sm font-semibold bg-white shadow-[2px_2px_0px_#18181b] focus:outline-none focus:ring-2 focus:ring-amber-400'
                          placeholder="What’s on your mind?"
                          maxLength={50}
                          ref={titleRef}
                        />
                      </div>
                      <div className='flex flex-col w-full'>
                        <label className='text-xs uppercase tracking-wider font-bold text-zinc-900 mb-1'>Stamp Date</label>
                        <input
                          onChange={(e) => {
                            const value = e.target.value;
                            if (!value) return setdate('');
                            const [y, m, d] = value.split("-");
                            setdate(`${d}.${m}.${y}`);
                          }}
                          type="date"
                          className='border-2 border-zinc-900 rounded-lg p-2.5 w-full text-sm font-semibold bg-white shadow-[2px_2px_0px_#18181b] cursor-pointer focus:outline-none font-mono text-zinc-800'
                          ref={dateRef}
                        />
                      </div>
                    </div>
                  )
                )}

                {activeTab === 'style' && (
                  <div className='flex flex-col gap-4 w-full max-w-xs items-center'>
                    <Bold value={textColor} onChange={setTextColor} />
                    <FontStyle selectedFont={font} onFontChange={setFont} />
                  </div>
                )}

                {activeTab === 'color' && (
                  <Bgcolor value={color} onChange={(val) => {
                    if (typeof val === 'string' && !val.startsWith('#')) {
                      setCardTheme(val);
                    } else {
                      setColor(val);
                    }
                  }} />
                )}

                {activeTab === 'filter' && (
                  <Filter onFilterChange={setFilter} />
                )}
              </div>
            </div>
          )}

          {/* Floating Bottom Control Dock Bar */}
          <div className='bg-[#f2edd9]/95 backdrop-blur-xl border-2 border-zinc-900 shadow-[6px_6px_0px_#18181b] rounded-full px-3 py-2 flex items-center gap-1.5 md:gap-2.5 max-w-full overflow-x-auto no-scrollbar'>

            {/* Dock Tab Buttons */}
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'template' ? null : 'template')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border-2 ${activeTab === 'template'
                  ? 'bg-amber-300 text-zinc-900 border-zinc-900 shadow-[2px_2px_0px_#18181b]'
                  : 'bg-white/80 text-zinc-800 border-zinc-900/30 hover:border-zinc-900 hover:bg-amber-100/80'
                }`}
            >
              <span>Template</span>
            </button>

            {selectedTemplate !== 'download' && (
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === 'inputs' ? null : 'inputs')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border-2 ${activeTab === 'inputs'
                    ? 'bg-amber-300 text-zinc-900 border-zinc-900 shadow-[2px_2px_0px_#18181b]'
                    : 'bg-white/80 text-zinc-800 border-zinc-900/30 hover:border-zinc-900 hover:bg-amber-100/80'
                  }`}
              >
                <span>Details</span>
              </button>
            )}

            {selectedTemplate === 'polaroid' && (
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === 'style' ? null : 'style')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border-2 ${activeTab === 'style'
                    ? 'bg-amber-300 text-zinc-900 border-zinc-900 shadow-[2px_2px_0px_#18181b]'
                    : 'bg-white/80 text-zinc-800 border-zinc-900/30 hover:border-zinc-900 hover:bg-amber-100/80'
                  }`}
              >
                <span>Typography</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'color' ? null : 'color')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border-2 ${activeTab === 'color'
                  ? 'bg-amber-300 text-zinc-900 border-zinc-900 shadow-[2px_2px_0px_#18181b]'
                  : 'bg-white/80 text-zinc-800 border-zinc-900/30 hover:border-zinc-900 hover:bg-amber-100/80'
                }`}
            >
              <span>Palette</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'filter' ? null : 'filter')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border-2 ${activeTab === 'filter'
                  ? 'bg-amber-300 text-zinc-900 border-zinc-900 shadow-[2px_2px_0px_#18181b]'
                  : 'bg-white/80 text-zinc-800 border-zinc-900/30 hover:border-zinc-900 hover:bg-amber-100/80'
                }`}
            >
              <span>Filter</span>
            </button>

            <div className='h-5 w-[1px] bg-zinc-900/20 mx-0.5' />

            {/* Quick Upload Action */}
            <form action="" className='flex items-center gap-1.5'>
              <input id='file-dock' onChange={handleUpload} accept="image/*" type="file" className='hidden' />
              <label
                htmlFor='file-dock'
                className='px-3 py-1.5 rounded-full bg-amber-400 hover:bg-amber-500 text-zinc-900 font-bold text-xs uppercase tracking-wider cursor-pointer border-2 border-zinc-900 shadow-[2px_2px_0px_#18181b] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center gap-1'
              >
                <TbUpload className='size-4' />
                <span>Upload</span>
              </label>

              <button
                type="button"
                onClick={handleReset}
                title="Reset Card"
                className='p-1.5 rounded-full bg-white hover:bg-rose-100 text-zinc-900 border-2 border-zinc-900 shadow-[1.5px_1.5px_0px_#18181b] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer'
              >
                <RiResetLeftLine className='size-4' />
              </button>
            </form>

            {image && (
              <button
                type="button"
                onClick={handleDownload}
                className='px-3.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-amber-300 font-bold text-xs uppercase tracking-wider cursor-pointer border-2 border-zinc-900 shadow-[2px_2px_0px_#d97706] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center gap-1.5'
              >
                <MdOutlineFileDownload className='size-4' />
                <span>Export</span>
              </button>
            )}

          </div>
        </div>

      </div>
    </>
  )
}

export default App
