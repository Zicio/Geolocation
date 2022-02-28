export default class Dom {
  constructor(element) {
    this.element = element;
  }

  static showMessage(e) {
    const messageValue = e.target.value;
    const window = document.querySelector('.tape__window');
    const message = document.createElement('div');
    message.classList.add('tape__message');
    window.appendChild(message);
    const messageText = document.createElement('span');
    messageText.classList.add('message__text');
    messageText.textContent = messageValue;
    const messageDate = document.createElement('span');
    messageDate.classList.add('message__date');
    messageDate.textContent = `${Dom.getDate().day}.${Dom.getDate().month}.${Dom.getDate().year} ${Dom.getDate().hour}:${Dom.getDate().minute}`;
    message.appendChild(messageText);
    message.appendChild(messageDate);
    e.target.value = '';
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
}
