"use client";

import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/lib/motion";

export const About = () => {
  return (
    <section className="flex flex-col items-center justify-center py-20 px-10">
      <motion.div
        variants={slideInFromTop}
        className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] mb-8"
      >
        <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
        <h1 className="Welcome-text text-[13px]">About TechCorp Solutions</h1>
      </motion.div>

      <motion.h2
        variants={slideInFromLeft(0.5)}
        className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 text-center mb-8"
      >
        Leading Technology Innovation
      </motion.h2>

      <motion.div
        variants={slideInFromRight(0.5)}
        className="max-w-4xl text-center text-gray-300 text-lg leading-relaxed"
      >
        <p className="mb-6">
          At TechCorp Solutions, we are passionate about transforming businesses through cutting-edge technology. 
          With over a decade of experience in the industry, we have helped hundreds of companies achieve their 
          digital transformation goals.
        </p>
        <p className="mb-6">
          Our team of expert developers, designers, and consultants work collaboratively to deliver innovative 
          solutions that drive growth, improve efficiency, and create exceptional user experiences.
        </p>
        <p>
          From startups to enterprise-level organizations, we provide scalable solutions that adapt to your 
          business needs and help you stay ahead in today's competitive digital landscape.
        </p>
      </motion.div>
    </section>
  );
};