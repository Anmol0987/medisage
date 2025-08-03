import Searchbar from "../components/Searchbar";
import Chip from "../components/Chip";
import { useState } from "react";
import MedicineSummaryCard from "../components/MedicineSummaryCard";
import axios from "axios";
import type { Medicine } from "../types/MedicineType";
import Loader from "../components/Loader";

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
    <div className="bg-primary w-full p-7">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {" "}
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
              <div>No medicine selected yet.</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MedicineSearch;

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
              ? "bg-secondary border-primary text-fontColor"
              : "border-secondary bg-primary border"
          }`}
          onClick={() => setSelectedCategory("recent")}
        >
          Recent
        </button>
        <button
          className={`cursor-pointer rounded-md px-4 py-2 font-semibold ${
            selectedCategory === "popular"
              ? "bg-secondary border-primary text-fontColor"
              : "border-secondary bg-primary border"
          }`}
          onClick={() => setSelectedCategory("popular")}
        >
          Popular
        </button>
      </div>
      <div className="mt-3 flex gap-2">
        {(selectedCategory === "recent" ? recentSearches : popularSearches).map(
          (med) => (
            <Chip key={med} text={med} />
          ),
        )}
      </div>
    </>
  );
};
