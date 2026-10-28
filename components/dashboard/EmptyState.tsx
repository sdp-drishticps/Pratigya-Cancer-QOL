"use client";

import Image from "next/image";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <Image
        src="/dashboard/no-data.png"
        alt="No Data"
        width={260}
        height={260}
        priority
        unoptimized
        className="animate-float"
      />

      <p className=" text-[#8A94B5]">
        No patients available. Click{" "}
        <span className="font-semibold text-[#2B3674]">
          &quot;+ Add New&quot;
        </span>{" "}
        to add one.
      </p>
    </div>
  );
}
