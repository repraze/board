const valid = require('./core/valid');

try {
    valid(Infinity, valid.number.int.gt(4).gte(5));
}catch(e){
    console.log(e.message);
}

valid.number.strictlyPositive.safeInteger.lessThen
