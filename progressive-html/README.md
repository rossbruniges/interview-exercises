# Progressive HTML

Starting with a structure of HTML/CSS we build up a layer of JS interactions on top of things (see the commit history for the full story).

## Set up

### Prerequisites

Because I've been playing with webpack for this build I recommend having `v6.9.1` if you want to try the build script 

    $ npm install
    $ npm run webpack:watch
    
Saying that all the assets that you need are pre-build as part of this repo, so assuming that everything is downloaded to your machine you can open the `index.html` in a browser.

## Omissions

Unfortunately I didn't get everything done in time; I missed out on:

* animation of the accordion sections - my plan was to use the heights that I calculate for each of the children elements and use a CSS transform to transition between a height of 0 and the calculated height. I was planing on syncing them all up using the transitionEnd event (https://developer.mozilla.org/en-US/docs/Web/Events/transitionend)
* media query views - I was going to extend the current roles to allow the max-width of the site to be 1200px with everything flexiable between those. Flexbox was going to be used to intellegently stack the main artciles initially in a 1 | 2 stacked grid and later a 1 by 1 list of three (with a 50/25/25 split)
* tests - considering the time and the rather DOM like nature of the assesment I was wondering about tests - most of the things I'm using are core DOM, so browser support should be sound. This is something I would be happy to pair with if the opportunity arrises in a later interview stage.
* I used the DOM based `closest` (https://developer.mozilla.org/en-US/docs/Web/API/Element/closest) method - which as of now isn't supported in IE and Edge - there is a polyfil, I just didn't get the time to get it in
