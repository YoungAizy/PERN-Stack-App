import db from '../config/db.js';
import statements from '../config/statements.js';
import User from "../models/User.model.js";
import RequestType from "../utils/constants/RequestType.js";

const client = db.getConnection();

export default class UserRepo {

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
        const values = [this.#user.full_name,this.#user.email,this.#user.hashedPassword,this.#user.userId]
        return client.query(statements.INSERT_USER,values).then(result=> result.rows[0]);
    }

    async update(request){
        let result;

        switch (request) {
            case RequestType.updateName:
                result = await this.#setNewName()
                break;
            case RequestType.updateEmail:
                result = await this.#setNewEmail();
                break;
            case RequestType.updatePassword:
                result = await this.#setNewPassword();
                break;
            default:
                //default behavior is updating both the name and email of the user
                result = await this.#setBoth();
                break;
        }
        return result;
    }
    async #setNewName(){
        const result = await client.query(statements.UPDATE_NAME,[this.#user.full_name,this.#user.email]);
        return result.rows[0];
    }
    async #setNewEmail(){
        const result = await client.query(statements.UPDATE_EMAIL,[this.#user.new_email,this.#user.email]);
        return result.rows[0];
    }
    #setBoth(){
        const values = [this.#user.full_name,this.#user.new_email,this.#user.email]
        return client.query(statements.UPDATE_USER,values).then(result=> result.rows[0]);

    }
    async #setNewPassword(){ 
        const result = await client.query(statements.UPDATE_PASSWORD,
            [this.#user.hashedPassword,this.#user.email]);
        return result.rowCount;
    }

    async retrieveCredentials(query){
        let result;
        switch (query) {
            case RequestType.updatePassword:
                result = this.#getPassword();
                break;
            case RequestType.LOGIN:
                result = this.#getEmailandPassword();
                break
            default:
                //default behavior is getting the email of the user
                result = this.#getEmail();
                break;
        }
        return result;
    }
    #getPassword(){
        return client.query(statements.FETCH_PASSWORD,[this.#user.email]).then(result=> result.rows[0].password) 
    }
    #getEmail(){ 
        statements.FETCH_EMAIL_PREPARED.values = [this.#user.email];
        return client.query(statements.FETCH_EMAIL_PREPARED).then(results => results);
    }
    #getEmailandPassword(){
        //select name and email fields from the db and send back to client when they hit the {update details} page to compare
        //cache the results for 24 hours only
        return client.query(statements.FETCH_LOGIN_CREDENTIALS,[this.#user.email]).then(result => result.rows[0]);
    }

    get name(){
        return client.query(statements.FETCH_NAME,[this.#user.email]).then(result=> result)
    }
    
    async delete(){
        let result = await client.query(statements.DELETE_USER, [this.#user.email]);
        return result;
    }
}