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

export default function StepOne({
  form,
  setForm,
}: Props) {
  return (
    <>
      <CardHeader className="px-0">

        <CardTitle className="text-3xl">
          What are you filing for?
        </CardTitle>

        <CardDescription>
          Select the option that best
          describes your tax situation.
        </CardDescription>

      </CardHeader>

      <div className="mt-8 grid gap-4">

        {wizardConfig.filingTypes.map(
          (opt) => (
            <SelectCard
              key={opt.value}
              title={opt.label}
              selected={
                form.filingType ===
                opt.value
              }
              onClick={() =>
                setForm({
                  ...form,
                  filingType:
                    opt.value,
                })
              }
            />
          ),
        )}

      </div>
    </>
  );
}