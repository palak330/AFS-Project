const express=require('express');
const app=express();
const port=3005;
const middleware=require('./middleware')
const path=require('path')
const bodyParser=require("body-parser")
const mongoose=require("./database");
const session=require("express-session");


//const mongoose=require("mongoose");
//mongoose.connect('mongodb://127.0.0.1:27017/twitter');

// const db = mongoose.connection;
// db.once('open',()=>{
//     console.log("DB CONNECTED")
// })

// mongoose.connect('mongodb://127.0.0.1:27017/twitter')
//   .then(() => {
//     console.log("Database connected successfully");
//   })
//   .catch((error) => {
//     console.log("Error connecting to database: ", error);
//   });

const server=app.listen(port,()=>console.log("server listening on port"+ port));

app.set("view engine", "pug");
app.set("views","views");

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret:"bbq chips",
    resave: true, 
    saveUninitialized:false
}))

//Routes
const loginRoute=require('./routes/loginRoutes');
const registerRoute=require('./routes/registerRoutes');
const logoutRoute=require('./routes/logout');
//const { log } = require('console');

//API routes
const postsApiRoute=require('./routes/api/posts');

app.use("/login",loginRoute);
app.use("/register",registerRoute);
app.use("/logout",logoutRoute);
app.use("/api/posts",postsApiRoute);

app.get("/",middleware.requireLogin,(req,res,next)=>{

    var payload={
        pageTitle:"Home",
        userLoggedIn:req.session.user,
        userLoggedInJs:JSON.stringify(req.session.user),
    }
    res.status(200).render("home",payload);
})