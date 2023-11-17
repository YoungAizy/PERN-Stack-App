import db from '../config/db.js';
import statements from '../config/statements.js';

import User from "../models/User.model.js";
import RequestType from "../utils/constants/RequestType.js";

const client = db.getConnection();
const mock_data = {
    0: {
        name: "Ayanda Marotya",
        email: "test1@gmail.com",
        username: "mdrez",
        password: "mypassword",
    },
    1: {
        name: "Ayanda Drai Marotya",
        email: "test2@gmail.com",
        username: "drai",
        password: "weakpassword",
    },
    2: {
        name: "Jake Peralta",
        email: "peralta1@gmail.com",
        username: "mdrez",
        password: "somethingElse"
    },

}

export default class UserRepo {

    //prepare the email select statement

    #user;
    constructor(user){
        this.#setUser(user);
    }
    #setUser(user){
        if(!(user instanceof User)) throw new Error("Argument type does not belong to 'User' model."); //use a throw instead
        this.#user = user.user;
        console.log("User in repo", this.#user)
    }
    
    async insert(){
        const values = [this.#user.full_name,this.#user.email,this.#user.hashedPassword]
        return await client.query(statements.INSERT_USER,values);
    }

    async update(request){
        let result;

        switch (request) {
            case RequestType.updateName:
                result = this.#setNewName()
                break;
            case RequestType.updateEmail:
                result = this.#setNewEmail();
                break;
            case RequestType.updatePassword:
                result = this.#setNewPassword();
                break;
            default:
                //default behavior is updating both the name and email of the user
                const values = [this.#user.name,this.#user.email]
                result = await client.query(statements.UPDATE_USER,values)
                break;
        }
        return result;
    }
    async #setNewPassword(){ return await client.query(statements.UPDATE_PASSWORD,this.#user.hashedPassword)}
    async #setNewName(){return await client.query(statements.UPDATE_NAME,this.#user.name)}
    async #setNewEmail(){return await client.query(statements.UPDATE_EMAIL,this.#user.email)}

    retrieve(query){
        let result;
        switch (query) {
            case RequestType.updatePassword:
                result = this.#getPassword();
                break;
            case RequestType.UPDATE:
                result = this.#getNameandEmail();
                break
            default:
                //default behavior is getting the email of the user
                result = this.#getEmail();
                break;
        }
        return result;
    }
    async #getPassword(){return await client.query(statements.FETCH_PASSWORD,this.#user._id)}
    async #getEmail(){ 
        statements.FETCH_EMAIL.values = email;
        return await client.query(statements.FETCH_EMAIL);
    }
    async #getNameandEmail(){
        //select name and email fields from the db and send back to client when they hit the {update details} page to compare
        //cache the results for 24 hours only
        return await client.query(statements.INSERT_USER,this.#user._id);
    }
    
    delete(email){}
}