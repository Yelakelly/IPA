"use strict";

document.addEventListener('DOMContentLoaded', function(){

  // Create range of Numbers (0 .. 5)

  function rangeNumbers(i, j){
      for(var i = i, arr = []; i < j; i++){
          arr.push(i);
      }
      return arr;
  }

  var engUI = function(el, config){

    this.el = el;

    this.defaults = {
      'colClass': '.ui__col',
      'rowClass': '.ui__row',
      'overlayClass': '.ui__overlay',
      'closeButton': '.ui__overlay-close',
      'headerClass': '.ui__header',
      'path': 'sounds/',
      'ext': '.mp3',
      'buttonClass': '.ui__button',
      'oWordClass': '.ui__o-word'
    };

    for(var item in config){
      this.defaults[item] = config[item];
    }

     this.sounds =  [],
     this.words  = [];
  };


engUI.prototype.buildPath = function(path, ext, name){
  if(!Array.isArray(name)){
      return path + name + ext;
  }

  for(var i = 0, paths = []; i < name.length; i++){
      paths.push(path + name[i] + ext);
  }

  return paths;
};


engUI.prototype.addSound = function(soundName){
  var soundName = this.buildPath(this.defaults['path'], this.defaults['ext'], soundName);

  if(!Array.isArray(soundName)){
      this.sounds.push(soundName);
  }

  for(var i = 0; i < soundName.length; i++){
    this.sounds.push(soundName[i]);
  }

};

engUI.prototype.playSound = function(index){
  console.log(this.sounds[index]);
  new Audio(this.sounds[index]).play();
};

engUI.prototype.removeSound = function(index){
  return this.sounds.splice(index, 1)[0];
};

engUI.prototype.getSound = function(){
 return this.sounds;
};

engUI.prototype.addWord = function(word){
  if(!Array.isArray(word)){
      this.words.push(word);
  }

  for(var i = 0; i < word.length; i++){
    this.words.push(word[i]);
  }
};

engUI.prototype.getWords = function(){
  return this.words;
};

engUI.prototype.init = function(){

  let uiContainer     = this.el.querySelectorAll(this.defaults['colClass']),
      uiOverlay       = this.el.querySelector(this.defaults['overlayClass']),
      uiCloseButton   = this.el.querySelector(this.defaults['closeButton']);

  let _self = this;
 

  for(let i = 0; i < this.sounds.length; i++){

    let uiWord          = this.words[i],
        uiSound         = this.sounds[i],
        uiCurrentCol    = uiContainer[i],
        uiCurrentButton = uiCurrentCol.querySelector(this.defaults['buttonClass']);

    uiCurrentCol.addEventListener('click', function(e){
      if(e.target !== this){
          return false;
      }
      _self.playSound(i);
    });

    uiCurrentButton.addEventListener('click', function(){

      for(let j = 0; j < uiWord.length; j++){
        var word = document.createElement("div");
        word.setAttribute('class', _self.defaults['oWordClass'].replace('.', ''));

        var text  = document.createElement("span"),
            text2 = document.createElement("span");

        var t = text.appendChild(text2);

        t.innerHTML = uiWord[j];
        word.appendChild(text);

        word.addEventListener('click', function(){
            console.log(this.innerHTML);
        });

        uiOverlay.appendChild(word);
      }

      uiOverlay.classList.add('is-active')
  });

  }

  uiCloseButton.addEventListener('click', function(){
    var oWords = document.querySelectorAll(_self.defaults['oWordClass']);

    oWords.forEach(function(elem){
        elem.parentNode.removeChild(elem);
    });

    uiOverlay.classList.remove('is-active');

  });


};


  var soundNames  = rangeNumbers(1, 4),
      vowels      = new engUI(document.querySelector('.vowels'));

  vowels.addSound(soundNames);

  var vowelsWords   = [
      ['here is','what', 'up'],
      ['we', 'are', 'they'],
      ['yor', 'those', 'these']
  ];

  vowels.addWord(vowelsWords);
  vowels.init();

  var diphthongsWords = [
      ['here is','what', 'up'],
      ['we', 'are', 'they'],
      ['yor', 'those', 'these']
  ];

  var diphthongs = new engUI(document.querySelector('.diphtongs'), {
        path: 'sounds/diphthongs/'
  });

  var diphthongsSounds = [
      'ie',
      'ee',
      'ue',
      'au',
      'eu',
      'ei',
      'ai',
      'oi'
  ];

  diphthongs.addSound(diphthongsSounds);

  var vowelsWords   = [
      ['I','am', 'stupid'],
      ['Do', 'are', 'they'],
      ['yor', 'those', 'these']
  ];


  diphthongs.addWord(vowelsWords);
  diphthongs.init();


});
