import React from 'react';
import PropTypes from 'prop-types';

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
    const { onMenuClick, isActive } = this.props;
    const { isHighlighted } = this.state;
    const blockStyle = 'animated-menu-icon';
    const highlightStyle = 'highlight';
    const highlightFormatter = h => `${h ? ` ${highlightStyle}` : ''}`;
    const typeFormatter = active => `${active ? ' cross' : ''}`;
    const styleFormatter = (active, hi) =>
      `${blockStyle}${typeFormatter(active)}${highlightFormatter(hi)}`;
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
        <div
          className={styleFormatter(isActive, isHighlighted)}
        />
      </div>
    );
  }
}

MenuToggle.propTypes = {
  isActive: PropTypes.bool,
  onMenuClick: PropTypes.func.isRequired,
};

MenuToggle.defaultProps = {
  isActive: false,
};

export default MenuToggle;
