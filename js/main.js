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

  var engGrid = window.IPA;

  loadJSON('word.json', function(result){

    var words = JSON.parse(result);

    var vowels = engGrid(document.querySelector('.vowels'), {
        path: 'sounds/vowels/',
        words: words['vowels']
    });

    var diphthongs  = engGrid(document.querySelector('.diphthongs'), {
        path: 'sounds/diphthongs/',
        words: words['diphtongs']
    });


    var consonants  = engGrid(document.querySelector('.consonants'), {
        path: 'sounds/consonants/',
        words: words['consonants']
    });

  });

});
