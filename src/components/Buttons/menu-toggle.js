/* eslint no-multi-spaces: 0 */
import React from 'react';
import PropTypes from 'prop-types';
// import topbar from '../Wrappers/Menus/Topbar/topbar';

// TODO: Add handlers for focus that doesn't stay forever
class MenuToggle extends React.Component {
  constructor(props) {
    super(props);
    this.highlightButton = this.highlightButton.bind(this);
    this.unHighlightButton = this.unHighlightButton.bind(this);
    this.state = {
      isHighlighted: false,
    };
  }

  highlightButton() {
    this.setState({ isHighlighted: true });
  }

  unHighlightButton() {
    this.setState({ isHighlighted: false });
  }

  render() {
    const { onMenuClick, isCross } = this.props;
    const { isHighlighted } = this.state;


    // Naming routine to format the classNames for the --
    // --three animated button bars.

    // BEM Block subtstrings
    const blockName = 'site-menu-button';

    // BEM element substrings for each of the three bars
    const elementNameTop = 'bar-top';
    const elementNameMid = 'bar-mid';
    const elementNameBot = 'bar-bot';

    // BEM modifier substrings for cross & hamburger states and --
    // the full cascaded class for highlighting the button.
    // Then the ternary'd 'modToUse' that gives the string based on prop.
    const modCross = 'cross';
    const modBurger = 'hamburger';
    const modToUse = isCross ? modCross : modBurger;
    const highlightClass  = 'site-menu-button__bar--highlight';

    // Start by determining if each bar is a cross or hamburger arrangement
    const topBEM = `${blockName}__${elementNameTop}--${modToUse}`;
    const midBEM = `${blockName}__${elementNameMid}--${modToUse}`;
    const botBEM = `${blockName}__${elementNameBot}--${modToUse}`;

    // Then finally add the highlight class if the button needs highlighting.
    // ...Also an extra className for all bars to make the SASS/CSS cleaner.
    const bar = `${blockName}__bar`;
    const topClass = `${bar} ${topBEM} ${isHighlighted ? highlightClass : ''}`;
    const midClass = `${bar} ${midBEM} ${isHighlighted ? highlightClass : ''}`;
    const botClass = `${bar} ${botBEM} ${isHighlighted ? highlightClass : ''}`;

    // phew... now lay it all out
    return (
      <div
        className="site-menu__button-wrapper"
        onClick={onMenuClick}
        onKeyPress={onMenuClick}
        role="button"
        tabIndex={0}
        onMouseEnter={this.highlightButton}
        onMouseLeave={this.unHighlightButton}
      >
        <div className={topClass} />
        <div className={midClass} />
        <div className={botClass} />
      </div>
    );
  }
}

MenuToggle.propTypes = {
  isCross: PropTypes.bool,
  onMenuClick: PropTypes.func.isRequired,
};

MenuToggle.defaultProps = {
  isCross: false,
};

export default MenuToggle;
