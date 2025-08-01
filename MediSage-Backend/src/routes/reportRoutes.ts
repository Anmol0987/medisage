import express from 'express';
import { uploadReport } from '../controllers/reportController';
import { upload } from '../middlewares/uploads';

const router = express.Router();

router.post('/upload', upload.single('report'), uploadReport);

export default router;
