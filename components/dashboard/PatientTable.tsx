"use client";

import { Button } from "../ui/button";
import Link from "next/link";

interface Patient {
  _id: string;
  patientId: string;
  crNo: string;
  fullName: string;
  age: string;
  gender: string;
}

interface PatientTableProps {
  patients: Patient[]; // Current page
  allPatients: Patient[]; // All filtered patients

  selectedPatients: string[];
  setSelectedPatients: React.Dispatch<React.SetStateAction<string[]>>;

  currentPage: number;
  pageSize: number;
}

export default function PatientTable({
  patients,
  allPatients,
  selectedPatients,
  setSelectedPatients,
  currentPage,
  pageSize,
}: PatientTableProps) {
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPatients(allPatients.map((patient) => patient._id));
    } else {
      setSelectedPatients([]);
    }
  };

  const handleSelectPatient = (patientId: string, checked: boolean) => {
    if (checked) {
      setSelectedPatients((prev) => [...prev, patientId]);
    } else {
      setSelectedPatients((prev) => prev.filter((id) => id !== patientId));
    }
  };

  return (
    <div className="mx-5 overflow-hidden rounded-lg border border-[#EAECF0] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] text-sm text-[#475467]">
              <th className="w-12 border border-[#EAECF0] px-4 py-3 text-center">
                <input
                  type="checkbox"
                  checked={
                    allPatients.length > 0 &&
                    selectedPatients.length === allPatients.length
                  }
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="h-4 w-4 cursor-pointer"
                />
              </th>

              <th className="border border-[#EAECF0] px-4 py-3 text-left font-semibold">
                S.No
              </th>

              <th className="border border-[#EAECF0] px-4 py-3 text-left font-semibold">
                Patient ID
              </th>

              <th className="border border-[#EAECF0] px-4 py-3 text-left font-semibold">
                CR No
              </th>

              <th className="border border-[#EAECF0] px-4 py-3 text-left font-semibold">
                Full Name
              </th>

              <th className="border border-[#EAECF0] px-4 py-3 text-left font-semibold">
                Age
              </th>

              <th className="border border-[#EAECF0] px-4 py-3 text-left font-semibold">
                Gender
              </th>

              <th className="border border-[#EAECF0] px-4 py-3 text-center font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient, index) => (
              <tr key={patient._id} className="h-14 text-sm hover:bg-slate-50">
                <td className="border border-[#EAECF0] text-center">
                  <input
                    type="checkbox"
                    checked={selectedPatients.includes(patient._id)}
                    onChange={(e) =>
                      handleSelectPatient(patient._id, e.target.checked)
                    }
                    className="h-4 w-4 cursor-pointer"
                  />
                </td>

                <td className="border border-[#EAECF0] px-4">
                  {(currentPage - 1) * pageSize + index + 1}
                </td>
                <td className="border border-[#EAECF0] px-4 font-medium text-[#2B3674]">
                  {patient.patientId}
                </td>

                <td className="border border-[#EAECF0] px-4">{patient.crNo}</td>

                <td className="border border-[#EAECF0] px-4">
                  {patient.fullName}
                </td>

                <td className="border border-[#EAECF0] px-4">{patient.age}</td>

                <td className="border border-[#EAECF0] px-4">
                  {patient.gender}
                </td>

                <td className="border border-[#EAECF0] px-4 text-center">
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="h-8 border-[#2B3674] text-[#2B3674] hover:bg-[#2B3674] hover:text-white"
                  >
                    <Link href={`/patients/${patient.patientId}`}>
                      View Details
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
