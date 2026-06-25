import { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import HeroModel from '../components/HeroModel';
import ContactModal from '../components/ContactModal';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Static Background Image (Improves Performance) */}
      <div className="fixed inset-0 z-0 bg-black">
        <img 
          src="/bg.jpg"
          alt="Forest Background" 
          className="w-full h-full object-cover opacity-80"
          onError={(e) => {
            // Fallback to Unsplash if bg.jpg is not found
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />
      </div>
      
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden z-10 w-full flex flex-col lg:flex-row">
        
        {/* Left Side: Text Content */}
        <div className="w-full lg:w-1/2 relative z-10 flex flex-col items-start justify-center h-full text-left px-6 sm:px-8 lg:px-16 xl:px-24 pt-20 sm:pt-24 lg:pt-20 pointer-events-none">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block border border-white/20 px-4 py-1.5 md:px-6 md:py-2 rounded-full uppercase tracking-widest text-[10px] md:text-xs font-semibold mb-6 md:mb-8 bg-white/5 backdrop-blur-md glass-text-body"
          >
            {t('hero.mac_title')}
          </motion.div>
          
          {/* Massive Typography */}
          <motion.h1 
            initial={{ opacity: 0, filter: 'blur(20px)', y: 30 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-[5rem] xl:text-[6.5rem] font-bold leading-tight tracking-tight glass-text mb-2"
          >
            {t('hero.title1')}
          </motion.h1>
          
          <motion.h1 
            initial={{ opacity: 0, filter: 'blur(20px)', y: 30 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-[12vw] sm:text-[10vw] md:text-[6vw] lg:text-[4.5vw] xl:text-[5vw] font-bold leading-none tracking-tight mb-2 whitespace-nowrap glass-text"
          >
            {t('hero.title2')}
          </motion.h1>
          <motion.h1 
            initial={{ opacity: 0, filter: 'blur(20px)', y: 30 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="text-[12vw] sm:text-[10vw] md:text-[6vw] lg:text-[4.5vw] xl:text-[5vw] font-bold leading-none tracking-tight mb-8 whitespace-nowrap glass-text"
          >
            {t('hero.title3')}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="max-w-xl text-base sm:text-lg md:text-xl font-medium mb-8 md:mb-12 leading-relaxed glass-text-body"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-xl pointer-events-auto"
          >
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              onClick={() => setIsModalOpen(true)}
              className="liquid-button px-6 py-4 font-semibold tracking-wide text-sm flex items-center justify-center gap-2 group glass-text-body w-full sm:w-auto"
            >
              {t('hero.cta_start')}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              onClick={() => navigate('/portfolio')}
              className="px-6 py-4 rounded-full border border-white/20 font-semibold tracking-wide text-sm hover:bg-white/10 transition-colors backdrop-blur-md cursor-pointer flex items-center justify-center glass-text-body w-full sm:w-auto"
            >
              {t('hero.cta_portfolio')}
            </motion.button>
          </motion.div>
        </div>

        {/* Right Side: 3D Canvas */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full absolute lg:relative lg:w-1/2 z-0 pointer-events-auto right-0"
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
            <ambientLight intensity={3} />
            <directionalLight position={[10, 10, 10]} intensity={4} />
            <spotLight position={[-10, 10, -10]} angle={0.15} penumbra={1} intensity={5} />
            <Suspense fallback={null}>
              <HeroModel />
            </Suspense>
          </Canvas>
        </motion.div>

      </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Home;
