//---(ФОРМЫ)---
//обращаться к полям формы можно как через ключи - document.forms, так и через .querySelector

//---(доступ к форме через ключи)---
//в js к форме можно обратиться по индексу, либо по имени:
/* 
<form name="form1">
    //...
</form>
<form name="form2">
    //...
</form> 
*/
//по индексу
document.forms[0]; // первая форма
document.forms[1]; // вторая форма 
//по имени(атрибут name)
document.forms.form1; // первая форма
document.forms.form2; // вторая форма


//---(тип submit)---
//событие submit происходит не только при клике на кнопку с этим типом, но и при нажатии Enter в поле ввода
//---(preventDefault)---
const form = document.forms.myForm;
form.addEventListener('submit', function (evt) { //вешаем на форму слушатель/обработчик события submit
    evt.preventDefault(); //отменяем поведение по умолчанию(перезагрузка страницы при событии submit)
    //...тут проверяем данные пользователя, при несоответствии данных отменяем отправку формы
    //...также совершаем необходимые операции с элементами на странице (напр. добавление имени и профессии в профиль при клике кнопки Сохранить)
}); 
//атрибут action - содержит адрес сервера, такая форма может работать даже без js


//---(доступ к элементам формы)---
//свойство формы elements содержит хранит элементы:
document.forms.form1.elements; // элементы первой формы
document.forms.form2.elements; // элементы второй формы 
//лучше обращаться к элементам по имени:
document.forms.form2.elements.answer; // <input type="number" name="answer" ...
document.forms.form2.elements.earth; // <input type="text" name="earth" ... 
//пример:
const form = document.forms.add; //имя формы add
const artist = form.elements.artist; //имя элемента artist


//---(доступ к значениям)---
//каждый из элементов формы содержит свойство со значением
input.value; // <input type="text" ...
textArea.value; // <textarea ...
checkbox.checked; //<input type="checkbox" ...
select.value; // <select name="mySelect"><option value="right">Первый пункт</option> ...</select>


//---(события change и input)---
//работает одинаково для всех типов полей, кроме текстовых
const checkbox = document.querySelector('input[type=checkbox]');
function callback(evt) {
    console.log(`Произошло событие ${evt.type}`); //свойство type хранит тип события
}
checkbox.addEventListener('input', callback); // выведет: Произошло событие input
checkbox.addEventListener('change', callback); // выведет: Произошло событие change 
//текстовые поля:
//input — срабатывает при вводе или удалении каждого символа;
//change — только когда поле изменилось и пользователь перешёл к другому элементу формы (пригодится, когда пользователь пропустил поле и ничего не заполнил)


//---(ПРИМЕРЫ)---
//---(валидация полей ввода)---
//при загрузке страницы кнопка неактивна (атрибут disabled в открывающем теге)
//если оба поля заполнены(artist, title) - кнопка становится активна
//после добавления песни кнопка снова становится неактивна, а поля очищаются
<button  class="... input__btn_disabled" disabled>я кнопка</button> //по-умолчанию установлены стили неактивной кнопки и атрибут disabled
const artist = form.elements.artist;
const title = form.elements.title;
//функция активирующая и отключающая кнопку
function setSubmitButtonState(isFormValid) {  //получает true или false
    if (isFormValid) {
      addButton.removeAttribute('disabled');
      addButton.classList.remove('input__btn_disabled'); 
    } else {
      addButton.setAttribute('disabled', true); //активирует атрибут disabled
      addButton.classList.add('input__btn_disabled'); //добавляет класс
    }
}
//слушатель события submit(происходит при клике по кнопке для отправки формы)
form.addEventListener('submit', function (evt) {
    evt.preventDefault(); //убираем поведение по умолчанию - перезагрузку страницы
    addSong(artist.value, title.value); //меняем значения полей добавляемой песни коллбеком
    artist.value = ''; //очищаем поле ввода у формы (лучше использовать reset для всей формы)
    title.value = '';
    setSubmitButtonState(false); //после добавления песни делаем кнопку снова неактивной
  });
//слушатель события input(происходит при каждом нажатии клавиши)
form.addEventListener('input', function (evt) { 
    let isValid = false;
    if (artist.value.length > 0 && title.value.length > 0) { //если оба поля содержат символы, то валидация пройдена
     isValid = true; 
    }
     setSubmitButtonState(isValid);
});


//---(очищаем поля формы после отправки)---
form.addEventListener('submit', function (evt) { //вешаем слушатель для всей формы
    //...
    form.reset(); //очищаем все поля после отправки формы
  }); 


//---(программный вызов submit)---
//например автоматическая отправка формы при входе в банк, после ввода проверочного кода
const form = document.forms.myForm;
const input = form.elements.myInput;
form.addEventListener('input', function (evt) { 
  if (input.length === 4) {  // если введено четыре символа
   form.submit();  // как только в текстовое поле введут четвёртый символ, произойдёт событие submit
  }
});
form.addEventListener('submit', function (evt) {
  // обработка события submit
}); 


//---(ВАЛИДАЦИЯ ФОРМ)---

//---(браузерная валидация форм)---
//может пригодиться когда на странице JS отключен ради безопасности
type="url" //введенное значение начинается с http:// или https:// и содержит минимум один символ после
type="email" //значение поля содержит минимум один символ до @ и один после
minlength="2" //форма не отправится, если значение поля ввода содержит только один символ
maxlength="30"
//
//---(стилизация полей псевдоклассами)---
// :valid   // — указывает, что введены корректные данные
// :invalid // — указывает, что данные некорректны
// :checked // — применяет стили к отмеченным чекбоксам(type="checkbox"), или радиокнопкам(type="radio")
// :not     // — показывает элементы, которые не отмечены как :checked
    // .form__input:invalid {     //
    //     border: 1px solid red; //
    //   }                        //
//теперь пользователь мгновенно получает обратную связь - если поле неверно заполнено, то у него появляется красная рамка
//
//---(атрибут required)---
//делает данное поле необходимым для заполнения


//---(валидация с JavaScript)---
//<form class="form" novalidate> - задаем атрибут убирающий стандартные сообщения об ошибке 
//
//---(объект ValidityState)---
//это встроенный в JS объект для сверки данных
//доступ к объекту получается через свойство элемента - validity
console.log(evt.target.validity); 
//выведет в консоль объект ValidityState со всеми 11 свойствами и их значениями


//---(JS-методы валидации с DOM)---
//разметка:
//<form class="form" novalidate>
//  <label class="form__field">
//      подпись поля
//      <input id="email-input" class="form__input" type="email" placeholder="Email" required>
//      <span class="email-input-error form__input-error"></span> 
//  </label>
//  <button class="form__submit">кнопка</button>
//</form>  
//ПРИМЕР (валидация одной формы):
const formElement = document.querySelector('.form');
const formInput = formElement.querySelector('.form__input');
// Функция, которая добавляет класс с ошибкой
const showInputError = (element) => {
  element.classList.add('form__input_type_error');
};
// Функция, которая удаляет класс с ошибкой
const hideInputError = (element) => {
  element.classList.remove('form__input_type_error');
};
// Функция, которая проверяет валидность поля
const isValid = () => {
  if (!formInput.validity.valid) { 
    showInputError(formInput); // Если поле не проходит валидацию, покажем ошибку
  } else {
    hideInputError(formInput); // Если проходит, скроем
  }
};
// Отменим стандартное поведение
formElement.addEventListener('submit', function (evt) {
  evt.preventDefault(); 
});
// Вызовем функцию isValid на каждый ввод символа
formInput.addEventListener('input', isValid);
//
//
//---(span для ошибки)---
//добавляем в разметку формы <span> с текстом ошибки:  
//<input id="email-input" class="form__input" ... 
//<span class="email-input-error form__input-error">текст ошибки</span>  //!лучше использовать свойство поля ввода validationMessage
const formInput = formElement.querySelector('.form__input');
console.log(formInput.id);  //выводит id поля ввода - "email-input"
//создаем универсальную переменную для ошибки с помощью шаблонной строки
const formError = formElement.querySelector(`.${formInput.id}-error`);
//
//
//ПРИМЕР продолжение:
const formElement = document.querySelector('.form');  //элемент формы содержащей проверяемое поле ввода 
const formInput = formElement.querySelector('.form__input');   //проверяемое поле ввода
// Выбираем элемент ошибки на основе уникального класса 
const formError = formElement.querySelector(`.${formInput.id}-error`);
//добавляем функцию для показа ошибки
const showInputError = (element) => {
  element.classList.add('form__input_type_error');  //показываем сообщение об ошибке
  formError.classList.add('form__input-error_active');
};
//добавляем функцию для удаления ошибки
const hideInputError = (element) => {
  element.classList.remove('form__input_type_error');  //скрываем сообщение об ошибке
  formError.classList.remove('form__input-error_active');
};
//
//
//---(редактирование сообщения об ошибке)
//по умолчанию в свойстве поля ввода validationMessage записан текст ошибки
//редактируем функцию показа ошибки:
const showInputError = (element, errorMessage) => { //добавляем функции второй параметр - errorMessage
    //...
    formError.textContent = errorMessage;  //добавляем эту строку
};
//редактируем функцию удаления ошибки:
const hideInputError = (element) => {
    //...
    formError.textContent = ''; //очищаем текст ошибки
};
//редактируем функцию проверяющую валидность поля:
const isValid = () => {
    if (!formInput.validity.valid) {
        showInputError(formInput, formInput.validationMessage);  //передаем сообщение об ошибке вторым аргументом
    }
    //...
};


//---(валидация нескольких полей и форм)---
//разметка:
//<form class="form" novalidate>
//  <label class="form__field">
//      подпись поля имейл
//      <input id="email-input" class="form__input" type="email" placeholder="Email" required>
//      <span class="email-input-error form__input-error"></span>
//  </label>
//  <label class="form__field">
//      подпись поля паспорт
//      <input id="password-input" class="form__input" type="password" placeholder="Password" required minlength="6">
//      <span class="password-input-error form__input-error"></span>
//  </label>
//  <button class="form__submit">кнопка</button>
//</form>  
//ПРИМЕР (рефакторинг кода выше):
//перепишем функции: isValid, showInputError, hideInputError
//теперь они принимают formElement(форма с проверяемым полем) и inputElement(проверяемое поле, в примере до этого formInput)
//функция валидации 
const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage); //теперь также принимает formElement(форму с проверяемым полем)
    } else {
      hideInputError(formElement, inputElement); //теперь также принимает formElement
    }
  }; 
//функция показа ошибки
const showInputError = (formElement, inputElement, errorMessage) => {  //теперь также принимает formElement
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);  //ищем <span> (элемент ошибки) в форме с проверяемым в данный момент полем
    //...
}
//функция удаления ошибки
const hideInputError = (formElement, inputElement) => { //теперь также принимает formElement
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    //...
}
//создадим функцию setEventListener для добавления слушателей событий всем полям ввода внутри формы
//вместо добавления слушателя на одно поле ввода - formInput.addEventListener('input', isValid)
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));  //делаем массив полей формы
    inputList.forEach((inputElement) => {  //обходим все элементы полученного массива
      inputElement.addEventListener('input', () => {  //каждому полю добавим обработчик события input с коллбеком, вызывающим проверку
        isValid(formElement, inputElement) 
      });
    });
};
//создадим функцию enableValidation для добавления слушателей событий всем формам на странице
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.form')); //создаем массив форм
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();  //каждой форме отменим стандартное поведение
      }); 
      setEventListeners(formElement);  //для каждой формы вызовем функцию setEventListeners, передав ей текущую форму
    });
}; 
enableValidation();  //вызовем функцию


//---(кнопка отправки формы)---
//активна, только если все поля валидны
//создадим функцию, принимающую массив полей, и возвращающую true, если один из инпутов невалиден
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => { //проверка на валидность, если проверяемое поле не валидно, колбэк вернёт true обход массива прекратится
      return !inputElement.validity.valid; //и вся фунцкция и hasInvalidInput вернёт true
    })
}; 
//создадим функцию, активирующую кнопку
const toggleButtonState = (inputList, buttonElement) => {  //принимает массив полей и элемент кнопку
    if (hasInvalidInput(inputList)) {  //если есть хотя бы один невалидный инпут     
      buttonElement.classList.add('form__submit_inactive'); //сделать кнопку неактивной
    } else {
      buttonElement.classList.remove('form__submit_inactive');
    }
};
//допишем функцию setEventListeners, добавляющую слушатели событий всем полям формы
const setEventListeners = (formElement) => {
    //...
    const buttonElement = formElement.querySelector('.form__submit');  //находим кнопку в разметке
    toggleButtonState(inputList, buttonElement);  //вызываем функцию в первый раз, чтобы заблокировать кнопку еще до ввода данных в поля
    //...
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);  //внутри обработчика события input, после вызова isValid, еще раз вызовем toggleButtonState, чтобы сверять состояние кнопки при каждом изменении полей ввода
    //...
};
//если в форме есть филдсеты, то редактируем функцию enableValidation
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.form')); //создаем массив форм
    formList.forEach((formElement) => {
      //...
      const fieldsetList = Array.from(formElement.querySelectorAll('.form__set')); //создаем массив филдсетов в текущей форме
        fieldsetList.forEach((fieldSet) => {
          setEventListeners(fieldSet); //для каждого филдсета вызываем функцию, добавляющую слушатели элементам 
        }); 
        //setEventListeners(formElement); - вызов для текущей формы нужно удалить
    });
  };