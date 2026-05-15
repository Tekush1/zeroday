// Global Comic Sound FX — Web Audio API, no external files
// Each sound is procedurally generated

type SoundType =
  | 'hover'        // subtle tick on hover
  | 'click'        // punchy click
  | 'nav'          // navigation / menu link
  | 'flip'         // comic page flip
  | 'whoosh'       // section enter / big button
  | 'pop'          // speech bubble / badge
  | 'zap'          // CTF / hacker vibe
  | 'confirm'      // success / autoplay on
  | 'cancel';      // close / back

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  try {
    if (!ctx || ctx.state === 'closed') {
      ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  } catch (_) {
    return null;
  }
}

function noise(c: AudioContext, dur: number, freq: number, q: number, vol: number) {
  const size = Math.floor(c.sampleRate * dur);
  const buf = c.createBuffer(1, size, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < size; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / size) * vol;
  const src = c.createBufferSource();
  src.buffer = buf;
  const flt = c.createBiquadFilter();
  flt.type = 'bandpass';
  flt.frequency.value = freq;
  flt.Q.value = q;
  const g = c.createGain();
  g.gain.setValueAtTime(1, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
  src.connect(flt); flt.connect(g); g.connect(c.destination);
  src.start(); src.stop(c.currentTime + dur + 0.01);
}

function tone(c: AudioContext, startF: number, endF: number, dur: number, vol: number, wave: OscillatorType = 'square') {
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = wave;
  osc.connect(g); g.connect(c.destination);
  osc.frequency.setValueAtTime(startF, c.currentTime);
  osc.frequency.exponentialRampToValueAtTime(endF, c.currentTime + dur);
  g.gain.setValueAtTime(vol, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
  osc.start(c.currentTime);
  osc.stop(c.currentTime + dur + 0.01);
}

const sounds: Record<SoundType, () => void> = {
  hover: () => {
    const c = getCtx(); if (!c) return;
    tone(c, 1200, 1400, 0.04, 0.04, 'sine');
  },
  click: () => {
    const c = getCtx(); if (!c) return;
    tone(c, 600, 150, 0.07, 0.2, 'square');
    noise(c, 0.05, 3000, 1, 0.08);
  },
  nav: () => {
    const c = getCtx(); if (!c) return;
    tone(c, 440, 660, 0.08, 0.12, 'triangle');
  },
  flip: () => {
    const c = getCtx(); if (!c) return;
    noise(c, 0.09, 2200, 0.5, 0.35);
    tone(c, 300, 80, 0.09, 0.06, 'sine');
  },
  whoosh: () => {
    const c = getCtx(); if (!c) return;
    noise(c, 0.18, 1200, 0.3, 0.3);
    tone(c, 200, 600, 0.18, 0.08, 'sine');
  },
  pop: () => {
    const c = getCtx(); if (!c) return;
    tone(c, 800, 1200, 0.06, 0.15, 'sine');
    tone(c, 400, 200, 0.06, 0.08, 'triangle');
  },
  zap: () => {
    const c = getCtx(); if (!c) return;
    tone(c, 80, 1800, 0.12, 0.2, 'sawtooth');
    noise(c, 0.12, 4000, 2, 0.2);
  },
  confirm: () => {
    const c = getCtx(); if (!c) return;
    tone(c, 523, 659, 0.08, 0.12, 'triangle');
    setTimeout(() => { const c2 = getCtx(); if (c2) tone(c2, 659, 784, 0.08, 0.1, 'triangle'); }, 90);
  },
  cancel: () => {
    const c = getCtx(); if (!c) return;
    tone(c, 400, 200, 0.1, 0.1, 'triangle');
  },
};

let enabled = true;

export function playSound(type: SoundType) {
  if (!enabled) return;
  try { sounds[type](); } catch (_) {}
}

export function setSoundEnabled(val: boolean) { enabled = val; }
export function isSoundEnabled() { return enabled; }
export type { SoundType };
