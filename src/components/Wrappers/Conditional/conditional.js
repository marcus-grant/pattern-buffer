import React from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';
import BREAKPOINTS from '../../../consts/responsive-breakpoints';

// TODO: Whole file needs refactor and probably splitting into seperate modules
// TODO : Could use a refactor
// Ideas possibility to pass what to render if true & false or nothing for false and render nothing
const conditional = props => !!props.condition && props.children;

conditional.propTypes = {
  condition: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}; conditional.defaultProps = {
  condition: true,
};

export default conditional;

export const RenderIfElse = props => (props.condition ? props.ifTrue : props.ifFalse);

RenderIfElse.propTypes = {
  condition: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
  ifTrue: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  ifFalse: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}; conditional.defaultProps = {
  condition: true,
};

// const debounceGenerator = (func, period, isLeading) => {
//   let timeout;
//   return () => {
//     const context = this;
//     const args = arguments;
//     const later = () => {
//       timeout = null;
//       if (!isLeading) func.apply(context, args);
//     };
//     const willCall = isLeading && !timeout;
//     clearTimeout(timeout);
//     timeout = setTimeout(later, period);
//     if (willCall) func.apply(context, args);
//   };
// };

// const throttleUpdates = () => {

// };

// const listenerTag = 'resize:throttle(2000)';
export class RenderIfMobile extends React.Component {
  constructor(props) {
    super(props);
    this.updateWidth = this.updateWidth.bind(this);
    this.state = {
      browserWidth: 0,
    };
  }

  componentWillMount() { this.updateWidth(); }
  // TODO: SERIOUSLY REFACTOR THIS!!!!
  componentDidMount() {
    const upd = this.updateWidth;
    (function () { // eslint-disable-line
      function actualResizeHandler() {
        upd();
      }
      let resizeTimeout;
      function resizeThrottler() {
        // ignore resize events as long as an actualResizeHandler execution is in the queue
        if (!resizeTimeout) {
          resizeTimeout = setTimeout(() => {
            resizeTimeout = null;
            actualResizeHandler();
          // The actualResizeHandler will execute at a rate of 8fps
          }, 160);
        }
      }
      window.addEventListener('resize', resizeThrottler, false);
    }());
  }
  // NEEDS TO BE THROTTLED
  // componentDidMount() { this.updateWidth(); }

  updateWidth() { this.setState({ browserWidth: window.innerWidth }); }

  render() {
    const { isMobile, notMobile } = this.props;
    const { browserWidth } = this.state;
    // console.log('isMobile?: ', browserWidth <= BREAKPOINTS.mobile, 'width: ', browserWidth);
    return (<RenderIfElse
      condition={browserWidth <= BREAKPOINTS.mobile}
      ifTrue={isMobile}
      ifFalse={notMobile}
    />);
  }
}

RenderIfMobile.propTypes = {
  isMobile: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  notMobile: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}; RenderIfMobile.defaultProps = {
  notMobile: null,
};
