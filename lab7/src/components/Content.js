import React from 'react';

const text_colors = ["chartreuse", "aquamarine"];
const background_colors = ["green", "chocolate"];

function changeColor(event) {
    const elem = event.target;
    let index = elem.style.backgroundColor == background_colors[0] ? 0 : 1;
    elem.style.backgroundColor = background_colors[1 - index];
    elem.style.color = text_colors[1 - index];
}

class Content extends React.Component {
    render() {
        return (
            <div>
                <p>Місце народження: 17 травня 2002 року, м. Запоріжжя</p>
                <p>Освіта: ЗНВК №63, м. Запоріжжя;
                    НТУУ "КПІ ім. Ігоря Сікорського", м. Київ</p>
                <p id="colored_element1" onClick={changeColor}>Хоббі:</p>
                <ul>
                    <li id="colored_element2" onClick={changeColor}>Біг</li>
                    <li>Єдиноборства</li>
                    <li>Комп'ютерні ігри</li>
                    <li>Футбол</li>
                </ul>
                <p>Улюблені фільми/книги:</p>
                <ol>
                    <li>"Біле ікло" Дж. Лондон</li>
                    <li>"Сім", 1995</li>
                    <li>"Місце під соснами", 2012</li>
                    <li>"Острів проклятих", 2010</li>
                </ol>
                <p>Львів — місто в Україні, адміністративний центр області, 
                    агломерації, району, міської громади, національно-культурний 
                    та освітньо-науковий осередок країни, великий промисловий центр і 
                    транспортний вузол, вважається столицею Галичини та центром 
                    Західної України. За кількістю населення — сьоме місто країни</p>
                <p>Львів заснував король Данило приблизно у 1231—1235 роках (перша 
                    згадка від 1256 року). Після смерті князя Юрія II Львів на понад 
                    чотири століття опинився під владою Королівства Польського. За 
                    австрійського панування місто стало осередком українського та 
                    польського національного рухів. Після розпаду Австро-Угорщини 
                    був столицею Західноукраїнської Народної Республіки, в листопаді 
                    1918 перейшов до Польщі. Під час Другої світової війни місто 
                    захопив Радянський Союз, а згодом — Німеччина. Після війни Львів 
                    залишився у складі Української РСР. З 1991 року Львів перебуває 
                    у складі України.</p>
            </div>
        );
    }
}

export default Content;