import { useState } from "react";

import { categories } from "../../data/projects";
import { useProjects } from "../../hooks/useProjects";
import { SectionTitle } from "../common/SectionTitle";
import { ProjectCard } from "../ui/ProjectCard";

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data: projects, isLoading } = useProjects(selectedCategory);

  return (
    <section id="projects" className="py-20 px-4 bg-base-200">
      <div className="container mx-auto max-w-7xl">
        <SectionTitle
          title="Proyectos"
          subtitle="Explora algunos de los proyectos en los que he trabajado"
        />

        {/* Filters */}
        <div className="flex justify-center mb-12">
          <div className="join">
            {categories.map((category) => (
              <input
                key={category.value}
                type="radio"
                name="category"
                className="join-item btn"
                aria-label={category.label}
                checked={selectedCategory === category.value}
                onChange={() => setSelectedCategory(category.value)}
              />
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card bg-base-100 shadow-xl skeleton h-[400px] w-full"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {!isLoading && (!projects || projects.length === 0) && (
          <div className="text-center py-12">
            <p className="text-xl opacity-70">No hay proyectos en esta categoría</p>
          </div>
        )}
      </div>
    </section>
  );
}
