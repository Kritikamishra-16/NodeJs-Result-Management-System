const StudentService= require('../services/studentService');

const studentService= new StudentService();

const create= async (req,res)=>{
    try{
        const response= await studentService.create({
            rollnumber: req.body.rollnumber,
            name: req.body.name,
            dob: req.body.dob,
            score: req.body.score
        });
        req.session.message={
            type:'success',
            message: 'Student added successfully'
        };
        res.redirect("/api/v1/getAll")
        
    }catch(error)
    {
        console.log(error);
        return res.status(500).json({   
            data:{},
            message:"Not able to add a student",
            success: false,
            type: 'danger'
        });
    }
}

const getAll= async (req,res)=>{
    try{
        const response= await studentService.getAll();
        res.status(201).render("teacherHome",{
            isLoggedIn: true,
            students:response
        });
        
    }catch(error)
    {
        console.log(error);
        return res.status(500).json({
            data:{},
            message:"Not able to fetch all student",
            success: false,
            err:error
        });
    }
}



const update= async (req,res)=>{
    try{
        const response= await studentService.update(req.params.id,{
            rollnumber: req.body.rollnumber,
            name: req.body.name,
            dob: req.body.dob,
            score: req.body.score
        });
        req.session.message={
            type:'success',
            message: 'Student updated successfully'
        };
        res.redirect('/api/v1/getAll')
        
    }catch(error)
    {
        console.log(error);
        return res.status(500).json({
            data:{},
            message:"Not able to update a student",
            success: false,
            err:error
        });
    }
}

const destroy= async (req,res)=>{
    try{
        const response= await studentService.destroy(req.params.id);
        req.session.message={
            type:'info',
            message: 'Student data deleted successfully'
        };
        res.redirect('/api/v1/getAll');
        
    }catch(error)
    {
        console.log(error);
        return res.status(500).json({
            data:{},
            message:"Not able to delete a student",
            success: false,
            err:error
        });
    }
}

const getById= async (req,res)=>{
    try{
        const response= await studentService.get(req.params.id);
        res.render("editStudent",{
            csslink: "/css/validation.css",
            student:response,
            isLoggedIn:true
        });
       
    }catch(error)
    {
        console.log(error);
        return res.status(500).json({
            data:{},
            message:"Not able to fetch a student",
            success: false,
            err:error
        });
    }
}

const search= async(req,res)=>{
    try{
        //console.log(req.body);
        const response= await studentService.findByRollNumberAndDOB(req.body.rollnumber, req.body.dob);
        console.log(response);
        if(response==null)
        {
            throw {error};
        }
        const newJWT= studentService.createToken({
            id:response.id,
            rollnumber:response.rollnumber
        });

        //storing jsonwebtoken in cookie storage
        res.cookie("studentjwt", newJWT,{
            expires: new Date(Date.now()+ 6000000),
            httpOnly:true,
        });

        res.redirect('/api/v1/result');
        
    }catch(error)
    {
        console.log(error);
        res.render("studentLogin",{
            csslink: "/css/studentstyle.css",
            studentResult: false,
            message:{
                type:'danger',
                message: 'Invalid credentials!'
            }
        });
       
    }
}

const result=async(req,res)=>{
    try{
        const response = req.user;
        console.log(response);
        res.render("studentResult",{
            student:response,
            csslink: "/css/studentResult.css",
            studentResult:true
        });
    }catch(error){
        res.status(500).json({
            err: error,
            message: "Something went wrong in controller",
            data: {},
            success: false
           });
    }
}

const logout=async(req,res)=>{
    try{
        res.clearCookie("studentjwt");
        res.redirect('/api/v1');
    }catch(error){
        res.status(500).json({
            err: error,
            message: "Something went wrong in controller",
            data: {},
            success: false
           });
    }
}

const studentLogin= async (req,res)=>{
    try{
        res.clearCookie("studentjwt");
        res.render("studentLogin",{
            csslink: "/css/studentstyle.css",
            studentResult: false
        });
    }
   catch(error){
       res.status(500).json({
        err: error,
        message: "Something went wrong in controller",
        data: {},
        success: false
       });
   }
}


module.exports={
    create,
    getById,
    getAll,
    update,
    destroy,
    search,
    studentLogin,
    logout,
    result
}
