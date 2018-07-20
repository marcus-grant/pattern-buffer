import React from 'react';
import PropTypes from 'prop-types';

import NavMenu from '../NavMenu/nav-menu';

import logo from '../NavMenu/pattern-buffer-v2_1.svg';

const navItems = [
  { text: 'Feed', route: '/' },
  { text: 'About', route: '/about' },
  { text: 'Projects', route: '/projects' },
];

// Different layouts for the site title area
const stackedTitleLayout = (
  <div className="site__title-container">
    <h1 className="site__title--topline">PATTERN</h1>
    <h1 className="site__title--botline">BUFFER</h1>
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

// Finally, the Sidebar component
/** Sidebar
 * A component to layout the sidebar menu for all site pages.
 * Intended to be rendered by the TemplateWrapper for all pages.
 */
const Sidebar = ({ titleLayout }) => (
  <div className="sidebar__container">
    <img className="site__logo" src={logo} alt="logo" />
    {titleLayoutFromProp(titleLayout)}
    <NavMenu navItems={navItems} orientation="vertical" />
  </div>
);

Sidebar.propTypes = {
  /** The two ways to render the site title header, ('stacked', 'wide') */
  titleLayout: PropTypes.oneOf(['wide', 'stacked']),
}; Sidebar.defaultProps = {
  titleLayout: 'wide',
};


export default Sidebar;
