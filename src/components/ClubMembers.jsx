import React from 'react';
import { motion } from 'framer-motion';
const members = [
  {
    role: "President / Lead Student Coordinator",
    name: "Alex Mercer",
    designation: "4th Year, IT",
    image: "https://ui-avatars.com/api/?name=Alex+Mercer&background=0B0F19&color=00F0FF&size=200",
  },
  {
    role: "Vice President",
    name: "Sarah Chen",
    designation: "4th Year, IT",
    image: "https://ui-avatars.com/api/?name=Sarah+Chen&background=0B0F19&color=8A2BE2&size=200",
  },
  {
    role: "Technical Lead",
    name: "Vikram Singh",
    designation: "3rd Year, IT",
    image: "https://ui-avatars.com/api/?name=Vikram+Singh&background=0B0F19&color=00F0FF&size=200",
  },
  {
    role: "Event & Logistics Lead",
    name: "Emily Davis",
    designation: "3rd Year, IT",
    image: "https://ui-avatars.com/api/?name=Emily+Davis&background=0B0F19&color=8A2BE2&size=200",
  },
  {
    role: "Design & Media Head",
    name: "Rohan Gupta",
    designation: "2nd Year, IT",
    image: "https://ui-avatars.com/api/?name=Rohan+Gupta&background=0B0F19&color=00F0FF&size=200",
  },
  {
    role: "Staff Coordinator / Faculty Advisor",
    name: "Dr. K. Ramasamy",
    designation: "Department of IT",
    image: "https://ui-avatars.com/api/?name=Dr+K+Ramasamy&background=0B0F19&color=8A2BE2&size=200",
  }
];

const ClubMembers = () => {
  return (
    <section id="members" className="py-20 relative bg-obsidian/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Meet Team <span className="neon-text">ITronix</span></h2>
          <p className="text-gray-400 text-lg">Student Organizers & Core Committee</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
            >
              {/* Decorative border top */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan to-purple opacity-50 group-hover:opacity-100 transition-opacity" />

              <div className="w-24 h-24 mb-6 rounded-full p-1 bg-gradient-to-tr from-cyan to-purple">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full border-2 border-obsidian"
                />
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-gray-400 text-xs mb-6">{member.designation}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClubMembers;
