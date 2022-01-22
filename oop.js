//---(процедурное программирование (ПП))---
//программа пишется как последовательность действий, которые приводят к определённому результату
//---(функциональное программирование (ФП))---
//программа разделяется на данные и последовательности функций, которые обрабатывают данные
//---(функциональное программирование (ФП))---
//представляет собой подход, при котором данные в программе описываются в виде объектов, взаимодействующих между собой

//объявляем с помощью оператора new и стандартного конструктора Object
const myObject = {};
const myObject = new Object();
//методы объекта (ключ: функция)
const pushok = {
  sayMrrr: function() {
      console.log('Mrrr');
  },
  goSleep: () => {
      console.log('Zzz');  //стрелочная ф-я
  }
};
pushok.SayMrrr(); // => Mrrr
//-----
//this - ключевое слово, которое используется для доступа внутри метода к ключам объекта
function toggleLike() {
  this.isLiked = !this.isLiked;  //равнозначно обращению song.isLiked, но без необходимости выносить isLiked в глобальную область видимости
  console.log(this.isLiked); //выведет true
}
const song = {
  title: 'Diary of Jane',
  artist: 'Breaking Benjamin',
  isLiked: false,
  like: toggleLike  //метод объекта song
}
song.like(); //вызывая метод объекта запускаем функцию, получится true (!false)
//---
function logTitle() {
  console.log(this.title);
}
function createSong(title) {  //функция создания заголовка, принимает заголовок как аргумент
  const newSong = {
      title,
      getTitle: logTitle  //метод объекта newSong
  }
  return newSong;
}
const song1 = createSong('One');
song1.getTitle(); //One   //потому что this === song1
//-----
//создаем новый объект из класса (экземпляр класса):
//создаем класс ключевым словом class
class Song {   //имя класса это переменная, которая используется в создании объектов на основе класса
  constructor(name, artist) {  //метод класса, используется для заполнения объекта данными
    this.name = name;
    this.artist = artist;
    this.isLiked = false;
  }
  like() {
    this.isLiked = !this.isLiked;
  }
}
const song = new Song('Start Over', 'Any Given Day');  //в константе song будет храниться экземпляр класса Song (объект созданный на основе класса)
//-----
//ключевые слова extends и super:
//(extends super и constructor работают в связке)
class Student {    //Student родительский класс, а WebDeveloperStudent дочерний, потомок
  constructor(name, cohort) {  //определяем свойства родительского класса
    this.name = name;
    this.cohort = cohort;
    this.profession = null;  //профессия и продолжительность будут переопределены в дочернем классе
    this.trainingDuration = null;
    this.isFired = false;
  }
  fired() {  //это для примера того, как с помощью super передавать в дочерние классы методы
    this.isFired = !this.isFired;
  }
  getInfo() {
    return {
      name: this.name,
      cohort: this.cohort,
      profession: this.profession,
      trainingDuration: this.trainingDuration
    }
  } //каждый дочерний класс переопределяет свойства profession и trainingDuration своего родительского класса,
}  //а все остальные поля и методы просто наследует ==>
class WebDeveloperStudent extends Student {
  constructor(name, cohort) {  //объявляем метод constructor
    super(name, cohort);  //при вызове super выполняется логика конструктора родительского класса
    this.profession = 'Web developer';
    this.trainingDuration = 10;
    this.isFired = super.fired(); //вот так передаются методы
  }
}
const student2 = new WebDeveloperStudent("Маша Иванова", 3);  //задаем свойства name и cohort новому объекту
student2.getInfo(); //в ответ получимобновленный объект с информацией о студенте (полную карточку студента)
//-----
//приватные поля класса
//(недоступны для вызова)
class Car {
  #one;  //приватное свойство класса
  constructor(one) {
    this.#one = 0;
  }
  #getValue(value) {} //приватный метод класса
}
//эмуляция приватных полей класса
//(такие свойства на самом деле продолжают быть доступны)
class Car {
  constructor(one) {
    this._one = 0;
  }
  _getValue(value) {} //приватный метод класса
}
//-----
// Бывают случаи, когда дочерним классам требуется добавить особую функциональность.
// Если это что-то уникальное, в дочернем классе достаточно просто объявить новый метод.
// Но иногда нужно изменить логику работы методов, которые уже унаследованы от родительского класса.
// Тогда в дочернем классе можно полностью переопределить унаследованный метод.
// Это и есть полиморфизм — способность классов иметь разную реализацию при одинаковом интерфейсе.
//переопределение методов:
// — возможность дочерних классов не наследовать определённый родительский метод, а реализовать собственный
webDeveloper.getInfo(); //дочерние классы webDeveloper и pythonDeveloper берут getInfo() из родительского класса
pythonDeveloper.getInfo();
designer.getInfo(); //но внутри дочернего класса designer создан свой getInfo(), так родительский метод переопределяется - это полиморфизм
//расширение методов:
//пример:
class Student {
  constructor(name, cohort) {
    //какие-то еще переменные
    this.language = null;
  }
  getInfo() {
    return {
      //какие-то еще переменные
      language: this.language,
    }
  }
}
class DesignerStudent extends Student {  //дочерний класс
  constructor(name, cohort) {
    //какие-то еще переменные
  }
  getInfo() {
    const info = super.getInfo(); //вызываем родительский метод getInfo() - вернет объект
    delete info.language;  //удаляем ненужное нам свойство из полученного объекта
    return info;  //возвращаем отредактированный объект - карточку с информацией о студенте
  }
}
//
//---(Деструктуризация)---
//объекты:
const greekGods = { love: 'Афродита', war: 'Арес', trade: 'Гермес' };
//когда имена переменных совпадают с ключами объекта:
const { love, war, trade } = greekGods;
console.log(love, war, trade); // Афродита Арес Гермес
//когда имена переменных и ключи объекта отличаются:
const {
  love: goddessOfLove,
  war: godOfWar,
  trade: godOfTrade
} = greekGods;
console.log(goddessOfLove, godOfWar, godOfTrade);  // Афродита Арес Гермес
//---
//Задание: деструктурируйте объект -
const elements = document.forms.myForm.elements;
const artist = elements.artist;  //обращаемся к свойству объекта обычным способом через объект.ключ, а не {ключ} = объект (см. примеры про параметры ф-ий)
const song = elements.song;
//результат:
const { elements } = document.forms.myForm;
const { artist, song } = elements;  //т.е. тут мы обращаемся напрямую к свойствам artist и song объекта elements (в котором находится форма)
console.log(artist, song); //(в обоих случаях выведет в консоль два интпута формы)
//-----
//массивы:
const precipitation = ['дождь', 'морось', 'роса'];
const [rain, drizzle, dew] = precipitation; //строки запишутся в переменные по порядку
console.log(rain, drizzle, dew); // дождь морось роса
//-----
//деструктурируем массив или объект при передаче функции:
const userData = {
  name: 'Виктор',
  patronymic: 'Семёнович',
  age: 55
};
const printUserParams = ({ name, patronymic, age }, secondParameter) => {
  console.log(name, patronymic, age, secondParameter);
};
printUserParams(userData, 'второй параметр'); //Виктор Семёнович 55 второй параметр
//---
//еще пример деструктуризации параметра ф-ии:
const countUserPosts = (user) => {
 return user.posts.length;
};
//деструктурируем:
const countUserPosts = ({ posts }) => posts.length;  //обращаемся напрямую к свойству/ключу объекта через конструкцию ({ ключ })
const user1 = {  //сам объект
  id: 2294611830,
  username: 'leonardo.dv',
  posts: [
    { comment: 'Витрувианский человек', dateCreated: 1490 },
    { ... },
  ]
}
//-----
//классы:
// код без использования деструктуризации параметров
class Card {
  constructor(data) {
      this._text = data.text;
      this._image = data.image;
      this._description = data.description;
  }
}
// код c использованием деструктуризации параметров
class Card {
  constructor({ text, image, description }) { // достаём ключи объекта сразу
      this._text = text;
      this._image = image;
      this._description = description;
  }
}
//-----
//1) значение по умолчанию:
function consoleUserInfo(user) {
  const { name = 'Дэвид', dateOfBirth = '8 января' } = user;
  console.log(`${name}, ${dateOfBirth}`);  //см. console.log
}
//или деструктурируем параметр прямо в круглых скобках ф-ии:
function consoleUserInfo({ name = 'Дэвид', dateOfBirth = '8 января' }) {
  console.log(`${name}, ${dateOfBirth}`);  //см. console.log
}
//если значение не передано, то будет использоваться заданное по-умолчанию:
consoleUserInfo({ name: 'Леонард', dateOfBirth: '21 сентября' }); // "Леонард, 21 сентября"
consoleUserInfo({ name: 'Стивен' }); // "Стивен, 8 января"
consoleUserInfo({ dateOfBirth: '2 мая' }); // "Дэвид, 2 мая"
consoleUserInfo({}); // "Дэвид, 8 января"
//2) значение по умолчанию:
//(присваиваем значения по умолчанию при деструктуризации массива)
function getFirstThreeUsers(users) {
  const [first = 'Дэвид', second = 'Леонард', third = 'Стивен'] = users;
  console.log(first, second, third);
}
getFirstThreeUsers(['Элвис', 'Ларс']);  //'Элвис' 'Ларс' 'Стивен'
//3) значение по умолчанию:
//(задаем только значение по умолчанию, передаем пустые объект и массив)
const { name = 'Василий' } = {};
const [type = 'кресло'] = [];
console.log(type, name); // кресло Василий
//4) значение по умолчанию:
//(задаем значения по умолчанию в параметре функции)
const consoleUserInfo = ({ name = 'Василий' }, [type = 'кресло']) => console.log(`${type} ${name}`);
consoleUserInfo({}, []) // кресло Василий
//-----
//
//---(контекст this)---
//строгий режим
'use strict';
//при разбитии кода на модули, строгий режим в них включен по-умолчанию
//------
//---(Привязка this по-умолчанию)---
//происходит при вызове функции просто по имени - name()
//this принимает значение window или undefined
//пример:
window.hiMyNameIs = 'What?';
  function slimShady() {
    console.log(this.hiMyNameIs); //this ссылается на глобальный объект window
  }
slimShady(); //выведет 'What?'
//---
//строгий режим задаёт this равным undefined (для функций, вызванных по имени)
//-----
//---(Неявная привязка)---
//Вызов метода объекта:
//пример 1:
//вызовем функцию как метод объекта (глобального объекта window)
window.myData = 'Important data';
  function globalFunction() {
    'use strict'; //строгий режим присваивает this значение undefined (при вызове этой функции просто по имени)
    console.log(this.myData); //выведет 'Important data'
  }
window.globalFunction(); //this неявно привязывается к window
//пример 2:
//вызовем функцию increment как метод объекта counter
const counter = {
  count: 0,
  increment() {
    this.count++; //объект counter = this, т.е. = counter.count++;
    console.log('Count: ' + this.count); //выведет Count: 1
  }
};
counter.increment(); //this неявно привязывается к counter
//---
//Потеря контекста:
const user = {
  username: 'Peter',
  auth() {
    console.log(`${this.username} has logged in`); //вернет 'undefined has logged in'
  }
}
const adminAuth = user.auth; //кажется что здесь должна была произойти неявная привязка, но...
adminAuth();  //...привязка this происходит в (!)точке вызова (т.е. в данном случае будет выполнена привязка по-умолчанию к window)
//-----
//---()---










// // класс для взаимодействия с сервером

// export default class Api {

//   constructor({ baseUrl, headers }) {

//     this._baseUrl = baseUrl;

//     this._headers = headers;

//   }



//   _checkResponse(res) {

//     // проверка ответа сервера на корректность

//     if (res.ok) return res.json();

//     return Promise.reject(`Ошибка: ${res.status}`);

//   }



//   //-------

//   // запрос данных пользователя

//   getUserData() {

//     return fetch(`${this._baseUrl}/users/me`, {

//       headers: this._headers,

//     }).then(this._checkResponse);

//   }



//   //-------

//   // загрузка начальных карточек с сервера ✓

//   getInitialCards() {

//     return fetch(`${this._baseUrl}/cards`, {

//       headers: this._headers,

//     }).then(this._checkResponse);

//   }



//   //-------

//   // обновление данных профиля после редактирования

//   updateUserData({ name, about }) {

//     return fetch(`${this._baseUrl}/users/me`, {

//       method: "PATCH",

//       headers: this._headers,

//       body: JSON.stringify({

//         name: name,

//         about: about,

//       }),

//     }).then(this._checkResponse);

//   }



//   //-------

//   // обновление аватара

//   updateProfileAvatar(avatarUrl) {

//     return fetch(`${this._baseUrl}/users/me/avatar`, {

//       method: "PATCH",

//       headers: this._headers,

//       body: JSON.stringify(avatarUrl),

//     }).then(this._checkResponse);

//   }



//   //-------

//   //добавление новой карточки

//   postCard({ place, picture }) {

//     return fetch(`${this._baseUrl}/cards`, {

//       method: "POST",

//       headers: this._headers,

//       body: JSON.stringify({

//         name: place,

//         link: picture,

//       }),

//     }).then(this._checkResponse);

//   }

//   //-------



//   deleteCard = (cardId) => {

//     // удаление карточки с сервера

//     return fetch(`${this._baseUrl}/cards/${cardId}`, {

//       method: "DELETE",

//       headers: this._headers,

//     }).then(this._checkResponse);

//   };



//   //лайк карточки

//   //-------

//   setLike = (cardId) => {

//     // удаление карточки с сервера

//     return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {

//       method: "PUT",

//       headers: this._headers,

//     }).then(this._checkResponse);

//   };



//   // удаление лайка с карточки

//   //-------

//   deleteLike = (cardId) => {

//     return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {

//       method: "DELETE",

//       headers: this._headers,

//     }).then(this._checkResponse);

//   };

// }





































import {

  cardElementSelector,

  cardImageSelector,

  cardTitleSelector,

  cardDeleteBtnSelector,

  cardDeleteBtnInactiveModifier,

  cardLikeBtnSelector,

  cardLikeBtnActiveModifier,

  cardLikesCountSelector,

} from "../utils/constants.js";



export default class Card {

  constructor(

    { _id, name, link, userId, likes, owner },

    handleCardClick,

    handleLikeClick,

    handleDeleteClick,

    templateSelector

  ) {

    this._id = _id;

    this._name = name;

    this._alt = name;

    this._link = link;

    this.likesCount = likes.length;

    this._isMyCard = owner._id === userId;

    this.isLiked = likes.some((like) => like._id === userId);

    this._selector = templateSelector;

    this._handleCardClick = handleCardClick;

    this._handleLikeClick = handleLikeClick;

    this._handleDeleteClick = handleDeleteClick;

  }

  _getElement() {

    // создаем новую карточку по шаблону из разметки

    const cardElement = document

      .querySelector(this._selector)

      .content.querySelector(cardElementSelector)

      .cloneNode(true);



    return cardElement;

  }



  create() {

    this._element = this._getElement();

    this._element.querySelector(cardTitleSelector).textContent = this._name;

    this._element.querySelector(cardImageSelector).src = this._link;

    this._element.querySelector(cardImageSelector).alt = this._name;

    this.toggleLikeButton();

    // заполняем шаблон карточки данными, полученными с сервера

    this._setEventListeners();

    // устанавливаем слушателей событиям карточки



    if (!this._isMyCard)

      // удалить можно только свою карточку

      this._element

        .querySelector(cardDeleteBtnSelector)

        .classList.add(cardDeleteBtnInactiveModifier);



    return this._element;

  }



  delete() {

    this._element.remove();

  }



  toggleLikeButton() {

    // функция изменения внешнего вида кнопки и счетчика лайков

    const likeButtonElement = this._element.querySelector(cardLikeBtnSelector);



    if (this.isLiked)

      likeButtonElement.classList.add(cardLikeBtnActiveModifier);

    else likeButtonElement.classList.remove(cardLikeBtnActiveModifier);



    this._element.querySelector(cardLikesCountSelector).textContent =

      this.likesCount;

  }



  _setEventListeners() {

    // слушатели, устанавливамые на элементы карточки при ее создании (приватный метод)

    this._element

      .querySelector(cardImageSelector)

      .addEventListener("click", () => {

        this._handleCardClick();

      });



    this._element

      .querySelector(cardLikeBtnSelector)

      .addEventListener("click", () => {

        this._handleLikeClick(this._id, this.isLiked);

      });



    this._element

      .querySelector(cardDeleteBtnSelector)

      .addEventListener("click", () => {

        // создаем слушатель на событие нажатия на кнопку "Удалить"

        this._handleDeleteClick(this._id);

      });

  }

}



























// export const validationConfig = {

//   formSelector: ".form",

//   fieldsetSelector: ".form__input-container",

//   inputSelector: ".form__field-input",

//   submitButtonSelector: ".form__submit-button",

//   inactiveButtonClass: "form__submit-button_inactive",

//   inputErrorClass: "form__field-input_type_error",

//   errorClass: "form__field-error_active",

// };

// // конфиг валидации форм


// export default class FormValidator {

//   constructor(validationConfig, formElement) {

//     this._formElement = formElement;

//     this._inputSelector = validationConfig.inputSelector;

//     this._submitButtonSelector = validationConfig.submitButtonSelector;

//     this._inputErrorClass = validationConfig.inputErrorClass;

//     this._errorClass = validationConfig.errorClass;

//     this._inactiveButtonClass = validationConfig.inactiveButtonClass;

//   }



//   _showInputError(inputElement, errorMessage) {

//     const errorElement = this._formElement.querySelector(

//       `.${inputElement.id}-error`

//     );

//     inputElement.classList.add(this._inputErrorClass);

//     errorElement.textContent = errorMessage;

//     errorElement.classList.add(this._errorClass);

//   }



//   _hideInputError(inputElement) {

//     const errorElement = this._formElement.querySelector(

//       `.${inputElement.id}-error`

//     );

//     inputElement.classList.remove(this._inputErrorClass);

//     errorElement.classList.remove(this._errorClass);

//     errorElement.textContent = "";

//   }



//   _checkInputValidity(inputElement) {

//     // проверка поля на валидность

//     if (!inputElement.validity.valid) {

//       this._showInputError(inputElement, inputElement.validationMessage);

//     } else {

//       this._hideInputError(inputElement);

//     }

//   }



//   _hasInvalidInput() {

//     // проверка наличия невалидных символов в поле

//     return this._inputList.some((inputElement) => {

//       return !inputElement.validity.valid;

//     });

//   }



//   _toggleButtonState() {

//     // изменение активности кнопки сабмита в зависимости от валидности данных

//     if (this._hasInvalidInput()) {

//       this._buttonElement.classList.add(this._inactiveButtonClass);

//       this._buttonElement.setAttribute("disabled", true);

//     } else {

//       this._buttonElement.classList.remove(this._inactiveButtonClass);

//       this._buttonElement.removeAttribute("disabled");

//     }

//   }



//   _setEventListeners() {

//     // слушатели на поля ввода формы (live-validation)

//     this._inputList = Array.from(

//       this._formElement.querySelectorAll(this._inputSelector)

//     );

//     this._buttonElement = this._formElement.querySelector(

//       this._submitButtonSelector

//     );

//     this._inputList.forEach((inputElement) => {

//       inputElement.addEventListener("input", () => {

//         this._checkInputValidity(inputElement);

//         this._toggleButtonState();

//       });

//     });

//   }



//   refresh() {

//     this._inputList.forEach((inputElement) => {

//       this._hideInputError(inputElement);

//     });

//     this._toggleButtonState();

//   }



//   enableValidation() {

//     // публичный метод, включает валидацию формы.

//     // для каждой проверяемой формы создается экземпляр класса FormValidator

//     this._setEventListeners(this._formElement);

//     this._formElement.addEventListener("submit", (evt) => {

//       evt.preventDefault();

//       this._toggleButtonState();

//     });

//   }

// }






























// import {

//   popupCloseBtnSelector,

//   popupOpenedSelector,

// } from "../utils/constants.js";



// export default class Popup {

//   constructor(popupSelector) {

//     this._popupSelector = popupSelector;

//     this._popupElement = document.querySelector(`.${popupSelector}`);

//     this._handleEscClose = this._handleEscClose.bind(this);

//     /* Т.к. this определяется в момент вызова, для объектов Popup при вызове

//     setEventListeners из index.js контекст будет равен Window.

//     Чтобы этого избежать, необходимо забайндить приватный метод _handleEscClose

//     на текущий объект класса Popup */

//   }



//   // открытие модального окна

//   open() {

//     this._popupElement.classList.add(popupOpenedSelector);

//     window.addEventListener("keyup", this._handleEscClose);

//   }



//   // закрытие модального окна

//   close() {

//     this._popupElement.classList.remove(popupOpenedSelector);

//     window.removeEventListener("keyup", this._handleEscClose);

//   }



//   // закрытие модального окна по кнопке Esc

//   _handleEscClose(evt) {

//     if (evt.key === "Escape") {

//       this.close();

//     }

//   }



//   // слушатели родительского класса, устанавливаются в index.js

//   setEventListeners() {

//     this._popupElement.addEventListener("click", (evt) => {

//       if (

//         evt.target.classList.contains(popupCloseBtnSelector) ||

//         evt.target.classList.contains(this._popupSelector)

//       )

//         this.close();

//     });

//   }

// }




























import {

  formSelector,

  formFieldSelector,

  formSubmitBtnSelector,

} from "../utils/constants.js";



import Popup from "./Popup.js";



export default class PopupWithForm extends Popup {

  constructor({ popupSelector, handleFormSubmit }) {

    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;

    this._formElement = this._popupElement.querySelector(formSelector);

    this._inputList = Array.from(

      this._formElement.querySelectorAll(formFieldSelector)

    );

    this._buttonSubmit = this._popupElement.querySelector(

      formSubmitBtnSelector

    );

    this._buttonText = this._buttonSubmit.textContent;

  }



  _getInputValues() {

    // создаём пустой объект

    this._formValues = {};

    // добавляем в этот объект значения всех полей

    this._inputList.forEach((input) => {

      this._formValues[input.name] = input.value;

    });

    // возвращаем объект значений

    return this._formValues;

  }



  renderLoading(isLoading) {

    // лоадер загрузки данных на сервер/с сервера

    if (isLoading) {

      this._buttonSubmit.textContent = "Сохранение...";

    } else {

      this._buttonSubmit.textContent = this._buttonText;

    }

  }



  close() {

    super.close();

    this._formElement.reset();

    // при закрытии форма должна очищаться

  }



  setEventListeners() {

    super.setEventListeners();

    this._formElement.addEventListener("submit", (evt) => {

      // обработчик сабмита формы

      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());

    });

  }

}




























import {

  popupImageSelector,

  popupImageTitleSelector,

} from "../utils/constants.js";



import Popup from "./Popup.js";



export default class PopupWithImage extends Popup {

  constructor(popupSelector) {

    super(popupSelector);

    // ключевым словом super вызываем конструктор родительского класса

    // это необходимо, для определения селектора внутри PopupWithImage

    this._popupImage = this._popupElement.querySelector(`.${popupImageSelector}`);

    this._popupImageTitle = this._popupElement.querySelector(

      `.${popupImageTitleSelector}`

    );

  }



  open({ link, name }) {

    super.open(); // вызываем родительский метод

    // дополним open новой функциональностью:

    this._popupImage.src = link;

    this._popupImage.alt = name;

    this._popupImageTitle.textContent = name;

  }

}





export default class Section {

  constructor({ data, renderer }, containerSelector) {

    this._renderedItems = data;

    this._renderer = renderer;

    this._container = document.querySelector(`.${containerSelector}`);

  }



  // новый элемент в контейнере

  addItem(element) {

    this._container.prepend(element);

  }



  _clear() {

    this._container.innerHTML = '';

  }



  // отрисовка элемента

  renderItems() {

    this._renderedItems.forEach(item => {

      this._renderer(item);

    });

  }

}



//Яндекс:

//Класс UserInfo отвечает за управление информацией о пользователе на странице. Этот класс:

//Принимает в конструктор объект с селекторами двух элементов:

//элемента имени пользователя и элемента информации о себе.

//Содержит публичный метод getUserInfo,

//который возвращает объект с данными пользователя.

//Данные для этого метода нужно получать от методов класса Api — подумайте над тем,

//как внедрить метод класса Api в getUserInfo.

//Когда данные пользователя нужно будет подставить в форму при открытии — метод вам пригодится.

//Содержит публичный метод setUserInfo, который принимает новые данные пользователя,

//отправляет их на сервер и добавляет их на страницу.



export default class UserInfo {

  constructor(

    { profileTitleSelector, profileSubtitleSelector, profileAvatarSelector },

    getUserData

  ) {

    this._name = document.querySelector(`.${profileTitleSelector}`);

    this._about = document.querySelector(`.${profileSubtitleSelector}`);

    this._avatarUrl = document.querySelector(`.${profileAvatarSelector}`);

    this._getUserData = getUserData;

  }



  getUserInfo() {

    // по ТЗ - данные должны возвращаться с сервера,

    // getUserData - коллбэк обращения к api.getUserData

    // при работе с экземпляром можно получить данные вот так:

    // userInfo.getUserInfo().then(res => ...)

    return this._getUserData();

  }



  setUserInfo({ _id, name, about, avatar }) {

    this.userId = _id;

    this._name.textContent = name;

    this._about.textContent = about;

    this._avatarUrl.src = avatar;

  }

}






import "./index.css";

// импорт главного файла стилей

import {

  cardListSelector,

  cardTemplateSelector,

  popupEditAvatarSelector,

  popupAddCardSelector,

  popupEditProfileSelector,

  popupPreviewImageSelector,

  profileTitleSelector,

  profileSubtitleSelector,

  profileAvatarSelector,

  formEditProfile,

  formEditProfileAboutField,

  formEditProfileNameField,

  formEditAvatar,

  formAddCard,

  buttonAddCard,

  buttonEditProfile,

  profileAvatarContainer,

  validationConfig,

} from "../utils/constants.js";

// ииморт констант (селекторы и пр.)



import Section from "../components/Section.js";

import Card from "../components/Card.js";

import FormValidator from "../components/FormValidator.js";

import PopupWithForm from "../components/PopupWithForm.js";

import PopupWithImage from "../components/PopupWithImage.js";

import Api from "../components/Api.js";

import UserInfo from "../components/UserInfo.js";



const api = new Api({

  // объект для работы с api сервера

  baseUrl: "https://nomoreparties.co/v1/plus-cohort-2",

  headers: {

    authorization: "a13ed7cf-8f31-4ce8-b059-6e62fe3ca7e5",

    "Content-Type": "application/json",

  },

});



const user = new UserInfo(

  // объект для работы с данными пользователя

  {

    profileTitleSelector,

    profileSubtitleSelector,

    profileAvatarSelector,

  },

  () => api.getUserData()

);



const cardElementsList = new Section(

  // объект для рендеринга карточек на страницу

  {

    renderer: (cardData) => {

      cardElementsList.addItem(createNewCard(cardData));

    },

  },

  cardListSelector

);



//--------------- Включение валидации форм на странице ------------------------

const formEditProfileValiadtor = new FormValidator(

  validationConfig,

  formEditProfile

);

const formEditAvatarValiadtor = new FormValidator(

  validationConfig,

  formEditAvatar

);

const formAddCardValidator = new FormValidator(validationConfig, formAddCard);



formEditProfileValiadtor.enableValidation();

formEditAvatarValiadtor.enableValidation();

formAddCardValidator.enableValidation();



//-------------- Логика работы модальных окон на странице -----------------------

// попап редактирования профиля пользователя

const popupEditProfile = new PopupWithForm({

  popupSelector: popupEditProfileSelector,

  handleFormSubmit: (data) => {

    popupEditProfile.renderLoading(true);

    api

      .updateUserData(data)

      .then((data) => {

        user.setUserInfo(data);

        popupEditProfile.close();

      })

      .catch((err) => {

        console.log(`Ошибка: ${err}`);

      })

      .finally(() => {

        popupEditProfile.renderLoading(false);

      });

  },

});



// попап обновления аватара

const popupEditAvatar = new PopupWithForm({

  popupSelector: popupEditAvatarSelector,

  handleFormSubmit: (data) => {

    popupEditAvatar.renderLoading(true);

    api

      .updateProfileAvatar(data)

      .then((data) => {

        user.setUserInfo(data);

        popupEditAvatar.close();

      })

      .catch((err) => {

        console.log(`${err}`);

      })

      .finally(() => {

        popupEditAvatar.renderLoading(false);

      });

  },

});



// попап добавления карточки

const popupAddCard = new PopupWithForm({

  popupSelector: popupAddCardSelector,

  handleFormSubmit: (inputData) => {

    popupAddCard.renderLoading(true);

    api

      .postCard(inputData)

      .then((cardData) => {

        cardElementsList.addItem(createNewCard(cardData));

        popupAddCard.close();

      })

      .catch((err) => {

        console.log(`${err}`);

      })

      .finally(() => {

        popupAddCard.renderLoading(false);

      });

  },

});



buttonEditProfile.addEventListener("click", () => {

  // обработчик кнопки редактирования профиля пользователя

  user

    .getUserInfo()

    .then((res) => {

      formEditProfileNameField.value = res.name;

      formEditProfileAboutField.value = res.about;

      formEditProfileValiadtor.refresh();

      popupEditProfile.open();

    })

    .catch((err) => {

      console.log(`Ошибка: ${err}`);

    });

});



buttonAddCard.addEventListener("click", () => {

  // обработчик кнопки добавления новой карточки

  formAddCardValidator.refresh();

  popupAddCard.open();

});



// попап окна просмотра фото в карточке

const popupWithImage = new PopupWithImage(popupPreviewImageSelector);



popupAddCard.setEventListeners();

popupWithImage.setEventListeners();

popupEditProfile.setEventListeners();

popupEditAvatar.setEventListeners();

profileAvatarContainer.addEventListener("click", () => {

  formEditAvatarValiadtor.refresh();

  popupEditAvatar.open();

});



function createNewCard(cardData) {

  // логика создания карточки вынесена в отдельную функцию

  // для более удобного взаимодействия между экземплярами классов

  cardData.userId = user.userId;

  const card = new Card(

    cardData,

    () => {

      popupWithImage.open(cardData);

    },

    (id, isLiked) => {

      if (isLiked) {

        api

          .deleteLike(id)

          // удаляем лайк с карточки

          .then((data) => {

            card.likesCount = data.likes.length;

            card.isLiked = false;

            card.toggleLikeButton();

          })

          .catch((err) => {

            console.log(`Ошибка: ${err}`);

          });

      } else {

        api

          .setLike(id)

          // ставим лайк карточке

          .then((data) => {

            card.likesCount = data.likes.length;

            card.isLiked = true;

            card.toggleLikeButton();

          })

          .catch((err) => {

            console.log(`Ошибка: ${err}`);

          });

      }

    },

    (id) => {

      api

        .deleteCard(id)

        // #TODO попап подтверждения удаления карточки

        .then(() => {

          card.delete();

        })

        .catch((err) => {

          console.log(`Ошибка: ${err}`);

        });

    },

    cardTemplateSelector

  );

  const cardElement = card.create();

  return cardElement;

}



//-------------------------- Загрузка данных на страницу -------------------------

Promise.all([api.getUserData(), api.getInitialCards()])

  // карточки должны отображаться на странице только после получения id пользователя

  .then(([userData, cards]) => {

    user.setUserInfo(userData);

    cards.forEach((card) => cardElementsList.addItem(createNewCard(card)));

  })

  .catch((err) => {

    console.log(err);

  });




  export const cardListSelector = "cards__list";

export const cardTemplateSelector = "#card-template";

export const cardElementSelector = ".card";

export const cardImageSelector = ".card__image";

export const cardTitleSelector = ".card__title";

export const cardDeleteBtnSelector = ".card__delete-button";

export const cardDeleteBtnInactiveModifier = "card__delete-button_inactive";

export const cardLikeBtnSelector = ".card__like-button";

export const cardLikeBtnActiveModifier = "card__like-button_active";

export const cardLikesCountSelector = ".card__likes";

// селекторы элементов разметки карточек



export const popupPreviewImageSelector = "popup_type_image-preview";

export const popupEditProfileSelector = "popup_type_edit-profile";

export const popupEditAvatarSelector = "popup_type_edit-avatar";

export const popupAddCardSelector = "popup_type_add-card";

export const popupCloseBtnSelector = "popup__close-button";

export const popupOpenedSelector = "popup_opened";

export const popupImageSelector = "popup__image";

export const popupImageTitleSelector = "popup__image-title";

// селекторы элементов разметки модальных окон



export const formSelector = ".form";

export const formFieldSelector = ".form__field-input";

export const formSubmitBtnSelector = ".form__submit-button";

// селекторы элементов разметки модальных окон



export const profileTitleSelector = "profile__title";

export const profileSubtitleSelector = "profile__subtitle";

export const profileAvatarSelector = "profile__avatar";

// селекторы элементов разметки профиля пользователя



export const formEditProfile = document.querySelector("#formEditProfile");

export const formEditProfileNameField = formEditProfile.elements["name"];

export const formEditProfileAboutField = formEditProfile.elements["about"];

export const formEditAvatar = document.querySelector("#formEditAvatar");

export const formAddCard = document.querySelector("#formAddCard");

export const profileAvatarContainer = document.querySelector(

  ".profile__avatar-container"

);

export const buttonEditProfile = document.querySelector(

  ".profile__edit-button"

);

export const buttonAddCard = document.querySelector(".profile__add-button");

// элементы страницы



