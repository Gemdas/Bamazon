DROP DATABASE bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products(
	id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	department VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quanity INTEGER(10) NOT NULL,
    primary key(id)
);
INSERT INTO products(product_name,department,price,stock_quanity) VALUES ("doggos", "cool stuff", 345.34, 9001);
INSERT INTO products(product_name,department,price,stock_quanity) VALUES ("kitties", "cool stuff", 312.78, 9001);
INSERT INTO products(product_name,department,price,stock_quanity) VALUES ("ice", "cool stuff", 5.34, 91);
INSERT INTO products(product_name,department,price,stock_quanity) VALUES ("monster painting", "cool stuff", 34.34, 9001);
INSERT INTO products(product_name,department,price,stock_quanity) VALUES ("The ark of the covenant", "cool stuff", 1000000.00, 1);
INSERT INTO products(product_name,department,price,stock_quanity) VALUES ("fire", "uncool stuff", 345.34, 9001);
INSERT INTO products(product_name,department,price,stock_quanity) VALUES ("fuck this", "uncool stuff", 345.34, 9001);
INSERT INTO products(product_name,department,price,stock_quanity) VALUES ("writing data", "uncool stuff", 345.34, 9001);
INSERT INTO products(product_name,department,price,stock_quanity) VALUES ("MySQL", "uncool stuff", 345.34, 9001);
INSERT INTO products(product_name,department,price,stock_quanity) VALUES ("anti-doggos", "uncool stuff", 345.34, 9001);
