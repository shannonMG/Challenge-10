import inquirer from 'inquirer';
import { viewAllRoles, addRole, deleteRole } from './controllers/roleActions.js';
import { getDepartments } from './controllers/departmentActions.js';
import { connectToDb } from './connection.js'; // Ensure you're connecting to the DB
// Function to handle the user's input
export const startCli = async () => {
    await connectToDb();
    while (true) {
        const departments = await getDepartments();
        const departmentChoices = departments.map(department => ({
            name: department.name,
            value: department.id
        }));
        const answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What do you want to do?',
                choices: ['Add Role', 'View All Roles', 'Delete Role', 'Exit']
            }
        ]);
        switch (answer.action) {
            case 'Add Role':
                const roleInfo = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: 'Enter the role title:'
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'Enter the role salary:',
                        validate: (input) => {
                            const num = parseFloat(input);
                            return !isNaN(num) && num > 0 || 'Please enter a valid salary.';
                        }
                    },
                    {
                        type: 'list',
                        name: 'departmentId',
                        message: 'Select the department:',
                        choices: departmentChoices
                    }
                ]);
                try {
                    await addRole(roleInfo.title, parseFloat(roleInfo.salary), parseInt(roleInfo.departmentId));
                    console.log('Role added successfully!'); // Success message
                }
                catch (error) {
                    console.error('Failed to add role:', error);
                }
                break;
            case 'View All Roles':
                try {
                    const allRoles = await viewAllRoles();
                    if (allRoles.length > 0) {
                        console.log('List of Roles:');
                        console.table(allRoles);
                    }
                    else {
                        console.log('No roles found.');
                    }
                }
                catch (error) {
                    console.error('Failed to retrieve roles:', error);
                }
                break;
            case 'Delete Role':
                try {
                    const allRoles = await viewAllRoles();
                    if (allRoles.length > 0) {
                        const roleChoices = allRoles.map(role => ({
                            name: `${role.title} (ID: ${role.id})`, // Display title and ID
                            value: role.id // Use ID for deletion
                        }));
                        const deleteAnswer = await inquirer.prompt([
                            {
                                type: 'list',
                                name: 'roleId',
                                message: 'Select the role to delete:',
                                choices: roleChoices
                            }
                        ]);
                        // Call deleteRole function
                        await deleteRole(deleteAnswer.roleId);
                    }
                    else {
                        console.log('No roles found to delete.');
                    }
                }
                catch (error) {
                    console.error('Failed to retrieve roles for deletion:', error);
                }
                break;
            case 'Exit':
                console.log('Exiting the application.'); // Optional exit message
                return; // Exit the CLI loop
        }
    }
};
