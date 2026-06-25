import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'ky' : 'ru');
  };

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.portfolio'), path: '/portfolio' }
  ];

  return (
    <>
      <nav className={`fixed left-1/2 -translate-x-1/2 z-[60] w-full max-w-4xl px-2 md:px-4 transition-all duration-500 ${scrolled ? 'top-0 md:top-4' : 'top-2 md:top-8'}`}>
        <div className="liquid-card px-5 md:px-8 py-3 md:py-4 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="text-xl font-bold tracking-tight glass-text flex items-center gap-2">
            <span>WebMaker</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 relative">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className="relative px-3 py-1 text-sm font-medium transition-colors hover:text-white"
              >
                {location.pathname === link.path && (
                  <motion.span 
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/10 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className={location.pathname === link.path ? "glass-text-body font-bold" : "glass-text-body opacity-70"}>
                  {link.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLang} 
              className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/15 transition-colors border border-white/10 glass-text-body font-semibold text-xs"
            >
              {i18n.language.toUpperCase()}
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/5 hover:bg-white/15 transition-colors border border-white/10 text-white/80"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center pt-20 pb-10 px-6"
          >
            <div className="flex flex-col items-center gap-8 w-full max-w-xs">
              {navLinks.map((link, i) => (
                <motion.div 
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                  className="w-full"
                >
                  <Link 
                    to={link.path} 
                    className="block text-center w-full py-4 text-3xl font-bold transition-colors relative"
                  >
                    <span className={location.pathname === link.path ? "glass-text" : "text-white/50"}>
                      {link.name}
                    </span>
                    {location.pathname === link.path && (
                      <motion.div 
                        layoutId="mobile-nav-pill"
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Liquid Glass Effect Element at bottom */}
            <div className="absolute bottom-10 w-full flex justify-center opacity-30">
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent blur-[2px] rounded-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
