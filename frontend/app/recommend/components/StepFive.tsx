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
  setForm: any;
}

export default function StepFive({
  form,
  setForm,
}: Props) {
  return (
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

        {wizardConfig.companyRevenueOptions.map(
          (opt) => (
            <SelectCard
              key={String(opt.value)}
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
          ),
        )}

      </div>

      {form.companyRevenue ===
        undefined && (
        <p className="mt-4 text-sm text-red-500">
          Please select one option.
        </p>
      )}
    </>
  );
}