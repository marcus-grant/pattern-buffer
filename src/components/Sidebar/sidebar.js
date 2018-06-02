import React from 'react';
// import PropTypes from 'prop-types';

import NavMenu from './nav-menu';

import './sidebar.scss';

import logo from './pattern-buffer-v2_1.svg';

const navItems = [
  { text: 'Feed', route: '/' },
  { text: 'About', route: '/about' },
  { text: 'Projects', route: '/projects' },
];

const Sidebar = () => (
  <div className="sidebar__container">
    <img src={logo} alt="logo" />
    <h1 className="site__title">PATTERN BUFFER</h1>
    <NavMenu navItems={navItems} />
  </div>
);


export default Sidebar;

// <ul style={{ listStyle: 'none', float: 'right' }}>
//   <li style={{ display: 'inline-block', marginRight: '1rem' }}>
//     <Link
//       style={{
//         color: 'white',
//         textDecoration: 'none',
//         fontSize: 'medium',
//       }}
//       to="/"
//     >
//       Feed
//     </Link>
//   </li>
//   <li style={{ display: 'inline-block', marginRight: '1rem' }}>
//     <Link
//       style={{
//         color: 'white',
//         textDecoration: 'none',
//         fontSize: 'medium',
//       }}
//       to="/about"
//     >About
//     </Link>
//   </li>
//   <li style={{ display: 'inline-block', marginRight: '1rem' }}>
//     <Link
//       style={{
//         color: 'white',
//         textDecoration: 'none',
//         fontSize: 'medium',
//       }}
//       to="/projects"
//     >Projects
//     </Link>
//   </li>
// </ul>
