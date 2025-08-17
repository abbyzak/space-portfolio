"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SparklesIcon, EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/lib/motion";
import type { Company } from "@company-portfolio/shared";

export const Contact = () => {
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await fetch('/api/company');
        const data = await response.json();
        setCompany(data);
      } catch (error) {
        console.error('Failed to fetch company data:', error);
      }
    };

    fetchCompany();
  }, []);

  return (
    <section id="contact" className="flex flex-col items-center justify-center py-20 px-10">
      <motion.div
        variants={slideInFromTop}
        className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] mb-8"
      >
        <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
        <h1 className="Welcome-text text-[13px]">Get In Touch</h1>
      </motion.div>

      <motion.h2
        variants={slideInFromLeft(0.5)}
        className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 text-center mb-16"
      >
        Contact Us
      </motion.h2>

      {company && (
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            variants={slideInFromLeft(0.7)}
            className="bg-[#0C0C0C] border border-[#2A0E61] rounded-lg p-6 text-center hover:border-[#7042f8] transition-colors duration-300"
          >
            <EnvelopeIcon className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
            <p className="text-gray-300">{company.email}</p>
          </motion.div>

          <motion.div
            variants={slideInFromLeft(0.9)}
            className="bg-[#0C0C0C] border border-[#2A0E61] rounded-lg p-6 text-center hover:border-[#7042f8] transition-colors duration-300"
          >
            <PhoneIcon className="h-12 w-12 text-cyan-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Phone</h3>
            <p className="text-gray-300">{company.phone}</p>
          </motion.div>

          <motion.div
            variants={slideInFromRight(0.7)}
            className="bg-[#0C0C0C] border border-[#2A0E61] rounded-lg p-6 text-center hover:border-[#7042f8] transition-colors duration-300"
          >
            <MapPinIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Address</h3>
            <p className="text-gray-300">{company.address}</p>
          </motion.div>
        </div>
      )}
    </section>
  );
};