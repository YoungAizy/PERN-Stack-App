import Joi from 'joi';

const profileSchema = Joi.object({
    username: Joi.string().min(4).max(16).required(),
    sex: Joi.string().min(1).max(1).required(),
    company: Joi.string().min(0).max(100).optional(),
    position: Joi.string().min(0).max(20).optional(),
    account_type: Joi.string().max(13).required(),
    city: Joi.string().required(),
    dob: Joi.string().min(10).max(10).required()
})

const profileUpdateSchema = Joi.object({
    username: Joi.string().min(4),
    sex: Joi.string().min(1).max(1),
    city: Joi.string(),
    dob: Joi.string(),
    userId: Joi.string().uuid().required()
})

export const validateProfile = (data)=>{ 
    const { error } = profileSchema.validate(data);
    if(error) throw error;
}
export const validateUpdate = (data)=>{ 
    const { error } = profileUpdateSchema.validate(data);
    if(error) throw error;
}