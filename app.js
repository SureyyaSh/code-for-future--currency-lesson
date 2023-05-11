const fromCurrencySpan = document.getElementById('from-currency');
const fromAmountInput = document.getElementById('from-amount-input');
const toCurrencySpan = document.getElementById('to-currency');
const toAmountInput = document.getElementById('to-amount-input');

const currencyButtonsLeft = document.querySelectorAll('.currency-button-left');
const currencyButtonsRight = document.querySelectorAll('.currency-button-right');

toAmountInput.addEventListener('input', () => {
  const toCurrency = toCurrencySpan.textContent;
  const fromCurrency = fromCurrencySpan.textContent;
  const amount = toAmountInput.value;

  fetch(`https://api.exchangerate.host/latest?base=${toCurrency}&symbols=${fromCurrency}`)
    .then(response => response.json())
    .then(data => {
      const rate = data.rates[fromCurrency];
      const reverseRate = 1 / rate;

      fromAmountInput.value = (amount * rate).toFixed(2);
      document.getElementById('exchange-rate-reverse').textContent = `1 ${toCurrency} = ${reverseRate.toFixed(2)} ${fromCurrency}`;
    })
    .catch(error => {
      console.error(error);
      alert('Xeta bas verdi');
    });
});

function convertCurrency() {
  const fromCurrency = fromCurrencySpan.textContent;
  const toCurrency = toCurrencySpan.textContent;
  const amount = fromAmountInput.value;

  fetch(`https://api.exchangerate.host/latest?base=${fromCurrency}&symbols=${toCurrency}`)
    .then(response => response.json())
    .then(data => {
      const rate = data.rates[toCurrency];
      const reverseRate = 1 / rate;

      toAmountInput.value = (amount * rate).toFixed(2);
      document.getElementById('exchange-rate').textContent = `1 ${fromCurrency} = ${rate.toFixed(2)} ${toCurrency}`;
      document.getElementById('exchange-rate-reverse').textContent = `1 ${toCurrency} = ${reverseRate.toFixed(2)} ${fromCurrency}`;
    })
    .catch(error => {
      console.error(error);
      alert('Xeta bas verdi');
    });
}


for (const button of currencyButtonsLeft) {
  button.addEventListener('click', () => {
    const targetCurrencySpan = document.getElementById(button.dataset.target);
    targetCurrencySpan.textContent = button.dataset.currency;
    convertCurrency();

    button.style.backgroundColor = 'darkslateblue';

    localStorage.setItem(button.dataset.currency, 'darkslateblue');

    for (const otherButton of currencyButtonsLeft) {
      if (otherButton !== button) {
        otherButton.style.backgroundColor = 'darkgray';
      }
    }
  });
}


for (const button of currencyButtonsRight) {
  button.addEventListener('click', () => {
    const targetCurrencySpan = document.getElementById(button.dataset.target);
    targetCurrencySpan.textContent = button.dataset.currency;
    convertCurrency();
   
    button.style.backgroundColor = 'darkslateblue';
  
    localStorage.setItem(button.dataset.currency, 'darkslateblue');

    for (const otherButton of currencyButtonsRight) {
      if (otherButton !== button) {
        otherButton.style.backgroundColor = 'darkgray';
      }
    }
  });
}