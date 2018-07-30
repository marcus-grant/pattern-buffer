import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

const horizontalNavMenu = navItems => navItems.map(navItem => (
  <Link
    className="nav-menu__link--horizontal"
    activeClassName="nav-menu__link--active"
    exact
    to={navItem.route}
    key={`a-${navItem.text}`}
  >{navItem.text}
  </Link>
));

const verticalNavMenu = navItems => navItems.map(navItem => (
  <Link
    className="nav-menu__link--vertical"
    activeClassName="nav-menu__link--active"
    exact
    to={navItem.route}
    key={`a-${navItem.text}`}
  >{navItem.text}
  </Link>
));

const errorPlaceholder = orientation => (
  <h1 style={{ color: 'red' }}>
    {`NavMenu Error! Orientation, ${orientation}, isnt a valid value`}
  </h1>
);

const menuFromItemsAndOrientation = (navItems, orientation) => {
  switch (orientation) {
    case 'horizontal':
      return horizontalNavMenu(navItems);
    case 'vertical':
      return verticalNavMenu(navItems);
    default:
      return errorPlaceholder(orientation);
  }
};

const NavMenu = ({ navItems, orientation }) => (
  <div className={
    `nav-menu__list--${orientation === 'vertical' ? 'vertical' : 'horizontal'}`
  }
  >
    {
      menuFromItemsAndOrientation(navItems, orientation)
    }
  </div>
);

NavMenu.propTypes = {
  navItems: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
  })).isRequired,
  orientation: PropTypes.PropTypes.oneOf([
    'horizontal', 'vertical',
  ]).isRequired,
};

export default NavMenu;
