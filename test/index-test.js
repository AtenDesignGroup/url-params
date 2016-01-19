// test/index-test.js
var expect = require('chai').expect

describe('urlParams', function() {
  var urlParams = require('../index');
  
  describe('Adds', function() {
    it('4 to foo', function() {
      expect(urlParams.add('http://www.example.com?foo=2+3', 'foo', 4))
       .to.equal('http://www.example.com/?foo=2+3+4');
    });

    it('4 and 5 to foo', function() {
      expect(urlParams.add('http://www.example.com?foo=2+3', 'foo', [4, 5]))
       .to.equal('http://www.example.com/?foo=2+3+4+5');
    });

    it('Only unique values', function() {
      expect(urlParams.add('http://www.example.com?foo=2+3', 'foo', '3'))
       .to.equal('http://www.example.com/?foo=2+3');
    });

    it('Numbers as strings', function() {
      expect(urlParams.add('http://www.example.com?foo=2+3', 'foo', 3))
       .to.equal('http://www.example.com/?foo=2+3');
    });

    it('Foo and a new value', function() {
      expect(urlParams.add('http://www.example.com', 'foo', 3))
       .to.equal('http://www.example.com/?foo=3');
    });

    it('A boolean value', function() {
      expect(urlParams.add('http://www.example.com', 'foo'))
       .to.equal('http://www.example.com/?foo=true');
    });

    it('Nothing if param exists and value is undefined', function() {
      expect(urlParams.add('http://www.example.com?foo=2+3+4', 'foo'))
       .to.equal('http://www.example.com?foo=2+3+4');
    });
  });

  describe('Removes', function() {
    it('3 from foo', function() {
      expect(urlParams.remove('http://www.example.com?foo=2+3', 'foo', 3))
        .to.equal('http://www.example.com/?foo=2');
    });

    it('2 and 3 from foo', function() {
      expect(urlParams.remove('http://www.example.com?foo=2+3+4', 'foo', [2, 3]))
        .to.equal('http://www.example.com/?foo=4');
    });

    it('Foo altogether', function() {
      expect(urlParams.remove('http://www.example.com?foo=2+3', 'foo'))
        .to.equal('http://www.example.com/');
    });

    it('Removes foo if it contains no values', function() {
      expect(urlParams.remove('http://www.example.com?foo=2', 'foo', 2))
        .to.equal('http://www.example.com/');
    });

    it('Nothing if the param doesn\'t exist.', function() {
      expect(urlParams.remove('http://www.example.com?foo=2', 'bar', 2))
        .to.equal('http://www.example.com?foo=2');
    });
  });

  describe('Set', function() {
    it('Foo to 3', function() {
      expect(urlParams.set('http://www.example.com?foo=2+3&bar=baz', 'foo', 3))
        .to.equal('http://www.example.com/?foo=3&bar=baz');
    });

    it('Foo to true', function() {
      expect(urlParams.set('http://www.example.com?foo=2+3', 'foo'))
        .to.equal('http://www.example.com/?foo=true');
    });

    it('Foo to 3+4', function() {
      expect(urlParams.set('http://www.example.com?foo=2', 'foo', [3, 4]))
        .to.equal('http://www.example.com/?foo=3+4');
    });
  });
});
