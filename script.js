let h3 = document.querySelector(".bottomCont h3");
let select = document.querySelector(".topSelect");
let refreshBtn = document.querySelector(".material-icons");
let bottomCont = document.querySelector(".bottomCont");
let bottomSelect = document.createElement("select");
let picCont = document.querySelector(".picContainer");

let breedURL;
let subBreedURL;

if (window.location.hash === "") {
    getRandomPics();
} else if (!window.location.hash.includes("-")) {
    breedURL = window.location.hash.substr(1); // hundrasen
    h3.textContent = breedURL;
    getBreedsPics(breedURL);
} else if (window.location.hash.includes("-")) {
    breedURL = window.location.hash.slice(1).split("-")[0];
    subBreedURL = window.location.hash.slice(0).split("-")[1];
    getSubBreedsList(breedURL);
    getSubBreedsPics(subBreedURL);
}

// HÄMTAR LISTAN MED ALLA BREEDS FRÅN SERVERN
axios.get("https://dog.ceo/api/breeds/list/all")
    .then((response) => (response.data.message))
    .then((allDogs) => renderDropdown(allDogs));

// RENDERAR DROPDOWN
let renderDropdown = allDogs => {
    for (let breeds in allDogs) {
        let option = document.createElement("option");
        option.textContent = breeds;
        option.setAttribute("href", 'https://dog.ceo/api/breed/#' + breeds + '/images/random/3');
        select.appendChild(option);
    }
    for (let i = 0; i < select.length; i++) {
        let optionDog = select.options[i].text;
        if (optionDog === breedURL) {
            select.options[i].selected = true;
        }
    }
}

//  HÄMTAR BILDER PÅ ALLA HUNDAR FRÅN SERVERN
function getRandomPics() {
    if (window.location.hash === "") {
        axios.get("https://dog.ceo/api/breeds/image/random/3")
            .then((response) => (response.data.message))
            .then((picsAllDogs) => renderAllDogsPics(picsAllDogs));
    } else if (!window.location.hash.includes("-")) {
        getBreedsPics(window.location.hash.substr(1));
    } else if (window.location.hash.includes("-")) {
        getSubBreedsPics(window.location.hash.substr(1).split("-")[1]);
    }
}

//  RENDERAR UT BILDERNA
let renderAllDogsPics = picsAllDogs => {
    picCont.innerHTML = "";

    for (let pic of picsAllDogs) {
        let img = document.createElement("img");
        img.setAttribute("src", pic);
        picCont.appendChild(img);
    }
}

// EVENTLYSSNARE. REFRESHA BILDERNA PÅ KNAPPEN
refreshBtn.addEventListener("click", getRandomPics);


// EVENTLYSSNARE. VÄLJA HUNDRAS I DROPDOWN
select.addEventListener("change", function () {
    getBreedsPics(this.value);
});

// HÄMTAR RANDOM BILDER PÅ VALDA HUNDRASEN
function getBreedsPics(value) {
    breedURL = value;
    window.location.hash = value;
    let breedsPicURL = 'https://dog.ceo/api/breed/' + value + '/images/random/3';
    axios.get(breedsPicURL)
        .then((response) => (response.data.message))
        .then((picsAllDogs) => renderAllDogsPics(picsAllDogs))
        .then(getSubBreedsList(value));
    h3.textContent = value;
}

// HÄMTAR LISTAN PÅ SUB-BREED PÅ VALDA BREED
function getSubBreedsList(breed) {
    axios.get('https://dog.ceo/api/breed/' + breed + '/list')
        .then((response) => (response.data.message)) //hämtar det som står i message
        .then((breed) => renderSubBreeds(breed)); //kör därefter denna funktionen
}

// RENDERAR DROPDOWN-NEDRE
let renderSubBreeds = subBreeds => {
    bottomSelect.textContent = "";

    if (subBreeds.length === 0) {
        bottomSelect.style.display = "none";
        return;
    }
    bottomSelect.style.display = "block";
    bottomCont.appendChild(bottomSelect);

    let bottomOptionDis = document.createElement("option");
    bottomOptionDis.selected = true;
    bottomOptionDis.disabled = true;
    bottomOptionDis.textContent = "Choose sub-breed here:";
    bottomSelect.appendChild(bottomOptionDis);

    for (let subBreed of subBreeds) {
        let bottomOption = document.createElement("option");
        bottomOption.textContent = subBreed;
        bottomSelect.append(bottomOption);
    }

    for (let i = 0; i < bottomSelect.length; i++) {
        let optionSubDog = bottomSelect.options[i].text;
        if (optionSubDog === subBreedURL) {
            bottomSelect.options[i].selected = true;
        }
    }
}

// VÄLJA SUB-BREED I DROPDOWN-NEDRE
bottomSelect.addEventListener("change", function () {
    subBreedURL = this.value
    getSubBreedsPics(this.value);
});

// HÄMTAR RANDOM BILDER PÅ VALDA SUB-BREED
function getSubBreedsPics(value) {
    window.location.hash = "";
    window.location.hash = breedURL + "-" + value;

    let subBreedsPicURL = 'https://dog.ceo/api/breed/' + breedURL + '/' + value + '/images/random/3';

    axios.get(subBreedsPicURL)
        .then((response) => (response.data.message))
        .then((picsAllDogs) => renderAllDogsPics(picsAllDogs))

    h3.textContent = breedURL + "-" + value;
}
