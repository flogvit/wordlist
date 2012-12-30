Node.js library to check words in different languages.

You can do something like this

	var wordlist = require('wordlist');
	wordlist.init('en', function() {
		if (wordlist.checkWord('en', 'test')) {
			console.log('The language en(glish) contains the word test');
		}
	});
	
For the moment you need to install wordlists yourself. These are installed
into the directory lib/wordlists/words_&lt;lang&gt;.txt and contains a word for
each line. One way of making wordlists is using the wordlists from aspell.
You can generate the wordlists from aspell like this:

	aspell -d en dump master &gt; lib/wordlists/words_en.txt

