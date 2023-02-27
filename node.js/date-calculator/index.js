const calculate = require('./date-calculator/calculate');

//USTAWIENIA
//data musi zostać podana w formacie (MM/DD/YYYY)

console.log(`\x1B[32m${(calculate.add('02/27/2023', 66))}\x1B[37m`);

console.log(`\x1B[35m${(calculate.distance('02/27/2023', '05/04/2023'))} dni\x1B[37m`);