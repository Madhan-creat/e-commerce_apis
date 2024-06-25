// src/controllers/orderController.ts
import { Request, Response } from 'express';
import Order from '../models/order';

const createOrder = (req: Request, res: Response) => {
  const { user, products, totalAmount } = req.body;
  
  const order = new Order({ user, products, totalAmount });
  console.log(order)
  order.save()
    .then(() => res.status(201).json({ message: 'Order created successfully' }))
    .catch((error) => res.status(400).json({ error: error.message }));
};

const getOrders = (req: Request, res: Response) => {
  console.log("jhdsgyyu")
  Order.find()
    .then((orders) => res.status(200).json(orders))
    .catch(() => res.status(500).json({ error: 'Failed to retrieve orders' }));
};

const getOrder = (req: Request, res: Response) => {
  Order.findById(req.params.id)
    .then((order) => {
      if (!order) return res.status(404).json({ message: 'Order not found' });
      res.status(200).json(order);
    })
    .catch(() => res.status(500).json({ error: 'Failed to retrieve order' }));
};

const updateOrder = (req: Request, res: Response) => {
  Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((order) => {
      if (!order) return res.status(404).json({ message: 'Order not found' });
      res.status(200).json(order);
    })
    .catch(() => res.status(500).json({ error: 'Failed to update order' }));
};

const deleteOrder = (req: Request, res: Response) => {
  Order.findByIdAndDelete(req.params.id)
    .then((order) => {
      if (!order) return res.status(404).json({ message: 'Order not found' });
      res.status(200).json({ message: 'Order deleted successfully' });
    })
    .catch(() => res.status(500).json({ error: 'Failed to delete order' }));
};

export { createOrder, getOrders, getOrder, updateOrder, deleteOrder };
