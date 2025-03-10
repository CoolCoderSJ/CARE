"use client";

import React from 'react';
import Navbar from '../src/app/components/Navbar';
import Button from '../src/app/components/Button';

const About = () => {
  return (
    <div>
      <main className="relative p-12 pt-36 md:pt-12 bg-cover bg-center flex flex-col gap-0 row-start-2 items-center justify-start text-center sm:items-start min-h-[60vh]"
        style={{
          backgroundImage: "url('/mission.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full inset-0 bg-black opacity-50"></div>

        <div className="relative z-10 min-h-[60vh] flex flex-col gap-8 items-center justify-center text-center sm:items-start">
          <p className="mt-8 text-5xl w-[80%] text-green-400 font-semibold text-left sm:mt-0 leading-[1.5]">
            Rewriting the narrative to  
            foster hope, resilience, and triumph.
          </p>
        </div>
      </main>
    </div>
  );
};

export default About;
