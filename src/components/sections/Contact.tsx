import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePersonalInfo } from "../../hooks/usePersonalInfo";
import { useContactMutation } from "../../hooks/useContactMutation";
import { SectionTitle } from "../common/SectionTitle";
import type { ContactMessage } from "../../types";

const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  subject: z.string().optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export function Contact() {
  const { data: personalInfo } = usePersonalInfo();
  const contactMutation = useContactMutation();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactMessage>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactMessage) => {
    contactMutation.mutate(data, {
      onSuccess: () => {
        alert("¡Mensaje enviado con éxito!");
        reset();
      },
      onError: (error) => {
        alert("Error al enviar el mensaje. Por favor intenta de nuevo.");
        console.error(error);
      },
    });
  };

  if (!personalInfo) return null;

  return (
    <section id="contact" className="py-20 px-4 bg-base-200">
      <div className="container mx-auto max-w-4xl">
        <SectionTitle title="Contacto" subtitle="¿Tienes un proyecto en mente? ¡Hablemos!" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title mb-4">Envíame un mensaje</h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="form-control">
                  <label className="label" htmlFor="name">
                    <span className="label-text">Nombre</span>
                  </label>
                  <input
                    id="name"
                    {...register("name")}
                    type="text"
                    placeholder="Tu nombre"
                    className={`input input-bordered ${errors.name ? "input-error" : ""}`}
                  />
                  {errors.name && <span className="text-error text-sm mt-1">{errors.name.message}</span>}
                </div>

                <div className="form-control">
                  <label className="label" htmlFor="email">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    id="email"
                    {...register("email")}
                    type="email"
                    placeholder="tu@email.com"
                    className={`input input-bordered ${errors.email ? "input-error" : ""}`}
                  />
                  {errors.email && <span className="text-error text-sm mt-1">{errors.email.message}</span>}
                </div>

                <div className="form-control">
                  <label className="label" htmlFor="message">
                    <span className="label-text">Mensaje</span>
                  </label>
                  <textarea
                    id="message"
                    {...register("message")}
                    className={`textarea textarea-bordered h-32 ${errors.message ? "textarea-error" : ""}`}
                    placeholder="Tu mensaje aquí..."
                  ></textarea>
                  {errors.message && <span className="text-error text-sm mt-1">{errors.message.message}</span>}
                </div>

                <button 
                  type="submit" 
                  className={`btn btn-primary w-full ${contactMutation.isPending ? "loading" : ""}`}
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending ? "Enviando..." : "Enviar Mensaje"}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title mb-4">Información de Contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary mt-1"
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
                    <div>
                      <p className="font-semibold">Email</p>
                      <a href={`mailto:${personalInfo.email}`} className="link link-hover">
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary mt-1"
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
                    <div>
                      <p className="font-semibold">Ubicación</p>
                      <p>{personalInfo.location}</p>
                    </div>
                  </div>

                  <div className="divider"></div>

                  <div>
                    <p className="font-semibold mb-3">Redes Sociales</p>
                    <div className="flex gap-3">
                      {personalInfo.social.github && (
                        <a
                          href={personalInfo.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-circle btn-outline"
                          aria-label="GitHub"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            className="fill-current"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                      )}
                      {personalInfo.social.linkedin && (
                        <a
                          href={personalInfo.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-circle btn-outline"
                          aria-label="LinkedIn"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            className="fill-current"
                          >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                      )}
                      {personalInfo.social.twitter && (
                        <a
                          href={personalInfo.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-circle btn-outline"
                          aria-label="Twitter"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            className="fill-current"
                          >
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
