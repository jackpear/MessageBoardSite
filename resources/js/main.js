function toggleTheme() {
    let link = document.querySelector("link")
    let href = link.getAttribute("href")
    if (href == "/resources/css/main.css") {
        link.setAttribute("href","/resources/css/main.dark.css")
        localStorage.setItem("theme","dark")
    } else {
        link.setAttribute("href","/resources/css/main.css")
        localStorage.setItem("theme","light")
    }
}


window.addEventListener("load", ()=> {
    document.getElementById("themeToggle").addEventListener("click", toggleTheme)
    const theme = localStorage.getItem("theme")
    if (!theme) {
        localStorage.setItem("theme","light")
    } else {
        if (theme == "dark") {
            toggleTheme()
        }
    }
})

