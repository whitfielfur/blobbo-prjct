import { useEffect, useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Activity, ChevronRight, Fingerprint, PieChart } from 'lucide-react';
import FallingItems from './components/FallingItems';
import Transition from './components/Transition';

// Lazy loading added
const Documentation = lazy(() => import('./components/Documentation'));
const Premium = lazy(() => import('./components/Premium'));

const HERO_TITLES = [
  "Server analytics on a new level",
  "Your server. Your rules. Your stats.",
  "Data that speaks for itself",
  "Turn chaos into beautiful charts",
  "Know what your community lives for"
];

type ViewState = 'home' | 'docs' | 'premium';

function App() {
  const [heroTitle, setHeroTitle] = useState("");
  const [showTransition, setShowTransition] = useState(false);
  const [view, setView] = useState<ViewState>('home');

  useEffect(() => {
    const randomTitle = HERO_TITLES[Math.floor(Math.random() * HERO_TITLES.length)];
    setHeroTitle(randomTitle);
  }, []);

  // Prefetch component code on hover to eliminate lag
  const prefetchView = (target: ViewState) => {
    if (target === 'docs') import('./components/Documentation');
    if (target === 'premium') import('./components/Premium');
  };

const handleNavigation = (targetView: ViewState) => {
  if (view === targetView) return;

  const conn = (navigator as any).connection;
  const isSlow = conn && (conn.saveData || ['slow-2g', '2g', '3g'].includes(conn.effectiveType));

  if (isSlow) {
    setShowTransition(true); 
    setTimeout(() => {
      setView(targetView);
    }, 1000);
  } else {
    setView(targetView);
    setShowTransition(false);
  }
};

if (view === 'docs') {
  return (
    <Suspense fallback={null}>
      {showTransition && <Transition onComplete={() => setShowTransition(false)} />}
      <Documentation onBack={() => handleNavigation('home')} />
    </Suspense>
  );
}

if (view === 'premium') {
  return (
    <Suspense fallback={null}>
      {showTransition && <Transition onComplete={() => setShowTransition(false)} />}
      <Premium onBack={() => handleNavigation('home')} />
    </Suspense>
  );
}

  return (
    <div className="relative min-h-screen bg-[#0f0f12] text-white selection:bg-orange-500/30 overflow-hidden font-sans flex flex-col">
      
      {showTransition && <Transition onComplete={() => setShowTransition(false)} />}

      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[50%] h-[50%] bg-orange-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[20%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[150px]" />
      </div>

      <FallingItems />

      <nav className="relative z-50 w-full bg-transparent pt-6">
        <div className="flex items-center justify-between px-6 max-w-7xl mx-auto">
          
          <div className="cursor-pointer group select-none" onClick={() => handleNavigation('home')}>
              <span className="inline-block pr-2 text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-orange-300 via-orange-500 to-orange-700 drop-shadow-[0_0_15px_rgba(249,115,22,0.4)] group-hover:brightness-110 transition-all">
                blobbo
              </span>
          </div>
          
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
              <button 
                onMouseEnter={() => prefetchView('docs')}
                onClick={() => handleNavigation('docs')} 
                className="hover:text-orange-400 transition-colors"
              >
                Features
              </button>
              <button 
                onMouseEnter={() => prefetchView('docs')}
                onClick={() => handleNavigation('docs')} 
                className="hover:text-orange-400 transition-colors"
              >
                Commands
              </button>
              <button 
                onMouseEnter={() => prefetchView('premium')}
                onClick={() => handleNavigation('premium')} 
                className="hover:text-orange-400 transition-colors"
              >
                Premium
              </button>
          </div>
          
          <button className="relative group px-6 py-2 rounded-full overflow-hidden bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all duration-300 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative font-semibold text-sm text-gray-300 group-hover:text-orange-400 transition-colors duration-300 flex items-center gap-2">
              Login
            </span>
          </button>
        </div>
      </nav>

      <main className="relative z-10 flex-grow flex flex-col justify-center items-center max-w-5xl mx-auto px-6 py-20">
        
        <div className="text-center flex flex-col items-center max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8 tracking-tight drop-shadow-2xl">
              {heroTitle || "Loading..."}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Blobbo collects activity stats, voice channels, and message data, turning dry numbers into actionable reports.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="w-full sm:w-auto px-8 py-4 bg-orange-600 hover:bg-orange-500 hover:scale-105 text-white font-bold rounded-xl transition-all shadow-[0_0_40px_-10px_rgba(234,88,12,0.4)] ring-1 ring-white/10">
                <span className="flex items-center justify-center gap-2">
                  Invite Bot <ChevronRight className="w-4 h-4" />
                </span>
              </button>
              
              <button 
                onMouseEnter={() => prefetchView('docs')}
                onClick={() => handleNavigation('docs')}
                className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all border border-white/10 backdrop-blur-sm active:scale-95"
              >
                Documentation
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 w-full max-w-2xl"
          >
             <div className="relative rounded-2xl bg-[#16161a]/80 backdrop-blur-xl border border-white/10 p-4 shadow-2xl overflow-hidden group hover:border-orange-500/30 transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />
                <div className="flex gap-4 mb-4 border-b border-white/5 pb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                
                <div className="grid grid-cols-3 gap-4 h-32 items-end opacity-90">
                    <motion.div 
                      initial={{ height: "0%" }}
                      animate={{ height: "40%" }}
                      transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1], delay: 0.5 }}
                      className="bg-white/10 rounded-t-lg w-full"
                    ></motion.div>
                    
                    <motion.div 
                      initial={{ height: "0%" }}
                      animate={{ height: "80%" }}
                      transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.7 }}
                      className="bg-gradient-to-t from-orange-600/20 to-orange-500/60 rounded-t-lg w-full border-t border-orange-500/50 shadow-[0_-10px_20px_rgba(249,115,22,0.1)] relative"
                    >
                    </motion.div>
                    
                    <motion.div 
                      initial={{ height: "0%" }}
                      animate={{ height: "60%" }}
                      transition={{ duration: 1.3, ease: [0.34, 1.56, 0.64, 1], delay: 0.9 }}
                      className="bg-white/10 rounded-t-lg w-full"
                    ></motion.div>
                </div>
             </div>
          </motion.div>
        </div>

        <div className="mt-32 w-full grid md:grid-cols-3 gap-6">
            {[
                { 
                  title: "Precise Stats", 
                  desc: "Tracking every message and voice minute with surgeon-like precision.", 
                  icon: <Activity className="text-orange-400 group-hover:text-orange-300 transition-colors" /> 
                },
                { 
                  title: "Visualizations", 
                  desc: "Beautiful pie charts and linear graphs that make managers happy.", 
                  icon: <PieChart className="text-purple-400 group-hover:text-purple-300 transition-colors" /> 
                },
                { 
                  title: "Privacy First", 
                  desc: "Data is anonymized and encrypted. We don't read your DMs.", 
                  icon: <Fingerprint className="text-blue-400 group-hover:text-blue-300 transition-colors" /> 
                }
            ].map((feature, idx) => (
                <motion.div 
                    key={idx}
                    whileHover={{ y: -5 }}
                    className="group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-orange-500/20 transition-all text-center md:text-left cursor-default"
                >
                    <div className="inline-flex p-3 bg-white/5 rounded-xl mb-4 text-2xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-white group-hover:text-orange-100 transition-colors">{feature.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400">{feature.desc}</p>
                </motion.div>
            ))}
        </div>

      </main>
      
      <footer className="w-full border-t border-white/5 py-8 text-center text-gray-600 text-sm">
        <p>© 2026 Blobbo Analytics. Not affiliated with Discord.</p>
      </footer>
    </div>
  )
}

export default App;
