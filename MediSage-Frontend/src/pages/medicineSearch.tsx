import Searchbar from "../components/Searchbar";
import Chip from "../components/Chip";
import { useState } from "react";
import MedicineSummaryCard from "../components/MedicineSummaryCard";
import axios from "axios";
import type { Medicine } from "../types/MedicineType";
import Loader from "../components/Loader";
import { Pill } from "lucide-react";
import { Navbar } from "../components/Navbar";

const MedicineSearch = () => {
  const [medicineData, setMedicineData] = useState<Medicine | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const getMedicineSummary = async (medicineName: string) => {
    setIsLoading(true);
    const response = await axios.post("http://localhost:3000/api/medicine", {
      nameData: medicineName,
    });
    console.log(response.data);
    setMedicineData(response.data.medicine);
    setIsLoading(false);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = () => {
    if (searchTerm.trim()) getMedicineSummary(searchTerm.trim());
  };

  return (
    <>
      <Navbar />
      <div className="mt- w-full bg-white p-4 shadow-xl">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {" "}
            <div className="mb-2 flex items-center gap-2">
              <Pill className="h-6 w-6 text-blue-600" />
              <h1 className="text-2xl font-bold">Medicine Search</h1>
            </div>
            <Searchbar
              type="text"
              placeholder="Enter Medicine name"
              value={searchTerm}
              onSearch={handleSearch}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Badges />
            <div className="mt-3">
              {medicineData ? (
                <MedicineSummaryCard medicine={medicineData} />
              ) : (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 p-4">
                    <Pill className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-slate-800">
                    Search for Medicine Information
                  </h3>
                  <p className="mb-4 text-slate-600">
                    Enter a medicine name above or click on one of the suggested
                    medicines to get detailed information.
                  </p>
                  <p className="text-sm text-slate-500">
                    Get information about dosage, side effects, pricing, and
                    more.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default MedicineSearch;




/////
// BAGDES
////

const recentSearches = [
  "aciloc150",
  "zerodol",
  "paracetamol",
  "ranitidine",
  "dolo650",
];
const popularSearches = [
  "paracetamol",
  "dolo650",
  "panadol",
  "ibuprofen",
  "aspirin",
];
const Badges = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    "recent" | "popular"
  >("recent");
  return (
    <>
      <div className="mt-4 flex gap-4">
        <button
          className={`cursor-pointer rounded-md px-4 py-2 font-semibold ${
            selectedCategory === "recent"
              ? "border-blue-100 bg-blue-600 text-white"
              : "border-blue-200"
          }`}
          onClick={() => setSelectedCategory("recent")}
        >
          Recent
        </button>
        <button
          className={`cursor-pointer rounded-md px-4 py-2 font-semibold ${
            selectedCategory === "popular"
              ? "border-blue-100 bg-blue-600 text-white"
              : "border-blue-200"
          }`}
          onClick={() => setSelectedCategory("popular")}
        >
          Popular
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {(selectedCategory === "recent" ? recentSearches : popularSearches).map(
          (med) => (
            <Chip key={med} text={med} />
          ),
        )}
      </div>
    </>
  );
};
