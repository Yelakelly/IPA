(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Подключение анонимного модуля
        define(['IPA'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Не работает с CommonJS напрямую,
        // только CommonJS-образными средами, которые поддерживают

        // module.exports, как Node.
        module.exports = factory(require('IPA'));
    } else {
        // Глобальные переменные браузера (root это window)
        root.IPA = factory(root.IPA);
    }
}(this, function () {

  var engGrid = function(el, options){

      var settings = {
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

      var currentSound = '';

      for(var item in options){
          settings[item] = options[item];
      }

      var sounds = settings.words;

      /**
       * Play a sound.
       * @function
       * @param {string} sound - The sound as name of file (.mp3).
       */

      function playSound(sound){
        if(currentSound){
          currentSound.pause();
        }

        var soundPath = settings.path + sound + settings.ext;

        currentSound = new Audio(soundPath);
        currentSound.play();
      }

      /**
       * Play a word.
       * @function
       * @param {string} word - The word as name of file (.mp3).
       */

      function playWord(word){
        if(currentSound){
            currentSound.pause();
        }

        var soundPath = settings.pathWords + word + settings.ext;

        currentSound = new Audio(soundPath);
        currentSound.play();
      }

      /**
       * Create markup of a word instance.
       * @function
       * @param {string} word - current word
       * @param {string} tooltip - tooltip on hover
       * @returns {string} markup - html instance of current word
       */

      function createWordHtml(word, tooltip){
          var markup       = document.createElement("div"),
              _className = settings['oWordClass'].replace('.', '');
          markup.setAttribute('class', _className.replace('.', ''));

          var wordWrapper  = document.createElement("span"),
              wordTooltip  = document.createElement("span"),
              wordText     = document.createElement("span");

          wordWrapper.setAttribute('class', _className + '__wrapper');
          wordTooltip.setAttribute('class', _className + '__tooltip');
          wordText.setAttribute('class', _className + '__text');

          var t = wordWrapper.appendChild(wordTooltip),
              tChild = t.appendChild(wordText);

          tChild.innerHTML = word;

          markup.appendChild(wordWrapper);

          if(tooltip){
              wordTooltip.setAttribute('data-balloon', htmlDecode(tooltip));
              wordTooltip.setAttribute('data-balloon-pos', 'up');
          }

          markup.addEventListener('click', function(){
              playWord(word);
          });

          return markup;
      }

      /**
       * Bind all events.
       * @function
       * @return {undefined}
       */

      function bindUIAction(){

          var uiContainer     = el.querySelectorAll(settings['colClass']),
              uiOverlay       = el.querySelector(settings['overlayClass']),
              uiCloseButton   = el.querySelector(settings['closeButton']);

          var soundsNames = Object.keys(sounds);

          for(var i = 0; i < soundsNames.length; i++){
              var uiCurrentCol    = uiContainer[i],
                  uiCurrentButton = uiCurrentCol.querySelector(settings['buttonClass']);

              (function(i){
                var uiWords = Object.keys(sounds[soundsNames[i]].words);

                if(!uiWords){
                    uiCurrentCol.classList.add('is-empty');
                }

                uiCurrentCol.addEventListener('click', function(e){
                    if(e.target !== this){
                        return false;
                    }
                    playSound(soundsNames[i]);
                });

                uiCurrentButton.addEventListener('click', function(){
                      for(var j = 0; j < uiWords.length; j++){
                          var pron = sounds[soundsNames[i]].words[uiWords[j]].pron;
                          uiOverlay.appendChild(createWordHtml(uiWords[j], pron));
                      }

                      uiOverlay.classList.add('is-active');
                  });

              })(i);
          }

          uiCloseButton.addEventListener('click', function(){
              var oWords = el.querySelectorAll(settings['oWordClass']);

              for(var i = 0; i < oWords.length; i++){
                  oWords[i].parentNode.removeChild(oWords[i]);
              }

              uiOverlay.classList.remove('is-active');
          });

      }

      bindUIAction();

      return {
        'playWord': playWord,
        'playSound': playSound
      }

  };

  return engGrid;

}));


