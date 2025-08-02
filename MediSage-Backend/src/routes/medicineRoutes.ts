import express from 'express'
import { getMedicineDetailByName } from '../controllers/medicineController';

const router = express.Router();

router.post('/',getMedicineDetailByName);

export default router;
