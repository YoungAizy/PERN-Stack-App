import Joi from 'joi';

export const insertSchema = Joi.object({
    name: Joi.string().min(6).max(40).required(),
    description: Joi.string().min(20).required(),
    price_range: Joi.number().required(),
    str_sub: Joi.string().min(12).max(120).required(),
    city: Joi.string().min(5).max(20).required(),
    country: Joi.string().min(2).max(5).required(),
    created_by: Joi.string().required(),
    // created_by: Joi.number().required(),
    phone: Joi.string().max(10).optional(),
    phone_ext: Joi.string().min(2).max(5).optional(),
    email: Joi.string().email().min(10).max(40).optional(),
    website: Joi.string().uri().min(6).max(20).optional(),
}).exist();

export const updateSchema = Joi.object({
    name: Joi.string().min(6).max(40).optional(),
    description: Joi.string().min(20).optional(),
    price_range: Joi.number().optional(),
    str_sub: Joi.string().min(12).max(120).optional(),
    city: Joi.string().min(5).max(20).optional(),
    country: Joi.string().min(2).max(5).optional(),
    telephone: Joi.string().max(10).optional(),
    tel_ext: Joi.string().min(2).max(5).optional(),
    email_addr: Joi.string().email().min(10).max(40).optional(),
    web_addr: Joi.string().uri().min(6).max(20).optional(),
}).min(1);

export const filterSchema = Joi.object({
    name: Joi.string().min(6).max(40).optional(),
    price_range: Joi.number().optional(),
    city: Joi.string().min(5).max(20).optional(),
    country: Joi.string().min(2).max(5).optional(),
    min_price: Joi.number().optional(),
    max_price: Joi.number().optional(),
    min_rating: Joi.number().min(1).max(5).optional(),
    max_rating: Joi.number().min(1).max(5).optional(),
}).optional();