//Requirement;
var express = require('express');
var app = express();
var bodyParser= require('body-parser');
var products =[
{
	id:1,
	name:'laptop'
},

{
	id:2,
	name:'microwave'
}
];

var currentId = 2;			




app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/products',function(req,res){
	res.send({products: products});
});

//when Created;
app.post('/products',function(req,res){
	var productName= req.body.name;
	currentId++;

	products.push({
		id:currentId,
		name:productName
	});

	res.send('successfully created product!!')
});


//when update;
app.put('/products/:id',function(req,res){
		var  id = req.params.id;
		var newName = req.body.newName;

		var found = false;

		products.forEach(function(product,index){
			if(!found && product.id === Number(id)){
				product.name = newName;
			}
		});

		req.send("successfully updated product!!");
});

//For Delete 
app.delete('/products/:id',function(req,res){
	var id = req.params.id;

	var found = false;
	products.forEach(function(pro,index){
		if(!found && pro.id === Number (id)){
			products.splice(index,1);
		}
	});
	res.send("successfully deleted product!!");
});



var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})

