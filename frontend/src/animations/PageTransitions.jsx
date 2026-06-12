import React from 'react';

/**
 * Reusable layout animations using pure Tailwind transitions.
 * Copy and paste these classes into any component to enable sleek micro-interactions.
 */

export function FadeIn({ children, delay = '0' }) {
  const delayClasses = { '0': 'delay-0', '100': 'delay-100', '200': 'delay-200', '300': 'delay-300' };
  return (
    <div className={`animate-fade-in transition-all opacity-0 translate-y-4 duration-500 ease-out fill-mode-forwards ${delayClasses[delay]}`}
         style={{ animation: 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
      {children}
    </div>
  );
}

export function SlideInLeft({ children }) {
  return (
    <div style={{ animation: 'slideInLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
      {children}
    </div>
  );
}

export function PulsePulse({ children }) {
  return (
    <div className="animate-pulse duration-1000 iteration-count-infinite">
      {children}
    </div>
  );
}

// Global Custom Injectable Keyframe Stylesheet reference code block
export const CSSKeyframesTemplate = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}
`;