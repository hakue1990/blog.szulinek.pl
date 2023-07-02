// Deklaracje zmiennych
var themeToggleBtn1 = document.querySelector("#theme-toggle");

var contactImg = document.querySelector(".contact-monkey");

// Nadanie atrybutów dla obrazka kontaktu



if (document.body.className.includes("dark")) {
  contactImg.src = "/img/contact-dark.png";
  contactImg.alt = "contact monkey";
  contactImg.className = "contact-monkey";
} else {
  contactImg.src = "/img/contact-light.png";
  contactImg.alt = "contact monkey";
  contactImg.className = "contact-monkey";
}

function changeContactImg() {
  if (document.body.className.includes("dark")) {
    contactImg.src = "/img/contact-dark.png";
    contactImg.alt = "contact monkey";
    contactImg.className = "contact-monkey";
  } else {
    contactImg.src = "/img/contact-light.png";
    contactImg.alt = "contact monkey";
    contactImg.className = "contact-monkey";
  }
}

themeToggleBtn1.addEventListener("click", function () {
    changeContactImg();
});
