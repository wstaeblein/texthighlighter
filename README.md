# Text Highlighter

Vanilla JS class to highlight search results in a textarea while maintaining the area's functionality.

##### [Check out the DEMO](https://wstaeblein.github.io/texthighlighter/)


## Features

- No dependencies
- Can be used in as many textareas as needed, just instantiate for each one.
- Responsive. The markings will adjust to screen size, textarea size and scroll.
- Keeps the original background from the textarea
- Can be properly destroyed. Will remove all events and structure.
- Can choose between case sensitive and insensitive search.


Use this class if you need to highlight search results or any text in a textarea. Its use is very straightforward, instantiate the class for the textarea you need and call the search method to highlight the text you pass in the first argument. The second argument is optional and takes a boolean that if true will make the search case sensitive. The default is case insensitive.


## Usage & Code Examples

Add the following files to your project:
- texthighlighter.js
- texthighlighter.css


```javascript
let tarea = document.getElementById('txt');
let hilite = new textHighlight(tarea);

let searchResult = 'Some Expression';
let sens = true;                        // Optional
hilite.search(searchResult, sens);
```

Should you need to clear out the highlights, call the clear method.

```javascript
hilite.clear();
```

When it falls out of scope, just call the destroy method and all will be as it was before instantiation.

```javascript
hilite.destroy();
```


## About

This class was inspired by lonekorean's [highlight-within-textarea](https://github.com/lonekorean/highlight-within-textarea) JQuery plugin. Basically, I needed a similar functionality for a project but didn't want to include JQuery just for that and didn't find any other such code. 

This class was tested in Chrome 110 and Firefox 110.



## Licence

This project is licensed under the [MIT Licence](https://github.com/wstaeblein/texthighlighter/blob/main/LICENSE)