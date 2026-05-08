import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChaosControl from './components/ChaosControl';
import MainEngine from './components/MainEngine';
import { generateItinerary, patchItinerary } from './services/gemini';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [status, setStatus] = useState('Optimal');
  const [uptime, setUptime] = useState(100.0);
  const [logs, setLogs] = useState([{ id: Math.random().toString(36).substr(2, 9), time: new Date().toLocaleTimeString(), message: 'System initialized. Awaiting parameters...', type: 'info' }]);
  const [itinerary, setItinerary] = useState(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isSelfHealing, setIsSelfHealing] = useState(false);

  const addLog = (message, type = 'info') => {
    setLogs(prev => [...prev, { id: Math.random().toString(36).substr(2, 9), time: new Date().toLocaleTimeString(), message, type }]);
  };

  const handleObjectivesSubmit = async (objectives) => {
    setIsInitializing(true);
    addLog(`Received objectives: "${objectives}"`);
    addLog('Querying Gemini for sequence generation...', 'action');
    
    try {
      const data = await generateItinerary(objectives);
      setItinerary(data);
      addLog('Itinerary generated successfully.', 'info');
    } catch (error) {
      addLog(error.message, 'error');
    } finally {
      setIsInitializing(false);
    }
  };

  const handleInjectChaos = async (constraint) => {
    if (!itinerary || isInitializing || isSelfHealing) return;
    
    setIsSelfHealing(true);
    setStatus('Degraded');
    setUptime(42.00);
    
    addLog(`[SENTINEL] Detecting disruption: ${constraint}`, 'error');
    addLog('[SENTINEL] Watchdog Agent triggered. Initiating self-healing sequence...', 'action');
    
    try {
      const patchedData = await patchItinerary(itinerary, constraint);
      setItinerary(patchedData);
      setStatus('Optimal');
      setUptime(98.00);
      addLog('[SENTINEL] Self-healing complete. Itinerary patched.', 'info');
    } catch (error) {
      addLog(error.message, 'error');
    } finally {
      setIsSelfHealing(false);
    }
  };

  const isGenerating = isInitializing || isSelfHealing;

  return (
    <div className={`h-screen w-full relative overflow-hidden transition-colors duration-700 ${isSelfHealing ? 'bg-dangerRed/10' : 'bg-transparent'}`}>
      
      {/* Red Alert Global Overlay */}
      <AnimatePresence>
        {isSelfHealing && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 pointer-events-none z-0"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-dangerRed shadow-[0_0_30px_#ff003c] animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-dangerRed shadow-[0_0_30px_#ff003c] animate-pulse"></div>
            <div className="absolute inset-0 border-8 border-dangerRed/20 mix-blend-overlay"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <Header status={status} uptime={uptime} isSelfHealing={isSelfHealing} />
      
      <MainEngine 
        onSubmitObjectives={handleObjectivesSubmit} 
        itinerary={itinerary} 
        isInitializing={isInitializing}
        isSelfHealing={isSelfHealing} 
        status={status}
      />

      <Sidebar logs={logs} />
      
      <ChaosControl onInjectChaos={handleInjectChaos} disabled={!itinerary || isGenerating} isSelfHealing={isSelfHealing} />
    </div>
  );
}

export default App;
