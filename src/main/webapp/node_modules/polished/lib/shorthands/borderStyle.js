'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _directionalProperty = require('../helpers/directionalProperty');

var _directionalProperty2 = _interopRequireDefault(_directionalProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The border-style shorthand accepts up to four values, including null to skip a value, and uses the directional-property mixin to map them to their respective directions.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...borderStyle('solid', 'dashed', 'dotted', 'double')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${borderStyle('solid', 'dashed', 'dotted', 'double')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'border-top-style': 'solid',
 *   'border-right-style': 'dashed',
 *   'border-bottom-style': 'dotted',
 *   'border-left-style': 'double'
 * }
 */

function borderStyle() {
  for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return _directionalProperty2.default.apply(undefined, ['border-style'].concat(values));
}
exports.default = borderStyle;
module.exports = exports['default'];