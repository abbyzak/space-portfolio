"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SparklesIcon, CalendarIcon } from "@heroicons/react/24/solid";
import { slideInFromLeft, slideInFromTop } from "@/lib/motion";
import { BookingForm } from "@/components/sub/booking-form";
import type { BookingSlot } from "@company-portfolio/shared";

export const BookCall = () => {
  const [availableSlots, setAvailableSlots] = useState<BookingSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const fetchSlots = async (date?: string) => {
    setLoading(true);
    try {
      const url = date ? `/api/booking-slots?date=${date}` : '/api/booking-slots';
      const response = await fetch(url);
      const data = await response.json();
      setAvailableSlots(data);
    } catch (error) {
      console.error('Failed to fetch slots:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    fetchSlots(date);
  };

  // Get unique dates from available slots
  const availableDates = [...new Set(availableSlots.map(slot => slot.date))].sort();

  return (
    <section id="book-call" className="flex flex-col items-center justify-center py-20 px-10">
      <motion.div
        variants={slideInFromTop}
        className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] mb-8"
      >
        <CalendarIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
        <h1 className="Welcome-text text-[13px]">Schedule a Consultation</h1>
      </motion.div>

      <motion.h2
        variants={slideInFromLeft(0.5)}
        className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 text-center mb-8"
      >
        Book a Call
      </motion.h2>

      <motion.p
        variants={slideInFromLeft(0.7)}
        className="text-gray-300 text-center max-w-2xl mb-12 text-lg"
      >
        Ready to discuss your project? Schedule a free consultation with our team. 
        We'll analyze your requirements and provide tailored solutions for your business.
      </motion.p>

      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Date Selection */}
        <motion.div
          variants={slideInFromLeft(0.9)}
          className="bg-[#0C0C0C] border border-[#2A0E61] rounded-lg p-6"
        >
          <h3 className="text-2xl font-semibold text-white mb-6">Select Date & Time</h3>
          
          <div className="mb-6">
            <label className="block text-gray-300 mb-3">Available Dates:</label>
            <select
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-[#2A0E61] rounded-lg px-4 py-3 text-white focus:border-[#7042f8] focus:outline-none"
            >
              <option value="">All dates</option>
              {availableDates.map(date => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="text-center text-gray-300">Loading slots...</div>
          ) : (
            <div>
              <label className="block text-gray-300 mb-3">Available Times:</label>
              <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {availableSlots.length > 0 ? (
                  availableSlots.map(slot => (
                    <div
                      key={slot.id}
                      className="bg-[#1A1A1A] border border-[#2A0E61] rounded-lg p-3 text-center text-white hover:border-[#7042f8] transition-colors cursor-pointer"
                    >
                      <div className="text-sm">{new Date(slot.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                      <div className="font-semibold">{slot.time}</div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center text-gray-400">
                    No available slots for selected date
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* Booking Form */}
        <motion.div
          variants={slideInFromLeft(1.1)}
          className="bg-[#0C0C0C] border border-[#2A0E61] rounded-lg p-6"
        >
          <BookingForm availableSlots={availableSlots} onBookingSuccess={() => fetchSlots(selectedDate)} />
        </motion.div>
      </div>
    </section>
  );
};