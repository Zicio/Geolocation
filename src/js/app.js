import Dom from './Dom';

export default class App {
  constructor(element) {
    this.element = element;

    this.messageListener();
  }

  messageListener() {
    this.element.addEventListener('keydown', (e) => this.constructor.keyHandler(e));
  }

  static keyHandler(e) {
    if (e.code === 'Enter' && e.target.classList.contains('form__input')) {
      e.preventDefault();
      App.geolocation();
    }
  }

  static geolocation() {
    const options = { enableHighAccuracy: true };
    let coords;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(App.getCoords, App.getError, options);
    }
    return coords;
  }

  static getCoords(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    Dom.showMessage(latitude, longitude);
  }

  static getError() {
    Dom.showMessage();
  }
}

const app = new App(document);
