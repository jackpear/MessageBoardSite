window.addEventListener("load", ()=> {
    const buttons = document.querySelectorAll(".delButton")
    buttons.forEach((item)=> {
        item.addEventListener("click",()=> {
            removeContact(item)
        })
    })
    document.getElementById("postButton").addEventListener("click", () => {
        const value = document.getElementById("textInput").value
        let data = { "message": value}
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        fetch("http://localhost:4131/api/sale",options)
    })
    document.getElementById("deleteButton").addEventListener("click", () => {
        const options = {
            method: "DELETE",
            headers: {}
        }
        fetch("http://localhost:4131/api/sale",options)
    })

})

function removeContact(item) {
    let id = parseInt(item.parentNode.parentNode.id)
    console.log("Deleting "+toString(id))
    let data = {"id":id}
    const options = {
        method:"DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    fetch("http://localhost:4131/api/contact",options)
        .then( (response) => {
            if (response.ok) {
                // Delete Successsful
                item.parentNode.parentNode.remove()
            } else {
                console.log("DELETE contact request failed with code ", response.status)
            }
        })
}
setInterval(updateTime,1000)

function updateTime() {
    const dates = document.querySelectorAll(".timeUntil")
    dates.forEach((item)=> {

        let date = new Date()
        let targetDate = item.innerHTML.split("=")[0].split("-")
        let year = parseInt(targetDate[0])
        let month = parseInt(targetDate[1])-1
        let day = parseInt(targetDate[2])
        
        targetDate = new Date(year,month,day)
        console.log(targetDate-date)
        //console.log(targetDate+" - "+date)
        let newString = " = "
    
        let timeRemaining = targetDate - date
        //console.log(timeRemaining)
        if (timeRemaining < 0) {
                newString += "PAST"
        } else {
            //console.log(timeRemaining)
            let days = timeRemaining/(1000*60*60*24)
            let hours = (timeRemaining %(1000*60*60*24)) /(1000*60*60)
            let minutes = (timeRemaining%(1000*60*60))/(1000*60)
            let seconds = (timeRemaining%(1000*60))/(1000)
            newString += parseInt(days)+" days, "+parseInt(hours)+" hours, "+parseInt(minutes)+" minutes, "+parseInt(seconds)+" seconds"
        }
        item.innerHTML = parseInt(year)+"-"+parseInt(month+1)+"-"+parseInt(day)+newString

    })


}