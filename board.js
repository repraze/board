const {Random} = require('./random');
//const random = new Random(()=>0.999);

const random = Random.default();

const fn = function(){
    // return random.item(['a', 'b', 'c']);
    return random.shuffle(['a', 'b', 'c']);
};

function test(fn, n){
    return [...Array(n)]
        .map(()=>fn())
        .reduce((m, c)=>{
            let k = c.toString();
            m[k] = m[k] ? m[k] + 1 : 1;
            return m;
        }, {});
}

console.log(test(fn, 100000));
