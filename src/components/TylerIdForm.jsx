import React from 'react';
import { HiOutlineIdentification } from 'react-icons/hi2';

export default function TylerIdForm({ values, onChange }) {
  const handleChange = (field, val) => {
    onChange((prev) => ({
      ...prev,
      [field]: val,
    }));
  };

  return (
    <div className="flex flex-col w-70 gap-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-mono font-bold bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded border border-amber-900/30">
          01
        </span>
        <h1 className="text-sm uppercase tracking-wider font-bold text-zinc-900 flex items-center gap-1.5">
          <HiOutlineIdentification className="w-4 h-4 text-amber-600" />
          ID License Information
        </h1>
      </div>

      {/* Issued to */}
      <div className="flex flex-col">
        <label className="text-xs font-bold text-zinc-700 mb-1">Issued to:</label>
        <input
          type="text"
          value={values.issuedTo}
          onChange={(e) => handleChange('issuedTo', e.target.value)}
          placeholder="Tyler Baudelaire"
          maxLength={30}
          className="border-2 border-zinc-900 rounded-lg p-2.5 w-full text-sm font-semibold bg-white shadow-[2px_2px_0px_#18181b] focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono text-zinc-900"
        />
      </div>

      {/* Date of birth */}
      <div className="flex flex-col">
        <label className="text-xs font-bold text-zinc-700 mb-1">Date of birth</label>
        <input
          type="text"
          value={values.dob}
          onChange={(e) => handleChange('dob', e.target.value)}
          placeholder="03/06/91"
          maxLength={20}
          className="border-2 border-zinc-900 rounded-lg p-2.5 w-full text-sm font-semibold bg-white shadow-[2px_2px_0px_#18181b] focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono text-zinc-900"
        />
      </div>

      {/* Place of issue */}
      <div className="flex flex-col">
        <label className="text-xs font-bold text-zinc-700 mb-1">Place of issue</label>
        <input
          type="text"
          value={values.placeOfIssue}
          onChange={(e) => handleChange('placeOfIssue', e.target.value)}
          placeholder="Hawthorne, CA"
          maxLength={30}
          className="border-2 border-zinc-900 rounded-lg p-2.5 w-full text-sm font-semibold bg-white shadow-[2px_2px_0px_#18181b] focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono text-zinc-900"
        />
      </div>



      {/* Signature */}
      <div className="flex flex-col">
        <label className="text-xs font-bold text-zinc-700 mb-1">Enter signature text</label>
        <input
          type="text"
          value={values.signature}
          onChange={(e) => handleChange('signature', e.target.value)}
          placeholder="Tyler"
          maxLength={25}
          className="border-2 border-zinc-900 rounded-lg p-2.5 w-full text-sm font-semibold bg-white shadow-[2px_2px_0px_#18181b] focus:outline-none focus:ring-2 focus:ring-amber-400 text-zinc-900"
          style={{ fontFamily: "'Nanum Pen Script', 'Rock Salt', cursive" }}
        />
      </div>
    </div>
  );
}
