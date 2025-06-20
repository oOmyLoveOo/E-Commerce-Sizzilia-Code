// /routes/contactRoutes.ts
import express from 'express';
import { sendContactEmail } from '../controllers/contactController';

const router = express.Router();

router.post('/contact', sendContactEmail);

export default router;