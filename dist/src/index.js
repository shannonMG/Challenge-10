import inquirer from 'inquirer';
import { viewAllRoles, addRole, deleteRole } from './controllers/roleActions.js';
import { connectToDb } from '../db/connection.js'; // Ensure you're connecting to the DB
// Function to handle the user's input
const mainMenu = async () => {
    console.log('Displaying main menu...');
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all roles',
                'Add a new role',
                'Delete a role',
                'Exit'
            ],
        }
    ]);
    switch (answers.action) {
        case 'View all roles':
            await handleViewRoles();
            break;
        case 'Add a new role':
            await handleAddRole();
            break;
        case 'Delete a role':
            await handleDeleteRole();
            break;
        case 'Exit':
            console.log('Goodbye!');
            process.exit();
    }
    // Show the menu again after completing an action
    await mainMenu(); // Added 'await' to avoid potential issues
};
// Function to handle viewing all roles
const handleViewRoles = async () => {
    try {
        const roles = await viewAllRoles();
        console.table(roles);
    }
    catch (error) {
        console.error('Error viewing roles:', error);
    }
};
// Function to handle adding a new role
const handleAddRole = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the role title:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary:'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'Enter the department ID:'
        }
    ]);
    try {
        await addRole(answers.title, parseFloat(answers.salary), parseInt(answers.departmentId));
        console.log('Role added successfully!');
    }
    catch (error) {
        console.error('Error adding role:', error);
    }
};
// Function to handle deleting a role
const handleDeleteRole = async () => {
    const { roleId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'roleId',
            message: 'Enter the role ID to delete:'
        }
    ]);
    try {
        await deleteRole(parseInt(roleId));
        console.log('Role deleted successfully!');
    }
    catch (error) {
        console.error('Error deleting role:', error);
    }
};
// Initialize the CLI app
(async () => {
    try {
        await connectToDb(); // Ensure database connection before running the CLI
        console.log('Connected to the database.');
        await mainMenu(); // Start the CLI
    }
    catch (error) {
        console.error('An error occurred during initialization:', error);
    }
})();
