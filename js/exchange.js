const currencyEl_one =  document.getElementById('currency-one');
const amountEle_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEle_two = document.getElementById('amount-two');

const rateEl= document.getElementById('rate');
const swap =  document.getElementById('swap');

const test_button =  document.getElementById('test');


function perform_fetch(currency_one,currency_two){
	console.log('Running fetch');
	console.log( currency_two);
	console.log(currency_one);
	
	fetch(`http://data.fixer.io/api/latest?access_key=30ce2048ab5b3b135a6fbdd05796af00&symbols=${currency_one},${currency_two}`, {
		    method: "GET"
		  }).then(res => res.json())
		  .then(data =>{
			console.log(data); 
			const rate= data.rates[currency_two];
			console.log(rate);
	});


}

function calculate() {
	const currency_one =  currencyEl_one.value;
	const currency_two = currencyEl_two.value;
	
	perform_fetch(currency_one,currency_two);
}

/*
GET https://data.fixer.io/api/latest

{
  "base": USD,
  "date": "2018-02-13",
  "rates": {
     "CAD": 1.260046,
     "CHF": 0.933058,
     "EUR": 0.806942,
     "GBP": 0.719154,
     [170 world currencies]
  }
}  
*/

test_button.addEventListener('click',calculate);
currencyEl_one.addEventListener('change',calculate);
currencyEl_two.addEventListener('change',calculate);
amountEle_two.addEventListener('input',calculate);
amountEle_one.addEventListener('input',calculate);