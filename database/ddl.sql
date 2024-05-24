/*query para criar o banco finvision_db no MySQL*/
CREATE DATABASE finvision_db;

/*query para criar tabela finance no MySQL*/
CREATE TABLE finance (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    date DATE,
    description VARCHAR(50),
    category VARCHAR(50),
    value DOUBLE
);