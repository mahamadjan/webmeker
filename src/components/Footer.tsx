
import { useTranslation } from 'react-i18next';
import { Camera, Send, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="relative bg-[#0B1020] pt-20 pb-10 border-t border-white/5 overflow-hidden">
      {/* Gradient Divider effect */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
      
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Description */}
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group inline-flex">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:rotate-12 transition-all duration-300">
                W
              </div>
              <span className="text-2xl font-outfit font-bold tracking-tight text-white group-hover:text-gradient transition-all duration-300">
                WebMaker<span className="text-blue-500">.kg</span>
              </span>
            </Link>
            <p className="text-gray-400 max-w-sm mt-4">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300">
                <Camera size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300">
                <Send size={20} /> {/* Telegram icon placeholder */}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 font-outfit">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'Services', 'Portfolio', 'Pricing', 'About Us'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-blue-400 transition-colors inline-block transform hover:translate-x-1 duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 font-outfit">Services</h3>
            <ul className="space-y-4">
              {['Corporate Websites', 'E-Commerce', 'Landing Pages', 'CRM Systems', 'UI/UX Design'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors inline-block transform hover:translate-x-1 duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 font-outfit">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 group">
                <MapPin size={20} className="text-blue-500 mt-1 shrink-0 group-hover:animate-bounce" />
                <span>Bishkek, Kyrgyzstan<br/>Business Center "Premium"</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 group">
                <Phone size={20} className="text-blue-500 shrink-0" />
                <a href="tel:+996555123456" className="hover:text-white transition-colors">+996 (555) 123-456</a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 group">
                <Mail size={20} className="text-blue-500 shrink-0" />
                <a href="mailto:hello@webmaker.kg" className="hover:text-white transition-colors">hello@webmaker.kg</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2026 WebMaker.kg. {t('footer.rights')}
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
