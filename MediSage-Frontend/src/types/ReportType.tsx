export type ExtractedValue = {
  test: string;
  value: string;
  unit: string;
  referenceRange: string;
  abnormal: boolean;
};

export type ReportSummary = {
  reportName: string;
  extractedValues: ExtractedValue[];
  summary: string;
  abnormalFindings: string[];
  recommendations: string;
  disclaimer: string;
};
