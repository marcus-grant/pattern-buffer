import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

const NavMenu = ({ navItems, orientation }) => (
  <div className={
    `nav-menu__list--${orientation === 'vertical' ? 'vertical' : 'horizontal'}`
  }
  >
    {
      navItems.map(navItem => (
        <Link
          className="nav-menu__link"
          activeClassName="nav-menu__link--active"
          exact
          to={navItem.route}
          key={`a-${navItem.text}`}
        >{navItem.text}
        </Link>
      ))
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
