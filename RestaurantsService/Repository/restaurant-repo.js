import db from "../config/index.js";
import Query from "../config/queries.js"

const client = db.getConnection();

class Repository{


    async save(data,cb){
        try {
            const result = await client.query(Query.add,data);
            cb(null,result);
        } catch (error) {
            console.log("ERROR OCCURED: ----",error)
            cb(error);
        }
    }

    async retrieve(id,cb){
        try {
            const result = await client.query(Query.get,id);
            cb(null,result);
        } catch (error) {
            console.log("ERROR OCCURED: ----",error)
            cb(error);
        }
    }

    async retrieveAll(limit_param){
        try {
            const result = await client.query(Query.getAll,limit_param)
        } catch (error) {
            console.log("ERROR OCCURED: ----",error);
            cb(error);
        }
    }
    
    async update(id){}
    
    async delete(id){}
}

export default Repository;