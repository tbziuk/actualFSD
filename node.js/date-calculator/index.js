const calculate = require('./date-calculator/calculate');

//USTAWIENIA
//data musi zostać podana w formacie (MMMM DD, YYYY hh:mm:ss)

console.log(`\x1B[32m${(calculate.add('February 27, 2023 10:16:50', 90))}\x1B[37m`);

console.log(`\x1B[35m${(calculate.distance('February 27, 2023 10:16:50', 'February 20, 2023 09:15:10'))} dni\x1B[37m`);