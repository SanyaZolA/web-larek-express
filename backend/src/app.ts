import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import { errorLogger, requestLogger } from './middlewares/logger';
import { validateProduct, validateOrder } from './middlewares/validatons';
import productRoutes from './routes/product';
import orderRoute from './routes/order';
import errorMiddleware from './middlewares/error-handler';

const app = express();

// Логирование всех запросов
app.use(requestLogger);

// Мидлвары для обработки запросов
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Подключаем базу данных
mongoose.connect('mongodb://127.0.0.1:27017/weblarek');

// Маршруты и валидация
app.use('/product', validateProduct, productRoutes);
app.use('/order', validateOrder, orderRoute);

// Обработка ошибок валидации celebrate
app.use(errors());

// Логирование ошибок
app.use(errorLogger);

// Общий обработчик ошибок
app.use(errorMiddleware);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
