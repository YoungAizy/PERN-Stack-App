import db from "../config/index.js";
import Query from "../config/queries.js"
import constants from "../utils/constants/index.js";

const client = db.getConnection();

class Repository{

    async save(data){
        const result = await client.query(Query.add,data);
        console.log(result.rowCount)
        return result;
    }

    async retrieveOne(id,request){
        let result;
        switch (request) {
            case constants.partial.toLowerCase():
                result = await client.query(Query.getPartial,id);
                break;
        
            default:
                result = await client.query(Query.getOne, id);
                break;
        }
        return result;
    }

    async retrieveAll(limit_param){
        const result = await client.query(Query.getAll,limit_param);
        return result;
    }
    async retrieveTop(){
        const result = await client.query(Query.best_rated);
        return result;
    }
    //TODO: implement userListing method
    async userListings(){}
    
    async update(payload){
        const result = await client.query(Query.update,payload);
        return result;
    }

    async updateLike(id,req_type){
        let result;
        switch (req_type) {
            case "REMOVE":
                result = await client.query(Query.removeLike,id);
                break;
        
            default:
                result = await client.query(Query.newLike,id);
                break;
        }
        return result;
    }
    
    async delete(id){
        const result = await client.query(Query.delete,id);
        return result;
    }
}

export default Repository;