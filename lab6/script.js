const download_button = document.getElementById("download_button");

function clickHandler(event) {
    const human_info = fetch("https://randomuser.me/api")
        .then((data) => data.json())
        .then((data) => {
            console.log(data);
            const info = document.getElementById("info");
            info.innerHTML = '';

            const photo = document.createElement("img");
            photo.src = data.results[0].picture.large;
            photo.style.marginLeft = "30%";
            console.log(data.results);
            info.appendChild(photo);

            const phone = document.createElement("p");
            phone.innerText = data.results[0].phone;
            info.appendChild(phone);

            const coordinates = document.createElement("p");
            coordinates.innerText = "широта: " + data.results[0].location.coordinates.latitude + 
                "довгота: " + data.results[0].location.coordinates.longitude;

            info.appendChild(coordinates);

            const postcode = document.createElement("p");
            postcode.innerText = data.results[0].location.postcode;
            info.appendChild(postcode);

            const country = document.createElement("p");
            country.innerText = data.results[0].location.country;
            info.appendChild(country);
        });
}

download_button.addEventListener("click", clickHandler);