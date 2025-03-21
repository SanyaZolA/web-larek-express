import { NextFunction, Request, Response } from 'express';
import Product from '../models/models';
import ConflictError from '../errors/conflict-error';

export const getProduct = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find();
    const response = {
      items: products.map((product) => ({
        image: {
          fileName: product.image.fileName,
          originalName: product.image.originalName,
        },
        _id: product._id,
        title: product.title,
        category: product.category,
        description: product.description,
        price: product.price,
      })),
      total: products.length,
    };
    return res.json(response);
  } catch (err) {
    return next(err);
  }
};

export const postProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = new Product(req.body);
    await product.save();
    return res.status(201).json({ message: 'Товар успешно создан', product });
  } catch (err: any) {
    if (err.code === 11000) {
      return next(new ConflictError('Товар с таким названием уже существует'));
    }
    return next(err);
  }
};
