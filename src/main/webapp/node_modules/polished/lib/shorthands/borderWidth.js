'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _directionalProperty = require('../helpers/directionalProperty');

var _directionalProperty2 = _interopRequireDefault(_directionalProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The border-width shorthand accepts up to four values, including null to skip a value, and uses the directional-property mixin to map them to their respective directions.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...borderWidth('12px', '24px', '36px', '48px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${borderWidth('12px', '24px', '36px', '48px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'border-top-width': '12px',
 *   'border-right-width': '24px',
 *   'border-bottom-width': '36px',
 *   'border-left-width': '48px'
 * }
 */

function borderWidth() {
  for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return _directionalProperty2.default.apply(undefined, ['border-width'].concat(values));
}
exports.default = borderWidth;
module.exports = exports['default'];