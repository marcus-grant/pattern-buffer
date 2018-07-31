import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import Helmet from 'react-helmet';

import PageWrapper from '../components/Wrappers/page-wrapper';
import Sidebar from '../components/Wrappers/Menus/Sidebar/sidebar';

import '../styles/main.scss';

const mobileBreakpoint = '767px';
const autoMenuVisibilityBreakpoint = 1199;
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
    this.showMenu = this.showMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.state = {
      menuVisible: false,
    };
  }

  componentDidMount() {
    // console.log('did mount');
    // console.log('windows width from global: ', window.innerWidth);
    // this.updateMenuVisibilityFromWidth(window.innerWidth) // eslint-disable-line
  }

  showMenu() {
    this.setState({ menuVisible: true });
  }

  hideMenu() {
    this.setState({ menuVisible: false });
  }

  toggleMenu() {
    this.setState(prevState => ({
      menuVisible: !prevState.menuVisible,
    }));
  }

  // TODO: Implement default visibility after the visibility breakpoint width
  // This means fixing the animation of the button to work before loading
  // updateMenuVisibilityFromWidth(width) {
  // if (width > autoMenuVisibilityBreakpoint) this.showMenu();
  // }


  render() {
    const { children } = this.props;
    const { menuVisible } = this.state;
    const helmetMetaTag = () => (
      <Helmet
        title="Pattern Buffer: Now with Heisenberg Compensators!"
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1',
          },
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
