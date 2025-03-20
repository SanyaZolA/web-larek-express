import { celebrate, Joi, Segments } from 'celebrate';

export const validateOrder = celebrate({
  [Segments.BODY]: Joi.object().keys({
    items: Joi.array()
      .items(Joi.string().length(24).hex())
      .min(1)
      .messages({
        'array.min': 'Должен быть хотя бы один товар',
        'string.length': 'Некорректный формат ID товара',
      }),

    total: Joi.number().min(1).required().messages({
      'number.min': 'Сумма заказа должна быть положительной',
      'any.required': 'Поле "total" обязательно',
    }),

    payment: Joi.string().valid('card', 'online').required().messages({
      'any.only': 'Способ оплаты должен быть "card" или "online"',
      'any.required': 'Поле "payment" обязательно',
    }),

    email: Joi.string().email().required().messages({
      'string.email': 'Некорректный email',
      'any.required': 'Поле "email" обязательно',
    }),

    phone: Joi.string()
      .required()
      .messages({
        'string.pattern.base': 'Неверный формат телефона, должен быть +7XXXXXXXXXX',
        'any.required': 'Поле "phone" обязательно',
      }),

    address: Joi.string().min(1).required().messages({
      'string.min': 'Адрес должен содержать минимум 5 символов',
      'any.required': 'Поле "address" обязательно',
    }),
  }),
});

export const validateProduct = celebrate({
  [Segments.BODY]: Joi.object().keys({
    description: Joi.string().messages({
      'string.base': 'Описание должно быть строкой',
    }),

    image: Joi.object()
      .keys({
        fileName: Joi.string().required().messages({
          'string.empty': 'Должен быть путь до файла',
        }),
        originalName: Joi.string().required().messages({
          'string.empty': 'Наличие имени обязательно',
        }),
      })
      .required()
      .messages({
        'any.required': 'Поле "image" обязательно и должно содержать "fileName", "originalName"',
      }),

    title: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Некорректный формат имени',
        'any.required': 'Поле "title" обязательно',
      }),

    category: Joi.string()
      .required()
      .messages({
        'string.pattern.base': 'Неверный формат телефона, должен быть +7XXXXXXXXXX',
        'any.required': 'Поле "phone" обязательно',
      }),

    price: Joi.number().allow(null).messages({
      'number.base': 'Цена должна быть числом или null',
    }),
  }),
});
