"use strict";

function loadJSON(src, callback) {   
  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
  
  xobj.open('GET', src, true); 
  xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
          callback(xobj.responseText);
        }
  };

  xobj.send(null);  
}

document.addEventListener('DOMContentLoaded', function(){

  loadJSON('word.json', function(result){

    let words  = JSON.parse(result),
        vowelsObj = words['vowels'],
        vowelsSounds = Object.keys(vowelsObj);

    var vowels  = new engGrid(document.querySelector('.vowels'), {
        path: 'sounds/vowels/'
    });

    vowels.addSound(vowelsSounds);

    for(let i = 0; i < vowelsSounds.length; i++){

      let symbol = vowelsSounds[i],
          words  = vowelsObj[symbol]['words'];

      vowels.addWord(symbol, words);
    }

    vowels.init();

    let diphthongsObj     = words['diphtongs'],
        diphthongsSounds  = Object.keys(diphthongsObj);

    let diphthongs  = new engGrid(document.querySelector('.diphthongs'), {
        path: 'sounds/diphthongs/'
    });

    diphthongs.addSound(diphthongsSounds);


    for(let i = 0; i < diphthongsSounds.length; i++){

      let symbol = diphthongsSounds[i],
          words  = diphthongsObj[symbol]['words'];

      diphthongs.addWord(symbol, words);
    }

    diphthongs.init();

    let consonantsObj     = words['consonants'],
        consonantsSounds  = Object.keys(consonantsObj);

    let consonants  = new engGrid(document.querySelector('.consonants'), {
        path: 'sounds/consonants/'
    });

    consonants.addSound(consonantsSounds);

    for(let i = 0; i < consonantsSounds.length; i++){

      let symbol = consonantsSounds[i],
          words  = consonantsObj[symbol]['words'];

      consonants.addWord(symbol, words);
    }

    consonants.init();

  }); 

});
