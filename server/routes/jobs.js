import express from 'express';
import {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
} from '../controllers/jobController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getJobs)
  .post(protect, authorize('company'), createJob);

router.route('/:id')
  .get(getJob)
  .put(protect, authorize('company'), updateJob)
  .delete(protect, authorize('company', 'admin'), deleteJob);

export default router;