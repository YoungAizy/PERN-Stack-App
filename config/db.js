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
                user: "postgres",
                host: "localhost",
                port:2345,
                database: 'test',
                password: "restaurant_App"
            })
            console.log("Connected to db.")
            
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