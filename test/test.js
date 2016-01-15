var should = require('should');
var main = require('../index');

describe('Split Forward Slashes', function(){
    it('Should split on basic slashes', function(){
        var splitText = main('hello/world/how/are/you');
        splitText.length.should.be.equal(5);
        splitText.should.not.containDeep('/');
    });
    it('Should escape slashes', function(){
        var splitText = main('hello/world//how');
        splitText.length.should.be.equal(2);
        splitText[1].should.be.equal('world/how');
    });    
    it('Should handle two escaped slashes in a row', function(){
        var splitText = main('hello/world////how are you');
        splitText.length.should.be.equal(2);
        splitText[0].should.be.equal('hello');
        splitText[1].should.be.equal('world//how are you');
    });   
    it('Should handle three escaped slashes in a row', function(){
        var splitText = main('hello/world//////how are you');
        splitText.length.should.be.equal(2);
        splitText[0].should.be.equal('hello');
        splitText[1].should.be.equal('world///how are you');
    });       
    it('Should handle three escaped slashes in a row with an unescaped in there with them', function(){
        var splitText = main('hello/world///////how are you');
        splitText.length.should.be.equal(3);
        splitText[0].should.be.equal('hello');
        splitText[1].should.be.equal('world///');
        splitText[2].should.be.equal('how are you');
    });       
    it('Should ignore end slashes', function(){
        var splitText = main('hello/world/');
        splitText.length.should.be.equal(2);
        splitText[0].should.be.equal('hello');
        splitText[1].should.be.equal('world');
    });        
    it('Should ignore beginning slashes', function(){
        var splitText = main('/hello/world');
        splitText.length.should.be.equal(2);
        splitText[0].should.be.equal('hello');
        splitText[1].should.be.equal('world');
    });    
    it('Should ignore beginning and end slashes', function(){
        var splitText = main('/hello/world/');
        splitText.length.should.be.equal(2);
        splitText[0].should.be.equal('hello');
        splitText[1].should.be.equal('world');
    });      
});