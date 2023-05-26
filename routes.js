const express = require('express');
const { model } = require("mongoose");
const multer = require('multer'); 

const controller = require('./Controller/controller.js');

const app = express(); 

const isAuth = (req, res, next)=>{
    if(req.session.isAuth){
        next()
    } else {
        res.redirect('/'); 
    }
}

const isOut = (req, res, next)=>{
    if(req.session.isAuth){
        res.redirect('/shop');
    } else {
        next()
    }
}

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'uploads')
    },
    filename: (req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({storage:storage});      
  

app.get('/',isOut, controller.startIndex);

app.get('/shop', isAuth, controller.generateShop);
app.get('/AboutUs2',isOut,  controller.generateAboutUs);
app.get('/adminView', isAuth, controller.generateAdminView);

//Filter
app.post('/filter', isAuth,controller.generateFiltered); 

//Login
app.post('/save', controller.saveUser);
app.get('/register',isOut,controller.generateRegis);
app.post('/login', controller.loginUser); 
app.get('/logout',controller.logoutUser); 

//Profile
app.get('/profile', isAuth,controller.generateProfile);
app.get('/orderHistory', isAuth,controller.generateOrderHistory);
app.post('/order', isAuth,controller.generateOrder);
app.get('/settings',isAuth, controller.generateSettings);
app.post('/editUser', isAuth,controller.editUser);
app.get('/pfpUser', isAuth, controller.generateChangeImageUser); 
app.post('/changePfp', upload.single('userImage'), controller.updateUserPic);   

//Admin View
//Admin Add
app.get('/adminAdd', isAuth,controller.generateAdminAdd); 
app.post('/add',upload.single('productImage'), controller.addItems);
app.post('/itemAdmin', isAuth,controller.generateAdminItem);   

// Admin Remove
app.get('/adminRemove', isAuth,controller.generateRemoveAdmin);
app.post('/del', isAuth,controller.deleteItems);

//Admin Edit
app.get('/adminEdit', isAuth,controller.generateAdminEdit);
app.post('/itemEdit', isAuth,controller.generateItemEdit);
app.post('/edit', isAuth,controller.editItem); 

//Item
app.post('/item',isAuth, controller.generateItemPage); 
app.post('/cart', isAuth,controller.addCart)
app.get('/viewCart', isAuth,controller.viewCart)
app.post('/updateCartItems', isAuth,controller.updateItem)
app.get('/delete/:cartId', isAuth,controller.deleteItem)
app.post('/checkout', isAuth,controller.checkout)

module.exports = app; 