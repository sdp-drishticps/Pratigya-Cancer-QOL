"use client";

import Link from "next/link";
import { LuChevronDown } from "react-icons/lu";
import { usePathname } from "next/navigation";
import type { MenuItem } from "./sidebarMenuData";

// =====================================
// SidebarDropdown
//
// Reusable collapsible group of links used for
// "Wellness" and "Disease-Specific" dropdown sections.
// =====================================

interface SidebarDropdownProps {
  /** Group label shown in the trigger button */
  label: string;
  /** Icon for the trigger button */
  icon: React.ReactNode;
  /** Whether the dropdown is currently open */
  isOpen: boolean;
  /** Callback to toggle open/closed */
  onToggle: () => void;
  /** Whether the sidebar is collapsed to icon-only mode */
  collapsed: boolean;
  /** Child nav items */
  items: MenuItem[];
}

export default function SidebarDropdown({
  label,
  icon,
  isOpen,
  onToggle,
  collapsed,
  items,
}: SidebarDropdownProps) {
  const pathname = usePathname();

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className={`
          flex w-full items-center
          px-4 py-2
          font-semibold
          transition-all
          text-[#4B5563]
          hover:bg-[#F7F9FC]
          hover:text-[#404C8B]
          relative
          ${collapsed ? "justify-center" : "justify-between"}
        `}
        title={collapsed ? label : ""}
      >
        <div
          className={`
            flex items-center
            ${collapsed ? "justify-center" : "gap-3"}
          `}
        >
          {icon}
          {!collapsed && (
            <span className="whitespace-nowrap text-[14px]">{label}</span>
          )}
        </div>

        <LuChevronDown
          size={collapsed ? 14 : 18}
          className={`
            transition-transform duration-200
            ${isOpen ? "rotate-180" : ""}
            ${collapsed ? "absolute right-2" : ""}
          `}
        />
      </button>

      {isOpen && (
        <div
          className={
            collapsed
              ? "mt-1 flex flex-col gap-1"
              : "ml-5 border-l border-slate-200 pl-3"
          }
        >
          {items.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`
                  flex items-center
                  px-4 py-2
                  font-medium
                  transition-all
                  ${collapsed ? "justify-center" : "gap-3"}
                  ${
                    isActive
                      ? "bg-[#404C8B] text-white"
                      : "text-[#4B5563] hover:bg-[#F7F9FC] hover:text-[#404C8B]"
                  }
                `}
                title={collapsed ? item.title : ""}
              >
                <Icon
                  size={20}
                  className={`
                    shrink-0
                    ${isActive ? "text-white" : "text-[#8A8FA3]"}
                  `}
                />
                {!collapsed && (
                  <span className="whitespace-nowrap overflow-hidden text-[13px]">
                    {item.title}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
