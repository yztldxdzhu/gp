'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mix = require('./mix');

var _mix2 = _interopRequireDefault(_mix);

var _curry = require('../internalHelpers/_curry');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Shades a color by mixing it with black. Compared to `darken` it can produce
 * hue shifts, wheres `darken` manipulates the luminance channel and therefor
 * doesn't produce hue shifts.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: shade(0.25, '#00f')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${shade(0.25, '#00f')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#00003f";
 * }
 */

function shade(percentage, color) {
  if (typeof percentage !== 'number' || percentage > 1 || percentage < -1) throw new Error('Passed an incorrect argument to shade, please pass a percentage less than or equal to 1 and larger than or equal to -1.');
  return (0, _mix2.default)(percentage, color, 'rgb(0, 0, 0)');
}

exports.default = (0, _curry2.default)(shade);
module.exports = exports['default'];