import { CloudRain, Car, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ChaosControl({ onInjectChaos, disabled, isSelfHealing }) {
  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="absolute bottom-8 right-8 glass-hud rounded-2xl px-6 py-4 flex flex-col items-end gap-3 z-30"
    >
      <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Chaos_Injectors</span>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onInjectChaos('Heavy Rain: All outdoor activities cancelled.')}
          disabled={disabled}
          className="group relative flex items-center gap-2 px-4 py-2 bg-slate-900/80 hover:bg-slate-800 disabled:opacity-50 border border-slate-700 hover:border-electricBlue rounded-xl text-xs font-bold tracking-wider text-slate-300 transition-all overflow-hidden backdrop-blur-md"
        >
          <div className="absolute inset-0 bg-electricBlue/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <CloudRain className="w-4 h-4 text-electricBlue group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,1)] relative z-10" />
          <span className="relative z-10 hidden md:inline">RAIN</span>
        </button>
        <button
          onClick={() => onInjectChaos('Severe Traffic: Transport times tripled.')}
          disabled={disabled}
          className="group relative flex items-center gap-2 px-4 py-2 bg-slate-900/80 hover:bg-slate-800 disabled:opacity-50 border border-slate-700 hover:border-yellow-400 rounded-xl text-xs font-bold tracking-wider text-slate-300 transition-all overflow-hidden backdrop-blur-md"
        >
          <div className="absolute inset-0 bg-yellow-400/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <Car className="w-4 h-4 text-yellow-400 group-hover:drop-shadow-[0_0_8px_rgba(250,204,21,1)] relative z-10" />
          <span className="relative z-10 hidden md:inline">TRAFFIC</span>
        </button>
        <button
          onClick={() => onInjectChaos('Sudden Closure: Primary attraction is closed today.')}
          disabled={disabled}
          className="group relative flex items-center gap-2 px-4 py-2 bg-slate-900/80 hover:bg-slate-800 disabled:opacity-50 border border-slate-700 hover:border-dangerRed rounded-xl text-xs font-bold tracking-wider text-slate-300 transition-all overflow-hidden backdrop-blur-md"
        >
          <div className="absolute inset-0 bg-dangerRed/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <AlertTriangle className="w-4 h-4 text-dangerRed group-hover:drop-shadow-[0_0_8px_rgba(255,0,60,1)] relative z-10" />
          <span className="relative z-10 hidden md:inline">CLOSURE</span>
        </button>
      </div>
    </motion.div>
  );
}
