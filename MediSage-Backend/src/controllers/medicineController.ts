import { PrismaClient, Medicine } from "@prisma/client";
import { Request, Response } from "express";
import { searchIndianMedicineByAi } from "../services/medicineService";

const prisma = new PrismaClient();

export const getMedicineDetailByName = async (req: Request, res: Response) => {
  const { nameData } = req.body;

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
    console.log("medicinefromDB", medicine);
    if (medicine) {
      return res.json({ success: true, medicine });
    }
    const medicineDetailByAi = await searchIndianMedicineByAi(name);

    if (medicineDetailByAi) {
      const medicine = medicineDetailByAi;
      await prisma.medicine.create({
        data: {
          ...medicine,
          language: "en",
        },
      });
      return res.json({
        success: true,
        medicine,
      });
    }
  } catch (error) {
    console.error("Medicine search error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Something went wrong while searching for the medicine",
    });
  }
};
