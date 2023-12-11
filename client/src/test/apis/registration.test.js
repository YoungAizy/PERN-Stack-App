import requestBody from "../../utils/requestBody";
import { newUser, profileSchema } from "../../utils/requestObjects";
import { userRequests } from "../../utils/requestTypes";

describe("Testing jest",()=>{
    it("should pass",()=>{
        const sum = 2 + 2;
        expect(sum).toEqual(4);
    })
});

const email = {};
// describe("Registration Flow",()=>{
//     test('should first', () => { 
//         //Arrange
//         const user = newUser("Harry", "Poter", "", "HarryPotter7.");
//         const body = requestBody(userRequests.REGISTRATION, user);
//      })
// })