import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import Helmet from 'react-helmet';

import PageWrapper from '../components/Wrappers/page-wrapper';
import Sidebar from '../components/Wrappers/Menus/Sidebar/sidebar';

import '../styles/main.scss';

const mobileBreakpoint = '767px';
/*
 * In Gatsby convention, src/layouts/ files are used optionally to render
 * shared page components. These components things like headers and footers
 * that get reused on every page. It's possible to use props.location
 * to conditionally render based on the page URL
 */
// TODO: Add background component to create border and hidden features
export default class TemplateWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.state = {
      menuVisible: false,
    };
  }

  toggleMenu() {
    this.setState(prevState => ({
      menuVisible: !prevState.menuVisible,
    }));
  }

  render() {
    const { children } = this.props;
    const { menuVisible } = this.state;
    const helmetMetaTag = () => (
      <Helmet
        title="Pattern Buffer: Now with Heisenberg Compensators!"
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      />
    );
    const sidebar = menuOnTop =>
      !menuOnTop && (menuVisible && <Sidebar />);
    const templateWrapper = breakpointReached => (
      <div className="template-wrapper">
        {helmetMetaTag()}
        <PageWrapper
          headerText=""
          menuVisible={menuVisible}
          onMenuClick={this.toggleMenu}
          topMenuVisible={breakpointReached && menuVisible}
        >{children()}
        </PageWrapper>
        { sidebar(breakpointReached) }
      </div>
    );
    return (
      <Media query={`(max-width: ${mobileBreakpoint})`}>
        {matches => templateWrapper(matches)}
      </Media>
    );
  }
}

TemplateWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
};
