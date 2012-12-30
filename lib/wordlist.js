
var   lineReader = require('line-reader')
	, path       = require('path')
	, fs 		 = require('fs');
        
var words = {   'no': {}
			  , 'en': {}
			  , 'test': {'t': {'e': {'s': {'t': {"\n": {}}}, "\n": {}}}}
			};

var wordcount = { 'test': 2};		

function init(lang, callback) {
	loadWordlist(lang, callback);
}

function loadWordlist(lang, callback) {
	var count = 0;
	var wpath = path.join(__dirname, 'wordlists', 'words_'+path.basename(lang)+ '.txt');
	console.log('Opening path: '+wpath);
	if (fs.existsSync(wpath)) {
		lineReader.eachLine(wpath, function(line) {
			// Remove first line which includes all characters
			// TODO: Store these characters
			line = line.replace(/(\r\n|\n|\r)/gm,"");
//  					console.log(line);
 			if (addWord(lang, line)) {
 				count++;
 			}
  		}).then(function() {
		  	console.log('Added '+count+' words to language: '+lang);
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
	// If lword now contains \n, this is a legal word
	if ("\n" in lword) {
		return true;
	}
	// Not a legal word
	return false;
};

exports.init = init;
exports.addWord = addWord;
exports.checkWord = checkWord;
exports.wordCount = wordCount;
