import * as XLSX from "xlsx";
import type { ExportPatient } from "./sheets/exportTypes";
import { buildDemographicRows } from "./sheets/demographicSheet";
import { buildVisitDetailsRows } from "./sheets/visitDetailsSheet";
import { buildClinicalStatusRows } from "./sheets/clinicalStatusSheet";
import { buildBodilyWellnessRows } from "./sheets/bodilyWellnessSheet";
import { buildPerformanceWellnessRows } from "./sheets/performanceWellnessSheet";
import { buildMentalWellnessRows } from "./sheets/mentalWellnessSheet";
import { buildSocioCulturalWellnessRows } from "./sheets/socioCulturalWellnessSheet";
import { buildSpiritualWellnessRows } from "./sheets/spiritualWellnessSheet";
import { buildFinancialWellnessRows } from "./sheets/financialWellnessSheet";
import { buildWomensHealthRows } from "./sheets/womensHealthSheet";
import { buildPatientNarrativeRows } from "./sheets/patientNarrativeSheet";
import {
  buildCervicalCancerRows,
  buildBreastCancerRows,
  buildHeadAndNeckCancerRows,
} from "./sheets/diseaseSpecificSheet";
import { buildWellnessScoreRows } from "./sheets/wellnessScoreSheet";

export type { ExportPatient };

// ─── Auto column width helper ─────────────────────────────────────────────

const autoWidth = (sheet: XLSX.WorkSheet) => {
  const ref = sheet["!ref"];
  if (!ref) return;
  const range = XLSX.utils.decode_range(ref);
  const cols = [];
  for (let c = range.s.c; c <= range.e.c; c++) {
    let max = 15;
    for (let r = range.s.r; r <= range.e.r; r++) {
      const cell = sheet[XLSX.utils.encode_cell({ r, c })];
      if (cell?.v) max = Math.max(max, String(cell.v).length + 2);
    }
    cols.push({ wch: Math.min(max, 50) });
  }
  sheet["!cols"] = cols;
};

// ─── Helper: build sheet and append to workbook ───────────────────────────

/* eslint-disable @typescript-eslint/no-explicit-any */
const addSheet = (
  workbook: XLSX.WorkBook,
  rows: any[],
  sheetName: string,
) => {
  // XLSX sheet names max 31 chars
  const safeName = sheetName.slice(0, 31);

  // ── Replace hyperlink descriptors with plain text so json_to_sheet works ──
  const cleanRows = rows.map((row) => {
    const cleaned: Record<string, any> = {};
    for (const [key, value] of Object.entries(row)) {
      cleaned[key] =
        value && typeof value === "object" && "text" in value && "url" in value
          ? (value as { text: string; url: string }).text
          : value;
    }
    return cleaned;
  });

  const sheet =
    cleanRows.length > 0
      ? XLSX.utils.json_to_sheet(cleanRows)
      : XLSX.utils.json_to_sheet([{}]); // empty placeholder so sheet still appears

  // ── Inject XLSX hyperlinks for { text, url } cells ────────────────────────
  if (rows.length > 0) {
    // Determine column index for each key
    const headers = Object.keys(cleanRows[0]);
    rows.forEach((row, rowIdx) => {
      headers.forEach((key, colIdx) => {
        const value = row[key];
        if (
          value &&
          typeof value === "object" &&
          "text" in value &&
          "url" in value
        ) {
          const cellAddr = XLSX.utils.encode_cell({ r: rowIdx + 1, c: colIdx });
          if (sheet[cellAddr]) {
            // Set hyperlink
            sheet[cellAddr].l = { Target: (value as { url: string }).url };
            // Style as hyperlink (blue underline)
            sheet[cellAddr].s = {
              font: { color: { rgb: "0563C1" }, underline: true },
            };
          }
        }
      });
    });
  }

  autoWidth(sheet);
  XLSX.utils.book_append_sheet(workbook, sheet, safeName);
};

// ─── Main Export Function ─────────────────────────────────────────────────

export const exportPatientsToExcel = (
  patients: ExportPatient[],
  fileName = "patients",
) => {
  const wb = XLSX.utils.book_new();

  // Sheet 1 — Demographic Details (1 row per patient)
  addSheet(wb, buildDemographicRows(patients), "Demographic Details");

  // Sheet 2 — Visit Details (1 row per visit)
  addSheet(wb, buildVisitDetailsRows(patients), "Visit Details");

  // Sheet 3 — Clinical Status (1 row per visit)
  addSheet(wb, buildClinicalStatusRows(patients), "Clinical Status");

  // Sheet 4 — Bodily Wellness (1 row per visit)
  addSheet(wb, buildBodilyWellnessRows(patients), "Bodily Wellness");

  // Sheet 5 — Performance Wellness (1 row per visit)
  addSheet(wb, buildPerformanceWellnessRows(patients), "Performance Wellness");

  // Sheet 6 — Mental Wellness (1 row per visit)
  addSheet(wb, buildMentalWellnessRows(patients), "Mental Wellness");

  // Sheet 7 — Socio-Cultural Wellness (1 row per visit)
  addSheet(
    wb,
    buildSocioCulturalWellnessRows(patients),
    "Socio-Cultural Wellness",
  );

  // Sheet 8 — Spiritual Wellness (1 row per visit)
  addSheet(wb, buildSpiritualWellnessRows(patients), "Spiritual Wellness");

  // Sheet 9 — Financial Wellness (1 row per visit)
  addSheet(wb, buildFinancialWellnessRows(patients), "Financial Wellness");

  // Sheet 10 — Women's Health (only female patients)
  const womensHealthRows = buildWomensHealthRows(patients);
  if (womensHealthRows.length > 0) {
    addSheet(wb, womensHealthRows, "Women's Health");
  }

  // Sheet 11 — Patient Narrative (1 row per visit)
  addSheet(wb, buildPatientNarrativeRows(patients), "Patient Narrative");

  // Sheet 12A — Cervical Cancer (only if any patient has this data)
  const cervicalRows = buildCervicalCancerRows(patients);
  if (cervicalRows.length > 0) {
    addSheet(wb, cervicalRows, "Cervical Cancer");
  }

  // Sheet 12B — Breast Cancer (only if any patient has this data)
  const breastRows = buildBreastCancerRows(patients);
  if (breastRows.length > 0) {
    addSheet(wb, breastRows, "Breast Cancer");
  }

  // Sheet 12C — Head & Neck Cancer (only if any patient has this data)
  const headNeckRows = buildHeadAndNeckCancerRows(patients);
  if (headNeckRows.length > 0) {
    addSheet(wb, headNeckRows, "Head & Neck Cancer");
  }

  // Sheet 13 — Wellness Scores (1 row per visit)
  addSheet(wb, buildWellnessScoreRows(patients), "Wellness Scores");

  // Export
  XLSX.writeFile(wb, `${fileName}.xlsx`);
};
