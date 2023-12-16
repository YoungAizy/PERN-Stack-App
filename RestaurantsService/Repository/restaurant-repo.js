import db from "../config/index.js";
import Query from "../config/queries.js"

const client = db.getConnection();

class Repository{

    async save(data){
        const result = await client.query(Query.add,data);
        console.log(result.rowCount)
        return result;
    }

    async retrieveOne(id,cb){
        const result = await client.query(Query.getOne, id);
        return result;
    }

    async retrieveAll(limit_param){
        const result = await client.query(Query.getAll,limit_param);
        return result;
    }
    
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