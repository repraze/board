const number = {
    validator : (value)=>(typeof value === 'number'),
    property : {
        get positive(){
            return {
                message : `be positive`,
                validator : (value)=>(value > 0)
            };
        },
        get nonPositive(){
            return {
                message : `be non positive`,
                validator : (value)=>(value <= 0)
            };
        },
        get negative(){
            return {
                message : `be negative`,
                validator : (value)=>(value < 0)
            };
        },
        get nonNegative(){
            return {
                message : `be non negative`,
                validator : (value)=>(value >= 0)
            };
        },

        get integer(){
            return {
                message : `be an integer`,
                validator : (value)=>(Number.isInteger(value))
            };
        },
        get safeInteger(){
            return {
                message : `be a safe integer`,
                validator : (value)=>(Number.isSafeInteger(value))
            };
        },

        get finite(){
            return {
                message : `be finite`,
                validator : (value)=>(Number.isFinite(value))
            };
        },
        get infinite(){
            return {
                message : `be infinite`,
                validator : (value)=>(value === Infinity || value === -Infinity)
            };
        },

        equal : (n)=>({
            message : `be equal to ${n}`,
            validator : (value)=>(value === n)
        }),
        greaterThan : (n)=>({
            message : `be greater than ${n}`,
            validator : (value)=>(value > n)
        }),
        greaterThanOrEqual : (n)=>({
            message : `be greater than or equal to ${n}`,
            validator : (value)=>(value >= n)
        }),
        lessThan : (n)=>({
            message : `be greater less than ${n}`,
            validator : (value)=>(value < n)
        }),
        lessThanOrEqual : (n)=>({
            message : `be less than or equal to ${n}`,
            validator : (value)=>(value <= n)
        }),

        inRange : (min, max)=>({
            message : `be in range [${min}, ${max}]`,
            validator : (value)=>(value > min && value < max)
        }),
    }
};

module.exports = number;
