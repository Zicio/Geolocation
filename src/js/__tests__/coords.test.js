import Coords from '../coords';

const result = { latitude: '51.50851', longitude: '−0.12572' };
test.each([
  { value: '51.50851, −0.12572', expected: result },
  { value: '51.50851,−0.12572', expected: result },
  { value: '[51.50851, −0.12572]', expected: result },
])('valid value', ({ value, expected }) => {
  expect(Coords.getCoords(value)).toEqual(expected);
});

test('invalid value', () => {
  expect(Coords.getCoords('')).toBeNull();
});
