//ReactDOM сравнивает элемент и его дочернее дерево с предыдущей версией
//и вносит в DOM только необходимые изменения
//пример:
//Данная функция будет вызываться раз в секунду,
//но заново отрисовываться, будет только элемент h2, а не весь dom элемент
function timer() {
    const element = React.createElement(
      "div",
      null,
      React.createElement("h1", null, "Текущее время:"),
            React.createElement("h2", null, new Date().toLocaleTimeString())
    );
    ReactDOM.render(element, document.getElementById('root'));
}
setInterval(timer, 1000);
//-----
//---(JSX)---
//Встраивание выражений
//пример:
//вызываем функцию внутри разметки, такая функция должна возвращать разметку или null и быть синхронной
const renderAddress = (street, house) => {
    return (
      <div>
        <p>Улица {street}</p>
        <p>Дом {house}</p>
      </div>
    );
}
ReactDOM.render((
    <section>
        <p>Я проживаю по адресу:</p>
        {renderAddress("Пушкина", "Колотушкина")}
    </section>
), document.querySelector('#root'));
//-----
//Фрагменты
<React.Fragment>...</React.Fragment> //или <>...</>
ReactDOM.render((
    <>
      <div id="1">с:</div>
      <div id="2">сс:</div>
    </>
), document.querySelector('#root'));
//Блок JSX-кода по правилам должен содержать только один элемент верхнего уровня
//В примере используются сразу два элемента, которые находятся рядом
//Чтобы JSX-код работал правильно, мы «оборачиваем» эти два элемента во фрагмент
//-----
//Тернарный оператор ?: (сокращённый аналог if/else)
/*
    {isTrue ? (
        <h2>первый</h2>
    ) : (
        <h2>второй</h2>
    )}
*/
ReactDOM.render((
    <React.Fragment>
    {userName ? (
      <h2>Добро пожаловать, {userName}!</h2>  //когда такая конструкция возвращает null в DOM ничего не попадает
    ) : null}
  </React.Fragment>
), document.querySelector('#root'));
//-----
//Оператор && (логическое И) — аналог if, но без else
ReactDOM.render((
    <div>
      {isLunchTime && <h2>Время обеда!</h2>}
    </div>
), document.querySelector('#root'));
//-----
//Классы
const poemClass = "poem poem-classic"
ReactDOM.render((
    <div className={poemClass}></div>
), document.querySelector('#root'));
//-----
//Стили
//вариант без промежуточной переменной с объектом стилей:
//{{...}} - внешние означают подстановку значения, а внутренние относятся к объекту, который описывает набор стилей
ReactDOM.render((
    <div style={{
        width: 3475,
        height: 3472,
        borderRadius: '50%',
    }}>
        Я тоже хочу быть планетой!
    </div>
), document.querySelector('#root'));
//-----
//Комментарии
{/* привет */}
//-----
//-----
//---(Компоненты в React)---
//самый простой пример функционального(потому что функция) компонента
const UserGreeting = props => <h1>Здравствуйте, {props.fullName}</h1>;
//Функциональный компонент:
function UserGreeting(props) {
    return <h1>Здравствуйте, {props.fullName}</h1>;  //не стрелочный пример записи UserGreeting выше
}
const element = <UserGreeting fullName="Павел Валерьевич" />;
ReactDOM.render(
    element,
    document.getElementById('root')
);
//пропсом называется объект, который React собирает из всех JSX-атрибутов элемента при передаче их компоненту
//пропс из примера выше
/*
    {
        fullName: 'Павел Валерьевич'
    }
*/
//-----
//Классовый компонент:
class Player extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return <li className="table__text">{this.props.children}</li>;
    }
}
class List extends React.Component {
    render() {
        return (
        <section className="table">
            <h1 className="table__title">
            Игроки киберспортивной команды <span className="table__span">NaVi</span>
            </h1>
             привет
            <ol className="table__content">                 {/*на выходе получим нумерованный список <ol><li></li>...</ol>*/}
                <Player children="flamie"></Player>         {/*из этого сгенерируется <li>flamie</li>*/}
                <Player children="s1mple"></Player>         {/*<li>s1mple</li>*/}
                <Player children="electronic"></Player>     {/*<li>electronic</li>*/}
            </ol>
        </section>
        );
    }
}
ReactDOM.render(<List />, document.querySelector('#team-container'));
//-----
//Извлечение компонентов
class Button extends React.Component {
    //без constructor (почему?) см. пример выше
    render() {
      return (
        <button className='log-in-btn' type='button'>{this.props.text}</button>
      );
    }
}
class App extends React.Component {
    render() {
        return (
        <div className='page'>
            <NavBar>
                <Logo/>
                <Button text="войти"/>    {/*строковый литерал text="войти" - это пропс, равнозначно записи text={'войти'}*/}
            </NavBar>
        </div>
        );
    }
}
ReactDOM.render(<App />, document.querySelector('#root'));
//-----
//-----
//---(Пропсы)---
//JavaScript-выражения как пропсы
<MusicGenreItem genre={'rock' + '&' + 'roll'} />   //в качестве пропсов можно передавать любые выражения
//в примере ниже в пропс textToRender попадёт результат
//выполнения функции sayHi('Варвара'), то есть строка "Привет, Варвара!"
function sayHi(name) {
    return `Привет, ${name}!`
}
<WelcomeComponent textToRender={sayHi('Варвара')} />   //пропс textToRender
}
//-----
//Строковые литералы - это тоже пропсы
<Button text="войти"/>    //строковый литерал text="войти" - это пропс, равнозначно записи text={'войти'}
//
//-----
//Атрибуты расширения
//пример:
//size используется для вычисления класса, а userId не используется
//поэтому при передаче в DOM элемент, в объекте {...otherProps} остаются только нужные пропсы — type и disabled
const Input = props => {
    const { size, userId, ...otherProps } = props;
      const className = size === "default" ? "DefaultInput" : "SmallInput";
    return <input className={className} {...otherProps} />;
};
//в LandingPage мы передаем 4 аргумента в качестве пропсов в компонент Input
const LandingPage = () => {
    return (
            <>
                <b>Введите промокод:</b>
                <Input size="default" type="text" disabled={false} userId={1112983} />
            </>
        );
};
//
//-----
//Пример из тренажера (Основы 9.2):
//создаем функцию-генератор случайных чисел, которая будет выбирать блюдо из массива
class FavoriteFood extends React.Component {
    render() {
      const { name, photo, country } = this.props.favorite;
      return (
        <div className="content" style={{ backgroundImage: `url(${photo})` }}>
          <p className="text-food">Ваше любимое блюдо</p>
          <h1 className="title">{name}</h1>
          <p className="text-country">{`Страна: ${country}`}</p>
        </div>
      );
    }
}
const meals = [
    { name: 'Паста', photo: './images/1.png', country: 'Италия' },
    { name: 'Гамбургер', photo: './images/2.png', country: 'США/Германия' },
    { name: 'Ренданг', photo: './images/3.png', country: 'Индонезия' },
    { name: 'Том Ям', photo: './images/4.png', country: 'Тайланд' },
    { name: 'Утка по-пекински', photo: './images/5.png', country: 'Китай' },
    { name: 'Суши', photo: './images/6.png', country: 'Япония' },
    { name: 'Хачапури', photo: './images/7.png', country: 'Грузия' }
];
class App extends React.Component {
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    randomMeal(arr) {
      const length = arr.length;
      const number = this.getRandomInt(length);
      return arr[number];
    }

    render() {
      return <FavoriteFood favorite={this.randomMeal(meals)} />;
    }
}
ReactDOM.render(<App />, document.querySelector('#root'));
//
//-----
//Пример передачи аргументов
//1) вариант передачи about={data}, без оператора spread - ...
//внимание к props, about, data
const CatCard = props => {
    const prr = props.about;
    //см. два варианта обращения (напрямую и с использованием константы):
    return (
      <article className="card">
        <img className="card__img" src="./images/cat.png" alt="фото кошки." />
        <div className="card__text-box">
          <p className="card__text">{`Название породы: ${props.about.name}`}</p>
          <p className="card__text">{`Происхождение: ${prr.origin}`}</p>
        </div>
      </article>
    );
};
const App = () => {
    const data = {
        name: 'Британская короткошерстная кошка',
        origin: 'Великобритания'
    };
    return (
        <CatCard
        about={data}
        />
    );
};
ReactDOM.render(<App />, document.querySelector('#root'));
//2) вариант передачи {...data} с оператором spread - ...
const CatCard = props => {
    return (
      <article className="card">
        <img className="card__img" src="./images/cat.png" alt="фото кошки." />
        <div className="card__text-box">
          <p className="card__text">{`Название породы: ${props.name}`}</p>
          <p className="card__text">{`Происхождение: ${props.origin}`}</p>
        </div>
      </article>
    );
};
const App = () => {
    const data = {
        name: 'Британская короткошерстная кошка',
        origin: 'Великобритания'
    };
    return (
        <CatCard
        {...data}
        />
    );
};
ReactDOM.render(<App />, document.querySelector('#root'));
//3) пример декомпозиции пропсов с оператором spread - ...
//читать снизу вверх
const Description = props => {
    return (
      <section className='description'>
        <h2 className='card__subtitle'>{props.subtitle}</h2>
        <p className='card__text mb-1'>{props.text.first}</p>
        <p className='card__text'>{props.text.second}</p>
      </section>
    )
}
const SizeSpecs = props => {
    return (
      <div className='card__data-box'>
          <h2 className='card__subtitle'>{props.subtitle}</h2>
            <p className='card__text'>Длина</p>
            <p className='card__text'>{props.length}</p>
      </div>
    )
}
const SpeedSpecs = props => {
    return (
     <div className='card__data-box'>
          <h2 className='card__subtitle'>{props.subtitle}</h2>
            <p className='card__text'>Разгон до 100 км/ч</p>
            <p className='card__text'>{props.acceleration}</p>
      </div>
    )
}
const Common = props => {
    return (
      <div className='card__data-box'>
          <h2 className='card__subtitle'>{props.subtitle}</h2>
            <p className='card__text'>Годы производства</p>
            <p className='card__text'>{props.years}</p>
      </div>
    )
}
const Delorean = () => {
    const data = {
      common: {
        subtitle: 'Общие данные',
        //...
      },
      sizeSpecs: {
        subtitle: 'Массово-габаритные характеристики',
        //...
      },
      speedSpecs: {
        maxSpeed: '177 км/ч'
        //...
      },
      description: {
        subtitle: 'О модели',
        text: {
          first: `...`
        },
      },
    }
    return (
      <article className='card'>
        <h1 className="card__title">
            DELOREAN
        </h1>
        <Common {...data.common} />
        <SizeSpecs {...data.sizeSpecs} />
        <SpeedSpecs {...data.speedSpecs} />
        <Description {...data.description} />
      </article>
    )
}
const App = () => {
    return (
      <Delorean />
    )
}
ReactDOM.render(<App />, document.querySelector('#root'));
//
//-----
//React.Children
//все что написано между открывающим и закрывающими тегами,
//попадает в ключ children объекта пропсов этого элемента;
//обращение через props.children:
const FancyParagraph = (props) => (
    <p>{props.children}</p>     //Этот параграф выглядит очень красиво.
);
const CoolShinySwagText = () => (
    <FancyParagraph>Этот параграф выглядит очень красиво.</FancyParagraph>
);
//---
//1) обращаемся к переданному пропсу по созданному нами ключу - notificationText="Вним..."
const Notification = (props) => (
    <div className="Notification">
        <p>{props.notificationText}</p>    {/* Внимание! Обнаружено повышение радиации в 4-м блоке */}
    </div>
);
<Notification notificationText="Внимание! Обнаружено повышение радиации в 4-м блоке" />
//2) обращаемся к свойству children объекта пропсов
const Notification = (props) => (
    <div className="Notification">
        <p>{props.children}</p>   {/* Внимание! Обнаружено повышение радиации в 4-м блоке */}
    </div>
);
<Notification>Внимание! Обнаружено повышение радиации в 4-м блоке</Notification>
</>
//---
//Приоритетность выше у содержимого внутри тегов
//будет выведено: Пицца с ананасами прекрасна!
<FancyParagraph children={"Пицца с ананасами ужасна!"}>
    Пицца с ананасами прекрасна!
</FancyParagraph>
//---
//в этом примере мы передаем в children разметку с соодержимым,
//что позволяет переиспоьзовать компонент MenuBlock в разных частях сайта
const MenuBlock = props => {
    return (
      <div className="menu">
        <div className="content">
          <p className="menu__title">{props.menuHeading}</p>
          {props.children}
        </div>
      </div>
    );
};
const Footer = () => {
    return (
      <div className="footer">
          <MenuBlock menuHeading={"О компании"}>
            <ul className="nav">
              <li className="nav__link">Наша миссия</li>
              <li className="nav__link">Вакансии</li>
              <li className="nav__link">Блог</li>
            </ul>
          </MenuBlock>
      </div>
    );
};
//
//-----
//Объект state - внутреннее состояние компонентов
class Employee extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        avatar: '1.jpg',
        name: 'Альберт Энштейн',
      };
    }
    render() {
      return (
        <div className="card">
          <img className="card__image" alt="аватар" src={this.state.avatar}/>
          <h4 className="card__name">Имя: {this.state.name}</h4>
        </div>
      );
    }
}
ReactDOM.render(<Employee />, document.querySelector('#root'));
//---
//изменять значение state можно методом setState в React.Component
//при таком изменении компонента React сделает сверку состояния(state) и если обнаружит различия, то ReactDOM перерисует этот элемент
//пример
//Включение и выключение сайдбара по клику кнопки
class SettingsMenu extends React.Component {
  state = {
    theme: 'dark',
    userSettings: {
      notificationsEnabled: true,
      sidebar: {
        title: 'Боковая панель',
        enabled: false
      }
    }
  };
  toggleSidebar = () => {
    const enableState = this.state.userSettings.sidebar.enabled;
    this.setState(prevState => ({
        ...prevState,  //сохраняем предыдущее состояние поля, оно не будет изменено
            userSettings: {
              ...prevState.userSettings,  //сохраняем предыдущее состояние поля, оно не будет изменено
                sidebar: {
                  ...prevState.sidebar,  //сохраняем предыдущее состояние поля, оно не будет изменено
                    enabled: !enableState,  //заменяем значение! см. выше переменную

                }
            }
    }));
  };
  render() {
    const { enabled } = this.state.userSettings.sidebar;  //берем текущее значение из state
    return (
      <>
        {enabled && <aside className="aside" />}
        <section className="content">
          <button className="content__button" onClick={this.toggleSidebar}>  { /*при вызове toggleSidebar значение enabled в state перезапишется*/ }
            {enabled ? 'Выключить' : 'Включить'}
          </button>
        </section>
      </>
    );
  }
}
ReactDOM.render(<SettingsMenu />, document.querySelector('#root'));
//---
//Как изменять состояние в Reaсt-компонентах урок 13, 3/3
const STATUS_CONFIRMED = 'confirmed';
const STATUS_PENDING = 'pending';
const STATUS_CANCELED = 'canceled';
const renderStatus = {
  confirmed: 'Подтверждён',
  pending: 'Не подтверждён',
  canceled: 'Отменён'
};
class User extends React.Component {
  render() {
    return (
      <div className="user">
        <img className="user__avatar" src={this.props.avatar} alt="фото." />
        <div className="user__info">
          <p className="user__text">{`${this.props.name}, ${this.props.role}`}</p>
          {this.props.status && (
            <p className={`user__status ${this.props.status}`}>{renderStatus[this.props.status]}</p>
          )}
        </div>
      </div>
    );
  }
}
class CalendarEvent extends React.Component {
  state = {
    currentUser: 34047044,
    owner: { id: 34049221, name: 'Павел', role: 'Технический директор', avatar: './images/1.png' },
    subject: 'Обсуждение редизайна административной панели сайта',
    invited: [
      {
        id: 34049119,
        name: 'Татьяна',
        role: 'Дизайнер',
        status: STATUS_CONFIRMED,
        avatar: './images/2.png'
      },
      {
        id: 34047044,
        name: 'Кирилл',
        role: 'Разработчик',
        status: STATUS_PENDING,
        avatar: './images/3.png'
      }
    ],
    //...
  };
  getCurrentUserConfirmationStatus() {
  return this.state.invited.find(user => user.id === this.state.currentUser).status;
  }
  confirm = () => {
    this.getCurrentUserConfirmationStatus !== STATUS_CONFIRMED &&
      this.setState(prevState => ({
        ...prevState,
        invited: this.state.invited.map(user => {
          if (user.id === this.state.currentUser) {
            user.status = STATUS_CONFIRMED;
            return user;
          }
          return user;
        })
      }));
  };
  cancel = () => {
    this.getCurrentUserConfirmationStatus !== STATUS_CANCELED &&
      this.setState(prevState => ({
        ...prevState,
        invited: this.state.invited.map(user => {
          if (user.id === this.state.currentUser) {
            user.status = STATUS_CANCELED;
            return user;
          }
          return user;
        })
      }));
  };
  render() {
    const confirmed = this.getCurrentUserConfirmationStatus() === STATUS_CONFIRMED;
    return (
      <section className="main">
        <div className="calendar">
          <p className="calendar__menu">Тема:</p>
          <h1 className="calendar__title">{this.state.subject}</h1>
          <p className="calendar__menu">Организатор:</p>
          <User {...this.state.owner} />
          <p className="calendar__menu">Приглашены:</p>
          <div className="calendar__invited">
            {this.state.invited.map((user, index) => (
              <User key={index} {...user} />
            ))}
          </div>
        </div>
        <div className="buttons">
          <button className="button cancel" type="button" onClick={this.cancel}>
            Отменить
          </button>
          <button className="button confirm" type="button" onClick={this.confirm}>
            Подтвердить
          </button>
        </div>
      </section>
    );
  }
}
ReactDOM.render(<CalendarEvent />, document.querySelector('#root'));
//-----
//Key - пропс элементов в React
//свойство key всегда обязательно применять для рендеринга списков:
<div className="ChatRoom">
    {this.state.messages.map((message, index)=>(
        //указывать это свойство нужно у первого элемента разметки внутри цикла:
        <div className="Message" key={message.id}>
            <span className="Message-user">{message.user}</span>
            <span className="Message-text">{message.text}</span>
        </div>

    ))}
</div>
//свойство key поддерживается даже фрагментами:
{this.state.messages.map((message, index)=>(
  //вводим фрагмент, т.к. помимо сообщений добавляем и аватар
  <React.Fragment key={message.id}>
      <img className="Avatar" src={message.user.avatar} alt="avatar" />
      <div className="Message">
          <span className="Message-user">{message.user}</span>
          <span className="Message-text">{message.text}</span>
      </div>
  </React.Fragment>
))}
//14 задание глючит
// const Chat = ({ thread }) => (
//   <div className="tread">
//      {thread.map((message)=>(
//         <Message message={message} repliedMessage={thread.find((m) => m.id === message.replyTo)} key={message.id}></Message>
//       ))}
//   </div>
// );
//-----
//---(Классовые компоненты)---
// До версии React 16.8 компоненты делили на:
// Компоненты с внутренним состоянием. Их ещё называют stateful, или «умные», компоненты. Их описывают с помощью классов.
// Компоненты без внутреннего состояния — stateless, или «глупые», компоненты. Этот вид описывают с помощью функций.
//(!!!) constructor() {} — специальный метод классов, который служит для создания и инициализации объектов
class SayHi extends React.Component {
  constructor(props) {
    //вызываем super(props), иначе возможны баги, т.к. this.props не будет определён
      super(props);
    //конструктор единственное место в классе где можно явно задать state,
    //в другом месте компонента нужно будет испольовать метод this.setState
      this.state = { theme: 'dark' }
    //привязываем обработчик события this.showGreeting
    //либо, чтобы не использовать конструкцию bind(this), использовать
    //методы в виде стрелочных функций, тогда контекст будет взят автоматически из класса
      this.myFunction = this.myFunction.bind(this);
  }
}
//---
//если назначить this.state из props, то компонент перестанет реагировать
//на изменения props и не будет рендерить обновлённую разметку:
constructor(props) {
  super(props);
  this.state = { name: props.name } //использовать только если окей отказаться от обновления компонента на основании его пропсов
}
//(i) если props требуется вам в качестве внутреннего состояния компонента, воспользуйтесь методом getDerivedStateFromProps
//---
//Пропсы по умолчанию: defaultProps
class ImageContainer extends React.Component {
  //...
}
ImageContainer.defaultProps = {  //задаем значение по-умолчанию (см. ниже)
  background: 'black'
};
render() {
  return <ImageContainer /> ;  //props.background = 'black'
}
//но если props.background имеет значение null, оно останется null
render() {
  return <ImageContainer background={null} /> ; // props.background = null
}
//---
//Ручное управление рендерингом: forceUpdate()
//по умолчанию при изменении состояния компонента или пропса происходит повторный рендер
//но можно его запустить вручную:
class ChartContainer extends React.Component {
  // ...
  const onMyCustomEvent = () => {
      this.forceUpdate(callbackFn)
  }
  // ...
}
//-----
//---(Жизненный цикл компонента)
//---Монтирование происходит, когда HTML-дерево компонента вставляется движком React в DOM.
//---Обновление осуществляется в одном из трёх случаев:
// - если произошёл рендер родительского компонента,
// - если изменилось внутреннее состояние в результате вызова this.setState,
// - если обновление инициировано вызовом встроенного метода this.forceUpdate.
//---Размонтирование происходит, когда HTML-дерево компонента удаляется из DOM.
//Каждому из этих событий соответствует один из трёх методов жизненного цикла:
//componentDidMount, componentDidUpdate и componentWillUnmount
//---componentDidMount
// - хорошо подходит для установки слушателей(подписки на события) и взаимодействия с сервером
class Stories extends React.Component {
  state = {
      stories: [],
      //с помощью условного рендеринга сможем показывать пользователю разную разметку  - (урок про условный рендеринг https://practicum.yandex.ru/trainer/web-plus/lesson/f26dd995-4bea-4c7a-98bc-cbebb997c228/task/bc1f048c-a0c4-4eca-8a38-ba75cba7ddbf/)
      loading: true,   //в этом случае загружаем сайт
      hasError: false   //в этом случае показываем окно с ошибкой
  }
  componentDidMount() {
      fetch('/stories/all')
          .then(res => res.json())
          .then(data => this.setState({ stories: data.stories, loading: false }))
          .catch(e => this.setState({ ...this.state, loading: false, hasError: true }))
  }
  // ...
}
//---componentDidUpdate
componentDidUpdate(prevProps, prevState) {
  if (this.props.productId !== prevProps.productId) { //сравниваем предыдущее состояние с новым
        this.setState({ ...this.state, loading: true });
    this.getProductData();  //написанный нами метод класса, который делает fetch запрос
  }
}
//---shouldComponentUpdate
//в примере компонент TodoItem будет повторно рендериться только
//если изменились значения props.tagColor или state.done
//преимущество в том, что компонент не будет рендериться даже если в него переданы другие пропсы, которые изменились
class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { done: false };
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.tagColor !== nextProps.tagColor) {
      return true;  //если изменилось значение props.tagColor, то будет вызван повторный рендер
    }
    if (this.state.done !== nextState.done) {
      return true;  //если изменилось значение state.done, то будет вызван повторный рендер
    }
    //во всех остальных случаях повторного рендеринга не будет:
    return false;
  }
  toggleTodo = () => {
    this.setState({ done: !this.state.done });
  };
  render() {
    const btnText = this.state.done ? "Вернуть в работу" : "Выполнено";
    return (
      <>
        <TodoTag tagColor={this.props.tagColor} />
        <button onClick={this.toggleTodo}>{btnText}</button>
      </>
    );
  }
}
//-----
//--(PropTypes)---
//проверка типов propTypes выполняется только в режиме разработки, продакшн-сборка приложения будет игнорировать ошибки
//см. документацию - https://ru.reactjs.org/docs/typechecking-with-proptypes.html
//-----
//
//
//---(Create React App)---
// - утилита, которая предоставляет простое окружение для начала работы с React-приложением
//установим ее глобально:
npm install -g create-react-app
//созданим проект:
npx create-react-app название_проекта
//переходим в новую директорию "название_проекта" и запускаем проект:
npm start
//переходим по адресу http://localhost:3000/
//собираем проект:
npm run build
//после сборки проекта можно разместить папку /build на любом сервере, в том числе сделать deploy в github
//чтобы запустить локально проект из папки со сборкой установим пакет:
npm i -g serve
//и теперь запускаем проект локально командой:
serve -s build
//
//---(React DevTools)---
//установить расширение из магазина приложений chrome
//---(CSS в React)---
//css файлы удобно использовать для общих стилей,
//такой файл появится в неизмененном виде внутри style, после сборки вебпаком
import './awesome-css-file.css';
//такая запись даст понять вебпаку, что этот файл стилей относится к конкретному модулю
import myModule from './app.module.css';
<div className={ myModule.app } />
//webpack преобразует и хеширует селекторы, которые содержатся внутри файлов модулей
{
  app: "app_app__llV42"
}
//ключ app это название селектора .app в CSS-модуле
//(( app ))_app__llV42 — название импортированного модуля,
//app_(( app ))__IIV42 — название селектора,
//а app_app__(( llV42 )) — хеш
//---
//каскадность CSS-правил (composes)
.title {
  font-size: 25px;
  font-family: 'Helvetica', Arial, sans-serif;
}
.description {
  composes: title;
  //переопределяем какие-то свойства, остальные наследуются
  font-size: 15px;
}
//теперь к элементу span будет добавлено сразу два класса: "dog-image_description__1IUew dog-image_title__3mTse"
import dogImage from './dog-image.module.css';
<span className={dogImage.description} />
//также можно наследовать свойства из селекторов других модулей с помощью импорта
.description {
  composes: title from "./yet-awesome-file.module.css"
}
//-----
//
//---(HOC)---
//(от англ. higher-order component, «компонент более высокого порядка»)
// - это способ объединения логики компонентов
//HOC принято хранить в отдельной директории hocs на уровне директории components,
//а файлы называть с with — например для компонент withToggle: //hocs/with-toggle.js
//Ситуации, в которых HOC пригодится:
// - Если нужно описать поведение для множества компонентов.
//   В коде выше мы сначала нашли схожую функциональность, а после — вынесли её в HOC.
// - Если к оборачиваемому компоненту не требуется добавлять собственную логику.
//   Компоненты Card и Gallery с более индивидуальным поведением
//   внутри метода onButtonClick не очень хорошо сочетались бы с HOC
//Когда не стоит использовать:
// - Из-за того, что HOC работает с похожими компонентами,
//   количество пропсов в HOC-компоненте может получиться очень большим,
//   такой код сложнее поддерживать.
//-----
//
//---(Ref: Доступ к DOM из React)---
//https://ru.reactjs.org/docs/refs-and-the-dom.html
//Колбэк-реф - способ указывать функцию в качестве значения ref
//Пример:
import React from "react";
import videoItem from "../images/sky.mp4";
import playerStyles from "./video-player.module.css";
class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }
  onButtonClick() {    // Создадим обработчик onButtonClick, при вызове которого будет воспроизводиться видео
    this.videoPlayerRef.play();  //см. указатель в атрибуте ref
  }
  render() {
    return (
      <div className={playerStyles.player}>
        <video
          className={playerStyles.video}
          src={videoItem}
          ref={(element) => (this.videoPlayerRef = element)}   {/* в данном случае element это video; другими словами: {/* Используем атрибут ref и присвоим указатель полю videoPlayerRef */}
        />
        <button className={playerStyles.button} onClick={this.onButtonClick}>
          {" "}▶️{" "}
        </button>
      </div>
    );
  }
}
export default VideoPlayer;
//---
//Метод React.createRef()
//Этот метод работает достаточно просто: создаёт объект с полем current: null.
//После монтирования компонента атрибут ref присвоит полю current узел
class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.videoPlayerRef = React.createRef();   //запись React.createRef() равнозначна { current: null }
    this.onButtonClick = this.onButtonClick.bind(this);
  }
  onButtonClick() {
    this.videoPlayerRef.current.play();
    // Обратимся к полю current поля videoPlayerRef - там хранится HTML-элемент.
  }
  render() {
    return (
      <div className={playerStyles.player}>
        <video
          className={playerStyles.video}
          src={videoItem}
          ref={this.videoPlayerRef}
        />
        <button className={playerStyles.button} onClick={this.onButtonClick}>
          {" "}▶️{" "}
        </button>
      </div>
    );
  }
}
export default VideoPlayer;
//можно создать в таком объекте любое поле: { current: null, name: 'RefName' и т.д.}
//оно не исчезнет после монтирования компонента, а вот поле current после монтирования изменится
//рефы можно мутировать, а их изменение не приведёт к повторной отрисовке компонента
//---
//Добавление рефа классовому компоненту:
import React from "react";
import VideoPlayer from "../video-player/video-player";
//создаем класс автовоспроизведения
class AutoPlay extends React.Component {
  constructor(props) {
    super(props);
    this.videoPlayerRef = React.createRef();  //создаем реф с экземпляром компонента VideoPlayer
  }
  componentDidMount() {
    this.videoPlayerRef.current.onButtonClick();  //вызываем метод onButtonClick компонента VideoPlayer
  }
  render() {
    return (
      <VideoPlayer ref={this.videoPlayerRef} /> //получаем экземпляр компонента
      //сам компонент VideoPlayer останется почти без изменений
      //поменяется только атрибут autoPlay={true} HTML-элемента <video />
      //ищи компонент VideoPlayer
    );
  }
}
export default AutoPlay;
//-----
//
//---(React.createPortal)---
//как рендерить дочерние элементы вне структуры DOM родительского компонента
//первый аргумент — React-компонент, который может быть отрендерен
//второй аргумент — любой доступный на странице HTML-элемент, контейнер, в который будут отрендерены дочерние элементы
//Пример модального окна:
const modalRoot = document.getElementById("react-modals");
class Modal extends React.Component {
  render() {
    const { children, header, onClose } = this.props;
    return ReactDOM.createPortal(
        (
          <>
            <div className="Modal">
              <ModalHeader onClose={onClose}>{header}</ModalHeader>
              {children}
            </div>
            <ModalBackDrop onClose={onClose} />
          </>
        ),
        modalRoot    /* контейнер */
    );
  }
}
//пример использования модального окна:
class App extends React.Component {
  constructor(props) {
      super(props);
    this.state = {
      visible: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
    handleOpenModal() {
    this.setState({ visible: true });
  }
    handleCloseModal() {
    this.setState({ visible: false });
  }
  render() {
    const modal = (
      <Modal header="Внимание!" onClose={this.handleCloseModal}>
        <p>Спасибо за внимание!</p>
        <p>Открывай меня, если станет скучно :)</p>
      </Modal>
    );
    return (
      <div style={{overflow: 'hidden'}}>
        <button onClick={this.handleOpenModal}>Открыть модальное окно</button>
        {this.state.visible && modal}
      </div>
    );
  }
}
//-----
//
//---(SyntheticEvent)---
//события и хендлеры
//(!)в классовых компонентах важен контекст, а в функциональных область видимости внутри компонента
//обработчик события как метод класса:
class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonClick =
      this.handleButtonClick.bind(this);   //при вызове обработчика this будет равен экземпляру этого компонента (контекст)
  }
  handleButtonClick(e) {
    console.log(this);      //при вызове обработчика без привязки контекста(без .bind(this) в конструкторе) this равен undefined
  }
  render() {
    return (
      <button onClick={this.handleButtonClick}>Я кнопка!</button>
    );
  }
}
//обработчик в виде стрелочной функции (синтаксис общедоступных полей класса)
class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  handleButtonClick = (e) => {   //хендлер записан через стрелочную функцию, поэтому контекст в функции будет определён
    console.log(this);           //при вызове этого обработчика this равен экземпляру компонента (контекст)
  }
  render() {
    return (
        <button onClick={this.handleButtonClick}></button>
    );
  }
}
//при использовании колбэков возникает проблема: с каждым рендером создаётся новый экземпляр функции. При передаче такого колбэка дочернему компоненту может произойти повторная отрисовка компонента.
//(нежелательно) использование стрелочной функции в колбэке бработчика:
class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  handleButtonClick(e) {         //хендлер записан через обычную функцию, но
    console.log(this);           //при вызове этого обработчика this равен экземпляру компонента (контекст)
  }
  render() {
    return (
        <button onClick={e => this.handleButtonClick(e)}></button>   //мы используем стрелочную функцию в колбеке слушателя событий
    );
  }
}
//добавим слушатели на рефы с помощью метода .addEventListener
class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.buttonElement = React.createRef();
  }
  handleButtonClick(e) {
    console.log(this);
  }
  componentDidMount() {
    this.buttonElement.current.addEventListener(    //после монтирования компонента добавим слушатель на реф.
      "click",
      this.handleButtonClick
    );
  }
  render() {
    return (
        <button ref={this.buttonElement}></button>
    );
  }
}
//обработчики в функциональных компонентах:
function Button() {   //функциональный компонент
  function handleButtonClick() {
    console.log("hi");  //никаких проблем с контекстом классов, благодаря механизму области видимости функций
  }
  return (
    <button onClick={handleButtonClick}>Я кнопка!</button>
  );
}
//-----
//
//---(event.currentTarget)---
//регистрация событий на фазе захвата
