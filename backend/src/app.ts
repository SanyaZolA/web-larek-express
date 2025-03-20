import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import { errorLogger, requestLogger } from './middlewares/logger';
import { validateProduct } from './middlewares/validatons';
import productRoutes from './routes/product';
import orderRoute from './routes/order';
import errorMiddleware from './middlewares/error-handler';

const app = express();
app.use(requestLogger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://127.0.0.1:27017/weblarek');

app.use('/product', validateProduct, productRoutes);
app.use('/order', orderRoute);
app.use(errors());
app.use(errorMiddleware);
app.use(errorLogger);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
