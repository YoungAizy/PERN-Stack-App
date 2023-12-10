import {expect} from 'chai'
import {validateProfile} from '../../utils/SchemaValidator.js';

describe("Utilities", ()=>{
    describe("New User",()=>{
        it("should validate reviewer object with empty Company fields",()=>{
            //Arrange
            const reviewer = {username: "ayanda", sex:"F", dob:"25-03-1998", city:"Cape Town", account_type: "reviewer", company:"", position:""}

            //Act and Assert
            expect(()=>validateProfile(reviewer)).to.not.throw();
        })

        it("should validate reviewer object without Company fields",()=>{
            //Arrange
            const reviewer = {username: "ayanda", sex:"F", dob:"25-03-1998", city:"Cape Town", account_type: "reviewer"}

            //Act and Assert
            expect(()=>validateProfile(reviewer)).to.not.throw();
        })

        it("should throw on missing required field",()=>{
            //Arrange
            const reviewer = {username: "ayanda", sex:"F", city:"Cape Town", account_type: "reviewer"}

            //Act and Assert
            expect(()=>validateProfile(reviewer)).to.throw();
        })
    })
})