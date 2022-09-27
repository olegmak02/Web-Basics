const download_button = document.getElementById("download_button");

function clickHandler(event) {
    fetch("https://randomuser.me/api/?results=5")
        .then((data) => data.json())
        .then((data) => {
            console.log(data);
            for (let i = 0; i < 5; i++) {
                let person = document.querySelector("#info").children[i];
                person.innerHTML = '';

                const photo = document.createElement("img");
                photo.src = data.results[i].picture.large;
                person.appendChild(photo);

                const phone = document.createElement("p");
                phone.innerText = "Телефон: " + data.results[i].phone;
                person.appendChild(phone);

                const coordinates = document.createElement("p");
                coordinates.innerText = "Координати:\nШирота: " + data.results[i].location.coordinates.latitude + 
                    "\nДовгота: " + data.results[i].location.coordinates.longitude;
                person.appendChild(coordinates);

                const postcode = document.createElement("p");
                postcode.innerText = "Поштовий код: " + data.results[i].location.postcode;
                person.appendChild(postcode);

                const country = document.createElement("p");
                country.innerText = "Країна: " + data.results[i].location.country;
                person.appendChild(country);
            }
            
        });
}

download_button.addEventListener("click", clickHandler);