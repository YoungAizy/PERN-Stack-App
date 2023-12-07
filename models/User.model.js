const Joi = require("joi");
const bcrypt = require('bcryptjs');
const RequestType = require("../utils/constants/RequestType.js");

exports.User = class User{
    #user;

    //Use Joi to draw up a schema for the User model
    #User_Schema = Joi.object({
        full_name: Joi.string().min(8).max(16).required(),
        email: Joi.string().email().lowercase().max(70).required(),
        password: Joi.string().min(7).max(19).required(),
        userId: Joi.string().uuid().required(),
        hashedPassword: Joi.string().length(60)
    });
    #Update_Login_Schema =Joi.object({
        userId: Joi.string().uuid(),
        full_name: Joi.string().min(8).max(16).optional(),
        email: Joi.string().email().lowercase().max(70),
        new_email: Joi.string().email().lowercase().max(70),
        password: Joi.string().min(7).max(19).required(),
        hashedPassword: Joi.string().length(60),
        new_password: Joi.string().min(7).max(19).optional(),
    });

    #defaultSchema = Joi.object({
        email: Joi.string().email().lowercase().max(70)
    })
    
    constructor(data,request_type){
        this.#validate(data,request_type);
    }


    get user(){ return this.#user}
   

    #validate(data,request_type){
        //TODO: Use Joi to validate if the data complies with our schema and set isValid accordingly
        let schema;
        console.log(request_type)
        if( request_type === RequestType.updatePassword){
            data.hashedPassword = bcrypt.hashSync(data.new_password, 8);
        }
        if(request_type === "new_user"){   
            data.hashedPassword = bcrypt.hashSync(data.password, 8);
            console.log("llll", data)
            schema = this.#User_Schema;
        }else if(request_type === "get_name"){
            schema = this.#defaultSchema;
        }else{
            schema = this.#Update_Login_Schema;
        }
        const {error, value} = schema.validate(data);
        if(error) throw error;
        this.#user = value;
    }
}