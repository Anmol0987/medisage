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
  abnormalFindings: AbnormalFindings[];
  recommendations: string;
  disclaimer: string;
};
export type AbnormalFindings = {
test: string;
finding: string;
}
