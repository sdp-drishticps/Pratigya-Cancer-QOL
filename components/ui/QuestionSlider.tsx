"use client";

import { Label } from "@/components/ui/label";

interface QuestionSliderProps {
  number: number;
  question: string;
  value: number;
  onChange: (value: number) => void;
}

export default function QuestionSlider({
  number,
  question,
  value,
  onChange,
}: QuestionSliderProps) {
  const getSliderColor = () => {
    // 0–1: Theme Blue
    if (value <= 1) {
      return "#2B3674";
    }

    // 2–33: Green
    if (value <= 33) {
      return "#5A9E1B";
    }

    // 34–66: Orange
    if (value <= 66) {
      return "#C96800";
    }

    // 67–100: Red
    return "#BD2635";
  };

  const sliderColor = getSliderColor();

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="mb-4 flex items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2B3674] text-sm font-semibold text-white">
          {number}
        </span>

        <Label className="text-base font-medium leading-6 text-slate-700">
          {question}
        </Label>
      </div>

      <div className="px-1">
        {/* Slider */}

        <div
          className="relative h-6 w-full cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();

            const percentage = (e.clientX - rect.left) / rect.width;

            const newValue = Math.round(
              Math.max(0, Math.min(100, percentage * 100)),
            );

            onChange(newValue);
          }}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (e.buttons !== 1) {
              return;
            }

            const rect = e.currentTarget.getBoundingClientRect();

            const percentage = (e.clientX - rect.left) / rect.width;

            const newValue = Math.round(
              Math.max(0, Math.min(100, percentage * 100)),
            );

            onChange(newValue);
          }}
        >
          {/* Background Track */}

          <div className="absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-[#E8EDF2]" />

          {/* Colored Track */}

          <div
            className="absolute left-0 top-1/2 h-2 -translate-y-1/2 rounded-full"
            style={{
              width: `${value}%`,
              backgroundColor: sliderColor,
            }}
          />

          {/* Thumb */}

          <div
            className="absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 -translate-x-1/2 rounded-full bg-white shadow-sm"
            style={{
              left: `${value}%`,
              border: `3px solid ${sliderColor}`,
            }}
          />
        </div>

        {/* Labels */}

        <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
          <span>0 — Not at all</span>

          <span
            className="font-semibold"
            style={{
              color: sliderColor,
            }}
          >
            {value}
          </span>

          <span>100 — Very much</span>
        </div>
      </div>
    </div>
  );
}
