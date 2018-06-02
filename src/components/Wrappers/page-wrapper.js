import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header/header';
import ContentWrapper from './content-wrapper';

import './page-wrapper.scss';

const PageWrapper = ({ children, headerText, onMenuClick }) => (
  <div className="page-wrapper">
    <Header text={headerText} onMenuClick={onMenuClick} />
    <ContentWrapper>
      {children}
    </ContentWrapper>
  </div>
);

PageWrapper.propTypes = {
  headerText: PropTypes.string,
  onMenuClick: PropTypes.func.isRequired,
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
