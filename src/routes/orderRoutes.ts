import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { Router } from 'express';
import { createOrder, getOrders, getOrder, updateOrder, deleteOrder } from '../controllers/orderController';

const Orderrouter = Router();

// Create a new order
Orderrouter.post('/createorder', createOrder);

// Get all orders
Orderrouter.get('/getorders', getOrders);

// Get a specific order by ID
Orderrouter.get('/getorder/:id', getOrder);

// Update a specific order by ID
Orderrouter.put('/updateOrder/:id', updateOrder);

// Delete a specific order by ID
Orderrouter.delete('/deleteOrder/:id', deleteOrder);

export default Orderrouter;
