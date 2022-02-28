import Dom from './Dom';

export default class App {
  constructor(element) {
    this.element = element;

    this.messageListener();
  }

  messageListener() {
    this.element.addEventListener('keyup', (e) => this.constructor.keyHandler(e));
  }

  static keyHandler(e) {
    if (e.code === 'Enter') {
      e.preventDefault();
      Dom.showMessage(e);
    }
  }
}

const app = new App(document);
