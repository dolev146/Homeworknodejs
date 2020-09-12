var express = require("express")
var app = express()
var fs = require('fs')
let employees = require("./employees.json")
app.use(express.json());

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
    let employee = req.body
    employee.id = +employee.id
    employee.salary = +employee.salary
    let { id } = employee
    let index
    let checkEmployee = employees.filter((emp, i) => {
        index = i
        return emp.id === +id
    })
    if (checkEmployee.length > 0) {
        employees[index] = employee
    } else {
        employees.push(employee)
    }
    res.send(employees)
  
})




app.listen(3000, () => console.log('run on port 3000'));