let displayData = [];

fetch("https://restcountries.eu/rest/v2/all")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) { 
    displayData = data.slice();
    initialize(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  
let countriesInfo;
const input = document.getElementById("search");
let datafilter = [];

let startIndex = 0;
let lastIndex = 21;

input.addEventListener("keyup", (e) => {
  const savevalue = e.target.value;

  if (savevalue.length > 3) {
    const datatest = displayData.filter((d) => {
      return (
        d.region.toLowerCase() === savevalue.toLowerCase() ||
        d.capital.toLowerCase() === savevalue.toLowerCase() ||
        d.name.toLowerCase() === savevalue.toLowerCase()
      );
    });
    initialize(datatest);
  } else {
    initialize(displayData.slice());
  }
});

function initialize(countrydata) {
  countriesInfo = countrydata;
  let displayCountry = document.getElementById("main_container");
  displayCountry.innerHTML = null;
  const displayCountries = [];
  let currentCountries = [];

  for (let i = 0; i < countriesInfo.length; i++) {
    let countries = "";
    countries += `<div class="box mb-4 d-flex flex-column justify-content-around">`;
    countries += `<img class="flag rounded img-thumbnail" alt="loading" src="${countriesInfo[i].flag}"> `;
    countries += `<h3 class="mx-auto mt-2">About ${countriesInfo[i].name}</h3>`;
    countries += `<div class="infocountry">Country: ${countriesInfo[i].name}</div>`;
    countries += `<div class="infocountry">Capital: ${countriesInfo[i].capital}</div>`;
    countries += `<div class="infocountry">Region: ${countriesInfo[i].region}</div>`;
    countries += `<div class="infocountry">population: ${countriesInfo[
      i
    ].population.toLocaleString()}</div>`;
    countries += `<div class="infocountry">Currency: ${countriesInfo[
      i
    ].currencies
      .filter((c) => c.name)
      .map((c) => `${c.name} (${c.code})`)
      .join(" , ")}</div>`;
    countries += `<div class="infocountry">CallingCodes: +${countriesInfo[i].callingCodes}</div>`;
    countries += `<div class="infocountry">Language: ${countriesInfo[
      i
    ].languages.map((lan) => `${lan.name} (${lan.nativeName})`)}</div>`;

    countries += `</div>`;

    displayCountries.push(countries);
  }

  currentCountries = displayCountries.slice(startIndex, lastIndex);
  displayCountry.innerHTML += currentCountries.join(" ");

  const loadMoreButton = button();
  displayCountry.appendChild(loadMoreButton);
  observeScroll(loadMoreButton);
  loadMoreButton.addEventListener("click", function (event) {
    startIndex = lastIndex;
    lastIndex = lastIndex * 2;
    event.target.remove();
    currentCountries = displayCountries.slice(startIndex, lastIndex);
    displayCountry.innerHTML += currentCountries.join(" ");

    if (lastIndex <= displayCountries.length) {
      displayCountry.appendChild(loadMoreButton);
      observeScroll(loadMoreButton);
    }
  });
}

function button() {
  const createButton = document.createElement("button");
  createButton.className = "btn btn-block btn-primary mb-5";
  createButton.textContent = "load more";

  return createButton;
}

function observeScroll(element) {
  const options = {
    root: null,
    rootMargin: "10px",
    threshold: 1.0,
  };

  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.click();
        // console.log("it's working");
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);

  observer.observe(element);
}
