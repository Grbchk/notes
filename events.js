//---(события клавиатуры)---
// сработает один раз, когда нажали клавишу, т.е. происходит событие keypress
document.addEventListener('keypress', function() {
    console.log('Нажали клавишу');
});
//также есть 'keydown' и 'keyup'
// этот слушатель глобальный, но его можно добавлять и отдельным элементам (например инпуту input.addEventListener)


//---(объект event — клавиатура)---
const button = document.querySelector('button');
button.addEventListener('click', function (evt) { // объект event события 'click' (доступен как параметр)
    console.log(evt); // его можно использовать в теле обработчика
});
//---(валидация)---
    // <input id="input">
    // <div id="error" style="display: none"></div> 
const input = document.querySelector('#input');
const error = document.querySelector('#error'); // блок с ошибкой скрыт
input.addEventListener('keydown', function (evt) {
    if (Number.isNaN(Number(evt.key))) { // проверяем, была ли введена цифра 
    error.style.display = 'block'; // Если пользователь ввёл не цифру, показываем блок с ошибкой
    };
}); 
// key - свойство объекта event, хранит название нажатой клавиши
// keyCode - тоже свойство, хранит код клавиши (цифры в диапазоне 48(0)-57(9)), но скоро перестанет поддерживаться браузерами
// пример:
nameInput.addEventListener('keydown', function(evt) {
    if (evt.key === 'Enter') {
      console.log(evt);
    }
});
//или можно так:
function keyHandler(evt) { //выносим колбэк в отдельную функцию
    if (evt.key === 'Enter') {
      addSong(artistInput.value, titleInput.value);
    }
  }
artistInput.addEventListener('keydown', keyHandler); //вызываем функцию, передавая ее в качестве аргумента методу addEventListener по имени keyHandler


//---(объект event — мышь)---
//mouseover, mouseout, mousedown, mouseup, click, contextmenu, dblclick
//пример:
//При двойном клике по заголовку его текст меняется на случайный из массива
const coverHeading = document.querySelector('.cover__heading');
const playListTitles = ['Игорь Тальков. Лучшее','Музыка категории Б','Подборка с фестиваля FYRE'];
function getRandomElement(arr) {
  const randomId = Math.floor(Math.random() * arr.length);
  return arr[randomId];
}
coverHeading.addEventListener('dblclick', function () {
  const title = getRandomElement(playListTitles);
  coverHeading.textContent = title;
});

//---(event.pageX и event.pageY)--- 
//еще есть: (event.clientX и event.clientY), (event.screenX и event.screenY)
const popup = document.querySelector('.popup-window');
button.addEventListener('dblclick', function (event) { //будет показывать подсказку именно там, где пользователь сделал двойной щелчок мышью
    popup.setAttribute('style',
        `position: absolute;
        top: ${event.pageY}px; 
        left: ${event.pageX}px;
        display: block; 
        background-color: rgba(255, 204, 0, 0.5)`);
}); 


//---(снятие слушателя)--- 
someElement.addEventListener('click', someFunction); //добавляем слушатель, вызывая метод addEventListener()
someElement.removeEventListener('click', someFunction); //снимаем слушатель, вызывая метод removeEventListener() с теми же аргументами
//работает только при мередаче функции как (ССЫЛКИ) аргумент метода (ссылаясь на ф-ю по имени); если записать функцию внутрь вызова методов, то для JS это будут разные функции
//пример:
function someFunction() {
    someElement.textContent = getRandomElement(playListTitles);
    someElement.removeEventListener('dblclick', someFunction);
}
someElement.addEventListener('dblclick', someFunction); //этот вызов сработает только один раз, т.к. после этого вызова слушатель снимается внутри функции


//---(отмена стандартного поведения браузера)--- 
function keyHandler(evt) {
    if (evt.key.toLowerCase() === 'ё') {
      evt.preventDefault(); //не даст ввести в поле букву ё, отменяя браузерное поведение при событии 'keydown'
    }
}
artistInput.addEventListener('keydown', keyHandler);


//---(всплытие и делегирование)--- 
//---(всплытие) - это эффект, когда слушатель срабатывает у всех родительских элементом вплоть до window, при срабатывании слушателя на ребенке
<div id="parent">
  <div id="firstChild">
    <div id="secondChild">
      <div id="thirdChild">Нажми и всё поймёшь</div>
    </div>
  </div>
</div> 
function callback(evt) {
  console.log('Событие обработано');
};
//слушатели:
parent.addEventListener('click', callback);
firstChild.addEventListener('click', callback);
secondChild.addEventListener('click', callback);
thirdChild.addEventListener('click', callback);
//если кликнуть на thirdChild, то console.log выведет надпись 4 раза, т.е. событие у ребенка создает взрывную волну, активируя слушатели у всех родителей
//---(делегирование) - это добавление слушателя родительскому элементу (не каждой кнопке лайка песни, а всему плейлисту)
evt.currentTarget //это свойство хранящее элемент(плейлист), где сработал обработчик (плейлист - родительский элемент со слушателем) 
evt.target //это свойство хранящее элемент(лайк), где возникло событие (лайк - дочерний элемент, на котором сработало событие клик) 
//(в этом примере с плейлистом делегирование проявляет недостаток: обработчик также запустится при клике на любом другом элементе плейлиста(других песнях, заголовках...) и этому элементу добавится класс like_active)
//(поэтому создадим проверку на лайк)
playlist.addEventListener('click', function (evt) { //обработчик/слушатель висит на элементе playlist и обрабатывает все события 
    if (evt.target.classList.contains('song__like')) { 
        evt.target.classList.toggle('song__like_active'); 
    } 
}); 
//---(отмена всплытия)--- 
//---(stopPropagation)--- 
function callback(evt) {
  evt.stopPropagation(); //предотвратит эффект всплытия
}
parrent.addEventListener('click', callback);
firstChild.addEventListener('click', callback); //ребенок parrent
secondChild.addEventListener('click', callback); //ребенок firstChild
//при клике на secondChild, функция callback сработает только для этого элемента
//---(stopImmediatePropagation() - помимо остановки всплытия также выключает остальные слушатели, обрабатываюие то же событие у этого элемента
//сработает только коллбек содержащий stopImmediatePropagation(), остальные при клике не запустятся (в норме все функции запустились бы вместе(по порядку) при событии клик)
function callbackOne(evt) {
  evt.stopImmediatePropagation();
}
//тут описаны функции callbackTwo и anoverFunction...
secondChild.addEventListener('click', callbackOne); //внимание: это 3 разных слушателя(с разными аргументами) на одном и том же элементе secondChild
secondChild.addEventListener('click', callbackTwo);
secondChild.addEventListener('click', anoverFunction);
