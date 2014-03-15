class window.BgSlideShow


  # the constructor takes an array of objects like this:
  # {className: 'bg-class-name', duration: 4000}
  # duration in ms
  constructor: (animations = []) ->

    # init vars
    @animations = []
    @animationCounter = 0
    for animation in animations
      @addAnimation(animation)


  # you can also set a single object
  addAnimation: (obj) ->
    # push the animation obj to the animations array
    @animations.push obj
    @inject()
  injected: false


  #
  setBindings: ->
    window.onresize = ()  =>
      setStyle @element
      setStyle @element2


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
      # and fire the initial animationLoop() call
      @animationLoop()


  setStyle = (el) ->
    # available width and height of the screen
    width = window.innerWidth
    height = window.innerHeight
    # setting styles and classnames to the element
    el.style.position = "fixed"
    el.style.width = "#{width}px"
    el.style.height = "#{height}px"
    el.style.top = 0
    el.style.left = 0
    el.style.zIndex = -999
    el.className = "animated null fadeIn"


  # loops through the animations array
  # animate the background-class changes
  # and calls the timeOutanimate funtion with
  # the duration of the current object
  animationLoop: ->
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
    window.setTimeout f, wait

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
    fadeInElement.className = "animated #{classname} fadeIn"
    # changes 'fadeIn' to 'fadeOut' for the 'fadeOutElement'
    fadeOutElement.className = "animated #{fadeOutElement.className.split(' ')[1]} fadeOut"