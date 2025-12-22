import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TOTAL_IMAGES = 25; 

const FallingItems = () => {
  const [items, setItems] = useState<{ 
    id: number; 
    left: number; 
    duration: number; 
    delay: number;
    imgIndex: number;
    rotation: number;
  }[]>([]);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -200]);

  useEffect(() => {
    const newItems = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, 
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 15,
      imgIndex: Math.floor(Math.random() * TOTAL_IMAGES) + 1,
      rotation: Math.random() * 360,
    }));
    setItems(newItems);
  }, []);

  return (
    <motion.div 
      style={{ y }}
      className="fixed -top-[10vh] left-0 w-full h-[120vh] pointer-events-none z-0 overflow-hidden"
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: -100, x: 0, opacity: 0, rotate: item.rotation }}
          animate={{ 
            y: '120vh',
            opacity: [0, 0.3, 0],
            rotate: item.rotation + 180, 
            x: [0, 30, -30, 0] 
          }} 
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "linear",
            x: {
              duration: item.duration / 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
          style={{ left: `${item.left}%` }}
          className="absolute top-0 w-8 h-8 md:w-10 md:h-10"
        >
          <img 
            src={`/blobfox/${item.imgIndex}.png`} 
            alt="floating blob" 
            className="w-full h-full object-contain opacity-25 blur-[0.5px] grayscale-[0.3]" 
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FallingItems;