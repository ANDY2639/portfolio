interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold mb-4">{title}</h2>
      {subtitle && <p className="text-lg opacity-70 max-w-2xl mx-auto">{subtitle}</p>}
      <div className="divider w-24 mx-auto"></div>
    </div>
  );
}
