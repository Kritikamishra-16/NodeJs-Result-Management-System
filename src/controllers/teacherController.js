const TeacherService= require('../services/teacherService');

const teacherService= new TeacherService();

const create= async (req,res)=>{
    try{
        const response= await teacherService.create({
            email:req.body.email,
            password:req.body.password
        });
        return res.status(201).json({
            message: "Successfully created a new user",
            data: response,
            success:true,
            err: {}
        })
    }catch(error)
    {
        console.log(error);
        return res.status(500).json({
            data:{},
            message:"Not able to create a new user",
            success: false,
            err:error
        });
    }
}

const signIn= async (req,res)=>{
    try{
        const response= await teacherService.signIn(req.body.email, req.body.password);

        //storing jsonwebtoken in cookie storage
        res.cookie("jwt", response,{
            expires: new Date(Date.now()+ 6000000),
            httpOnly:true,
            //secure: true -> only work for https
        });
        res.redirect("/api/v1/getAll");
            
    }catch(error){
        console.log(error);
       
        res.render("teacherLogin",{
            csslink: "/css/teacherstyle.css",
            message:{
                type:'danger',
                message: 'Invalid credentials!'
            }
           
        });
       
    }
}


const index=async (req,res)=>{
    try{
        res.clearCookie("jwt");
        res.clearCookie("studentjwt");
        res.render("index", {
            csslink: "/css/style.css",
            isLoggedIn: false
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            data:{},
            message:"Something went wrong",
            success: false,
            err:error
        });
    }
}

const teacherLoginPage=async (req,res)=>{
    try{
        res.clearCookie("jwt");
        res.render("teacherLogin",{
            csslink: "/css/teacherstyle.css"
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            data:{},
            message:"Something went wrong",
            success: false,
            err:error
        });
    }
}

const logout= async(req,res)=>{
    try{
        res.clearCookie("jwt");
        res.redirect('/api/v1');
        
    }catch(error){
        console.log(error);
        return res.status(500).json({
            data:{},
            message:"Something went wrong",
            success: false,
            err:error
        });
    }
}





module.exports={
    create,
    signIn,
    index,
    teacherLoginPage,
    logout
}