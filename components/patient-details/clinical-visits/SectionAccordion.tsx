"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Button } from "@/components/ui/button";

// =====================================
// SectionAccordion
// A reusable collapsible section with an optional action button.
// Shows an empty message when isFilled is false.
// =====================================

interface SectionAccordionProps {
  title: string;
  isFilled: boolean;
  actionText?: string;
  actionIcon?: React.ReactNode;
  onActionClick?: () => void;
  emptyMessage?: string;
  children: React.ReactNode;
}

export default function SectionAccordion({
  title,
  isFilled,
  actionText,
  actionIcon,
  onActionClick,
  emptyMessage,
  children,
}: SectionAccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4 overflow-hidden rounded-md border border-[#EAECF0] bg-white">
      <div
        className="flex cursor-pointer items-center justify-between bg-[#F9FAFB] px-4 py-3"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          {open ? (
            <FiChevronUp className="text-[#2B3674]" />
          ) : (
            <FiChevronDown className="text-[#2B3674]" />
          )}
          <h5 className="text-sm font-semibold text-[#344054]">{title}</h5>
        </div>

        {actionText && actionIcon && onActionClick && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-8 px-2 py-0 text-xs border-[#2B3674] text-[#2B3674] hover:bg-[#2B3674] hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              onActionClick();
            }}
          >
            <div className="flex items-center">
              {actionIcon}
              <span className="ml-1">{actionText}</span>
            </div>
          </Button>
        )}
      </div>

      {open && (
        <div className="border-t border-[#EAECF0] p-4 bg-white">
          {children}
        </div>
      )}
    </div>
  );
}
