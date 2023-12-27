import 'dotenv/config';
import Postgres from 'pg';
const { Pool } = Postgres;

let instance;

class RestauranstDB{
    #db;

    constructor(){
        if(instance) throw new Error("New instance cannot be created!!");

        instance = this;
        this.connect();
    }

    connect(){
        try {
            this.#db = new Pool({
                user: process.env.DB_USER,
                host: process.env.DB_HOST,
                port:5432,
                database: process.env.DB_NAME,
                password: process.env.DB_PASSWORD
            })
            console.log("CONNECTED TO DB")
        } catch (error) {
            console.log("COULDN'T CONNECT TO THE DATABASE!");
            console.log(error);
        }
    }

    getConnection(){
        return this.#db;
    }
}

const RestauranstDB_Instance = Object.freeze(new RestauranstDB());
export default RestauranstDB_Instance;