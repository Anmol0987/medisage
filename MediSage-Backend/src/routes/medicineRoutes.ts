import express from 'express'
import { getMedicineDetailByName } from '../controllers/medicineController';

const router = express.Router();

router.get('/',getMedicineDetailByName);

export default router;
