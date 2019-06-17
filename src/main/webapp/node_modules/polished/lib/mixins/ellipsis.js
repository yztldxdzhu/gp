'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


/**
 * CSS to represent truncated text with an ellipsis.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...ellipsis('250px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${ellipsis('250px')}
 * `
 *
 * // CSS as JS Output
 *
 * div: {
 *   'display': 'inline-block',
 *   'max-width': '250px',
 *   'overflow': 'hidden',
 *   'text-overflow': 'ellipsis',
 *   'white-space': 'nowrap',
 *   'word-wrap': 'normal'
 * }
 */

function ellipsis() {
  var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '100%';

  return {
    'display': 'inline-block',
    'max-width': width,
    'overflow': 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
    'word-wrap': 'normal'
  };
}

exports.default = ellipsis;
module.exports = exports['default'];