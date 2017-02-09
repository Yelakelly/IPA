
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
  }


  engGrid.prototype.buildPath = function(path, ext, name){
    if(!Array.isArray(name)){
        return path + name + ext;
    }

    for(var i = 0, paths = []; i < name.length; i++){
        paths.push(path + name[i] + ext);
    }

    return paths;
  }


  engGrid.prototype.playSound = function(symbol){
    if(this.currentSound){
      this.currentSound.pause();
    }

    this.currentSound = new Audio(this.sounds[symbol].sound);
    this.currentSound.play();
  }

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

  }


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

            console.log(uiWords[j]);

            var text  = document.createElement("span"),
                text2 = document.createElement("span");

            text2.setAttribute('data-balloon', 'Whats up!');
            text2.setAttribute('data-balloon-pos', 'up');

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
      var oWords = _self.el.querySelectorAll(_self.defaults['oWordClass']);

      oWords.forEach(function(elem){
          elem.parentNode.removeChild(elem);
      });

      uiOverlay.classList.remove('is-active');
    });

  }

  engGrid.prototype.init = function(){
    this.bindUIActions();
  };