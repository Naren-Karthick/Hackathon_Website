import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Trophy, Users } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-transparent">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[20%] w-96 h-96 bg-blue-300/30 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] right-[20%] w-[30rem] h-[30rem] bg-violet-300/30 rounded-full blur-[120px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm sm:text-base">
              ITronix Club Presents
            </h2>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black mb-6 tracking-tighter">
              <span className="gradient-text drop-shadow-sm">
                IHackX
              </span>
            </h1>
            <p className="text-2xl sm:text-3xl font-medium text-slate-700 mb-2">
              Code the <span className="font-bold text-slate-900 italic">Uncoded</span>
            </p>
            <p className="max-w-2xl mx-auto text-slate-500 text-sm sm:text-base mb-12">
              Organized by ITronix Club, Department of Information Technology, <br className="hidden sm:block" />
              Sri Muthukumaran Institute of Technology.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              { icon: Calendar, title: "Date", value: "Sept 10-11, 2026" },
              { icon: MapPin, title: "Location", value: "SMIT Campus" },
              { icon: Trophy, title: "Prize Pool", value: "Cash Price" },
              { icon: Users, title: "Team Size", value: "3-6 Members" }
            ].map((item, index) => (
              <div key={index} className="glass-card clean-border p-6 flex flex-col items-center justify-center group hover:-translate-y-2 relative overflow-hidden backdrop-blur-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-violet-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                <item.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 group-hover:text-accent transition-all duration-300 relative z-10" />
                <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{item.title}</h3>
                <p className="text-slate-900 font-bold">{item.value}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <button
              onClick={() => document.querySelector('#registration').scrollIntoView({ behavior: 'smooth' })}
              className="relative overflow-hidden group bg-gradient-to-r from-primary to-accent text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/30"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <span className="relative z-10">Start Hacking</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
