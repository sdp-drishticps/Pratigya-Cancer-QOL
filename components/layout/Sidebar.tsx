/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { LuClipboardList, LuFolderHeart } from "react-icons/lu";

import SidebarDropdown from "./sidebar/SidebarDropdown";
import {
  menuItems,
  wellnessItems,
  diseaseSpecificItems,
  otherFormsItems,
} from "./sidebar/sidebarMenuData";

// =====================================
// Sidebar
// =====================================

export default function Sidebar() {
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [diseaseOpen, setDiseaseOpen] = useState(false);
  const [wellnessOpen, setWellnessOpen] = useState(false);

  // Collapse on mobile by default
  useEffect(() => {
    if (window.innerWidth < 768) {
      setCollapsed(true);
    }
  }, []);

  // Auto-open the relevant dropdown when navigating to a sub-page
  useEffect(() => {
    const isDiseasePage = diseaseSpecificItems.some(
      (item) => pathname === item.href,
    );
    const isWellnessPage = wellnessItems.some((item) => pathname === item.href);

    if (isDiseasePage) setDiseaseOpen(true);
    if (isWellnessPage) setWellnessOpen(true);
  }, [pathname]);

  const handleToggle = () => {
    setCollapsed((prev) => {
      if (!prev) {
        setDiseaseOpen(false);
        setWellnessOpen(false);
      }
      return !prev;
    });
  };

  return (
    <aside
      className={`
        sticky top-0 lg:top-20
        h-[calc(100vh-80px)]
        lg:h-[calc(100vh-115px)]
        overflow-hidden
        z-10
        border-r border-[#D7D7D7]
        bg-white
        transition-all duration-300
        ${collapsed ? "w-16" : "w-64"}
      `}
    >
      {/* ================================
          SIDEBAR HEADER
      ================================ */}
      <div
        className={`
          flex items-center
          px-4 py-4
          ${collapsed ? "justify-center" : "justify-between"}
        `}
      >
        {!collapsed && (
          <span className="font-semibold text-[#4B5563]">Menu</span>
        )}

        <button
          type="button"
          onClick={handleToggle}
          className="rounded-md p-1 transition-colors hover:bg-gray-100"
          title={collapsed ? "Expand Menu" : "Collapse Menu"}
        >
          {collapsed ? (
            <AiOutlineMenuUnfold size={22} className="text-[#6B7280]" />
          ) : (
            <AiOutlineMenuFold size={22} className="text-[#6B7280]" />
          )}
        </button>
      </div>

      {/* ================================
          MENU
      ================================ */}
      <nav className="mt-2 flex flex-col gap-1">
        {/* Normal menu items */}
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`
                flex items-center
                px-4 py-2
                font-semibold
                transition-all
                ${
                  isActive
                    ? "bg-[#404C8B] text-white"
                    : "text-[#4B5563] hover:bg-[#F7F9FC] hover:text-[#404C8B]"
                }
                ${collapsed ? "justify-center" : "gap-3"}
              `}
              title={collapsed ? item.title : ""}
            >
              <Icon
                size={22}
                className={`
                  shrink-0
                  ${isActive ? "text-white" : "text-[#8A8FA3]"}
                `}
              />
              {!collapsed && (
                <span className="whitespace-nowrap overflow-hidden text-[14px]">
                  {item.title}
                </span>
              )}
            </Link>
          );
        })}

        {/* Wellness dropdown */}
        <SidebarDropdown
          label="Wellness"
          icon={
            <LuClipboardList size={22} className="shrink-0 text-[#8A8FA3]" />
          }
          isOpen={wellnessOpen}
          onToggle={() => setWellnessOpen(!wellnessOpen)}
          collapsed={collapsed}
          items={wellnessItems}
        />

        {/* Disease-Specific dropdown */}
        <SidebarDropdown
          label="Disease-Specific"
          icon={<LuFolderHeart size={22} className="shrink-0 text-[#8A8FA3]" />}
          isOpen={diseaseOpen}
          onToggle={() => setDiseaseOpen(!diseaseOpen)}
          collapsed={collapsed}
          items={diseaseSpecificItems}
        />

        {/* Other forms (Women's Health, etc.) */}
        {otherFormsItems.length > 0 && (
          <div className="mt-1 flex flex-col gap-1 border-t border-slate-100 pt-1">
            {otherFormsItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`
                    flex items-center
                    px-4 py-2
                    font-semibold
                    transition-all
                    ${
                      isActive
                        ? "bg-[#404C8B] text-white"
                        : "text-[#4B5563] hover:bg-[#F7F9FC] hover:text-[#404C8B]"
                    }
                    ${collapsed ? "justify-center" : "gap-3"}
                  `}
                  title={collapsed ? item.title : ""}
                >
                  <Icon
                    size={22}
                    className={`
                      shrink-0
                      ${isActive ? "text-white" : "text-[#8A8FA3]"}
                    `}
                  />
                  {!collapsed && (
                    <span className="whitespace-nowrap overflow-hidden text-[14px]">
                      {item.title}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </aside>
  );
}
