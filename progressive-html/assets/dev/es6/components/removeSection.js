export class RemoveSection {
    constructor(parentElm, sectionCls) {
        this.parentElm = parentElm;
        this.sectionCls = sectionCls;

        this.init();
    }

    deleteThis(elm) {
        let target = elm.target;
        // only listen to clicks on the remove button element
        if (target.nodeName === "BUTTON" && target.classList.contains('btn--remove')) {
            this.parentElm.removeChild(target.closest(this.sectionCls));
        }
    }

    init() {
        let children = this.parentElm.querySelectorAll(this.sectionCls);
        // using event delegation to only bind one click hander
        // as nodes get removed we don't have to clean up any redundant click handlers
        this.parentElm.addEventListener('click', function(e) {
            e.preventDefault();
            this.deleteThis(e);
        }.bind(this));
        for (var i = 0; i < children.length; i++) {
            let button = document.createElement('button');
            button.innerText = 'Remove section';
            button.classList.add('btn', 'btn--remove');
            children[i].appendChild(button);
        }
    }
}
