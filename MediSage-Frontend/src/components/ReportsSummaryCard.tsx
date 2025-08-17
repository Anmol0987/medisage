import type { ReportSummary } from "../types/ReportType";

type ReportSummaryProps = {
  report: ReportSummary;
};

const ReportsSummaryCard = ({ report }: ReportSummaryProps) => {
  return (
    <div className="mx-auto mt-6 rounded-lg bg-blue-300 p-6 shadow-xl">
      <div className="mb-4 text-2xl font-bold text-blue-900">
        {report.reportName}
      </div>
      <div className="mb-4 text-blue-950">{report.summary}</div>
      <div className="mb-4 overflow-x-auto rounded-md border border-blue-200">
        <table className="w-full">
          <thead className="bg-blue-200">
            <tr>
              <th className="border border-blue-200 p-2 text-blue-900">Test</th>
              <th className="border border-blue-200 p-2 text-blue-900">
                Value
              </th>
              <th className="border border-blue-200 p-2 text-blue-900">
                Reference Range
              </th>
              <th className="border border-blue-200 p-2 text-blue-900">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {report.extractedValues.map((item, idx) => (
              <tr
                key={idx}
                className="text-center odd:bg-blue-50 even:bg-blue-100"
              >
                <td className="border border-blue-200 p-2 text-blue-950">
                  {item.test}
                </td>
                <td className="border border-blue-200 p-2 text-blue-950">
                  {item.value} {item.unit}
                </td>
                <td className="border border-blue-200 p-2 text-blue-950">
                  {item.referenceRange}
                </td>
                <td
                  className={`border border-blue-200 p-2 font-semibold ${
                    item.abnormal ? "text-red-700" : "text-green-700"
                  }`}
                >
                  {item.abnormal ? "Abnormal" : "Normal"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {report.abnormalFindings.length > 0 && (
        <div className="mb-4">
          <div className="mb-2 font-semibold text-blue-900">
            Abnormal Findings:
          </div>
          <ul className="list-inside list-disc text-red-700">
            {report.abnormalFindings.map((finding, idx) => (
              <li key={idx}>{finding}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="mb-4">
        <div className="mb-1 font-semibold text-blue-900">Recommendations:</div>
        <div className="text-blue-950">{report.recommendations}</div>
      </div>
      <div className="text-xs text-blue-800 opacity-80">
        {report.disclaimer}
      </div>
    </div>
  );
};

export default ReportsSummaryCard;
