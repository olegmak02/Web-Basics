function onClickHandler() {
    let name = document.getElementById("name").value;
    let group = document.getElementById("group").value;
    let phone = document.getElementById("phone").value;
    let faculty = document.getElementById("faculty").value;
    let address = document.getElementById("address").value;

    let name_check = /[А-яІіЇїЄє]{1,} [А-яІіЇїЄє]\.[А-яІіЇїЄє]\./.test(name);
    let group_check = /[А-яІіЇїЄє]{2}-\d{2}/.test(group);
    let phone_check = /\(\d{3}\)-\d{3}-\d{2}-\d{2}/.test(phone);
    let faculty_check = /[А-яІіЇїЄє]{2,4}/.test(faculty);
    let address_check = /м. [А-яІіЇїЄє]{2,}/.test(address);

    let message = "Некоректне заповнення форми\n";

    if (!name_check) {
        document.getElementById("name").style.borderColor = "red";
        message += "Форма для заповення ПІБ: ТТТТТТ Т.Т.\n";
    } else {
        document.getElementById("name").style.borderColor = "green";
    }

    if (!group_check) {
        document.getElementById("group").style.borderColor = "red";
        message += "Форма для заповення групи: ТТ-ЧЧ\n";
    } else {
        document.getElementById("group").style.borderColor = "green";
    }
    
    if (!phone_check) {
        document.getElementById("phone").style.borderColor = "red";
        message += "Форма для заповення телефону: (ЧЧЧ)-ЧЧЧ-ЧЧ-ЧЧ\n";
    } else {
        document.getElementById("phone").style.borderColor = "green";
    }
    
    if (!faculty_check) {
        document.getElementById("faculty").style.borderColor = "red";
        message += "Форма для заповення факультета: ТТТТ\n";
    } else {
        document.getElementById("faculty").style.borderColor = "green";
    }

    if (!address_check) {
        document.getElementById("address").style.borderColor = "red";
        message += "Форма для заповення адреси: м. ТТТТТТ\n";
    } else {
        document.getElementById("address").style.borderColor = "green";
    }

    if (name_check && group_check && phone_check && faculty_check && address_check) {
        const output = document.getElementById("output-info");
        const info = document.createElement("h2");
        info.style.textAlign = "center";
        info.style.marginTop = "10%";
        info.innerText = "Введена інформація користувача\n" + name + '\n' + group + '\n' + phone + '\n' + faculty + '\n' + address;
        output.textContent = '';
        output.appendChild(info);
    } else {
        message += "де Т-символ, Ч-число";
        alert(message);
    }
}

document.querySelector("form button").addEventListener("click", onClickHandler);

const table = document.createElement("table");
let row;

for (let i = 1; i < 37; i++) {
    if (i % 6 == 1)
        row = document.createElement("tr");
    
    let cell = document.createElement("td");
    cell.innerText = i;
    cell.id = "cell-" + i;
    row.appendChild(cell);
    
    if (i % 6 == 0)
        table.appendChild(row);
}

document.querySelector("body").appendChild(table);

const spec_cell = document.getElementById("cell-1");
const color_picker = document.getElementById("color-picker");

document.getElementById("color-picker").addEventListener("change", () => {
    spec_cell.style.backgroundColor = color_picker.value;
});

function mouseoverCellHandler(event) {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    event.target.style.backgroundColor = '#' + randomColor;
}

var waitingForClick = false;

function clickCellHandler(event) {
    switch (event.detail) {
        case 1:
            waitingForClick = setTimeout(function() {
                let ev = new MouseEvent("click", null);
                color_picker.dispatchEvent(ev);
            }, 200);
            break;
        default:
            if (waitingForClick) {
                clearTimeout(waitingForClick);
                waitingForClick = false;
            }
            let color = "#" + Math.floor(Math.random()*16777215).toString(16);
            for (let i = 1; i < 37; i += 7) {
                document.getElementById("cell-"+i).style.backgroundColor = color;
            }
            break;
        }

    
}

spec_cell.addEventListener("mouseover", mouseoverCellHandler);
spec_cell.addEventListener("click", clickCellHandler);