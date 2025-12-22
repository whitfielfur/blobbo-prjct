import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface TransitionProps {
  onComplete: () => void;
}

const Transition = ({ onComplete }: TransitionProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f0f12]/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2, times: [0, 0.1, 0.9, 1] }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, rotate: 360 }}
        transition={{ 
            opacity: { duration: 0.2 },
            scale: { duration: 0.2 },
            rotate: { duration: 1, repeat: Infinity, ease: "linear" } 
        }}
        className="relative w-16 h-16"
      >
        <div className="absolute inset-0 border-4 border-orange-500/20 rounded-full" />
        
        <div className="absolute inset-0 border-4 border-orange-500 rounded-full border-t-transparent border-l-transparent drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
      </motion.div>
    </motion.div>
  );
};

export default Transition;