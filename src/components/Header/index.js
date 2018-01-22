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
