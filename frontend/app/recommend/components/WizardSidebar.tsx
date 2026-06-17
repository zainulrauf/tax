"use client";

import { Progress } from "@/components/ui/progress";
import { SidebarProps } from "../../../types/recommendation";

export default function WizardSidebar({
  step,
  progress,
}: SidebarProps) {
  const steps = [
    "Filing Type",
    "Income Sources",
    "Deductions",
    "Help Preference",
    "Company Revenue",
  ];

  return (
    <div className="sticky top-6 rounded-3xl border bg-white p-6 shadow-sm">

      <h3 className="mb-6 text-lg font-bold">
        Progress
      </h3>

      <div className="space-y-5">

        {steps.map(
          (label, index) => {
            const current =
              index + 1;

            return (
              <div
                key={label}
                className="flex items-center gap-4"
              >
                <div
                  className={`
                    flex h-10 w-10 items-center justify-center
                    rounded-full text-sm font-bold transition

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
          }
        )}

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
  );
}