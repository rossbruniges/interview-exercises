export class Accordion {
    constructor(parentElm, child, triggerCls, contentCls, initOpen = 0) {
        this.parentElm = parentElm;
        this.children = parentElm.querySelectorAll(child);
        this.childCls = child;
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
        var that = this;
        this.parentElm.addEventListener('click', function(e) {
            e.preventDefault();
            that.animateSections(e);
        });
        for (var i = 0; i < this.children.length; i++) {
           let child = this.children[i];
           child.dataset.index = i;
           child.querySelector(this.triggerCls).innerHTML = '<button>' + child.querySelector(this.triggerCls).innerHTML + '</button>';
           child.dataset.contentHeight = child.querySelector(this.contentCls).offsetHeight;
           this.open !== i ? child.dataset.open = false : child.dataset.open = true;
        }
    }
}
