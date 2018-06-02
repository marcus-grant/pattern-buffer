import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

const NavMenu = ({ navItems }) => (
  <div className="nav-menu__container">
    <ul className="nav-menu__list">
      {
        navItems.map(navItem => (
          <Link
            className="nav-menu__link"
            to={navItem.route}
            key={`a-${navItem.text}`}
          >
            <li
              className="nav-menu__nav-item"
              key={`li-${navItem.text}`}
            >
              {navItem.text}
            </li>
          </Link>
        ))
      }
    </ul>
  </div>
);

NavMenu.propTypes = {
  navItems: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
  })).isRequired,
};

export default NavMenu;
