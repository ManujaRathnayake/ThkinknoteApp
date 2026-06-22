import React from 'react';
import { FileQuestion, Plus } from 'lucide-react'; // icons සඳහා lucide-react පාවිච්චි කර ඇත

export default function NotesNotFound({ onAddNote }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] w-full px-4 text-center">
      
      {/* Icon Area with Glow Effect */}
      <div className="relative mb-6 flex items-center justify-center w-24 h-24 rounded-full bg-slate-800/50 border border-slate-700 shadow-xl shadow-cyan-500/5">
        <FileQuestion className="w-12 h-12 text-cyan-400 animate-pulse" />
        <span className="absolute top-2 right-2 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
        </span>
      </div>

      {/* Text Content */}
      <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">
        No Notes Found
      </h3>
      <p className="text-slate-400 max-w-sm mb-8 text-sm leading-relaxed">
        It looks like you haven't created any notes yet. Start capturing your thoughts and ideas today!
      </p>

      {/* Interactive Call-to-Action Button */}
      {onAddNote && (
        <button
          onClick={onAddNote}
          className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium text-sm rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 duration-200" />
          Create Your First Note
        </button>
      )}
    </div>
  );
}