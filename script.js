let h3 = document.querySelector(".bottomCont h3");
const select = document.querySelector(".topSelect");
const refreshBtn = document.querySelector(".material-icons");
let bottomCont = document.querySelector(".bottomCont");
let breedURL;

if (window.location.hash === "") {
    getRandomPics();

} else if (window.location.hash !== ""){
    breedURL = window.location.hash.substr(1);
    h3.textContent = breedURL;
    getBreeds(breedURL);
}

// HÄMTAR LISTAN MED HUNDAR FRÅN SERVERN
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
}

// HÄMTAR BILDER PÅ ALLA HUNDAR FRÅN SERVERN
function getRandomPics() {
    if (window.location.hash === ""){
        axios.get("https://dog.ceo/api/breeds/image/random/3")
        .then((response) => (response.data.message))
        .then((picsAllDogs) => renderAllDogsPics(picsAllDogs));
    } else {
        getBreeds(window.location.hash.substr(1));
    }
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
select.addEventListener("change", function (){
    getBreeds(this.value);
});

function getBreeds(value) {
    window.location.hash = value;
    let breedsPic = 'https://dog.ceo/api/breed/' + value + '/images/random/3';

    axios.get(breedsPic)
        .then((response) => (response.data.message))
        .then((picsAllDogs) => renderAllDogsPics(picsAllDogs))
/*         .then(getSubBreeds(value));
 */
    h3.textContent = value;
}

// HÄMTAR SUB-BREEDS
/* function getSubBreeds(breed){

    axios.get('https://dog.ceo/api/breed/' + breed + '/all')
    .then((response) => (response.data.message))
    .then((breed) => renderSubBreeds(breed));
} */


// RENDERAR DROPDOWN-NEDRE

/* let bottomSelect = document.createElement("select");
bottomCont.appendChild(bottomSelect);

//loop här
    let bottomOption = document.createElement("option");
    bottomOption.textContent = 
    bottomOption.setAttribute("href", //URL);
    bottomSelect.append(bottomOption); */

/* 

    let renderDropdown = allDogs => {
        for (let breeds in allDogs) {
            let option = document.createElement("option");
            option.textContent = breeds;
            option.setAttribute("href", 'https://dog.ceo/api/breed/#' + breeds + '/images/random/3');
            select.appendChild(option);
        }
    } */
