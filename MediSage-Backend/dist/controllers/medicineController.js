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
const medicineService_1 = require("../services/medicineService");
const prisma = new client_1.PrismaClient();
const getMedicineDetailByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        if (!name) {
            return res.status(400).json({
                error: "Medicine name is required",
                message: "Please provide a medicine name to search",
            });
        }
        let medicine = yield prisma.medicine.findUnique({
            where: {
                name: name,
            },
        });
        if (medicine) {
            return res.json({ success: true, medicine });
        }
        const medicineDetailByAi = yield (0, medicineService_1.searchIndianMedicineByAi)(name);
        if (medicineDetailByAi) {
            //store in DB for furure reference
            yield prisma.medicine.create({
                data: Object.assign(Object.assign({}, medicineDetailByAi), { language: "en" }),
            });
            return res.json({
                success: true,
                medicineDetailByAi,
            });
        }
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
