// src/routes/productRoutes.ts
import { Router } from 'express';
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from '../controllers/productController';
import verifyToken from '../middlewares/auth';
const Productrouter = Router();
Productrouter.post('/createProduct', createProduct);
Productrouter.get('/getProducts', getProducts);
Productrouter.get('/getProduct/:id', getProduct);
Productrouter.put('/updateProduct/:id', updateProduct);
Productrouter.delete('/deleteProduct/:id',  deleteProduct);

export default Productrouter;
