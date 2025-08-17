"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { BookingSlot } from "@company-portfolio/shared";

type BookingFormData = {
  slotId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  company?: string;
  message: string;
};

type BookingFormProps = {
  availableSlots: BookingSlot[];
  onBookingSuccess: () => void;
};

export const BookingForm = ({ availableSlots, onBookingSuccess }: BookingFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<BookingFormData>();

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Booking confirmed! We\'ll contact you soon.');
        reset();
        onBookingSuccess();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to book appointment');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold text-white mb-6">Book Your Consultation</h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">Select Time Slot *</label>
          <select
            {...register('slotId', { required: 'Please select a time slot' })}
            className="w-full bg-[#1A1A1A] border border-[#2A0E61] rounded-lg px-4 py-3 text-white focus:border-[#7042f8] focus:outline-none"
          >
            <option value="">Choose a time slot</option>
            {availableSlots.map(slot => (
              <option key={slot.id} value={slot.id}>
                {new Date(slot.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                })} at {slot.time}
              </option>
            ))}
          </select>
          {errors.slotId && (
            <p className="text-red-400 text-sm mt-1">{errors.slotId.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Full Name *</label>
          <input
            type="text"
            {...register('clientName', { required: 'Name is required' })}
            className="w-full bg-[#1A1A1A] border border-[#2A0E61] rounded-lg px-4 py-3 text-white focus:border-[#7042f8] focus:outline-none"
            placeholder="Your full name"
          />
          {errors.clientName && (
            <p className="text-red-400 text-sm mt-1">{errors.clientName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Email *</label>
          <input
            type="email"
            {...register('clientEmail', { 
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address'
              }
            })}
            className="w-full bg-[#1A1A1A] border border-[#2A0E61] rounded-lg px-4 py-3 text-white focus:border-[#7042f8] focus:outline-none"
            placeholder="your@email.com"
          />
          {errors.clientEmail && (
            <p className="text-red-400 text-sm mt-1">{errors.clientEmail.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Phone *</label>
          <input
            type="tel"
            {...register('clientPhone', { required: 'Phone number is required' })}
            className="w-full bg-[#1A1A1A] border border-[#2A0E61] rounded-lg px-4 py-3 text-white focus:border-[#7042f8] focus:outline-none"
            placeholder="+1 (555) 123-4567"
          />
          {errors.clientPhone && (
            <p className="text-red-400 text-sm mt-1">{errors.clientPhone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Company (Optional)</label>
          <input
            type="text"
            {...register('company')}
            className="w-full bg-[#1A1A1A] border border-[#2A0E61] rounded-lg px-4 py-3 text-white focus:border-[#7042f8] focus:outline-none"
            placeholder="Your company name"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Message *</label>
          <textarea
            {...register('message', { required: 'Please describe your project' })}
            rows={4}
            className="w-full bg-[#1A1A1A] border border-[#2A0E61] rounded-lg px-4 py-3 text-white focus:border-[#7042f8] focus:outline-none resize-none"
            placeholder="Tell us about your project and requirements..."
          />
          {errors.message && (
            <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || availableSlots.length === 0}
          className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-cyan-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Booking...' : 'Book Consultation'}
        </button>
      </form>
    </div>
  );
};