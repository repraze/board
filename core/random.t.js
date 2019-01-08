const {expect} = require('chai');
const random = require('./random');

function repeat(n, fn){
    [...Array(n)].forEach((e, i)=>fn(i));
}

describe('board', ()=>{
    describe('random', ()=>{
        describe('int', ()=>{
            it('should generate random int in range', ()=>{
                repeat(100, ()=>{
                    const n = random.int(1, 6);
                    expect(n).to.be.above(0);
                    expect(n).to.be.below(7);
                });
            });
            it('should generate negative random int', ()=>{
                repeat(100, ()=>{
                    const n = random.int(-6, -1);
                    expect(n).to.be.above(-7);
                    expect(n).to.be.below(0);
                });
            });
            it('should generate only one int on narrow', ()=>{
                repeat(100, (r)=>{
                    const n = random.int(r + 5, r + 5);
                    expect(n).to.be.equal(r + 5);
                });
            });
            it('should sort min and max', ()=>{
                repeat(100, (r)=>{
                    const n = random.int(6, 1);
                    expect(n).to.be.above(0);
                    expect(n).to.be.below(7);
                });
            });
        });
    });
});
