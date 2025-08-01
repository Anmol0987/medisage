import express from "express";
import cors from "cors";
import medicineRoutes from "./routes/medicineRoutes";
import reportRoutes from "./routes/reportRoutes";

const app= express()
app.use(cors())
app.use(express.json())

app.use('/api/medicine', medicineRoutes);
app.use('/api/report', reportRoutes);

app.get('/', (req, res) => {
  res.json({ status: "OK" });
});

export default app;