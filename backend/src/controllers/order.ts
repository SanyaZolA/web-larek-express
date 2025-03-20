import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/models';
import BadRequestError from '../errors/bad-request-error';

export const postOrder = async (req: Request, res: Response, next: NextFunction) => {
  const {
    items, total,
  } = req.body;

  try {
    const products = await Product.find({ _id: { $in: items } });
    const calculatedTotal = products.reduce((totalPrice: number, product) => {
      if (product.price === null) {
        throw new BadRequestError('Товар не продается');
      }
      return totalPrice + (product.price || 0);
    }, 0);

    if (!Array.isArray(items) || items.length === 0) {
      return next(new BadRequestError('Корзина не должна быть пуста'));
    }

    if (calculatedTotal !== total) {
      return next(new BadRequestError('Сумма товаров не совпадает с указанной общей суммой'));
    }

    return res.status(201).json({
      id: faker.string.uuid(),
      total,
    });
  } catch (error) {
    return next(error);
  }
};

export default postOrder;
