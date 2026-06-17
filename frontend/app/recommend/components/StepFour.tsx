"use client";

import {
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import SelectCard from "./SelectCard";
import { wizardConfig } from "../wizardConfig";

interface Props {
  form: any;
  setForm: any;
  nextStep: () => void;
  submit: () => void;
}

export default function StepFour({
  form,
  setForm,
  nextStep,
  submit,
}: Props) {
  return (
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

        {wizardConfig.helpOptions.map(
          (opt) => (
            <SelectCard
              key={opt.value}
              title={opt.label}
              selected={
                form.helpPreference ===
                opt.value
              }
              onClick={() =>
                setForm({
                  ...form,
                  helpPreference:
                    opt.value,
                })
              }
            />
          ),
        )}

      </div>

      <div className="mt-10 flex justify-between">

        <Button
          variant="outline"
          onClick={() => window.history.back()}
          className="hidden"
        >
          Back
        </Button>

        <Button
          disabled={!form.helpPreference}
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
          className="hidden"
        >
          Continue
        </Button>

      </div>
    </>
  );
}