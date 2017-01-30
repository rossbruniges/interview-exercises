export class Accordion {
    constructor(parentElm, childCls, triggerCls, contentCls, initOpen = 0) {
        this.parentElm = parentElm;
        this.children = parentElm.querySelectorAll(childCls);
        this.childCls = childCls;
        this.triggerCls = triggerCls;
        this.contentCls = contentCls;
        this.open = initOpen;

        this.init();
    }

    animateSections(elm) {
        let parent = elm.target.closest(this.childCls);
        if (parseInt(parent.dataset.index, 10) !== this.open) {
            this.children[this.open].dataset.open = false;
            parent.dataset.open = true;
            this.open = parseInt(parent.dataset.index, 10);
        }
    }

    init() {
        // using event delegation to only bind one click event to the document
        // (not one for each list item - which there could be loads of)
        this.parentElm.addEventListener('click', function(e) {
            e.preventDefault();
            this.animateSections(e);
        }.bind(this));
        // we've got a nodeList - so forEach won't work consistently - so going old school
        for (var i = 0; i < this.children.length; i++) {
           let child = this.children[i];
           child.dataset.index = i;
           // wrap each title in a button to allow keyboard accessibility
           child.querySelector(this.triggerCls).innerHTML = '<button>' + child.querySelector(this.triggerCls).innerHTML + '</button>';
           child.dataset.contentHeight = child.querySelector(this.contentCls).offsetHeight;
           this.open !== i ? child.dataset.open = false : child.dataset.open = true;
        }
    }
}
