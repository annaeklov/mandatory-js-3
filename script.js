/*----------------HÄMTAR FRÅN HTML-------------------*/

let h3 = document.querySelector(".bottomCont h3");
let select = document.querySelector(".topSelect");
let refreshBtn = document.querySelector(".material-icons");
let bottomCont = document.querySelector(".bottomCont");
let bottomSelect = document.createElement("select");
let picCont = document.querySelector(".picContainer");

let breedURL;
let subBreedURL;
window.onhashchange = function() { 
    console.log("Här ändrar jag i adressfältet");
}

/*-----------------NÄR SIDAN LADDAS IN---------------*/
/*------------- 1. IF - startsida -------------------*/
/*------------- 2. ELSE IF - hundras vald -----------*/
/*------------- 3. ELSE - under-hundras vald --------*/ 

if (window.location.hash === "") {
    console.log("random")
    getRandomPics();
} else if (!window.location.hash.includes("-")) {
    console.log(window.location.hash.includes("-"))
    console.log("en hund woff")
    breedURL = window.location.hash.substr(1); // hundrasen
    h3.textContent = breedURL;
    getBreedsPics(breedURL);
}
else if (window.location.hash.includes("-")) {
    console.log("hej");
    breedURL =  window.location.hash.slice(1).split("-")[0];
    console.log(breedURL);
    subBreedURL = window.location.hash.slice(0).split("-")[1];
    console.log(subBreedURL);
    getSubBreedsList(breedURL);
    getSubBreedsPics(subBreedURL);
}


/*--------------------STARTSIDA--------------------------*/
/*------------- 1. GET alla hundraser -------------------*/
/*------------- 2. Renderar ut dropdown -----------------*/
/*------------- 3. GET alla bilder ----------------------*/
/*------------- 4. Renderar ut alla bilder --------------*/
/*------------- 5. Eventlyssnare: refreshar bilderna ----*/
/*------------- 6. Eventlyssnare: när en hundras väljs --*/


// 1. HÄMTAR LISTAN MED ALLA BREEDS FRÅN SERVERN
axios.get("https://dog.ceo/api/breeds/list/all")
    .then((response) => (response.data.message))
    .then((allDogs) => renderDropdown(allDogs));


// 2. RENDERAR DROPDOWN
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

// 3. HÄMTAR BILDER PÅ ALLA HUNDAR FRÅN SERVERN
function getRandomPics() {
    if (window.location.hash === "") {
        axios.get("https://dog.ceo/api/breeds/image/random/3")
            .then((response) => (response.data.message))
            .then((picsAllDogs) => renderAllDogsPics(picsAllDogs));
    } else if (!window.location.hash.includes("-")) {
        getBreedsPics(window.location.hash.substr(1));
    }  else if (window.location.hash.includes("-")){
        getSubBreedsPics(window.location.hash.substr(1).split("-")[1]);

        console.log("fatatatatat ej")
    } 
}

// 4. RENDERAR UT BILDERNA
let renderAllDogsPics = picsAllDogs => {
    picCont.innerHTML = "";

    for (let pic of picsAllDogs) {
        let img = document.createElement("img");
        img.setAttribute("src", pic);
        picCont.appendChild(img);
    }
}

// 5. EVENTLYSSNARE. REFRESHA BILDERNA PÅ KNAPPEN
refreshBtn.addEventListener("click", getRandomPics);


// 6. EVENTLYSSNARE. VÄLJA HUNDRAS I DROPDOWN
select.addEventListener("change", function () {
    getBreedsPics(this.value);
});

/*--------------NÄR EN HUNDRAS HAR VALTS-----------------------------*/
/*------------- 1. GET valda hundrasens bilder ----------------------*/
/*------------- 2. Renderar ut valda hundrasens bilder --------------*/
/*------------- 3. GET valda hundrasens underras-lista --------------*/
/*------------- 4. Renderar valda hundrasens underras-dropdown ------*/
/*------------- 5. Eventlyssnare: refreshar hundras-bilderna --------*/
/*------------- 6. Eventlyssnare: när en hundras underras väljs ----EJ KLAR--*/


// 1. HÄMTAR RANDOM BILDER PÅ VALDA HUNDRASEN
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

// 2. Funktion: renderAllDogsPics (se ovan)


// 3. HÄMTAR LISTAN PÅ SUB-BREED PÅ VALDA BREED
function getSubBreedsList(breed) {
    axios.get('https://dog.ceo/api/breed/' + breed + '/list')
        .then((response) => (response.data.message)) //hämtar det som står i message
        .then((breed) => renderSubBreeds(breed)); //kör därefter denna funktionen
}

// 4. RENDERAR DROPDOWN-NEDRE
let renderSubBreeds = subBreeds => {
    bottomSelect.textContent = "";
    console.log(subBreeds); // Array med sub-breeds

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
        console.log(subBreed); // Sub-breed en och en
        let bottomOption = document.createElement("option");
        bottomOption.textContent = subBreed;

        /*         bottomOption.setAttribute("href", 'https://dog.ceo/api/breed/' + breedURL + '/' + subBreedURL + '/images/random/3');
         */
        bottomSelect.append(bottomOption);
    }

    for (let i = 0; i < bottomSelect.length; i++) {
        let optionSubDog = bottomSelect.options[i].text;
        if (optionSubDog === subBreedURL) {
            bottomSelect.options[i].selected = true;
        }
    }
}

// 5. Eventlyssnare: refresha tbilder (se ovan)

// 6. VÄLJA SUB-BREED I DROPDOWN-NEDRE
bottomSelect.addEventListener("change", function () {
    console.log("hej sub-breed");
    subBreedURL = this.value
    getSubBreedsPics(this.value);
});


/*--------------NÄR EN UNDER-HUNDRAS HAR VALTS--------------------*/
/*------------- 1. GET valda under-hundrasens bilder ------------EJ KLAR--*/
/*------------- 2. Renderar ut valda under-hundrasens bilder ----EJ KLAR--*/
/*------------- 3. Eventlyssnare: refreshar under-hundras-bilderna ------------EJ KLAR--*/



// 1. HÄMTAR RANDOM BILDER PÅ VALDA SUB-BREED
function getSubBreedsPics(value){
   
/*     let breedHash = window.location.hash;
        breedHash = breedHash.substr(1);
        console.log(breedHash); // senaste valda hundrasen */
        window.location.hash = "";
        window.location.hash =  breedURL + "-" + value;
    
    let subBreedsPicURL = 'https://dog.ceo/api/breed/' + breedURL + '/' + value + '/images/random/3';

    axios.get(subBreedsPicURL)
    .then((response) => (response.data.message))
    .then((picsAllDogs) => renderAllDogsPics(picsAllDogs))

    h3.textContent = breedURL +  "-" + value ;

}

// 2. Funktion: renderAllDogsPics (se ovan)

// 3. Eventlyssnare: refresha bilder (se ovan)
