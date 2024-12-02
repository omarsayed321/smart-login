// variables 

var loginedUser = localStorage.getItem("loginedUser");
var homeCover = document.querySelector("#home-cover");
var button = document.querySelector("button");
var welcomeMsg = document.querySelector("#welcomeMsg");


if (loginedUser === null) {
	window.location.replace("index.html");
}


welcomeMsg.innerHTML += "Welcome, " + JSON.parse(loginedUser).name;

button.addEventListener("click", function () {
	localStorage.removeItem("loginedUser");

	window.location.replace("welcome.html");
});
