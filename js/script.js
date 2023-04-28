const colors = {
  fire: "#ff7402",
  grass: "#33a165",
  steel: "#00858a",
  water: "#0050ac",
  psychic: "#c90086",
  ground: "#c90086",
  ice: "#70deff",
  flying: "#5d4e75",
  ghost: "#4d5b64",
  normal: "#753845",
  poison: "#7e0058",
  rock: "#6e1a00",
  fighting: "#634136",
  dark: "#272625",
  bug: "#6e1a00",
  dragon: "#00c431",
  electric: "#bba909",
  fairy: "#d31c81",
  unknow: "#757575",
  shadow: "#29292c",
};

//APPEL HTML
let pokeType = document.querySelector("#pokeType");
let pokeName = document.querySelector("#pokeName");
let pokeHeight = document.querySelector("#pokeHeight");
let pokeWeight = document.querySelector("#pokeWeight");
let pokeTypeImg = document.querySelector("#pokeTypeImg");
let pokeImg = document.querySelector("#pokeImg");
let bgId = document.querySelector("#bgId");

//cta
let left_arrow = document.querySelector("#goprev");
let random_arrow = document.querySelector("#random_arrow");
let right_arrow = document.querySelector("#gonext");

//CREATION DE VARIABLES
let idPoke = 1;

//  Votre code
//On va chercher la data de l'api en fonction de l'id du pokemon
async function handle_click() {
  let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + idPoke);

  //data étant le tableaux de resultat correspondant à notre recherche
  let data = await response.json().then((data) => {
    //Type pokemon
    pokeType.textContent = data.types[0].type.name;
    //Type Img pokemon
    pokeTypeImg.src = `assets/type/${data.types[0].type.name}.svg`;
    //Nom pokemon
    pokeName.textContent = data.name;
    //Height pokemon
    pokeHeight.textContent = getCorrectValue(data.height) + "M";
    //Weight pokemon
    pokeWeight.textContent = getCorrectValue(data.weight) + "KG";
    //Img pokemon
    pokeImg.src = `assets/pokemon/${idPoke}.png`;
    //bgId pokemon
    bgId.textContent = formateNumber(idPoke);
    //Abilities
    const allAbilities = data.abilities.map((e) => (e = e.ability.name));
    pokeAbilities.textContent = allAbilities.join(", ");
    //Change color Background
    document.body.style.background = `linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.63) 0%,
      rgba(0, 0, 0, 0.63) 100%
    ),
    ${colors[data.types[0].type.name]}`;
    //stats
    const statsValueFromAPI = data.stats.slice(0, 3);
    pokeStats.innerHTML = "";

    statsValueFromAPI.forEach((el) => {
      console.log(el);
      pokeStats.innerHTML += `<div class="pb-4 row align-items-center">
      <span class="text-capitalize col-4 col-lg-3 m-0">${el.stat.name}</span>
      <div class="progress p-0 col-7 col-lg-8 bg-transparent" role="progressbar" aria-label="Basic example" aria-valuenow="${
        el.base_stat
      }" aria-valuemin="0" aria-valuemax="150">
          <div class="progress-bar animate__animated animate__slideInLeft bg-white" style="width: ${
            el.base_stat / 2
          }%;"></div>
      </div>
      <h5 class="col-1 text-end m-0">${el.base_stat}</h5>
  </div>`;
    });

    console.log("Le tableau est ", data);
    console.log(colors[data.types[0].type.name]);
  });
}

//Au click Prédédent pokemon
left_arrow.addEventListener("click", function () {
  if (idPoke > 1) {
    idPoke--;
    handle_click();
    console.log(idPoke);
  }
});

//Au click Random pokemon
random_arrow.addEventListener("click", function () {
  idPoke = Math.floor(Math.random() * (898 - 1)) + 1;
  handle_click();
  console.log(idPoke);
});

//Au click Suivant pokemon
right_arrow.addEventListener("click", function () {
  idPoke++;

  handle_click();
});

// 1 -> #001
function formateNumber(number) {
  let str = "" + number;
  let pad = "000";
  let ans = "#" + pad.substring(0, pad.length - str.length) + str;
  return ans;
}

// Transforme la Height et la Weight sous bon format
function getCorrectValue(value) {
  if (value < 10) {
    return "0." + value;
  } else {
    let splitted = value.toString().split("");
    splitted.splice(splitted.length - 1, 0, ".");
    return splitted.join("");
  }
}
