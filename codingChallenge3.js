'use strict';

////////////////////////////////////////////////////////////
// Coding Challenge #3
// Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time 
// as an arrow function, and using chaining!
// Test data:
// § Data 1: [5, 2, 4, 1, 15, 8, 3]
// § Data 2: [16, 6, 10, 5, 6, 1, 4]
// GOOD LUCK 

const calcAverageHumanAge = (ages) => {
    //console.log(ages)
    return ages.map(age=>{
        return age <= 2 ? 2 * age : 16 + age * 4
    }).filter((age, i, arr) => {
        return age >= 18
    }).reduce((acc,curAge, i, arr)=>{
        return acc + curAge/arr.length
    }, 0)
}
const testData1 = [5, 2, 4, 1, 15, 8, 3]
const testData2 = [16, 6, 10, 5, 6, 1, 4]
const avg1 = calcAverageHumanAge(testData1)
const avg2 = calcAverageHumanAge(testData2)
console.log(avg1, avg2)