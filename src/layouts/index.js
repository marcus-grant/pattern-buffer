import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

// import Header from '../components/Header';
import ContentWrapper from '../components/Wrappers/content-wrapper';
import Sidebar from '../components/Sidebar/sidebar';
import '../styles/main.scss';
import './template-wrapper.scss';

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
    console.log('clicked');
  }


  render() {
    // const styleFromMenuState = this.state.menuVisible ?
    //   { marginTop: '100px' } : null;
    //
    return (
      <div
        className="template-wrapper"
        style={
        this.state.menuVisible ?
          { marginTop: '100px' } : null
        }
      >
        <Helmet
          title="Pattern Buffer: Now with Heisenberg Compensators!"
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />

        <ContentWrapper menuButtonCallback={this.toggleMenu}>
          {/* Pass this template's children to the ContentWrapper */}
          {this.props.children()}
        </ContentWrapper>
        {
          this.state.menuVisible ? <Sidebar /> : null
        }
      </div>
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
