import { ClipboardMinus, FileUp } from "lucide-react";
import uploadPlaceholder from "../assets/upload.jpg"; // renamed to avoid conflict
import { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import type { ReportSummary } from "../types/ReportType";
import ReportsSummaryCard from "../components/ReportsSummaryCard";
import { Navbar } from "../components/Navbar";

const ReportAnalysis = () => {
  const MAX_FILE_SIZE_MB = 10;
  const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png"];

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState<ReportSummary | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert("Invalid file type");
      return;
    }

    // Validate size
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      alert("File is too large");
      return;
    }

    setSelectedFile(file);
    uploadToServer(file);
  };

  const uploadToServer = async (file: File) => {
    const formData = new FormData();
    formData.append("report", file);

    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/report/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      console.log("---", res.data.data.AISummary);
      setReportData(res.data.data.AISummary);
    } catch (err) {
      console.error("Upload error:", err);
    }
    setSelectedFile(null);
    setIsLoading(false);
  };

  return (
    <>
      <Navbar />

      {isLoading ? (
        <div className="flex h-full flex-col items-center justify-center bg-white p-5 shadow-2xl">
          <Loader />
          <h2>Please wait while we process your report</h2>
        </div>
      ) : (
        <div className="flex h-fit flex-col rounded-2xl bg-white p-5 shadow-2xl">
          <div className="text-left">
            <h1 className="flex items-center gap-2 text-2xl font-bold">
              <ClipboardMinus size={28} color="blue" />
              <span>Report Analysis</span>
            </h1>
            <h4 className="mt-2 text-gray-500">
              Drag-and-drop or browse to upload PDFs, DOCX, and images.
              Mobile-friendly and secure.
            </h4>
          </div>

          <div className="mt-4 h-fit w-full rounded-2xl border-2 border-gray-400 p-4">
            <h2 className="text-xl font-bold">Reports Uploader</h2>
            <div className="mt-2 flex gap-3">
              <h2 className="text-lg text-gray-400">Allowed:</h2>
              <div className="flex gap-5">
                <span className="rounded-xl bg-gray-200 px-[9px] py-1 text-sm">
                  PDF
                </span>
                <span className="rounded-xl bg-gray-200 px-[9px] py-1 text-sm">
                  PNG
                </span>
                <span className="rounded-xl bg-gray-200 px-[9px] py-1 text-sm">
                  JPG
                </span>
              </div>
            </div>

            <label
              htmlFor="fileInput"
              className="mt-2 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-400 px-2 py-4 hover:cursor-pointer"
            >
              <img
                className="h-72 w-full rounded-2xl object-contain"
                src={
                  selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : uploadPlaceholder
                }
                alt=""
              />
              <div className="flex items-center justify-center gap-2 text-gray-400">
                <FileUp />
                <h4>Drag and drop your files here, or click to browse</h4>
              </div>
            </label>
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          {reportData && (
            <div className="mt-6">
              <ReportsSummaryCard report={reportData} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ReportAnalysis;
