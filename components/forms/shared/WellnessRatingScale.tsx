"use client";

export default function WellnessRatingScale() {
  return (
    <div className="flex flex-col items-start justify-start gap-3 border-b border-slate-200 pb-3 sm:flex-row sm:items-center sm:gap-6">
      {/* Rating Text */}

      <div className="shrink-0">
        <p className="text-sm text-slate-500">
          Please rate each question from 0 to 100.
        </p>
      </div>

      {/* Color Scale */}

      <div className="flex flex-wrap items-center justify-start gap-x-5 gap-y-2">
        {/* 0–1 */}

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 shrink-0 rounded-full bg-[#2B3674]" />

          <span className="whitespace-nowrap text-xs text-slate-600">
            0–1: Not at all
          </span>
        </div>

        {/* 2–33 */}

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 shrink-0 rounded-full bg-[#5A9E1B]" />

          <span className="whitespace-nowrap text-xs text-slate-600">
            2–33: A little
          </span>
        </div>

        {/* 34–66 */}

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 shrink-0 rounded-full bg-[#C96800]" />

          <span className="whitespace-nowrap text-xs text-slate-600">
            34–66: Quite
          </span>
        </div>

        {/* 67–100 */}

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 shrink-0 rounded-full bg-[#BD2635]" />

          <span className="whitespace-nowrap text-xs text-slate-600">
            67–100: Very much
          </span>
        </div>
      </div>
    </div>
  );
}