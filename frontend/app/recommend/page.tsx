"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import ResultView from "./components/ResultView";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";
import StepFour from "./components/StepFour";
import StepFive from "./components/StepFive";

import { useRecommendation } from "./hooks/useRecommendation";

export default function RecommendationPage() {
  const {
    errorMessage,
    step,
    result,
    loading,
    form,
    setForm,
    progress,
    nextStep,
    prevStep,
    canProceed,
    toggleArrayValue,
    submit,
    restart,
  } = useRecommendation();

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

      {/* Hero Section */}

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

          {/* Sidebar */}

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
                  );
                })}

              </div>

              <div className="mt-8">

                <Progress
                  value={progress}
                  className="h-3"
                />

                <p className="mt-3 text-sm text-slate-500">
                  {Math.round(progress)}% Complete
                </p>

              </div>

            </div>

          </div>

          {/* Content */}

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

                {step === 1 && (
                  <StepOne
                    form={form}
                    setForm={setForm}
                  />
                )}

                {step === 2 && (
                  <StepTwo
                    form={form}
                    toggleArrayValue={
                      toggleArrayValue
                    }
                  />
                )}

                {step === 3 && (
                  <StepThree
                    form={form}
                    toggleArrayValue={
                      toggleArrayValue
                    }
                  />
                )}

                {step === 4 && (
                  <StepFour
                    form={form}
                    setForm={setForm}
                    nextStep={nextStep}
                    submit={submit}
                  />
                )}

                {step === 5 && (
                  <StepFive
                    form={form}
                    setForm={setForm}
                  />
                )}

                {/* Navigation */}

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

                  {step <= 3 && (
                    <Button
                      onClick={nextStep}
                      disabled={!canProceed()}
                      className="rounded-xl bg-indigo-600 hover:bg-indigo-700"
                    >
                      Next
                    </Button>
                  )}

                  {step === 4 && (
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
                      className="rounded-xl bg-indigo-600 hover:bg-indigo-700"
                    >
                      Continue
                    </Button>
                  )}

                  {step === 5 && (
                    <Button
                      disabled={
                        loading ||
                        !canProceed()
                      }
                      onClick={submit}
                      className="rounded-xl bg-indigo-600 hover:bg-indigo-700"
                    >
                      {loading
                        ? "Generating..."
                        : "Get Recommendation"}
                    </Button>
                  )}

                </div>

              </CardContent>

            </Card>

          </div>

        </div>

      </div>

    </div>
  );
}