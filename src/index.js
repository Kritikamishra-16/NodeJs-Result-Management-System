const express= require('express');
const app=express();
const path= require('path');
const bodyParser= require('body-parser');
const hbs= require('hbs');
const {PORT}= require('./config/serverConfig');
const apiRoutes= require('./routes/index');
const db = require('./models/index');
const cookieParser= require('cookie-parser');
const session= require('express-session');
const prepareAndStatrtServer= ()=>{
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(cookieParser());
    //middlewae to store session messages
    app.use(
        session({
            secret: "mysecret key",
            saveUninitialized: true,
            resave:false
        })
    );

    app.use((req,res,next)=>{
        res.locals.message= req.session.message;
        delete req.session.message;
        next();
    })

    
    // Disable caching middleware
    app.use((req, res, next) => {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
        //res.clearCookie("jwt");
        next();
    });
  

    //module wrapper function inside node
    const static_path= path.join(__dirname, "../public");
    const template_path= path.join(__dirname, "../templates/views"); 
    const partials_path= path.join(__dirname, "../templates/partials"); 
 
    app.use(express.static(static_path));
    app.set("view engine","hbs");//setting the view engine
    app.set("views",template_path);
    hbs.registerPartials(partials_path);

    app.use("/api/public/js", express.static(path.join(__dirname, "../public/js")));

    app.use('/api',apiRoutes);


    app.listen(PORT,()=>{
        console.log(`Server started on port ${PORT}`);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter: true});
        }
    });
}

prepareAndStatrtServer();