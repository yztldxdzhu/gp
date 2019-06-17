'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


/**
 * Provides an easy way to change the `word-wrap` property.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...wordWrap('break-all')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${wordWrap('break-all')}
 * `
 *
 * // CSS as JS Output
 *
 * const styles = {
 *   overflow-wrap: 'break-all',
 *   word-wrap: 'break-all',
 *   word-break: 'break-all',
 * }
 */

function wordWrap() {
  var wrap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'break-word';

  var wordBreak = wrap === 'break-word' ? 'break-all' : wrap;
  return {
    'overflow-wrap': wrap,
    'word-wrap': wrap,
    'word-break': wordBreak
  };
}

exports.default = wordWrap;
module.exports = exports['default'];