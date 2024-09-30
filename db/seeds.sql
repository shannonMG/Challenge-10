--This file will contain intial data for database tables--

INSERT INTO departments (id,name)
VALUES (1,'Human Resources'),
       (2, 'Information Technology');

INSERT INTO roles(id, title, salary, department)
VALUES (1, 'Director', 80,000.00, 1)

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES(1, Shannon, MG, 1, 1)