"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Button from "../src/app/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedin, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { throttle } from "../src/utils/throttle";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Animation variants for better performance
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Home() {
  const [files, setFiles] = useState([]);
  const [activeTab, setActiveTab] = useState("Awareness");
  const features = ["Awareness", "Research", "Education"];
  const [isMobile, setIsMobile] = useState(false);
  
  // Optimized Intersection Observer configurations
  const [mainRef, mainInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [eventsRef, eventsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [numbersRef, numbersInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [stayUpToDateRef, stayUpToDateInView] = useInView({ threshold: 0.1, triggerOnce: true });

  // Check for mobile device on mount
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = throttle(() => {
      setIsMobile(window.innerWidth < 768);
    }, 200);
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchFiles = async () => {
      let { data, error } = await supabase.from('data').select("section, file_ids");
      if (error) {
        console.error("Error fetching file IDs:", error);
      } else {
        for (const row of data) {
          if (row.section === "landing.events") {
            data = row;
            break;
          }
        }
        
        const fileLinks = await Promise.all(data.file_ids.map(async (fileName) => {
          const { data, error } = supabase.storage.from('images').getPublicUrl(fileName);
          if (error) {
            return null;
          }
          return data.publicUrl;
        }));
        setFiles(fileLinks.filter(Boolean));
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="pattern-back min-h-screen">
      <motion.main 
        ref={mainRef}
        className="p-12 pt-48 md:pt-48 bg-[url('/bg.svg')] bg-cover bg-center flex flex-col gap-0 row-start-2 items-center justify-start text-center sm:items-start min-h-[75vh]"
        initial="hidden"
        animate={mainInView ? "visible" : "hidden"}
        variants={fadeIn}
      >
        <motion.h1 
          className="w-full text-[4.5rem] md:text-[10rem] mb-0 font-semibold text-color-900 --font-fredoka"
          style={{ lineHeight: 1, willChange: "transform" }}
          variants={{
            hidden: { y: -20, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
          }}
        >
          curingwithCARE
        </motion.h1>
        <motion.p 
          className="w-full mt-12 text-3xl"
          variants={slideUp}
        >
          <i>Dedicated to the advancement of <br></br>
          cancer <span className="underline">awareness</span>, <span className="underline">research</span>, and <span className="underline">education</span></i>
        </motion.p>
        <motion.div 
          className="flex gap-12 mt-16 w-full justify-center"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.5, delay: 0.3 } }
          }}
        >
          <Button 
            link="/" 
            text="Donate" 
            className="bg-color-500 hover:bg-color-600 text-white px-8 py-4 text-xl font-bold rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-xl border-2 border-color-400" 
          />
          <Button 
            link="/" 
            text="Join" 
            className="bg-white hover:bg-color-100 px-8 py-4 text-xl font-bold rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-xl border-2 border-color-600" 
            style={{
              color: "black"
            }}
          />
        </motion.div>
      </motion.main>

      <section 
        className="p-4 md:p-12 text-center row-start-2 grid grid-cols-1 sm:grid-cols-3 gap-8 justify-center min-h-[60vh] pt-16" 
        style={{ placeItems: "center" }}
      >     
        <div className="flex flex-col md:flex-row w-full col-span-3 mx-auto mt-10">
            <div className="w-full md:w-1/3 flex md:flex-col border-r">
              {features.map((tab, index) => (
                <motion.button
                  key={tab}
                  className={`--font-fredoka font-bold text-4xl md:text-6xl text-color-900 mb-4 w-full py-3 px-4 text-right u ${
                    activeTab === tab ? "underline-no-color" : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {features[index]}
                </motion.button>
              ))}
            </div>

            <div className="w-full md:w-2/3 p-5">
              <AnimatePresence mode="wait">
                {activeTab === "Awareness" && (
                  <motion.div
                    key="awareness"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-600 text-2xl text-center md:text-left mt-2">CARE's outreach initiatives encompass a wide range of activities from partaking in local events to various fundraising opportunities.</p>

                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
                      <div className="flex flex-col flex-1 gap-10 lg:gap-0 lg:flex-row lg:justify-between">
                        <div className="w-full lg:w-1/4 border-b pb-10 lg:border-b-0 lg:pb-0 lg:border-r border-gray-100">
                          <div className="font-bold text-6xl text-color-800 mb-4 text-center">33%</div>
                          <span className="text-xl text-gray-500 text-center block">Chance for a woman to be diagnosed with cancer</span>
                        </div>
                        <div className="w-full lg:w-1/4 border-b pb-10 lg:border-b-0 lg:pb-0 lg:border-r border-gray-100">
                          <div className="font-bold text-6xl text-color-800 mb-4 text-center">50%</div>
                          <span className="text-xl text-gray-500 text-center block">Chance for a man to be diagnosed with cancer</span>
                        </div>
                        <div className="w-full lg:w-1/4 border-b pb-10 lg:border-b-0 lg:pb-0 lg:border-r border-gray-100">
                          <div className="font-bold text-6xl text-color-800 mb-4 text-center">42%</div>
                          <span className="text-xl text-gray-500 text-center block">Of all cancer cases are preventable</span>
                        </div>
                        <div className="w-full lg:w-1/4">
                          <div className="font-bold text-6xl text-color-800 mb-4 text-center">85%</div>
                          <span className="text-xl text-gray-500 text-center block">Of children survive cancer past 5 years</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                {activeTab === "Research" && (
                  <motion.div
                    key="research"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-600 text-2xl text-center md:text-left mt-2">CARE actively engages in impactful service projects aimed at benefiting individuals and communities affected by cancer.</p>
                    <div className="flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-center mt-8 bg-color-400 p-10 rounded-lg shadow-xl">
                      <h1 className="text-3xl text-color-900 font-semibold">Check out the CARE research competition!</h1>
                      <Button link="/" text="See More" />
                    </div>
                  </motion.div>
                )}
                {activeTab === "Education" && (
                  <motion.div
                    key="education"
                    className="flex flex-col items-center md:items-start"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-600 text-2xl text-center md:text-left mt-2">CARE brings in expert guest speakers who share their knowledge and experiences of cancer research and treatment.</p>
                    <h2 className="text-4xl font-semibold mt-8 mb-4">Watch the CARE Series</h2>
                    <iframe className="rounded-lg shadow-xl w-[400px] md:w-[560px]" height="315" src="https://www.youtube-nocookie.com/embed/aEKpFeLqMDo?si=UKbAZZlE-E3s6NEk" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" loading="lazy"></iframe>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
        </div>
      </section>

      <section 
        ref={eventsRef}
        className="text-center flex gap-8 justify-center items-center min-h-[100vh] mt-24 pt-8 relative"
      >
          <motion.h1 
            className="--font-fredoka col-span-3 font-bold text-[5rem] leading-none text-color-300 md:text-color-800 bg-[rgba(0,0,0,0.6)] md:bg-[transparent] pb-8 mb-8 z-10 w-[fit-content] p-4 rounded-xl"
            style={{ willChange: "transform" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={eventsInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Events
            <div className="flex items-center w-full justify-center gap-4 mt-4">
              <Button className="--font-hoss-normal" link="/" text={`See More!`} />
            </div>
          </motion.h1>
          <div className="absolute inset-0 z-0 grid grid-cols-2 md:grid-cols-3 gap-0 opacity-75 left-0 right-0">
            {files.map((file, index) => (
              <motion.div 
                key={index} 
                className={`hexagon ${index == 4 ? 'hidden' : ''} md:inline-grid`}
                initial={{ opacity: 0 }}
                animate={eventsInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: eventsInView ? Math.min(index * 0.1, 0.5) : 0 }}
              >
                <Image 
                  src={file} 
                  alt={`Event ${index}`} 
                  layout="fill" 
                  objectFit="cover" 
                  className="hexagon-image" 
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </motion.div>
            ))}
          </div>
      </section>

      <motion.section 
        ref={numbersRef}
        className="p-12 text-center grid grid-cols-1 sm:grid-cols-3 gap-8 justify-center min-h-[60vh] pt-8 mt-24" 
        style={{ placeItems: "center" }}
        initial="hidden"
        animate={numbersInView ? "visible" : "hidden"}
        variants={fadeIn}
      >
        <h1 className="--font-fredoka col-span-3 font-bold text-[7rem] leading-none w-full text-color-800 mb-4" style={{ transform: "rotate(-4deg)" }}>By The Numbers</h1>
        
        <motion.div 
          className="col-span-3 md:col-span-1 text-center flex flex-col items-center justify-center gap-4 bg-[url('/blob3.svg')] w-[80vw] md:w-[22vw] md:h-[22vw] h-[80vw] bg-no-repeat bg-center pb-8"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } }
          }}
        >
          <h1 className="ml-6 w-full text-[5rem] 2xl:text-[6rem] md:text-[5rem] leading-none font-bold --font-fredoka text-color-900">500+</h1>
          <p className="ml-6 w-full text-xl 2xl:text-2xl text-color-900 font-semibold">Members worldwide</p>
        </motion.div>

        <motion.div 
          className="col-span-3 md:col-span-1 text-center flex flex-col items-center justify-center gap-4 bg-[url('/blob2.svg')] w-[80vw] md:w-[22vw] md:h-[22vw] h-[80vw]  bg-no-repeat bg-center pb-8"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
          }}
        >
          <h1 className="ml-6 w-full text-[6rem] md:text-[4rem] leading-none font-bold --font-fredoka text-color-900">$27k+</h1>
          <p className="ml-6 w-full text-3xl text-color-900 font-semibold">raised</p>
        </motion.div>

        <motion.div 
          className="col-span-3 md:col-span-1 text-center flex flex-col items-center justify-center gap-4 bg-[url('/blob.svg')] w-[80vw] md:w-[22vw] md:h-[22vw] h-[80vw]  bg-no-repeat bg-center pb-8"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } }
          }}
        >
          <h1 className="ml-6 w-full text-[6rem] md:text-[5rem] leading-none font-bold --font-fredoka text-color-900">40+</h1>
          <p className="ml-6 w-full text-3xl text-color-900 font-semibold">Chapters</p>
        </motion.div>
      </motion.section>

      <motion.section 
        ref={stayUpToDateRef}
        className="p-12 text-center gap-8 justify-center min-h-[40vh] pt-8 mt-12" 
        style={{ placeItems: "center" }}
        initial="hidden"
        animate={stayUpToDateInView ? "visible" : "hidden"}
        variants={fadeIn}
      >
        <h1 className="--font-fredoka col-span-3 font-bold text-[7rem] leading-none w-full text-color-800">Stay Up To Date</h1>
        <p className="italic col-span-3 text-2xl text-gray-500 mb-4">It would make me really happy if you follow @curingwithcare everywhere 🥺</p>
        
        <div className="flex flex-col md:flex-row gap-8">
          {[
            { icon: faInstagram, name: '@curingwithcare', color: '#dd2a7b', url: '/' },
            { icon: faLinkedin, name: 'curingwithCARE', color: '#0a66c2', url: '/' },
            { icon: faFacebook, name: 'curingwithcare', color: '#0861f2', url: '/' }
          ].map((social, index) => (
            <motion.a 
              key={social.name}
              href={social.url} 
              className="relative inline-block text-lg group"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.4, delay: 0.1 * index } }
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span
                className={`relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-[${social.color}] rounded-lg group-hover:text-white`}
              >
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span 
                  className={`absolute left-0 w-72 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-[${social.color}] group-hover:-rotate-180 ease`}
                  style={{ willChange: "transform" }}
                ></span>
                <span className={`relative flex items-center gap-2 text-[${social.color}] group-hover:text-white`}>
                  <FontAwesomeIcon size="lg" icon={social.icon} /> {social.name}
                </span>
              </span>
              <span 
                className={`absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-[${social.color}] rounded-lg group-hover:mb-0 group-hover:mr-0`} 
                data-rounded="rounded-lg"
              ></span>
            </motion.a>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
