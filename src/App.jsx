import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RegistrationForm from './components/RegistrationForm';
import ClubMembers from './components/ClubMembers';
import Footer from './components/Footer';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-background text-textMain selection:bg-primary selection:text-white relative overflow-hidden">
      
      {/* Interactive Global Background Glow */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300 opacity-60"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(37,99,235,0.08), transparent 80%)`
        }}
      />
      {/* Subtle Grid Pattern overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />

      <div className="relative z-10">
        <Navbar />
      
      <main>
        <Hero />
        
        {/* Domains Section - Simple list for visual spacing before registration */}
        <section id="domains" className="py-20 relative bg-white/50 border-t border-slate-200">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Hackathon <span className="gradient-text">Domains</span></h2>
                <p className="text-textMuted">Explore the 7 core domains and solve real-world problems.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {['Agriculture Tech', 'Healthcare Tech', 'FinTech', 'Education Tech', 'Smart Cities', 'Cybersecurity', 'Women Safety'].map((domain, i) => (
                  <div key={i} className="glass px-6 py-3 rounded-full border border-slate-200 hover:border-primary hover:shadow-[0_4px_15px_rgba(37,99,235,0.1)] transition-all cursor-default text-slate-700 font-medium">
                    {domain}
                  </div>
                ))}
              </div>
           </div>
        </section>

        <RegistrationForm />
        <ClubMembers />
      </main>

      <Footer />
      </div>
    </div>
  );
}

export default App;
