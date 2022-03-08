import Dom from './Dom';
import Coords from './coords';

export default class App {
  constructor(element) {
    this.element = element;

    this.messageListener();
    this.popupListener();
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

  popupListener() {
    this.element.addEventListener('click', (e) => this.constructor.clickHandler(e));
  }

  static clickHandler(e) {
    if (e.target.classList.contains('button-panel__button')) {
      e.preventDefault();
      // Нажатие кнопки отмена
      if (e.target.classList.contains('reset')) {
        Dom.hidePopup();
        return;
      }
      // Нажатие кнопки ок
      const coordsValue = e.target.closest('.popup').querySelector('.form__input').value;
      const coords = Coords.getCoords(coordsValue);
      // Если валидные координаты
      if (coords) {
        Dom.showMessage(coords.latitude, coords.longitude);
        Dom.hidePopup();
        return;
      }
      // Если невалидные координаты
      Dom.showHint(e);
    }
  }
}

const app = new App(document);
