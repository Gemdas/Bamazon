var inquirer = require("inquirer");
var mysql = require("mysql");
require('console.table');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'pie314',
  database : 'bamazon'
});
connection.connect();
console.log("Welcome to work 'insert supervisor'");
start();
function start() {
	inquirer.prompt([{
		name:"action",
		type:"list",
		message:"Which action do you want to do? ",
		choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
	}]).then(function(response){
		switch (response.action){
			case "View Products for Sale":
			print(Infinity);
			break;
			case "View Low Inventory":
			print(5);
			break;
			case "Add to Inventory":
			addInventory();
			break;
			case "Add New Product":
			addProduct();
			break;
			default:
			console.log("Have a wonderful day");
			connection.end();
			break;
		}
	})
}
function print(checkValue){
	connection.query("SELECT * FROM products", function(err, results) {
    	if (err) throw err;
    	var relevantProducts = [];
    	results.forEach(function(product){
    		if(product.stock_quanity<checkValue){
    			relevantProducts.push(product);
    		}
    	})
    	console.table(relevantProducts);
		start();
	})
}
function addInventory(){
	connection.query("SELECT * FROM products", function(err, results) {
    	if (err) throw err;
		inquirer.prompt([{
			name: "choice",
	    	type: "list",
	    	choices: function() {
	    		var choices = [];
	    	    for (var i = 0; i < results.length; i++) {
	    	      choices.push(results[i].product_name);
	    	    }
	    		return choices;
	   		},
	    	message: "Which product would you like to add inventory?"
		},
		{
			name: "amount",
			type: "input",
			validate: function(value) {
				return !isNaN(value);
			},
			message: "How many units do you wish to stock?"
		}]).then(function(order){
			var choosenItem;
			results.forEach(function(product){
				if(product.product_name===order.choice)
					choosenItem=product;
			});
		connection.query("UPDATE products SET ? WHERE ?",
			[{stock_quanity:choosenItem.stock_quanity + parseInt(order.amount)},
			{id:choosenItem.id}],
			function(err){
				if (err) throw err;
				console.log("Inventory added");
			});	
			start();
		});
	
	});
}
function addProduct(){
	inquirer.prompt([
		{
			name: "product_name",
			type: "input",
			message: "What Product do you want to add to the store? "
		},
		{
			name: "department",
			type: "list",
			choices:["cool stuff", "uncool stuff"],
			message: "Which deparment do you want to add this to? "
		},
		{
			name: "price",
			type: "input",
			validate:function(value){
				return !isNaN(value);
			},
			message: "How much will it cost? "
		},
		{
			name: "stock_quanity",
			type: "input",
			validate:function(value){
				return !isNaN(value);
			},
			message: "How many will we have in stock? "
		},
		]).then(function(newProduct){
			connection.query("SELECT * FROM products", function(err, results) {
				for (var i = 0; i < results.length; i++) {
					if (newProduct.product_name===results[i].product_name){
						console.log("We seem to already have that in stock")
						start();
					}
				}
				connection.query('INSERT INTO products SET ?', newProduct, function(err){
					if (err) throw err;
					console.log("new item out");
					start();
				});
					
			})
	})
}