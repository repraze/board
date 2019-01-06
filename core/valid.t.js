const {expect} = require('chai');
const valid = require('./valid');

describe('board', ()=>{
    describe('valid', ()=>{
        describe('number', ()=>{
            it('should not throw on valid number', ()=>{
                expect(()=>{
                    valid(1, valid.number);
                }).to.not.throw();
                expect(()=>{
                    valid(Number.MAX_SAFE_INTEGER, valid.number);
                }).to.not.throw();
            });
            it('should throw on invalid number', ()=>{
                expect(()=>{
                    valid("a string", valid.number);
                }).to.throw();
            });
        });
    });
});
