import Joi from "joi";

export default class User{
    #user;

    //Use Joi to draw up a schema for the User model
    #User_Schema = Joi.object({
        full_name: Joi.string().min(8).max(16).required(),
        username: Joi.string().alphanum().min(4).required(),
        email: Joi.string().email().lowercase().max(70).required(),
        password: Joi.string().min(7).max(19).required(),
        hashedPassword: Joi.string().length(60)
    });
    #Update_Login_Schema =Joi.object({
        _id: Joi.number(),
        name: Joi.string().min(8).max(16),
        email: Joi.string().email().lowercase().max(70),
        password: Joi.string().min(7).max(19).required(),
        hashedPassword: Joi.string().length(60)
    })
    constructor(data,request_type){
        this.#validate(data,request_type);
    }


    get user(){ return this.#user}
   

    #validate(data,request_type){
        //TODO: Use Joi to validate if the data complies with our schema and set isValid accordingly
        let schema;
        if(request_type === "new_user"){   
            schema = this.#User_Schema;
        }else{
            schema = this.#Update_Login_Schema;
        }
        const {error, value} = schema.validate(data);
        if(error) throw error;
        this.#user = value;
    }
}