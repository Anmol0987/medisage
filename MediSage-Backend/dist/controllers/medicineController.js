"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMedicineDetailByName = void 0;
const client_1 = require("@prisma/client");
const medicineSummaryService_1 = require("../services/medicineSummaryService");
const prisma = new client_1.PrismaClient();
const getMedicineDetailByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        let medicine = yield prisma.medicine.findUnique({
            where: { name },
        });
        console.log("medicinefromDB---", medicine);
        if (medicine) {
            return res.json({ success: true, medicine });
        }
        const medicineDetailByAi = yield (0, medicineSummaryService_1.searchIndianMedicineByAi)(name);
        if (!medicineDetailByAi) {
            return res.status(404).json({
                success: false,
                message: "No details found for this medicine",
            });
        }
        const aiMedicine = Object.assign(Object.assign({}, medicineDetailByAi), { name: medicineDetailByAi.name.toLowerCase(), description: medicineDetailByAi.description.toLowerCase() });
        medicine = yield prisma.medicine.upsert({
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
    }
    catch (error) {
        console.error("Medicine search error:", error);
        res.status(500).json({
            error: "Internal server error",
            message: "Something went wrong while searching for the medicine",
        });
    }
});
exports.getMedicineDetailByName = getMedicineDetailByName;
