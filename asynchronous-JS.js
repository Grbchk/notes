//---(синхронный колбек)---
const tweets = ['1','2','3'];
//это пример анонимной функции
tweets.forEach((tweet) => {  
    console.log(tweet);
}); 
//а эта функция объявлена отдельно и передана по имени
function consoleTweet(tweet) {
    console.log(tweet);
}
tweets.forEach(consoleTweet); //вот тут передаем

//еще пример использования синхронного коллбека
const tweets = ['1','2','3'];
function myforEach (arr, callback) {
    for (let i =0; i<arr.length; i++) {
      callback(arr[i]);  //передаем текущее значение массива в коллбек, принятый при вызове myforEach в параметр "callback"
    }
}  
myforEach(tweets, function (tweet) {  //при вызове myforEach передаем коллбек вторым параметром
    console.log(tweet);
});


//асинхронный код — тот, что выполняется по наступлению какого-то события: 
//ответа от сервера, срабатывания таймера или клика мышью 
//где интерактивность, там и асинхронность

//---(асинхронный коллбек)---
//у объекта изображения есть свойство onload, в которое мы можем записать функцию 
//функция сработает, только когда изображение загружено
function imageLoadCallback(evt) {  //колбэк, который нужно выполнить после того как изображение загрузится  
    document.body.append(evt.target); //добавит элемент изображения в DOM
}  
function loadImage(imageUrl, loadCallback) {  //функция для создания изображения
    const img = document.createElement('img');
    img.src = imageUrl;
    img.onload = loadCallback;  //функция, которая записана в onload будет вызвана только после загрузки изображения
}  
loadImage(   //картинка появится в разметке только после загрузки
'https://....svg',
imageLoadCallback
); 
//также у изображения есть свойство onerror, записанная в него функция сработает, если произошла ошибка
function handleLoadError() {   //запустится после появления ошибки
    console.log('Всё идёт не по плану');
}
function handleImageLoad(evt) {    //добавит элемент изображения в DOM
    document.body.append(evt.target);
  }
function loadImage(imageUrl, loadCallback, errorCallback) {
    //...см пример выше
    img.onerror = errorCallback;
}
loadImage(
    'https://....jpg',
    handleImageLoad, 
    handleLoadError
);


//---(Установка таймера: метод setTimeout)---
//ждёт определённое время, после чего исполняет какой-то код
setTimeout(showMessage, 10000, '10 секунд - это 10000 миллисекунд');  //встроенный метод setTimeout запустит переданный ему коллбек через 10 секунд

//---(Удаление таймера: метод clearTimeout)---
//пример с банком:
//функция «выкидывания» пользователя
function logOut() {//...}
//устанавливаем таймер при загрузке страницы, чтобы выбросить пользователя из системы банка при бездействии
let timer = setTimeout(logOut, 300000);  
//сбросим таймер и дадим "живому" пользователю еще время при клике
window.addEventListener('click', function () {  
    //передаем встроенному методу clearTimeout переменную с таймером, который нужно удалить
    clearTimeout(timer);  
    //повторно устанавливаем таймер
    timer = setTimeout(logOut, 300000);  
} 

//---(Циклический таймер: метод setInterval)---
//пример (выводим текущее время каждую секунду):
function consoleDate() {
    const date = new Date();
    console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
}
setInterval(consoleDate, 1000);
//пример (проверяем не появились ли новые входящие на почте):
function checkEmail() {//...}
//проверка почты будет происходить каждые десять секунд
const interval = setInterval(checkEmail, 10000);
//удаляем таймер 
clearInterval(interval);


//---(Event Loop)---
//колстек — это очередь на выполнение инструкций
//в таком порядке движок считывает код: 
//вызов businessBeforePleasure() > 
//> проваливается внутрь функции, видит вызов business() >
//> проваливается внутрь функции, код можно испольнить, ставит этот console.log вверх коллстека >
//> видит вызов pleasure(), проваливается внутрь, код можно исполнить, ставит этот console.log следующим в коллстеке >
//> последней исполняется функция businessBeforePleasure()
//!!!получаем коллстек: business > pleasure > businessBeforePleasure
//результат в консоли: Сделал дело/ Гуляй смело/ undefined
function businessBeforePleasure() {  
    function business() {
      console.log('Сделал дело');
    }  
    function pleasure() {
      console.log('Гуляй смело');
    }  
    business();
    pleasure();
} 
businessBeforePleasure(); 
//еще пример:
//как движок формирует коллстек:
//  выведи в консоль «Это сообщение появится первым» >
//> отправь запрос в Web API на установку таймера в 1 мс, сразу переходи к следующей инструкции >
//> выведи в консоль миллион раз строку «Это сообщение нужно показать в консоли миллион раз» >
//> очередь задач закончилась >
//> исполнить функцию из таймера >
//> выведи в консоль 'Непонятно, какое по счёту это сообщение' 
//1
    console.log('Это сообщение появится первым');
//2  - исполнится последним
    setTimeout(function () {
    console.log('Непонятно, какое по счёту это сообщение');  //это сообщение будет последним
    }, 1);
//3
    for (let i = 0; i <= 1000000; i += 1) {
    console.log('Это сообщение нужно показать в консоли миллион раз');  //испольняется несколько минут
    } 
//в консоли: 'Это сообщение появится первым' / 'Это сообщение нужно показать в консоли миллион раз'х1000000 / 'Непонятно, какое по счёту это сообщение'


//---(Промисы)---
//промис - глобальная функция
//промис принимает коллбек с двумя функциями (resolve и reject) *можно назвать ф-ии иначе
//методы промиса: then, catch, finally
//.then и .catch принимают на вход одну из функций с параметром 
//это функции resolve() и reject() с параметром-строкой, который передается им при вызове
//также при вызове функции ее параметр-строка передается в value (.then или .catch)
//поэтапно:
//создаем новый промис и передаем ему коллбек с двумя функциями (resolve и reject) >
//> промис запускается движком при открытии страницы >
//> присваиваем переменной rand true или false >
//> в зависимости от ответа вызываем функцию resolve() либо reject() >
//> resolve() вызывается при true, а reject() при false >
//> true (промис исполнен), false (промис отклонен) >
//> при вызове передаем функции строку в качестве параметра >
//> вызов resolve() передает параметр в .then >
//> вызов reject() передает параметр в .catch >
//> параметр сохраняется в value, исполняется нужный console.log >
//> в любом случае также исполняется console.log из .finally
const newPromise = new Promise(function (resolve, reject) {  //коллбек с двумя функциями
    const rand = Math.random() > 0.5 ? true : false;   //пока будем определять, обработан запрос или нет, случайным образом 
    if (rand) {
        resolve('Запрос обработан успешно');  //передает при вызове свой параметр в value метода .then() 
    } else {                                                                          
        reject('Запрос отклонён');            //передает при вызове свой параметр в value метода .catch()
    }
}); 
newPromise
.then(function (value) {
    console.log(value);
})
.catch(function (value) { 
    console.log(value + ', нам жаль :(');
})
.finally(function () { 
    console.log('Как бы там ни было — запрос мы в глаза видели');  //появится в консоли при любом результате (и true, и false)
});

//---(цепочка вызовов)---
//пример с обработанным(сервером) промисом:
const newPromise = new Promise(function (resolve, reject) {
    resolve('Раз');  //т.к. это true, эта строка сразу передается в первый .then
});
function firstAction(value) {  //первый .then передает в firstAction параметр "Раз"
    return `${value}, два`;    //вернет строку "Раз, два"
}
function secondAction(value) {  //второй .then вызывает secondAction с параметром "Раз, два" 
    return `${value}, три`;     //вернет строку "Раз, два, три"
}
function thirdAction(value) {  //третий  .then выполнит console.log с полученным значением "Раз, два, три"
    console.log(value);
}
newPromise  //вызываем цепочку .then
    .then(firstAction)
    .then(secondAction)
    .then(thirdAction);
//в консоли будет: "Раз, два, три" 
//
//пример с отклоненным(сервером) промисом:
const newPromise = new Promise(function (resolve, reject) {
    reject('Раз');   //newPromise отклонен, поэтому пропускаем вызовы .then
});
function firstAction(value) {
    return `${value}, два`;
}
function secondAction(value) {
    return `${value}, три`;
}
function thirdAction(value) {   //.catch вызывает эту функцию с параметром полученным из reject()
    console.log(value);
}
newPromise
  .then(firstAction)
  .then(secondAction)
  .catch(thirdAction);  //сразу вызывается .catch, в который передается параметр из reject() 
//в консоли будет: "Раз"
//стараться всегда завершать промисы блоком .catch


//---(методы Promise.resolve и Promise.reject)---
//необязательно вызывать new Promise, можно сразу создать исполненный или отклонённый промис:
Promise.resolve('Этот промис исполнен')
  .then(function (value) {
    console.log(value);  //выведет переданную строку
});
Promise.reject('Этот промис отклонён')
  .catch(function (value) {
    console.log(value);   //выведет переданную строку
});
//
//--(статический метод Promise.all)---
//принимает на вход массив с промисами, и выполняет записанный в .then код, когда все промисы вернулись со статусом - исполнен
// создаём первый промис >
//> создаём второй промис >
//> создаём массив с промисами >
//> передаём массив с промисами методу Promise.all >
//> выполняем все .then
const firstPromise = new Promise((resolve, reject) => {
    if (someCondition) {
      resolve('Первый промис');
    } else {
      reject();
    }
});  
const secondPromise = new Promise((resolve, reject) => {
if (secondCondition) {
    resolve('Второй промис');
} else {
    reject();
}
});
const promises = [firstPromise, secondPromise]
Promise.all(promises)
.then((results) => {
    console.log(results); 
});
//консоль выведет: ["Первый промис", "Второй промис"]
//
//Пример из тренажера:
//функция wait принимает на вход количество миллисекунд ожидания и возвращает промис
//из функции wait возвращаем вызов new Promise
//внутри промиса используем функцию setTimeout
//setTimeout выполняет функцию resolve этого промиса
function wait(ms) {
    return new Promise(function(resolve, reject) {
      setTimeout(resolve, ms)
    })
}
wait(2000)
.then(() => console.log('Прошло 2000мс'));  //вероятно возвращаем в метод .then() true, т.к. в промисе есть только resolve (т.е. промис он исполняется)
//консоль выведет: Прошло 2000мс            //и метод вызывает переданную ему как аргумент безымянную функцию
//
//Или загрузить изображение, или вывести ошибку:
function loadImage(imageUrl) {
    return new Promise(function(resolve, reject) {
      const image = document.createElement('img');
      image.src = imageUrl;
      image.onerror = reject;
      image.onload = resolve;
    })
}   
loadImage('https://pictures.s3.yandex.net/frontend-developer/functions/dog-1.jpg')
.then((evt) => {
    document.body.append(evt.target);
})
.catch(() => {
    console.error('Всё идёт не по плану.');
});



