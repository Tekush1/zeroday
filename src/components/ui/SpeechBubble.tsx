import React from 'react';

interface SpeechBubbleProps {
  children: React.ReactNode;
  className?: string;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ children, className = "" }) => (
  <div className={`speech-bubble ${className}`}>
    <div className="speech-bubble-inner">
      {children}
    </div>
  </div>
);

export default SpeechBubble;
