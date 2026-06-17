"use client";

import {
  useEffect,
  useState,
} from "react";

import { RecommendationService } from "@/services/recommendation.service";

import {
  Questionnaire,
  RecommendationResult,
} from "../types/recommendation.types";

const TOTAL_STEPS = 5;

export function useRecommendation() {
  const [errorMessage, setErrorMessage] =
    useState("");

  const [step, setStep] =
    useState(1);

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

  function canProceed() {
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
        return (
          form.companyRevenue !==
          undefined
        );

      default:
        return false;
    }
  }

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

  return {
    errorMessage,
    step,
    setStep,
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
  };
}