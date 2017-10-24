var inquirer = require("inquirer");
var mysql = require("mysql");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'pie314',
  database : 'bamazon'
});
connection.connect();
console.log("Welcome to Bamazaon, a bam above Amazon");
customer();

function customer() {
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
    	    message: "Which product would you like to purchase?"
		},
		{
			name: "amount",
			type: "input",
			validate: function(value) {
				return !isNaN(value);
			},
			message: "How many units do you wish to purchase?"
		}]).then(function(response){
			var choosenItem;
			console.log("Good Choice");
			results.forEach(function(product){
				if(product.product_name===response.choice)
					choosenItem=product;
			});
			if (choosenItem.stock_quanity<response.amount){
				console.log("Unfortunately we only have "+ choosenItem.stock_quanity+" "+ response.choice+ " in stock at this time")
				alternativeOffer(choosenItem);
			}
			else{
				offer(choosenItem, response.amount);
			}
		})
	});
}
function alternativeOffer(purchase){
	inquirer.prompt([{
		name: "confirmation",
		type: "confirm",
		message: "would you like me to purchase what we have in stock? "
	}]).then(function(answer){
		if(answer.confirmation){
			offer(purchase, purchase.stock_quanity);
		}
		else{
			again();
		}
	});
}
function offer(purchase, total){
	var priceTotal = purchase.price * total;
	console.log("Your purchase of " +purchase.product_name +" will cost you " + priceTotal);
	inquirer.prompt([{
		name: "confirmation",
		type: "confirm",
		message: "Is this ok? "
	}]).then(function(answer){
		if(answer.confirmation){
			connection.query("UPDATE products SET ? WHERE ?",
				[{stock_quanity:purchase.stock_quanity - total},
				{id:purchase.id}],
				function(err) {
              		if (err) throw err;
              		console.log("Purchase successful!");
              		again();
            	});
		}
	})
}
function again(){
	inquirer.prompt([{
		name: "confirmation",
		type: "confirm",
		message: "would you like to purchase anything else? "
	}]).then(function(answer){
		if(answer.confirmation){
			customer();
		}
		else{
			console.log("Have a wonderful day");
			connection.end();
		}
	});
}