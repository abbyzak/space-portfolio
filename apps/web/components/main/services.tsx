"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/lib/motion";
import type { Service } from "@company-portfolio/shared";

export const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section id="services" className="flex items-center justify-center py-20">
        <div className="text-white">Loading services...</div>
      </section>
    );
  }

  return (
    <section id="services" className="flex flex-col items-center justify-center py-20 px-10">
      <motion.div
        variants={slideInFromTop}
        className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] mb-8"
      >
        <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
        <h1 className="Welcome-text text-[13px]">Our Services</h1>
      </motion.div>

      <motion.h2
        variants={slideInFromLeft(0.5)}
        className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 text-center mb-16"
      >
        What We Offer
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl w-full">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            variants={slideInFromRight(0.5 + index * 0.1)}
            className="bg-[#0C0C0C] border border-[#2A0E61] rounded-lg p-6 hover:border-[#7042f8] transition-colors duration-300"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-2xl font-semibold text-white mb-4">{service.title}</h3>
            <p className="text-gray-300 mb-6">{service.description}</p>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium text-white mb-3">Features:</h4>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-300 flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            {service.price && (
              <div className="text-cyan-400 font-semibold text-lg">{service.price}</div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};