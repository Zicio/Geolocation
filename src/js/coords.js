export default class Coords {
  static getCoords(value) {
    const initialValue = value.toString().replace('[', '').replace(']', '').replace(' ', '');
    const coords = initialValue.split(',', 2);
    const latitude = coords[0];
    const longitude = coords[1];
    const regexp = /-?\d{1,3}\.\d+/;
    if (regexp.test(latitude) && regexp.test(longitude)) {
      return { latitude, longitude };
    }
    return null;
  }
}
