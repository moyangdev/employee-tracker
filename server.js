const express = require('express');
const mysql = require('mysql2');
const inquirer = require("inquirer");
// const db = require('./db/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'Rock313!',
    database: 'tracker'
    },
    console.log('Connected to the tracker database.')
);


const initialQuestion = () => {
    return inquirer.prompt([
        {
            type: "list",
            name: "selection",
            message: "What would you like to do?",
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
            validate: selectionInput => {
                if (selectionInput) {
                    return true;
                } else {
                    console.log('You need to make a selection!');
                    return false;
                }
            }
        }
    ])
    .then ((initialAnswer) => {
        switch(initialAnswer.selection) {
            case 'view all departments':
                viewDepartments();
                break;
            case 'view all roles':
                viewRoles();
                break;
            case 'view all employees':
                viewEmployees();
                break;
            case 'add a department':
                addDepartment();
                break;
            case 'add a role':
                addRole();
                break;
            case 'add an employee':
                addEmployee();
            break;
            default: 
            initialQuestion();
        }
    }
    )
};

const viewDepartments = () => {
let sql = `SELECT * FROM departments`

db.query(sql, (err, res) => {
    if (err) throw err;

    console.table(res);

    initialQuestion();
});
}

const viewRoles = () => {
let sql = `SELECT * FROM roles`

db.query(sql, (err, res) => {
    if (err) throw err;

    console.table(res);

    initialQuestion();
});
}

const viewEmployees = () => {
let sql = `SELECT * FROM employees`

db.query(sql, (err, res) => {
    if (err) throw err;

    console.table(res);

    initialQuestion();
});
}

function addDepartment() { 
inquirer.prompt([
    {
        name: "name",
        type: "input",
        message: "What department would you like to add?"
    }

]).then(function(answers) {
    db.query('INSERT INTO departments SET ?',
        {
            name: answers.name
        },
        function(err, res) {
            if (err) throw err;
            console.log(`New department added successfully!`);
            initialQuestion();
        }
    )
})
}

function addRole() { 
inquirer.prompt([
    {
        name: "title",
        type: "input",
        message: "What role would you like to add?"
    },
    {
        name: "salary",
        type: "input",
        message: "What is the salary for the new role?"
    },
    {
        name: "department_id",
        type: "input",
        message: "Please enter id of the department for this role",
    }

]).then(function(answers) {
    db.query('INSERT INTO roles SET ?',
        {
            title: answers.title,
            salary: answers.salary,
            department_id: answers.department_id
        },
        function(err, res) {
            if (err) throw err;
            console.log(`New role added successfully!`);
            initialQuestion();
        }
    )
})
}

function addEmployee() { 
inquirer.prompt([
    {
        name: "first_name",
        type: "input",
        message: "What's the employee's first name?"
    },
    {
        name: "last_name",
        type: "input",
        message: "What's the employee's last name?"
    },
    {
        name: "role_id",
        type: "input",
        message: "What's the employee's role id?",
    },
    {
        name: "manager_id",
        type: "input",
        message: "What's the employee manager's id?",
    }

]).then(function(answers) {
    db.query('INSERT INTO employees SET ?',
        {
            first_name: answers.first_name,
            last_name: answers.last_name,
            role_id: answers.role_id,
            manager_id: answers.manager_id,
        },
        function(err, res) {
            if (err) throw err;
            console.log(`New employee added successfully!`);
            initialQuestion();
        }
    )
})
}

initialQuestion();
