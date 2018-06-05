# Project Title
> Typescript, SASS, Webpack, React, Jest

* responsive sass build that supports custom grid settings
* typescript implementation:  
* webpack:  

## Getting Started
- Follow gulp4 setup: [Gulp 4 setup may change](https://www.npmjs.com/package/gulp4)
- may I suggest Node Version Management [npm nvm](https://github.com/creationix/nvm) | [npm nvm-windows](https://github.com/coreybutler/nvm-windows) if you have not done so yet
  - this package assembled with npm v8.9.4
- install and setup typescript [ts](https://www.npmjs.com/package/typescript)
- run all tasks within bin/

...
- mkdir myWebProject
- git clone ...fauxhouse.git
- cd fauxhouse/bin
- npm install

### Goals
To provide the basics for:
- sass
- typescript
- webpack
- react

### Sass Files
- _main.scss:_ gathers the files used in compiling and provides the basic grid setup
- _partials/\_grid:_ is just that
- _partials/\_main:_ is start of project / namespaced styles for your project and can | should be replaced
- _vars/\_var:\_ hold the grid setup, you may want to clean this to support your color theming scheme
- _vars/\_mixes:\_ some sample mix-ins are provided

### Command lines
  - tsc         
    - (if you set up typescript global)
  - gulp css    
    - (generates and drops css into public/css)
  - gulp build    
    - (builds and attempts to open index in default browser)
  - read gulpfile for other tasks

### Known Issues and Future
  - npm audit discoveries are now being worked through.
    - gulp-sass has known security dependencies:
      - [stringstream](https://nodesecurity.io/advisories/664)
      - [hoek](https://nodesecurity.io/advisories/566)
      - [tunnel-agent](https://nodesecurity.io/advisories/598)
      - [lodash](https://nodesecurity.io/advisories/577)
  - exploring removal of babel dependencies for implementing a cleaner es6+ implementation
  - in this iteration there are some design stage decisions in place, that would change as a project like this matures
    - styles are at top level while still figuring out the main hierarchal metaphor name-spacing of the site. later this would get generalized and the extensions of these would live in the components as properties.
    - unit tests will sit out side the component tree for 2 reasons
      - first it keeps the tree clean and makes movement of things around easy for things like "well I thought this was to be a component, but now I see it is a container"... Later the can be move back into the tree where all this can actually be treated as a component.
      - there are still some efficiencies to be gained through component-tizing repeating code into better small parts. For now testing all app parts as of one type or another can help prevent uneven testing from component to component until things mature a bit more. Then later as with styles, once all the exposures are well understood and mitigated then the extensions of these test should reside at the component level.
    - interfaces: at this point while getting things going the default properties are spelled out in the components. A bit later then the interfaces will be written, doc blocks added and then the default properties cleaned up.
    - comments: React is so self evident that I feel very little if any comments are needed in the code base. Later well written doc blocks in the interface will provide the implementation details through the TS introspection tooling that is built in as part of the Typescript eco-system.
    - the watchers build tool implementation still needs to be worked out... 8^)
    - history / backtrack or direct access are currently handled by a very lite weight listener on the "propstate"  events, later this would be moved into a more full featured router / REDUX | rx.js implementation for handling server side changes, interactions and management of state and properties....
    - form handling: as I do like to be totally under control, I will be using a connected class of my own making for ajax to start, there will be a FormHandler container /Forms to start. As a matter of deferring these things until the uses cases are better understood, the filters and validators will live in the forms and the basic comm and map.filter.reduce chains will live in the form handler. Once a Redux / rx.js observable implementation is decided on then things can be subsumed from there.
