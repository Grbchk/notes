//Node Package Manager - «менеджер node-пакетов»
//это библиотека утилит для программ для веб-разработки (напр. Webpack)
//Node.js — среда исполнения, которая позволяет писать серверный код на JavaScript. Также через нее подключается npm

//после установки node проверяем текущие версии
node -v
npm -v
npm install webpack@latest //обновит версию npm



//---(Начало работы со старым проектом)---
npm i //установит все модули проекта из файла package.json (если скопировала репозиторий с гитхаба, например)
npm run build //сгенерит папку dist
//запускаем сборку из папки dist вручную, без лайвсервера - index.html

//если webpack-cli выдает ошибку при перезаписи папки .dist (выполнении npm run build)
//1) отключить live server в vsCode (порт 5500, внизу справа на панели значок)
//2) запустить консоль с правами администратора



//Старт
//(совет) пока оставить .editorconfig в корне проекта
//в корне создаем файл .gitignore
//добавляем две строчки:
node_modules
dist
//переносим все js файлы в папку components
//переносим все папки (blocks, images, pages...) в папку src
//в корне проекта добавляем package.json командой:
либо копируем из другого проекта с:
npm init  //прокликать Enter или -->
npm init --yes  //без вопросов в консоли

//добавляем в проект библиотеку jQuery
npm install jquery
//чтобы удалить библтотеку использовать команду:
npm uninstall <имя> --save-dev

//---(устанавливаем Webpack)---
npm i webpack --save-dev  //нужно подождать
//i - install
//в файле package.json есть разделы: dependencies и devdependencies
//все пакеты из dependencies попадут в финальную сборку проекта
//--save-dev - это флаг, с ним пакет Webpack будет добавлен в раздел devDependencies
//устанавливаем webpack CLI
npm i webpack-cli --save-dev
//это интерфейс для настройки из консоли параметров сборки проекта вебпаком
//с флагом --save-dev пакет webpack CLI не попадет в финальную сборку проекта

//---(настроим Webpack)---
//создать конфигурационный файл в корне проекта
webpack.config.js
//в редакторе создаем глобальный объект module(доступен в Node по умолчанию) со свойством exports
//в объекте указывают, что должно быть экспортировано из файла
//этот файл запускается в Node.js
//копировать сразу следующий вариант модуля с утилитой path (без комментов), см. ниже -->
module.exports = {
    entry: { main: './src/components/index.js' },  //объект entry - это точка входа (вебпак начинает сборку с этого файла)
    output: {  //объект output - это точка выхода (куда вебпак сложит весь код)
        path: './dist/',  //абсолютный путь (от корневой папки)
        filename: 'main.js',
        publicPath: ''  //свойство для обновления путей внутри CSS- и HTML-файлов
      }
}
//утилита path для преобразование относительного пути в абсолютный
const path = require('path');  //подключаем ее функцией require, константы объявляются в начале файла
//передаем два аргумента методу path.resolve: ссылку на текущую папку (__dirname) и относительный путь к точке выхода
//__dirname в Node.js доступна глобально, хранит абсолютный путь до папки, в которой лежит файл, где мы используем эту переменную (т.е. до корневой папки проекта)
module.exports = {
  entry: { main: './src/components/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'), // или  ./dist ?
    filename: 'main.js',
        publicPath: ''
  }
}

//---(настраиваем и запускаем сборку)---
//редактируем раздел scripts файла package.json
//создаем вместо "test" новый скрипт build с командой webpack
"scripts": {
  "build": "webpack"
},
//добавляем "точку входа" для поиска вебпаком импортов:
//запускаем сборку:
npm run build  //если ругается на собачку @, то закомментить импорт стилей в script.js
//автоматически добавляются dist/main.js
//теперь весь код будет приходить в main.js
//редактируем раздел scripts файла package.json:
"build": "webpack --mode production" //!после добавления плагина CleanWebpackPlugin (до этого использовать вариант ниже):
//настраиваем очистку папки dist/ перед каждой новой сборкой, чтобы из проекта удались уже неактуальные файлы
//--mode production - явно указываем, что эта сборка для финальной подготовки к публикации
//"build": "rd /s /q dist && webpack --mode production"

//---(создаем локальный сервер)---
npm i webpack-dev-server --save-dev  //добавится сервер в раздел devDependencies файла package.json
//добавляем еще одну сборку в раздел scripts файла package.json
, "dev": "webpack serve"
//команда webpack serve запустит проект на локальном сервере
/*--mode production*/

//---(собираем проект)---
//запускаем скрипт
npm run dev
//проект откроется на локальном сервере по адресу http://localhost:8080
//выход - ctrl + c

//---(настроим окружение для разработки)---
//добавим в module.exports режим разработчика
//через запятую после output
output: {...},
mode: 'development',
//добавим настройки локального сервера:
devServer: {
    static: path.resolve(__dirname, './dist'), //старое contentBase
    compress: true,
    port: 8080,
    open: true
},
//contentBase/static - путь, куда "смотрит" режим разработчика
//compress - ускорит загрузку в режиме разработки
//port - порт, чтобы открывать сайт по адресу localhost:8080 (но его можно поменять)
//open - сайт будет открываться сам при запуске npm run dev

//---(транспиляция, Babel)---
//подключаем пакет в devDependencies
npm i @babel/core --save-dev
//и пресеты (набор правил)
npm i @babel/preset-env --save-dev
//полифиллы - функциональность взамен неподдерживаемым в браузерах штукам, добавляется в итоговую сборку
npm i core-js --save
//пакет для подключения Babel к Webpack
npm i babel-loader --save-dev
//настройка Babel
//добавить файл в корень проекта:
babel.config.js
//содержимое файла:
//использовать полифиллы для браузеров из свойства target (по умолчанию babel использует поллифиллы библиотеки core-js)
const presets = [
    ['@babel/preset-env', { //какой пресет использовать (его мы установили)
      targets: {  //какие версии браузеров поддерживать
        edge: '17',
        ie: '11',
        firefox: '50',
        chrome: '64',
        safari: '11.1'
      },
      useBuiltIns: "entry"
    }]
];
module.exports = { presets };
//подключаем Babel к Webpack
//описываем правила обработки файлов при сборке (в файле webpack.config.js, сразу после свойства devServer):
module.exports = {
    //...
    //devServer: {...},
    module: {
        rules: [
        {
            test: /\.js$/,  //если тебе попадётся файл с расширением .js (регулярное выражение, которое ищет все js файлы)
            use: 'babel-loader',  //сначала отдай этот файл модулю babel-loader для обработки, перед добавлением в сборку
            exclude: '/node_modules/'  //но не обрабатывать пакеты, скачанные из NPM, лежащие в папке node_modules
        }
        ]
    }
};

//---(настраиваем обработку HTML)---
//помещаем файл index.html в папку src
//устанавливаем плагин для добавления Webpack-ом файлов html к проекту
npm i html-webpack-plugin --save-dev
//подключаем плагин в webpack.config.js
//const path = require('path'); - после первой константы
const HtmlWebpackPlugin = require('html-webpack-plugin');
//и новое свойство с массивом, сразу после module: {},
plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
]
//устанавливаем плагин для очистки при сборке папки dist
npm i clean-webpack-plugin --save-dev
//подключаем в файл webpack.config.js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//и в свойство plugins после new HtmlWebpackPlugin({...}),
new CleanWebpackPlugin(),  //будет вызываться при сборке проекта


//---(изображения и шрифты)---
//переносим в папку src
//пишем правило для поиска таких файлов в webpack.config.js
//свойство type со значением asset/resource позволяет переносить исходные файлы в конечную сборку в том же формате
//будут добавлены только используемые в проекте файлы (до которых указан путь в проекте)
module: {
  rules: [
    {...},  //сразу после первого правила:
  {
      test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
      type: 'asset/resource'
  }
//...

//---(картинки в JavaScript)---
//в обычном JS прим:
//но Вебпак меняет имена файлов при сборке и они не подключатся
const whoIsTheGoat = [
    { name: 'Michael Jordan', image: './images/jordan.jpg' },
];
//для сборки Вебпаком прим:
//в чистом JS такое работать не будет
import bryantImage from './images/bryant.jpg';
const whoIsTheGoat = [
  { name: 'Kobe Bryant', link: bryantImage },
];
//для сборки Вебпаком, но работает без запуска Вебпака прим:
const bryantImage = new URL('./images/bryant.jpg', import.meta.url)  //используется свойство import.meta.url - служебный параметр, указывающий на путь файла
const whoIsTheGoat = [
  { name: 'Kobe Bryant', link: bryantImage },
];
//вебпак заменяет имена файлов на Хэш строки с уникальными именами, благодаря чему не произойдет ситуации, например, когда у пользователя не отображается новый логотип, т.к. в кеше браузера сохранен старый

//---(картинки в HTML)---
//такой путь умеет обрабатывать установленный ранее HtmlWebpackPlugin
//вставки вида <% %> — часть синтаксиса шаблона lodash (см. гугл)
<img src="<%=require('./images/logo.png')%>" alt="Логотип">                     /</img>

//---(обработка CSS)---
//устанавливаем плагины
//учит Вебпак обрабатывать css-файлы
npm i css-loader --save-dev
//объединяет много css-файлов в один
npm i mini-css-extract-plugin --save-dev
//подключаем mini-css-extract-plugin в webpack.config.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//добавляем правило в массив rules
{
    test: /\.css$/,  //для css-файлов использовать этот плагин:
    use: [MiniCssExtractPlugin.loader, {
        loader: 'css-loader'
    }]
}
//добавим в массив plugins вызов MiniCssExtractPlugin
new MiniCssExtractPlugin()
//удаляем импорт стилей из html:
<link rel="stylesheet" href="./style.css">  /</link>
//прописываем импорт в файле index.js
//не сработает до установки css-loader
import './styles/index.css'; //главный css-файл (по БЭМ содержит импорты на все остальные файлы стилей в проекте)

//---(минификация CSS и добавление префиксов)---
//добавим PostCSS в Вебпак
npm i postcss-loader --save-dev
//добавляет вендорные префиксы
npm i autoprefixer --save-dev
//минифицирует код
npm i cssnano --save-dev
//настройка PostCSS
//создаем в корне проекта файл
postcss.config.js
//подключаем плагины в файл
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
module.exports = {
  plugins: [
    autoprefixer,
    //передаем в cssnano объект опций
    //{ preset: default } говорит о том, что нужно использовать стандартные настройки минификации
    cssnano({ preset: 'default' })
  ]
};
//дополняем правило для css-файлов в webpack.config.js:
{
    test: /\.css$/,
    use: [MiniCssExtractPlugin.loader, {
      loader: 'css-loader',
      options: { importLoaders: 1 }   //без подключения этой опции PostCSS не будет работать с css-файлами, в которых есть @import  //значение 1 говорит о том, что некоторые трансформации PostCSS нужно применить до css-loader
    },
      'postcss-loader']  //подключаем плагин PostCSS
}
//конец!


//запускаем сборку проекта
npm run build
//открываем проект на сервере (предварительная сборка не нужна!)
npm run dev
//запускаем публикацию проекта
npm run deploy

//---(deploy gh-pages)---
//добавляем проект в сервис gh-pages с помощью установки пакета
npm install gh-pages --save-dev
//добавляем в package.json новый скрипт deploy
//он вызывает пакет gh-pages и получает папку dist с готовым проектом
scripts: {
  //...
  "predeploy": "npm run build",  //вызываем автоматическую сборку проекта при вызове deploy
  "deploy": "gh-pages -d dist"
}
//запускаем публикацию проекта
npm run deploy
//если возникнет ошибка, то ввести команду и попробовать снова
npx gh-pages-clean
