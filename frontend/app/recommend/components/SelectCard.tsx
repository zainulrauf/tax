"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { CheckCircle2 } from "lucide-react";

import { SelectCardProps } from "../../../types/recommendation";

export default function SelectCard({
  title,
  selected,
  onClick,
}: SelectCardProps) {
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