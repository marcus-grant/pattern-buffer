import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';

import NavMenu from '../NavMenu/nav-menu';

import logo from '../NavMenu/pattern-buffer-v3_2.svg';

const navItems = [
  { text: 'Feed', route: '/' },
  { text: 'About', route: '/about' },
  { text: 'Projects', route: '/projects' },
];

const stackedTitleLayout = (
  <div className="topbar__title-container">
    <h1 className="topbar__title--topline">PATTERN</h1>
    <h1 className="topbar__title--botline">BUFFER</h1>
  </div>
);

const wideTitleLayout = (
  <h1 className="site__title">PATTERN BUFFER</h1>
);

const titleLayoutFromProp = (layout) => {
  switch (layout) {
    case 'wide':
      return wideTitleLayout;
    case 'stacked':
      return stackedTitleLayout;
    default:
      return (<h1 style={{ color: 'red' }}>Incorrect Title Layout!!!!</h1>);
  }
};

const topbar = ({ titleLayout }) => (
  <div className="topbar__container">
    <div className="topbar-title-logo__container">
      <img className="topbar__logo" src={logo} alt="logo" />
      {titleLayoutFromProp(titleLayout)}
    </div>
    <NavMenu navItems={navItems} orientation="horizontal" />
  </div>
);

topbar.propTypes = {
  /** The two ways to render the site title header, ('stacked', 'wide') */
  titleLayout: PropTypes.oneOf(['wide', 'stacked']),
}; topbar.defaultProps = {
  titleLayout: 'stacked',
};

export default topbar;
