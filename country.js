function fetchdata() {
  let countryName = country_name.value
  fetch(`https://restcountries.com/v2/name/${countryName}?fullText=true`)
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      else {
        throw new Error("failed")
      }
    })
    .then(data => populateValues(data))
}

function populateValues(country) {
  let countryName = country[0].name
  let countryCurrencyName = country[0].currencies[0].name
  let countryCurrencySymbol = country[0].currencies[0].symbol
  let countryFlag = country[0].flag
  let countryPopulation = country[0].population
  let html_data = `
  <div class="card" style="width: 18rem;">
  <img src="${countryFlag}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title"> CountryName: ${countryName} </h5>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item"> Population: ${countryPopulation}  </li>
    <li class="list-group-item"> Currency: ${countryCurrencyName} </li>
    <li class="list-group-item"> Symbol: ${countryCurrencySymbol}  </li>
  </ul>
</div>
  `
  document.querySelector("#result").innerHTML = html_data
}




var select = document.querySelector("#select")

fetch(`https://restcountries.com/v2/all`).
  then(res => res.json()).
  then(data => fetchname(data)).catch(err => console.log(err))

function fetchname(countries) {
  for (let data of countries) {
    let option = document.createElement("option")
    option.text = data.name
    option.value = data.name
    select.append(option)
  }
}


function selectCountry() {
  let countryname = document.querySelector("#select").value
  fetch(`https://restcountries.com/v2/name/${countryname}?fullText=true`).
    then(res => res.json).
    then(data => populateValues(data))
}


