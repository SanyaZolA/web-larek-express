import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { errors } from 'celebrate';
import { errorLogger, requestLogger } from './middlewares/logger';
import productRoutes from './routes/product';
import orderRoute from './routes/order';
import errorMiddleware from './middlewares/error-handler';

const app = express();
dotenv.config();
const { PORT, DB_ADDRESS } = process.env;

// Логирование всех запросов
app.use(requestLogger);

// Мидлвары для обработки запросов
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

if (!DB_ADDRESS) {
  throw new Error('DB_ADDRESS нет в .env');
}

// Подключаем базу данных
mongoose.connect(DB_ADDRESS);

// Маршруты и валидация
app.use('/product', productRoutes);
app.use('/order', orderRoute);

// Обработка ошибок валидации celebrate
app.use(errors());

// Логирование ошибок
app.use(errorLogger);

// Общий обработчик ошибок
app.use(errorMiddleware);

app.listen(PORT);
