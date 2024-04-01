// Deklaracje zmiennych
var themeToggleBtn1 = document.querySelector("#theme-toggle");
var contactImg = document.querySelector(".contact-monkey");
var nav = document.getElementById('menu');
var hamburger = document.querySelector('.hamburger');
var navigation = document.querySelector('.navigation__list');

// Funkcje odpowiadające za obrazki małp i ich kolor.
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

// Funkcja obsługująca przesuwanie menu
function toggleMenu() {
    hamburger.classList.toggle('hamburger--active');
    if (navigation) {
        navigation.classList.toggle('navigation--active');
    }
    if (nav) {
        nav.classList.toggle('menu--active');
    }
}

// Nasłuchiwanie kliknięcia na przycisk hamburgera
if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
}

// Obsługa przesuwania menu w momencie scrollowania
window.addEventListener('scroll', () => {
    if (window.scrollY > 0 && nav) {
        nav.classList.add('sticky');
    } else if (nav) {
        nav.classList.remove('sticky');
    }
});

// Nasłuchiwanie kliknięcia na elementy menu (aby schować menu po wybraniu opcji)
document.querySelectorAll('.navigation__item').forEach((item) => {
    item.addEventListener('click', () => {
        toggleMenu();
    });
});

// Nasłuchiwanie kliknięcia na przycisk zmiany motywu
if (themeToggleBtn1) {
    themeToggleBtn1.addEventListener("click", () => {
        changeContactImg();
    });
}


console.log("laduje js")