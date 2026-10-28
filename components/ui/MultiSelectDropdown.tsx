"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FormError from "@/components/ui/FormError";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

interface MultiSelectDropdownProps {
  label: string;
  placeholder?: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
  required?: boolean;
}

export default function MultiSelectDropdown({
  label,
  placeholder = "Select",
  options,
  value,
  onChange,
  error,
  required = false,
}: MultiSelectDropdownProps) {
  const [open, setOpen] = React.useState(false);

  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((item) => item !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="h-11 w-full justify-between font-normal"
          >
            <span className="truncate">
              {value.length ? value.join(", ") : placeholder}
            </span>

            <ChevronDown className="h-4 w-4 opacity-60" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-(--radix-popover-trigger-width) p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Search..." />

            <CommandEmpty>No option found.</CommandEmpty>

            <CommandGroup className="max-h-72 overflow-y-auto">
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => toggleOption(option)}
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded border transition-colors",
                      value.includes(option)
                        ? "border-[#2B3674] bg-[#2B3674]"
                        : "border-slate-300 bg-white",
                    )}
                  >
                    {value.includes(option) && (
                      <Check className="h-3 w-3 text-white stroke-3" />
                    )}
                  </div>

                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <FormError touched={!!error} error={error} />
    </div>
  );
}
