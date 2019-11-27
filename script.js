let h3 = document.querySelector(".bottomCont h3");
const select = document.querySelector(".topSelect");
const refreshBtn = document.querySelector(".material-icons");
let bottomCont = document.querySelector(".bottomCont");
let breedURL;
let subBreedURL;

// DETTA HÄNDER NÄR SIDAN LADDAS IN
if (window.location.hash === "") {
    getRandomPics();
} else if (window.location.hash.includes !== "-") {
    breedURL = window.location.hash.substr(1); 
    console.log(window.location.hash);  
    h3.textContent = breedURL;
    getBreeds(breedURL);
}
else if (window.location.hash.includes === "-") {
        subBreedURL = window.location.hash;
        console.log(subBreedURL);
        subBreedURL.split("-");
        h3.textContent = breedURL + "-" //under-ras;

    console.log("hej");
}

// HÄMTAR LISTAN MED ALLA HUNDAR FRÅN SERVERN
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
    for (let i =0; i< select.length; i++){
        let optionDog = select.options[i].text;
        if (optionDog === breedURL){
            select.options[i].selected = true;
        }
    }
}

// HÄMTAR BILDER PÅ ALLA HUNDAR FRÅN SERVERN
function getRandomPics() {
    if (window.location.hash === "") {
        axios.get("https://dog.ceo/api/breeds/image/random/3")
            .then((response) => (response.data.message))
            .then((picsAllDogs) => renderAllDogsPics(picsAllDogs));
    } else if (window.location.hash.includes !== "-") {
        getBreeds(window.location.hash.substr(1));
    } //else om sub-breed här
}

// RENDERAR BILDERNA
let renderAllDogsPics = picsAllDogs => {
    const picCont = document.querySelector(".picContainer");
    picCont.innerHTML = "";

    for (let pic of picsAllDogs) {
        let img = document.createElement("img");
        img.setAttribute("src", pic);
        picCont.appendChild(img);
    }
}

// REFRESHA BILDERNA
refreshBtn.addEventListener("click", getRandomPics);


// CHOOSE BREED
select.addEventListener("change", function () {
    getBreeds(this.value);
});

function getBreeds(value) {
    window.location.hash = value;
    let breedsPic = 'https://dog.ceo/api/breed/' + value + '/images/random/3';

    axios.get(breedsPic)
        .then((response) => (response.data.message))
        .then((picsAllDogs) => renderAllDogsPics(picsAllDogs))
        .then(getSubBreeds(value));

    h3.textContent = value;

}

let checkSubBreed;

// HÄMTAR SUB-BREEDS
function getSubBreeds(breed) {

    axios.get('https://dog.ceo/api/breed/' + breed + '/list')
        .then((response) => (response.data.message))
        .then((breed) => renderSubBreeds(breed));
}
let bottomSelect = document.createElement("select");

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
        /*             bottomOption.setAttribute("href", //URL);
         */
        bottomSelect.append(bottomOption);
    }
}


/*         https://dog.ceo/api/breed/hound/afghan/images/random/3
 */