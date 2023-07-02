
const themeToggleBtn = document.querySelector('#theme-toggle');
var element = document.querySelector('.profile_inner');
var img = document.createElement('img');
element.appendChild(img);
img.classList.add('hero-img')

if (document.body.className.includes("dark")) {
    img.src = '/img/dark.png';
} else {
    img.src = '/img/light.png';
}

function changeHeroImg() {
    if (document.body.className.includes("dark")) {
        img.src = '/img/dark.png';
        console.log("dark");
        console.log(document.getElementsByClassName("hero-img"));

    } else {
        img.src = '/img/light.png';

        console.log("light");
    }

}

themeToggleBtn.addEventListener('click', function () {
    changeHeroImg();
})




























