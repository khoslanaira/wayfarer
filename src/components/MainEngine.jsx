import { useState } from 'react';
import { Send, MapPin, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MainEngine({ onSubmitObjectives, itinerary, isInitializing, isSelfHealing, status }) {
  const [objectives, setObjectives] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!objectives.trim() || isInitializing || isSelfHealing) return;
    onSubmitObjectives(objectives);
  };

  const isGenerating = isInitializing || isSelfHealing;
  const isOptimal = status === 'Optimal';

  const glitchAnimation = {
    opacity: [1, 0.5, 1, 0.8, 1],
    rotateX: [0, 15, -15, 0],
    scale: [1, 0.95, 1.05, 1],
    transition: { duration: 0.5, repeat: Infinity, repeatType: "mirror" }
  };

  // Red glow during healing, green glow when optimal
  const cardGlowClass = isSelfHealing 
    ? 'shadow-[0_0_25px_rgba(255,0,60,0.6)] border-dangerRed animate-[pulse_1s_ease-in-out_infinite]'
    : isOptimal 
      ? 'shadow-[0_0_15px_rgba(0,255,102,0.15)] border-optimalGreen/30' 
      : 'shadow-[0_0_15px_rgba(0,240,255,0.15)] border-electricBlue/30';

  return (
    <main className="absolute inset-0 flex flex-col items-center justify-center pt-24 pb-8 px-8 z-10 pointer-events-none">
      {/* Radar Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] z-0 pointer-events-none overflow-hidden">
         <div className="w-[1200px] h-[1200px] rounded-full border border-electricBlue relative animate-[spin_15s_linear_infinite]">
            <div className="absolute top-0 bottom-1/2 left-1/2 right-1/2 border-r border-electricBlue origin-bottom"></div>
            <div className="absolute top-0 right-0 bottom-1/2 left-1/2 bg-gradient-to-br from-electricBlue to-transparent opacity-20 origin-bottom-left"></div>
         </div>
         <div className="absolute w-[800px] h-[800px] rounded-full border border-electricBlue"></div>
         <div className="absolute w-[400px] h-[400px] rounded-full border border-electricBlue"></div>
      </div>

      <div className="w-full h-full max-w-4xl relative z-10 pointer-events-auto flex flex-col items-center justify-center">
        {!itinerary && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full flex items-center justify-center"
          >
            <form onSubmit={handleSubmit} className="w-full glass-hud rounded-3xl p-10 flex flex-col gap-8 transition-all hover:shadow-[0_8px_32px_0_rgba(0,240,255,0.1)]">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-electricBlue hud-glow animate-pulse"></span>
                  MISSION OBJECTIVES
                </h2>
                <p className="text-slate-400 font-mono text-sm tracking-wide">Enter sequence parameters to initialize the experiential matrix.</p>
              </div>
              <div className="relative group">
                <input
                  type="text"
                  value={objectives}
                  onChange={(e) => setObjectives(e.target.value)}
                  placeholder="e.g., 3 days in Tokyo, focus on technology and food..."
                  className="w-full bg-white/5 backdrop-blur-xl border border-slate-700/50 rounded-xl px-6 py-5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-electricBlue focus:ring-1 focus:ring-electricBlue transition-all shadow-inner font-mono text-lg"
                  disabled={isGenerating}
                />
                <button
                  type="submit"
                  disabled={isGenerating || !objectives.trim()}
                  className="absolute right-3 top-3 bottom-3 aspect-square bg-slate-800 hover:bg-electricBlue hover:text-slate-900 text-electricBlue rounded-lg flex items-center justify-center transition-all disabled:opacity-50"
                >
                  {isInitializing ? <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <Send className="w-6 h-6" />}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {itinerary && (
          <div className="w-full h-full overflow-y-auto scrollbar-hide flex flex-col items-center justify-start pb-32 relative">
            <div className="w-full space-y-8 mt-10">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={isSelfHealing ? glitchAnimation : { opacity: 1, y: 0, x: 0 }}
                className={`glass-hud rounded-2xl p-8 border-t-2 ${isSelfHealing ? 'border-t-dangerRed' : isOptimal ? 'border-t-optimalGreen' : 'border-t-electricBlue'}`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <MapPin className={`w-8 h-8 ${isSelfHealing ? 'text-dangerRed drop-shadow-[0_0_8px_rgba(255,0,60,1)] animate-pulse' : isOptimal ? 'text-optimalGreen hud-glow' : 'text-electricBlue hud-glow'}`} />
                  <h2 className="text-4xl font-black tracking-widest uppercase text-slate-100">{itinerary.destination}</h2>
                </div>
                <p className="text-slate-400 text-lg font-mono">{itinerary.summary}</p>
              </motion.div>

              {/* Vertical Timeline Container */}
              <div className="space-y-8 pl-8 relative ml-4">
                {/* Timeline solid line */}
                <div className={`absolute top-0 bottom-0 left-0 w-0.5 ${isSelfHealing ? 'bg-dangerRed shadow-[0_0_10px_#ff003c]' : isOptimal ? 'bg-optimalGreen shadow-[0_0_10px_#00ff66]' : 'bg-slate-700/50'}`}></div>
                
                <AnimatePresence mode="popLayout">
                  {itinerary.days.map((day, idx) => (
                    <motion.div
                      key={`${day.day}-${day.date}`}
                      initial={{ opacity: 0, x: -50, rotateY: 30 }}
                      animate={isSelfHealing ? glitchAnimation : { opacity: 1, x: 0, rotateY: 0 }}
                      transition={isSelfHealing ? {} : { delay: idx * 0.1, type: 'spring', bounce: 0.4 }}
                      className="relative w-full"
                    >
                      {/* Timeline Node */}
                      <div className={`absolute w-4 h-4 rounded-full -left-[39.5px] top-6 border-2 border-slate-950 z-20 transition-colors duration-500 ${isSelfHealing ? 'bg-dangerRed animate-ping' : isOptimal ? 'bg-optimalGreen shadow-[0_0_10px_#00ff66]' : 'bg-slate-500'}`}></div>
                      
                      <div className={`bg-white/5 backdrop-blur-xl rounded-2xl p-6 transition-all border ${cardGlowClass} group`}>
                        <h3 className="text-2xl font-bold text-slate-200 mb-6 flex items-center gap-3">
                          <span className={`${isSelfHealing ? 'text-dangerRed drop-shadow-[0_0_5px_rgba(255,0,60,0.8)]' : isOptimal ? 'text-cyberLime drop-shadow-[0_0_5px_rgba(204,255,0,0.5)]' : 'text-electricBlue drop-shadow-[0_0_5px_currentColor]'}`}>DAY {day.day}</span>
                          <span className="text-slate-600 font-mono text-sm">| {day.date}</span>
                        </h3>
                        <div className="space-y-4">
                          {day.activities.map((activity, actIdx) => (
                            <div key={actIdx} className={`flex gap-6 p-4 rounded-xl bg-slate-950/60 border ${isSelfHealing ? 'border-dangerRed/30 bg-dangerRed/5' : isOptimal ? 'border-slate-800/50 hover:bg-slate-900/80 hover:border-optimalGreen/30' : 'border-slate-800/50 hover:bg-slate-900/80 hover:border-slate-600'} transition-all`}>
                              <div className="w-28 shrink-0 flex flex-col items-start gap-2 pt-1">
                                <span className={`text-sm font-bold tracking-wider ${isSelfHealing ? 'text-dangerRed' : isOptimal ? 'text-optimalGreen' : 'text-electricBlue'}`}>{activity.time}</span>
                                <span className={`text-[8px] uppercase tracking-widest font-bold px-2 py-1 rounded border ${isSelfHealing ? 'bg-dangerRed text-white border-dangerRed animate-pulse' : 'bg-optimalGreen/10 text-optimalGreen border-optimalGreen/30'}`}>
                                  {isSelfHealing ? 'SYSTEM ERROR' : 'STATUS: OPERATIONAL'}
                                </span>
                                <span className="text-[9px] uppercase tracking-widest font-bold text-slate-400 px-2 py-1 rounded bg-slate-950 border border-slate-800 mt-1">
                                  {activity.type}
                                </span>
                              </div>
                              <div>
                                <h4 className="text-lg font-bold text-slate-200">{activity.title}</h4>
                                <p className="text-sm text-slate-400 mt-2 font-mono leading-relaxed">{activity.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Initialization Overlay */}
      <AnimatePresence>
        {isInitializing && itinerary && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-md flex items-center justify-center z-50 pointer-events-auto"
          >
             <div className="bg-white/5 backdrop-blur-xl rounded-full px-8 py-4 flex items-center gap-4 border border-electricBlue hud-glow shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
                <div className="w-6 h-6 border-2 border-electricBlue border-t-transparent rounded-full animate-spin" />
                <span className="text-electricBlue font-bold tracking-[0.2em] uppercase text-sm">Initializing Matrix...</span>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Red Alert Overlay for Self Healing */}
      <AnimatePresence>
        {isSelfHealing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-dangerRed/5 backdrop-blur-xl flex items-center justify-center z-50 pointer-events-auto"
          >
             <motion.div 
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 1.1, opacity: 0 }}
                className="bg-white/5 backdrop-blur-2xl rounded-3xl px-12 py-10 flex flex-col items-center gap-6 border border-dangerRed shadow-[0_0_80px_rgba(255,0,60,0.3)]"
             >
                <div className="relative">
                  <div className="absolute inset-0 animate-ping opacity-50"><AlertTriangle className="w-16 h-16 text-dangerRed" /></div>
                  <AlertTriangle className="w-16 h-16 text-dangerRed relative z-10 drop-shadow-[0_0_15px_rgba(255,0,60,1)]" />
                </div>
                <div className="text-center">
                   <h2 className="text-dangerRed font-black text-3xl tracking-[0.2em] uppercase mb-2 drop-shadow-[0_0_10px_rgba(255,0,60,0.8)]">CRITICAL CONSTRAINT</h2>
                   <span className="text-slate-400 font-mono text-sm tracking-wider">Re-calculating Itinerary Matrix...</span>
                </div>
                <div className="w-full max-w-xs h-1.5 bg-slate-800 rounded-full mt-4 overflow-hidden shadow-inner">
                   <div className="h-full bg-dangerRed shadow-[0_0_10px_rgba(255,0,60,1)] animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
