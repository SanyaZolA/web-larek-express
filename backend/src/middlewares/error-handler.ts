import { NextFunction, Request, Response } from 'express';
import { CelebrateError } from 'celebrate';
import BadRequestError from '../errors/bad-request-error';
import NotFoundError from '../errors/not-found-error';
import ConflictError from '../errors/conflict-error';

const errorMiddleware = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof CelebrateError) {
    return res.status(400).json({
      message: 'Ошибка валидации данных',
      details: err.details,
    });
  }

  if (err instanceof BadRequestError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof ConflictError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Обработка других ошибок
  return res.status(500).json({
    message: 'Что-то пошло не так на сервере.',
  });
};

export default errorMiddleware;
