'use strict';

// Инициализация переменных и элементов: таблицы, заголовка
let sweet_cookies = document.cookie.split('; '),
    len = sweet_cookies.length,
    bdy = document.body,
    table = document.createElement('table'),
    header = document.createElement('tr'),
    key = document.createElement('th'),
    value = document.createElement('th');

// Стиль для таблицы
table.setAttribute("border", "2");

// Добавление текста к заголовкам
key.appendChild(document.createTextNode('Имя'));
value.appendChild(document.createTextNode('Значение'));

// Добавление таблицы к документу
header.appendChild(key);
header.appendChild(value);
table.appendChild(header);
bdy.appendChild(table);

// Цикл по cookie
for(let i = 0; i < len; i++){
    if (sweet_cookies[i]) {
        let tr = document.createElement('tr'),
            btn = document.createElement('button'),
            cookie = sweet_cookies[i].split('='),
            btn_td = document.createElement('td');

        // Добавить в таблицу имя и значение текущего cookie
        for (let j = 0; j < 2; j++) {
            let td = document.createElement('td');
            td.appendChild(document.createTextNode(cookie[j]));
            tr.appendChild(td);
        }

        // Добавить к строке аттрибут, по которому ее можно удалить
        btn.setAttribute("cookieName", cookie[0]);

        // Добавить строку и кнопку в таблицу
        btn.appendChild(document.createTextNode('Удалить'));
        btn_td.appendChild(btn);
        tr.setAttribute('id', cookie[0]);
        tr.appendChild(btn_td);
        table.appendChild(tr);
    }
}

// При клике на кнопку "Удалить" спросить у пользователя,
// действительно ли пользователь хочет удалить cookie.
// Если да, то удалить cookie и соответствующую строку в таблице.
bdy.addEventListener('click', function (e) {
    let clickTarget = e.target;
    if(clickTarget.getAttribute("cookieName")){
        let cookieName = clickTarget.getAttribute("cookieName"),
            answer = confirm(`Удалить cookie с именем ${cookieName}?`);

        if(answer){
            let fordel = document.getElementById(cookieName);
            document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            fordel.parentNode.removeChild(fordel);
        }
    }
});
