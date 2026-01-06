import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase(1), 800);
    const timer2 = setTimeout(() => setPhase(2), 1600);
    const timer3 = setTimeout(() => setPhase(3), 2400);
    const timer4 = setTimeout(() => onFinish(), 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onFinish]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
        style={{ background: 'linear-gradient(135deg, hsl(0 0% 5%) 0%, hsl(0 0% 12%) 100%)' }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-primary/20 rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-primary/20 rounded-full" />
        </div>

        {/* Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ 
            scale: phase >= 1 ? 1 : 0.5, 
            opacity: phase >= 0 ? 1 : 0 
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="relative z-10"
        >
          <h1 className="font-display text-7xl font-bold tracking-tight">
            <span className="text-primary">ACE</span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ 
            y: phase >= 1 ? 0 : 20, 
            opacity: phase >= 1 ? 1 : 0 
          }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-4 text-center"
        >
          <p className="text-lg font-medium tracking-widest text-muted-foreground uppercase">
            Genuine Parts
          </p>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ 
            y: phase >= 2 ? 0 : 20, 
            opacity: phase >= 2 ? 1 : 0 
          }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-2 text-sm text-muted-foreground"
        >
          Lifting India's Growth
        </motion.p>

        {/* Loading Indicator */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: phase >= 2 ? '120px' : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="mt-12 h-1 rounded-full bg-primary"
        />

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 3 ? 1 : 0 }}
          className="absolute bottom-12 text-xs text-muted-foreground"
        >
          Action Construction Equipment Ltd.
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
