setInterval(updateBanner,1000)

function updateBanner() {
    console.log("Updating banner")

    const banner = document.getElementById("banner")
    const options = {
        method: "GET",
        headers: {}
    }
    fetch("http://localhost:4131/api/sale",options)
    .then( (response) => {
        if (response.ok) {
            return response.json()
        } 
    }) .then( (data) => {
        if (data.active) {
            banner.innerHTML = data.message
        } else {
            banner.innerHTML = ""
        }
    })
}
