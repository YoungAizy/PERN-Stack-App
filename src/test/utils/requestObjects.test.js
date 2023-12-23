import { profileSchema, newUser } from "../../utils/requestObjects";

describe("New User Object", ()=>{
    test('should map arguments to an object', () => {
        //Arrange 
        const expectedResult = {firstname: "Chris", surname: "Brown", email:"Chris@gmail.com", password: "Hello"}
        //Act
        const user = newUser("Chris", "Brown", "Chris@gmail.com","Hello");
        //Assert
        expect(user).toStrictEqual(expectedResult)
     });
    test('should map missing args as undefined', () => { 
        const user = newUser("Chris", "Brown", "Chris@gmail.com");
        const expectedResult = {firstname: "Chris", surname: "Brown", email:"Chris@gmail.com", password: undefined}
        expect(user).toStrictEqual(expectedResult)
     });
});

