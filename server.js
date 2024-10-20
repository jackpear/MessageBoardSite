const express = require('express')
const basicAuth = require('express-basic-auth')
const {addContact, getContacts, deleteContact, addSale, endSale, getRecentSales} = require('./data')
const app = express()
const port = 4131

app.set("views", "templates"); // look in "templates" folder for pug templates
app.set("view engine", "pug");
app.use("/resources/css",express.static("resources/css"))
app.use("/resources/js",express.static("resources/js"))
app.use("/resources/images",express.static("resources/images"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/admin/salelog", (req,res) => {
    res.set("Content-Type","application/json")
    getRecentSales().then(retval => {
        res.send(retval);
    })
})


app.get("/", (req, res)=>{
    res.render("mainpage.pug");
})
app.get("/main", (req, res)=>{
    res.render("mainpage.pug");
})
app.get("/contact", (req, res)=>{
    res.render("contactform.pug");
})
app.get("/testimonies", (req, res)=>{
    res.render("testimonies.pug");
})
app.get("/admin/contactlog",basicAuth({users: {'admin':'password'}, challenge:true}), (req, res)=>{
    getContacts().then(contacts => {
        res.render("contactlog.pug", { contacts })
    })
})

app.post("/contact", (req,res) => {
    //Checks that the request has all the required information
    if (req.body.name && req.body.email && req.body.date && req.body.tour) {
        let newContact = {
            "name":req.body.name, 
            "email":req.body.email,
            "date":req.body.date,
            "tour":req.body.tour,
            "resident": req.body.resident ? "Yes" : "No",
        }
        addContact(newContact)
        console.log(`Added new contact`)
        res.status(200).send("Added contact successfully")
    } else {
        res.status(400).send("Contact failed to add")
        console.log("Missing required information for POST /contact")
    }
})
app.delete("/api/contact",basicAuth({users: {'admin':'password'}, challenge:true}), (req,res) => {
    res.set("Content-Type","text/plain")

    delId = req.body.id
    console.log(`Deleteing id: ${delId}`)
    deleteContact(delId).then(result => {
        if (result) {
            res.status(200).send("Delete successfull")
        } else {
            res.status(400).send("Delete unsuccessful")
        }   
    })
})
//API
app.post("/api/sale",basicAuth({users: {'admin':'password'}, challenge:true}), (req,res) => {
    message = req.body.message
    endSale().then(()=> { addSale(message) }) // This was not specified in writeup but I thought the previous sale should end when new one starts
    messageShown = true
})
app.get("/api/sale", (req,res) => {
    res.set("Content-Type","application/json")
    getRecentSales().then(retval => {
        if (messageShown) {
            res.send(`{"active": true, "message": "${retval[0].message}"}`)
        } else {
            res.send(`{"active": false}`)
        }
    })
    
})
app.delete("/api/sale",basicAuth({users: {'admin':'password'}, challenge:true}), (req,res) => {
    message = ""
    endSale()
    messageShown = false
})


app.use((req,res,next) => {
    res.status(404).render("404.pug")
})

app.listen(port, () => {
    console.log(`Hwk5 Listening on port ${port}`)
})