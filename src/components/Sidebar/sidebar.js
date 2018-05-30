import React from 'react';
import Link from 'gatsby-link';
// import PropTypes from 'prop-types';
import '../../styles/bulma-composed.scss';

import logo from './pattern-buffer-logo-v1.png';

const Sidebar = () => (
  <div className="column">
    <figure className="image is-3by4">
      <img src={logo} alt="logo" />
    </figure>
    <h1
      style={{ color: 'white' }}
    >Pattern Buffer
    </h1>
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
        >About
        </Link>
      </li>
      <li style={{ display: 'inline-block', marginRight: '1rem' }}>
        <Link
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: 'medium',
          }}
          to="/projects"
        >Projects
        </Link>
      </li>
    </ul>
  </div>
);


export default Sidebar;
