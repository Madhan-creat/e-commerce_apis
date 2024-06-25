import { Router } from 'express';
import  createPayment from '../controllers/PaymentController';
import setupMocks from '../utils/mockPayments';

const paymentRoutes = Router();

// Setup mocks for testing
setupMocks();

paymentRoutes.post('/payments', createPayment);

export default paymentRoutes;