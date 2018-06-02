import React from 'react';
// import Link from 'gatsby-link';
import PropTypes from 'prop-types';

import MenuButton from '../Buttons/menu-button';

import './header.scss';

const Header = ({ text, onMenuClick, menuVisible }) => (
  <div className="header__container">
    <h1 className="header__title">{text}</h1>
    <MenuButton isActive={menuVisible} onMenuClick={onMenuClick} />
    {/*
    <button className="menu__button" onClick={onMenuClick}>menu</button>
    */}
  </div>
);

Header.propTypes = {
  text: PropTypes.string,
  onMenuClick: PropTypes.func,
  menuVisible: PropTypes.bool.isRequired,
};

Header.defaultProps = {
  text: '',
  onMenuClick: null,
};

export default Header;