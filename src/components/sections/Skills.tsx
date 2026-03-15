import { useState } from "react";

import { skills, skillCategories } from "../../data/skills";
import { SectionTitle } from "../common/SectionTitle";
import { SkillBadge } from "../ui/SkillBadge";

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredSkills =
    selectedCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === selectedCategory);

  return (
    <section id="skills" className="py-20 px-4 bg-base-100">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle title="Habilidades" subtitle="Tecnologías y herramientas que domino" />

        {/* Category Tabs */}
        <div className="tabs tabs-boxed justify-center mb-12 flex-wrap gap-2">
          {skillCategories.map((category) => (
            <button
              key={category.value}
              className={`tab ${selectedCategory === category.value ? "tab-active" : ""}`}
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="flex flex-wrap gap-3 justify-center">
          {filteredSkills.map((skill) => (
            <SkillBadge key={skill.name} skill={skill} />
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl opacity-70">No hay habilidades en esta categoría</p>
          </div>
        )}
      </div>
    </section>
  );
}
