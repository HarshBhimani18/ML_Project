import { Card } from "../../components/ui/card";

const highlights = [
  {
    title: "Project Goal",
    body: "Help lending teams estimate borrower default risk quickly with a practical machine learning workflow.",
  },
  {
    title: "Prediction Pipeline",
    body: "Users submit borrower features, the backend preprocesses inputs, and a trained model returns default probability.",
  },
  {
    title: "Risk Communication",
    body: "Predictions are shown with clear risk tiers so decisions can be made faster and with better context.",
  },
  {
    title: "Built for Extension",
    body: "Frontend uses reusable UI components and modular routes to support future dashboards and analytics.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <p className="small-label font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">About</p>
        <h1 className="page-title mt-2 font-semibold text-[var(--foreground)]">LoanGuard AI Platform</h1>
        <p className="body-text mt-3 max-w-3xl leading-relaxed text-[var(--muted-foreground)]">
          LoanGuard AI is a machine learning web application focused on loan default prediction.
          The project combines a clean frontend, a backend prediction API, and a trained model to
          deliver fast and readable risk outputs.
        </p>
      </Card>

      <section className="grid gap-4 md:grid-cols-2">
        {highlights.map((item) => (
          <Card key={item.title} className="p-5 transition-shadow hover:shadow-md">
            <h2 className="card-title font-semibold text-[var(--foreground)]">{item.title}</h2>
            <p className="body-text mt-2 leading-relaxed text-[var(--muted-foreground)]">{item.body}</p>
          </Card>
        ))}
      </section>

      <Card className="p-6">
        <h2 className="section-heading font-semibold text-[var(--foreground)]">Technology Stack</h2>
        <p className="body-text mt-3 max-w-3xl leading-relaxed text-[var(--muted-foreground)]">
          Frontend: Next.js + Tailwind CSS. Backend: FastAPI prediction endpoint. Model artifacts:
          persisted preprocessing objects and trained classifier for inference.
        </p>
      </Card>
    </div>
  );
}
