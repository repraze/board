const valid = require('./core/valid');

try{
    valid(5, valid.number.label('what').integer.not.greaterThan(4));
}catch(e){
    console.log(e.message);
}
