import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import MedicineSearch from "./pages/medicineSearch";
import ReportAnalysis from "./pages/ReportAnalysis";

export default function App() {
  return (
    <>
      <div className="bg-background-300 m-auto flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl p-4">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MedicineSearch />} />
              <Route path="/report" element={<ReportAnalysis />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}
