import { motion } from 'framer-motion';
import { 
  ArrowLeft, Check, Crown, Zap, 
  Shield, Star, Infinity as InfinityIcon,
  Sparkles, Flame
} from 'lucide-react';

interface PremiumProps {
  onBack: () => void;
}

//
// MOCK DATA FOR PLANS
// Marketing team said "make it POP". So we added emojis
// In a real app, you'd probably fetch this from Stripe or smthing
// But we are frontend developers, we just hardcode them dreams
//
const PLANS = [
  {
    id: 'free',
    name: 'Baby Blob',
    price: '$0',
    period: '/ forever',
    desc: 'For small servers that just want to vibe.',
    features: [
      'Basic analytics (7 days memory)',
      'Up to 1,000 members (smol)',
      'Standard support (we try)',
      '1 Dashboard'
    ],
    highlight: false,
    buttonText: 'Stay Free'
  },
  {
    id: 'pro',
    name: 'Gigachad',
    price: '$6.90',
    period: '/ month',
    desc: 'For admins who need absolute control.',
    features: [
      'Infinite History (Time travel!)',
      'Unlimited members',
      'Priority Support (We actually care)',
      'Custom Bot Name & Avatar',
      'Export PDF Reports to show mom',
      'Role Rewards'
    ],
    highlight: true,
    buttonText: 'P2W POWA!'
  }
];

const Premium = ({ onBack }: PremiumProps) => {
  return (
    <div className="min-h-screen bg-[#0f0f12] text-white font-sans selection:bg-orange-500/30 overflow-hidden relative">
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[60%] h-[60%] bg-orange-500/10 rounded-full blur-[120px]" />
         <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-yellow-600/5 rounded-full blur-[100px]" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      {/* NAV */}
      <nav className="relative z-20 p-6 md:p-10 flex items-center justify-between max-w-7xl mx-auto">
        <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
        >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Nah, go back</span>
        </button>
        
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        
        {/* HERO SECTION */}
        <div className="text-center mb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                
                <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter drop-shadow-2xl">
                    Unlock <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-500 drop-shadow-sm">Ultimate Powa!</span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
                    Supercharge your server with unlimited history, custom branding, and features that make other admins jealous :3
                </p>
            </motion.div>
        </div>

        {/* PRICING CARDS */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {PLANS.map((plan, idx) => (
                <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 + 0.3 }}
                    className={`relative p-8 rounded-3xl border transition-all duration-300 group ${
                        plan.highlight 
                        ? 'bg-[#16161a] border-orange-500/50 shadow-[0_0_40px_-10px_rgba(249,115,22,0.15)] hover:shadow-[0_0_60px_-10px_rgba(249,115,22,0.25)] hover:-translate-y-2 scale-105 z-10' 
                        : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10 scale-95 opacity-80 hover:opacity-100 hover:scale-100'
                    }`}
                >
                    {plan.highlight && (
                        <div className="absolute top-0 right-0 -mt-4 mr-6 px-4 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-xs font-black text-white shadow-lg uppercase tracking-wide flex gap-1 border border-white/10">
                            BEST VALUE
                        </div>
                    )}

                    <h3 className="text-xl font-bold text-gray-300 mb-2">{plan.name}</h3>
                    
                    <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-5xl font-black text-white tracking-tight">{plan.price}</span>
                        <span className="text-sm text-gray-500 font-bold">{plan.period}</span>
                    </div>
                    
                    <p className="text-sm text-gray-400 mb-8 pb-8 border-b border-white/5 min-h-[80px] font-medium leading-relaxed">
                        {plan.desc}
                    </p>

                    <ul className="space-y-4 mb-8">
                        {plan.features.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-center gap-3 text-sm font-medium">
                                <div className={`p-1 rounded-full shrink-0 ${plan.highlight ? 'bg-orange-500 text-black' : 'bg-gray-800 text-gray-400'}`}>
                                    <Check size={12} strokeWidth={4} />
                                </div>
                                <span className={plan.highlight ? 'text-gray-200' : 'text-gray-500'}>{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <button className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-wide transition-all active:scale-95 ${
                        plan.highlight
                        ? 'bg-gradient-to-r from-orange-600 to-orange-500 hover:to-orange-400 text-white shadow-[0_4px_20px_rgba(249,115,22,0.3)] hover:shadow-[0_4px_30px_rgba(249,115,22,0.5)]'
                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/5'
                    }`}>
                        {plan.buttonText}
                    </button>
                </motion.div>
            ))}
        </div>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-24 pt-10 border-t border-white/5 text-center"
        >
            <p className="text-xs text-gray-600 uppercase tracking-widest mb-8 font-black">Join the cool kidz club</p>
            <div className="flex flex-wrap justify-center gap-10 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-2 hover:text-orange-500 transition-colors"><Zap strokeWidth={3}/> <span className="font-black text-lg">HYPER</span></div>
                <div className="flex items-center gap-2 hover:text-blue-500 transition-colors"><InfinityIcon strokeWidth={3}/> <span className="font-black text-lg">LOOPS</span></div>
                <div className="flex items-center gap-2 hover:text-green-500 transition-colors"><Shield strokeWidth={3}/> <span className="font-black text-lg">GUARD</span></div>
            </div>
        </motion.div>

      </main>
    </div>
  );
};

export default Premium;