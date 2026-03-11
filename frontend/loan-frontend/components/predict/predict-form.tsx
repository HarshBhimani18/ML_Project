"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

type FormState = {
  Age: string;
  Income: string;
  LoanAmount: string;
  CreditScore: string;
  InterestRate: string;
  LoanTerm: string;
  DTIRatio: string;
  EmploymentType: string;
  Education: string;
  MaritalStatus: string;
  HasMortgage: "Yes" | "No" | "";
  HasDependents: "Yes" | "No" | "";
  LoanPurpose: string;
  HasCoSigner: "Yes" | "No" | "";
};

type PredictionResponse = {
  prediction?: number;
  probability?: number;
  error?: string;
};

const initialForm: FormState = {
  Age: "",
  Income: "",
  LoanAmount: "",
  CreditScore: "",
  InterestRate: "",
  LoanTerm: "",
  DTIRatio: "",
  EmploymentType: "",
  Education: "",
  MaritalStatus: "",
  HasMortgage: "",
  HasDependents: "",
  LoanPurpose: "",
  HasCoSigner: "",
};

const selectOptions = {
  EmploymentType: ["Full-time", "Part-time", "Self-employed", "Unemployed"],
  Education: ["High School", "Bachelor's", "Master's", "PhD"],
  MaritalStatus: ["Single", "Married", "Divorced"],
  LoanPurpose: ["Auto", "Business", "Education", "Home", "Other"],
} as const;

const numericFields: Array<keyof FormState> = [
  "Age",
  "Income",
  "LoanAmount",
  "CreditScore",
  "InterestRate",
  "LoanTerm",
  "DTIRatio",
];

const financialFields: Array<keyof FormState> = [
  "Age",
  "Income",
  "LoanAmount",
  "CreditScore",
  "InterestRate",
  "LoanTerm",
  "DTIRatio",
];

const personalFields: Array<keyof FormState> = [
  "EmploymentType",
  "Education",
  "MaritalStatus",
  "LoanPurpose",
  "HasMortgage",
  "HasDependents",
  "HasCoSigner",
];

const labels: Record<keyof FormState, string> = {
  Age: "Age",
  Income: "Income",
  LoanAmount: "Loan Amount",
  CreditScore: "Credit Score",
  InterestRate: "Interest Rate",
  LoanTerm: "Loan Term",
  DTIRatio: "Debt-to-Income Ratio",
  EmploymentType: "Employment Type",
  Education: "Education",
  MaritalStatus: "Marital Status",
  HasMortgage: "Has Mortgage",
  HasDependents: "Dependents",
  LoanPurpose: "Loan Purpose",
  HasCoSigner: "Co-signer",
};

const placeholders: Partial<Record<keyof FormState, string>> = {
  Age: "Enter age (18-100)",
  Income: "Enter income (> 0)",
  LoanAmount: "Enter loan amount (> 0)",
  CreditScore: "Enter credit score (300-900)",
  InterestRate: "Enter interest rate (> 0)",
  LoanTerm: "Enter loan term in months (> 0)",
  DTIRatio: "Enter debt-to-income ratio (0-2)",
};

function TextField({
  id,
  label,
  value,
  placeholder,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label htmlFor={id} className="space-y-1.5">
      <span className="app-label">{label}</span>
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="app-input"
        placeholder={placeholder}
        inputMode="decimal"
        required
      />
    </label>
  );
}

function ErrorPopup({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div
        role="alertdialog"
        aria-modal="true"
        className="w-full max-w-md rounded-xl border border-[var(--border)] bg-[var(--background)] p-5 shadow-xl"
      >
        <h2 className="page-title text-lg font-semibold text-[var(--foreground)]">Error</h2>
        <p className="body-text mt-2 text-[var(--foreground)]">{message}</p>
        <div className="mt-4 flex justify-end">
          <Button type="button" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  options,
  placeholder,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: readonly string[];
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label htmlFor={id} className="space-y-1.5">
      <span className="app-label">{label}</span>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)} className="app-input" required>
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function PredictForm() {
  const router = useRouter();
  const [form, setForm] = React.useState<FormState>(initialForm);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [step, setStep] = React.useState<1 | 2>(1);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(values: FormState) {
    if (Number(values.Age) < 18 || Number(values.Age) > 100) return "Age must be between 18 and 100.";
    if (Number(values.CreditScore) < 300 || Number(values.CreditScore) > 900) {
      return "Credit Score must be between 300 and 900.";
    }
    if (Number(values.DTIRatio) < 0 || Number(values.DTIRatio) > 2) {
      return "Debt-to-Income Ratio must be between 0 and 2.";
    }
    for (const field of numericFields) {
      if (!String(values[field]).trim()) return `Please enter a value for ${labels[field]}.`;
      const value = Number(values[field]);
      if (!Number.isFinite(value)) return `Please enter a valid number for ${labels[field]}.`;
    }
    return null;
  }

  function validateFinancialStep(values: FormState) {
    if (Number(values.Age) < 18 || Number(values.Age) > 100) return "Age must be between 18 and 100.";
    if (Number(values.CreditScore) < 300 || Number(values.CreditScore) > 900) {
      return "Credit Score must be between 300 and 900.";
    }
    if (Number(values.DTIRatio) < 0 || Number(values.DTIRatio) > 2) {
      return "Debt-to-Income Ratio must be between 0 and 2.";
    }
    for (const field of financialFields) {
      if (!String(values[field]).trim()) return `Please enter a value for ${labels[field]}.`;
      const value = Number(values[field]);
      if (!Number.isFinite(value)) return `Please enter a valid number for ${labels[field]}.`;
    }
    return null;
  }

  function validatePersonalStep(values: FormState) {
    for (const field of personalFields) {
      if (!String(values[field]).trim()) {
        return `Please select a value for ${labels[field]}.`;
      }
    }
    return null;
  }

  function handleNext() {
    setError(null);
    const validationError = validateFinancialStep(form);
    if (validationError) {
      setError(validationError);
      return;
    }
    setStep(2);
  }

  function handleBack() {
    setError(null);
    setStep(1);
  }

  function isPersonalStepComplete(values: FormState) {
    return personalFields.every((field) => String(values[field]).trim().length > 0);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (step === 1) {
      handleNext();
      return;
    }

    setError(null);

    const validationError = validate(form);
    if (validationError) {
      setError(validationError);
      return;
    }
    const personalStepError = validatePersonalStep(form);
    if (personalStepError) {
      setError(personalStepError);
      return;
    }

    setIsLoading(true);
    const formData: Record<string, number | string> = { ...form };
    for (const key of numericFields) formData[key] = Number(form[key]);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: formData }),
      });

      const raw = await response.text();
      let data: PredictionResponse = {};
      try {
        data = raw ? (JSON.parse(raw) as PredictionResponse) : {};
      } catch {
        throw new Error(
          `Backend returned non-JSON response from ${API_URL}/predict. Set NEXT_PUBLIC_API_URL correctly (example: http://127.0.0.1:8000).`
        );
      }

      if (!response.ok || data.error || typeof data.probability !== "number") {
        throw new Error(data.error || "Prediction request failed.");
      }

      const prediction = typeof data.prediction === "number" ? data.prediction : 0;
      router.push(`/result?probability=${data.probability}&prediction=${prediction}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error while predicting.");
    } finally {
      setIsLoading(false);
    }
  }

  const canSubmitPersonal = isPersonalStepComplete(form);

  return (
    <Card className="p-6 sm:p-8">
      <div className="mb-6">
        <h1 className="page-title font-semibold text-[var(--foreground)]">
          {step === 1 ? "Financial Information" : "Personal Information"}
        </h1>
        <p className="small-label mt-3 uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
          Page {step} of 2
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <section className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <TextField
                id="age"
                label={labels.Age}
                value={form.Age}
                placeholder={placeholders.Age}
                onChange={(v) => update("Age", v)}
              />
              <TextField
                id="income"
                label={labels.Income}
                value={form.Income}
                placeholder={placeholders.Income}
                onChange={(v) => update("Income", v)}
              />
              <TextField
                id="loanAmount"
                label={labels.LoanAmount}
                value={form.LoanAmount}
                placeholder={placeholders.LoanAmount}
                onChange={(v) => update("LoanAmount", v)}
              />
              <TextField
                id="creditScore"
                label={labels.CreditScore}
                value={form.CreditScore}
                placeholder={placeholders.CreditScore}
                onChange={(v) => update("CreditScore", v)}
              />
              <TextField
                id="interestRate"
                label={labels.InterestRate}
                value={form.InterestRate}
                placeholder={placeholders.InterestRate}
                onChange={(v) => update("InterestRate", v)}
              />
              <TextField
                id="loanTerm"
                label={labels.LoanTerm}
                value={form.LoanTerm}
                placeholder={placeholders.LoanTerm}
                onChange={(v) => update("LoanTerm", v)}
              />
              <TextField
                id="dtiRatio"
                label={labels.DTIRatio}
                value={form.DTIRatio}
                placeholder={placeholders.DTIRatio}
                onChange={(v) => update("DTIRatio", v)}
              />
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <SelectField
                id="employmentType"
                label={labels.EmploymentType}
                value={form.EmploymentType}
                options={selectOptions.EmploymentType}
                placeholder="Select employment type"
                onChange={(v) => update("EmploymentType", v)}
              />
              <SelectField
                id="education"
                label={labels.Education}
                value={form.Education}
                options={selectOptions.Education}
                placeholder="Select education"
                onChange={(v) => update("Education", v)}
              />
              <SelectField
                id="maritalStatus"
                label={labels.MaritalStatus}
                value={form.MaritalStatus}
                options={selectOptions.MaritalStatus}
                placeholder="Select marital status"
                onChange={(v) => update("MaritalStatus", v)}
              />
              <SelectField
                id="loanPurpose"
                label={labels.LoanPurpose}
                value={form.LoanPurpose}
                options={selectOptions.LoanPurpose}
                placeholder="Select loan purpose"
                onChange={(v) => update("LoanPurpose", v)}
              />
              <SelectField
                id="hasMortgage"
                label={labels.HasMortgage}
                value={form.HasMortgage}
                options={["Yes", "No"]}
                placeholder="Select mortgage status"
                onChange={(v) => update("HasMortgage", v as "Yes" | "No")}
              />
              <SelectField
                id="hasDependents"
                label={labels.HasDependents}
                value={form.HasDependents}
                options={["Yes", "No"]}
                placeholder="Select dependents status"
                onChange={(v) => update("HasDependents", v as "Yes" | "No")}
              />
              <SelectField
                id="hasCoSigner"
                label={labels.HasCoSigner}
                value={form.HasCoSigner}
                options={["Yes", "No"]}
                placeholder="Select co-signer status"
                onChange={(v) => update("HasCoSigner", v as "Yes" | "No")}
              />
            </div>
          </section>
        )}

        <div className="flex flex-wrap items-center gap-3">
          {step === 2 && (
            <Button type="button" variant="secondary" onClick={handleBack} disabled={isLoading}>
              Back
            </Button>
          )}
          {step === 1 ? (
            <Button type="button" onClick={handleNext} disabled={isLoading}>
              Next
            </Button>
          ) : (
            <Button type="submit" disabled={isLoading || !canSubmitPersonal}>
              {isLoading ? "Predicting..." : "Predict Default Risk"}
            </Button>
          )}
        </div>
      </form>
      {error && <ErrorPopup message={error} onClose={() => setError(null)} />}
    </Card>
  );
}
