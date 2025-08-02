import type { Medicine } from "../types/MedicineType";

type MedicineProps={
    medicine:Medicine
}

const MedicineSummaryCard = ({medicine}:MedicineProps) => {
  

  return (
    <div className="bg-blue-50 p-6 rounded-md shadow-xl  mx-auto mt-6">
      <div className="text-2xl font-bold mb-1">{medicine.name}</div>
      <div className="text-gray-600 mb-2">
        <span className="font-semibold">Generic Name:</span> {medicine.genericName}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Brand Names:</span> {medicine.brandNames.join(", ")}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Manufacturer:</span> {medicine.manufacturer}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Price:</span> {medicine.price}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Description:</span> {medicine.description}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Usage:</span> {medicine.usage}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Side Effects:</span> {medicine.sideEffects}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Timing:</span> {medicine.idealTiming}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Warnings:</span> {medicine.warnings}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Prescription Required:</span>{" "}
        {medicine.prescriptionRequired ? "Yes" : "No"}
      </div>
      <div>
        <span className="font-semibold">AYUSH Approved:</span>{" "}
        {medicine.ayushApproved ? "Yes" : "No"}
      </div>
    </div>
  );
};

export default MedicineSummaryCard;
