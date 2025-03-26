import mongoose from 'mongoose';

interface IProduct {
  title: string;
  image: {
    fileName: string;
    originalName: string;
  };
  category: string;
  description: string;
  price: number;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    title: {
      type: String,
      minlength: [2, 'Минимальная длинна - 2 символа'],
      maxlength: [30, 'Максимальная длинна - 30 символов'],
      required: [true, 'Поле "title" обязательно'],
      unique: true,
    },
    image: {
      fileName: { type: String, required: true },
      originalName: { type: String, required: true },
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      default: null,
    },
  },
  { versionKey: false },
);

export default mongoose.model<IProduct>('product', productSchema);
