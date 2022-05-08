const express = require('express');
const inquirer = require("inquirer");
const db = require('./db/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// const managerQuestions = () => {
//     return inquirer.prompt([
//         {
//             type: "list",
//             name: "selection",
//             message: "What would you like to do?",
//             choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
//             validate: selectionInput => {
//                 if (selectionInput) {
//                     return true;
//                 } else {
//                     console.log('You need to make a selection!');
//                     return false;
//                 }
//             }
//         },
//         {
//             type: "input",
//             name: "officeNumber",
//             message: "Please enter an office number (Required)",
//             validate: officeNumberInput => {
//                 if (officeNumberInput) {
//                 return true;
//                 } else {
//                 console.log('Please enter an office number!');
//                 return false;
//                 }
//             }
//             },
//         {
//         type: "list",
//         name: "addTeamMember",
//         message: "Please choose if you would like to add additional team members:",
//         choices: ['Add Engineer', 'Add Intern', 'No more members'],
//         validate: addTeamMemberInput => {
//             if (addTeamMemberInput) {
//                 return true;
//             } else {
//                 console.log('You need to make a selection!');
//                 return false;
//             }
//         }
//         }
//     ])
//     .then ((managerAnswers) => {
//         switch(managerAnswers.addTeamMember) {
//             case 'Add Engineer':
//                 engineerQuestions();
//                 break;
//             case 'Add Intern':
//                 internQuestions();
//                 break;
//             default: 
//             writeToFile('dist/index.html', generatePage(team))
//         }
//     }
//     )
// };

// managerQuestions();