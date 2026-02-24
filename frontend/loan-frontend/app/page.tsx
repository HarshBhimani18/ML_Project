import Link from "next/link";
import { Card } from "../components/ui/card";

const highlights = [
  {
    title: "Fast Model Inference",
    body: "Get borrower default probability in real time using a trained ML model.",
  },
  {
    title: "Clear Risk Insights",
    body: "Understand low, medium, and high risk levels with interpretable outputs.",
  },
  {
    title: "Production-Friendly UI",
    body: "Designed for practical use by lending teams with clean, readable layouts.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <Card className="px-6 py-14 text-center sm:px-10 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
            AI Loan Default Prediction
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--muted-foreground)] sm:text-lg">
            Predict borrower default probability using machine learning.
          </p>
          <div className="mt-8">
            <Link
              href="/predict"
              className="inline-flex items-center justify-center rounded-lg bg-[var(--primary)] px-6 py-2.5 text-sm font-semibold text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)]"
            >
              Start Prediction
            </Link>
          </div>
        </div>
      </Card>

      <section className="grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <Card key={item.title} className="p-5 transition-shadow hover:shadow-md">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">{item.body}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
