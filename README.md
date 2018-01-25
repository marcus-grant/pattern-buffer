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

To start things off, the freecodecamp [guide][02] has a section on creating NavBars using the bootstrapped `Header` component. Simply copying and pasting the added JSX code into the header adds some menus. There are some complications however, the linter is picking up `jsx-a11y/anchor-is-valid` errors. These come from the `jsx-a11y` eslint plugin included with the AirBnB linter style guide. And need to be investigated further. However, even though the menu links are sized horribly and only parts of them are visible in the header, it does work as expected with the three pages defined for testing `<Links>` as before. According to this issue on the `eslint-plugin-jsx-a11y` project, anything that generates `<a>` tags requires a valid `href` property linking another page or URI to it. React router doesn't quite work this way, and unfortunately the AirBnB style guide, though supposedly a very react friendly ruleset doesn't yet address this problem. To fix it add this rule for `jsx-a11y/anchor-is-valid` to the previous rules in the `.eslintrc` configuration and all should be well.

`.eslint.json`
```json
    "rules": {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "jsx-a11y/anchor-is-valid": [ "error", {
        "components": [ "Link" ],
        "specialLink": [ "to" ]
      }]
    }
```

Now since the `Link` component from `gatsby-link` doesn't throw linter errors, time to put together the basic first version of the Header and its Navigation section using `Link`s. This will eventually be split into seperate components as I decide what the first release of the `Header` should look like. Below is the code, initially taken from freeCodeCamp's [guide][02] and then modified for my needs. That is to have a title for the site, and two `Links`, one leading to the main feed on the `/` route and the about page on `/about`. Without getting too serious about styling a few styles were changed to make the links reachable by the user and black is given as its background so that it stops looking like the gatsby bootstrap's `rebeccapurple`. Below is the code for this update, and the resulting page.

`src/components/Header/index.js`
```jsx
import React from 'react';
import Link from 'gatsby-link';

const Header = () => (
  <div
    style={{
      background: 'black',
      marginBottom: '1.6rem',
    }}
  >
    <h1 style={{ color: 'white' }}>Pattern Buffer</h1>
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '3.2rem 1rem',
      }}
    >
      <ul style={{ listStyle: 'none', float: 'right' }}>
        <li style={{ display: 'inline-block', marginRight: '1rem' }}>
          <Link
            style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: 'medium',
            }}
            to="/"
          >
            Feed
          </Link>
        </li>
        <li style={{ display: 'inline-block', marginRight: '1rem' }}>
          <Link
            style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: 'medium',
            }}
            to="/about"
          >
            About
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Header;
```

![Initial version of Header][i02]


Catch Links
-----------

> Intercepts local links from markdown and other non-react pages and does a client-side pushState to avoid the browser having to refresh the page.

- from GatsbyJS's [docs][09] describing the benefits of catch links

Because a lot of non-react built pages will be sourced to create pages, the catch links plugin will be useful to allow any generated pages from markdown for example to have the benefits of the native react parts of the site.


Sourcing & Transforming Markdown for Blog Posts
-----------------------------------------------
Using the official GatsbyJS [guide][08] to create a blog, the relevant plugins and configurations are going to be installed and configured. *Source* plugins in gatsby create *nodes* which are then *transformed* using *transformer* plugins to a usable format. In this case the *source* plugin that will be used is the `gatsby-source-filesystem`, which allows sourcing of files off the host filesystem to create *nodes*.

Install the plugin with `yarn add gatsby-source-filesystem`, then edit `gatsby-config.js`:

`gatsby-config.js`
```js
module.exports = {
  // previous configuration
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-catch-links',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    }
  ]
}
```

Unlike other gatsby plugins that simply need to be included in the config to work, this one needs some configuration by setting up its own object entry inside the `plugins:` keyed array of plugins like above. The `resolve` key is there to *resolve* these configurations to the `gatsby-source-filesystem` plugin. `options` is where gatsby plugin options are specified. `path` defines the place to look for files in the host system. In this case in the project root vis-à-vis, `${__dirname}/src/pages`, so the pages directory where other react-based pages have been created, like `src/pages/index.js`. Then `name` provides a name for the source and so it can be queried later using GraphQL to get the information therein.

### Transforming a Source
Now with a source in place outside the native react pages that can be statically generated, it's possible to transform the new source into gatsby static pages as well. Here the filesystem source plugin will load file nodes *(markdown files in this case)* and then a new plugin will *transform* it into a static pages based off layout and stylesheets that query that data.

[`gatsby-transformer-remark`][10] uses [`remark`][11] as a markdown parser to transform markdown files into HTML. Moreover this *transformer* plugin can be made to take plugins to further extend the functionality. One such plugin that will be used later is for syntax highlighting of code blocks (`gatsby-remark-prismjs`), a plugin that copies linked files from markdown into the source tree (`gatsby-remark-copy-linked-file`), and also a plugin that compresses and adds by relative path referenced images within the markdown (`gatsby-remark-images`).

As any other plugin before, install using yarn or npm, whichever is preferred, `yarn add gatsby-transformer-remark`. Edit the `gatsby-config.js` with options like with `gtasby-source-filesystem`. Note that this time the only `options` is an empty array, which is left there for when associated plugins get added.

`gatsby-config.js`
```js
// inside of the plugins array of gatsby-config.js
 {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [] // just in case those previously mentioned remark plugins sound cool :)
    }
  },
// other configs...
```

### Using Sources & Transformers on a Blog Post
Now with all the plugins required to create markdown based posts, it's possible to create a test markdown file to start things off within `src/pages` as was specified as a place to query for markdown files. As a starting convention, `YYYY-MM-DD-title` will be the format for naming folders for each post. GatsbyJS isn't particularly picky about how these are named, but it might be about naming the main markdown file inside this folder `index.md` since it needs to know where to start parsing files. **Note** some research is needed to find out if `index.md` is requried.

`src/pages/2018-01-14-hello-world/index.md`
```md
---
path: "/hello-world"
date: "2017-07-12T17:12:33.962Z"
title: "My First Gatsby Post"
---

Oooooh-weeee, my first blog post!
```

Remark adds the functionality of **frontmatter** to markdown files that gets parsed. Essentially all it is, is some syntax to add metadata to markdown files (or YAML, JSON, etc). Just surround the first part of a markdown file with a header like structure using `---` dashes for the top and bottom bar of the **frontmatter**. Then inside can be specified different fields of metadata like, `title`, `date`, `tag`, `category`. These fields can then be queried by gatsby using GraphQL to change how the file is handled based on that metadata. For example, it will be useful to use all of those fields plus another, `subtitle` to create a preview for a post. `path` in this case creates a URL path that can be used, so if `localhost:8000/hello-world` will take you to this page, **if** it had a layout.

### Creating a Page Template with React
Since gatsby is all about rendering using React components, in order to turn a markdown post into a page, a template written in react is needed first. Start by creating this file, `src/templates/blog-post.js`, keeping in mind that `src/templates/` might need to be created first.
`src/templates/blog-post.js`
```jsx
```





References
----------
[00]: https://patternbuffer.io "PatternBuffer"
[01]: https://www.gatsbyjs.org/docs/building-with-components/ "Gatsby documentation - Building with Components"
[02]: https://medium.freecodecamp.org/setting-up-and-getting-used-to-gatsby-1fc27985ae8a "freeCodeCamp: Setting Up a Getting Used to Gatsby"
[03]: https://github.com/benmosher/eslint-plugin-import#importcore-modules "eslint-plugin-import: documentation including imports/core-modules rule"
[04]: https://github.com/marcus-grant/pattern-buffer/issues/7 "Gatsby develop updating & disconnection issue"
[05]: https://github.com/gatsbyjs/gatsby/issues/3043 "Github/gatsbyjs/gatsby issue #3043: gatsby develop only sporadically recompiles on save"
[06]: https://www.gatsbyjs.org/packages/gatsby-plugin-sass/ "GatsbyJS Docs: gatsby-plugin-sass"
[07]: https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/340 "Github Issues: eslint-plugin-jsx-a11y #340"
[08]: https://www.gatsbyjs.org/blog/2017-07-19-creating-a-blog-with-gatsby/ "GatsbyJS Docs: Creating a blog with GatsbyJS"
[09]: https://www.gatsbyjs.org/packages/gatsby-plugin-catch-links/ "GatsbyJS Docs: gatsby-plugin-catch-links"
[10]: https://www.gatsbyjs.org/packages/gatsby-transformer-remark/ "GatsbyJS Docs: gatsby-transformer-remark"
[11]: https://github.com/wooorm/remark "Github: woorm/remark"

1. [Gatsby documentation - Building with Components][01]
2. [freeCodeCamp: Setting Up a Getting Used to Gatsby][02]
3. [Github: eslint-plugin-import - documentation including imports/core-modules rule][03]
4. [Project Issues: Gatsby develop updating & disconnection issue][04]
5. [Github/gatsbyjs/gatsby: issue #3043][05]
6. [GatsbyJS Docs: gatsby-plugin-sass][06]
7. [Github Issues: eslint-plugin-jsx-a11y #340][07]
8. [GatsbyJS Docs: Creating a blog with GatsbyJS][08]
9. [GatsbyJS Docs: gatsby-plugin-catch-links][09]
10. [GatsbyJS Docs: gatsby-transformer-remark][10]
11. [Github: woorm/remark][11]

[i01]: ./docs/images/PatternBuffer-build-log-init-sass.png
[i02]: ./docs/images/pattern-buffer-log-init-header.png
