"use client";

import React, { useState } from 'react';
import Navbar from '../src/app/components/Navbar';
import Button from '../src/app/components/Button';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Branches = () => {
  const [hoveredId, setHoveredId] = useState(null);

  // Enhanced branch data with updated color schemes
  const branchLocations = [
    {
      id: 1,
      city: "New York",
      slug: "new-york",
      image: "/images/branch-ny.jpg",
      color: "from-green-600 to-emerald-500",
      description: "Our flagship location serving the Northeast",
      icon: "🗽"
    },
    {
      id: 2,
      city: "San Francisco",
      slug: "san-francisco",
      image: "/images/branch-sf.jpg",
      color: "from-green-700 to-teal-600",
      description: "Serving communities across the West Coast",
      icon: "🌉"
    },
    {
      id: 3,
      city: "Atlanta",
      slug: "atlanta",
      image: "/images/branch-atl.jpg",
      color: "from-teal-600 to-green-500",
      description: "Our hub for Southern communities",
      icon: "🍑"
    },
    {
      id: 4,
      city: "Chicago",
      slug: "chicago",
      image: "/images/branch-chi.jpg",
      color: "from-emerald-600 to-green-800",
      description: "Supporting the heart of the Midwest",
      icon: "🌆"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Head>
        <title>Our Branches | CARE Nonprofit Organization</title>
        <meta name="description" content="Find CARE nonprofit locations across the country" />
      </Head>
      
      <main className="container mx-auto px-4 py-12">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-emerald-500 mb-6">Our Branches Across America</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            CARE has established branches across the country to better serve communities in need.
            Explore our locations below and discover how we're making a difference in each region.
          </p>
        </motion.section>
        
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {branchLocations.map((branch, index) => (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                onMouseEnter={() => setHoveredId(branch.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Link href={`/branches/${branch.slug}`} className="block h-full">
                  <div className="relative h-96 rounded-xl overflow-hidden shadow-xl group transform transition-all duration-500 hover:scale-[1.02]">
                    {/* Background Image with Gradient Overlay */}
                    <div className="absolute inset-0 w-full h-full">
                      <img 
                        src={branch.image} 
                        alt={`${branch.city} Branch`}
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.target.src = "/images/branch-placeholder.jpg";
                        }}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${branch.color} opacity-70 group-hover:opacity-80 transition-opacity duration-500`}></div>
                    </div>
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
                      {/* Top Section */}
                      <div className="flex justify-between items-start">
                        <span className="text-6xl">{branch.icon}</span>
                        {/* Region labels removed as requested */}
                      </div>
                      
                      {/* Bottom Section */}
                      <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-md">{branch.city}</h2>
                        <p className="text-lg text-white/90 mb-6 max-w-md drop-shadow-md">{branch.description}</p>
                        
                        <motion.div
                          animate={{ 
                            x: hoveredId === branch.id ? 10 : 0 
                          }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="flex items-center"
                        >
                          <span className="text-lg font-medium mr-2">Visit Branch</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                      <div className="absolute top-8 right-8 w-20 h-20 border-2 border-white/20 rounded-full"></div>
                      <div className="absolute bottom-12 left-12 w-16 h-16 border-2 border-white/20 rounded-full"></div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
        
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-green-600 to-emerald-500 p-12 rounded-2xl text-center text-white max-w-5xl mx-auto overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">Join Our National Movement</h2>
            <p className="mb-8 text-lg max-w-2xl mx-auto">
              Each CARE branch focuses on serving local community needs while supporting our broader mission.
              Explore branches to find opportunities near you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                text="National Programs" 
                onClick={() => window.location.href = "/programs"} 
                className="bg-white text-green-700 hover:bg-green-50"
              />
              <Button 
                text="Our Impact" 
                onClick={() => window.location.href = "/impact"} 
                className="bg-transparent border-2 border-white hover:bg-white/10"
              />
            </div>
          </div>
          
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white"></div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default Branches;
