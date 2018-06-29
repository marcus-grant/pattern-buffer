import React from 'react';
import PropTypes from 'prop-types';

class SidebarToggle extends React.Component {
  constructor(props) {
    super(props);
    this.highlightButton = this.highlightButton.bind(this);
    this.highlightButton = this.unHighlightButton.bind(this);
    this.state = {
      buttonHighligted: false,
    };
  }

  highlightButton() {
    tihs.setState({ buttonHighligted: true });
  }

  unHighlightButton() {
    tihs.setState({ buttonHighligted: false });
  }

  handleMouseHover() {
    this.setState(prevState => ({ isHovering: !prevState.isHovering }));
  }

  render() {
    const classFromStateAndProps = () => {
      return `animated-menu-icons${isActive ?
          ' animate'
      `;
    };
    return (
      <div
        className="sidebar-toggle__wrapper"
        onClick={onMenuClick}
        onKeyPress={onMenuClick}
        role="button"
        tabIndex={0}
        onMouseEnter={this.highlightButton}
        onMouseLeave={this.unHighlightButton}
      >
        <div className={`animated-menu-icon${isActive ? ' animate' : ''}`} />
      </div>
    );
  }
}

SidebarToggle.propTypes = {
  isActive: PropTypes.bool,
  onMenuClick: PropTypes.func.isRequired,
};

SidebarToggle.defaultProps = {
  isActive: false,
};

export default SidebarToggle;


// <div className="sidebar-toggle__wrapper" onClick={onMenuClick}>
//   <div className={`animated-menu-icon${isActive ? ' animate' : ''}`} />
// </div>
