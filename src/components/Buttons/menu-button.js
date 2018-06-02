import React from 'react';
import PropTypes from 'prop-types';

import './menu-button.scss';

const MenuButton = ({ isActive, onMenuClick }) => (
  <div
    className="menu-button__wrapper"
    onClick={onMenuClick}
    onKeyPress={onMenuClick}
    role="button"
    tabIndex={0}
  >
    <div className={`menu-icon${isActive ? ' animate' : ''}`} />
  </div>
);

MenuButton.propTypes = {
  isActive: PropTypes.bool,
  onMenuClick: PropTypes.func.isRequired,
};

MenuButton.defaultProps = {
  isActive: false,
};

export default MenuButton;
