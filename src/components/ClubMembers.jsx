import React from 'react';
import { motion } from 'framer-motion';
const members = [
  {
    role: "President / Lead Student Coordinator",
    name: "Thiruselvam",
    designation: "4th Year, IT",
    image: "https://ui-avatars.com/api/?name=Thiruselvam&background=0B0F19&color=00F0FF&size=200",
  },
  {
    role: "Vice President",
    name: "Vanjinathan",
    designation: "4th Year, IT",
    image: "https://ui-avatars.com/api/?name=Vanjinathan&background=0B0F19&color=8A2BE2&size=200",
  },
  {
    role: "Technical Lead",
    name: "Ruban",
    designation: "4th Year, IT",
    image: "https://ui-avatars.com/api/?name=Ruban&background=0B0F19&color=00F0FF&size=200",
  },
  {
    role: "Event & Logistics Lead",
    name: "Blessi",
    designation: "4th Year, IT",
    image: "https://ui-avatars.com/api/?name=Blessi&background=0B0F19&color=8A2BE2&size=200",
  },
  {
    role: "Event & Logistics Lead",
    name: "Kayalvizhi",
    designation: "4th Year, IT",
    image: "https://ui-avatars.com/api/?name=Kayalvizhi&background=0B0F19&color=8A2BE2&size=200",
  },
  {
    role: "Design & Media Head",
    name: "Suriyadharan",
    designation: "3rd Year, IT",
    image: "https://ui-avatars.com/api/?name=Suriyadharan&background=0B0F19&color=00F0FF&size=200",
  },
  {
    role: "Design & Media Head",
    name: "Kaarki Che",
    designation: "3rd Year, IT",
    image: "https://ui-avatars.com/api/?name=Kaarki+Che&background=0B0F19&color=00F0FF&size=200",
  },
  {
    role: "Design & Media Head",
    name: "Mohan Raj",
    designation: "3rd Year, IT",
    image: "https://ui-avatars.com/api/?name=Mohan+Raj&background=0B0F19&color=00F0FF&size=200",
  },
  {
    role: "Design & Media Head",
    name: "Divya Priya",
    designation: "3rd Year, IT",
    image: "https://ui-avatars.com/api/?name=Divya+Priya&background=0B0F19&color=00F0FF&size=200",
  },
  {
    role: "Design & Media Head",
    name: "Ellammal",
    designation: "3rd Year, IT",
    image: "https://ui-avatars.com/api/?name=Ellammal&background=0B0F19&color=00F0FF&size=200",
  },
  {
    role: "Design & Media Head",
    name: "Deepika",
    designation: "3rd Year, IT",
    image: "https://ui-avatars.com/api/?name=Deepika&background=0B0F19&color=00F0FF&size=200",
  },
  {
    role: "Design & Media Head",
    name: "Nethra",
    designation: "3rd Year, IT",
    image: "https://ui-avatars.com/api/?name=Nethra&background=0B0F19&color=00F0FF&size=200",
  },
  {
    role: "Design & Media Head",
    name: "Naren Karthick",
    designation: "2nd Year, IT",
    image: "https://ui-avatars.com/api/?name=Naren+Karthick&background=0B0F19&color=00F0FF&size=200",
  },
  {
    role: "Design & Media Head",
    name: "Ranjan",
    designation: "2nd Year, IT",
    image: "https://ui-avatars.com/api/?name=Ranjan&background=0B0F19&color=00F0FF&size=200",
  },
  {
    role: "Design & Media Head",
    name: "Reshma Parveen",
    designation: "2nd Year, IT",
    image: "https://ui-avatars.com/api/?name=Reshma+Parveen&background=0B0F19&color=00F0FF&size=200",
  },
  {
    role: "Design & Media Head",
    name: "Aishwarya",
    designation: "2nd Year, IT",
    image: "https://ui-avatars.com/api/?name=Aishwarya&background=0B0F19&color=00F0FF&size=200",
  },
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
