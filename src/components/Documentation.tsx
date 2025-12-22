import { useState, useMemo } from 'react';
import { ArrowLeft, Book, Zap, Layout, Server, Globe, Hash, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

// Импорты ваших файлов
import { DocRenderer, extractNavigation } from '../lib/DocEngine';
import { DOCS_XML } from '../data/docsContent';

const iconMap: any = {
    globe: <Globe size={18} />,
    server: <Server size={18} />,
    layout: <Layout size={18} />,
    credit: <CreditCard size={18} />,
    hash: <Hash size={18} />
};

interface DocumentationProps {
  onBack: () => void;
}

const Documentation = ({ onBack }: DocumentationProps) => {
  const sections = useMemo(() => extractNavigation(DOCS_XML), []);
  const [activeId, setActiveId] = useState(sections[0]?.id || '');

  const scrollTo = (id: string) => {
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen flex bg-[#0f0f12] text-gray-300 font-sans selection:bg-orange-500/30 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
         <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-orange-900/5 rounded-full blur-[150px]" />
         <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-900/5 rounded-full blur-[150px]" />
      </div>

      {/* Sidebar */}
      <aside className="fixed top-0 left-0 w-64 h-screen border-r border-white/5 bg-[#0f0f12]/95 backdrop-blur-md z-20 hidden md:flex flex-col p-6">
        <div 
            onClick={onBack}
            className="flex items-center gap-2 mb-10 cursor-pointer group text-white hover:text-orange-400 transition-colors"
        >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-lg tracking-tight">blobbo_docs</span>
        </div>

        <nav className="space-y-1">
          {sections.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeId === item.id 
                  ? 'text-orange-400 bg-orange-500/10 border border-orange-500/10' 
                  : 'text-gray-500 hover:text-gray-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              {iconMap[item.icon] || <Hash size={18} />}
              {item.title}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
            <p className="text-xs text-gray-600">Renderer v2.2 • Stable</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 h-screen overflow-y-auto relative z-10 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        
        <div className="max-w-5xl p-6 md:p-16">
            
            <button onClick={onBack} className="md:hidden flex items-center gap-2 text-gray-400 mb-8 hover:text-white transition-colors">
                <ArrowLeft size={18} /> Назад
            </button>

            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="pb-32"
            >
                <DocRenderer source={DOCS_XML} />
                
            </motion.div>
        </div>
      </main>

    </div>
  );
};

export default Documentation;