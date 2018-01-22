import React from 'react';
import Link from 'gatsby-link';

const IndexPage = () => (
  <div>
    <h1>Main Page</h1>
    <Link to="/page-2/">Go to page 2</Link>
    <br />
    <Link to="/page-3">Go to page 3</Link>
  </div>
);

export default IndexPage;
