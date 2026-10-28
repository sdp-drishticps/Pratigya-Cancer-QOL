/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import DashboardToolbar from "@/components/dashboard/DashboardToolbar";
import EmptyState from "@/components/dashboard/EmptyState";
import PatientTable from "@/components/dashboard/PatientTable";
import Pagination from "@/components/dashboard/Pagination";
import { exportPatientsToExcel } from "@/lib/patient/exportPatientsToExcel";
interface Patient {
  _id: string;
  patientId: string;
  crNo: string;
  fullName: string;
  age: string;
  gender: string;
  completedSections: number;
  createdAt: string;
}

export default function DashboardPage() {
  const [userName, setUserName] = useState("");

  const [patients, setPatients] = useState<Patient[]>([]);

  const [loading, setLoading] = useState(true);

  const [exportLoading, setExportLoading] = useState(false);

  const [downloadFilesLoading, setDownloadFilesLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("/api/patients");

      setPatients(response.data.patients || []);
    } catch (error) {
      console.error("Failed to fetch patients", error);
    }
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.fullName.toLowerCase().includes(search.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(search.toLowerCase()) ||
      patient.crNo?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleExport = async () => {
    if (!selectedPatients.length) return;

    try {
      setExportLoading(true);

      // Fetch full patient + visits data from new export API
      const { data } = await axios.post("/api/patients/export", {
        ids: selectedPatients,
      });

      exportPatientsToExcel(
        data.patients,
        `patients-${new Date().toISOString().split("T")[0]}`,
      );
    } catch (error) {
      console.error("Export failed", error);
    } finally {
      setExportLoading(false);
    }
  };

  const handleDownloadFiles = async () => {
    if (!selectedPatients.length) return;

    try {
      setDownloadFilesLoading(true);

      const response = await axios.post(
        "/api/patients/download-files",
        { ids: selectedPatients },
        { responseType: "blob" },
      );

      // Create a download link and trigger it
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      const dateStr = new Date().toISOString().split("T")[0];
      link.setAttribute("download", `patient-files-${dateStr}.zip`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 404
      ) {
        toast.error("No uploaded files found for the selected patients.");
      } else {
        console.error("Download files failed", error);
        toast.error("Failed to download files. Please try again.");
      }
    } finally {
      setDownloadFilesLoading(false);
    }
  };

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);

  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    const initialize = async () => {
      try {
        const userResponse = await axios.get("/api/auth/me");

        setUserName(userResponse.data.user.fullName);

        await fetchPatients();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-lg font-medium text-slate-600">
          Loading patients...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <DashboardToolbar
        totalPatients={patients.length}
        doctorName={userName}
        search={search}
        setSearch={setSearch}
        selectedCount={selectedPatients.length}
        onExport={handleExport}
        exportLoading={exportLoading}
        onDownloadFiles={handleDownloadFiles}
        downloadFilesLoading={downloadFilesLoading}
      />

      {filteredPatients.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="mb-3 mx-5 rounded-md border-[#EAECF0] border-2 bg-[#F8F9FA] px-3 py-2 md:hidden">
            <p className="text-xs font-medium text-[#2B3674]">
              👉 Swipe horizontally to view all patient details
            </p>
          </div>
          <PatientTable
            patients={paginatedPatients}
            allPatients={filteredPatients}
            selectedPatients={selectedPatients}
            setSelectedPatients={setSelectedPatients}
            currentPage={currentPage}
            pageSize={itemsPerPage}
          />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredPatients.length}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
