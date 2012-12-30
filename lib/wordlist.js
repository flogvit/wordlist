
var   lineReader = require('line-reader')
	, path       = require('path')
	, fs 		 = require('fs');
        
var words = { 'test': {'t': {'e': {'s': {'t': {"\n": {}}}, "\n": {}}}}
			};

var wordcount = { 'test': 2};		

var word_directory = path.join(__dirname, 'wordlists');

function addLanguage(lang, directory, callback) {
	// If it exists, we remove it first.
	if (lang in words) {
		removeLanguage(lang);
	}
	
	addToLanguage(lang, lang, directory, callback);
}

function addToLanguage(lang, to_lang, directory, callback) {
	if (callback === undefined) {
		callback = directory;
		directory = word_directory;
	}

	// We don't delete existing words when adding to language
	loadWordlist(lang, to_lang, directory, callback);
}

function removeLanguage(lang) {
	if (lang in words) {
		delete words[lang];
		words[lang] = {};
	}
	if (lang in wordcount) {
		wordcount[lang] = 0;
	}
}

function loadWordlist(lang, to_lang, directory, callback) {
	var count = 0;
	var wpath = path.join(directory, 'words_'+path.basename(lang)+ '.txt');
//	console.log('Opening path: '+wpath);
	if (fs.existsSync(wpath)) {
		lineReader.eachLine(wpath, function(line) {
			// Remove first line which includes all characters
			// TODO: Store these characters
			line = line.replace(/(\r\n|\n|\r)/gm,"");
//  					console.log(line);
 			if (addWord(to_lang, line)) {
 				count++;
 			}
  		}).then(function() {
//		  	console.log('Added '+count+' words to language: '+to_lang);
		  	callback();
  		});
  	} else {
  		console.log('Unknown wordlist: '+wpath);
  		callback();
  	}
};

function addWord(lang, word) {
//	console.log('Adding word: '+word+' to language: '+lang);
	// Convert everything to lowercase
	word = word.toLowerCase();
	
	var len = word.length;
	if (!(lang in words)) {
		words[lang] = {};
	}
	var lword = words[lang];
	for(var pos=0;pos<len;pos++) {
		var char = word.charAt(pos);
		if (!(char in lword)) {
			lword[char] = {};
		}
		lword = lword[char];
	}
	if (!("\n" in lword)) {
		lword["\n"] = {};
		if (!(lang in wordcount)) {
			wordcount[lang] = 0;
		}
		wordcount[lang] += 1;
		return true;
	}
	return false;
}			
			
function wordCount(lang) {
	// If we don't know the language, we return -1
	if (lang !== undefined && !(lang in wordcount)) {
		return -1;
	}	
	
	// If lang is set, return the count for the language
	if (lang !== undefined) {
		return wordcount[lang];
	} 
	
	// If lang is not set, sum up all the languages
	var count = 0;
	for(lang in words) {
		if (lang in wordcount) {
			count += wordcount[lang];
		}
	}
	return count;
};
  
function checkWord(lang, word) {
	// If we don't know the language, we return false
	if (!(lang in words)) {
		return false;
	}
	
	var lword = _findChar(lang, word);
	if (lword===false) {
		return false;
	}

	// If lword now contains \n, this is a legal word
	if ("\n" in lword) {
		return true;
	}
	// Not a legal word
	return false;
};

function _findChar(lang, word) {
	// convert to lowercase
	word = word.toLowerCase();
	
	// Walk through the letters and set lword to the last letter checked
	var len = word.length;
	var lword = words[lang];
	for(var pos=0;pos<len;pos++) {
		var char = word.charAt(pos);
		if (char in lword) {
			lword = lword[char];
		} else {
			return false;
		}
	}
	return lword;	
}

function nextCharacters(lang, wordpart) {
	// If we don't know the language, we return empty
	if (!(lang in words)) {
		return [];
	}
	
	var lword = _findChar(lang, wordpart);
	if (lword===false) {
		return [];
	}
	var result = [];
	for(var key in lword) {
		if (key != "\n") {
			result.push(key);
		}
	}
	result.sort();
	return result;
}

exports.addLanguage = addLanguage;
exports.addToLanguage = addToLanguage;
exports.addWord = addWord;
exports.checkWord = checkWord;
exports.wordCount = wordCount;
exports.nextCharacters = nextCharacters;
