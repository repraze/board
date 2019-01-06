class Random{
    constructor(rng){
        this._rng = rng;
    }

    static default(){
        return new Random(Math.random);
    }

    use(rgn){
        this._rng = rng;
    }

    int(min, max){
        return Math.floor(this._rng() * (max - min + 1)) + min;
    }

    float(min, max){
         return this._rng() * (max - min) + min;
    }

    boolean(){
        return this._rng() < 0.5;
    }

    item(list){
        return list[this.int(0, list.length - 1)];
    }

    // Fisher-Yates
    shuffle(inList){
        // copy to not touch original
        let list = [...inList];
        let current = list.length-1, pos, item;
        while(current){
            // pick random
            pos = this.int(0, current)
            // swap
            item = list[pos];
            list[pos] = list[current];
            list[current] = item;
            current-=1;
        }
        return list;
    }
}

let random = Random.default();
random.Random = Random;

module.exports = random;
