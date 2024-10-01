//handles logic related to roles//
/* Functions:
viewAllRoles()
addRole()
deleteRole() */

import { pool } from '../connection.js'


export const viewAllRoles = async () => {
    try {
        const result = await pool.query('SELECT * FROM roles');
        return result.rows;
    } catch(error) {
        console.error('Error fetching roles:', error);
        throw error;
    }
};
 
export const addRole = async(title: string, salary: number, departmentId: number) => {
    try{
        await pool.query(
            'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)',
            [title, salary, departmentId]
        );
        console.log('Role added successfully');
    } catch (error) {
        console.error('Error adding role:', error);
        throw error;
    }
};


export const deleteRole = async (roleId: number) => {
    try {
        await pool.query('DELETE FROM roles WHERE id = $1', [roleId]);
        console.log('Role deleted successfully');
    } catch (error) {
        console.error('Error deleting role:', error);
        throw error;
    }
};

