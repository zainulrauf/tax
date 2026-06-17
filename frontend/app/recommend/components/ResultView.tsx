"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

import {
  RecommendationResult,
} from "../types/recommendation.types";

interface Props {
  result: RecommendationResult;
  restart: () => void;
}

export default function ResultView({
  result,
  restart,
}: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center p-6">

      <div className="w-full max-w-4xl rounded-3xl bg-white p-10 shadow-2xl">

        <div className="text-center">

          <div className="inline-flex rounded-full bg-indigo-100 p-4">
            <Sparkles className="h-10 w-10 text-indigo-600" />
          </div>

          <h1 className="mt-6 text-4xl font-bold text-slate-900">
            Recommendation Ready
          </h1>

          <p className="mt-2 text-slate-500">
            Based on your answers, we found the best match for you.
          </p>

          <h2 className="mt-6 text-4xl font-bold text-indigo-600">
            {result.recommendedProductName}
          </h2>

          <div className="mt-4 text-5xl font-bold text-slate-900">
            CAD ${result.price}
          </div>

          <div className="mt-5 inline-flex rounded-full bg-green-100 px-5 py-2 text-sm font-medium text-green-700">
            Confidence: {result.confidence}
          </div>

        </div>

        {/* Reasons */}

        <div className="mt-10">

          <h3 className="mb-4 text-xl font-bold text-slate-900">
            Why this recommendation?
          </h3>

          <div className="flex flex-wrap gap-3">

            {result.reasons.map(
              (reason, index) => (
                <div
                  key={index}
                  className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700"
                >
                  ✓ {reason}
                </div>
              ),
            )}

          </div>

        </div>

        {/* Matched Inputs */}

        {result.matchedInputs?.length >
          0 && (
          <div className="mt-8">

            <h3 className="mb-4 text-xl font-bold text-slate-900">
              Matched Inputs
            </h3>

            <div className="flex flex-wrap gap-3">

              {result.matchedInputs.map(
                (input, index) => (
                  <div
                    key={index}
                    className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700"
                  >
                    {input}
                  </div>
                ),
              )}

            </div>

          </div>
        )}

        {/* Warnings */}

        {result.warnings &&
          result.warnings.length >
            0 && (
            <div className="mt-8">

              <h3 className="mb-4 text-xl font-bold text-red-600">
                Warnings
              </h3>

              <div className="space-y-3">

                {result.warnings.map(
                  (
                    warning,
                    index,
                  ) => (
                    <div
                      key={index}
                      className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
                    >
                      {warning}
                    </div>
                  ),
                )}

              </div>

            </div>
          )}

        {/* Disclaimer */}

        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4">

          <h4 className="mb-2 font-semibold text-amber-800">
            Disclaimer
          </h4>

          <p className="text-sm text-amber-700">
            {result.disclaimer}
          </p>

        </div>

        {/* Actions */}

        <div className="mt-8">

          <Button
            onClick={restart}
            className="w-full rounded-xl bg-indigo-600 py-6 text-base hover:bg-indigo-700"
          >
            Start Over
          </Button>

        </div>

      </div>

    </div>
  );
}