const symbols = {
    validator : Symbol('validator')
};

const number = require('./types/number');

const types = {
    number,
};

class Validator{
    constructor(type){
        this.type = type;
        this.label = '';
        this.tests = [];
    }
    add(test){
        this.tests.push(test);
    }
}

const valid = new Proxy(function(){}, {
    apply : function(target, thisArg, args){
        const value = args[0];
        const validator = args[1][symbols.validator];

        for(let i = 0; i < validator.tests.length; ++i){
            const test = validator.tests[i];
            if(!test.validator(value)){
                const type = validator.type;
                if(i === 0){
                    throw new Error(`Expected \`${value}\` to be of type \`${type}\`, but received type \`${typeof value}\``);
                }else{
                    const label = validator.label ? `${type} ${validator.label}` : type;
                    throw new Error(`Expected ${label} to ${test.message}, got \`${value}\``);
                }
            }
        }
    },
    get : function(target, key){
        if(!(key in types)){
            throw new Error(`Invalid type \`${key}\` given`);
        }
        const type = types[key];
        const validator = new Validator(key);

        const proxy = new Proxy(validator, {
            get : function(validator, key){
                if(key === symbols.validator){
                    return validator;
                }else if(key === "label"){
                    return (name)=>{
                        validator.label = `\`${name}\``;
                        return proxy;
                    };
                }else if(key === "not"){
                    const originalAdd = validator.add;
                    validator.add = (test)=>{
                        validator.add = originalAdd;
                        const notTest = {
                            message : `not ${test.message}`,
                            validator : (value)=>(!test.validator(value))
                        };
                        validator.add(notTest);
                    };
                    return proxy;
                }else if(type.property && key in type.property){
                    const property = type.property[key];
                    if(typeof property === "function"){
                        return (...args)=>{
                            const test = property(...args);
                            validator.add(test);
                            return proxy;
                        };
                    }else{
                        const test = property;
                        validator.add(test);
                        return proxy;
                    }
                }else{
                    throw new Error(`Invalid check \`${key}\` given`);
                }
            }
        });

        return proxy;
    }
});

module.exports = valid;
