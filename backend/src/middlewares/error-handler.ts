import { NextFunction, Request, Response } from 'express';
import { CelebrateError } from 'celebrate';
import { StatusCodes } from 'http-status-codes';
import BadRequestError from '../errors/bad-request-error';
import NotFoundError from '../errors/not-found-error';
import ConflictError from '../errors/conflict-error';

const extractCelebrateErrorMessage = (err: CelebrateError): string => {
  const errorDetails = err.details;
  let errorMessage = 'Ошибка валидации';

  errorDetails.forEach((errorDetail) => {
    if (errorDetail && errorDetail.details && Array.isArray(errorDetail.details)
      && errorDetail.details.length > 0) {
      errorMessage = errorDetail.details[0].message;
    }
  });

  return errorMessage;
};

const errorMiddleware = (err: any, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CelebrateError) {
    const message = extractCelebrateErrorMessage(err);
    return res.status(400).send({ message });
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

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: 'На сервере произошла ошибка',
  });
  return next(err);
};

export default errorMiddleware;
