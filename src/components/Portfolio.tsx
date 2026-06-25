import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const Portfolio = () => {
  const { t } = useTranslation();

  const projects = [
    {
      id: 1,
      title: t('portfolio.project1.title'),
      description: t('portfolio.project1.desc'),
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      id: 2,
      title: t('portfolio.project2.title'),
      description: t('portfolio.project2.desc'),
      image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      id: 3,
      title: t('portfolio.project3.title'),
      description: t('portfolio.project3.desc'),
      image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#"
    }
  ];

  return (
    <section id="portfolio" className="py-24 relative z-10 w-full min-h-screen pt-32 px-4 md:px-8">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glass-text inline-block">{t('portfolio.title')}</h2>
          <div className="w-24 h-1 bg-white/20 mx-auto rounded-full mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, rotateX: 2, rotateY: -2 }}
              className="liquid-card group cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden rounded-t-[32px]">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold mb-3 glass-text group-hover:drop-shadow-[0_0_15px_rgba(10,132,255,0.6)] transition-all">
                  {project.title}
                </h3>
                <p className="mb-6 font-medium leading-relaxed glass-text-body">
                  {project.description}
                </p>
                <a 
                  href={project.link}
                  className="inline-flex items-center gap-2 text-sm font-bold glass-text-body hover:brightness-150 transition-all uppercase tracking-wider"
                >
                  {t('portfolio.view_project')} <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
