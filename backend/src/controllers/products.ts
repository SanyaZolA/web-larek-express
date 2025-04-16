import { NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import BadRequestError from '../errors/bad-request-error';
import Product from '../models/models';
import ConflictError from '../errors/conflict-error';
import normalizedErrorMessage from '../../ulits/normalizedErrorMessage';

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
    const {
      description, image, category, price, title,
    } = req.body;
    const product = await Product.create({
      description, image, category, price, title,
    });
    return res.status(201).json({ message: 'Товар успешно создан', product });
  } catch (err) {
    console.log(err);
    if (err instanceof MongooseError.ValidationError) {
      return next(new BadRequestError(normalizedErrorMessage(err)));
    }
    if (err instanceof Error && err.message.includes('E11000')) {
      return next(new ConflictError('Товар с таким названием уже существует'));
    }
    return next(err);
  }
};
