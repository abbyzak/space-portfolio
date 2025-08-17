"use client";

import { useState, useEffect } from "react";
import { ProjectCard } from "@/components/sub/project-card";
import type { Project } from "@company-portfolio/shared";

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="flex items-center justify-center py-20">
        <div className="text-white">Loading projects...</div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="flex flex-col items-center justify-center py-20"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        Our Projects
      </h1>
      <div className="h-full w-full flex flex-col md:flex-row gap-10 px-10">
        {projects.slice(0, 3).map((project) => (
          <ProjectCard
            key={project.id}
            src={project.image}
            title={project.title}
            description={project.description}
            link={project.link}
            technologies={project.technologies}
          />
        ))}
      </div>
    </section>
  );
};