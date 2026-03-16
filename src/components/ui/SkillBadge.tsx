import type { Skill } from "@/types";

interface SkillBadgeProps {
  skill: Skill;
}

const levelColors = {
  beginner: "badge-info",
  intermediate: "badge-primary",
  advanced: "badge-secondary",
};

const levelSizes = {
  beginner: "badge-md",
  intermediate: "badge-lg",
  advanced: "badge-lg",
};

export function SkillBadge({ skill }: SkillBadgeProps) {
  const colorClass = skill.level ? levelColors[skill.level] : "badge-neutral";
  const sizeClass = skill.level ? levelSizes[skill.level] : "badge-md";

  return (
    <div className={`badge ${colorClass} ${sizeClass} gap-2`}>
      <span>{skill.name}</span>
      {skill.level && (
        <span className="opacity-70 text-xs">
          {skill.level === "beginner" && "★"}
          {skill.level === "intermediate" && "★★"}
          {skill.level === "advanced" && "★★★"}
        </span>
      )}
    </div>
  );
}
