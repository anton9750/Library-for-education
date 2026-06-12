import React from 'react';

export default function Card({ children, style = {} }) {
  return (
    <div 
      className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm" 
      style={style}
    >
      {children}
    </div>
  );
}