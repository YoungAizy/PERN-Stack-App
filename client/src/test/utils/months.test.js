import { days } from "../../utils/Months";

describe("Months utility helper objects",()=>{
    test('should first', () => { 
        //Arrange
        const expectation = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
        //Act
        const feb = days.feb;
        //Assert
        expect(feb).toStrictEqual(expectation)
     });

     test('days.thirty array should have 30 consecutive numbers', () => { 
         //Arrange
        const expectation = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
        //Act
        const thirty = days.thirty();
        //Assert
        expect(thirty).toStrictEqual(expectation)
      })
     test('days.thirtyOne array should have 31 consecutive numbers', () => { 
         //Arrange
        const expectation = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
        //Act
        const thirty1 = days.thirtyOne();
        //Assert
        expect(thirty1).toStrictEqual(expectation)
      })
})