
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
      'oWordClass': '.ui__o-word',
      'words': {}
    };

    this.currentSound = '';

    for(let item in config){
      this.defaults[item] = config[item];
    }

     this.sounds =  this.defaults.words;
  }


  engGrid.prototype.playSound = function(sound){

    if(this.currentSound){
      this.currentSound.pause();
    }

    let soundPath = this.defaults.path + sound + this.defaults.ext;

    this.currentSound = new Audio(soundPath);
    this.currentSound.play();
  }

  engGrid.prototype.playWord = function(word){

    if(this.currentSound){
      this.currentSound.pause();
    }

    let soundPath = this.defaults.pathWords + word + this.defaults.ext;

    this.currentSound = new Audio(soundPath);
    this.currentSound.play();
  }

  engGrid.prototype.bindUIActions = function(){

    let uiContainer     = this.el.querySelectorAll(this.defaults['colClass']),
        uiOverlay       = this.el.querySelector(this.defaults['overlayClass']),
        uiCloseButton   = this.el.querySelector(this.defaults['closeButton']);

    let _self = this,
        soundsNames = Object.keys(this.sounds);

    for(let i = 0; i < soundsNames.length; i++){
      let uiWords         = Object.keys(this.sounds[soundsNames[i]].words),
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
            let word       = document.createElement("div"),
                _className = _self.defaults['oWordClass'].replace('.', '');

            word.setAttribute('class', _className.replace('.', ''));

            let wordWrapper  = document.createElement("span"),
                wordTooltip  = document.createElement("span"),
                wordText     = document.createElement("span");

            wordWrapper.setAttribute('class', _className + '__wrapper');
            wordTooltip.setAttribute('class', _className + '__tooltip');
            wordText.setAttribute('class', _className + '__text');

            let pron = _self.sounds[soundsNames[i]].words[uiWords[j]].pron;


            if(pron){
              wordTooltip.setAttribute('data-balloon', htmlDecode(pron));
              wordTooltip.setAttribute('data-balloon-pos', 'up');
            }

            let t      = wordWrapper.appendChild(wordTooltip),
                tChild = t.appendChild(wordText);

            tChild.innerHTML = uiWords[j];
            word.appendChild(wordWrapper);

            word.addEventListener('click', function(){
              _self.playWord(uiWords[j]);
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