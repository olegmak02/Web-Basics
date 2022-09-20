const download_button = document.getElementById("download_button");

function clickHandler(event) {
    const human_info = fetch("https://randomuser.me/api")
        .then((data) => data.json())
        .then((data) => {
            console.log(data);
            const photo = document.createElement("img");
            photo.src = data.results[0].picture.large;
            photo.style.width = "50%";
            photo.style.marginLeft = "25%";
            console.log(data.results);
            document.getElementById("info").appendChild(photo);
            "picture, phone, coordinates, postcode, country"
        });
}

download_button.addEventListener("click", clickHandler);