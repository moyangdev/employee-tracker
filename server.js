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

    initialQuestion ();
});
}

const viewRoles = () => {
let sql = `SELECT * FROM roles`

db.query(sql, (err, res) => {
    if (err) throw err;

    console.table(res);

    initialQuestion ();
});
}

const viewEmployees = () => {
let sql = `SELECT * FROM employees`

db.query(sql, (err, res) => {
    if (err) throw err;

    console.table(res);

    initialQuestion ();
});
}

initialQuestion();
