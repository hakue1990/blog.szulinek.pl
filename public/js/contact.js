// Deklaracje zmiennych
var themeToggleBtn1 = document.querySelector("#theme-toggle");

var contactImg = document.querySelector(".contact-monkey");

const hamburger = document.querySelector('.hamburger');
const navigation = document.querySelector('.navigation__list');
let listItems = document.querySelectorAll('a.navigation__item');
const nav = document.querySelector('nav');
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



hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('hamburger--active');
  navigation.classList.toggle('navigation--active');
});

document.querySelectorAll('.navigation__item').forEach((item) => {
  item.addEventListener('click', () => {
    hamburger.classList.toggle('hamburger--active');
    navigation.classList.toggle('navigation--active');
  });
});

window.window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});