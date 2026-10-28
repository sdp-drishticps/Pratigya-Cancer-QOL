"use client";

import Link from "next/link";
import { FiSearch, FiPlus, FiDownload } from "react-icons/fi";
import { AiOutlineFileExcel } from "react-icons/ai";

import { FaUser } from "react-icons/fa";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DashboardToolbarProps {
  totalPatients: number;
  doctorName?: string;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  selectedCount: number;
  onExport: () => void;
  exportLoading?: boolean;
  onDownloadFiles: () => void;
  downloadFilesLoading?: boolean;
}

export default function DashboardToolbar({
  totalPatients,
  doctorName,
  search,
  setSearch,
  selectedCount,
  onExport,
  exportLoading = false,
  onDownloadFiles,
  downloadFilesLoading = false,
}: DashboardToolbarProps) {
  return (
    <div className="mb-6 border-b border-gray-200 px-4 py-4 sm:px-6 lg:mb-8 lg:mt-5 lg:px-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between xl:flex-nowrap">
        {/* Welcome */}
        <div>
          <h2 className="text-medium font-normal text-[#2B3674] sm:text-xl">
            Welcome, <span className="font-bold">Dr. {doctorName}</span>
          </h2>
        </div>

        {/* Right Section */}
        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:flex-wrap md:items-center lg:flex-nowrap">
          {/* Search */}
          <div className="relative w-full md:w-75 lg:w-[320px] xl:w-112.5">
            <FiSearch
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <Input
              type="text"
              placeholder="Search Patient"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 border-[#E2E8F0] bg-[#F8F9FA] pl-10 focus-visible:ring-[#2B3674]"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            {/* Total Patients */}
            <div className="flex h-10 flex-1 items-center justify-center gap-2 rounded-md border border-[#E2E8F0] bg-[#F8F9FA] px-3 sm:flex-none">
              <div className="rounded bg-[#E2E8F0] p-1.5 text-gray-500">
                <FaUser size={14} />
              </div>

              <span className="text-sm font-medium whitespace-nowrap text-[#4B5563]">
                Total:
                <span className="ml-1 font-bold text-[#2B3674]">
                  {totalPatients}
                </span>
              </span>
            </div>

            {/* Export */}
            <Button
              variant="outline"
              disabled={selectedCount === 0 || exportLoading}
              onClick={onExport}
              className="h-10 flex-1 gap-2 border-[#2B3674] text-[#2B3674] hover:bg-[#2B3674] hover:text-white sm:flex-none"
            >
              <AiOutlineFileExcel size={15} />
              {exportLoading
                ? "Exporting..."
                : `Export (${selectedCount})`}
            </Button>

            {/* Download Files */}
            <Button
              variant="outline"
              disabled={selectedCount === 0 || downloadFilesLoading}
              onClick={onDownloadFiles}
              className="h-10 flex-1 gap-2 border-[#2B3674] text-[#2B3674] hover:bg-[#2B3674] hover:text-white sm:flex-none"
            >
              <FiDownload size={15} />
              {downloadFilesLoading
                ? "Downloading..."
                : `Files (${selectedCount})`}
            </Button>

            {/* Add */}
            <Button
              asChild
              className="h-10 flex-1 border-[#2B3674] text-[#2B3674] hover:bg-[#2B3674] hover:text-white sm:flex-none"
              variant="outline"
            >
              <Link
                href="/forms/demographic-details"
                className="flex items-center gap-2"
              >
                <FiPlus size={16} />
                ADD NEW
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
