"use client";

import { ReactNode } from "react";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SectionAccordionProps {
  value: string;
  number: number;
  title: string;
  children: ReactNode;
}

export default function SectionAccordion({
  value,
  number,
  title,
  children,
}: SectionAccordionProps) {
  return (
    <AccordionItem
      value={value}
      className="border-b border-[#EAECF0] last:border-b-0"
    >
      <AccordionTrigger className="py-5 hover:no-underline">
        <div className="flex items-center gap-4">
          <span className="w-5 text-sm font-medium text-slate-500">
            {number}
          </span>

          <h2 className="text-xl font-semibold text-[#2B3674]">{title}</h2>
        </div>
      </AccordionTrigger>

      <AccordionContent className="pt-2 pb-6">{children}</AccordionContent>
    </AccordionItem>
  );
}
