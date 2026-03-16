import { useSiteStats } from "@/hooks/useSiteStats";

export function Stats() {
  const { data: stats, isLoading } = useSiteStats();

  if (isLoading || !stats) return null;

  return (
    <section className="py-10 bg-primary text-primary-content">
      <div className="container mx-auto px-4">
        <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-transparent border border-primary-content/20">
          <div className="stat">
            <div className="stat-title text-primary-content/70">Visitas Totales</div>
            <div className="stat-value">{stats.total_visits}</div>
            <div className="stat-desc text-primary-content/70">Desde el inicio</div>
          </div>

          <div className="stat">
            <div className="stat-title text-primary-content/70">Visitantes Únicos</div>
            <div className="stat-value">{stats.unique_visitors}</div>
            <div className="stat-desc text-primary-content/70">Global</div>
          </div>

          <div className="stat">
            <div className="stat-title text-primary-content/70">Visitas Hoy</div>
            <div className="stat-value text-secondary">{stats.today_visits}</div>
            <div className="stat-desc text-primary-content/70">Últimas 24 horas</div>
          </div>

          <div className="stat">
            <div className="stat-title text-primary-content/70">Esta Semana</div>
            <div className="stat-value">{stats.this_week_visits}</div>
            <div className="stat-desc text-primary-content/70">Últimos 7 días</div>
          </div>
        </div>
      </div>
    </section>
  );
}
