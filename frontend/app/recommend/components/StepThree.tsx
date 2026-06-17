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
    field: "deductions",
    value: string,
  ) => void;
}

export default function StepThree({
  form,
  toggleArrayValue,
}: Props) {
  return (
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

        {wizardConfig.deductions.map(
          (item) => (
            <SelectCard
              key={item.value}
              title={item.label}
              selected={form.deductions.includes(
                item.value,
              )}
              onClick={() =>
                toggleArrayValue(
                  "deductions",
                  item.value,
                )
              }
            />
          ),
        )}

      </div>
    </>
  );
}