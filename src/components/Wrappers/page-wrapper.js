import React from 'react';
import PropTypes from 'prop-types';

import Topbar from '../Wrappers/Menus/Topbar/topbar';
import Header from '../Header/header';
import ContentWrapper from './content-wrapper';

const PageWrapper = ({
  children, headerText, onMenuClick, menuVisible, topMenuVisible,
}) => (
  <div className="page-wrapper">
    {topMenuVisible && <Topbar />}
    <Header
      text={headerText}
      onMenuClick={onMenuClick}
      menuVisible={menuVisible}
    />
    <ContentWrapper>
      {children}
    </ContentWrapper>
  </div>
);

PageWrapper.propTypes = {
  headerText: PropTypes.string,
  onMenuClick: PropTypes.func.isRequired,
  menuVisible: PropTypes.bool.isRequired,
  topMenuVisible: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
};

PageWrapper.defaultProps = {
  headerText: '',
};

export default PageWrapper;
