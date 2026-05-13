import React, { useState } from 'react';
import { ChevronDown, HelpCircle, BookOpen } from 'lucide-react';
import ComicPanel from '../ui/ComicPanel';

interface FAQProps {
  onReadBook?: () => void;
}

const FAQ: React.FC<FAQProps> = ({ onReadBook }) => {
  const faqs = [
    {
      q: "WHAT IS ZERO DAYHEIST?",
      a: "It's an ultra-exclusive Capture The Flag (CTF) event where elite hackers (hacktivists) test their limits against our high-security virtual vaults."
    },
    {
      q: "HOW DO I JOIN THE RESISTANCE?",
      a: "Click the 'Initialize Mission' or 'Enlist Now' buttons. You'll need to pass the initial decryption test to gain full access to the terminal."
    },
    {
      q: "IS THIS LEGAL?",
      a: "In the digital frontier, laws are just suggestions. But for the record, this is a simulated environment designed for skill evaluation. No actual banks will be harmed."
    },
    {
      q: "WHAT GEAR DO I NEED?",
      a: "A stable uplink, a terminal with Linux/Mac/WSL, and a mind sharp enough to cut through AES-256 encryption. Coffee is highly recommended."
    },
    {
      q: "ARE THERE PRIZES?",
      a: "The top 'Breachers' will receive classified assets, exclusive bounties, and legendary status within our mesh network."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="space-y-12 py-12">
      <div className="flex items-center gap-6">
        <div className="bg-black text-white p-4 -rotate-3 border-4 border-black">
          <HelpCircle size={40} />
        </div>
        <h2 className="font-comic text-6xl md:text-8xl uppercase text-black tracking-tighter italic underline decoration-comic-red decoration-8">
          INTEL_FAQs
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="cursor-pointer group" onClick={() => setOpenIndex(openIndex === idx ? null : idx)}>
            <ComicPanel 
              className={`transition-all duration-300 ${openIndex === idx ? 'bg-comic-blue/5 border-comic-blue' : 'bg-white hover:bg-comic-yellow/10'}`}
              halftone={openIndex === idx}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className={`font-comic text-3xl md:text-4xl uppercase leading-none ${openIndex === idx ? 'text-comic-blue' : 'text-black'}`}>
                  {faq.q}
                </h3>
                <ChevronDown 
                  className={`transition-transform duration-300 shrink-0 ${openIndex === idx ? 'rotate-180 text-comic-blue' : 'text-black'}`} 
                  size={32} 
                />
              </div>
              
              {openIndex === idx && (
                <div className="mt-6 pt-6 border-t-4 border-black/10 animate-in fade-in slide-in-from-top-4 duration-300">
                  <p className="font-sans text-xl font-bold text-black/70 leading-relaxed uppercase">
                    {faq.a}
                  </p>
                </div>
              )}
            </ComicPanel>
          </div>
        ))}
      </div>
      
      <div className="industrial-line mt-8 opacity-20" />

      <div className="flex flex-col items-center gap-6 pt-12">
        <h3 className="font-comic text-4xl uppercase text-black text-center">Want to know the back-story?</h3>
        <button 
          onClick={onReadBook}
          className="comic-button !bg-comic-red !text-white !text-4xl md:text-5xl px-16 py-8 hover:!bg-comic-blue group"
        >
          <BookOpen className="inline-block mr-4 group-hover:rotate-12 transition-transform" size={48} />
          READ THE BOOK
        </button>
      </div>
    </section>
  );
};

export default FAQ;
