PatternBuffer.io
================

My personal [site][00] where I write about fullstack/automation/embedded development, information theory, artificial intelligence, and just strikes my fancy as a professional nerd. The site is built on GatsbyJS, React, Go, & Python.

Notes
=====
For an overview of the project structure please refer to the [Gatsby Documentation][01]

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




References
----------
[00]: https://patternbuffer.io "PatternBuffer"
[01]: https://www.gatsbyjs.org/docs/building-with-components/ "Gatsby documentation - Building with Components"
[02]: https://medium.freecodecamp.org/setting-up-and-getting-used-to-gatsby-1fc27985ae8a "freeCodeCamp: Setting Up a Getting Used to Gatsby"

1. [Gatsby documentation - Building with Components][01]
2. [freeCodeCamp: Setting Up a Getting Used to Gatsby][02]

