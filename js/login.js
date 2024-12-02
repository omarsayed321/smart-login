// variables

const emailRegex = /^\w+@\w+\.\w+$/i;

var button = document.querySelector("button");
var failedMsg = document.querySelector("#failedMsg");
var inputs = document.querySelectorAll(".input-group input");
var allInputs = document.querySelectorAll(".input-group");

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

inputs[0].addEventListener("blur", function () {
	email = inputs[0].value.toLowerCase();

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

var userName = "";

button.addEventListener("click", function () {
	if (emptyInputs(inputs)) {
		failedMsg.innerHTML = "all inputs are required";
		failedMsg.classList.replace("d-none", "d-block");
	} else if (!emailValid) {
		failedMsg.innerHTML = "invalid email";
		failedMsg.classList.replace("d-none", "d-block");
	} else {
		var user = {
			email: inputs[0].value.toLowerCase(),
			password: inputs[1].value,
		};

		if (checkUser(user) === true) {
			localStorage.setItem(
				"loginedUser",
				JSON.stringify({
					name: userName,
					email: user.email,
				})
			);
			window.location.replace("welcome.html");
		} else {
			failedMsg.innerHTML = checkUser(user);
			failedMsg.classList.replace("d-none", "d-block");
		}
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

function checkUser(user) {
	var users = JSON.parse(localStorage.getItem("users"));
	for (let i = 0; i < users.length; i++) {
		if (user.email == users[i].email) {
			if (user.password == users[i].password) {
				userName = users[i].name;
				return true;
			}
			return "incorrect email or password";
		}
	}
	return "user doesn't exist";
}


