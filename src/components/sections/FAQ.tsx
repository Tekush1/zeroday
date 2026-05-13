import React, { useState } from 'react';
import { ChevronDown, HelpCircle, BookOpen } from 'lucide-react';
import ComicPanel from '../ui/ComicPanel';

interface FAQProps {
  onReadBook?: () => void;
}

const FAQ: React.FC<FAQProps> = ({ onReadBook }) => {
  const faqs = [
{
    q: "WHAT IS ZERO DAY HEIST?",
    a: "Zero Day Heist is a 6-hour online Capture The Flag (CTF) competition where participants solve cybersecurity challenges based on real-world attack scenarios including web exploitation, cryptography, forensics, OSINT, reverse engineering, and more."
  },
  {
    q: "WHO CAN PARTICIPATE?",
    a: "Students, cybersecurity enthusiasts, ethical hackers, developers, and beginners from any background can participate. The event is open to all skill levels."
  },
  {
    q: "IS THIS AN ONLINE EVENT?",
    a: "Yes. The entire competition will be conducted online, allowing participants from anywhere in the world to compete remotely."
  },
  {
    q: "CAN I PARTICIPATE SOLO?",
    a: "The event is designed for teams of 2–4 members. Solo participation may not be allowed depending on the final event rules."
  },
  {
    q: "HOW DO I REGISTER?",
    a: "Click the 'Register' or 'Initialize Mission' button on the event page, complete your team details, and secure your slot before registrations close."
  },
  {
    q: "WHAT SKILLS ARE REQUIRED?",
    a: "Basic knowledge of Linux, networking, programming, or cybersecurity concepts is helpful, but the event includes challenges for both beginners and advanced players."
  },
  {
    q: "WHAT CATEGORIES WILL BE INCLUDED?",
    a: "Challenges may include Web Security, Cryptography, Reverse Engineering, OSINT, Digital Forensics, Binary Exploitation, Steganography, Networking, and Miscellaneous problem-solving tasks."
  },
  {
    q: "WHAT TOOLS OR SETUP DO I NEED?",
    a: "A laptop or desktop with a stable internet connection is enough. Linux, Kali Linux, WSL, or macOS is recommended for the best experience."
  },
  {
    q: "IS ZERO DAY HEIST LEGAL?",
    a: "Yes. All challenges are hosted inside a secure sandbox environment created strictly for educational and competitive purposes."
  },
  {
    q: "HOW WILL THE WINNERS BE DECIDED?",
    a: "Teams will be ranked based on points earned by solving challenges. The live leaderboard updates throughout the competition."
  },
  {
    q: "ARE THERE ANY PRIZES?",
    a: "Yes. Top teams will receive exciting rewards, certificates, recognition, sponsor goodies, and additional opportunities that will be revealed soon."
  },
  {
    q: "WILL PARTICIPANTS RECEIVE CERTIFICATES?",
    a: "Yes. Participation certificates and winner certificates will be provided after the event."
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
