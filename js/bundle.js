/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function calc() {
  //Calc
  const result = document.querySelector('.calculating__result span');
  let gender, weight, height, age, ratio;

  if (localStorage.getItem('gender')) {
    gender = localStorage.getItem('gender');
  } else {
    gender = 'female';
    localStorage.setItem('gender', gender);
  }

  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', ratio);
  }

  function initLocalSettings(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);
    elements.forEach(item => {
      item.classList.remove(activeClass);

      if (item.getAttribute('data-ratio') == ratio) {
        item.classList.add(activeClass);
      }

      if (item.getAttribute('id') == gender) {
        item.classList.add(activeClass);
      }
    });
  }

  function calcTotal() {
    if (!gender || !weight || !height || !age || !ratio) {
      result.textContent = '____';
      return;
    }

    if (gender === 'female') {
      result.textContent = Math.round(447.6 + 9.2 * weight + 3.1 * height - 4.3 * age * ratio);
    } else {
      result.textContent = Math.round(88.36 + 13.4 * weight + 4.8 * height - 5.7 * age * ratio);
    }
  }

  function getStaticInformation(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);
    elements.forEach(item => {
      item.addEventListener('click', e => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', ratio);
        } else {
          gender = e.target.getAttribute('id');
          localStorage.setItem('gender', gender);
        }

        elements.forEach(item => {
          item.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) {
        input.style.border = '2px solid red';
      } else {
        input.style.border = 'none';
      }

      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;

        case 'weight':
          weight = +input.value;
          break;

        case 'age':
          age = +input.value;
          break;
      }

      calcTotal();
    });
  }

  calcTotal();
  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');
  getStaticInformation('#gender', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big', 'calculating__choose-item_active');
  initLocalSettings('#gender', 'calculating__choose-item_active');
}

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
  class MenuCard {
    constructor(src, alt, title, discr, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.discr = discr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.course = 10;

      for (var _len = arguments.length, classes = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        classes[_key - 6] = arguments[_key];
      }

      this.classes = classes;
      this.setDollarPrice();
    }

    setDollarPrice() {
      this.price = this.price * this.course;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.discr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
        `;
      this.parent.append(element);
    }

  } // getResource('http://localhost:3000/menu')
  //     .then(data => {
  //         data.forEach(({img, altimg, title, descr, price}) => {
  //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
  //         });
  //     });
  // Запрос на сервер реализован, но т.к. у меня нет возможности
  // обратиться к реальной базе данных, мы будем использовать воображение
  // и готовый массив из '../services/services'.


  const serverResponse = (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)();
  serverResponse.forEach(_ref => {
    let {
      img,
      altimg,
      title,
      descr,
      price
    } = _ref;
    new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
  });
}

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
  // Forms
  const forms = document.querySelectorAll(formSelector);
  const message = {
    loading: '/img/form/spinner.svg',
    succes: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };
  forms.forEach(item => {
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
      form.append(statusMessage);
      form.insertAdjacentElement('afterend', statusMessage);
      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json).then(data => {
        showThanksModal(message.succes);
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(message.failure);
      }).finally(() => {
        form.reset();
      });
    });
  }

  function showThanksModal(message) {
    const modalDialog = document.querySelector('.modal__dialog');
    modalDialog.style.display = 'none';
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);
    const thaksModal = document.createElement('div');
    thaksModal.classList.add('modal__dialog');
    thaksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
    document.querySelector('.modal').append(thaksModal);
    setTimeout(() => {
      thaksModal.remove();
      modalDialog.style.display = 'block';
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
    }, 4000);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": function() { return /* binding */ closeModal; },
/* harmony export */   "openModal": function() { return /* binding */ openModal; }
/* harmony export */ });
function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';

  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  // Modal
  const buttons = document.querySelectorAll(triggerSelector);
  const modal = document.querySelector(modalSelector);
  buttons.forEach(button => {
    button.addEventListener('click', () => openModal(modalSelector, modalTimerId));
  });
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.style.display == 'block') {
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ __webpack_exports__["default"] = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function slider(_ref) {
  let {
    container,
    slide,
    nextArrow,
    prevArrow,
    totalCounter,
    currentCounter,
    wrapper,
    field
  } = _ref;
  // Slider
  const slides = document.querySelectorAll(slide);
  const slider = document.querySelector(container);
  const next = document.querySelector(nextArrow);
  const prev = document.querySelector(prevArrow);
  const total = document.querySelector(totalCounter);
  const current = document.querySelector(currentCounter);
  const slidesWrapper = document.querySelector(wrapper);
  const slidesField = document.querySelector(field);
  const width = window.getComputedStyle(slidesWrapper).width;
  const dots = [];
  let slideIndex = 1;
  let offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.7s all';
  slidesWrapper.style.overflow = 'hidden';
  slides.forEach(slide => {
    slide.style.width = width;
  });
  slider.style.position = 'relative';
  const indicators = document.createElement('ol');
  indicators.classList.add('carousel-indicators');
  indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15 % ;
        margin-left: 15 % ;
        list-style: none;
    `;
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

    if (i == 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
  }

  function setRelevantPoint() {
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
  }

  function setSlideIndex() {
    if (slideIndex < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }

  function convertToNumber(string) {
    return +string.replace(/\D/g, '');
  }

  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      const slideTo = e.target.getAttribute('data-slide-to');
      slideIndex = slideTo;
      offset = +width.slice(0, width.length - 2) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
      setSlideIndex();
      setRelevantPoint();
    });
  });
  next.addEventListener('click', () => {
    if (offset == convertToNumber(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += convertToNumber(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    setSlideIndex();
    setRelevantPoint();
  });
  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = convertToNumber(width) * (slides.length - 1);
    } else {
      offset -= convertToNumber(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    setSlideIndex();
    setRelevantPoint();
  });
}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  // Tabs
  const tabs = document.querySelectorAll(tabsSelector);
  const tabsConten = document.querySelectorAll(tabsContentSelector);
  const tabsParent = document.querySelector(tabsParentSelector);

  function hideTabContent() {
    tabsConten.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach(item => {
      item.classList.remove(activeClass);
    });
  }

  function showTabContent(i) {
    tabsConten[i].classList.add('show', 'fade');
    tabsConten[i].classList.remove('hide');
    tabs[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent(0);
  tabsParent.addEventListener('click', event => {
    const target = event.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function timer(id, deadline) {
  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor(t / (1000 * 60 * 60) % 24);
    const minutes = Math.floor(t / 1000 / 60 % 60);
    const seconds = Math.floor(t / 1000 % 60);
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    const timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(id, deadline);
}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": function() { return /* binding */ getResource; },
/* harmony export */   "postData": function() { return /* binding */ postData; }
/* harmony export */ });
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });
  return await res.json();
}; // const getResource = async (url) => {
//     const res = await fetch(url);
//     if (!res.ok) {
//         throw new Error (`Not fetch ${url}, status: ${res.status}`);
//     }
//     return await res.json();
// };
// Представим, что в результате запроса на сервер мы получили данные ниже.


const getResource = () => {
  return [{
    "img": "img/tabs/vegy.jpg",
    "altimg": "vegy",
    "title": "Меню 'Фитнес'",
    "descr": "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
    "price": 9
  }, {
    "img": "img/tabs/post.jpg",
    "altimg": "post",
    "title": "Меню 'Постное'",
    "descr": "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    "price": 14
  }, {
    "img": "img/tabs/elite.jpg",
    "altimg": "elite",
    "title": "Меню 'Премиум'",
    "descr": "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    "price": 21
  }];
};




/***/ }),

/***/ "./node_modules/es6-promise-polyfill/promise.js":
/*!******************************************************!*\
  !*** ./node_modules/es6-promise-polyfill/promise.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;(function(global){

//
// Check for native Promise and it has correct interface
//

var NativePromise = global['Promise'];
var nativePromiseSupported =
  NativePromise &&
  // Some of these methods are missing from
  // Firefox/Chrome experimental implementations
  'resolve' in NativePromise &&
  'reject' in NativePromise &&
  'all' in NativePromise &&
  'race' in NativePromise &&
  // Older version of the spec had a resolver object
  // as the arg rather than a function
  (function(){
    var resolve;
    new NativePromise(function(r){ resolve = r; });
    return typeof resolve === 'function';
  })();


//
// export if necessary
//

if ( true && exports)
{
  // node.js
  exports.Promise = nativePromiseSupported ? NativePromise : Promise;
  exports.Polyfill = Promise;
}
else
{
  // AMD
  if (true)
  {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){
      return nativePromiseSupported ? NativePromise : Promise;
    }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
  else
  {}
}


//
// Polyfill
//

var PENDING = 'pending';
var SEALED = 'sealed';
var FULFILLED = 'fulfilled';
var REJECTED = 'rejected';
var NOOP = function(){};

function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]';
}

// async calls
var asyncSetTimer = typeof setImmediate !== 'undefined' ? setImmediate : setTimeout;
var asyncQueue = [];
var asyncTimer;

function asyncFlush(){
  // run promise callbacks
  for (var i = 0; i < asyncQueue.length; i++)
    asyncQueue[i][0](asyncQueue[i][1]);

  // reset async asyncQueue
  asyncQueue = [];
  asyncTimer = false;
}

function asyncCall(callback, arg){
  asyncQueue.push([callback, arg]);

  if (!asyncTimer)
  {
    asyncTimer = true;
    asyncSetTimer(asyncFlush, 0);
  }
}


function invokeResolver(resolver, promise) {
  function resolvePromise(value) {
    resolve(promise, value);
  }

  function rejectPromise(reason) {
    reject(promise, reason);
  }

  try {
    resolver(resolvePromise, rejectPromise);
  } catch(e) {
    rejectPromise(e);
  }
}

function invokeCallback(subscriber){
  var owner = subscriber.owner;
  var settled = owner.state_;
  var value = owner.data_;  
  var callback = subscriber[settled];
  var promise = subscriber.then;

  if (typeof callback === 'function')
  {
    settled = FULFILLED;
    try {
      value = callback(value);
    } catch(e) {
      reject(promise, e);
    }
  }

  if (!handleThenable(promise, value))
  {
    if (settled === FULFILLED)
      resolve(promise, value);

    if (settled === REJECTED)
      reject(promise, value);
  }
}

function handleThenable(promise, value) {
  var resolved;

  try {
    if (promise === value)
      throw new TypeError('A promises callback cannot return that same promise.');

    if (value && (typeof value === 'function' || typeof value === 'object'))
    {
      var then = value.then;  // then should be retrived only once

      if (typeof then === 'function')
      {
        then.call(value, function(val){
          if (!resolved)
          {
            resolved = true;

            if (value !== val)
              resolve(promise, val);
            else
              fulfill(promise, val);
          }
        }, function(reason){
          if (!resolved)
          {
            resolved = true;

            reject(promise, reason);
          }
        });

        return true;
      }
    }
  } catch (e) {
    if (!resolved)
      reject(promise, e);

    return true;
  }

  return false;
}

function resolve(promise, value){
  if (promise === value || !handleThenable(promise, value))
    fulfill(promise, value);
}

function fulfill(promise, value){
  if (promise.state_ === PENDING)
  {
    promise.state_ = SEALED;
    promise.data_ = value;

    asyncCall(publishFulfillment, promise);
  }
}

function reject(promise, reason){
  if (promise.state_ === PENDING)
  {
    promise.state_ = SEALED;
    promise.data_ = reason;

    asyncCall(publishRejection, promise);
  }
}

function publish(promise) {
  var callbacks = promise.then_;
  promise.then_ = undefined;

  for (var i = 0; i < callbacks.length; i++) {
    invokeCallback(callbacks[i]);
  }
}

function publishFulfillment(promise){
  promise.state_ = FULFILLED;
  publish(promise);
}

function publishRejection(promise){
  promise.state_ = REJECTED;
  publish(promise);
}

/**
* @class
*/
function Promise(resolver){
  if (typeof resolver !== 'function')
    throw new TypeError('Promise constructor takes a function argument');

  if (this instanceof Promise === false)
    throw new TypeError('Failed to construct \'Promise\': Please use the \'new\' operator, this object constructor cannot be called as a function.');

  this.then_ = [];

  invokeResolver(resolver, this);
}

Promise.prototype = {
  constructor: Promise,

  state_: PENDING,
  then_: null,
  data_: undefined,

  then: function(onFulfillment, onRejection){
    var subscriber = {
      owner: this,
      then: new this.constructor(NOOP),
      fulfilled: onFulfillment,
      rejected: onRejection
    };

    if (this.state_ === FULFILLED || this.state_ === REJECTED)
    {
      // already resolved, call callback async
      asyncCall(invokeCallback, subscriber);
    }
    else
    {
      // subscribe
      this.then_.push(subscriber);
    }

    return subscriber.then;
  },

  'catch': function(onRejection) {
    return this.then(null, onRejection);
  }
};

Promise.all = function(promises){
  var Class = this;

  if (!isArray(promises))
    throw new TypeError('You must pass an array to Promise.all().');

  return new Class(function(resolve, reject){
    var results = [];
    var remaining = 0;

    function resolver(index){
      remaining++;
      return function(value){
        results[index] = value;
        if (!--remaining)
          resolve(results);
      };
    }

    for (var i = 0, promise; i < promises.length; i++)
    {
      promise = promises[i];

      if (promise && typeof promise.then === 'function')
        promise.then(resolver(i), reject);
      else
        results[i] = promise;
    }

    if (!remaining)
      resolve(results);
  });
};

Promise.race = function(promises){
  var Class = this;

  if (!isArray(promises))
    throw new TypeError('You must pass an array to Promise.race().');

  return new Class(function(resolve, reject) {
    for (var i = 0, promise; i < promises.length; i++)
    {
      promise = promises[i];

      if (promise && typeof promise.then === 'function')
        promise.then(resolve, reject);
      else
        resolve(promise);
    }
  });
};

Promise.resolve = function(value){
  var Class = this;

  if (value && typeof value === 'object' && value.constructor === Class)
    return value;

  return new Class(function(resolve){
    resolve(value);
  });
};

Promise.reject = function(reason){
  var Class = this;

  return new Class(function(resolve, reject){
    reject(reason);
  });
};

})(typeof window != 'undefined' ? window : typeof __webpack_require__.g != 'undefined' ? __webpack_require__.g : typeof self != 'undefined' ? self : this);


/***/ }),

/***/ "./node_modules/nodelist-foreach-polyfill/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/nodelist-foreach-polyfill/index.js ***!
  \*********************************************************/
/***/ (function() {

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
var Promise = (__webpack_require__(/*! es6-promise-polyfill */ "./node_modules/es6-promise-polyfill/promise.js").Promise);

__webpack_require__(/*! nodelist-foreach-polyfill */ "./node_modules/nodelist-foreach-polyfill/index.js");









document.addEventListener('DOMContentLoaded', () => {
  const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 300000);
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimerId);
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-modal]", '.modal', modalTimerId);
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2022-06-21');
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
    container: '.offer__slider',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    slide: '.offer__slide',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
  });
});
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map