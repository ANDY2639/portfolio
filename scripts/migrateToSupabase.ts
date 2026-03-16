import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { projects } from "../src/data/projects";
import { skills } from "../src/data/skills";
import { personalInfo } from "../src/data/personal";

// Cargar variables de entorno desde .env.local
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error(
    "❌ Error: VITE_SUPABASE_URL y SUPABASE_SERVICE_KEY deben estar definidos en .env.local",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrate() {
  console.log("🚀 Iniciando migración a Supabase...");

  // 1. Migrar Personal Info
  console.log("📝 Migrando información personal...");
  const { error: personalError } = await supabase.from("personal_info").upsert({
    name: personalInfo.name,
    title: personalInfo.title,
    bio: personalInfo.bio,
    location: personalInfo.location,
    email: personalInfo.email,
    github_url: personalInfo.social.github,
    linkedin_url: personalInfo.social.linkedin,
    twitter_url: personalInfo.social.twitter,
  });

  if (personalError)
    console.error("❌ Error migrando personal_info:", personalError.message);
  else console.log("✅ Información personal migrada.");

  // 2. Migrar Proyectos
  console.log("📝 Migrando proyectos...");
  const projectsToInsert = projects.map((p, index) => ({
    title: p.title,
    description: p.description,
    image_url: p.image,
    technologies: p.technologies,
    category: p.category,
    github_url: p.links.github,
    live_url: p.links.live,
    demo_url: p.links.demo,
    display_order: index,
    is_featured: index < 3,
    is_published: true,
  }));

  const { error: projectsError } = await supabase
    .from("projects")
    .upsert(projectsToInsert);

  if (projectsError)
    console.error("❌ Error migrando proyectos:", projectsError.message);
  else console.log(`✅ ${projectsToInsert.length} proyectos migrados.`);

  // 3. Migrar Habilidades
  console.log("📝 Migrando habilidades...");
  const skillsToInsert = skills.map((s, index) => ({
    name: s.name,
    category: s.category,
    level: s.level,
    display_order: index,
  }));

  const { error: skillsError } = await supabase
    .from("skills")
    .upsert(skillsToInsert, { onConflict: "name" });

  if (skillsError)
    console.error("❌ Error migrando habilidades:", skillsError.message);
  else console.log(`✅ ${skillsToInsert.length} habilidades migradas.`);

  console.log("\n✨ Migración finalizada con éxito.");
}

migrate();
