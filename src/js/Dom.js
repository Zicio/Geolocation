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

    const popup = document.createElement('div');
    popup.classList.add('popup');
    tape.before(popup);

    const popupText = document.createElement('div');
    popupText.classList.add('popup__text');
    popup.append(popupText);

    const text = '<p>Что-то пошло не так</p><p>К сожалению, нам не удалось определить ваше местоположение, пожалуйста, дайте разрешение на использование геолокации, либо введите координаты вручную.</p><p>Широта и долгота через запятую</p>';
    popupText.insertAdjacentHTML('beforeend', text);

    const form = document.createElement('form');
    form.classList.add('popup__form');
    form.setAttribute('action', '');
    form.setAttribute('method', 'post');
    form.setAttribute('id', 'popup-form');
    popup.append(form);

    const textarea = document.createElement('textarea');
    textarea.classList.add('form__input');
    form.append(textarea);

    const buttonPanel = document.createElement('div');
    buttonPanel.classList.add('popup__button-panel');
    popup.append(buttonPanel);

    const buttonReset = document.createElement('button');
    buttonReset.classList.add('button-panel__button', 'reset');
    buttonReset.setAttribute('form', 'popup-form');
    buttonReset.setAttribute('type', 'button');
    buttonReset.textContent = 'Отмена';
    buttonPanel.append(buttonReset);

    const buttonSubmit = document.createElement('button');
    buttonSubmit.classList.add('button-panel__button', 'submit');
    buttonSubmit.setAttribute('form', 'popup-form');
    buttonSubmit.setAttribute('type', 'button');
    buttonSubmit.textContent = 'Ок';
    buttonPanel.append(buttonSubmit);
  }
}
