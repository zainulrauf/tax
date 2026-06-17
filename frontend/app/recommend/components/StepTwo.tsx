"use client";

import {
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import SelectCard from "./SelectCard";
import { wizardConfig } from "../wizardConfig";

interface Props {
  form: any;
  toggleArrayValue: (
    field: "incomeSources",
    value: string,
  ) => void;
}

export default function StepTwo({
  form,
  toggleArrayValue,
}: Props) {
  return (
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

        {wizardConfig.incomeSources.map(
          (item) => (
            <SelectCard
              key={item.value}
              title={item.label}
              selected={form.incomeSources.includes(
                item.value,
              )}
              onClick={() =>
                toggleArrayValue(
                  "incomeSources",
                  item.value,
                )
              }
            />
          ),
        )}

      </div>

      {form.incomeSources.length ===
        0 && (
        <p className="mt-4 text-sm text-red-500">
          Select at least one income
          source.
        </p>
      )}
    </>
  );
}