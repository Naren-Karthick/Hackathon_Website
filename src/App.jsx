import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RegistrationForm from './components/RegistrationForm';
import ClubMembers from './components/ClubMembers';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-obsidian text-white selection:bg-cyan selection:text-obsidian">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Domains Section - Simple list for visual spacing before registration */}
        <section id="domains" className="py-20 relative bg-obsidian/50 border-t border-white/5">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Hackathon <span className="neon-text-purple">Domains</span></h2>
                <p className="text-gray-400">Explore the 7 core domains and solve real-world problems.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {['Agriculture Tech', 'Healthcare Tech', 'FinTech', 'Education Tech', 'Smart Cities', 'Cybersecurity', 'Women Safety'].map((domain, i) => (
                  <div key={i} className="glass px-6 py-3 rounded-full border border-white/10 hover:border-purple hover:shadow-[0_0_15px_rgba(138,43,226,0.3)] transition-all cursor-default">
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
  );
}

export default App;
