import { ReportSummary } from "../types/ReportType";

export const isValidReportSummary = (obj: any): obj is ReportSummary => {
  return (
    obj &&
    typeof obj.reportName === "string" &&
    Array.isArray(obj.extractedValues) &&
    Array.isArray(obj.abnormalFindings) &&
    typeof obj.summary === "string" &&
    typeof obj.recommendations === "string" &&
    typeof obj.disclaimer === "string" &&
    obj.extractedValues.every(
      (v: any) =>
        v &&
        typeof v.test === "string" &&
        typeof v.value === "string" &&
        typeof v.unit === "string" &&
        typeof v.referenceRange === "string" &&
        typeof v.abnormal === "boolean"
    ) &&
    obj.abnormalFindings.every(
      (f: any) =>
        f && typeof f.test === "string" && typeof f.finding === "string"
    )
  );
};
