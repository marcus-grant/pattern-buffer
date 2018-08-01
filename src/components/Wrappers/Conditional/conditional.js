import React from 'react';
import PropTypes from 'prop-types';

const conditional = props => !!props.condition && props.children;

conditional.propTypes = {
  condition: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.function,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}; conditional.defaultProps = {
  condition: true,
};

export default conditional;
