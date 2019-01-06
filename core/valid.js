const SYMB_CHECK = Symbol('check');
const SYMB_FUNC = Symbol('func');
const SYMB_VALIDATOR = Symbol('validator');

const number = {
    validator : (value)=>(typeof value === 'number'),
    [SYMB_CHECK] : {
        integer : (value)=>(value === (value | 0)),
    },
    [SYMB_FUNC] : {
        gt : (v)=>(value)=>(value > v),
        lt : (v)=>(value)=>(value < v),
    }
};

const TYPES = {
    number,
}

const valid = new Proxy(function(){}, {
    apply : function(target, thisArg, args){
        const value = args[0];
        const validator = args[1][SYMB_VALIDATOR];
        for(let i = 0; i < validator.tests.length; ++i){
            const test = validator.tests[i];
            const pass = test(value);
            if(!pass){
                const type = validator.type;
                if(i === 0){
                    throw new Error(`Expected \`${value}\` to be of type \`${type}\`, but received type \`${typeof value}\``);
                }else{
                    throw new Error(`Expected ${type} \`${value}\` to pass \`${test.key}\``);
                }
            }
        }
    },
    get : function(target, key){
        if(!(key in TYPES)){
            throw new Error(`invalid type \`${key}\` given`);
        }
        const type = TYPES[key];
        const validator = {
            type : key,
            tests : [type.validator]
        };

        const proxy = new Proxy(validator, {
            get : function(validator, key){
                if(key === SYMB_VALIDATOR){
                    return validator;
                }else if(key in type[SYMB_CHECK]){
                    const name = `${key}`;
                    const test = type[SYMB_CHECK][key];
                    test.key = name;
                    validator.tests.push(test);
                    return proxy;
                }else if(key in type[SYMB_FUNC]){
                    return (...args)=>{
                        const name = `${key}(${[...args].join(', ')})`;
                        const test = type[SYMB_FUNC][key](...args);
                        test.key = name;
                        validator.tests.push(test);
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
