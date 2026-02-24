import { PredictForm } from "../../components/predict/predict-form";

export default function PredictPage() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--muted-foreground)]">
        Submit borrower profile details to evaluate machine learning default risk.
      </p>
      <PredictForm />
    </div>
  );
}
