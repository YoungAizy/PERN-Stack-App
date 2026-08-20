import { insertSchema, updateSchema} from '../validation/schema.js';
import mutationService from '../services/mutations.service.js'

export const addRestaurant = async (parent,{input},context,info)=>{
    console.log(input.name)
    const {error} = insertSchema.validate(input);
    console.log("ERROR:",error);
    if(error) return "validation Error";
    console.log("Input:", input);
 
    try {
        const result = await mutationService.createRestaurant(input);
        console.log(result)
        return result;
        
    } catch (error) {
        console.log("ERROR:", error)
        // onError(res,error,constants.upload);
    }
}

export const updateRestaurant = async(parent, {id, user_id, updateInput},context)=>{
    console.log(updateInput);
    const {error} = updateSchema.validate(updateInput);
    console.log("ERROR:",error);
    if(error || !id) return "An error occured while validating your payload.";

    try{
        const result = await mutationService.updateRestaurant(id,user_id,updateInput);
        console.log(result)
        return result;
    }catch(err){
        console.error(err);
    }
}

export const deleteRestaurant = async (parent, {id,user_id})=>{
    if(!id) return;

    try{
        const result = await mutationService.deleteRestaurant(id,user_id);
        console.log("Delete results:",result)
        return 1;
    }catch(err){
        console.error(err);
    }
}