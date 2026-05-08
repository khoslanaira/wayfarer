import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header({ status, uptime, isSelfHealing }) {
  const isOptimal = status === 'Optimal';
  const uptimeNum = parseFloat(uptime);
  
  let uptimeColor = 'text-optimalGreen';
  if (uptimeNum < 90) uptimeColor = 'text-electricBlue';
  if (uptimeNum < 70) uptimeColor = 'text-yellow-400';
  if (uptimeNum < 50) uptimeColor = 'text-dangerRed';
  
  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="absolute top-6 left-1/2 -translate-x-1/2 h-14 glass-hud rounded-full flex items-center justify-between px-8 z-30 w-11/12 max-w-4xl"
    >
      <div className="flex items-center gap-3">
        <Activity className={`w-5 h-5 ${isOptimal ? 'text-optimalGreen' : 'text-dangerRed animate-pulse drop-shadow-[0_0_8px_rgba(255,0,60,0.8)]'}`} />
        <h1 className="text-lg font-bold tracking-[0.2em] text-slate-100">SENTINEL_WAYFARER</h1>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest">SYS.STATUS</span>
          <motion.span 
            key={status}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-xs font-bold uppercase tracking-wider ${isOptimal ? 'text-optimalGreen' : 'text-dangerRed drop-shadow-[0_0_8px_rgba(255,0,60,0.8)]'}`}
          >
            {status}
          </motion.span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest">UPTIME</span>
          <motion.span 
            key={uptime}
            initial={{ scale: 1.5 }}
            animate={{ scale: 1 }}
            className={`text-sm font-bold tracking-widest transition-colors duration-300 ${uptimeColor} ${uptimeNum < 100 ? 'drop-shadow-[0_0_8px_currentColor]' : ''}`}
          >
            {uptime}%
          </motion.span>
        </div>
      </div>
    </motion.header>
  );
}
