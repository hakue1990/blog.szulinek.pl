

function changeLogo() {
    if (document.body.className.includes("dark")) {
        document.getElementsByClassName("hero-img").src = "/img/monkey-dark.png"
    } else {
        document.getElementsByClassName("hero-img").src = "/img/monkey.png"

    }
    console.log(document.body)
}

changeLogo();








