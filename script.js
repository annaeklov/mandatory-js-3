if (window.location.hash === "") {
    getRandomPics();
}


// HÄMTAR LISTAN

axios.get("https://dog.ceo/api/breeds/list/all")
    .then((response) => (response.data.message))
    .then((allDogs) => renderDropdown(allDogs));


// RENDER DROPDOWN

const select = document.querySelector("select");

let renderDropdown = allDogs => {
    for (let breeds in allDogs) {
        let option = document.createElement("option");
        option.textContent = breeds;
        option.setAttribute("href", 'https://dog.ceo/api/breed/#' + breeds + '/images/random/3');
        select.appendChild(option);
    }
}

// HÄMTAR BILDER

function getRandomPics() {
    axios.get("https://dog.ceo/api/breeds/image/random/3")
        .then((response) => (response.data.message))
        .then((picsAllDogs) => renderAllDogsPics(picsAllDogs));
}

// RENDER PICS


let renderAllDogsPics = picsAllDogs => {
    const picCont = document.querySelector(".picContainer");
    picCont.innerHTML = "";

    for (let pic of picsAllDogs) {
        let img = document.createElement("img");
        img.setAttribute("src", pic);
        picCont.appendChild(img);
    }
}

// REFRESHAR BILDERNA

const refreshBtn = document.querySelector(".material-icons");
refreshBtn.addEventListener("click", getRandomPics);

let h3 = document.querySelector(".bottomCont h3");

// CHOOSE BREED
function getBreeds() {
    window.location.hash = this.value;
    let breedsPic = 'https://dog.ceo/api/breed/' + this.value + '/images/random/3';

    axios.get(breedsPic)
        .then((response) => (response.data.message))
        .then((picsAllDogs) => renderAllDogsPics(picsAllDogs));

    h3.textContent = this.value.toUpperCase();
    /* select.style.display = "none"; */

}

select.addEventListener("change", getBreeds);

// Ändra så refresh-knappen på breed-sidan renderar bilder på rätt breed
// Skapa en "tillbaka till startsidan-knapp" på varje breed-sida