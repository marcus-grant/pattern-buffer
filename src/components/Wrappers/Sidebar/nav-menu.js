import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

const NavMenu = ({ navItems }) => (
  <div className="nav-menu__list">
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
};

export default NavMenu;
/*
  <ul className="nav-menu__list">
    {
      navItems.map(navItem => (
        <li
          className="nav-menu__item"
          key={`li-${navItem.text}`}
        >
          <Link
            className="nav-menu__link"
            activeClassName="nav-menu__link--active"
            exact
            to={navItem.route}
            key={`a-${navItem.text}`}
          >{navItem.text}
          </Link>
        </li>
      ))
    }
  </ul>
*/
