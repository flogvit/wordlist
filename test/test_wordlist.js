/**
 * New node file
 */
 
require('should');
require("assert");
var wordlist = require('../lib/wordlist'); 

describe('wordlist', function() {
	describe('#init()', function() {
		it('should return on init language norwegian', function(done) {
			wordlist.init('no', function() {
				done();
			});
		});
	});
	
	describe('#wordCount()', function() {
		it('should have populated words', function() {
			wordlist.wordCount().should.be.above(2);
		});
		it('should return -1 on unknown language', function() {
			wordlist.wordCount('dummy').should.equal(-1);
		});
		it('should return 2 on language test', function() {
			wordlist.wordCount('test').should.equal(2);
		});
	});

	describe('#checkWord()', function() {
		it('unknown langauge should return false', function() {
			wordlist.checkWord('dummy', 'dummy').should.be.false;
		})
		it('should know the word te in language test', function() {
			wordlist.checkWord('test', 'te').should.be.true;
		})
		it('should know the word test in language test', function() {
			wordlist.checkWord('test', 'test').should.be.true;
		})
		it('should not know the word tes in language test', function() {
			wordlist.checkWord('test', 'tes').should.be.false;
		})
		it('should know the word TEST in language test', function() {
			wordlist.checkWord('test', 'TEST').should.be.true;
		})
		it('should know the word FRIGJØRING in language no', function() {
			wordlist.checkWord('no', 'FRIGJØRING').should.be.true;
		})
		it('should not know the word BFHEJF in language no', function() {
			wordlist.checkWord('no', 'BFHEJF').should.be.false;
		})
	});
	
	describe('#addWord()', function() {
		it('should return true when adding word testing to language test', function() {
			wordlist.addWord('test', 'testing').should.be.true;
		})
		it('should return one more word on count (3) after adding a word', function() {
			wordlist.wordCount('test').should.equal(3);
		})
		it('should return false when adding word testing to language test second time', function() {
			wordlist.addWord('test', 'testing').should.be.false;
		})
		
		
	});
});