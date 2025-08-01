import { PrismaClient, Medicine } from "@prisma/client";
import { Request, Response } from "express";
import { searchIndianMedicineByAi } from "../services/medicineService";

const prisma = new PrismaClient();

export const getMedicineDetailByName = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(400).json({
        error: "Medicine name is required",
        message: "Please provide a medicine name to search",
      });
    }
    let medicine: Medicine | null = await prisma.medicine.findUnique({
      where: {
        name: name,
      },
    });
    if (medicine) {
      return res.json({ success: true, medicine });
    }
    const medicineDetailByAi = await searchIndianMedicineByAi(name);

    if (medicineDetailByAi) {
      //store in DB for furure reference
      await prisma.medicine.create({
        data: {
          ...medicineDetailByAi,
          language: "en",
        },
      });
      return res.json({
        success: true,
        medicineDetailByAi,
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
