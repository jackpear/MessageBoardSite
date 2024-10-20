window.addEventListener("load", ()=> {
    document.getElementById("tour").addEventListener("input",changePrice)
    document.getElementById("residency").addEventListener("input",changePrice)
})

function changePrice() {
    console.log("Changed")
    let output = document.getElementById("calc")
    let dropdown = document.getElementById("tour").value
    let checkbox = document.getElementById("residency").checked
    let total = 0.0
    if (dropdown == "bus") {
        total+=15.50
    } else if (dropdown == "walk") {
        total+=6.50
    } else {
        total+=10.00
    }
    if (checkbox) {
        total-=2.50
    }
    //The price is determined by what kind of tour they are taking bus=15.50$ walk=6.50$
    // bike=10$ and residents get a 2.50$ discount
    output.innerHTML= total+"$"
}
