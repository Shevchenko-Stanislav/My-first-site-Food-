const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
    });
    return await res.json();
};

// const getResource = async (url) => {
//     const res = await fetch(url);

//     if (!res.ok) {
//         throw new Error (`Not fetch ${url}, status: ${res.status}`);
//     }

//     return await res.json();
// };

// Представим, что в результате запроса на сервер мы получили данные ниже.

const getResource = () => {
    return [
        {
          "img": "img/tabs/vegy.jpg",
          "altimg": "vegy",
          "title": "Меню 'Фитнес'",
          "descr": "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
          "price": 9
        },
        {
          "img": "img/tabs/post.jpg",
          "altimg": "post",
          "title": "Меню 'Постное'",
          "descr": "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
          "price": 14
        },
        {
          "img": "img/tabs/elite.jpg",
          "altimg": "elite",
          "title": "Меню 'Премиум'",
          "descr": "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
          "price": 21
        }
    ]
};


export {postData};
export {getResource};