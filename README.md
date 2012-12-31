# wordlist

Node.js library to check words in different languages.

[![Build Status](https://travis-ci.org/flogvit/wordlist.png)](https://travis-ci.org/flogvit/wordlist)

You can do something like this

	var wordlist = require('wordlist');
	wordlist.init('en', function() {
		if (wordlist.checkWord('en', 'test')) {
			console.log('The language en(glish) contains the word test');
		}
	});
	
For the moment you need to install wordlists yourself. These are installed
into the directory you choose and the filename is ../words_&lt;lang&gt;.txt
and contains a word for each line. One way of making wordlists 
is using the wordlists from aspell.
You can generate the wordlists from aspell like this:

	aspell -d en dump master > wordlists/words_en.txt

### addLanguage(lang, [directory,] callback)

This function will read a wordlist from file to be used. It will organize it
in memory for usage. You can have many languages in memory at the same time.

**directory** is optional and will use the lib/wordlists/ as default. A good
idea is to keep this outside of the module.

### addToLanguage(lang, to_lang, [directory,] callback)

This function will read a wordlist from a file to be added to another language.
Eg, you can do something like

	wordlist.addLanguage('en'..);
	wordlist.addToLanguage('en_GB', 'en'..);
	wordlist.addToLanguage('en_US', 'en'..);

And now you have all the GB and US words in the same internal "en" language.

### checkWord(lang, word)

This will check a word in a language and return true/false

### addWord(lang, word)

This will add a word to a language and return true if added or false if not.
It will return false if the word already exists.

### wordCount(lang)

Return the count of words in a language

### nextCharacters(lang, wordpart)

Returns an array with the next possible characters. Eg "tes" could return ['t'..]
for test, tester, testing etc. Giving you the next characters doesn't mean it
will be a full word, only that you will find a word at the end somewhere.