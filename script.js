function validateInput(e) {
	debugger;
}
function setup() {
	document.getElementById('getData').addEventListener('click',this.getStockData);
	document.getElementById('symbol').addEventListener('keyup',this.validateInput);
}
function getStockData() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET',"https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo",true);
	xhr.send();
	xhr.onerror = function(err) {
		alert("Sorry! Unable to fetch stock data");
	}
	xhr.onload = function(resp) {
		console.log(JSON.parse(resp.target.response)["Time Series (5min)"]);
		var stockObj = JSON.parse(resp.target.response)["Time Series (5min)"];		
		let highArray = [];
		let lowArray = [];
		for(var x in stockObj) {
            highArray.push(stockObj[x]["2. high"]);
            lowArray.push(stockObj[x]["3. low"]);
		}
		highArray.sort((a,b)=>a-b);
		lowArray.sort((a,b)=>b-a);
		document.getElementById('dayHigh').innerHTML = highArray[highArray.length-1];
		document.getElementById('dayLow').innerHTML = lowArray[lowArray.length-1];
	}	
}
this.setup();