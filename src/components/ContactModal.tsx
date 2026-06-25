import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Send, Loader2, Phone, MessageCircle, Camera, CheckCircle } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ContactMethod = 'phone' | 'whatsapp' | 'telegram' | 'instagram';

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });
  const [method, setMethod] = useState<ContactMethod>('telegram');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) return;

    setStatus('sending');

    const token = import.meta.env.VITE_TG_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TG_CHAT_ID;

    if (!token || !chatId) {
      console.warn("Telegram Token or Chat ID is missing from .env");
      setTimeout(() => {
        setStatus('success');
      }, 1000);
      return;
    }

    const methodName = t(`modal.methods.${method}`);
    const text = `🚀 *НОВЫЙ ЗАКАЗ С САЙТА!*\n\n👤 *Имя:* ${formData.name}\n💬 *Связь:* [${methodName}] ${formData.contact}\n📝 *Описание:* ${formData.message || 'Нет описания'}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: 'Markdown',
        }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStatus('idle');
      setFormData({ name: '', contact: '', message: '' });
    }, 300); // Reset after animation completes
  };

  const cleanUsername = formData.contact.replace('@', '').replace('https://t.me/', '').replace('https://instagram.com/', '').trim();
  const showAvatar = (method === 'telegram' || method === 'instagram') && cleanUsername.length > 2;
  const avatarUrl = showAvatar ? `https://unavatar.io/${method}/${cleanUsername}` : null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onClick={handleClose}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="liquid-card w-full max-w-md max-h-[90vh] overflow-y-auto pointer-events-auto relative"
            >
              {/* Close Button */}
              <button 
                onClick={handleClose}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10"
              >
                <X size={24} />
              </button>

              <div className="p-6 sm:p-8">
                {status === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center text-center py-8"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
                      className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)] border border-green-500/30"
                    >
                      <CheckCircle size={40} className="text-green-400" />
                    </motion.div>
                    <h2 className="text-3xl font-bold mb-4 glass-text">{t('modal.success_title')}</h2>
                    <p className="glass-text-body text-base leading-relaxed">
                      {t('modal.success_subtitle', { method: t(`modal.methods.${method}`) })}
                    </p>
                    <button 
                      onClick={handleClose}
                      className="mt-8 liquid-button px-8 py-3 rounded-full font-bold w-full glass-text-body"
                    >
                      OK
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold mb-2 glass-text">{t('modal.title')}</h2>
                    <p className="glass-text-body mb-8 text-sm">{t('modal.subtitle')}</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      {/* Name Input */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2 pl-2">
                          {t('modal.name')}
                        </label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all backdrop-blur-md"
                        />
                      </div>

                      {/* Contact Method Selector */}
                      <div>
                        <div className="flex gap-2 mb-3">
                          {(['phone', 'whatsapp', 'telegram', 'instagram'] as ContactMethod[]).map((m) => (
                            <button
                              key={m}
                              type="button"
                              onClick={() => { setMethod(m); setFormData(prev => ({ ...prev, contact: '' })) }}
                              className={`flex-1 py-2 flex justify-center items-center rounded-xl transition-all border ${
                                method === m 
                                  ? 'bg-white/20 border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
                                  : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/50'
                              }`}
                            >
                              {m === 'phone' && <Phone size={18} className={method === m ? 'text-white' : ''} />}
                              {m === 'whatsapp' && <MessageCircle size={18} className={method === m ? 'text-green-400' : ''} />}
                              {m === 'telegram' && <Send size={18} className={method === m ? 'text-blue-400' : ''} />}
                              {m === 'instagram' && <Camera size={18} className={method === m ? 'text-pink-400' : ''} />}
                            </button>
                          ))}
                        </div>

                        <div className="relative">
                          <input 
                            type={method === 'phone' || method === 'whatsapp' ? 'tel' : 'text'} 
                            placeholder={method === 'phone' || method === 'whatsapp' ? '+996...' : '@username'}
                            required
                            value={formData.contact}
                            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                            className={`w-full bg-white/5 border border-white/10 rounded-2xl py-3 text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all backdrop-blur-md ${showAvatar ? 'pl-14 pr-4' : 'px-4'}`}
                          />
                          
                          {/* Magical Avatar Preview */}
                          <AnimatePresence>
                            {showAvatar && avatarUrl && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full overflow-hidden border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.2)] bg-white/10"
                              >
                                <img 
                                  key={avatarUrl}
                                  src={avatarUrl} 
                                  alt="Avatar Preview" 
                                  className="w-full h-full object-cover transition-opacity duration-300"
                                  onLoad={(e) => {
                                    (e.target as HTMLImageElement).style.opacity = '1';
                                  }}
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.opacity = '0';
                                  }}
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Message Input */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2 pl-2">
                          {t('modal.message')}
                        </label>
                        <textarea 
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all backdrop-blur-md resize-none"
                        />
                      </div>

                      <button 
                        type="submit" 
                        disabled={status === 'sending'}
                        className="liquid-button mt-4 py-4 rounded-full font-bold flex items-center justify-center gap-2 group disabled:opacity-50 transition-all"
                      >
                        {status === 'idle' && <><Send size={18} /> <span className="glass-text-body group-hover:brightness-150">{t('modal.send')}</span></>}
                        {status === 'sending' && <><Loader2 size={18} className="animate-spin" /> <span className="glass-text-body">{t('modal.sending')}</span></>}
                        {status === 'error' && <span className="text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.5)]">{t('modal.error')}</span>}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ContactModal;
