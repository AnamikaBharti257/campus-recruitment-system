import express from 'express';
import { uploadResume } from '../middleware/upload.js';
import { uploadResumeController } from '../controllers/uploadController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post(
  '/resume',
  protect,
  uploadResume.single('resume'),
  uploadResumeController
);

export default router;