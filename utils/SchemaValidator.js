import Joi from 'joi';

const profileSchema = Joi.object({
    username: Joi.string().min(6).required(),
    sex: Joi.string().min(1).max(1).required(),
    company: Joi.string().max(100),
    position: Joi.string().max(20).optional(),
    account_type: Joi.string().max(13).required(),
    city: Joi.string().required(),
    dob: Joi.string().required()
})

const profileUpdateSchema = Joi.object({
    username: Joi.string().min(6),
    sex: Joi.string().min(1).max(1),
    city: Joi.string(),
    dob: Joi.string()
})

export const validateProfile = (data)=>{ 
    const { error } = profileSchema.validate(data);
    if(error) throw error;
}
export const validateUpdate = (data)=>{ 
    const { error } = profileUpdateSchema.validate(data);
    if(error) throw error;
}