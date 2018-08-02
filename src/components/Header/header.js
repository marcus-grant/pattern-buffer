import React from 'react';
// import Link from 'gatsby-link';
import PropTypes from 'prop-types';

import MenuToggle from '../Buttons/menu-toggle';

const conditionalContainerClass = isMobile =>
  `header__container${isMobile ? '--mobile' : ''}`;

const Header = ({
  text, onMenuClick, menuVisible, isMobile,
}) => (
  <div className={conditionalContainerClass(isMobile)}>
    <h1 className="header__title">{text}</h1>
    <MenuToggle isActive={menuVisible} onMenuClick={onMenuClick} />
  </div>
);

Header.propTypes = {
  text: PropTypes.string,
  onMenuClick: PropTypes.func,
  menuVisible: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool,
};

Header.defaultProps = {
  text: '',
  onMenuClick: null,
  isMobile: false,
};

export default Header;
