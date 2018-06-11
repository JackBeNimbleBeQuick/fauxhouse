# Project Title
> Typescript, SASS, Webpack, React, Jest

* responsive sass build that supports custom grid settings
* typescript implementation:  
* webpack:  
* React implementation with no starter kits
  - has no redux or routers yet... we are exploring the bounds of single page react here only

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
...
#### start things up
  gulp css
  gulp transpile
  node serve.js

  - gulp transpile
  - gulp css
  - webpack
  - npm start
  - [in another terminal]
    - npm express | "node js/server/bin/run.js",


### Goals
To provide the basics for:
- react to explore the SPA with our towels still on...
- typescript
- webpack
- sass
- very rough frame out for express server that mimics the services

### Sass Files
- _main.scss:_ gathers the files used in compiling and provides the basic grid setup
- _components/\_grid:_ is just that
- _components/\_main:_ is start of project / name-spaced styles for your project and can | should be replaced
- _vars/\_var:\_ hold the grid setup, you may want to clean this to support your color theming scheme
- _vars/\_mixes:\_ some sample mix-ins are provided
- main.sccs gathers all the pages with includes; this organization would supported target build in mobile app contexts... pre-React Native that is. 8)

### Unit tests
- jest is setup though units test have not yet been evolved on this project

### Command lines
  - tsc         
    - (if you set up typescript global)
  - gulp css    
    - (generates and drops css into public/css)
  - gulp build    
    - (builds and attempts to open index in default browser)
  - read gulpfile for other tasks

### Tool chain for this one is not that far along yet...
  - I assembled this running webpack and webpack server in separate terms, and express to mimic services
    - on term one `_webpack_` in another term `_gulp build_`, in third term node serve.js,
      - I will make improvements to this clunkiness later.

### Known Issues and Future
  - npm audit discoveries are now being worked through.
    - gulp-sass has known security dependencies:
      - [stringstream](https://nodesecurity.io/advisories/664)
      - [hoek](https://nodesecurity.io/advisories/566)
      - [tunnel-agent](https://nodesecurity.io/advisories/598)
      - [lodash](https://nodesecurity.io/advisories/577)
