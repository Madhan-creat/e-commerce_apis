// src/routes/userRoutes.ts
import { Router } from 'express';
import { register, login } from '../controllers/userController';
import Order from '../models/order';

const Userrouter = Router();

Userrouter.post('/register', register);
Userrouter.post('/login', login);

export default Userrouter;


// Product_apis
// ----------

// http://localhost:4000/api/v1/updateProduct/66786d36de925cbd8c0d4c66
// http://localhost:4000/api/v1/getProduct/66786d36de925cbd8c0d4c66
// http://localhost:4000/api/v1/getProducts
// http://localhost:4000/api/v1/createProduct

// user
// -----

// http://localhost:4000/api/v1/login
// http://localhost:4000/api/v1/register


// Order
// ----------

// http://localhost:4000/api/v1/createorder
// http://localhost:4000/api/v1/getorders
// http://localhost:4000/api/v1/getorder/6678757710e192227283c03c
// http://localhost:4000/api/v1/updateOrder/6678758e10e192227283c040
// http://localhost:4000/api/v1/deleteOrder/6678758e10e192227283c040
//{
//     "user": "667a579f94e90b02c652ea48",
//     "products": [
//       { "product": "66786d36de925cbd8c0d4c66", "quantity": 5 },
//       { "product": "667913d9aba5d1e5ab69ad99", "quantity": 4 }
//     ],
//     "totalAmount": 850.50
//   }
// {"name":"madhan","email":"madhan@gmail.com", "password": "password"}

// payment_api

// http://localhost:4000/api/v1/payments

// { 
//     "orderId": "66791a2f6594d4ed771f591c",
//     "amount": 750.5,
//     "paymentMethod": "paypal"
//   }
  