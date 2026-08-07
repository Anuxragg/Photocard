import React from 'react';
import { HiOutlineSparkles } from 'react-icons/hi2';

export const TEMPLATES = [
  {
    id: 'polaroid',
    name: 'Classic Polaroid',
    type: 'css',
    badge: 'CLASSIC',
    aspect: 'portrait',
  },
  {
    id: 'tyler',
    name: 'Tyler ID Card',
    type: 'image',
    bgSrc: 'https://ntho6.github.io/CMIYGL/static/media/cardbg-yellow.0e6227ea.png',
    copySrc: 'https://ntho6.github.io/CMIYGL/static/media/copylayer.020bc2bd.png',
    src: 'https://ntho6.github.io/CMIYGL/static/media/cardbg-yellow.0e6227ea.png',
    badge: 'HD VINTAGE',
    aspect: 'landscape',
    cardDimensions: 'w-[360px] sm:w-[500px] aspect-[2014/1277]',
    photoSlot: {
      left: '5.8%',
      top: '15.5%',
      width: '41.4%',
      height: '67.2%',
    },
    textSlots: {
      name: { left: '59.5%', top: '20%', width: '35%' },
      date: { left: '65.5%', top: '39.2%', width: '28%' },
    },
  },
  {
    id: 'download',
    name: 'McLovin ID Card',
    type: 'image',
    src: '/cards/download.jfif',
    badge: 'CLASSIC',
    aspect: 'landscape',
    cardDimensions: 'w-[360px] sm:w-[500px] aspect-[1000/630]',
    photoSlot: {
      left: '0.8%',
      top: '2%',
      width: '35%',
      height: '71.5%',
    },
  },
];

export default function TemplateSelector({ selectedTemplate, onSelectTemplate }) {
  return (
    <div className="flex flex-col w-70">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-mono font-bold bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded border border-amber-900/30">
          00
        </span>
        <h1 className="text-sm uppercase tracking-wider font-bold text-zinc-900 flex items-center gap-1.5">
          <HiOutlineSparkles className="w-4 h-4 text-amber-600" />
          Card Template
        </h1>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {TEMPLATES.map((tmpl) => {
          const isSelected = selectedTemplate === tmpl.id;
          return (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => onSelectTemplate(tmpl.id)}
              className={`relative group border-2 rounded-lg p-1.5 flex flex-col items-center justify-between transition-all duration-200 text-left bg-white shadow-[2px_2px_0px_#18181b] cursor-pointer hover:-translate-y-0.5 ${isSelected
                  ? 'border-amber-600 bg-amber-50 ring-2 ring-amber-400 shadow-[3px_3px_0px_#18181b]'
                  : 'border-zinc-900 hover:border-zinc-700'
                }`}
            >
              <div className="w-full h-16 rounded overflow-hidden bg-zinc-100 border border-zinc-900/20 flex items-center justify-center relative">
                {tmpl.type === 'css' ? (
                  <div className="w-full h-full bg-[#e0f2fe] flex flex-col p-1 justify-between items-center border border-zinc-800">
                    <div className="w-8 h-8 bg-zinc-300 rounded border border-zinc-700/50 mt-1" />
                    <div className="w-10 h-1.5 bg-zinc-800 rounded-xs mb-1" />
                  </div>
                ) : (
                  <img
                    src={tmpl.src}
                    alt={tmpl.name}
                    className="w-full h-full object-cover"
                  />
                )}

                {isSelected && (
                  <div className="absolute top-1 right-1 bg-amber-500 text-white rounded-full p-0.5 shadow-sm z-10">
                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="w-full mt-1.5 text-center">
                <p className="text-[11px] font-bold text-zinc-900 truncate leading-tight">
                  {tmpl.name}
                </p>
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-tighter">
                  {tmpl.badge}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
