const baseURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let dropDowns = document.querySelectorAll("select");
let btn = document.querySelector("button")
let fromCurrency = document.querySelector(".from .select-container select");
let toCurrency = document.querySelector(".to .select-container select");
let msg = document.querySelector(".msg");

for (let select of dropDowns) {
    for (currencyCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerHTML = currencyCode;
        newOption.value = currencyCode;
        
        //setting default countries
        if (select.name === "from" && currencyCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currencyCode === "PKR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amountValue = document.querySelector("input").value;
    if (amountValue === "" || amountValue < 1) {
        amountValue = "1";
    }


    console.log(fromCurrency.value, toCurrency.value);
    const URL = `${baseURL}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurrency.value.toLowerCase()];
    let finalAmount = amountValue * rate;
    msg.innerText = `${amountValue} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`;
}


document.addEventListener("load", () => {
    updateExchangeRate();
})