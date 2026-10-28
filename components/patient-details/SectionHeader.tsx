"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiChevronDown, FiChevronUp, FiEdit2 } from "react-icons/fi";

interface SectionHeaderProps {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  actionHref?: string;
  buttonText?: string;
  children?: React.ReactNode;
  extraActions?: React.ReactNode;
}

export default function SectionHeader({
  title,
  expanded,
  onToggle,
  actionHref,
  buttonText = "Edit",
  children,
  extraActions,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-[#EAECF0] bg-[#F9FAFB] px-6 py-4">
      {/* Left */}
      <div
        onClick={onToggle}
        className="flex cursor-pointer items-center gap-3"
      >
        {expanded ? (
          <FiChevronUp size={20} className="text-[#2B3674]" />
        ) : (
          <FiChevronDown size={20} className="text-[#2B3674]" />
        )}

        <div>
          <h3 className=" text-sm md:text-lg font-semibold text-[#344054]">
            {title}
          </h3>

          {children}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1 sm:gap-2">
        {extraActions}
        {expanded && actionHref && (
          <Button
            asChild
            type="button"
            size="sm"
            variant="outline"
            className="h-9 border-[#2B3674] text-[#2B3674] hover:bg-[#2B3674] hover:text-white"
          >
            <Link href={actionHref}>
              <FiEdit2 className="mr-1 h-4 w-4" />
              {buttonText}
            </Link>
          </Button>
        )}

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={onToggle}
          className="h-9 border-[#2B3674] text-[#2B3674] hover:bg-[#2B3674] hover:text-white"
        >
          {expanded ? "Hide" : "View"}
        </Button>
      </div>
    </div>
  );
}
