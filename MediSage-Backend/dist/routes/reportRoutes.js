"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reportController_1 = require("../controllers/reportController");
const uploads_1 = require("../middlewares/uploads");
const router = express_1.default.Router();
router.post('/upload', uploads_1.upload.single('report'), reportController_1.uploadReport);
exports.default = router;
