"use client";

import { useState, useEffect } from "react";
import { SkillDataProvider } from "@/components/sub/skill-data-provider";
import { SkillText } from "@/components/sub/skill-text";
import type { Skill } from "@company-portfolio/shared";

export const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/skills');
        const data = await response.json();
        setSkills(data);
      } catch (error) {
        console.error('Failed to fetch skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) {
    return (
      <section id="skills" className="flex items-center justify-center py-20">
        <div className="text-white">Loading skills...</div>
      </section>
    );
  }

  const frontendSkills = skills.filter(skill => skill.category === 'frontend');
  const backendSkills = skills.filter(skill => skill.category === 'backend');
  const fullstackSkills = skills.filter(skill => skill.category === 'fullstack');
  const otherSkills = skills.filter(skill => skill.category === 'other');

  return (
    <section
      id="skills"
      style={{ transform: "scale(0.9)" }}
      className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden py-20"
    >
      <SkillText />

      {frontendSkills.length > 0 && (
        <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
          {frontendSkills.map((skill, i) => (
            <SkillDataProvider
              key={skill.id}
              src={skill.image}
              name={skill.name}
              width={80}
              height={80}
              index={i}
            />
          ))}
        </div>
      )}

      {backendSkills.length > 0 && (
        <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
          {backendSkills.map((skill, i) => (
            <SkillDataProvider
              key={skill.id}
              src={skill.image}
              name={skill.name}
              width={80}
              height={80}
              index={i}
            />
          ))}
        </div>
      )}

      {fullstackSkills.length > 0 && (
        <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
          {fullstackSkills.map((skill, i) => (
            <SkillDataProvider
              key={skill.id}
              src={skill.image}
              name={skill.name}
              width={80}
              height={80}
              index={i}
            />
          ))}
        </div>
      )}

      {otherSkills.length > 0 && (
        <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
          {otherSkills.map((skill, i) => (
            <SkillDataProvider
              key={skill.id}
              src={skill.image}
              name={skill.name}
              width={80}
              height={80}
              index={i}
            />
          ))}
        </div>
      )}

      <div className="w-full h-full absolute">
        <div className="w-full h-full z-[-10] opacity-30 absolute flex items-center justify-center bg-cover">
          <video
            className="w-full h-auto"
            preload="false"
            playsInline
            loop
            muted
            autoPlay
          >
            <source src="/videos/skills-bg.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </section>
  );
};