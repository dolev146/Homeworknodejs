var express = require("express")
var app = express()
var fs = require('fs')
let employees = require("./employees.json")

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Access the parse results as request.body
// app.post('/', function(request, response){
//     console.log(request.body.user.name);
//     console.log(request.body.user.email);
// });



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
    if (employee.length === 0 ) {
        employee = { eror: 404, note: "sorry we cant find the employee" }
    }
    res.json(employee)
})

app.get('/api/employees/' , (req , res) =>{
    console.log("Query" , req.query)
    const { id } = req.query
    let employee = employees.filter((employee) => {
        return employee.id === +id
    })
    if (!employee) {
        employee = { eror: 404, note: "sorry we cant find the employee" }
    }
    res.json(employee)
} )

app.delete("/api/employees/:id", (req, res) => {
    
    const { id } = req.params
    employees = employees.filter((employee) => {
        return employee.id !== +id
    })
    res.json(employees)
})

app.post("/api/employees/" ,(req,res)=>{
    console.log(req.body)
    console.log(res)
    res.send()
  
})




app.listen(3000, () => console.log('run on port 3000'));