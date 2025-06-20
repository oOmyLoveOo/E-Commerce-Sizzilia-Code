// routes/orderRoutes.ts
import express from 'express';
import { processOrder } from '../controllers/orderController';

const router = express.Router();

router.post('/process-order', processOrder);

export default router;