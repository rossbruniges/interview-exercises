import {Accordion} from './components/accordion';
import {RemoveSection} from './components/removeSection';

var accordions = document.querySelectorAll('.accordion');

for (let i = 0; i < accordions.length; i++) {
    new Accordion(accordions[i], '.accordion__item', '.accordion__trigger', '.accordion__content');
    new RemoveSection(accordions[i], '.accordion__item');
}
