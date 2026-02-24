import { RiskDashboard } from "../../components/results/risk-dashboard";

type ResultPageProps = {
  searchParams: Promise<{
    probability?: string;
    prediction?: string;
  }>;
};

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const params = await searchParams;
  const probability = Number(params.probability ?? 0);
  const prediction = Number(params.prediction ?? 0);

  return <RiskDashboard probability={Number.isFinite(probability) ? probability : 0} prediction={prediction} />;
}

