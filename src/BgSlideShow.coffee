class window.BgSlideShow

  # the config
  bgssConfig: {
    animationDuration: 1
  }

  # the constructor takes an array of objects like this:
  # {className: 'bg-class-name', duration: 4000}
  # duration in ms
  constructor: (animations = [], config = {}) ->

    # init vars
    @animations = []
    @animationCounter = 0
    for animation in animations
      @addAnimation(animation)
    for key, value of config
      @bgssConfig[key] = value

  # you can also set a single object
  addAnimation: (obj) ->
    # push the animation obj to the animations array
    @animations.push obj
    @inject()
  injected: false


  # sets bindings to important events
  setBindings: ->
    window.onresize = ()  =>
      setSize @element
      setSize @element2


  # the 2 divs for the background-classes will be injected to the DOM
  inject: ->
    # we only need to do it once
    if @injected is false
      @injected = true
      @setBindings()
      # finding body
      body = document.getElementsByTagName("body")[0]
      # create the 2 divs
      @element = document.createElement "div"
      @element2 = document.createElement "div"
      # append them to body
      body.appendChild @element
      body.appendChild @element2
      # set css styles to the elements
      setStyle @element
      setStyle @element2
      # and start the animation loop
      # creating style tag
      style = document.createElement "style"
      style.id = "bg-slide-show-style"
      style.innerHTML = '@-webkit-keyframes bgssFadeIn{0%{opacity:0}100%{opacity:1}}@keyframes bgssFadeIn{0%{opacity:0}100%{opacity:1}}.bgssFadeIn{-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:bgssFadeIn;animation-name:bgssFadeIn}'
      # append style tag to head
      document.getElementsByTagName("head")[0].appendChild style
      # start the animation loop
      @start()

  # set style of the elements on init
  setStyle = (el) ->
    setSize(el)
    # setting styles and classnames to the element
    el.style.position = "fixed"
    el.style.top = 0
    el.style.left = 0
    el.style.zIndex = -999
    el.className = "bgssFadeIn"


  # set size of the elements on init and on window.resize
  setSize = (el) ->
    # available width and height of the screen
    width = window.innerWidth
    height = window.innerHeight
    el.style.width = "#{width}px"
    el.style.height = "#{height}px"

  # method for stoping the animation loop
  stop: ->
    @animationLoopDisabled = true;


  # 're'starts the animation loop
  start: ->
    @animationLoopDisabled= false;
    @animationLoop()


  # loops through the animations array
  # animate the background-class changes
  # and calls the timeOutanimate funtion with
  # the duration of the current object
  animationLoop: ->
    if @animationLoopDisabled is false
      # coumpute the index of the next element to change to
      index = @animationCounter % @animations.length
      @animationCounter++

      # set the class to the element and fades the other element out
      @setClass(@animations[index].className)

      # waits for the given time and then calls @animate
      @timeOutAnimate(@animations[index].duration)


  # waits for the given time and then calls @animate
  timeOutAnimate: (wait) ->
    f = => @animationLoop();
    window.setTimeout f, wait * 1000

  # set the class to element and fadeOut to the other element
  setClass: (classname) ->
    # we have to change between the 2 divs to make a clean fadeIn / fadeOut
    if @animationCounter % 2 is 0
      fadeInElement = @element2
      fadeOutElement = @element
    else
      fadeInElement = @element
      fadeOutElement = @element2

    # sets the new background-class
    fadeInElement.className = "#{classname} bgssFadeIn"
    fadeInElement.style.zIndex = -999
    fadeInElement.style.webkitAnimationDuration = "#{@bgssConfig.animationDuration}s"
    fadeInElement.style.AnimationDuration = @bgssConfig.animationDuration

    # move the element under fadeInElement
    fadeOutElement.className = fadeOutElement.className.split(' ')[0]
    fadeOutElement.style.zIndex = -1000