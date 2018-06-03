import React from 'react';
import PropTypes from 'prop-types';

const SidebarToggle = ({ isActive, onMenuClick }) => (
  <div
    className="sidebar-toggle__wrapper"
    onClick={onMenuClick}
    onKeyPress={onMenuClick}
    role="button"
    tabIndex={0}
  >
    <div className={`animated-menu-icon${isActive ? ' animate' : ''}`} />
  </div>
);

SidebarToggle.propTypes = {
  isActive: PropTypes.bool,
  onMenuClick: PropTypes.func.isRequired,
};

SidebarToggle.defaultProps = {
  isActive: false,
};

export default SidebarToggle;
