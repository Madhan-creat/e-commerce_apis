// src/controllers/productController.ts
import { Request, Response } from 'express';
import Product from '../models/product';

const createProduct = (req: Request, res: Response) => {
  const { name, description, price, stock } = req.body;
  console.log(price);
  const product = new Product({ name, description, price, stock });
  product.save()
    .then(() => res.status(201).json({ message: 'Product created successfully' }))
    .catch(() => res.status(400).json({ error: 'Product not created' }));
};

const getProducts = (req: Request, res: Response) => {
  Product.find()
    .then((products) => res.status(200).json(products))
    .catch(() => res.status(500).json({ error: 'Failed to retrieve products' }));
};

const getProduct = (req: Request, res: Response) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.status(200).json(product);
    })
    .catch(() => res.status(500).json({ error: 'Failed to retrieve product' }));
};

const updateProduct = (req: Request, res: Response) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((product) => {
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.status(200).json(product);
    })
    .catch(() => res.status(500).json({ error: 'Failed to update product' }));
};

const deleteProduct = (req: Request, res: Response) => {
  Product.findByIdAndDelete(req.params.id)
    .then((product) => {
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.status(200).json({ message: 'Product deleted successfully' });
    })
    .catch(() => res.status(500).json({ error: 'Failed to delete product' }));
};

export { createProduct, getProducts, getProduct, updateProduct, deleteProduct };
