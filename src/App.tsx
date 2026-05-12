import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Terminal, 
  ShieldAlert, 
  Target, 
  Lock, 
  Globe, 
  Zap, 
  Briefcase, 
  ChevronRight, 
  AlertTriangle,
  Code,
  FileSearch,
  Eye,
  Activity,
  Cpu,
  Monitor,
  Skull
} from 'lucide-react';

const COUNTDOWN_TARGET = new Date('2026-05-25T00:00:00');
const INTRO_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3';

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = COUNTDOWN_TARGET.getTime() - now.getTime();
      if (difference <= 0) {
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return timeLeft;
}

const TerminalText = ({ text, delay = 0, speed = 50 }: { text: string; delay?: number, speed?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [start, setStart] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStart(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!start) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, start, speed]);

  return (
    <span className="font-mono">
      {displayedText}
      {displayedText.length < text.length && <span className="terminal-cursor" />}
    </span>
  );
};

export default function App() {
  const countdown = useCountdown();
  const { scrollYProgress } = useScroll();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [teaserPhase, setTeaserPhase] = useState(0); // 0: Idle, 1: Intro1, 2: Intro2, 3: Intro3, 4: Strobe, 5: Done
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const bgColor = "#050505";
  const textColor = "#ffffff";

  useEffect(() => {
    // Start Teaser Sequence Automatically
    setTeaserPhase(1);
    
    const timers = [
      setTimeout(() => setTeaserPhase(2), 1200),
      setTimeout(() => setTeaserPhase(3), 2400),
      setTimeout(() => setTeaserPhase(4), 3600),
      setTimeout(() => {
        setTeaserPhase(5);
        setIsUnlocked(true);
      }, 4500)
    ];

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  useEffect(() => {
    const playAudio = () => {
      if (!audioRef.current) {
        audioRef.current = new Audio(INTRO_SOUND_URL);
        audioRef.current.volume = 0.6;
      }
      audioRef.current.play().catch(() => {
        // If autoplay is blocked, it will play on next interaction
        console.log("Autoplay blocked, waiting for interaction");
      });
    };

    // Try immediately
    playAudio();

    // Also attach to first interaction to ensure it plays
    const handleInteraction = () => {
      playAudio();
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('scroll', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  return (
    <motion.div 
      style={{ backgroundColor: bgColor, color: textColor }}
      className="min-h-screen relative overflow-x-hidden font-sans transition-colors duration-300"
    >
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1, ease: "circIn" }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6 text-center select-none"
          >
            <div className="absolute inset-0 tech-grid opacity-20" />
            <div className="absolute inset-0 scanlines opacity-30" />
            <div className="absolute inset-0 noise-overlay opacity-10" />
            
            {/* Teaser Sequence */}
            <div className="relative z-10 w-full max-w-4xl">
              <AnimatePresence mode="wait">
                {teaserPhase === 1 && (
                  <motion.h2 
                    key="t1"
                    initial={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
                    className="text-fluid-hero font-display font-black text-white uppercase tracking-[0.2em] leading-tight glitch-text"
                    data-text="THE GRID IS VULNERABLE"
                  >
                    THE GRID IS VULNERABLE
                  </motion.h2>
                )}
                {teaserPhase === 2 && (
                  <motion.h2 
                    key="t2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter"
                  >
                    ONE CHANCE
                  </motion.h2>
                )}
                {teaserPhase === 3 && (
                  <motion.h2 
                    key="t3"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 2 }}
                    className="text-6xl md:text-9xl font-display font-black text-heist-red uppercase italic"
                  >
                    THE VAULT IS OPEN
                  </motion.h2>
                )}
                {teaserPhase === 4 && (
                  <motion.div
                    key="t4"
                    animate={{ opacity: [0, 1, 0, 1, 0, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="text-5xl md:text-[12rem] font-display font-black text-white"
                  >
                    BREACHING...
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cinematic Strobe Overlays */}
            {teaserPhase > 0 && teaserPhase < 5 && (
              <motion.div 
                animate={{ opacity: [0, 0.05, 0] }}
                transition={{ duration: 0.1, repeat: Infinity }}
                className="absolute inset-0 bg-white pointer-events-none" 
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HUD ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none z-[60] border-[1vw] border-white/5" />
      <div className="fixed top-0 left-0 right-0 h-[10vh] pointer-events-none z-[60] flex items-center justify-between px-8 border-b border-white/5 bg-black/40 backdrop-blur-sm">
        <div className="flex gap-4 items-center">
            <div className="w-2 h-2 bg-heist-red animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.4em] opacity-40 uppercase">System: Initialized</span>
        </div>
        <div className="flex gap-8 items-center font-mono text-[10px] tracking-[0.2em] opacity-40 uppercase">
            <span>Terminal_v.2.0.4</span>
            <div className="flex gap-1">
                {[1, 2, 3].map(i => <div key={i} className="w-1 h-3 bg-white/20" />)}
            </div>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 h-[8vh] pointer-events-none z-[60] flex items-center justify-between px-8 border-t border-white/5 bg-black/20">
        <span className="font-mono text-[8px] tracking-[0.8em] opacity-20 uppercase">Coordinate Strike Protocol // 2026.05.25</span>
        <div className="flex gap-6 items-center">
            <span className="font-mono text-[8px] tracking-[0.4em] opacity-20 uppercase animate-pulse">Encrypted Channel // Active</span>
            <ShieldAlert size={12} className="text-heist-red opacity-40" />
        </div>
      </div>

      {/* Background Overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 tech-grid opacity-10" />
        <div className="absolute inset-0 tech-grid-sm opacity-10" />
        <div className="scanner-line opacity-20" />
        <div className="absolute inset-0 crt-overlay opacity-30" />
        <div className="absolute inset-0 scanlines opacity-5" />
        <div className="absolute inset-0 noise-overlay opacity-10" />
      </div>

      <motion.section 
        className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center z-10 pt-[15vh]"
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.1, y: 30 }}
          animate={isUnlocked ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col items-center"
        >
          <div className="mb-8 p-1 industrial-border">
            <div className="px-4 py-1 bg-heist-red/20">
                <span className="font-mono text-[10px] tracking-[0.8em] uppercase font-bold text-heist-red ml-[0.8em]">
                Classification: Top Secret
                </span>
            </div>
          </div>
          
          <h1 className="flex flex-col md:flex-row items-center justify-center gap-0 text-fluid-hero font-display font-black leading-none tracking-tighter uppercase relative glitch-text" data-text="ZeroDay Heist">
            <span className="px-2 md:px-6 relative group">
              ZeroDay
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, delay: 0.5, ease: "circOut" }}
                className="absolute top-0 left-0 h-[2px] bg-heist-red shadow-[0_0_15px_#ff0033]"
              />
            </span>
            <span className="text-heist-red relative px-2 md:px-6">
              Heist
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-1 md:bottom-4 left-2 md:left-6 right-2 md:right-6 h-1.5 md:h-3 bg-heist-red origin-left shadow-[0_0_20px_#ff0033]" 
              />
            </span>
          </h1>
          
          <div className="mt-12 flex items-center gap-10">
            <div className="h-[1px] w-20 bg-white/20" />
            <span className="font-sans text-sm md:text-xl tracking-[1.2em] uppercase font-light opacity-30 ml-[1.2em]">
              De-Coding Continues
            </span>
            <div className="h-[1px] w-20 bg-white/20" />
          </div>
        </motion.div>

        <div className="max-w-2xl mx-auto mt-12 mb-16 h-12 text-lg md:text-xl font-mono opacity-50 lowercase tracking-tight border-b border-white/5 pb-2">
          <TerminalText 
            text="systems vulnerable. vault status: locked. objective: extract all flags." 
            delay={1500} 
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isUnlocked ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 3 }}
          className="flex flex-col items-center gap-16"
        >
          {/* Re-designed ENTER THE HEIST Button */}
          <button className="relative group px-12 py-8 md:px-20 md:py-10 bg-heist-red text-white transition-all active:scale-95 shadow-[0_0_50px_rgba(196,18,18,0.3)] overflow-hidden industrial-border">
            <div className="relative z-10 flex items-center gap-6">
              <span className="font-display font-black text-3xl md:text-5xl uppercase tracking-[0.2em] leading-none">
                Enter Protocol
              </span>
              <ChevronRight className="group-hover:translate-x-3 transition-transform" size={40} />
            </div>
            <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            
            {/* HUD Corner Elements */}
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/20 group-hover:border-white transition-colors" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/20 group-hover:border-white transition-colors" />
          </button>
          
          {/* Simplified Countdown */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-5xl px-6 relative">
            <div className="absolute -top-12 left-0 w-full flex justify-between font-mono text-[8px] opacity-40 uppercase tracking-[0.5em] font-black">
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-heist-red animate-ping" /> System_Activation_Timer</span>
                <span>Coordinates: 51.5074° N, 0.1278° W</span>
            </div>
            {Object.entries(countdown).map(([label, value]) => (
              <div key={label} className="relative flex flex-col items-center p-8 border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-md group hover:border-heist-red/50 transition-all duration-500 hover:-translate-y-1">
                <div className="absolute top-0 left-0 w-6 h-[1px] bg-heist-red shadow-[0_0_10px_#ff0033]" />
                <div className="absolute top-0 left-0 w-[1px] h-6 bg-heist-red shadow-[0_0_10px_#ff0033]" />
                
                <span className="text-6xl md:text-8xl font-display font-black tabular-nums border-b-2 border-heist-red/10 pb-4 w-full text-center group-hover:text-heist-red group-hover:border-heist-red/40 transition-all duration-300">
                  {value.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.6em] text-white/30 mt-6 font-black group-hover:text-white transition-colors">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <section id="about" className="relative py-32 md:py-60 px-6 z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 md:gap-40 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative industrial-border p-4 order-2 md:order-1 group"
          >
            <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-heist-red opacity-50 group-hover:w-32 group-hover:h-32 transition-all duration-700" />
            <div className="absolute inset-0 bg-black/60 z-10 group-hover:bg-black/20 transition-colors duration-700" />
            <img 
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=1200" 
              alt="Data Center" 
              className="w-full grayscale brightness-75 aspect-video md:aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-10 right-10 flex flex-col items-end z-20 font-mono text-[10px] tracking-widest text-heist-red font-black">
                <span>SECTOR_ALPHA</span>
                <span>UPLINK_VERIFIED</span>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10 md:space-y-16 order-1 md:order-2"
          >
            <div className="inline-flex items-center gap-4">
                <div className="w-12 h-[1px] bg-heist-red" />
                <span className="font-mono text-xs text-heist-red tracking-[0.5em] uppercase font-black">Core Intelligence</span>
            </div>
            <h3 className="text-6xl md:text-[11rem] font-display font-black uppercase tracking-tighter leading-[0.8] glitch-text" data-text="The Strategy">
              The <span className="text-heist-red">Strategy</span>
            </h3>
            <div className="space-y-8">
                <p className="text-2xl md:text-4xl font-light leading-tight text-white/40">
                  We are not here to disrupt. We are here to <span className="text-white italic underline decoration-heist-red underline-offset-8">synchronize</span>.
                </p>
                <p className="text-lg md:text-xl text-white/30 font-mono font-light leading-relaxed max-w-xl border-l border-white/10 pl-8">
                  The architecture was built to survive external shocks, but it was never designed to resist its own creators. Our exploit resides in the latency.
                </p>
            </div>
            <div className="flex gap-12 font-mono text-xs uppercase tracking-[0.4em] text-heist-red font-black">
              <span className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-heist-red" /> DISTRIBUTION</span>
              <span className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-heist-red" /> AUTONOMY</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Challenge Vaults */}
      <section id="vaults" className="py-24 md:py-48 px-6 z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 md:mb-32 gap-12">
          <div className="space-y-6">
            <div className="font-mono text-[8px] text-heist-red tracking-[1em] uppercase font-black">Active Sectors</div>
            <h2 className="text-6xl md:text-[10rem] font-display font-black uppercase tracking-tighter leading-none glitch-text" data-text="Target Vaults">
                Target<br /><span className="text-heist-red">Vaults</span>
            </h2>
          </div>
          <div className="max-w-md md:text-right p-6 bg-white/[0.02] border border-white/5 font-mono text-[10px] md:text-xs uppercase tracking-widest leading-loose text-white/40">
             Warning: 6 high-value targets identified. Multi-layer encryption active. 
             Breach attempts must be coordinated via encrypted uplink.
          </div>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { cat: "Web Vault", icon: <Globe size={48} />, tag: "WEB-01", desc: "Exploitation of edge servers and ghost APIs. Bypass the firewalls." },
            { cat: "Cipher Room", icon: <Lock size={48} />, tag: "CRYPTO-02", desc: "Adversarial linguistic analysis and RSA cracking. Break the code." },
            { cat: "Intel Division", icon: <Eye size={48} />, tag: "OSINT-03", desc: "Reclamation of leaked metadata and digital shadows of the elite." },
            { cat: "Decoder Lab", icon: <Code size={48} />, tag: "REV-04", desc: "Reversing optimized machine instructions. Find the hidden gates." },
            { cat: "Breach Ops", icon: <Terminal size={48} />, tag: "PWN-05", desc: "Memory corruption and privilege escalation. Gain root access." },
            { cat: "Evidence Unit", icon: <FileSearch size={48} />, tag: "FOR-06", desc: "Surgical extraction of shredded disk data. The truth is buried deep." }
          ].map((vault, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-12 bg-gradient-to-b from-white/[0.04] to-transparent hover:from-heist-red/[0.08] transition-all duration-500 border border-white/5 cursor-crosshair relative overflow-hidden flex flex-col justify-between aspect-square md:aspect-auto md:min-h-[450px]"
            >
              <div className="absolute top-0 right-0 p-8 font-display text-[120px] opacity-[0.03] font-black group-hover:opacity-[0.08] group-hover:text-heist-red transition-all duration-700 pointer-events-none">0{idx + 1}</div>
              
              <div>
                <div className="flex justify-between items-start mb-16">
                    <div className="text-heist-red transition-all duration-500 p-4 border border-heist-red/20 group-hover:bg-heist-red group-hover:text-white group-hover:glow-red">
                        {vault.icon}
                    </div>
                    <div className="font-mono text-[10px] text-white/40 tracking-[0.4em] font-black group-hover:text-heist-red transition-colors">{vault.tag}</div>
                </div>
                
                <h4 className="text-5xl font-display font-black uppercase mb-6 tracking-tighter leading-none group-hover:translate-x-2 transition-transform duration-500">{vault.cat}</h4>
                <p className="text-white/30 group-hover:text-white/70 text-xl font-light leading-relaxed transition-colors duration-500 max-w-[80%]">{vault.desc}</p>
              </div>
              
              <div className="flex justify-between items-center group-hover:translate-x-2 transition-transform duration-500 pt-12">
                <span className="font-mono text-[10px] uppercase tracking-[0.6em] text-heist-red font-black">Initialize_Breach</span>
                <div className="w-10 h-10 rounded-full border border-heist-red/20 flex items-center justify-center group-hover:bg-heist-red group-hover:text-white transition-all duration-500">
                    <ChevronRight size={20} />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-heist-red transition-all duration-700 ease-out" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Rules Section */}
      <section id="brief" className="py-32 md:py-60 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-heist-red/5 -skew-x-[20deg] translate-x-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 md:gap-40 relative z-10">
          <div className="space-y-16">
            <div className="space-y-4">
                <div className="font-mono text-[10px] text-heist-red tracking-[1em] uppercase font-black">Operational Guidelines</div>
                <h2 className="text-7xl md:text-[10rem] font-display font-black uppercase tracking-tighter leading-[0.8] glitch-text" data-text="Mission Brief">
                Mission<br /><span className="text-heist-red">Brief</span>
                </h2>
            </div>
            <div className="space-y-12">
              {[
                { title: "SCOPE INTEGRITY", info: "Any attempt to access systems outside designated strike zones will result in immediate protocol termination." },
                { title: "NON-DESTRUCTIVE", info: "Our objective is information extraction. Hardware integrity must be maintained at all costs." },
                { title: "STRICT CURRENCY", info: "All captured intel must be formatted as HEIST{flag_content} for verification on the underground uplink." }
              ].map((rule, idx) => (
                <div key={idx} className="flex gap-10 items-start group">
                  <div className="font-display text-6xl text-heist-red/10 group-hover:text-heist-red transition-all duration-500 font-black leading-none">0{idx + 1}</div>
                  <div className="pt-2">
                    <h5 className="text-3xl font-display font-black uppercase mb-3 group-hover:translate-x-2 transition-transform duration-500 tracking-tight">{rule.title}</h5>
                    <p className="text-white/40 text-lg font-light leading-relaxed group-hover:text-white/60 transition-colors">{rule.info}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative industrial-border p-12 bg-white/[0.02] backdrop-blur-xl border-white/5 group">
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-heist-red/10 blur-[100px] pointer-events-none" />
             <div className="space-y-12 font-mono text-sm uppercase tracking-tight opacity-70">
               <div className="flex justify-between items-center border-b border-white/10 pb-6">
                 <span className="text-heist-red font-black tracking-[0.5em] flex items-center gap-3">
                    <div className="w-2 h-2 bg-heist-red shadow-[0_0_10px_#ff0033]" />
                    CLASSIFIED_DOSSIER
                 </span>
                 <span className="text-[10px] opacity-40">UPLINK: ACTIVE</span>
               </div>
               
               <div className="space-y-6 text-xs md:text-sm leading-loose">
                 <p className="text-white/80"><span className="text-heist-red font-black mr-4">//</span>[ANALYSIS]: The target infrastructure shows a cyclic vulnerability pattern every 200ms. Strike team must hit the synchronization window precisely.</p>
                 <p className="text-white/40 italic">Note: The Professor expects zero traces. Ensure all logs are purged post-extraction. Any failure in stealth protocol puts the entire crew at risk.</p>
               </div>

               <div className="p-8 bg-heist-red/5 border-l-4 border-heist-red text-heist-red font-black italic shadow-[inset_0_0_20px_rgba(255,0,51,0.1)]">
                 Warning: Adaptive IDS (Intrusion Detection System) version 8.2 active. Stealth protocols are mandatory for all operatives.
               </div>

               <div className="pt-20 flex justify-between items-end">
                 <div>
                    <Skull size={80} className="text-heist-red opacity-20 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" />
                    <div className="mt-6 text-[10px] tracking-[0.4em] font-black opacity-30">AUTHORIZED_BY_PROFESSOR</div>
                 </div>
                 <div className="text-right space-y-2 opacity-20 font-black">
                    <div className="text-[8px]">ID: 9920-X-ALPHA</div>
                    <div className="text-[8px]">LEVEL: OMEGA_CLEARANCE</div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Prize Pool */}
      <section className="py-32 md:py-80 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
          <div className="text-center mb-40">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-block px-6 py-2 border border-heist-red/40 bg-heist-red/10 mb-8"
            >
                <span className="font-mono text-[10px] text-heist-red tracking-[1em] uppercase font-black ml-[1em]">Dividend Distribution</span>
            </motion.div>
            <h2 className="text-7xl md:text-[15rem] font-display font-black uppercase tracking-tighter glitch-text leading-none mb-4" data-text="The Spoils">
              The <span className="text-heist-red text-shadow-[0_0_40px_#ff0033]">Spoils</span>
            </h2>
            <div className="h-[2px] w-60 bg-gradient-to-r from-transparent via-heist-red to-transparent mx-auto" />
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 md:gap-16 w-full place-items-center">
            {[
              { role: "MASTERMIND", title: "IDENT_CREW_LEAD", prize: "$10,000", icon: <Briefcase size={48} />, class: "lg:order-2 lg:scale-110", border: "border-heist-red/40" },
              { role: "ELITE BREACHER", title: "IDENT_OPERATOR_01", prize: "$5,000", icon: <Activity size={40} />, class: "lg:order-1", border: "border-white/10" },
              { role: "SHADOW AGENT", title: "IDENT_OPERATIVE_02", prize: "$2,500", icon: <Zap size={40} />, class: "lg:order-3", border: "border-white/10" }
            ].map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={`w-full max-w-sm p-12 md:p-20 bg-black/40 border ${p.border} text-center group hover:bg-black transition-all duration-700 relative overflow-hidden backdrop-blur-3xl group shadow-[0_0_30px_rgba(0,0,0,0.5)] ${p.class}`}
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-heist-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="text-heist-red mb-12 flex justify-center group-hover:scale-125 transition-all duration-700 group-hover:text-white group-hover:glow-red">{p.icon}</div>
                <div className="font-mono text-[10px] uppercase opacity-30 tracking-[0.5em] mb-6 font-black group-hover:text-heist-red transition-all duration-500">{p.title}</div>
                <h4 className="text-6xl md:text-8xl font-display font-black uppercase mb-4 tracking-tighter group-hover:text-white transition-colors duration-500">{p.prize}</h4>
                <div className="text-sm font-display font-black uppercase text-white/40 mb-12 tracking-[0.3em] group-hover:text-heist-red transition-colors duration-500">{p.role}</div>
                <div className="h-1 w-20 bg-heist-red/20 mx-auto group-hover:bg-heist-red transition-all duration-700 group-hover:w-full group-hover:glow-red" />
                
                {/* Technical Overlay */}
                <div className="absolute top-4 left-4 font-mono text-[8px] opacity-10 uppercase tracking-widest font-black">CONTRACT_CONFIRMED</div>
                <div className="absolute bottom-4 right-4 font-mono text-[8px] opacity-10 uppercase tracking-widest font-black">ASSET_CLASS_A</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-48 md:py-80 relative overflow-hidden text-center z-10">
        <div className="absolute inset-0 tech-grid opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="relative z-10 px-6 max-w-5xl mx-auto"
        >
          <div className="mb-12 flex items-center justify-center gap-6">
              <div className="h-[1px] w-12 bg-heist-red" />
              <div className="font-mono text-[10px] md:text-xs uppercase tracking-[1em] text-heist-red font-black animate-pulse">Critical Phase Imminent</div>
              <div className="h-[1px] w-12 bg-heist-red" />
          </div>
          
          <h2 className="text-6xl md:text-[14rem] font-display font-black uppercase tracking-tighter mb-16 leading-[0.8] glitch-text" data-text="Enlist In The Heist">
            Enlist In The <span className="text-heist-red underline decoration-8 underline-offset-[20px]">Heist</span>
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <button className="w-full md:w-auto px-16 py-8 bg-heist-red text-white font-display font-black text-3xl uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all active:scale-95 shadow-[0_0_80px_rgba(196,18,18,0.4)] industrial-border">
                Join Resistance
            </button>
            <button className="w-full md:w-auto px-16 py-8 bg-transparent text-white font-display font-black text-3xl uppercase tracking-[0.2em] hover:bg-white/5 transition-all active:scale-95 border border-white/20">
                View Dossier
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-20">
          <div className="space-y-8">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-heist-red flex items-center justify-center">
                  <Monitor size={24} />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-display font-black text-4xl tracking-tighter uppercase">ZeroDay</span>
                  <span className="font-mono text-[8px] text-heist-red tracking-[0.5em] uppercase font-bold">Resistance Core</span>
                </div>
             </div>
             <p className="text-white/10 font-mono text-[10px] uppercase tracking-widest leading-relaxed max-w-xs font-black">
               The vault is inevitable. The resistance is global. Join the signal.
             </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-20">
            {[
              { label: 'NODES', items: ['Onion', 'Sync', 'Mesh'] },
              { label: 'STRATEGY', items: ['Plan', 'Tools', 'Archives'] },
              { label: 'CREWS', items: ['Tokyo', 'Nairobi', 'Berlin'] },
              { label: 'SEC', items: ['Auth', 'Keys', 'Sign'] }
            ].map(col => (
              <div key={col.label} className="space-y-6">
                <span className="font-mono text-[10px] text-heist-red uppercase tracking-[0.4em] font-black">{col.label}</span>
                <div className="flex flex-col gap-4">
                  {col.items.map(item => (
                    <a key={item} href="#" className="font-display text-lg uppercase tracking-widest text-white/20 hover:text-white transition-colors">{item}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </motion.div>
  );
}