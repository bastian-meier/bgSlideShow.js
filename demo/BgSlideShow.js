(function() {
  window.BgSlideShow = (function() {
    var setSize, setStyle;

    BgSlideShow.prototype.bgssConfig = {
      animationDuration: 1
    };

    function BgSlideShow(animations, config) {
      var animation, key, value, _i, _len;
      if (animations == null) {
        animations = [];
      }
      if (config == null) {
        config = {};
      }
      this.animations = [];
      this.animationCounter = 0;
      for (_i = 0, _len = animations.length; _i < _len; _i++) {
        animation = animations[_i];
        this.addAnimation(animation);
      }
      for (key in config) {
        value = config[key];
        this.bgssConfig[key] = value;
      }
    }

    BgSlideShow.prototype.addAnimation = function(obj) {
      this.animations.push(obj);
      return this.inject();
    };

    BgSlideShow.prototype.injected = false;

    BgSlideShow.prototype.setBindings = function() {
      return window.onresize = (function(_this) {
        return function() {
          setSize(_this.element);
          return setSize(_this.element2);
        };
      })(this);
    };

    BgSlideShow.prototype.inject = function() {
      var body, style;
      if (this.injected === false) {
        this.injected = true;
        this.setBindings();
        body = document.getElementsByTagName("body")[0];
        this.element = document.createElement("div");
        this.element2 = document.createElement("div");
        body.appendChild(this.element);
        body.appendChild(this.element2);
        setStyle(this.element);
        setStyle(this.element2);
        style = document.createElement("style");
        style.id = "bg-slide-show-style";
        style.innerHTML = '@-webkit-keyframes bgssFadeIn{0%{opacity:0}100%{opacity:1}}@keyframes bgssFadeIn{0%{opacity:0}100%{opacity:1}}.bgssFadeIn{-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:bgssFadeIn;animation-name:bgssFadeIn}';
        document.getElementsByTagName("head")[0].appendChild(style);
        return this.start();
      }
    };

    setStyle = function(el) {
      setSize(el);
      el.style.position = "fixed";
      el.style.top = 0;
      el.style.left = 0;
      el.style.zIndex = -999;
      return el.className = "bgssFadeIn";
    };

    setSize = function(el) {
      var height, width;
      width = window.innerWidth;
      height = window.innerHeight;
      el.style.width = "" + width + "px";
      return el.style.height = "" + height + "px";
    };

    BgSlideShow.prototype.stop = function() {
      return this.animationLoopDisabled = true;
    };

    BgSlideShow.prototype.start = function() {
      this.animationLoopDisabled = false;
      return this.animationLoop();
    };

    BgSlideShow.prototype.animationLoop = function() {
      var index;
      if (this.animationLoopDisabled === false) {
        index = this.animationCounter % this.animations.length;
        this.animationCounter++;
        this.setClass(this.animations[index].className);
        return this.timeOutAnimate(this.animations[index].duration);
      }
    };

    BgSlideShow.prototype.timeOutAnimate = function(wait) {
      var f;
      f = (function(_this) {
        return function() {
          return _this.animationLoop();
        };
      })(this);
      return window.setTimeout(f, wait * 1000);
    };

    BgSlideShow.prototype.setClass = function(classname) {
      var fadeInElement, fadeOutElement;
      if (this.animationCounter % 2 === 0) {
        fadeInElement = this.element2;
        fadeOutElement = this.element;
      } else {
        fadeInElement = this.element;
        fadeOutElement = this.element2;
      }
      fadeInElement.className = "" + classname + " bgssFadeIn";
      fadeInElement.style.zIndex = -999;
      fadeInElement.style.webkitAnimationDuration = "" + this.bgssConfig.animationDuration + "s";
      fadeInElement.style.AnimationDuration = this.bgssConfig.animationDuration;
      fadeOutElement.className = fadeOutElement.className.split(' ')[0];
      return fadeOutElement.style.zIndex = -1000;
    };

    return BgSlideShow;

  })();

}).call(this);

//# sourceMappingURL=BgSlideShow.js.map
