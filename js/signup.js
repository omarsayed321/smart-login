// Variables
const emailRegex = /^\w+@\w+\.\w+$/i;

var button = document.querySelector("button");
var failedMsg = document.querySelector("#failedMsg");
var successMsg = document.querySelector("#successMsg");
var inputs = document.querySelectorAll(".input-group input");
var allInputs = document.querySelectorAll(".input-group");


if (localStorage.getItem("users") === null) {
	localStorage.setItem("users", JSON.stringify([]));
}
g
for (let i = 0; i < inputs.length; i++) {
	inputs[i].addEventListener("focus", function () {
		allInputs[i].classList.add("focused");
	});
	inputs[i].addEventListener("blur", function () {
		allInputs[i].classList.remove("focused");
	});
}

var emailValid = false;
var email = "";

inputs[1].addEventListener("blur", function () {
	email = inputs[1].value.toLowerCase();

	if (!checkMail(email)) {
		failedMsg.innerHTML = "invalid email";
		failedMsg.classList.replace("d-none", "d-block");
		emailValid = false;
	} else {
		if (failedMsg.classList.contains("d-block")) {
			failedMsg.classList.replace("d-block", "d-none");
		}
		emailValid = true;
	}
});

function clearForm() {
	nameInput.value = "";
	emailInput.value = "";
	passInput.value = "";
}

button.addEventListener("click", function () {
	if (emptyInputs(inputs)) {
		failedMsg.innerHTML = "all inputs is required";
		failedMsg.classList.replace("d-none", "d-block");
	} else if (checkUser(email)) {
		failedMsg.innerHTML = "user already exists";
		failedMsg.classList.replace("d-none", "d-block");
	} else if (!emailValid) {
		failedMsg.innerHTML = "email can't be in this format";
		failedMsg.classList.replace("d-none", "d-block");
	} else {
		var user = {
			name: inputs[0].value.toLowerCase(),
			email: inputs[1].value.toLowerCase(),
			password: inputs[2].value,
		};

		var localData = localStorage.getItem("users");
		var localJSON = JSON.parse(localData);
		localJSON.push(user);
		localStorage.setItem("users", JSON.stringify(localJSON));

		successMsg.classList.replace("d-none", "d-block");
		
		clearForm();
	}
});



function emptyInputs(array) {
	for (let i = 0; i < array.length; i++) {
		if (array[i].value == "") {
			return true;
		}
	}
	return false;
}

function checkMail(string) {
	return emailRegex.test(string);
}

function checkUser(userEmail) {
	var users = JSON.parse(localStorage.getItem("users"));
	for (let i = 0; i < users.length; i++) {
		if (userEmail == users[i].email) {
			return true;
		}
	}
	return false;
}
