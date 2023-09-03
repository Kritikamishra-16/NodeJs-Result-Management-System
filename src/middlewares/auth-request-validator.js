const TeacherService= require('../services/teacherService');
const teacherService= new TeacherService();
const StudentService= require('../services/studentService');
const studentService= new StudentService();

const validateTeacherAuth= (req,res,next)=>{
    if(!req.body.email || !req.body.password)
    {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            err: 'Email or password missing in the Auth request'
        });
    }
    next();
}

const isAuthenticated=async (req,res, next)=>{
    try{
        const token= req.cookies.jwt;
        const response= await teacherService.isAuthenticated(token);
        console.log(response);
        
        req.token= token;
        req.user=response;

        next();
    }catch(error){
        console.log(error);
        res.render("userNotAuthenticated",{
            isLoggedIn:false,
            csslink: "/css/unauthorizedAccess.css",
        })
       
    }
}

const isAuthenticatedStudent=async (req,res, next)=>{
    try{
        const token= req.cookies.studentjwt;
        const response= await studentService.isAuthenticated(token);
        console.log(response);
        
        req.token= token;
        req.user=response;

        next();
    }catch(error){
        console.log(error);
        res.render("userNotAuthenticated",{
            isLoggedIn:false,
            csslink: "/css/unauthorizedAccess.css",
        })
       
    }
}



module.exports={
    validateTeacherAuth,
    isAuthenticated,
    isAuthenticatedStudent
}