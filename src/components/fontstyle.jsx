import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const fonts = [
    { name: "System Default", value: "sans-serif" },
    { name: "Space Grotesk (Retro)", value: "'Space Grotesk', sans-serif" },
    { name: "Courier Prime (Analog)", value: "'Courier Prime', monospace" },
    { name: "Arial", value: "Arial, sans-serif" },
    { name: "Georgia", value: "Georgia, serif" },
    { name: "Helvetica", value: "Helvetica, sans-serif" },
    { name: "Times New Roman", value: "'Times New Roman', serif" },
    { name: "Verdana", value: "Verdana, sans-serif" },
    { name: "Courier New", value: "'Courier New', monospace" },
    { name: "Impact", value: "Impact, sans-serif" },
    { name: "Trebuchet MS", value: "'Trebuchet MS', sans-serif" },
    { name: "Garamond", value: "Garamond, serif" },
    { name: "Comic Sans MS", value: "'Comic Sans MS', cursive" },
    { name: "Consolas", value: "Consolas, monospace" },
];

function FontStyle({ selectedFont, onFontChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (font) => {
        onFontChange(font.value);
        setIsOpen(false);
    };

    const currentFontName = fonts.find(f => f.value === selectedFont)?.name || "System Default";

    return (
        <div className="flex flex-col w-70 font-retro" ref={dropdownRef}>
            <div className='flex items-center gap-2 mb-2'>
                <span className='text-xs font-mono font-bold bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded border border-amber-900/30'>03</span>
                <h1 className='text-sm uppercase tracking-wider font-bold text-zinc-900'>Font Style</h1>
            </div>

            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-70 px-3 py-2.5 bg-white border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] rounded-lg text-sm font-semibold flex justify-between items-center cursor-pointer hover:bg-amber-50/80 transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                >
                    <span className="truncate mr-2 font-mono text-zinc-900" style={{ fontFamily: selectedFont }}>{currentFontName}</span>
                    <ChevronDown size={18} className={`transform transition-transform duration-200 text-zinc-800 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                    <div className="absolute top-full left-0 w-70 mt-1.5 bg-white border-2 border-zinc-900 shadow-[4px_4px_0px_#18181b] rounded-lg z-50 max-h-60 overflow-y-auto p-1">
                        {fonts.map((font) => (
                            <div
                                key={font.name}
                                onClick={() => handleSelect(font)}
                                className={`px-3 py-2 rounded-md cursor-pointer hover:bg-amber-100/70 flex items-center justify-between transition-colors ${selectedFont === font.value ? 'bg-amber-200/80 font-bold' : ''}`}
                                style={{ fontFamily: font.value }}
                            >
                                <span className="text-sm text-zinc-900">{font.name}</span>
                                {selectedFont === font.value && <Check size={16} className="text-zinc-900" />}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default FontStyle;
