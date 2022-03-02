export default class Dom {
  constructor(element) {
    this.element = element;
  }

  static showMessage(latitude, longitude) {
    const field = document.querySelector('.form__input');
    const messageValue = field.value;
    const window = document.querySelector('.tape__window');

    const message = document.createElement('div');
    message.classList.add('tape__message');
    window.prepend(message);

    const messageText = document.createElement('span');
    messageText.classList.add('message__text');
    messageText.textContent = messageValue;
    message.append(messageText);

    const messageDate = document.createElement('span');
    messageDate.classList.add('message__date');
    messageDate.textContent = `${Dom.getDate().day}.${Dom.getDate().month}.${Dom.getDate().year} ${Dom.getDate().hour}:${Dom.getDate().minute}`;
    message.append(messageDate);

    const messageCoords = document.createElement('span');
    messageCoords.classList.add('message__coords');
    if (!latitude || !longitude) {
      Dom.showPopup();
      return; //! Временно
    }
    messageCoords.textContent = `[${latitude}, ${longitude}]`;
    message.append(messageCoords);

    field.value = '';
    // const main = document.querySelector('.tape');
    // const margin = +getComputedStyle(main).marginTop.replace(/[^0-9]/g, '');
    // main.style.marginTop = `${margin - message.offsetHeight / 2}px`;
  }

  static getDate() {
    const date = new Date();
    const month = Dom.formatDate(date.getMonth() + 1);
    const day = Dom.formatDate(date.getDate());
    let hour = Dom.formatDate(date.getHours());
    if (hour === 24) {
      hour = 0;
    }
    const minute = Dom.formatDate(date.getMinutes());
    const year = +date.getFullYear().toString().slice(2);
    return {
      month,
      day,
      hour,
      minute,
      year,
    };
  }

  static formatDate(date) {
    if (date < 10) {
      date = `0${date}`;
    }
    return date;
  }

  static showPopup() {
    const tape = document.querySelector('.tape');

    const popup = Dom.setEl('div', 'popup');
    tape.before(popup);

    const popupText = Dom.setEl('div', 'popup__text');
    popup.append(popupText);

    const text = '<p>Что-то пошло не так</p><p>К сожалению, нам не удалось определить ваше местоположение, пожалуйста, дайте разрешение на использование геолокации, либо введите координаты вручную.</p><p>Широта и долгота через запятую</p>';
    popupText.insertAdjacentHTML('beforeend', text);

    const form = Dom.setEl('form', 'popup__form');
    form.setAttribute('action', '');
    form.setAttribute('method', 'post');
    form.setAttribute('id', 'popup-form');
    popup.append(form);

    const textarea = Dom.setEl('textarea', 'form__input');
    form.append(textarea);

    const buttonPanel = Dom.setEl('div', 'popup__button-panel');
    popup.append(buttonPanel);

    const buttonReset = Dom.setEl('button', 'button-panel__button', 'reset');
    buttonReset.setAttribute('form', 'popup-form');
    buttonReset.setAttribute('type', 'button');
    buttonReset.textContent = 'Отмена';
    buttonPanel.append(buttonReset);

    const buttonSubmit = Dom.setEl('button', 'button-panel__button', 'submit');
    buttonSubmit.setAttribute('form', 'popup-form');
    buttonSubmit.setAttribute('type', 'button');
    buttonSubmit.textContent = 'Ок';
    buttonPanel.append(buttonSubmit);
  }

  static setEl(type, ...selector) {
    const el = document.createElement(type);
    el.classList.add(...selector);
    return el;
  }
}
