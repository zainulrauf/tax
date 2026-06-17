"use client";

import { useEffect, useState } from "react";
import { wizardConfig } from "./wizardConfig";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import {
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import { RecommendationService } from "@/services/recommendation.service";

interface Questionnaire {
  filingType: string;
  incomeSources: string[];
  deductions: string[];
  helpPreference: string;
  companyRevenue?: string;
}

interface RecommendationResult {
  recommendedProductId: string;
  recommendedProductName: string;
  price: number;
  confidence: string;
  reasons: string[];
  matchedInputs: string[];
  warnings?: string[];
  disclaimer: string;
}

const TOTAL_STEPS = 5;

function SelectCard({
  title,
  selected,
  onClick,
}: {
  title: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <Card
      onClick={onClick}
      className={`
        cursor-pointer
        border-2
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl

        ${
          selected
            ? "border-indigo-500 bg-indigo-50 text-indigo-700 shadow-lg"
            : "border-slate-200 bg-white hover:border-indigo-300"
        }
      `}
    >
      <CardContent className="flex items-center justify-between p-5">
        <span className="font-medium">
          {title}
        </span>

        {selected && (
          <CheckCircle2 className="h-5 w-5 text-indigo-600" />
        )}
      </CardContent>
    </Card>
  );
}

function ResultView({
  result,
  restart,
}: {
  result: RecommendationResult;
  restart: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center p-6">

      <div className="max-w-4xl w-full rounded-3xl bg-white p-10 shadow-2xl">

        <div className="text-center">

          <div className="inline-flex rounded-full bg-indigo-100 p-4">
            <Sparkles className="h-10 w-10 text-indigo-600" />
          </div>

          <h1 className="mt-6 text-4xl font-bold">
            Recommendation Ready
          </h1>

          <h2 className="mt-4 text-3xl font-bold text-indigo-600">
            {result.recommendedProductName}
          </h2>

          <div className="mt-4 text-5xl font-bold">
            CAD ${result.price}
          </div>

          <div className="mt-4 inline-flex rounded-full bg-green-100 px-5 py-2 text-green-700">
            Confidence: {result.confidence}
          </div>

        </div>

        <div className="mt-10">

          <h3 className="text-xl font-bold mb-4">
            Why this recommendation?
          </h3>

          <div className="flex flex-wrap gap-3">
            {result.reasons.map((reason) => (
              <span
                key={reason}
                className="rounded-full bg-indigo-100 px-4 py-2 text-indigo-700"
              >
                ✓ {reason}
              </span>
            ))}
          </div>

        </div>

        {result.warnings?.length ? (
          <div className="mt-8">

            <h3 className="font-bold text-red-600 mb-3">
              Warnings
            </h3>

            <div className="space-y-3">
              {result.warnings.map((warning, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
                >
                  {warning}
                </div>
              ))}
            </div>

          </div>
        ) : null}

        <div className="mt-8 rounded-xl bg-slate-100 p-4 text-sm text-slate-600">
          {result.disclaimer}
        </div>

        <Button
          onClick={restart}
          className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700"
        >
          Start Over
        </Button>

      </div>

    </div>
  );
}

export default function RecommendationPage() {
  const [errorMessage, setErrorMessage] =
    useState("");

  const [step, setStep] = useState(1);

  const [result, setResult] =
    useState<RecommendationResult | null>(
      null,
    );

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState<Questionnaire>({
      filingType: "",
      incomeSources: [],
      deductions: [],
      helpPreference: "",
    });

  useEffect(() => {
    const stored =
      localStorage.getItem(
        "questionnaire",
      );

    if (stored) {
      setForm(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "questionnaire",
      JSON.stringify(form),
    );
  }, [form]);

  const progress =
    (step / TOTAL_STEPS) * 100;

  function nextStep() {
    setStep((s) => s + 1);
  }

  function prevStep() {
    setStep((s) => s - 1);
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return !!form.filingType;

      case 2:
        return (
          form.incomeSources.length > 0
        );

      case 3:
        return (
          form.deductions.length > 0
        );

      case 4:
        return !!form.helpPreference;

      case 5:
        return !!form.companyRevenue;

      default:
        return false;
    }
  };

  function toggleArrayValue(
    field:
      | "incomeSources"
      | "deductions",
    value: string,
  ) {
    const exists =
      form[field].includes(value);

    setForm({
      ...form,
      [field]: exists
        ? form[field].filter(
            (i) => i !== value,
          )
        : [...form[field], value],
    });
  }

  async function submit() {
    try {
      setLoading(true);
      setErrorMessage("");

      const data =
        await RecommendationService.getRecommendation(
          form,
        );

      setResult(data);

      localStorage.removeItem(
        "questionnaire",
      );
    } catch (error: any) {
      const message =
        error?.response?.data?.error
          ?.message;

      setErrorMessage(
        Array.isArray(message)
          ? message.join("\n")
          : message ||
              "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  }

  function restart() {
    setStep(1);

    setResult(null);

    setForm({
      filingType: "",
      incomeSources: [],
      deductions: [],
      helpPreference: "",
    });

    localStorage.removeItem(
      "questionnaire",
    );
  }

  if (result) {
    return (
      <ResultView
        result={result}
        restart={restart}
      />
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="relative overflow-hidden border-b bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-20 top-10 h-72 w-72 rounded-full bg-white blur-3xl" />
          <div className="absolute right-20 bottom-10 h-72 w-72 rounded-full bg-blue-400 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-4xl">

            <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl">
              Find Your Perfect Tax Solution
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-slate-300">
              Answer a few questions and get a personalized recommendation
              tailored to your filing status, income sources, deductions,
              and tax needs.
            </p>

          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
  
          {/* SIDEBAR */}
  
          <div>
  
            <div className="sticky top-6 rounded-3xl border bg-white p-6 shadow-sm">
  
              <h3 className="mb-6 text-lg font-bold">
                Progress
              </h3>
  
              <div className="space-y-5">
  
                {[
                  "Filing Type",
                  "Income Sources",
                  "Deductions",
                  "Help Preference",
                  "Company Revenue",
                ].map((label, index) => {
                  const current =
                    index + 1;
  
                  return (
                    <div
                      key={label}
                      className="flex items-center gap-4"
                    >
                      <div
                        className={`
                          flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition
  
                          ${
                            step >= current
                              ? "bg-indigo-600 text-white"
                              : "bg-slate-100 text-slate-500"
                          }
                        `}
                      >
                        {current}
                      </div>
  
                      <div>
  
                        <p
                          className={`
                            font-medium
  
                            ${
                              step >= current
                                ? "text-slate-900"
                                : "text-slate-400"
                            }
                          `}
                        >
                          {label}
                        </p>
  
                      </div>
  
                    </div>
                  );
                })}
  
              </div>
  
              <div className="mt-8">
  
                <Progress
                  value={progress}
                  className="h-3"
                />
  
                <p className="mt-3 text-sm text-slate-500">
                  {Math.round(progress)}%
                  Complete
                </p>
  
              </div>
  
            </div>
  
          </div>
  
          {/* CONTENT */}
  
          <div>
  
            {errorMessage && (
  
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4">
  
                <p className="whitespace-pre-line text-sm font-medium text-red-600">
                  {errorMessage}
                </p>
  
              </div>
  
            )}
  
            <Card className="rounded-3xl border-0 bg-white shadow-xl">
  
              <CardContent className="p-8">
  
                {/* STEP CONTENT STARTS HERE */}
                {step === 1 && (
  <>
    <CardHeader className="px-0">

      <CardTitle className="text-3xl">
        What are you filing for?
      </CardTitle>

      <CardDescription>
        Select the option that best describes your tax situation.
      </CardDescription>

    </CardHeader>

    <div className="mt-8 grid gap-4">

      {wizardConfig.filingTypes.map((opt) => (
        <SelectCard
          key={opt.value}
          title={opt.label}
          selected={
            form.filingType === opt.value
          }
          onClick={() =>
            setForm({
              ...form,
              filingType: opt.value,
            })
          }
        />
      ))}

    </div>
  </>
)}
{step === 2 && (
  <>
    <CardHeader className="px-0">

      <CardTitle className="text-3xl">
        Income Sources
      </CardTitle>

      <CardDescription>
        Select all sources of income.
      </CardDescription>

    </CardHeader>

    <div className="mt-8 grid gap-4 md:grid-cols-2">

    {wizardConfig.incomeSources.map((item) => (
      <SelectCard
        key={item.value}
        title={item.label}
        selected={form.incomeSources.includes(
          item.value
        )}
        onClick={() =>
          toggleArrayValue(
            "incomeSources",
            item.value
          )
        }
      />
    ))}

    </div>

    {form.incomeSources.length === 0 && (
      <p className="mt-4 text-sm text-red-500">
        Select at least one income source.
      </p>
    )}
  </>
)}
{step === 3 && (
  <>
    <CardHeader className="px-0">

      <CardTitle className="text-3xl">
        Deductions & Expenses
      </CardTitle>

      <CardDescription>
        Select all applicable deductions.
      </CardDescription>

    </CardHeader>

    <div className="mt-8 grid gap-4 md:grid-cols-2">

    {wizardConfig.deductions.map((item) => (
      <SelectCard
        key={item.value}
        title={item.label}
        selected={form.deductions.includes(
          item.value
        )}
        onClick={() =>
          toggleArrayValue(
            "deductions",
            item.value
          )
        }
      />
    ))}
    </div>
  </>
)}
<div className="mt-10 flex justify-between">

{step > 1 ? (
  <Button
    variant="outline"
    onClick={prevStep}
    className="rounded-xl"
  >
    Back
  </Button>
) : (
  <div />
)}

<Button
  onClick={nextStep}
  disabled={!canProceed()}
  className="rounded-xl bg-indigo-600 hover:bg-indigo-700"
>
  Next
</Button>

</div>
{step === 4 && (
  <>
    <CardHeader className="px-0">
      <CardTitle className="text-3xl">
        Filing Assistance
      </CardTitle>

      <CardDescription>
        Choose how much help you want.
      </CardDescription>
    </CardHeader>

    <div className="mt-8 grid gap-4">

      {wizardConfig.helpOptions.map((opt) => (
        <SelectCard
          key={opt.value}
          title={opt.label}
          selected={
            form.helpPreference === opt.value
          }
          onClick={() =>
            setForm({
              ...form,
              helpPreference: opt.value,
            })
          }
        />
      ))}

    </div>

    <div className="mt-10 flex justify-between">

      <Button
        variant="outline"
        onClick={prevStep}
      >
        Back
      </Button>

      <Button
        disabled={!canProceed()}
        onClick={() => {
          if (
            form.filingType ===
            "corporate"
          ) {
            nextStep();
          } else {
            submit();
          }
        }}
        className="bg-indigo-600 hover:bg-indigo-700"
      >
        Continue
      </Button>

    </div>
  </>
)}
{step === 5 && (
  <>
    <CardHeader className="px-0">

      <CardTitle className="text-3xl">
        Company Revenue
      </CardTitle>

      <CardDescription>
        Tell us whether your company
        generated revenue.
      </CardDescription>

    </CardHeader>

    <div className="mt-8 grid gap-4">

      {wizardConfig.companyRevenueOptions.map((opt) => (
        <SelectCard
          key={opt.value}
          title={opt.label}
          selected={
            form.companyRevenue ===
            opt.value
          }
          onClick={() =>
            setForm({
              ...form,
              companyRevenue:
                opt.value,
            })
          }
        />
      ))}

    </div>

    {!form.companyRevenue && (
      <p className="mt-4 text-sm text-red-500">
        Please select one option.
      </p>
    )}

    <div className="mt-10 flex justify-between">

      <Button
        variant="outline"
        onClick={prevStep}
      >
        Back
      </Button>

      <Button
        disabled={
          loading || !canProceed()
        }
        onClick={submit}
        className="bg-indigo-600 hover:bg-indigo-700"
      >
        {loading
          ? "Generating..."
          : "Get Recommendation"}
      </Button>

    </div>
  </>
)}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
);
}