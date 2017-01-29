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
      'pathWords': 'sounds/words/',
      'ext': '.mp3',
      'buttonClass': '.ui__button',
      'oWordClass': '.ui__o-word'
    };

    this.currentSound = '';

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
    if(this.currentSound){
      this.currentSound.pause();
    }

    this.currentSound = new Audio(this.sounds[index]);
    this.currentSound.play();
  };

  engUI.prototype.playWord = function(symbol, index){
    if(this.currentSound){
      this.currentSound.pause();
    }

    let word = this.words[symbol][index];


    this.currentSound = new Audio(this.buildPath(this.defaults['pathWords'], this.defaults['ext'], word));
    this.currentSound.play();
  }

  engUI.prototype.removeSound = function(index){
    return this.sounds.splice(index, 1)[0];
  };

  engUI.prototype.getSound = function(){
   return this.sounds;
  };

  engUI.prototype.addWord = function(word){
    if(!Array.isArray(word)){
        return false;
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

      if(!uiWord){
        uiCurrentCol.classList.add('is-empty');
      }

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
                _self.playWord(i, j);
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


  };


  var vowels       = new engUI(document.querySelector('.vowels'), {
        path: 'sounds/vowels/'
  });

  var vowelsSounds = ['æ', 'ɛ', 'i', 'ɔ', 
                      'ə', 'u', 'ʌ',
                      'a_l', 'i_l', 'u_l', 'ɔ_l', 'ə_l'];

  vowels.addSound(vowelsSounds);

  var vowelsWords = [
      ['and','bad', 'back',
      'pass', 'had', 'have', 'jacket',
      'happened', 'natural', 'sample', 'action',
      'after'],

      ['said', 'says', 'friend', 'guest', 
      'guess', 'when', 'them', 'head', 
      'end', 'best', 'test', 'red'],

      ['begin', 'big', 'bit', 'bring', 'did', 
      'different', 'finish', 'fish', 'fit', 
      'give' , 'hit', 'interest'],

      ['ought', 'ball', 'tall', 'mall', 
      'law', 'call', 'jaw', 'or', 
      'more', 'afford', 'raw', 'caught'],

      ['never', 'after', 'just', 'under', 
      'other', 'even', 'woman', 'family', 
      'student', 'us', 'again', 'another'],

      ['look', 'book', 'foot', 'good', 
      'put', 'push', 'pull', 'full', 
      'sugar', 'would', 'could', 'should'],

      ['some', 'company', 'much', 'country', 
      'other', 'under', 'until', 'understand', 
      'another', 'come', 'such', 'become'],

      ['army', 'car', 'party', 'garden', 'park', 
      'father', 'calm', 'palm', 'drama', 'last', 
      'class', 'dance', 'castle', 'half'],

      ['be', 'see', 'meet', 'sleep', 'meal', 
      'read', 'leave', 'sea', 'team', 
      'field', 'believe', 'receive'],

      ['do', 'juice', 'room', 'move', 
      'jewel', 'fruit', 'group', 'flew', 
      'crew', 'chew', 'blue', 'through'],

      ['for', 'more', 'also', 'talk', 
      'almost', 'although', 'already', 'organization', 
      'call', 'water', 'important', 'small'],

      ['bird', 'burden', 'heard', 'earth', 
      'occur', 'fur', 'word', 'hurt', 
      'search', 'circle', 'thirteen', 'return'],


  ];

  vowels.addWord(vowelsWords);
  vowels.init();

  var diphthongsWords = [
      ['year', 'hear', 'really', 'area', 'clear', 'material', 'here', 'ear', 'nearly', 'idea', 'near', 'career'],
      ['their', 'where', 'area', 'there', 'parent', 'air', 'yeah', 'various', 'care', 'wear', 'hair', 'share'],
      ['during', 'security' , 'hour', 'poor', 'tour', 'cure', 'jury', 'pure', 'sure', 'dour', 'manicure', 'mature'],
      ['out', 'owl', 'house', 'around', 'about', 'account', 'brown', 'tower', 'browse', 'how', 'now', 'row'],
      ['alone', 'gold', 'close', 'no', 'go', 'hole', 'hope', 'roll', 'lone', 'role', 'stone', 'almost'],
      ['paint', 'remain', 'rain', 'stay', 'sale', 'pain', 'gain', 'eight', 'great', 'ballet', 'break', 'weight'],
      ['die', 'lie', 'find', 'child', 'I', 'kind', 'high', 'light', 'try', 'why', 'by', 'cry'],
      ['boy', 'destroy', 'employ', 'coin', 'choice', 'enjoy', 'join', 'royal', 'toy', 'oil', 'noise', 'soil']
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
  diphthongs.addWord(diphthongsWords);
  diphthongs.init();

  // consonants

  var consonants = new engUI(document.querySelector('.consonants'), {
        path: 'sounds/consonants/'
  });

  var consonantsSounds = [
    'p', 'f', 't', 'θ', 'tʃ', 's', 'ʃ','k',
    'b', 'v', 'd', 'ð', 'dʒ', 'z', 'ʒ', 'g',
    'h', 'm', 'n', 'ŋ', 'r', 'l', 'w', 'j'
  ];

  var consonantsWords = [
    ['part', 'pause', 'people', 'place', 
    'problem', 'put', 'appear', 'opinion', 
    'report', 'transport' , 'help', 'hope'],

    ['face', 'fail', 'belief', 'brief', 
    'chief', 'after', 'before', 'cough', 
    'enough', 'laugh', 'phase', 'phrase'],

   ['take', 'talk', 'team', 'city', 
   'later', 'letter', 'between', 'country', 
   'its', 'about', 'but', 'different'],

   ['thanks', 'theatre', 'theme', 'thin',
   'threat', 'bath', 'both', 'death', 
   'anything', 'everything', 'nothing', 'something'],

   ['chair', 'challenge', 'champion', 'each', 
   'much', 'reach', 'batch', 'catch', 
   'sketch', 'achieve', 'teacher', 'adventure'],

   ['celebrate', 'cell', 'cent', 'center', 
   'sad', 'sale', 'same', 'experience', 
   'face', 'ice', 'base', 'case'],

   ['cash', 'crash', 'dish', 'commission', 
   'depression', 'action', 'assumption', 'condition', 
   'efficient', 'musician', 'racial', 'special'],

   ['call', 'clock', 'coat', 'economy', 
   'education', 'fact', 'account', 'accuse',
   'attack', 'black', 'ache', 'archive'],

   ['ball', 'bear', 'bird', 'able', 
   'about', 'cabbage', 'club', 'disturb', 
   'grab', 'pub', 'verb', 'web'],

   ['valley', 'value', 'van', 'above', 
    'arrive', 'believe', 'drive', 'expensive', 
    'give', 'activity', 'available', 'cover'],

    ['daisy', 'day', 'deal', 'already', 
    'body', 'condition', 'bad', 'bed', 
    'child', 'good', 'hide', 'today'],

    ['than', 'that', 'the', 'although',
    'either', 'bother', 'brother', 'clothing',
    'bathe', 'booth', 'breathe', 'smooth'],

    ['gentleman', 'gender', 'gene', 'general', 
    'enjoy', 'injure', 'major', 'majority', 
    'refrigerator', 'original', 'region', 'strategy'],

    ['zap', 'zebra', 'zero', 'zone', 
    'zoo', 'amaze', 'booze', 'buzz', 
    'breeze', 'citizen', 'crazy', 'dizzy'],

    ['usually', 'conclusion', 'confusion', 'decision', 
    'usual', 'visual', 'exposure', 'measure', 
    'pleasure', 'collage', 'massage', 'disclosure'],

    ['game', 'garden', 'gave', 'gear', 
    'bag', 'big', 'bug', 'dialogue', 
    'again', 'ago', 'agree', 'begin'],

    ['half', 'hand', 'happen' , 'hard', 
    'who', 'whole', 'whose', 'alcohol', 
    'behave', 'behaviour', 'behind', 'childhood'],

    ['make', 'man', 'many', 'market', 
    'almost', 'company', 'example', 'family', 
    'arm', 'column', 'come', 'from'],

    ['knee', 'knife', 'knock', 'know', 
    'again', 'begin', 'between', 'can', 
    'company', 'country', 'end', 'enough'],

    ['bang', 'gang', 'hang', 'hanger', 
    'bring', 'evening', 'king', 'morning', 
    'along', 'belong', 'long', 'song'],

    ['air', 'share', 'their', 'where', 
    'hear', 'peer', 'year', 'door', 
    'more', 'pour', 'war', 'were'],

    ['large', 'last', 'late', 'also', 
    'child', 'clear', 'actually', 'allow', 
    'challenge', 'control', 'deal', 'feel'],

    ['wait', 'wake', 'waste', 'walk', 
    'wall', 'war', 'wander', 'wasp', 
    'watch', 'want', 'wash', 'was'],

    ['accumulate', 'cute', 'distribute', 'argue', 
    'continue', 'hue', 'few', 'Matthew', 
    'nephew', 'interview', 'review', 'view']

  ];

  consonants.addSound(consonantsSounds);
  consonants.addWord(consonantsWords);
  consonants.init();


});
