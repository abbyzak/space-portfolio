import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  src: string;
  title: string;
  description: string;
  link: string;
  technologies: string[];
};

export const ProjectCard = ({
  src,
  title,
  description,
  link,
  technologies,
}: ProjectCardProps) => {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noreferrer noopener"
      className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] hover:border-[#7042f8] transition-colors duration-300 group"
    >
      <Image
        src={src}
        alt={title}
        width={1000}
        height={1000}
        className="w-full object-contain group-hover:scale-105 transition-transform duration-300"
      />

      <div className="relative p-4">
        <h1 className="text-2xl font-semibold text-white mb-2">{title}</h1>
        <p className="mt-2 text-gray-300 mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-[#2A0E61] text-purple-300 text-xs rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};