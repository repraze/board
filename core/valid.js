const check = Symbol('func');
const func = Symbol('func');

const number = {
    validator : (value)=>(typeof value === 'number'),
    [check] : {
        integer : (value)=>(value === (value | 0)),
    },
    [func] : {
        gt : (v)=>(value)=>(value > v),
        lt : (v)=>(value)=>(value < v),
    }
};

const validators = {
    number,
}

function runner(value, validator){
    for(let i = 0; i < validator.tests.length; ++i){
        const test = validator.tests[i];
        const pass = test(value);
        if(!pass){
            const type = validator.type
            if(i === 0){
                throw new Error(`Expected \`${value}\` to be of type \`${type}\`, but received type \`${typeof value}\``);
            }else{
                throw new Error(`Expected ${type} \`${value}\` to pass \`${test.key}\``);
            }
        }
    }
}

class Validator{
    constructor(type){
        this.type = type;
        this.tests = [];
    }
    add(test){
        this.tests.push(test);
    }
}

const valid = new Proxy(runner, {
    get : function(obj, key){
        if(!(key in validators)){
            throw new Error(`invalid type \`${key}\` given`);
        }
        const type = validators[key];
        const validator = new Validator(key);
        validator.add(type.validator);

        const proxy = new Proxy(validator, {
            get : function(validator, key){
                if(['type', 'tests'].includes(key)){
                    return validator[key];
                }else if(key in type[check]){
                    const name = `${key}`;
                    const test = type[check][key];
                    test.key = name;
                    validator.add(test);

                    return proxy;
                }else if(key in type[func]){
                    return (...args)=>{
                        const name = `${key}(${[...args].join(', ')})`;
                        const test = type[func][key](...args);
                        test.key = name;
                        validator.add(test);

                        return proxy;
                    };
                }else{
                    throw new Error(`invalid check \`${key}\` given`);
                }
            }
        });

        return proxy;
    }
});

module.exports = valid;

try {
    valid(5, valid.number.gt(4).gt(5));
}catch(e){
    console.log(e.message);
}
