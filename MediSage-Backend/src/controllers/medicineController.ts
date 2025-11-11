import { PrismaClient, Medicine } from "@prisma/client";
import { Request, Response } from "express";
import { searchIndianMedicineByAi } from "../services/medicineSummaryService";

const prisma = new PrismaClient();

export const getMedicineDetailByName = async (req: Request, res: Response) => {
  const { nameData } = req.body;

  console.log("medicineName", nameData);

  if (!nameData || typeof nameData !== "string") {
    return res.status(400).json({
      error: "Medicine name is required",
      message: "Please provide a medicine name to search",
    });
  }
  const name = nameData.trim().toLowerCase();
  console.log("name", name);

  try {
    let medicine = await prisma.medicine.findUnique({
      where: { name },
    });
    console.log("medicinefromDB---", medicine);
    if (medicine) {
      return res.json({ success: true, medicine });
    }
    const medicineDetailByAi = await searchIndianMedicineByAi(name);
    if (!medicineDetailByAi) {
      return res.status(404).json({
        success: false,
        message: "No details found for this medicine",
      });
    }
    const aiMedicine = {
      ...medicineDetailByAi,
      name: medicineDetailByAi.name.toLowerCase(),
      description: medicineDetailByAi.description.toLowerCase(),
    };
    medicine = await prisma.medicine.upsert({
      where: { name: aiMedicine.name },
      update: {
        description: aiMedicine.description,
        price: aiMedicine.price,
        imageUrl: aiMedicine.imageUrl,
      },
      create: {
        name: aiMedicine.name,
        description: aiMedicine.description,
        genericName: aiMedicine.genericName,
        brandNames: aiMedicine.brandNames,
        manufacturer: aiMedicine.manufacturer,
        price: aiMedicine.price,
        usage: aiMedicine.usage,
        sideEffects: aiMedicine.sideEffects,
        idealTiming: aiMedicine.idealTiming,
        warnings: aiMedicine.warnings,
        scheduleType: aiMedicine.scheduleType,
        prescriptionRequired: aiMedicine.prescriptionRequired,
        ayushApproved: aiMedicine.ayushApproved,
        imagePrompt: aiMedicine.imagePrompt,
        imageUrl: aiMedicine.imageUrl,
        language: aiMedicine.language,
      },
    });
    return res.json({
      success: true,
      medicine,
    });
  } catch (error) {
    console.error("Medicine search error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Something went wrong while searching for the medicine",
    });
  }
};
