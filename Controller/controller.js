const User = require('../model/usersSchema');
const Order = require('../model/orderSchema');
const Cart = require('../model/cartSchema');
const bcrypt = require("bcrypt") ;
const Product = require('../model/productsSchema');
const Category = require('../model/categorySchema');
const { raw } = require('body-parser');
//const notifier = require('node-notifier');
const session = require('express-session');



const controller = {
    startIndex: function(req,res){
		console.log(req.session.username);
		res.render('index',{
			title: 'Welcome to Chubbies!'
		});
	},

    generateShop: async function (req,res){
		
		var carousels = await Product.find({});
		var products = await Product.find({});
		var category = await Category.find({}); 

		//req.flash('success_msg', 'Select Products you want to buy');

		res.render('shop', {products, category, carousels});
	},

	generateFiltered: async function(req,res) {
		var carousels = await Product.find({});
		var products = await Product.find({category: req.body.showCategory});
		var category = await Category.find({});

		if(products == 0){
			req.flash('error', 'No products in this category');
		} else{
			req.flash('success_msg', 'Select Products you want to buy');
		}

		res.render('shop', {products, category, carousels});
	}, 

	generateAboutUs: function (req,res){
		res.render('AboutUs2',{
			title: 'About Us',
			title1: 'Meet the Team',
		});
	},

    generateProfile: async function (req,res){

		var user = req.session.username; 
		
		var img = await User.findOne({username: user});
		
		res.render('profile', {username: req.session.username,img});
	},

	generateSettings: function(req,res){
		
		var user = req.session.username; 
		var pass = req.session.password; 

		var dbUser = User.findOne({username: user}); 
		
		dbUser.exec(function(err,data){
			if(err) throw err;
			res.render('settings', {userEdit:data, password: pass});
		});
	}, 

	generateOrderHistory: function(req,res) {
		
		var user = req.session.username;
		var orders = Order.find({username: user});
 

		orders.sort({orderNumber: 1}).exec(function(err,data){
			if(err) throw err;
			res.render('orderHistory', {orders:data});
		});
	}, 

	generateOrder: async function (req,res){

		var itemsOrdered = []; 
		var numberofItems = []; 
		var productPrice = []; 
		var user = req.session.username;

		let date; 
		let total; 

		// Finding the order using orderNumber
		Order.find({orderNumber: req.body.orderView, username: user})
			.then(data => {

				// Putting all course id's in itemsOrdered array
				data.map((d, k) => {
					for(i = 0; i < d.pname.length; i++){
						itemsOrdered.push(d.pname[i]);
						numberofItems.push(d.items[i]); 
						productPrice.push(d.pprice[i]); 
					}
					date = d.date; 
					total = d.price; 
				})

				//find all Products from the Array
				Product.find({ name: { $in: itemsOrdered } })
					.then(data => {
						res.render('order',{products: data, Date: date, Total: total, items: numberofItems, price: productPrice});
					})
					.catch(error => {
						console.log(error);
					})
			})
			.catch(error => {
				console.log(error);
			})
	},

    generateAdminView: async function (req,res){
		
		var user = req.session.username; 
		var img = await User.findOne({username: user});
		res.render('adminView', {User: user,img});
	},

	generateAdminAdd: function (req,res){
		res.render('adminAdd'); 
	},

	generateChangeImageUser: function (req,res){
		res.render('pfpUser'); 
	}, 

	generateAdminEdit: function (req,res){
		
		var item = Product.find();

		item.exec(function(err,data){
			if(err) throw err;
			res.render('adminEdit', {products:data});
		});
	}, 

	generateRemoveAdmin: function (req,res){
		
		var item = Product.find();

		item.exec(function(err,data){
			if(err) throw err;
			res.render('adminRemove', {products:data});
		});

	}, 

	generateRegis: function(req, res) {
        res.render('register', {
            title: 'Registration Form'
        });
    },

	generateItemPage: async function (req,res){
		var product = req.body.showProduct; 

		var item = Product.findOne({name: product}); 
		 
		item.exec(function(err,data){
			if(err) throw err;
			res.render('item', {Item:data});
		});
	},

	generateAdminItem: async function (req,res){
		var product = req.body.showProduct; 

		var item = Product.findOne({name: product}); 
		 
		item.exec(function(err,data){
			if(err) throw err;
			res.render('itemAdmin', {Item:data});
		});
	}, 

    saveUser: async function(req, res){
		const{name, address, username, password, contact_no} = req.body;

		let user = await User.findOne({username});

		if (user) {
			req.flash('error', 'Username already exists, Please choose a different one');
			return res.redirect('/register')
		}

		const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            name,
			address,
            username,
			password:  hashedPassword,
            contact_no,
			pic: "generic.png"

        });
		user.save(function(err) {
            if (err){
                console.log(err);
				res.redirect("/register");
            } else{
				console.log("Loading..");
				req.flash('success_msg', 'Successfully Registered');
				//alert('Successfully Registered')
                res.redirect("/register");
            }
        });
    },

	loginUser: async function (req, res)  {
		const {username, password} = req.body; 

		const user = await User.findOne({username});

		if(!user){
			req.flash('error', 'Username does not exist');
			//notifier.notify('Username does not exist');
			  return res.redirect('/');
			 
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if(!isMatch){
			req.flash('error', 'Wrong password');
			//notifier.notify('Wrong password');
			return res.redirect('/');
		}

		req.session.username = user.username;
		req.session.password = password;
		req.session.isAuth=true;
		if(user.username == 'admin'){
			res.redirect('/adminView');
		}
		else{
			res.redirect('/shop');
		}
	},

	logoutUser: (req, res) => {
		if (req.session) {
		  req.session.destroy(() => {
			res.clearCookie('connect.sid');
			res.redirect('/');
		  });
		}
	  } , 
	
	addItems: async function(req,res) {
		let productName = req.body.productName; 
		let productPrice = req.body.price;
		let productStock = req.body.stock;
		let productDescrip = req.body.description;
		let productCat = req.body.productCategory;
		let productImg = req.file.filename; 
		
		let productLower = productCat.toLowerCase(); 

		let category = await Category.findOne({name: productLower});
		if(category == null){
			Category.create({
				name:  productCat
			},   
			); 
		}
		
		let product = await Product.findOne({name: productName});
		
		if(product == null){
			Product.create({
				name: productName, 
				category: productLower, 
				price: productPrice, 
				stock: productStock, 
				description: productDescrip,
				pic: productImg 
			},
			function(err, result){
				if(result){
					//alert("Added Succesfully")
					req.flash('success_msg', 'Successfully Added a New Product');
					console.log("Added Succesfully"); 
					res.redirect('/adminAdd'); 
				}
			}
			); 
		} else {
			req.flash('error', 'Product name already exists, could be the same product');
			res.redirect('/adminAdd');
		}
   },
   
   deleteItems: async function(req,res) { 

	Product.deleteOne({name: req.body.showProduct}, 		   
		
		function(err, result){
		if(result){
			req.flash('success_msg', 'Removed Succesfully');
				console.log("Removed Succesfully"); 
			 	res.redirect('/adminRemove')
		}
	}); 
   },

   generateItemEdit: function (req,res){
		
		var product = req.body.showProduct; 

		var item = Product.findOne({name: product}); 
		
		item.exec(function(err,data){
			if(err) throw err;
			res.render('itemEdit', {Item:data});
		});
	}, 

	editItem: async function (req,res){
		
		var productNum = req.body.showProduct; 
		var productName = req.body.productName; 
		var productPrice = req.body.price;
		var productStock = req.body.stock;
		var productDescrip = req.body.description;
		var productCat = req.body.productCategory;
		
		console.log(productNum); 
		Product.updateOne({productNumber: productNum},{$set: {name: productName, category: productCat, 
															  price: productPrice, stock: productStock, 
															  description: productDescrip}}, 

			function(err, result){
				if(result){
					console.log("Updated Successfully"); 
					res.redirect('/adminEdit')
				} else if (err) {
					console.log("Updated Failed"); 
					res.redirect('/adminEdit')
				}
			}
		);
		//res.render('adminEdit'); 
	}, 

	editUser: async function (req,res){
		
		var name = req.body.name;
		var address = req.body.address; 
		var contact = req.body.contact; 
		var userName = req.body.username; 
		var pass = req.body.password;  

		var user = req.session.username; 

		const order = await Order.find({username: user})
		const cart = await Cart.find({username: user})
		
		const hashedPassword = await bcrypt.hash(pass, 10);
		console.log(cart)
		console.log(user); 
		User.updateOne({username: user},{$set: {name: name, address: address, 
												   username: userName, password: hashedPassword, 
												   contact_no: contact}}, 
			
			async function(err, result){
				if(result){
					for(j=0;j<cart.length;j++){
						await Cart.updateOne({username: cart[j].username},{$set: {username: userName}})
					}
					for(j=0;j<order.length;j++){
						await Order.updateOne({username: order[j].username},{$set: {username: userName}})
					}

					req.session.save(function(err) {
						req.session.username = userName
						req.session.password = pass
						console.log("Updated Users Successfully"); 
						req.flash('success_msg', 'Updated User Successfully... Please reload the page');
						//alert("Updated User Successfully... Please reload the page")
						res.redirect('/settings')
					  })
					
					
				} else if (err) {
					console.log("Update Failed"); 
					res.redirect('/settings'); 
				}
			}
		);
		//res.render('adminEdit'); 
	}, 

	updateUserPic: async function(req,res){
        var updatePic = req.file.filename; 
		var user = req.session.username;

		console.log(updatePic)
		User.updateOne({username: user}, {pic: updatePic}, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
				req.flash('success_msg', 'Updated User Image Successfully... Please reload the page');
                console.log("Successfully updated Pic");
				res.redirect('/pfpUser');
            }
        })	
    },

	addCart: async function(req, res){
			
			const user = req.session.username;
			const productName = req.body.productName;
			const productPrice = req.body.productPrice;
			const items = Number(req.body.items);
			const total = (productPrice * items).toFixed(2);
			console.log(total);
			const collection = await Cart.findOne({username: user, productName: productName})
			
			if(collection == null){
				const cart = new Cart({
					username:user,
					productName: productName, 
					rawPrice: productPrice,
					items:items,		 
					price: total, 
		
				})
				cart.save(function(err) {
					if (err){
						console.log(err);
						res.redirect("/item");
					} else{
						console.log("Loading..");
						res.redirect("/shop");
					}
				});
			} else{
				const olditems = collection.items
				const newitems = olditems + items;
				const newPrice = (newitems * productPrice).toFixed(2);

				console.log(newPrice);
				Cart.updateOne({productName: productName},{$set: {items:newitems, price:newPrice}}, 

				function(err, result){
					if(result){
						console.log("Updated Successfully"); 
						res.redirect('/shop')
					} else if (err) {
						console.log("Updated Failed"); 
						res.redirect('/shop')
					}
				}
				);
			
			}
		},

		viewCart: function (req,res){
			var user = req.session.username; 
			var item = Cart.find({username:user});

			console.log(user);  
			item.exec(function(err,data){
				if(err) throw err;
				res.render('viewCart', {carts:data});
			});
		},
		
		updateItem: async function(req, res){
			const items = req.body.itemsRemoved; 
			const productName = req.body.removeProduct; 
			const userId = req.body.cartId;
			const user = req.session.username;

			//look for the old cart and product
			const cart = await Cart.findOne({objectId: userId}); 
			const productPrice = await Product.findOne({name: productName});
			
			//remove x items
			var newItems = cart.items - items; 

			//change Price
			const newPrice = (newItems * productPrice.price).toFixed(2);
			
			console.log(userId); 
			if(newItems ==  0){
				Cart.deleteOne(userId, function(err){
					if (err){
						console.log(err);
					} else{
						
						res.redirect('/viewCart');
					}
				});
			} else {
				Cart.updateOne({objectId: userId},{$set: {items:newItems, price:newPrice}}, 

					function(err, result){
						if(result){
							console.log("Updated Successfully"); 
							res.redirect('/viewCart')
						} else if (err) {
							console.log("Update Failed"); 
							res.redirect('/viewCart')
						}
					}
				)
			}
		},
		
		deleteItem: function(req, res){
			const userId = req.params.cartId;
			Cart.findByIdAndRemove(userId, function(err){
				if (err){
					console.log(err);
				} else{
					res.redirect('/viewCart');
				}
			});
		},
		
		checkout: async function(req,res){
			const user = req.session.username;
			const peeps = await User.find({username: user})
			const cart = await Cart.find({username: user})
			const prod =  await Product.find({})
			const orders = await Order.find({username: user})
			var products = [];
			var pproducts= [];
			var items = [];
			var number = Number(orders.length + 1);
			const dateNow = new Date();
        	const date = dateNow.toDateString() + " " + dateNow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
			console.log(prod.length)
			
			for(i=0;i<cart.length;i++){
				products.push(cart[i].productName);
				pproducts.push(cart[i].rawPrice)
				items.push(cart[i].items);
				for(j=0;j<prod.length;j++){
					if(prod[j].name == cart[i].productName){
						//console.log(prod[j].name)
						const newStock = Number(prod[j].stock - cart[i].items)
						//console.log(newStock)
						await Product.updateOne({name: cart[i].productName},{$set: {stock: newStock}})
					}
				}
				
			}

			console.log(typeof products)
			
			const carts = new Order({
				orderNumber: number,
				pname: products,
				pprice: pproducts,
				username : user,
				address : peeps.address,
				contact_no: peeps.contact_no,
				date: date,
				price: req.body.totalPrice,
				items: items,
			})
			await Cart.deleteMany({username:user})
			carts.save(function(err) {
				if (err){
					console.log(err);
					res.redirect("/checkout");
				} else{
					//notifier.notify('Successfully Purchased');
					console.log("Loading..");
					res.redirect("/shop");
				}
			});
				
		},
}

module.exports = controller;