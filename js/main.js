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

  var engGrid = function(el, config){

    this.el = el;

    this.defaults = {
      'colClass': '.ui__col',
      'rowClass': '.ui__row',
      'overlayClass': '.ui__overlay',
      'closeButton': '.ui__overlay-close',
      'headerClass': '.ui__header',
      'path': 'sounds/',
      'pathWords': 'sounds/words/',
      'ext': '.mp3',
      'buttonClass': '.ui__button',
      'oWordClass': '.ui__o-word'
    };

    this.currentSound = '';

    for(let item in config){
      this.defaults[item] = config[item];
    }

     this.sounds =  {},
     this.words  = [];
  };


  engGrid.prototype.buildPath = function(path, ext, name){
    if(!Array.isArray(name)){
        return path + name + ext;
    }

    for(var i = 0, paths = []; i < name.length; i++){
        paths.push(path + name[i] + ext);
    }

    return paths;
  };


  engGrid.prototype.addSound = function(soundName){


    if(!Array.isArray(soundName)){
        this.sounds[soundName] = {
          'sound': this.buildPath(this.defaults['path'], this.defaults['ext'], soundName),
          'words': []
        };;
    }

    for(let i = 0; i < soundName.length; i++){
      let soundPath = this.buildPath(this.defaults['path'], this.defaults['ext'], soundName[i]);

      this.sounds[soundName[i]] = {
        'sound': soundPath,
        'words': []
      };
    }
  };

  engGrid.prototype.playSound = function(symbol){
    if(this.currentSound){
      this.currentSound.pause();
    }

    this.currentSound = new Audio(this.sounds[symbol].sound);
    this.currentSound.play();
  };

  engGrid.prototype.playWord = function(symbol, index){
    if(this.currentSound){
      this.currentSound.pause();
    }

    let word = this.sounds[symbol]['words'][index];

    this.currentSound = new Audio(this.buildPath(this.defaults['pathWords'], this.defaults['ext'], word));
    this.currentSound.play();
  }


  engGrid.prototype.addWord = function(symbol, word){
    let words = Object.keys(word);

    for(var i = 0; i < words.length; i++){
      this.sounds[symbol].words.push(words[i]);
    }

  };

  engGrid.prototype.bindUIActions = function(){

    let uiContainer     = this.el.querySelectorAll(this.defaults['colClass']),
        uiOverlay       = this.el.querySelector(this.defaults['overlayClass']),
        uiCloseButton   = this.el.querySelector(this.defaults['closeButton']);

    let _self = this,
        soundsNames = Object.keys(this.sounds);
    
    for(let i = 0; i < soundsNames.length; i++){

      let uiWords         = this.sounds[soundsNames[i]].words,
          uiCurrentCol    = uiContainer[i],
          uiCurrentButton = uiCurrentCol.querySelector(this.defaults['buttonClass']);

      if(!uiWords){
        uiCurrentCol.classList.add('is-empty');
      }

      uiCurrentCol.addEventListener('click', function(e){
        if(e.target !== this){
          return false;
        }

        _self.playSound(soundsNames[i]);

      });

      uiCurrentButton.addEventListener('click', function(){

          for(let j = 0; j < uiWords.length; j++){
            var word = document.createElement("div");
            word.setAttribute('class', _self.defaults['oWordClass'].replace('.', ''));

            var text  = document.createElement("span"),
                text2 = document.createElement("span");

            var t = text.appendChild(text2);

            t.innerHTML = uiWords[j];
            word.appendChild(text);

            word.addEventListener('click', function(){
                _self.playWord(soundsNames[i], j);
            });

            uiOverlay.appendChild(word);
          }

          uiOverlay.classList.add('is-active');
      });

    }

    uiCloseButton.addEventListener('click', function(){
      var oWords = document.querySelectorAll(_self.defaults['oWordClass']);

      oWords.forEach(function(elem){
          elem.parentNode.removeChild(elem);
      });

      uiOverlay.classList.remove('is-active');
    });

  }

  engGrid.prototype.init = function(){
    this.bindUIActions();
  };

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
