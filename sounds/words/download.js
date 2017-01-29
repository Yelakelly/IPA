var http = require('http');
var fs = require('fs');

var words = ['boy', 'destroy', 'employ', 'coin', 'choice', 'enjoy', 'join', 'royal', 'toy', 'oil', 'noise', 'soil'];

// var consonantsWords = [
//     ['part', 'pause', 'people', 'place', 
//     'problem', 'put', 'appear', 'opinion', 
//     'report', 'trasport' , 'help', 'hope'],

//     ['face', 'fail', 'belief', 'brief', 
//     'chief', 'after', 'before', 'cough', 
//     'enough', 'laugh', 'phase', 'phrase'],

//    ['take', 'talk', 'team', 'city', 
//    'later', 'letter', 'between', 'country', 
//    'its', 'about', 'but', 'different'],

//    ['thanks', 'theatre', 'theme', 'thin',
//    'threat', 'bath', 'both', 'death', 
//    'anything', 'everything', 'nothing', 'something'],

//    ['chair', 'challenge', 'champion', 'each', 
//    'much', 'reach', 'batch', 'catch', 
//    'sketch', 'achieve', 'teacher', 'adventure'],

//    ['celebrate', 'cell', 'cent', 'center', 
//    'sad', 'sale', 'same', 'experience', 
//    'face', 'ice', 'base', 'case'],

//    ['cash', 'crash', 'dish', 'commission', 
//    'depression', 'action', 'assumption', 'condition', 
//    'efficient', 'musician', 'racial', 'special'],

//    ['call', 'clock', 'coat', 'economy', 
//    'education', 'fact', 'account', 'accuse',
//    'attack', 'black', 'ache', 'archive'],

//    ['ball', 'bear', 'bird', 'able', 
//    'about', 'cabbage', 'club', 'disturb', 
//    'grab', 'pub', 'verb', 'web'],

//    ['valley', 'value', 'van', 'above', 
//     'arrive', 'believe', 'drive', 'expensive', 
//     'give', 'activity', 'available', 'cover'],

//     ['daisy', 'day', 'deal', 'already', 
//     'body', 'condition', 'bad', 'bed', 
//     'child', 'good', 'hide', 'today'],

//     ['than', 'that', 'the', 'although',
//     'either', 'bother', 'brother', 'clothing',
//     'bathe', 'booth', 'breathe', 'smooth'],

//     ['gentleman', 'gender', 'gene', 'general', 
//     'enjoy', 'injure', 'major', 'majority', 
//     'refrigerator', 'original', 'region', 'strategy'],

//     ['zapping', 'zebra', 'zero', 'zone', 
//     'zoo', 'amaze', 'booze', 'buzz', 
//     'breeze', 'citizen', 'crazy', 'dizzy'],

//     ['usually', 'conclusion', 'confusion', 'decision', 
//     'usual', 'visual', 'exposure', 'measure', 
//     'pleasure', 'collage', 'massage', 'disclosure'],

//     ['game', 'garden', 'gave', 'gear', 
//     'bag', 'big', 'bug', 'dialog', 
//     'again', 'ago', 'agree', 'begin'],

//     ['half', 'hand', 'happen' , 'hard', 
//     'who', 'whole', 'whose', 'alcohol', 
//     'behave', 'behaviour', 'behind', 'childhood'],

//     ['make', 'man', 'many', 'market', 
//     'almost', 'company', 'example', 'family', 
//     'arm', 'column', 'come', 'from'],

//     ['knee', 'knife', 'knock', 'know', 
//     'again', 'begin', 'between', 'can', 
//     'company', 'country', 'end', 'enough'],

//     ['bang', 'gang', 'hang', 'hanger', 
//     'bring', 'evening', 'king', 'morning', 
//     'along', 'belong', 'long', 'song'],

//     ['air', 'share', 'their', 'where', 
//     'hear', 'peer', 'year', 'door', 
//     'more', 'pour', 'war', 'were'],

//     ['large', 'last', 'late', 'also', 
//     'child', 'clear', 'actually', 'allow', 
//     'challenge', 'control', 'deal', 'feel'],

//     ['wait', 'wake', 'waste', 'walk', 
//     'wall', 'war', 'wander', 'wasp', 
//     'watch', 'want', 'wash', 'was'],

//     ['accumulate', 'cute', 'distribute', 'argue', 
//     'continue', 'hue', 'few', 'Matthew', 
//     'nephew', 'interview', 'review', 'view']

// ];

var url = 'http://packs.shtooka.net/eng-wcp-us/ogg/En-us-'; 

var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);
    });
  });
}

words.forEach(function(i, j ,arr){
	download(url + i + '.ogg', i + '.ogg')
});

// var url = 'http://packs.shtooka.net/eng-wcp-us/ogg/En-us-'; 







// // consonantsWords.forEach(function(i, j ,arr){
// // 	i.forEach(function(i, j, arr){
// // 		download(url + i + '.ogg', i + '.ogg')
// // 	});
// // });

// function getFilesizeInBytes(filename) {
//  var stats = fs.statSync(filename)
//  var fileSizeInBytes = stats["size"]
//  return fileSizeInBytes
// }


// function bytesToSize(bytes) {
//     var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
//     if (bytes == 0) return 'n/a';
//     var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
//     if (i == 0) return bytes;
//     return (bytes / Math.pow(1024, i)).toFixed(1);
// };

// const testFolder = '.';

// var badFiles = [];

// (function(){
// 	fs.readdir(testFolder, (err, files) => {
// 	  files.forEach(file => {
// 	  	if(Math.floor(Math.log(getFilesizeInBytes(file)) / Math.log(1024)) != 1 && file != 'node_modules'){
// 	  		var file = file.split('.');
// 	  		badFiles.push(file[0]);
// 	  	}
// 	  });

// 	  	var url = 'http://dictionary.cambridge.org/dictionary/english/';
// 		var request = require('request');
// 		var cheerio = require('cheerio');

// 		badFiles.forEach(function(i){
// 			var url = 'http://dictionary.cambridge.org/dictionary/english/' + i;

// 			request(url, function (error, response, body) {
// 			  if (!error && response.statusCode == 200) {
// 			    $ = cheerio.load(body);
// 			    var fileName = $('.audio_play_button.uk').data('src-mp3');
// 			    console.log(fileName);
// 			    download(fileName, i + '.mp3');
// 			  }
			  
			  
// 			});

// 		});

// 	});

	

// 	// var url = 'http://dictionary.cambridge.org/dictionary/english/';
// 	// var request = require('request');
// 	// var cheerio = require('cheerio');

// 	// badFiles.forEach(function(i){
// 	// 	var url = 'http://dictionary.cambridge.org/dictionary/english/' + i;
// 	// 	console.log(url);
// 	// 	request(url, function (error, response, body) {
// 	// 	  if (!error && response.statusCode == 200) {
// 	// 	    $ = cheerio.load(body);
// 	// 	    console.log(body);
// 	// 	    console.log($('.audio_play_button.uk').data('src-mp3'));
// 	// 	  }
// 	// 	});
// 	// });




// })(badFiles);



