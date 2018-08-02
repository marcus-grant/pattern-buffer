import React from 'react';
import PropTypes from 'prop-types';

// Used to make conditional rendering cleaner and more readable
import Conditional from '../Wrappers/Conditional/conditional';

/**
 * A wrapper component for the body of all site pages.
 * This gets used to wrap all body content into a standard body layout.
 * For now at least, src/layouts/index.js uses it to wrap all body content.
 * This way Temlate Wrapper handles the root layout that's common for the whole site.
 * Then all body content is in here.
 * This is done so that it's easy to have hidden components like a sidebar...
 * ...easy to reveal through input or automation.
 * Also, this means this can have a button that reveals the menu in all pages.
 */
const ContentWrapper = ({ children, isMobile }) => (
  <div className="page-content__wrapper--horizontal">
    <Conditional condition={!isMobile} >
      <span className="page-content__spacer--horizontal" />
    </Conditional>
    <div className={`page-content__wrapper--vertical${
        isMobile ? ' page-content__wrapper--mobile' : ''
      }`}
    >
      {children}
      {/* <div className="page-content__spacer--vertical" /> */}
    </div>
    <Conditional condition={!isMobile} >
      <span className="page-content__spacer--horizontal" />
    </Conditional>
  </div>
);

// TODO: Implement some kind of props to specify behavior of body
// TODO: Implement a callback for the button that brings up the menu
ContentWrapper.propTypes = {
  /** Since this is a wrapper, it must be used with child components */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  isMobile: PropTypes.bool,
}; ContentWrapper.defaultProps = {
  isMobile: false,
};

export default ContentWrapper;
