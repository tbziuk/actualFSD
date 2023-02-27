const moment = require('moment');

const add = (date, days) => {
    let result = new Date(date);
    result.setDate(result.getDate() + days)
    return moment(result).format('DD MMM YYYY');
};

const distance = (dateOne, dateTwo) => {
    let date1 = new Date(dateOne);
    let date2 = new Date(dateTwo);
    let result = date1.getTime() - date2.getTime();
    result = result / (1000 * 60 * 60 * 24);
    result = Math.ceil(Math.abs(result));
    return result;
};

module.exports = {
    add: add,
    distance: distance,
};