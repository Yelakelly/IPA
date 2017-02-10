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
        path: 'sounds/vowels/',
        words: vowelsObj
    });

    vowels.init();


    let diphthongsObj = words['diphtongs'];

    let diphthongs  = new engGrid(document.querySelector('.diphthongs'), {
        path: 'sounds/diphthongs/',
        words: diphthongsObj
    });

    diphthongs.init();

    let consonantsObj = words['consonants'];

    let consonants  = new engGrid(document.querySelector('.consonants'), {
        path: 'sounds/consonants/',
        words: consonantsObj
    });


    consonants.init();

  }); 

});
