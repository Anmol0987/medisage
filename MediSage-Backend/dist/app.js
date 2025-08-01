"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const medicineRoutes_1 = __importDefault(require("./routes/medicineRoutes"));
const reportRoutes_1 = __importDefault(require("./routes/reportRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/medicine', medicineRoutes_1.default);
app.use('/api/report', reportRoutes_1.default);
app.get('/', (req, res) => {
    res.json({ status: "OK" });
});
exports.default = app;
