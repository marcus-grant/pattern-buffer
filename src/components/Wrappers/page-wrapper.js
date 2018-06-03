import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header/header';
import ContentWrapper from './content-wrapper';

const PageWrapper = ({
  children, headerText, onMenuClick, menuVisible,
}) => (
  <div className="page-wrapper">
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
