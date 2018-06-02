import React from 'react';
// import Link from 'gatsby-link';
import PropTypes from 'prop-types';

import './header.scss';

const Header = ({ text, onMenuClick }) => (
  <div className="header__container">
    <h1 className="header__title">{text}</h1>
    <button className="menu__button" onClick={onMenuClick}>menu</button>
  </div>
);

Header.propTypes = {
  text: PropTypes.string,
  onMenuClick: PropTypes.func,
};

Header.defaultProps = {
  text: '',
  onMenuClick: null,
};

export default Header;
