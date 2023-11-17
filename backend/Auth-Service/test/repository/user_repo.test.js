import User from "../../models/User.model.js";
import UserRepo from "../../repository/user_repo.js";
import { expect } from "chai";

describe("User Repo",function(){
    describe("Constructor", function(){
        it("should throw an Error if passed argument isn't an instance of User model class.", function(){
            const user = {full_name:"Mike Epps", username:"mikey",email:"mikey@hotmail.com",password:"mypassword100"};
            expect(()=> new UserRepo(user)).to.throw();
        });
        it("should accept only arguments that are instances of User model class.", function(){
            const user = new User({full_name:"Mike Epps", username:"mikey",email:"mikey@hotmail.com",password:"mypassword100"},"new_user");
            expect(()=> new UserRepo(user)).to.not.throw(Error,/Argument type does not belong to 'User' model./);
        });
    });
   
});