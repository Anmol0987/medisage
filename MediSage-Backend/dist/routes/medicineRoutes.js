"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const medicineController_1 = require("../controllers/medicineController");
const router = express_1.default.Router();
router.post('/', medicineController_1.getMedicineDetailByName);
exports.default = router;
