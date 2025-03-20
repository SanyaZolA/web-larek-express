import { NextFunction, Request, Response } from 'express';
import BadRequestError from '../errors/bad-request-error';
import NotFoundError from '../errors/not-found-error';
import ConflictError from '../errors/conflict-error';

// Обработчик ошибок
const errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof BadRequestError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof ConflictError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({
    message: 'Что-то пошло не так на сервере.',
  });
};

export default errorMiddleware;
