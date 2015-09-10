# SMARTPAGE.js #

#### Javascript library for commonly used JS functions ####


## Features ##
The project have several neat addom features beside the code stuff. 
Inspiration: 
http://www.htmlgoodies.com/beyond/javascript/article.php/3887346


### NPM MODULES ###

##### Javascript documentation #####
 - Documentation is created using YUIDoc JS
 - Read about YUIDoc here:  http://yui.github.io/yuidoc/
 - And API Syntax, Comment temptales here: http://yui.github.io/yuidoc/syntax/index.html

##### UML Class Diagrams #####
 - Handled by NPM Module: Wavi
 - Read more: https://www.npmjs.com/package/wavi   
 - Overview is acreated using the CLI command: 
    - wavi --png website/example result/example.png
    - wavi --svg website/example result/example.svg
 


## Future Versions ##
The future versions might implement RequireJS to take control over the many different files that will come. 
As we move towards a more modular approach, RequireJS is a natural choice to handle loading and dependencies.



## Current API Functions ##

### NEW!
#### FadeElements - one at a time inclduding a custom delay
#### Reducing text by word limit


#### CachedSlideShow
#### CookieHandler
#### EqualRowHeights
#### FontChanger
#### YouTubePlayer

#### onResizeEnd() 
  - The function is used for resize events, or more specific, when they end.
  - The idea is not to have an event listener that fire´s on every resize event, as this easily can be triggered e.g. 40 times on a single resize. 



_____________________________________________________________________

## IDEAS ##
Have any ideas that would make out life easier during development?
If you havent godt the time for adding these, then:

Place ´em here :)

### Concrete ideas ###

 - function switchClass(elm, oldClass, newClass, callback) {}