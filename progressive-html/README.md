# Progressive HTML

Starting with a structure of HTML/CSS we build up a layer of JS interactions on top of things (see the commit history for the full story).

## Set up

To keep things simple I have included all built assets in with the repo - so if you don't want to mess around with npm installs or webpacking you can just open `index.html` in a modern browser of your choice (please not the caveat regarding IE11/Edge in 'Omissions' further down the page)

### Prerequisites

Because I've been playing with webpack for this build I recommend having `v6.9.1` if you want to try the build script (that's what it has been tested with)

    $ npm install
    $ npm run webpack
    
## Omissions

Unfortunately I didn't get everything done in time; I missed out on:

* animation of the accordion sections (part 2) - my plan was to use the heights that I calculate for each of the children elements and use a CSS transform to transition between a height of 0 and the calculated height. I was planing on syncing them all up using the transitionEnd event (https://developer.mozilla.org/en-US/docs/Web/Events/transitionend)
* media query views (part 4) - I was going to extend the current roles to allow the max-width of the site to be 1200px with everything flexiable between those. Flexbox was going to be used to intellegently stack the main artciles initially in a 1 | 2 stacked grid and later a 1 by 1 list of three (with a 50/25/25 split)
* I used the DOM based `closest` (https://developer.mozilla.org/en-US/docs/Web/API/Element/closest) method - which as of now isn't supported in IE and Edge - there is a polyfil, I just didn't get the time to get it in
* tests - considering the time and the rather DOM like nature of the assesment I was wondering about tests - most of the things I'm using are core DOM, so browser support should be sound. This is something I would be happy to pair with if the opportunity arrises in a later interview stage.
