const number = {
    validator : (value)=>(typeof value === 'number'),
    prop : {
        pos : (value)=>(value >= 0),
        strictpos : (value)=>(value > 0),
        neg : (value)=>(value <= 0),
        strictneg : (value)=>(value < 0),


        int : (value)=>(value === (value | 0)),
        safeint : (value)=>(value === (value | 0) && value <= Number.isSafeInteger(value) && value >= Number.MIN_SAFE_INTEGER),
    },
    func : {
        fn : (fn)=>fn,

        eq : (n)=>(value)=>(value === n),
        neq : (n)=>(value)=>(value !== n),

        gt : (n)=>(value)=>(value > n),
        gte : (n)=>(value)=>(value >= n),

        lt : (n)=>(value)=>(value < n),
        lte : (n)=>(value)=>(value <= n),

        rg : (min, max)=>(value)=>(value > min && value < max),
        rge : (min, max)=>(value)=>(value >= min && value <= max),
    }
}

module.exports = number;
