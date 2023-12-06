import {expect} from "chai";
import User from "../../models/User.model.js";

describe("User Model",()=>{
    describe("Creating a new User",()=>{
        it("should accept only input defined by schema",()=>{
            const data = {full_name:"Mike Epps", username:"mikey",email:"mikey@hotmail.com",password:"mypassword100"}
            expect(()=>new User(data,"new_user")).to.not.throw();
        });
        it("should throw on invalid input",()=>{
            const data = ["Mike Eppa","mikey","mikey@hotmail.com","mylongpassword17"]
            expect(()=>new User(data,"new_user")).to.throw();
        })
        it("should return validated user object",()=>{
             //Arrange
             const data = {full_name:"Mike Lepps", username:"mikey",email:"mikey@hotmail.com",password:"mypassword100"}
             //Act
             const user = new User(data,"new_user");
             //Assert
             expect(user.user).to.be.deep.equal(data);
        });
    });
    describe("Updating a User",()=>{
        it('should pass arguments to update schema',()=>{
            const data = {name: "Josh Eddy",email:"JoshEddy@hotmail.com",password:"Jodypear100"}
            expect(()=>new User(data,"update_user")).to.not.throw();
        });
        it("should throw if update user is invalid",()=>{
            const data = {name:"Mike Eppa",username:"mikey",email:"mikey@hotmail.com",password:"mylongpassword17"}
            expect(()=>new User(data,"update_user")).to.throw();
        })
        it("schema should accept email only update",()=>{
            const data = {email:"Joshhot@yahoo.com",password:"Jodypear100"}
            expect(()=>new User(data,"update_user")).to.not.throw();
        })
        it("schema should accept name only update",()=>{
            const data = {name: "Jody Elma",password:"Jodypear100"}
            expect(()=>new User(data,"update_user")).to.not.throw();
        })
        it("schema should accept password only update",()=>{
            const data = {password:"Jody_pear100"}
            expect(()=>new User(data,"update_user")).to.not.throw();
        })
        it("should throw if password is not provided",()=>{
            const data = {name: "Josh Eddy",email:"JoshEddy@hotmail.com"}
            expect(()=>new User(data,"update_user")).to.throw();
        })
        it("should get the update schema object",()=>{
            //Arrange
            const data = {name: "Josh Eddy",email:"josheddy@hotmail.com",password:"Jodypear100"}
            //Act
            const user = new User(data,"update_user");
            //Assert
            expect(user.user).to.be.deep.equal(data);
        })
    });
    
})