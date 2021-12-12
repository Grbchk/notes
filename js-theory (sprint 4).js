<script src="./script.js"></script>
//шаблонная строка
console.log(`Это - шаблонная строка,
и она может занимать
несколько строк и содержать вычисления ${2 + 5}`);
//шаблонная строка `` вместо конкатенации
console.log(`После ${hours}:00 скидка в магазине ${discount}%`);

//сокращенная запись оператора добавочного присваивания
i += 1;
i = i + 1;
i ++; //для циклов

//Сравнение равно - не равно
console.log(7 === 6); // false — проверка на равенство
console.log(7 !== 6); // true — проверка на неравенство

//Циклы
while (number <= 20) {}
for (let i = 0; i <= 10; i += 1) {}
do {} while (number <= 20); //выполнится хотя бы раз, до проверки условий (например выведет знач. переменной по умолчанию)


//document.querySelector - это метод объекта document (см. свойства и методы document на mdn)
//querySelector возвращает null, если не нашёл на странице элемент с искомым селектором:
//const element = document.querySelector('.non-existing-class');

console.log('эспрессо'.length);
console.log('эспрессо'[0]);

25 / 0; // Infinity
-25 / 0; // -Infinity
Number.isFinite(Infinity); // false для бесконечности
Number.isFinite(1703); // для конечного числа вернет true

console.log(10 - 'десять'); // NaN
console.log(10 + undefined); // NaN
console.log(10 + 'десять'); // "10десять"
console.log(typeof NaN); // nan относится к числовому типу данных - вернет "number"
console.log(NaN === NaN); // false; nan не равно ничему, даже самому себе
Number.isNaN(NaN); // является ли это nan? - вернет true

//DOM расшифровывается как Document Object Model.
//Фактически это и есть HTML-разметка: блоки, из которых состоит документ
let container = document.querySelector('#container');
let content = container.querySelector('.content');
let contentItems = content.querySelectorAll('.content__item');
let contentItem = content.querySelector('.content__item');
console.log(contentItem) // Выведет <div class="content__item"></div>
let contentItems = content.querySelectorAll('.content__item');
console.log(contentItems); // Выведет все элементы c классом .content__item
//---(1)---
<section class="bag">
  <div class="item bag">Косметичка
    <p class="item">Помада</p>
    <p class="item">Тушь</p>
  </div> </section>
let cosmeticBagContent = document.querySelectorAll('section.bag div.bag .item'); // Будут выбраны помада и тушь
//---(2)---
let imageOnPage = document.querySelector('img');
imageOnPage.getAttribute('src'); // вернет ссылку
imageOnPage.hasAttribute('src'); // true
bigAndRed.removeAttribute('disabled'); // удаляет атрибут
bigAndRed.setAttribute('lang', 'ru'); // устанавливает атрибут
disabledCheckbox.setAttribute('disabled', true); //Чтобы сделать чекбокс неактивным, нужно передать методу setAttribute два аргумента: disabled и любой другой
//---(3)---
//пример структуры обращений
let container = document.querySelector('.container');
let songsContainer = container.querySelector('.songs-container');
let songs = songsContainer.querySelectorAll('.song');
let addButton = container.querySelector('.form__submit-btn_action_add');
let resetButton = container.querySelector('.form__submit-btn_action_reset');
if (songs.length === 0) { //если длина плейлиста 0, то кнопка неактивна
  resetButton.setAttribute('disabled', true); // true ничего не значит, при disabled можно передать любой второй атрибут (просто он необходим для корр.работы)
  resetButton.setAttribute('style', 'background-color: #f1f1f1'); //меняем цвет фона кнопки
  // или
  resetButton.style.backgroundColor = '#f1f1f1'; //меняем цвет фона кнопки
}
//---(4)---
<div id="owl">Сова</div> // это элемент в html
let owl = document.querySelector('#owl'); // делаем из элемента объект js
//---(className)---
let rank = document.querySelector('.princess');
rank.className = 'queen'; //меняем имя класса с помощью свойства className (удобно использовать когда у элем. только один класс)
//---(classList)---
<div class="bentley rolls-royce">Королевский гараж</div> //В именах классов записаны марки машин
let garage = document.querySelector('.bentley'); //создаем объект по одному из классов элемента
console.log(`Гараж содержит: ${garage.classList}`); // Гараж содержит: bentley rolls-royce
//---(contains)(add)(remove)(toggle)---
garage.classList.contains('jaguar'); // false
garage.classList.add('jaguar'); //добавляет класс
garage.classList.remove('jaguar'); //удаляет класс
garage.classList.toggle('jaguar'); //удаляет переданный класс, если он уже содержится, и добавляет класс, если его нет (как add + remove)
//---(5)---
document.body.innerHTML; //покажет разметку
document.body.innerHTML = '<div>pupok</div>'; //заменит всю разметку на эту строку;
document.body.innerHTML = `<div>${pupok}</div>`; //`` - для добавления нескольких строк; можно вставлять код внутрь строки
zoo.innerHTML += '<div class="animal"></div>'; //с помощью конкатенации в элемент zoo будут добавляться дивы
divElement.innerHTML = ''; // записав пустую строку, можно удалить всё содержимое элемента
console.log(paragraph.textContent); // "Это текст внутри элемента."
paragraph.textContent = 'А это новый текст.'; // можно перезаписать содержимое
console.log(paragraph.innerText); //innerText проигнорирует всё, что скрыто свойством display: none, а textContent — нет. Лучше всегда использовать textContent, т.к. он есть в спецификации
//свойства innerHTML и textContent сбрасывают все изменения в элементах добавленные с помощью js, т.к. заново пересоздается DOM-дерево
//---(6)---
element.addEventListener('click', имяФункции); //функция-колбэк; если функцию передают как аргумент, её называют «колбэком»
element.addEventListener('click', function () {
  console.log('Мы кликнули по элементу');
});
//---(7)---
//методы insertAdjacentHTML и insertAdjacentText не приводят к пересозданию DOM-дерева
zoo.insertAdjacentHTML('beforeend', '<div class="animal"></div>');
//---(8)---
console.dir(document.body);
// отобразит список свойств и методов переданного объекта (элемента в html)
//например свойство value, которое есть у всех элементов input
//---(typeof)---
console.log(typeof document.querySelector('.input__text_type_artist').value); //выводит в консоль тип свойства value элемента input; - "string"

//DOM II часть
//свойство innerHTML и метод insertAdjacentHTML принимают разметку в виде строки. Такой способ добавления элементов небезопасен
//---(createElement, createTextNode)---
const listItem = document.createElement('li');
const textItem = document.createTextNode('Hello, world');
node.append() //добавляет узлы или строки в конец node
node.prepend() //в начало node  (например добавляет новые карточки в проекте место вперед остальных)
node.before() //до node
node.after() //после node
node.replaceWith() //заменяет node заданными узлами
//---(добавление элементов)---
const list = document.querySelector('.todo-list'); //ссылаемся на узел относительно которого добавляется элемент
const listItem = document.createElement('li'); //создаем элемент который хотим добавить
const listItem2 = document.createElement('li');
const listItem3 = document.createElement('li');
listItem.textContent = 'Полить цветы'; //наполняем текстовым содержимым
list.append(listItem, listItem2, listItem3); //добавляем в разметку
//---(добавляем массив элементов)---
const list = document.querySelector('.todo-list'); //ссылаемся на узел относительно которого добавляются элементы
const tasks = [
  'Сделать проектную работу',
  'Погулять с собакой',
  'Пройти туториал по Реакту'
];
const taskElements = []; // создаем массив элементов
for (let i = 0; i < tasks.length; i++) {
  const listItem = document.createElement('li');
  listItem.textContent = tasks[i];
    taskElements[i] = listItem;
}
for (let i = 0; i < taskElements.length; i++) { // добавляем элементы в DOM с использованием цикла
    list.append(taskElements[i])
}
//---(пример добавления разметки)---
function addSong(artistValue, titleValue) {
  const trackContainer = document.createElement('div');
  trackContainer.classList.add('song');
  const artistElement = document.createElement('h4');
  artistElement.classList.add('song__artist');
  artistElement.textContent = artistValue;
  const titleElement = document.createElement('h4');
  titleElement.classList.add('song__title');
  titleElement.textContent = titleValue;
  const likeButtonElement = document.createElement('button');
  likeButtonElement.classList.add('song__like');
  trackContainer.append(artistElement, titleElement, likeButtonElement);
  songsContainer.append(trackContainer);
}
// и все это аналогично такой записи, содержащей уязвимость:
songsContainer.insertAdjacentHTML('beforeend', `
    <div class="song">
        <h4 class="song__artist">${artistValue}</h4>
        <p class="song__title">${titleValue}</p>
        <button class="song__like"></button>
    </div>
`);
//---(удаление элементов)---
const listItem = document.querySelector('li');
listItem.remove(); //выбираем и удаляем элемент (но метод querySelector редко используется для выбора удаляемых элементов)
//---(пример)---
`<li class="todo__item">
  <span>Полить цветы</span>
  <button class="todo__item-button">Удалить</button>
<li> ` //разметка элемента списка
const deleteButton = document.querySelector('.todo__item-button'); //выбираем кнопку удаления
deleteButton.addEventListener('click', function () { //добавляем обработчик событий для кнопки
  const listItem = deleteButton.closest('.todo__item'); //метод closest возвращает ближайший родительский элемент с переданным селектором (т.е. весь li)
  listItem.remove();
});
//---(перемещение элементов)---
const list = document.querySelector('.todo-list');
const listItems = list.children; // в свойстве children хранится псевдомассив дочерних элементов
list.append(listItems[0]); // переместили первый элемент todo-листа в конец
//---(клонирование элементов)---
const container = document.querySelector('.container');
const element = document.querySelector('.element');
const elementCopy = element.cloneNode(true); //скопировать элемент вместе с содержимым - true, без содержимого - false
container.append(elementCopy); //метод cloneNode только копирует элемент, необходимо добавить его в DOM с помощью append или другого метода добавления
//---(template-элементы)---
`<template id="user">
  <div class="user">
    <img class="user__avatar" alt="avatar">
    <p class="user__name"></p>
  </div>
</template>` //содержимое тега template не отобразится на сайте
const userTemplate = document.querySelector('#user').content;
const usersOnline = document.querySelector('.users-online'); //??
const userElement = userTemplate.querySelector('.user').cloneNode(true); // клонируем содержимое тега template, т.е. div
userElement.querySelector('.user__avatar').src = 'tinyurl.com/v4pfzwy'; // наполняем содержимым
userElement.querySelector('.user__name').textContent = 'Дюк Корморант';
usersOnline.append(userElement); // отображаем на странице
//---(объект event)---
`<template id="song-template">
    <div class="song">
      <button class="song__like"></button>
    </div>
  </template>`
const songTemplate = document.querySelector('#song-template').content; //см. template-элементы
const songElement = songTemplate.querySelector('.song').cloneNode(true);
songElement.querySelector('.song__like').addEventListener('click', function (evt) { //добавляем обработчик событий для лайка, принимающий объект event как параметр (объект event содержит информацию и о произошедшем событии, о «кликнутом» элементе и т.д.)
  const eventTarget = evt.target; //в свойстве target (объекта event) хранится элемент, на котором сработало событие
  eventTarget.classList.toggle('song__like_active'); //меняем внешний вид кликнутого лайка, добавляя/убирая класс со стилями
});
//---(parentElement)---
//свойство содержит ссылку на родительский элемент
const element = document.querySelector('p');
console.log(element.parentElement); // body, так как это родитель p
//---(children)---
//свойство содержит псевдомассив всех дочерних элементов указанного элемента
const body = document.querySelector('body');
console.log(body.children); // HTMLCollection(1) [p]
//---(firstElementChild, lastElementChild)---
//если у элемента нет дочерних элементов, свойства firstElementChild и lastElementChild вернут null
//---(previousElementSibling, nextElementSibling)---
//свойства содержат ссылки на предыдущий и следующий соседние/сестринские элементы; если соседа нет — вернётся null

//---(SyntaxError)---
Uncaught SyntaxError: Unexpected token ) //неожиданная скобка
//---(ReferenceError)---
ReferenceError: numdberFnc is not defined //функция numdberFnc не объявлена
//---(TypeError)---
Uncaught TypeError: hut is not a function //переменная hut не является функцией

//Если объявить через const массив, вы сможете добавлять и удалять его элементы, но переопределить массив целиком не получится.
//Старайтесь использовать константные переменные const везде, где возможно. В случае, когда значение нужно изменять, используйте let.

//Методы работы с данными
//---(indexOf)---
'эспрессо'.indexOf('к'); // -1 если символа в строке нет
'Яндекс.Практикум'.indexOf('Я'); // 0, если таких символов в строке несколько, метод вернёт индекс первого из них
'Ночь, улица, фонарь, аптека'.indexOf('фонарь'); // 13,  вернёт индекс первого символа из последовательности
'Шалаш'.indexOf('ш'); // 4, чувствителен к регистру
//---(includes)---
'хлеб да соль'.indexOf('соль') !== -1; // true, но есть более элегантный способ проверки на содержание набора символов
'Гарри Поттер'.includes('Гарри'); // true
//---(startsWith, endsWith)---
'Вендетта'.startsWith('В'); // true, Эта строка начинается с вот такого набора символов?
'Это ещё не конец'.endsWith('конец'); // true, Эта строка заканчивается вот таким набором символов?
//---(toLowerCase, toUpperCase)---
//возвращают новую строку, все символы которой переведены в нижний и верхний регистр
console.log(firstStr === secondStr); // false
console.log(firstStr.toLowerCase() === secondStr.toLowerCase()); // true, когда нужна проверка без учета регистра
//---(split)---
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/split
'Пришёл. Увидел. Победил.'.split('. '); // ["Пришёл", "Увидел", "Победил."] - превращает строку в массив
//---(slice)---
'Не прислоняться'.slice(6, 10); // "слон"
'Яндекс.Практикум'.slice(7); // "Практикум" - вернёт все символы от заданного в первом аргументе до конца строки
//---(методы объекта Math)---
Math.floor(9.99); // 9
Math.ceil(9.01); // 10
Math.round(9.51); // 10
Math.max(1, 2, 3, 4, 5); // 5
Math.min(1, 2, 3, 4, 5); // 1
Math.random(); // 0.31764219954126016
//---(parseInt)---
parseInt('38 попугаев'); // 38 - приводит переданный аргумент к целому числу, если встречает не цифру, останавливается и возвращает прочитанное до этого
parseInt('Метро 2033'); // NaN
parseInt('100', 10); // 100
parseInt('100', 2); // 4 - явно указывайте систему счисления, чтобы избежать неожиданных результатов
//---(parseFloat)---
parseFloat('36.6 t'); // 36.6 - аналогично parseInt, но выводит число с плавающей точкой
//---(Number.isInteger)---
Number.isInteger(8.5); // false
Number.isInteger(Math.floor(8.5)); // true
//---(неявное приведение к типам)---
console.log(67 + +'33'); // 100, "+" - это унарный плюс, операнд приводящий к числовому типу: +"-77"=-77, +"33"=33
console.log('3' - 1); // 2 - также к числу приводит любое математическое действие кроме конкатенации
1 + ''; // "1"
'451' < 452; // true
if (usernameElement) //в условиях if данные приводятся к логическому типу; так значение эквиваленстное null становится false, и таким образом тело условия выполнено не будет
//---(явное преобразование типов)---
const cat = String(true); // "true"
const cat = Number('счастье не за горами'); // NaN
Boolean('Непустая строка'); // true; всё интуитивно пустое (ноль, NaN, null, undefined, пустая строка) приводится к false, остальное — к true

//---(операторы)---
/* сначала выполняется !, потом &&, затем || */
//Логическое НЕ
let merry = true;
console.log(!merry); // false
!(3 > 2) === 3 <= 2; // true (false=false)
!'Непустая строка' // false (предварительно приводит к булевому значению, потом меняет на false)
!!'непустая строка'; // true (двойное отрицание сработает как приведение к логическому типу)
//Логическое И (&&)
2 * 2 === 4 && 5 < 6 && 'Котя' // Котя; если все правда, вернет последнее правдивое
2 * 2 === 4 && undefined && 'Котя' //  undefined; если среди условий есть ложные, вернет первое ложное
// - вернёт истину только когда две булевы переменные истинны
//Логическое ИЛИ (||)
let condition =  0 || NaN || 'строка' || false; //в переменную запишется первое истинное условие, т.е. 'строка'
// - вернёт истину, когда хотя бы одно из булевых переменных истинно; оператор ИЛИ из пустоты и чего-нибудь определённого выбирает определённое
//пример (нормальное ли давление?)
function getNormal(sys, dia) {
  return (sys>100 && sys<135)&&(dia>60 && dia<85) //скорее это пример использования операторов с return
}

//---(тернарный{тройной} оператор)---
const love = true;
const result = love ? 'к сердцу прижмёт' : 'к чёрту пошлёт';
console.log(result); // "к сердцу прижмёт"
//такая конструкция возвращает первое значение, если условие(первый операнд - love) — true, и второе, если false

//---(switch-case)---
let catName;
const cartoon = 'Лето кота Леопольда';
switch (cartoon) {
    case 'Зима в Простоквашино':
    case 'Весна в Простоквашино':
        catName = 'Матроскин';
        break;
    default:
        catName = 'Леопольд';
}
console.log(catName);

//---(Циклы)---
//---(break)---
for (let i = 2019; i < 2119; i++) {
  if (i % 4 === 0 && i % 100 !== 0) {
      console.log('Ближайший високосный год: ' + i); // 'Ближайший високосный год: 2020' - остальные вычисления не имеют смысла
      break;
  }
}
//---(continue)---
if (i % 4 === 0) {
  if (i % 100 === 0) continue; //...
//пропуск года, кратного 100

//Массивы
let months = ['Январь', 'Февраль'];
months[1];
//свойство length
months.length;
[1, 2].length;
//первый и последний элементы массива
console.log(cat[0]);
console.log(cat[cat.length - 1]);
//---(метод concat)---
const moscowAttractions = ['Кремль', 'Третьяковская галерея'];
const spbAttractions = ['Эрмитаж', 'Мариинский театр'];
const volgogradAttractions = ['Мамаев Курган', 'Родина-мать'];
const russiaAttractions = moscowAttractions.concat(spbAttractions, volgogradAttractions); //либо передаваемые значения берутся в кавычки - ('строка');
//все аргументы, переданные методу, будут добавлены в новый массив в том же порядке; не меняет структуру начального массива, а возвращает новый
//---(метод join)---
const bremenMusicians = ['Кот', 'Пёс', 'Трубадур', 'Осёл', 'Петух'];
console.log(bremenMusicians.join()); //Кот,Пёс,Трубадур,Осёл,Петух (по умолчанию разделяет "," без пробела)
console.log(`${bremenMusicians.join(', ')}`); //Кот, Пёс, Трубадур, Осёл, Петух
//создаёт строку из элементов массива; не меняет структуру начального массива, а возвращает новый
//---(метод push)---
const emeraldCityHeroes = ['Лев', 'Дровосек', 'Страшила'];
emeraldCityHeroes.push('Элли', 'Тотошка');
console.log(emeraldCityHeroes); // ["Лев", "Дровосек", "Страшила", "Элли", "Тотошка"]
//меняет изначальный массив, добавляет новые элементы в конец массива
//---(метод pop)---
const insects = ['Бабочка', 'Мотылёк', 'Божья коровка', 'Комар'];
const moscito = insects.pop();
// удаляет последний элемент из массива, сохраняет его в переменную
//---(метод shift)---
// удаляет первый элемент массива, записывается аналогично pop()
//---(метод unshift)---
//добавляет элементы в начало массива
insects.unshift('Муравей', 'Стрекоза'); //элементы массива передают через запятую
//Вывод про shift и unshift: Используются крайне редко. Работать с первым элементом затратнее, чем с последним. Для этого нужно перезаписать массив целиком: первый элемент сделать вторым, второй — третьим и так далее. Поэтому программисты строят алгоритмы так, чтобы записывать или удалять элементы массива с конца.
//---(метод slice)---
const spring = months.slice(2, 5); // начиная с индекса 2 и до, но не включая индекс 5
const Quarter = months.slice(9); // взять все элементы, начиная с индекса 9 и до конца массива
const autumn = months.slice(-4, -1); // начиная с четвёртого элемента с конца и до первого с конца (не включительно)
const boringTale2 = boringTale.slice(); // скопирует весь первоначальный массив
// копирует часть массива и делает из неё новый массив, исходный массив не меняется
//---(метод splice)---
const week = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
const removedItems = week.splice(0, 5, 'Вс', 'Сб', 'Вс', 'Сб', 'Вс'); // начиная с индекса 0 удалим 5 элементов и вставим на их место другие
console.log(removedItems); // ['Пн','Вт','Ср','Чт','Пт']
console.log(week); // ['Вс', 'Сб', 'Вс', 'Сб', 'Вс','Сб','Вс']
//выполняет два действия: удаляет элементы из массива и добавляет на их место новые. Первый аргумент метода — индекс элемента, с которого надо начать удалять. Второй — сколько элементов нужно удалить.
//---(коллекции в DOM)---
//коллекция NodeList получается с помощью метода querySelectorAll
//коллекция HTMLCollection с помощью свойства children
const posts = content.querySelectorAll('.post');
const postsArray = Array.from(posts); // такой вызов вернёт полноценный массив
//---(метод forEach)---
//---(1)---
const how = ['1', '2', '3'];
how.forEach(function (item) {
    console.log(item + '!');  //1! 2! 3!
});
//---(2)---
const how = ['1', '2', '3'];
for (let i = 0; i < how.length; i += 1) {
    console.log(how[i] + '!');  //1! 2! 3! - аналогично 1 примеру. Но с forEach нельзя использовать директивы continue и break. Поэтому метод не используют, когда нужно прервать выполнение цикла каким-то условием
}
//---(3)---
const elements = document.querySelectorAll('.text'); //это NodeList
elements.forEach((item) => {
   item.classList.add('text_is-active');
});
//метод forEach нужен для обхода массива. В качестве аргумента forEach принимает функцию. Она будет вызвана на каждом элементе массива поочерёдно
//---(метод map)---
const firstArr = [0, 1, 2, 3, 4];
const secondArr = firstArr.map(function (item) { //берём каждый элемент массива
  return item * item; //если не прописать return, функция сработает, но вернёт undefined
});
console.log(secondArr); // [0, 1, 4, 9, 16]
//метод map создаёт новый массив на основе существующего, результат работы функции — то, что указано после ключевого слова return
//---(Перебор массива, методы forEach и map)---
//---(пример)---
`   <ul class="directors">
    </ul>
    </main>
<template class="director-template">
<li class="directors__item">
  <h2 class="directors__name"></h2>
  <p class="directors__description"></p>
  <a href="" class="directors__films">Фильмография</a>
</li>
</template>`
const directorsList = document.querySelector('.directors'); //находим ul в разметке
const directorTemplate = document.querySelector('.director-template').content; //наполняем ul контентом из template
const directors = [
  { name: 'Стивен Спилберг',
    career: 'Продюсер, Режиссер, Актер, Сценарист, Монтажер',
    films: 'https://datalens.yandex/vwlqd2afsifoq?f3d80b92-5f21-40fa-b8d8-7255e038d045=22260&c8e5e20f-9329-4545-8550-b096c5b41d16=producer',
    top_rated_film: 'Список Шиндлера'
  }, ...];
directors.forEach(function (item) { //перебираем элементы массива
  const directorElement = directorTemplate.cloneNode(true); //копируем li в эту переменную
  directorElement.querySelector('.directors__name').textContent = item.name; //обращаемся к элементам тега li и наполняем их содержимым из свойств объектов массива
  directorElement.querySelector('.directors__description').textContent = item.career;
  directorElement.querySelector('.directors__films').href = item.films;
  directorsList.append(directorElement); //добавляем наполненный контентом li в ul
});
//---(3 аргумента forEach и map)---
const ivans = ['Иван I Калита','Иван II  Красный','Иван III Великий'];
const ivansIndexed = ivans.map(function(item, index, array) { ////функция(колбэк) которую мы передаём методам forEach и map, при каждом исполнении получает три аргумента; первый параметр считывается как текущий элемент, второй — как его индекс, третий исходный массив как аргумент (пригодится, когда нужно обратиться к свойствам этого исходного массива)
  const currentIndex = `(${(index + 1)} из ${array.length})`;
  return `${item} ${currentIndex}`;
});
console.log(ivansIndexed); //"Иван I Калита (1 из 3)","Иван II  Красный (2 из 3)","Иван III Великий (3 из 3)"
//---(пример map с условием if внутри)---
const smiles = [':)', ':)', ':)', ':)', ':3']
const newSmile = smiles.map(function (smile) {
  if (smile === ':)') {return  ':(';}
  return smile;
});
console.log(newSmile); //:(, :(, :(, :(, :3
//---(метод filter)---
//---(1)---
const a = [1, 9, 2, 2, 3, 4, 1, 7, 8, 0, 9, 0, 1, 5, 3];
const b = a.filter(function (item) { //метод filter принимает колбэк в качестве аргумента, этот колбэк будет вызван на каждом элементе
  return item > 5
});
console.log(b); // [9, 7, 8, 9]
//---(2)---
const animals = ['Dodo', 'Tiger', 'cat','Penguin', 'Dodo' , 'cat']; //метод lastIndexOf() возвращает последний индекс, по которому данный элемент может быть найден в массиве или -1, если такого индекса нет
console.log(animals.lastIndexOf('cat')); //5
const b = animals.filter(function (item, position, array) { //в b сохранятся только те элементы, для которых фильтр вернет true
  return animals.lastIndexOf(item) === position;
});
console.log(b); //["Tiger", "Penguin", "Dodo", "cat"]
//lastIndexOf('cat') вернет индекс 5(по последнему элементу 'cat' в массиве), в массиве позиция текущего элемента 'cat' 3, значит при проверке вернет false
//lastIndexOf('cat') вернет индекс 5, в массиве позиция 5, а значит === вернет true
//lastIndexOf('Dodo') 4, позиция 4, а значит === вернет true и т.д.
//---(3)---
const a = [1, 9, 2, 2, 3, 4, 1, 7, 8, 0, 9, 0, 1, 5, 3];
const b = a.filter(function (item, position, array) {
  return array.lastIndexOf(item) === position; // вернём уникальные элементы: см. lastIndex - https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf
});
console.log(a); // [1, 9, 2, 2, 3, 4, 1, 7, 8, 0, 9, 0, 1, 5, 3]
console.log(b); // [2, 4, 7, 8, 9, 0, 1, 5, 3]
//метод filter создаёт новый массив из элементов, для которых функция-фильтр вернула true, при этом исходный массив не меняется
//---(4)---
const movies = ['Титаник (1997)','Чёрная Пантера (2018)','Остров Собак (2018)'];
const moviesFiltered = movies.filter(function (item) {
	return item.includes('2018');
});
console.log(moviesFiltered); //Чёрная Пантера (2018), Остров Собак (2018)
//---(метод some)---
//!!!!
const arr = [{name: 'trent'},{name: 'jason'}];
const obj = {name: 'trent'}; 
const check = arr.some(e => e.name === obj.name);
console.log(check);
//возвращает true или false всего один раз, а не для каждого проверяемого элемента массива
const numbers = ['0', 'одын', '0', '0'];
const one = numbers.some(function (item) { //колбэк также может принимать 3 аргумента
    return item === 'одын';
});
console.log(one); // true
//проверяет, есть ли в массиве хотя бы один элемент, который соответствует определённому правилу; продолжает, пока не встретит первое значение, для которого колбэк вернёт true
//---(метод find)---
//---(1)---
const numbers = ['0', 'одын дыва', '0', '0'];
const one = numbers.find(function (item) {
    return item.includes('одын');
});
console.log(one); // одын дыва
//---(2)---
const numbers = ['00', 'O0', '0', '0'];
const one = numbers.find(function (item, index) {
    if (item.includes('O')) {
      console.log(item);
      console.log(index);
    }
}); //'O0', 1
//возвращает само значение элемента, на котором он завершил проверку, а не булево true/false
//---(метод every)---
const numbers = ['0', '0', '0', '0'];
const one = numbers.every(function (item) {
    return item.includes('0');
});
console.log(one); // true

//вернет true только если все элементы пройдут проверку, иначе вернет false
//---(метод reduce)---
//---(1)---
const acrostic = [
  'Довольно именем известна я своим;',
  'Равно клянётся плут и непорочный им,',
  'Утехой в бедствиях всего бываю боле,',
  'Жизнь сладостней при мне и в самой лучшей доле.',
  'Блаженству чистых душ могу служить одна,',
  'А меж злодеями — не быть я создана.'
];
const cipherWord = acrostic.reduce(function (prevVal, item) {
  return prevVal + item[0];
}, ''); //ДРУЖБА
//---(2)---
const order = ['яблоко', 'банан', 'апельсин', 'банан', 'яблоко', 'банан'];
const result = order.reduce(function (prevVal, item) {  //при первом повторении prevVal={}, а item='яблоко'
  if (!prevVal[item]) {  //prevVal= {}; prevVal['яблоко']=1 равнозначно prevVal.яблоко=1; равнозначно {яблоко: 1}
    // если ключа ещё нет в объекте, значит это первое повторение
    prevVal[item] = 1;
  } else {
    // иначе увеличим количество повторений на 1
    prevVal[item] += 1;
  }
  return prevVal;  // вернём изменённый объект
}, {}); // передаем начальное значение — пустой объект; передается первому аргументу функции - prevVal
console.log(result); // { яблоко: 2, банан: 3, апельсин: 1 }
//---(3)---
const multiply = function (a, b) {
  return a * b;
};
const result = [1, 2, 3].reduce(multiply); //можно передавать созданную ранее функцию
//---(4)---
//проверяем совпадения в объекте и массиве
const welcomeMessages = {russian: 'Добро пожаловать', english: 'Welcome', french: 'Bienvenue',};
function countLanguages(obj, propsArr) {   //(welcomeMessages, ['english', 'french', 'mandarin'])
	return propsArr.reduce(function (res, current) { //0, 'english'
    if (obj[current]) {
            res += 1;  //если ключ содержится в объекте +=1
        }
    return res;
  }, 0);
}
console.log(countLanguages(welcomeMessages, ['english', 'french', 'mandarin'])); //2
console.log(countLanguages(welcomeMessages, ['russian', 'czech'])); //1
//---(метод sort)---
console.log([1, 5, 4, 2].sort()); // [1, 2, 5, 4]
//---(1)---
const chessChampions = ['Вильгельм Стейниц','Эммануил Ласкер','Хосе-Рауль Капабланка','Александр Алехин'];
chessChampions.sort(function (a, b) { //sort принимает колбек с логикой сортировки; для сравнения элементов массива a и b, колбек обязан возвращать число
  const aSecondName = a.split(' ')[1].toLowerCase(); //сохраняем фамилию в нижнем регистре; 'Вильгельм'=[0], 'Стейниц'=[1]
  const bSecondName = b.split(' ')[1].toLowerCase();
    if (aSecondName > bSecondName) return 1; //сортируем
    if (aSecondName < bSecondName) return -1;
return 0;
});
console.log(chessChampions); //отсортирует шахматистов по фамилиям в алфавитном порядке
//---(2)---
const chessChampions = [['Роберт Фишер', 1972], ['Александр Алехин', 1927]];
chessChampions.sort(function (a, b) {
  return a[1] - b[1]; //сортируем в хронологическом порядке; [1] - это индекс числа в массиве
});
console.log(chessChampions); //['Александр Алехин', 1927], ['Роберт Фишер', 1972]
//---(императивный стиль)---
const a = [1, 2, 3];
const b = [];
for (let i = 0; i < a.length; i += 1) { //будем обращаться к элементам исходного массива по индексу, умножать на 2 и записывать в новый массив */
  b[i] = a[i] * 2;
} // [2, 4, 6]
//---(декларативный стиль)---
const a = [1, 2, 3]; //создадим новый массив на основе исходного; элементами нового массива должны стать элементы исходного, умноженные на 2 */
const b = a.map(function (item) {
  return item * 2;
}); // [2, 4, 6]


//Функции
//Функциям обычно поручают преобразовывать данные, но не определять, где они применяются — в консоли, во всплывающем окне или где-то ещё. Преобразованные данные возвращают скрипту для дальнейшего использования.
//---(Function Declaration: объявление функции)---
//---(1)---
function kitten(a, b) { //имя обязательно
  return a * b;
};
kitten(2, 3);
//---(2)---
double(2); //объявленную функцию можно вызвать до объявления (невозможно для функциональных выражений)
function double(num) {
  return num * 2;
}
//---(Function Expression: функциональные выражения)---
//---(1)---
const kitten = function (a, b) { //означает, что функция объявлена внутри другого выражения
  return a * b;
};
kitten(2, 3);
//---(2)---
element.addEventListener('click', function () {}); //анонимная функция (без имени), переданная методу - классический колбек
//---(области видимости)---
const a = 1;
function callMe() {
  const b = 2;
    function callMeToo() {
          const c = 3;
      console.log(a);
      console.log(b);
      console.log(c);
    }
  callMeToo();
}
callMe(); //1, 2, 3
//---(объект первого класса)---
//с функцией возможно делать то же, что и с любым другим значением (в других языках не так)
function createFunction() {
  function simpleFunction() {
    console.log('Меня вернули, а затем вызвали!');
  }
  return simpleFunction;
}
const newFunction = createFunction(); // в newFunction запишется ссылка на simpleFunction
newFunction(); // "Меня вернули, а затем вызвали!"
//---(стрелочные функции)---
//---(1)---
//стрелочными могут быть только функциональные выражения
// стрелочная функция
const consoleWombat = (wombat) => {
  console.log(wombat);
};
// обычное функциональное выражение
const consoleCat = function (cat) {
  console.log(cat);
};
//---(2)---
//короткий return
const shortPet = (cat) => cat;
//обычный return
const pet = (cat) => {
  return cat;
};
//---(3)---
//если возвращаемое функцией значение это объект
const colorHex = () => ({ white: '#FFF' });
//---(4)---
// если параметр один, скобки необязательны
const myCat = catName => {
  console.log(catName);
};
//---(5)---
//стрелочные функции как коллбэки
const array = [1, 2, 3, 4];
array.forEach(() => {  //обычная запись - array.forEach(function () {...});
  console.log('frog!');
}); //frog!, frog!, frog!, frog!
//---(6)---
//коротная запись, когда единственное, что делает коллбэк — возвращает значение; можно использовать короткий return:
const array = [1, 2, 3, 4];
const newArray = array.map(elem => elem * 2);
console.log(newArray); //2, 4, 6, 8
//обычная запись
const array = [1, 2, 3, 4];
const newArray = array.map(function (elem) { return elem * 2});
console.log(newArray); //2, 4, 6, 8
//---(аргументы по умолчанию)---
//---(1)---
//раньше
const myPets = (catName, dogName, parrotName) => {
  if (parrotName === undefined) {
    parrotName = '';  //это значение будет присвоено параметру, если аргумент не передан или равен undefined
  }
  return `${catName} ${dogName} ${parrotName}`;
};
//---(2)---
//в ES6
const myPets = (catName, dogName, parrotName = '') => { //'' - параметр по умолчанию, это значение будет присвоено параметру, если аргумент не передан или равен undefined
  return `${catName} ${dogName} ${parrotName}`;
};
//параметр по умолчанию может принимать любое значение: число, строку, объект, функцию
//---(... spread)---
//этот оператор может «разложить» массив в отдельные аргументы функции
const nums = [4, 8, 15, 16, 23, 42];
Math.max(...nums); // 42
//вместо конструкции с циклом for
const nums = [4, 8, 15, 16, 23, 42];
for (i=0; i<nums.length; i++) {
Math.max(nums[i]); // 42
}
//---(... rest)---
//этот оператор выполняет действие, обратное оператору spread: собирает отдельные параметры функции в массив
function consoleDogs(firstDog, ...otherDogs) { //rest-параметр(...) всегда стоит в конце
  console.log(`Первый: ${firstDog}`);
  console.log(`Остальные: ${otherDogs}`);
}
consoleDogs('Спаниель', 'Овчарка', 'Борзая', 'Метис');  //Первый: Спаниель, Остальные: ['Овчарка', 'Борзая', 'Метис']
//---(переменная arguments)---
//переменная arguments доступна в любой функции кроме стрелочной и создается автоматически; это псевдомассив всех переданных аргументов
//---(1)---
function gimmeSomeArguments() {
  console.log(arguments);
} //'a', 'b', 'c', 'd', 'e'
//но у псевдомассивов нет некоторых методов, которые есть у настоящих массивов, например forEach и map
//---(2)---
//вместо псевдомассива arguments
function max(...args) {
  let result = args[0];
  for (let i = 0; i < args.length; i += 1) {
    if (result < args[i]) {
      result = args[i];
    }
  }
  return result;
}
console.log(max(4, 8, 15, 16, 23, 42)); // 42
//было
function max() {
  let result = arguments[0];
  for (let i = 0; i < arguments.length; i += 1) {
    if (result < arguments[i]) {
      result = arguments[i];
    }
  }
  return result;
}
console.log(max(4, 8, 15, 16, 23, 42)); // 42
//аналогичный результат используя встроенную функцию max
const result = [4, 8, 15, 16, 23, 42]
console.log(Math.max(...result)); //42
//---(поднятие переменных и функций)---
`Движок выполняет код не построчно сверху вниз, он сначала его компилирует, а лишь затем интерпретирует.
 Компиляция проходит довольно сложно. Для нас важно, что в этом процессе происходят две вещи:
    - сначала движок найдёт все объявления функций и объявит их;
    - затем найдёт все переменные, объявленные через var, объявит их и присвоит каждой значение undefined`
console.log(a); // undefined — объявление "а" поднялось, поэтому ошибки нет
var a = 2;   //объявление функций и переменных через var произойдёт в первую очередь
console.log(a); // 2
`Переменные, объявленные через const и let, а также функции,
созданные через функциональные выражения, не поднимаются.`

//Объекты
let myObject = {
  key: 'значение', //это свойство, можно передать строку, число, булево значение, массив или объект
  methodKey: function kitten() {} //это метод внутри объекта
};
myObject.key; //то же самое -->
myObject['key'];
birthday.anya.month --> birthday['anya']['month']
//пример
let fruits = {};
fruits['яблоко']=1;
console.log(fruits); //{яблоко: 1}
//---(примеры объекты + функции)---
//---(1)---
let cat = {one: 'kisa', two: 'sosisa'};
function catName(cat) {
  console.log(cat.one + ' and ' + cat.two); //kisa and sosisa
}
//---(2)---
let cat = {one: 'kisa', two: 'sosisa'};
function catName(cat) {
  return(cat.one + ' and ' + cat.two);
}
cat.fullName = catName(cat); //добавляет новые ключ-значение
console.log(cat); //fullName:kisa and sosisa, one:kisa, two:sosisa
//---(3)---
let friend = 'друг';
const anybody = {
    friend: friend   //в свойство записывается не сама переменная, а её значение в момент объявления свойства
};
friend = 'враг';
console.log(anybody.friend); // "друг" - после переопределения переменной записанное значение не меняется
//---(4)---
const friend = function() {
  console.log(`друг`);
};
const anybody = {friend: friend};
console.log(anybody.friend()); //друг; вызываем функцию, сохраненную ранее как свойство объекта
console.log(anybody.friend); //ƒ () {console.log(`друг`);}
//---(5)---
const human = 'Дядя Фёдор';
const cat = 'Матроскин';
const dog = 'Шарик';
function getCartoonName() {
  return 'Трое из Простоквашино';
}
//старая запись (добавляем в свойства существующие значения из переменных)
const cartoon = {
  human: human,
  cat: cat,
  dog: dog,
  getCartoonName: getCartoonName
};
//после ES2015 (новый способ добавить свойство при объявлении объекта. Теперь свойство из переменной можно записать коротко, без дублирования)
const cartoon = {
  human,
  cat,
  dog,
  getCartoonName
}; //можно записать даже одной строкой - const cartoon = { human, cat, dog, getCartoonName };
//---(ключ-переменная)---
const obj = {
  one: 1,
  two: 2
};
const key = 'one';
console.log(obj[key]); // 1; мы создаем ключ-переменную и присваиваем ей значение из ключа 'one' в этот момент, но в объекте она не сохраняется
console.log(obj); //{one: 1, two: 2} - все еще два свойства
//---(1)---
//пример: когда мы заранее не знаем имени ключа — например, получаем его от пользователя
const obj = { red: '#f00', green: '#0f0', blue: '#00f'};
const key = prompt('red, green или blue?'); // пользователь вводит, например, red
console.log(obj[key]); // "#f00"
//---(2)---
//пример: ссылка на ключ через ключ-переменные
const birthday = {anya: {month: 'февраль',}};
console.log(birthday.anya.month); // "февраль"
let x = 'anya';
let y = 'month';
let z = 'privet';
birthday[x][y] = 'мартобрь'; //аналогично записи birthday.anya.month='мартобрь'
birthday[x][z] = 'c:'; //создаем новый ключ-значение; аналогично записи birthday.anya.privet='c:'
console.log(birthday.anya.month); //'мартобрь'
console.log(birthday.anya.privet); //'c:'
console.log(birthday[x][z]); //'c:'
//---(3)---
//добавляем новый ключ c пустым объектом
const phonebook = {'Аня': {mobile: '+78888888888'},};
function addPhoneNumber(name, numberType, number) {
  if (!phonebook[name]) {
    phonebook[name] = {};
  } //логика такая: если контакта ещё нет, нужно создать под него пустой объект
  phonebook[name][numberType]=number; }
//---(операторы: delete, in)---
//---(1)---
//удаление ключа из объекта (delete)
console.log(obj.one); // 1
delete obj.one;
console.log(obj.one); // undefined
console.log(obj); // {}
//---(2)---
//проверка наличия ключа в объекте (in) ((если этого не хватает - см. reduce(4)))
const home = {mother: 'мама', father: 'папа',};
  if ('mother' in home) {
      console.log('Позовите маму');
  } else if ('father' in home) {
      console.log('Позовите папу');
  } else {
      console.log('Попозже зайду');
  } // "Позовите маму"
delete home.mother;
  if ('mother' in home) {
      console.log('Позовите маму');
  } else if ('father' in home) {
      console.log('Позовите папу');
  } else {
      console.log('Попозже зайду');
  } // "Позовите папу"
//---(цикл for...in)---
//цикл обходит все свойства объекта, по очереди сохраняя ключ каждого в переменной перебора
const emojis = {smile: '😃', kiss: '😚', smirk: '😏', disappointment: '😞', astonishment: '😲', dizziness: '😵'};
for (let emotion in emojis) { //ключ сохраняется в переменную emotion
  console.log(emotion); //выводим сохраненный ключ каждый цикл: smile, kiss, smirk, disappointment, astonishment, dizziness
  console.log(emojis[emotion]); //выводим значение 😃,😚,😏,😞,😲,😵
}
console.log(emotion); //вне цикла переменная не существует
//---(Object.keys)---
//копирует полный список ключей из объекта в массив
//Object глобальный объект, создаётся, как только вы открываете браузер
const expenses = {'oneFriend': 'Dasha','twoFriend': 'Sasha',};
Object.keys(expenses).forEach(function (a) { //получаем полный список ключей из объекта expenses в массив методом .keys - ["oneFriend", "twoFriend"]; перебираем полученный массив методом .forEach
  console.log(a);
}); //oneFriend, twoFriend
//исключения
//обычно ключи сохраняются в массив в порядке сверху в низ / слева на право, кроме тех случаев, когда ключи это строки, которые можно привести к числам
const expenses = {'5': 'Masha', '1': 'Dasha','2': 'Sasha',};
console.log(Object.keys(expenses)); //["1", "2", "5"]
//---(Object.entries и Object.values)---
// ECMAScript 2017, пока плохо поддерживаются
const paulMcCartney = {yesterday: 'all my troubles seemed so far away'};
console.log( Object.values(paulMcCartney) ); // ["all my troubles seemed so far away"]
console.log( Object.entries(paulMcCartney) ); // [["yesterday", "all my troubles seemed so far away"]]
//---(передача по ссылке)---
//примитивы
//let a = 0; let b = a; b += 1; - при изменении b значение переменной а не меняется
//объекты
//const a = {one: 'love',}; const b = a; b.two='hate'; - оба объекта изменятся (в них добавится второе свойство), т.к. переменная b содержит не копию, а ссылку на объект сохраненный в переменной а
//---(сравнение объектов)---
const obj1 = {}; const obj2 = {};
console.log(obj1 === obj2); // false, т.к. сравниваются ссылки на объекты, а не содержимое объектов; переменные obj1 и obj2 ссылаются на разные объекты
//---(1)---
//функция для сравнения двух объектов по свойствам и значениям
function isEqual(firstObj, secondObj) { //принимает два объекта
  const firstKeys = Object.keys(firstObj); //получаем массивы с ключами
  const secondKeys = Object.keys(secondObj);
  if (firstKeys.length !== secondKeys.length) {
    // если нет, то объекты точно не равны
    return false;
  }
  //проверим, что для каждого ключа первого объекта значения в первом и втором объекте равны */
  return firstKeys.every(function (key) { //проходимся по каждому пункту массива firstKeys
    return firstObj[key] === secondObj[key]; //передаем значения из массива firstKeys как названия свойств объектов(ключи), и сравниваем значения свойств первого и второго объекта
  }); //в результате .every возвращает true или false
} //в результате получаем в консоли true или false
//---(поверхностное копирование объектов)---
const firstObj = {one: 1, two: 2};
const secondObj = Object.assign({}, firstObj); //первый аргумент пустой объект, второй это копируемый объект
console.log(secondObj === firstObj); // false; ссылки на объекты не совпадают, т.к. это полноценная копия
//---(1)---
function evolution(obj, key, value) {
  const copy = Object.assign({}, obj);
  copy[key] = value;
  return copy;}
const fish = {eggs: 'икра', eyes: 2, home: 'вода'}; //при копировании объект из переменной fish не изменится
const frog = evolution(fish, 'legs', 4); //{ eggs: "икра", eyes: 2, home: "вода", legs: 4 } присвоится новый объект с дополнительным свойством
//---(2)---
//значения свойств объекта при копировании присваиваются, а присваивание работает как опирование только для примитивов
const firstObj = {one: 1, two: 2, three: { message: 'I love JS 🖤' }};
//при копировании firstObj, значение (объект) из ключа three не скопируется, а присвоится(сохранится) как ссылка на этот объект; т.е. объект существует сам по себе, а ключ three хранит только ссылку на него
//---(глубокое копирование объектов)---
const original = {one: 1, two: 2, three: { message: 'I love JS 🖤' }};
const copy = Object.assign({}, original);
copy.three = Object.assign({}, original.three); //отдельно копируем объект сохраненный в переменной three
console.log(copy === original); // false;
console.log(copy.three === original.three); // false; - можно считать, что копия original полноценная
//---(массивы — это объекты)---
//числовые индексы — это ключи, а соответствующие им элементы — значения этих ключей
//[1, 2, 3, 4] -> {0:1, 1:2, 2:3, 3:4,}
const arr = [1, 2, 3];
arr.four = 4;
console.log(arr); // [1, 2, 3, four: 4]
//проверка на массив
console.log(typeof arr); // "object" -typeof не различает массивы и объекты
console.log(Array.isArray(arr)); // true; метод появившийся в ES2015
//сравнение по ссылке (т.к. массив это объект!)
const a = [1, 2, 3];
const b = [1, 2, 3];
console.log(a === b); // false
//копирование массивов
const copy = Object.assign([], original); //работает метод для копирования объектов Object.assign; только [] вместо {}
const copy = original.slice(); //если не передавать .slice никаких аргументов, то массив просто скопируется
copy === original; // false; произошло копирование массива, а не ссылки на первый массив
//---(функции — это объекты)---
multiply.someValue = 4; //функция — это объект, добавим в неё свойство someValue со значением 4
console.log(multiply.someValue); // 4; теперь можно обратиться к свойству функции с ключом someValue
console.log(multiply); //ƒ multiply(a, b) {return a * b;} - при этом в консоли не выводятся добавленные таким образом свойства
//---(1)---
//создаем свойство-счетчик в функции, чтобы знать сколько раз функцию вызывали
function counter() {
  if (!counter.times) { //создаем свойство функции, если его еще нет
     counter.times = 0;
   }
   counter.times += 1;
   return counter.times;
 } //counter(); ... counter(); // выведет число вызовов, например 5
//---(2)---
//проверка на функцию
console.log(typeof multiply); // "function" - typeof работает с функциями
//передача по ссылке
function catOne() {...}
let catTwo = catOne; //копируем ссылку на функцию(объект)
console.log(catTwo === catOne); // true; т.к. ссылка на одну функцию

//---(регулярные выражения)---
replace(/\W/g, ""); //не подходит для кириллицы
replace(/[^0-9a-zA-Zа-яёА-ЯЁ]/g, ""); //заменяет все небуквенные (англ+рус) символы
//пример 1
var names = 'Гарри Трамп ;Фрэд Барни; Хелен Ригби ;';
var re = /\s*;\s*/;
var nameList = names.split(re); //["Гарри Трамп", "Фрэд Барни", "Хелен Ригби", ""]
//пример 2
var re = /(\w+)\s(\w+)/;
var str = 'John Smith';
var newstr = str.replace(re, '$2, $1'); //Smith, John

//решение задачи фибоначчи
function fibonacci(n) {
  const nums = [0, 1, 1];
    // nums[0] = 0;
    // nums[1] = 1;
    // nums[2] = 1;
    console.log(nums);
    for (let i = 3; i <= n; i++) {
      nums[i] = nums[i - 2] + nums[i - 1];
      //3=1+1 (n[3]=2)
      //4=1+2 (n[4]=3)
      //5=2+3 (n[5]=5)
      //6=3+5 (n[6]=8)
    };
    console.log(nums);
    return nums[n-1];
}
// Протестируйте решение, вызывая функцию с разными аргументами:
console.log(fibonacci(4)); // 2

//метод строки charAt
""[-4]          // undefined
"".charAt(-4)   // "" - всегда вернет строку
