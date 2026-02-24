import { Card } from "../../components/ui/card";

const points = [
  "Built with Next.js App Router and Tailwind CSS for a maintainable frontend stack.",
  "Integrates with backend inference using `POST /predict` for real-time predictions.",
  "Designed for lending and risk teams focused on clear decision support.",
  "Structured as reusable components for dashboard-scale growth.",
];

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">About</p>
        <h1 className="mt-2 text-3xl font-semibold text-[var(--foreground)]">LoanGuard AI Platform</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted-foreground)]">
          LoanGuard AI is a professional web application for machine learning-based loan default
          risk prediction. It provides a simple workflow for data input, model inference, and
          readable risk analytics.
        </p>
      </Card>

      <section className="grid gap-4 md:grid-cols-2">
        {points.map((point) => (
          <Card key={point} className="p-5 transition-shadow hover:shadow-md">
            <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">{point}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
