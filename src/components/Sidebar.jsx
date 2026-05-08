import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { useEffect, useRef } from 'react';

const TypewriterText = ({ text, className }) => (
  <span className={className}>
    {text.split('').map((char, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1, delay: index * 0.01 }}
      >
        {char}
      </motion.span>
    ))}
  </span>
);

export default function Sidebar({ logs }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <motion.aside 
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="absolute bottom-8 left-8 w-80 h-96 glass-hud rounded-xl flex flex-col z-20 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.2) 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
      
      <div className="p-3 border-b border-slate-700/50 flex items-center gap-2 bg-slate-900/50 backdrop-blur-md relative z-10">
        <Terminal className="w-4 h-4 text-cyberLime" />
        <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-300">Thought_Stream</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide relative z-10" ref={scrollRef}>
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[11px] font-mono leading-relaxed"
            >
              <span className="text-slate-500 mr-2">[{log.time}]</span>
              <TypewriterText 
                text={log.message} 
                className={log.type === 'error' ? 'text-dangerRed font-bold drop-shadow-[0_0_5px_currentColor]' : log.type === 'action' ? 'text-cyberLime drop-shadow-[0_0_5px_currentColor]' : 'text-slate-300'} 
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}
