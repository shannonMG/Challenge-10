import inquirer from 'inquirer';
//import { viewAllRoles, addRole, deleteRole } from './controllers/roleActions.js'; 
//import { connectToDb } from './connection.js';  // Ensure you're connecting to the DB

// Function to handle the user's input
export const startCli = async () => {
  const answer = await inquirer.prompt([
      {
          type: 'list',
          name: 'action',
          message: 'What do you want to do?',
          choices: ['Add Role', 'View All Roles', 'Exit']
      }
  ]);

  switch (answer.action) {
      case 'Add Role':
          // Logic to add a role
          break;
      case 'View All Roles':
          // Logic to view all roles
          break;
      case 'Exit':
          process.exit();
          break;
  }
};