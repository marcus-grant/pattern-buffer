import React from 'react';
// import Link from 'gatsby-link';
import PropTypes from 'prop-types';

const Header = ({ text, onMenuButtonClick }) => (
  <div className="header__container">
    <h1 style={{ color: 'white' }}>{text}</h1>
    <button className="menu__button" onClick={onMenuButtonClick}>
  </div>
);

Header.propTypes = {
  text: PropTypes.string,
  onMenuButtonClick: PropTypes.func,
};

Header.defaultProps = {
  text: '',
  onMenuButtonClick: null,
};

export default Header;
