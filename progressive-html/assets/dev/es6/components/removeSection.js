export class RemoveSection {
    constructor(parentElm, sectionCls) {
        this.parentElm = parentElm;
        this.sectionCls = sectionCls;

        this.init();
    }

    deleteThis(elm) {
        let target = elm.target;
        if (target.nodeName === "BUTTON" && target.classList.contains('btn--remove')) {
            this.parentElm.removeChild(target.closest(this.sectionCls));
        }
    }

    init() {
        var that = this,
            children = this.parentElm.querySelectorAll(this.sectionCls);
        this.parentElm.addEventListener('click', function(e) {
            e.preventDefault();
            that.deleteThis(e);
        });
        for (var i = 0; i < children.length; i++) {
            let button = document.createElement('button');
            button.innerText = 'Remove section';
            button.classList.add('btn', 'btn--remove');
            children[i].appendChild(button);
        }
    }
}
