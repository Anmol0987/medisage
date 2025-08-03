import type { Medicine } from "../types/MedicineType";

type MedicineProps={
    medicine:Medicine
}

const MedicineSummaryCard = ({medicine}:MedicineProps) => {
  

  return (
    <div className="bg-secondary p-6 rounded-md shadow-xl  mx-auto mt-6">
      <div className="text-2xl font-bold mb-1">{medicine.name}</div>
      <div className="text-fontColor mb-2">
        <span className="font-semibold text-fontColor">Generic Name:</span> {medicine.genericName}
      </div>
      <div className="mb-2">
        <span className="font-semibold text-fontColor">Brand Names:</span> {medicine.brandNames.join(", ")}
      </div>
      <div className="mb-2">
        <span className="font-semibold text-fontColor">Manufacturer:</span> {medicine.manufacturer}
      </div>
      <div className="mb-2">
        <span className="font-semibold text-fontColor">Price:</span> {medicine.price}
      </div>
      <div className="mb-2">
        <span className="font-semibold text-fontColor">Description:</span> {medicine.description}
      </div>
      <div className="mb-2">
        <span className="font-semibold text-fontColor">Usage:</span> {medicine.usage}
      </div>
      <div className="mb-2">
        <span className="font-semibold text-fontColor">Side Effects:</span> {medicine.sideEffects}
      </div>
      <div className="mb-2">
        <span className="font-semibold text-fontColor">Timing:</span> {medicine.idealTiming}
      </div>
      <div className="mb-2">
        <span className="font-semibold text-fontColor">Warnings:</span> {medicine.warnings}
      </div>
      <div className="mb-2">
        <span className="font-semibold text-fontColor">Prescription Required:</span>{" "}
        {medicine.prescriptionRequired ? "Yes" : "No"}
      </div>
      <div>
        <span className="font-semibold text-fontColor">AYUSH Approved:</span>{" "}
        {medicine.ayushApproved ? "Yes" : "No"}
      </div>
    </div>
  );
};

export default MedicineSummaryCard;
