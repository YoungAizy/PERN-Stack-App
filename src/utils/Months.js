/* eslint-disable import/no-anonymous-default-export */
export const days = {
    feb: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],
    thirty() { return [...this.feb, 29,30]},
    thirtyOne() {return [...this.thirty(),31]}
}

export default [
    {month: "Jan", val: "01", days: days.thirtyOne()},
    {month: "Feb", val: "02",  days: days.feb},
    {month: "Mar", val: "03",  days: days.thirtyOne()},
    {month: "Apr", val: "04", days: days.thirty()},
    {month: "May", val: "05", days: days.thirtyOne()},
    {month: "June", val: "06", days: days.thirty()},
    {month: "July", val: "07", days: days.thirtyOne()},
    {month: "Aug", val: "08", days: days.thirtyOne()},
    {month: "Sep", val: "09", days: days.thirty()},
    {month: "Oct", val: "10", days: days.thirtyOne()},
    {month: "Nov", val: "11", days: days.thirty()},
    {month: "Dec", val: "12", days: days.thirtyOne()},
]