'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getBorderWidth = function getBorderWidth(_ref) {
  var pointingDirection = _ref.pointingDirection,
      height = _ref.height,
      width = _ref.width;

  switch (pointingDirection) {
    case 'top':
      return '0 ' + width / 2 + 'px ' + height + 'px ' + width / 2 + 'px';
    case 'left':
      return height / 2 + 'px ' + width + 'px ' + height / 2 + 'px 0';
    case 'bottom':
      return height + 'px ' + width / 2 + 'px 0 ' + width / 2 + 'px';
    case 'right':
      return height / 2 + 'px 0 ' + height / 2 + 'px ' + width + 'px';

    default:
      throw new Error('Passed invalid argument to triangle, please pass correct poitingDirection e.g. \'right\'.');
  }
};

// needed for border-color


/**
 * CSS to represent triangle with any pointing direction.
 *
 * @example
 * // Styles as object usage
 *
 * const styles = {
 *   ...triangle({ pointing: 'right', width: '100px', height: '100px', color: 'red' })
 * }
 *
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${triangle({ pointing: 'right', width: '100px', height: '100px', color: 'red' })}
 *
 *
 * // CSS as JS Output
 *
 * div: {
 *  'border-color': 'transparent',
 *  'border-left-color': 'red !important',
 *  'border-style': 'solid',
 *  'border-width': '50px 0 50px 100px',
 *  'height': '0',
 *  'width': '0',
 * }
 */

var reverseDirection = {
  left: 'right',
  right: 'left',
  top: 'bottom',
  bottom: 'top'
};

var triangle = function triangle(_ref2) {
  var pointingDirection = _ref2.pointingDirection,
      width = _ref2.width,
      height = _ref2.height,
      color = _ref2.color;
  return _defineProperty({
    'border-color': 'transparent',
    'width': '0',
    'height': '0',
    'border-width': getBorderWidth({ height: height, width: width, pointingDirection: pointingDirection }),
    'border-style': 'solid'

  }, 'border-' + reverseDirection[pointingDirection] + '-color', color + ' !important');
};

exports.default = triangle;
module.exports = exports['default'];