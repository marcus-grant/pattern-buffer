PatternBuffer.io
================

My personal [site][00] where I write about fullstack/automation/embedded development, information theory, artificial intelligence, and just strikes my fancy as a professional nerd. The site is built on GatsbyJS, React, Go, & Python.

Notes
=====
For an overview of the project structure please refer to the [Gatsby Documentation][01]

Development Environment
-----------------------
The page is built the normal way until linting, and the development server come into play. First, the project is started with the `gatsby new PROJECT_NAME` command. This bootstraps the project.

Then the project needs to be linted since coding in Javascript is so much more pleasant with it. This is done by installing `eslint` with the package manager `yarn add --dev eslint`. Then because the airBnB default linter configuration is a pretty great starting point, it became chosen after running `npx eslint --init`, which just runs the eslint initial configurator. Just choose "use popular eslint style config" and then choosing the AirBnB one.

This however reveals a few kinks with how Gatsby works apart from typical node/react based projects. Firstly, it will give linter errors concerning how JSX syntax is being used in a file with extension, `*.jsx`. This is addressed by adding this linter rule under the `rules` key of the linter configuration file:
`.eslint.json`
```json
    "rules": {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
    }
```

Then, there is a much more complicated issue to deal with when using linters. Gatsby has internal dependencies to handling modules like `react` & `prop-types`. This is because gatsby is meant to use the react syntax, and architecture to create a static page generator with most of the benefits that react provides. This however creates a complication for modules that have to detect this dependency, because it isn't actually included in the `node_modules` or `package.json`. This will cause `import/no-extraneous-dependencies` linter errors because it doesn't know that although `react` & `prop-types` are imported, that they are handled internally by gatsby and not through imported `node_modules`. To fix this, there exists a set of linter rules that tell the linter that these are what's known as [`core-modules`][03] that tell the linter to ignore these so called *"extraneous-dependencies"*.

Now, the linter should be working, and any other oddities can be handled later with the primary functionality mostly intact. Next are some problematic issues with the gatsby development server that is initiated by `gatsby develop`. First, the easier fix. The [issue][04] created for this project shows various investigations into why this happens, and it seems to relate to an internal issue with gatsby to how routes are defined relative to the host network. In short, specifying the `--host` option with `localhost` as the host route fixes the issues *somewhat* reliably.

Then is an even bigger issue which is that the gatsby development server doesn't detect file changes within the `src/` directory and thus the primary feature of a development server is lost. Thanks to ahstro's comment on gatsby's [issue #3043][05], he discovered that the project uses the node module `chokidar` to handle file watching, and that for some deeper reason I haven't investigated yet, requiring synchronous file watching can be enforced by setting environment variable, `CHOKIDAR_USEPOLLING=1`. With this in mind, and having tested the work arounds to `gatsby develop` a seperate script is added to the project's root `./dev-server` that runs the gatsby development server with all the work arounds in one command:

`./dev-server`
```bash
#!/bin/bash
export CHOKIDAR_USEPOLLING=1
gatsby develop --host localhost
```

That takes care of the initial problems with developing a SASS site using my particular circumstances.

Main App Page
-------------
- `layouts/` contains the *templates* for laying out webpages than can be applied to `pages`
  - `index.js` is the main entry point
  - so is `index.css` as far as stylesheets are concerned
- `pages/` contains the subordinate pages that make the app
- `gatsby-config.js` contains all of the gatsby configurations and references to used plugins

### Adding the First Custom Page
- To add `page-3.js` to represent a third page option, create the file: `src/pages/page-3.js`:
```jsx
import React from "react";
import Link from "gatsby-link";

const ThridPage = () => (
  <div>
    <h1>Third Page</h1>
    <p>This is my first Gtasby site</p>
    <Link to="/page-2/">Back to Page 2</Link>
    <br />
    <Link to="/">Go back to the homepage</Link>
  </div>
);

export default ThridPage;
```
- Pretty self-explanatory if already familiar with React
- Next, make it so this page has a `<Link>` that references it in `src/pages/index.js`
```js
import React from "react";
import Link from "gatsby-link";

const IndexPage = () => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to page 2</Link>
    <br />
    <Link to="/page-3">New Page!</Link>
  </div>
);

export default IndexPage;
```

SASS Stylesheets
----------------
Gatsby can be enabled to use SASS instead of standard CSS as a preprocessor to create CSS with more nuanced syntax. There exists a gatsby plugin, `gatsby-plugin-sass` detailed on gatsby's [plugin documentation][06] to handle this. All that's really needed is to install the package `gatsby-plugin-sass` using either `yarn` or `npm`. Oddly they don't suggest that it should be a dev dependency so don't include the `--dev` option with `yarn` or the `--save-dev` option with `npm`. Then going into `src/layouts/` there will be the entry-point for style sheets when gatsby compiles. This needs to be changed to a `scss` file, `index.scss`. Either by deleting the bootstrapped version and starting fresh or by rewritting it in either SASS or SCSS syntax. It's a really big file so, it is recommendable to simply start fresh and deleting its contents. Then to test whether it is working, set the `background: ` property of `body` to be a nice ugly `red`, like below. And if it works, clearly the SASS preprocessor of `gatsby-plugin-sass` works. **NOTE** some `*.js` files in `src/layouts` will import the old `./index.css` file, and its extension needs to be made `index.scss`.

`src/layouts/index.scss`
```scss
body {
  background: red;
}
```

To start things off, these are useful global values for a stylesheet to have.
`src/layouts/index.scss`
```scss
$grey: #fafafa #f5f5f5 #eee #e0e0e0 #bdbdbd #9e9e9e #757575 #616161 #424242 #212121;
$grey-text: white white white white white black black black black black;

$button-font-size: 1.2rem;
$button-radius: 4px;

html {
  font-size: 62.5%;
}

body {
  background: nth($grey, 1);
  // background: red;
}

h1 { font-size: 3.2rem; font-style: bold; }
h2 { font-size: 2.4rem; font-style: bold; }
h3 { font-size: 2.4rem; }
h4 { font-size: 1.6rem; }
h5 { font-size: 1.2rem; }
h6 { font-size: 1.0rem; }

button {
  background: nth($grey, 9);
  border: 1px;
  border-radius: $button-radius; 
  box-shadow: none;
  color: nth($grey-text, 1);
  font-weight: 600;
  padding: 6px;
}
```

This is the typical main style settings that get used on my projects. Let's deconstruct some of them:
- Although global variables should have their own `_variables.scss` partial SASS file, for starting things off it's useful to have them in the main or in this case `index.scss` file
- Flat coloring of HTML elements is a good starting point for most projects except ones that specifically try to avoid it
  - Setting an array of 10 flatly colored grayscale values helps to keep things colored consistently from the get-go
  - Consider adding more color arrays as new colors are added
  - For now grayscale will do as varying grays are needed in almost any project
- HTML font size is set at the root to `font-size: 62.5%` which has the effect of setting the scaling factor of fonts when using the `rem` *relative* unit to 10 virtual pixels on any display
  - This works on retina displays with upwards of 200PPI pixel density to the old 96 PPI standard that's been around since HTML's early days.
  - This sets a very intuitive standard of measure for the sizing of elements to a base 10 number
- The default header elements are set to certain font sizes based on this newly normalized `rem` unit
- Standard HTML buttons are almost always **hideously ugly** let's change that with some default styling

![The react page after initial test pages and SASS][i01]

Now the page should look like this. The header tags could probably use some resizing but that can be handled later.

Building Gatsby Components Using React
--------------------------------------
Now that everything runs like a modern Node & React build/development environment *(although under-the-hood it's a slightly different story)* it's time to build some React components. A typical thing that most sites, especially blogs, will have is a header component. In this case it will also house a basic version of a navigation menu. For now, just a *feed* and *about* link. 

To start things off, the freecodecamp [guide][02] has a section on creating NavBars using the bootstrapped `Header` component. Simply copying and pasting the added JSX code into the header adds some menus. There are some complications however, the linter is picking up `jsx-a11y/anchor-is-valid` errors. These come from the `jsx-a11y` eslint plugin included with the AirBnB linter style guide. And need to be investigated further. However, even though the menu links are sized horribly and only parts of them are visible in the header, it does work as expected with the three pages defined for testing `<Links>` as before. 


References
----------
[00]: https://patternbuffer.io "PatternBuffer"
[01]: https://www.gatsbyjs.org/docs/building-with-components/ "Gatsby documentation - Building with Components"
[02]: https://medium.freecodecamp.org/setting-up-and-getting-used-to-gatsby-1fc27985ae8a "freeCodeCamp: Setting Up a Getting Used to Gatsby"
[03]: https://github.com/benmosher/eslint-plugin-import#importcore-modules "eslint-plugin-import: documentation including imports/core-modules rule"
[04]: https://github.com/marcus-grant/pattern-buffer/issues/7 "Gatsby develop updating & disconnection issue"
[05]: https://github.com/gatsbyjs/gatsby/issues/3043 "Github/gatsbyjs/gatsby issue #3043: gatsby develop only sporadically recompiles on save"
[06]: https://www.gatsbyjs.org/packages/gatsby-plugin-sass/ "GatsbyJS Docs: gatsby-plugin-sass"

1. [Gatsby documentation - Building with Components][01]
2. [freeCodeCamp: Setting Up a Getting Used to Gatsby][02]
3. [Github: eslint-plugin-import - documentation including imports/core-modules rule][03]
4. [Project Issues: Gatsby develop updating & disconnection issue][04]
5. [Github/gatsbyjs/gatsby: issue #3043][05]
6. [GatsbyJS Docs: gatsby-plugin-sass][06]

[i01]: ./docs/images/PatternBuffer-build-log-init-sass.png
