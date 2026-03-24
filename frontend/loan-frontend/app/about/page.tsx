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

const pillars = [
  {
    title: "Data to Decision",
    body: "Transforms borrower attributes into a standardized feature space and returns model-driven risk scores for consistent credit decisions.",
  },
  {
    title: "Readable Output Layer",
    body: "Turns raw probabilities into low, medium, and high risk bands so teams can communicate outcomes clearly across business and operations.",
  },
  {
    title: "Deployment Ready Structure",
    body: "Modular frontend routes and reusable components make it straightforward to extend with monitoring, explainability, and admin workflows.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <Card className="relative overflow-hidden p-7 sm:p-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[color-mix(in_oklab,var(--primary)_18%,transparent)] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-[color-mix(in_oklab,var(--secondary)_20%,transparent)] blur-3xl" />
        <div className="relative">
          <p className="small-label font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
            About The Project
          </p>
          <h1 className="page-title mt-3 max-w-3xl font-semibold text-[var(--foreground)]">
            LoanGuard AI: Professional Loan Default Risk Intelligence
          </h1>
          <p className="body-text mt-4 max-w-3xl leading-relaxed text-[var(--muted-foreground)]">
            LoanGuard AI is built to support smarter lending decisions through practical machine
            learning. It provides a complete journey from feature input to real-time inference and
            decision-ready risk communication in one clean interface.
          </p>
        </div>
      </Card>

      <section className="grid gap-4 md:grid-cols-2">
        {highlights.map((item) => (
          <Card key={item.title} className="p-6 transition-shadow hover:shadow-md">
            <h2 className="card-title font-semibold text-[var(--foreground)]">{item.title}</h2>
            <p className="body-text mt-3 leading-relaxed text-[var(--muted-foreground)]">{item.body}</p>
          </Card>
        ))}
      </section>

      <Card className="p-6 sm:p-7">
        <h2 className="section-heading font-semibold text-[var(--foreground)]">Platform Architecture</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-xl border border-[var(--border)] bg-[var(--muted)]/60 p-4"
            >
              <h3 className="card-title font-semibold text-[var(--foreground)]">{pillar.title}</h3>
              <p className="body-text mt-2 leading-relaxed text-[var(--muted-foreground)]">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
