/**
 * New node file
 */
 
require('should');
require("assert");
var wordlist = require('../lib/wordlist'); 

describe('wordlist', function() {
	describe('#addLanguage()', function() {
		it('should return on adding language norwegian', function(done) {
			wordlist.addLanguage('no', function() {
				done();
			});
		});
		it('should return on adding language english', function(done) {
			wordlist.addLanguage('en', function() {
				done();
			});
		});
		it('should read language english when loading from other directory', function(done) {
			wordlist.addLanguage('en', 'test/wordlists/', function() {
				done();
			});
		});
		it('should have removed the old words from english when loading from other directory', function() {
			wordlist.checkWord('en', 'test').should.be.false;
			wordlist.checkWord('en', 'testing').should.be.true;
		});
	});
	
	describe('#addToLanguage()', function() {
		it('should add to language en from en_GB', function(done) {
			wordlist.addToLanguage('en_GB', 'en', 'test/wordlists/', function() {
				done();
			});
		});
		it('should have the new word tester in en', function() {
			wordlist.checkWord('en', 'tester').should.be.true;
		});
		it('should have the old word testing in en', function() {
			wordlist.checkWord('en', 'testing').should.be.true;
		});
	});
	
	describe('#wordCount()', function() {
		it('should have populated words', function() {
			wordlist.wordCount().should.equal(5);
		});
		it('should return -1 on unknown language', function() {
			wordlist.wordCount('dummy').should.equal(-1);
		});
		it('should return 2 on language test', function() {
			wordlist.wordCount('test').should.equal(2);
		});
		it('should return 1 on language no', function() {
			wordlist.wordCount('no').should.equal(1);
		});
		it('should return 2 on language en', function() {
			wordlist.wordCount('en').should.equal(2);
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
		it('should know the word TESTING in language en', function() {
			wordlist.checkWord('en', 'testing').should.be.true;
		});
		it('should not know the word FRIGJØRING in language en', function() {
			wordlist.checkWord('en', 'FRIGJØRING').should.be.false;
		});
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