'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const separated = date.split(fromFormat[3]);

  const dayIndex = fromFormat.indexOf('DD');
  const monthIndex = fromFormat.indexOf('MM');
  const yearIndex = fromFormat.indexOf('YYYY');

  const shortYearIndex = fromFormat.indexOf('YY');

  const result = [];

  for (const key of toFormat) {
    if (key === 'DD') {
      result.push(separated[dayIndex]);
    }

    if (key === 'MM') {
      result.push(separated[monthIndex]);
    }

    if (key === 'YYYY') {
      if (separated[yearIndex]) {
        result.push(separated[yearIndex]);
      } else {
        if (+separated[shortYearIndex] > 20) {
          result.push(`19${separated[shortYearIndex]}`);
        } else {
          result.push(`20${separated[shortYearIndex]}`);
        }
      }
    }

    if (key === 'YY') {
      if (separated[shortYearIndex]) {
        result.push(separated[shortYearIndex]);
      } else {
        result.push(separated[yearIndex].slice(2));
      }
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
