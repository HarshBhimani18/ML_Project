import { Card } from "../ui/card";
import { getRiskLevel, riskBadgeClasses, riskBarClasses, riskExplanation } from "./risk-utils";
import Link from "next/link";

type Props = {
  probability: number;
  prediction: number;
};

export function RiskDashboard({ probability, prediction }: Props) {
  const level = getRiskLevel(probability);
  const percentage = Math.min(100, Math.max(0, probability * 100));

  return (
    <Card className="mx-auto max-w-3xl p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-[var(--foreground)]">Prediction Result</h1>
        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${riskBadgeClasses(level)}`}>
          {level} Risk
        </span>
      </div>

      <div className="mt-6 space-y-6">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--muted)] p-4">
          <p className="text-sm text-[var(--muted-foreground)]">Default Probability</p>
          <p className="mt-1 text-3xl font-semibold text-[var(--foreground)]">{percentage.toFixed(2)}%</p>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-[var(--accent)]">
            <div
              className={`h-full rounded-full transition-[width] duration-300 ${riskBarClasses(level)}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-[var(--border)] p-4">
            <p className="text-sm text-[var(--muted-foreground)]">Predicted Class</p>
            <p className="mt-1 text-lg font-semibold text-[var(--foreground)]">
              {prediction === 1 ? "Likely Default" : "Likely Non-Default"}
            </p>
          </div>
          <div className="rounded-lg border border-[var(--border)] p-4">
            <p className="text-sm text-[var(--muted-foreground)]">Risk Level</p>
            <p className="mt-1 text-lg font-semibold text-[var(--foreground)]">{level}</p>
          </div>
        </div>

        <div className="rounded-lg border border-[var(--border)] p-4">
          <p className="text-sm font-semibold text-[var(--foreground)]">Explanation</p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
            {riskExplanation(level)}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/predict"
            className="inline-flex items-center justify-center rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)]"
          >
            Run Another Prediction
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--secondary)] px-4 py-2.5 text-sm font-semibold text-[var(--secondary-foreground)] transition-colors hover:opacity-90"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </Card>
  );
}
