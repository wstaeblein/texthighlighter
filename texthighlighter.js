/*  *******************************************************
    By Walter Staeblein - 2023
    MIT Licence - https://choosealicense.com/licenses/mit/

    https://github.com/wstaeblein/highlightTextarea
    *******************************************************/ 
class textHighlight {
    constructor(ele) {
        if (ele.tagName != 'TEXTAREA') { throw 'The element must be a textarea'; }

        let styles = window.getComputedStyle(ele);
        this.origBkgColor = styles.backgroundColor;
        this.ele = ele;
        this.searchArg = '';
        this.sensitive = false;
        this.sel = -1;

        this.handlers = {
            input: this.#inputHandler.bind(this),
            scroll: this.#scrollHandler.bind(this)
        }

        this.ele.classList.add('htla-textarea');
        this.ele.addEventListener('input', this.handlers.input);
        this.ele.addEventListener('scroll', this.handlers.scroll);

        let nodeCont = document.createElement('div');
        nodeCont.classList.add('hlta-container');
        this.container = nodeCont;

        let nodeBack = document.createElement('div');
        nodeBack.classList.add('hlta-backdrop');    
        this.backdrop = nodeBack; 

        let nodeHilite = document.createElement('div');
        nodeHilite.classList.add('hlta-highlight');  
        this.hilite = nodeHilite;

        this.ele.parentNode.insertBefore(nodeCont, this.ele.nextSibling);
        this.backdrop.append(this.hilite);
        this.container.append(this.backdrop);
        this.container.appendChild(this.ele);   

        let obs = new ResizeObserver(this.#resizeObs.bind(this)).observe(this.ele);
        this.#inputHandler();
    }
    
    search(arg, sensitive, word) {
        this.searchArg = arg;
        this.sensitive = !!sensitive;
        this.word = !!word;
        this.#inputHandler();
        this.sel = -1;
        this.next();
    }

    next() {
        this.sel +=1;
        this.#setSelection(true);
    }

    prev() {
        this.sel -=1;
        this.#setSelection(true);
    }

    count() {
        let eles = this.hilite.querySelectorAll('mark');
        return eles.length;
    }

    clear() { 
        this.searchArg  = '';
        this.hilite.innerHTML = this.hilite.textContent;
        this.sel = -1;
    }

    destroy() {
        this.ele.removeEventListener('input', this.handlers.input);
        this.ele.removeEventListener('scroll', this.handlers.scroll);

        this.container.parentNode.insertBefore(this.ele, this.container);
        while (this.container.firstChild) {
            this.container.removeChild(this.container.lastChild);
        }
        this.container.remove();
    }

    #resizeObs() {
        let styles = window.getComputedStyle(this.ele);
        let width = this.ele.scrollWidth; 
        let height = this.ele.offsetHeight;

        let css = `width: ${width}px; height: ${height}px; margin: ${styles.marginTop} ${styles.marginRight} ${styles.marginBottom} ${styles.marginLeft}; 
                   background-color: ${this.origBkgColor}`; 
        this.backdrop.style.cssText = css;
        this.#copyStyles(this.ele, this.hilite, ['width', 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'borderTop', 'letterSpacing',
                                                'borderLeft', 'borderRight', 'borderBottom', 'fontFamily', 'fontSize', 'fontWeight', 'lineHeight']);
        this.hilite.style.minHeight = styles.height;
        this.hilite.style.whiteSpace = 'pre-wrap';
    }

    #inputHandler() {
        this.hilite.innerHTML = this.#markText();
        this.#scrollHandler();
        if (this.sel > -1) { this.#setSelection(); }
    }

    #copyStyles(src, dest, styles2Copy) {
        let styles = window.getComputedStyle(src);
        styles2Copy.forEach((stl) => dest.style[stl] = styles[stl])
    }

    #markText() { 
        if (this.searchArg) { console.log(this.ele.value)
            let txt = this.ele.value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            let searchArg = this.searchArg.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            let boundary = this.word ? '\\b' : '';

            let re = new RegExp(boundary + '(' + this.#escapeString(searchArg) + ')' + boundary, 'g' + (this.sensitive ? '' : 'i')); 
            return txt.replace(re, '<mark>$&</mark>');
        } else {
            return txt;
        }
    }

    #escapeString(txt) {
        let specials = ['-', '[', ']', '/', '{', '}', '(', ')', '*', '+', '?', '.', '\\', '^', '$', '|'];
        return txt.replace(RegExp('[' + specials.join('\\') + ']', 'g'), '\\$&'); 
    }

    #scrollHandler() { 
        this.backdrop.scrollTop = this.ele.scrollTop || 0; 
        let sclLeft = this.ele.scrollLeft;
        this.backdrop.style.transform = (sclLeft > 0) ? 'translateX(' + -sclLeft + 'px)' : '';
    }

    #setSelection(scroll) {
        let eles = this.hilite.querySelectorAll('mark');
        let len = eles.length;

        if (this.sel >= len) { this.sel = 0; }
        if (this.sel < 0) { this.sel = len - 1; }

        for (let i = 0; i < len; ++i) {
            if (i == this.sel) {
                eles[i].classList.add('sel');
                if (scroll) { this.ele.scrollTop = eles[i].offsetTop > 10 ? eles[i].offsetTop - 10 : eles[i].offsetTop; }
            } else {
                eles[i].classList.remove('sel');
            }
        }
    }
}