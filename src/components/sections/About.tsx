import { personalInfo } from "../../data/personal";
import { SectionTitle } from "../common/SectionTitle";

export function About() {
  return (
    <section id="about" className="py-20 px-4 bg-base-100">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle
          title="Sobre Mí"
          subtitle="Conoce más sobre mi experiencia y pasión por el desarrollo"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content w-64 rounded-full">
                <span className="text-8xl">{personalInfo.name.charAt(0)}</span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold">{personalInfo.title}</h3>
            <p className="text-lg leading-relaxed">{personalInfo.bio}</p>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{personalInfo.location}</span>
              </p>
              <p className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a href={`mailto:${personalInfo.email}`} className="link link-hover">
                  {personalInfo.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
