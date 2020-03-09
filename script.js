// Get all of the elements in the HTML and write them to variables
var resultBox = document.getElementById("result");
var lengthEl = document.getElementById("length");
var uppercaseEl = document.getElementById("uppercase");
var lowercaseEl = document.getElementById("lowercase");
var numbersEl = document.getElementById("numbers");
var symbolsEl = document.getElementById("symbols");
var generateEl = document.getElementById("generate");

// Use the charset (found at: https://www.w3schools.com/html/html_charset.asp) to pick random letters and numbers
function randomUppercase() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function randomLowercase() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function randomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function randomSymbol() {
	// Get symbols from this string
	var symbols = "!@#$%^&*(){}[]=<>/,."
	return symbols[Math.floor(Math.random() * symbols.length)];
}

// Place the functions into an object with the variables
var randomItems = {
	lower: randomLowercase,
	upper: randomUppercase,
	number: randomNumber,
	symbol: randomSymbol
}

// Check to see if options are selected and the length of the password
generate.addEventListener("click", function() {
	var length = +lengthEl.value;
	var hasLower = lowercaseEl.checked;
	var hasUpper = uppercaseEl.checked;
	var hasNumber = numbersEl.checked;
	var hasSymbol = symbolsEl.checked;
	
	resultBox.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

function generatePassword(lower, upper, number, symbol, length) {
	let generatedPassword = "";
	var typesCount = lower + upper + number + symbol;
	var typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
	
	// Doesn"t have a selected type
	if(typesCount === 0) {
		alert("You must select at least one type of character to generate a password");
		return "";
	} else if (length < 8 || length > 20) {
		alert("The length of your password must be between 8 and 20");
		return "";
	}
	
	// create a loop
	for(let i=0; i<length; i+=typesCount) {
		typesArr.forEach(type => {
			var funcName = Object.keys(type)[0];
			generatedPassword += randomItems[funcName]();
		});
	}
	
	var finalPassword = generatedPassword.slice(0, length);
	
	return finalPassword;
}

