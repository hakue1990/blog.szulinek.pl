// Deklaracje zmiennych
var themeToggleBtn = document.querySelector("#theme-toggle");
const element = document.querySelector(".profile_inner");
const heroImg = document.createElement("img");
element.appendChild(heroImg);



// Nadanie atrybutów dla obrazka kontaktu


heroImg.classList.add("hero-img");

if (document.body.className.includes("dark")) {
  heroImg.src = "/img/dark.png";

} else {
  heroImg.src = "/img/light.png";
}

function changeHeroImg() {
  if (document.body.className.includes("dark")) {
    heroImg.src = "/img/dark.png";
  } else {
    heroImg.src = "/img/light.png";
  }
}

themeToggleBtn.addEventListener("click", function () {
  changeHeroImg();
});
