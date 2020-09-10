var express = require("express")
var app = express()
var fs = require('fs')
var url = require('url')
var path = require('path')
var http = require("http")
let employees = require("./employees.json")

console.log(employees)

app.get("/api/employees", (req, res) => {
    res.json(employees)
})
app.get("/", (req, res) => {
    const html = fs.readFileSync(__dirname + '/index.html' )
    res.end(html)
})

app.get("/api/employees/:id", (req, res) => {
    const { id } = req.params
    let employee = employees.filter((employee) => {
        return employee.id === +id
    })
    if (employee) {
        employee = { eror: 404, note: "sorry we cant find the employee" }
    }
    res.json(employee)
})

app.delete("/api/employees/:id", (req, res) => {
    const { id } = req.params
    employees = employees.filter((employee) => {
        return employee.id !== +id
    })
    res.json(employees)
})

app.listen(3000, () => console.log('run on port 3000'));