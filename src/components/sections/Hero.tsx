import { usePersonalInfo } from "@/hooks/usePersonalInfo";

export function Hero() {
  const { data: personalInfo } = usePersonalInfo();

  if (!personalInfo) return null;

  return (
    <section id="home" className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Hola, soy {personalInfo.name}</h1>
          <p className="text-2xl md:text-3xl mb-6 text-primary font-semibold">
            {personalInfo.title}
          </p>
          <p className="text-lg md:text-xl mb-8 opacity-80">{personalInfo.bio}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#projects" className="btn btn-primary btn-lg">
              Ver Proyectos
            </a>
            <a href="#contact" className="btn btn-outline btn-lg">
              Contáctame
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
