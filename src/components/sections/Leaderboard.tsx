import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, ExternalLink, Trophy, Medal } from 'lucide-react';
import ComicPanel from '../ui/ComicPanel';
import SpeechBubble from '../ui/SpeechBubble';

const leaderboardData = [
  { place: 1,  team: 'cypherX',               points: 12273 },
  { place: 2,  team: 'r0t-psyc',              points: 11573 },
  { place: 3,  team: '23f3004197',             points: 9723  },
  { place: 4,  team: 'Team Hunter',            points: 9673  },
  { place: 5,  team: 'Merp Era',               points: 7823  },
  { place: 6,  team: 'CRY5T4L',               points: 7373  },
  { place: 7,  team: 'cyberghost',             points: 6800  },
  { place: 8,  team: 'Krypt0n',                points: 6173  },
  { place: 9,  team: ':!Kn^ghts',             points: 5623  },
  { place: 10, team: 'tyagihemanshu56',        points: 5523  },
  { place: 11, team: 'Cyberbos',               points: 5323  },
  { place: 12, team: 'RootCause',              points: 5273  },
  { place: 13, team: 'Heist_404',              points: 4880  },
  { place: 14, team: 'cyberninja023',           points: 4873  },
  { place: 15, team: 'AD',                      points: 4800  },
  { place: 16, team: 'Flaggers-united',         points: 4723  },
  { place: 17, team: 'Orange',                  points: 4693  },
  { place: 18, team: 'fsocietyx71',             points: 4550  },
  { place: 19, team: 'b33pb00p',                points: 4543  },
  { place: 20, team: 'haxmith',                 points: 4530  },
  { place: 21, team: 'prachimodi183@gmail.com', points: 3850  },
  { place: 22, team: 'Mafia Santii',            points: 3623  },
  { place: 23, team: 's3nt1n3I 5ynd1c4t3',      points: 3473  },
  { place: 24, team: 'Soteria',                 points: 3450  },
  { place: 25, team: 'CyberForge',              points: 3423  },
  { place: 26, team: 'D3T0X',                   points: 3300  },
  { place: 27, team: 'turkarvaidehi25',          points: 3180  },
  { place: 28, team: 'Rockstars',               points: 3030  },
  { place: 29, team: '4g3n7 0f Ch40s',          points: 2773  },
  { place: 30, team: 'doer',                     points: 2750  },
  { place: 31, team: '404 Not Found',            points: 2730  },
  { place: 32, team: 'N3x0ra',                  points: 2530  },
  { place: 33, team: 'ZeroDay Syndicate',        points: 2530  },
  { place: 34, team: 'Cyfer Trace',             points: 2430  },
  { place: 35, team: 'rakeshkumar911377',        points: 2400  },
  { place: 36, team: 'Ash-Hats',                points: 2323  },
  { place: 37, team: 'Allsafe',                 points: 2230  },
  { place: 38, team: 'Rooteshwar',              points: 2150  },
  { place: 39, team: 'akshayakumar8104',         points: 2000  },
  { place: 40, team: 'FlagHunterX',             points: 1700  },
  { place: 41, team: 'zero_trace',              points: 1450  },
  { place: 42, team: 'Lazarus',                 points: 1400  },
  { place: 43, team: "Schrödinger's Flag",      points: 1350  },
  { place: 44, team: 'codex',                   points: 1273  },
  { place: 45, team: 'B3ll4ch40',               points: 1223  },
  { place: 46, team: 'ritu',                    points: 1200  },
  { place: 47, team: 'zumba dabxc',             points: 1000  },
  { place: 48, team: 'Eugma',                   points: 900   },
  { place: 49, team: 'nithin',                  points: 750   },
  { place: 50, team: 'norm4d',                  points: 700   },
  { place: 51, team: 'ZeroRecon',               points: 430   },
  { place: 52, team: 'Avengers',                points: 430   },
  { place: 53, team: 'Hello World',             points: 400   },
  { place: 54, team: 'cryptix',                 points: 400   },
  { place: 55, team: 'bhoomika.03006',          points: 293   },
  { place: 56, team: 'deepshruti.118',          points: 250   },
  { place: 57, team: 'Nexora',                  points: 250   },
  { place: 58, team: 'Z3R0 DAY',                points: 200   },
  { place: 59, team: 'krypton',                 points: 200   },
  { place: 60, team: 'RetroFusionists',         points: 150   },
  { place: 61, team: 'Star_Hack',               points: 150   },
  { place: 62, team: 'ghost_hunter',            points: 30    },
  { place: 63, team: 'sher',                    points: 30    },
];

const MEDAL: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };
const maxPts = leaderboardData[0].points;

const Leaderboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [search, setSearch] = useState('');

  const filtered = leaderboardData.filter((r) =>
    r.team.toLowerCase().includes(search.toLowerCase())
  );

  const top3 = leaderboardData.slice(0, 3);
  // podium order: 2nd | 1st | 3rd
  const podiumOrder = [top3[1], top3[0], top3[2]];

  return (
    <div className="space-y-8">
      {/* Back */}
      <button onClick={onBack} className="comic-button !bg-black !text-white text-xl !py-2 !px-6">
        ← BACK TO COMMAND CENTER
      </button>

      {/* Hero Banner */}
      <ComicPanel title="Sector 04: Final Standings" className="bg-comic-yellow relative overflow-hidden" halftone>
        <div className="absolute inset-0 action-line opacity-20" />
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 pt-6 px-2">
          <div>
            <motion.h2
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="font-comic text-6xl md:text-8xl uppercase tracking-tighter italic text-black leading-none"
            >
              THE<br />
              <span className="bg-black text-comic-yellow px-3 inline-block -rotate-1">HEIST</span><br />
              IS OVER.
            </motion.h2>
            <p className="font-mono text-xs uppercase font-black opacity-50 mt-3 tracking-widest">
              63 teams · 1400+ participants · ₹250K+ prize pool
            </p>
          </div>
          <SpeechBubble className="!bg-white shrink-0">
            <p className="font-comic text-xl uppercase text-black">
              "The flags have been captured.<br />
              <span className="text-comic-red font-black text-2xl">WHO MADE IT?</span>"
            </p>
          </SpeechBubble>
        </div>
      </ComicPanel>

      {/* Podium */}
      <ComicPanel title="Top Agents" className="bg-comic-white">
        <div className="pt-6 flex items-end justify-center gap-3 md:gap-8">
          {podiumOrder.map((entry) => {
            const isFirst = entry.place === 1;
            const podiumH = entry.place === 1 ? 'h-36' : entry.place === 2 ? 'h-24' : 'h-20';
            const podiumBg = entry.place === 1 ? 'bg-comic-yellow' : entry.place === 2 ? 'bg-gray-200' : 'bg-orange-100';

            return (
              <motion.div
                key={entry.place}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: entry.place * 0.1, type: 'spring', stiffness: 180 }}
                className="flex flex-col items-center gap-2 flex-1 max-w-[180px]"
              >
                <div className="text-center px-1">
                  <div className="text-3xl mb-1">{MEDAL[entry.place]}</div>
                  <p className={`font-comic uppercase break-all leading-tight ${isFirst ? 'text-xl' : 'text-base'}`}>
                    {entry.team}
                  </p>
                  <p className="font-mono text-xs font-black opacity-60 mt-0.5">
                    {entry.points.toLocaleString()} pts
                  </p>
                </div>
                {/* Podium block */}
                <div
                  className={`w-full border-4 border-black ${podiumBg} ${podiumH} flex items-center justify-center shadow-[4px_4px_0_0_rgba(0,0,0,1)]`}
                >
                  <span className="font-comic text-4xl font-black italic">#{entry.place}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </ComicPanel>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-black opacity-40" />
        <input
          type="text"
          placeholder="SEARCH TEAM..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border-4 border-black pl-10 pr-4 py-3 font-comic text-lg uppercase placeholder-black/30 focus:outline-none bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
        />
      </div>

      {/* Full Table */}
      <ComicPanel title="All Standings" className="bg-comic-white !p-0 overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[56px_1fr_110px] bg-black text-white font-comic text-lg uppercase px-4 py-3 gap-2 mt-8">
          <span>#</span>
          <span>Team</span>
          <span className="text-right">Points</span>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 font-comic text-2xl uppercase opacity-30">No team found!</div>
        )}

        {filtered.map((row, i) => {
          const isTop3 = row.place <= 3;
          const barW = Math.round((row.points / maxPts) * 100);
          const rowBg =
            row.place === 1 ? 'bg-comic-yellow' :
            row.place === 2 ? 'bg-gray-100' :
            row.place === 3 ? 'bg-orange-50' :
            i % 2 === 0 ? 'bg-white' : 'bg-gray-50';

          return (
            <motion.div
              key={row.place}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(i * 0.015, 0.4) }}
              className={`grid grid-cols-[56px_1fr_110px] items-center px-4 py-3 gap-2 border-b-2 border-black/10 ${rowBg} ${isTop3 ? 'border-b-2 border-black/30' : ''}`}
            >
              {/* Rank */}
              <span className={`font-comic text-2xl font-black ${row.place === 1 ? 'text-comic-red' : isTop3 ? 'text-black' : 'text-black/40'}`}>
                {MEDAL[row.place] ?? `#${row.place}`}
              </span>

              {/* Team + bar */}
              <div className="min-w-0">
                <p className={`font-comic uppercase truncate ${isTop3 ? 'text-xl' : 'text-lg'}`}>{row.team}</p>
                <div className="h-2 bg-black/10 mt-1 border border-black/10">
                  <div className="h-full bg-comic-red" style={{ width: `${barW}%` }} />
                </div>
              </div>

              {/* Points */}
              <span className="font-comic text-lg font-black text-right tabular-nums">{row.points.toLocaleString()}</span>
            </motion.div>
          );
        })}

        {/* Footer */}
        <div className="p-4 border-t-4 border-black flex items-center justify-between bg-black text-white">
          <span className="font-mono text-xs uppercase opacity-60">ZeroDay Heist · June 2026 · Final</span>
          <a
            href="https://ctftime.org/event/3308"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-comic text-sm uppercase text-comic-yellow hover:text-white transition-colors"
          >
            CTFtime <ExternalLink size={12} />
          </a>
        </div>
      </ComicPanel>
    </div>
  );
};

export default Leaderboard;