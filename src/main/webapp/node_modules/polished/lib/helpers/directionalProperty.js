'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var positionMap = ['top', 'right', 'bottom', 'left'];

function generateProperty(property, position) {
  if (!property) return position;
  var splitPropertyName = property.split('-');
  splitPropertyName.splice(1, 0, position);
  return splitPropertyName.join('-');
}

function generateStyles(property, valuesWithDefaults) {
  var styles = {};
  for (var i = 0; i < valuesWithDefaults.length; i += 1) {
    if (valuesWithDefaults[i]) {
      styles[generateProperty(property, positionMap[i])] = valuesWithDefaults[i];
    }
  }
  return styles;
}

/**
 * The directional property helper enables shorthand for direction based properties. It accepts a property and up to four values that map to top, right, bottom, and left, respectively. You can optionally pass an empty string to get only the directional values as properties. You can optionally pass a null argument for a directional value to ignore it.
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...directionalProperty('padding', '12px', '24px', '36px', '48px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${directionalProperty('padding', '12px', '24px', '36px', '48px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'padding-top': '12px',
 *   'padding-right': '24px',
 *   'padding-bottom': '36px',
 *   'padding-left': '48px'
 * }
 */

function directionalProperty(property) {
  for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  // $FlowIgnoreNextLine doesn't understand destructuring with chained defaults.
  var firstValue = values[0],
      _values$ = values[1],
      secondValue = _values$ === undefined ? firstValue : _values$,
      _values$2 = values[2],
      thirdValue = _values$2 === undefined ? firstValue : _values$2,
      _values$3 = values[3],
      fourthValue = _values$3 === undefined ? secondValue : _values$3;

  var valuesWithDefaults = [firstValue, secondValue, thirdValue, fourthValue];
  return generateStyles(property, valuesWithDefaults);
}

exports.default = directionalProperty;
module.exports = exports['default'];