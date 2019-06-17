'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The border-radius shorthand accepts a value for side and a value for radius and applies the radius value to both corners of the side.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...borderRadius('top', '5px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${borderRadius('top', '5px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'border-top-right-radius': '5px',
 *   'border-top-left-radius': '5px',
 * }
 */

function borderRadius(side, radius) {
  if (!radius || typeof radius !== 'string') throw new Error('borderRadius expects a radius value as a string as the second argument.');
  if (side === 'top' || side === 'bottom') {
    var _ref;

    return _ref = {}, _defineProperty(_ref, 'border-' + side + '-right-radius', radius), _defineProperty(_ref, 'border-' + side + '-left-radius', radius), _ref;
  }

  if (side === 'left' || side === 'right') {
    var _ref2;

    return _ref2 = {}, _defineProperty(_ref2, 'border-top-' + side + '-radius', radius), _defineProperty(_ref2, 'border-bottom-' + side + '-radius', radius), _ref2;
  }

  throw new Error('borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.');
}

exports.default = borderRadius;
module.exports = exports['default'];