# Highlight Textarea

Vanilla JS class to highlight search results in a textarea while maintaining the area's functionality

##### [DEMO](https://wstaeblein.github.io/highlightTextarea/)

- No dependencies
- Can be used in as many textareas as needed, just instantiate for each one.
- Responsive. The markings will adjust to screen size
- Keeps the original background from the textarea
- Can be properly destroyed. Will remove all events and structure
- Case insensitive search


Use this class if you need to highlight search results or anything else in a textarea. Its use is very straightforward, instantiate the class for the textarea you need and call the search method to highlight the text

```javascript
let tarea = document.getElementById('txt');
let hilite = new textareaHighlight(tarea);

let searchResult = '';
hilite.search(searchResult)
```

Should you need to clear out the marking, call the clear method

```javascript
hilite.clear();
```

When it falls out of scope, just call the destroy method and all will be as it was before instantiation.

```javascript
hilite.destroy();
```


This class was inspired by lonekorean's [highlight-within-textarea](https://github.com/lonekorean/highlight-within-textarea) JQuery plugin. Basically I needed such functionality but didn't want to include JQuery just for that. 