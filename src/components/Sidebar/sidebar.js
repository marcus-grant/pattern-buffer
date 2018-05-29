import React from 'react';
import Link from 'gatsby-link';
// import PropTypes from 'prop-types';

const Sidebar = () => (
  <div className="sidebar__container">
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
