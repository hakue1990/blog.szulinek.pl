var themeToggleBtn = document.getElementById('theme-toggle');



document.getElementsByClassName("hero-img").src = "/img/monkey.png"


function changeLogo() {
    if (document.body.className.includes("dark")) {
        document.getElementsByClassName("hero-img").src = "/img/monkey-dark.png"
    } else {
        document.getElementsByClassName("hero-img").src = "/img/monkey.png"
    }
    console.log(document.body)
}

themeToggleBtn.addEventListener('click', function() {
    changeLogo();
    console.log("kliknoles");
})

























