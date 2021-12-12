//---(HTTP запрос клиента)---
//браузер формирует запрос, сервер его анализирует и отправляет ответ 
//правила, по которым нужно формулировать запросы и ответы, определяет протокол — HTTP
//Все запросы браузера можно поделить на 4 категории:
    // запросы HTML-документов;
    // запросы изображений, CSS, JS и других файлов;
    // отправка форм встроенным способом с перезагрузкой страницы;
    // запросы из JavaScript-кода.
//методы запроса:
GET - запрос данных  //если метод не прописать явно, fetch будет отправлять запросы методом GET
POST - отправка данных
PUT - замена данных на сервере
PATCH - частичная замена (замена аватарки, имени пользователя)
DELETE - удаление данных
HEAD - запрос только заголовков (см. headers mdn)
//...и т.д. (на самом деле можно использовать любой запрос под любые цели, но это плохая практика)


//---(формат JSON)---
{  //пример объекта JSON
    "browsers": {
        "firefox": {
            "name": "Firefox"
        }
    }
}
//делаем глубокую копию объекта user методами JSON
//если по очереди применить эти методы к объекту, получится новый объект
const user = {
    name: 'Иван',
    age: 30,
    hasDog: true,
    dog: {
      name: 'Бонни',
      age: 6
    }
  };  
const userString = JSON.stringify(user);    //JSON.stringify делает из объекта строку (см. консоль лог)
const userDeepCopy = JSON.parse(userString);  //JSON.parse разбирает строку в объект (идентичный объекту user)
//результаты сравнения
console.log(userString); // {"name":"Иван","age":30,"hasDog":true,"dog":{"name":"Бонни","age":6}}
console.log(user === userDeepCopy); // false
console.log(user.dog === userDeepCopy.dog); // false
console.log(user.name === userDeepCopy.name); // true
console.log(user.dog.name === userDeepCopy.dog.name); // true


//---(fetch)---
fetch('http://...', {...method, headers, body});
//это ф-ия встроенная в браузер, чтобы облегчать задачу составления запросов к серверу
//первый параметр url, второй объект настроек
//в старых браузерах не поддерживается, но есть готовые полифиллы (уже написанные функции имитирующие работу fetch)
//если сервер отвечает ошибкой(код ответа не 200-299), то мы все равно попадаем в блок .then
//выполняется асинхронно и возвращает промис
//пример:
fetch('https://api.kanye.rest')   //посылаем GET-запрос вызовом функции fetch с одним аргументом (URL)
//объект Response(res) представляет собой ответ на запрос (встроенный в Fetch API)
//json() - метод объекта Response, возвращает промис содержащий объект JSON с данными
.then((res) => {      
    return res.json(); //если нет ошибки, получаем данные и переходим в следующий обработчик .then
  })
.then((data) => {
    console.log(data);  //{ quote:I feel calm but energized } 
  })

//проверка на ошибку:
const Cat = () => {
    fetch('http://...')
    .then(res => {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Ошибка: ${res.status}`) //аналог .catch (отклоняем промис, чтобы перейти в блок catch, если сервер вернул ошибку)
        }
    })
    .then((data) => {
        quoteElement.textContent = data.quote;
      })
    .catch((err) => {
        console.log(err); // "Ошибка: ..."
      }); 
}
//делаем проверку в первом .then, если запрос прошел, то возвращаем объект json, иначе прерываем промис и возвращаем строку с ошибкой
//после возвращения json мы пройдемся по всем .then
//при прерывании в конструкции else мы всегда отправляемся сразу .catch, а значит все .then будут пропущены

//---(установка параметров запроса)---
fetch('https://example.com', {  //второй аргумент функции fetch - объект опций 
  //(см. ниже)
}); 
//указываем метод (свойство method объекта опций)
    method: 'POST'              
//передаем данные в теле запроса (есть и другие способы, зависит от реализации сервера/api - напр. в параметрах запроса, через url)  
//передаем объект с данными в формате JSON (свойство body объекта опций)
    body: JSON.stringify({   //JSON.stringify делает из передаваемого ему объекта строку
        name: 'Иван',
        age: 30
    }) 
//MIME Type - text/html; text/javascript; image/jpeg; application/json; application/x-www-form-urlencoded; multipart/form-data и т.д.
//указываем тип передаваемых данных (свойство headers объекта опций)
    headers: {
        'Content-Type': 'application/json'
    }

//---(свойства и методы объекта ответа - Response(res))---
//.json()
fetch('https://api.kanye.rest')
  .then(res => res.json())      //этот метод возвращает промис содержащий объект JSON с данными
  .then(//...); 
//.status и .statusText
fetch('https://api.kanye.rest')
    .then(res => {
    console.log(res.status, res.statusText); // 200 OK
  }); 
//.ok
fetch('https://api.kanye.rest')
    .then(res => {
    console.log(res.ok); // true (свойство содержит булево значение)
  }); 
//.get
//подобно запросам, ответы могут иметь заголовки, в них содержится дополнительная информация от сервера (но они только для чтения)
fetch('https://api.kanye.rest')
  .then((res) => {
    if (res.headers.get('Content-Type').contains('application/json')) {  //метод .get дает доступ к заголовку ответа
      return res.json();
    }
  });
//.text() (метод - возвращает промис содержащий тело ответа как текст)
//.blob() (метод - возвращает промис содержащий тело ответа как бинарные данные: это нужно при получении файлов (изображений, видео, pdf-документов))

//---(код статуса запроса)---
//   2 — значит, запрос прошёл успешно;
//   3 — запрос был перенаправлен;
//   4 — с запросом что-то не так: ресурс не найден или у вас нет к нему доступа;
//   5 — на сервере произошла какая-то ошибка.

//---(что значит обрабатывать ответ от сервера асинхронно?)---
//НЕЛЬЗЯ получить ответ так:
fetch('https://api.kanye.rest')
  .then(res => {
    const json = res.json();
    console.log(json);  //нужно разнести на два обработчика .then
  });
//Если от сервера пришёл ответ, это ещё не значит, что пришли все данные. Поэтому сначала мы обрабатываем приход ответа, а только затем полученные данные. Отсюда и асинхронный код.



//Пример программы добавляющей запрошенный у сервера пост в разметку
function createPostMarkup(post) { // создаёт разметку для поста
    return `
      <div class="post">
        <p class="post__title">${post.title}</p>
        <p class="post__text">${post.body}</p>
      </div>
    `;
}  
function addPostToDOM(container, markup) {  // вставляет разметку в DOM
    container.insertAdjacentHTML('afterbegin', markup);
}
function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')  //см ссылку (классный ресурс)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        data.forEach(data => {  //забираем из массива данных один пост
        addPostToDOM(document.querySelector('.container'), createPostMarkup(data));   //коллбэк с двумя аргументами - элементом-контейнером и коллбеком с постом из массива полученных данных
        })
    })
}
getPosts();

//Пример:
//Добавляем колесико загрузки и обработчик finally
//content__result нужно выводить результат, если данные пришли и всё хорошо. В content__error — ошибку, если что-то пошло не так
//Когда результат показан, ошибка должна быть сброшена. И наоборот.
const form = document.forms.search;
const content = document.querySelector('.content');
const result = document.querySelector('.content__result');
const error = document.querySelector('.content__error');
const spinner = document.querySelector('.spinner');

form.addEventListener('submit', function submit(e) {
  e.preventDefault();
  renderLoading(true);
  search(form.elements.entity.value, form.elements.entityId.value)
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status)  //отправит в catch
    }
  })
  .then((res) => {
      renderResult(res.name);    
    })
  .catch((err) => {
      renderError(`Ошибка: ${err}`);
    })
  .finally(() => {  //попадем сюда в любом случае (и true и false)
    renderLoading(false);  //если будет true, то колесико будет крутиться бесконечно, а контент не появится
  })
});
function search(entity, entityId) {
  return fetch(`https://swapi.nomoreparties.co/${entity}/${entityId}`)   
}
function renderResult(text) {
  result.textContent = text;
  error.textContent = ''; //это сбросит ошибку, если она была, когда мы хотим показать результат
}
//создаем аналогичную функцию renderError. Она должна принимать параметр err, устанавливать его в textContent ошибки, а результат, наоборот, сбрасывать
function renderError(err) {
  error.textContent = err;
  result.textContent = ''; //это сбросит результат
}
//показываем колесико загрузки страницы, скрывая контент на странице
function renderLoading(isLoading) {
  if (isLoading) {  //if true
    spinner.classList.add('spinner_visible');
    content.classList.add('content_hidden');
  } else {  //false
    spinner.classList.remove('spinner_visible');
    content.classList.remove('content_hidden');
  }
}


