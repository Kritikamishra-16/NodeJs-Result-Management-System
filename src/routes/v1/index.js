const express= require('express');
const TeacherController= require('../../controllers/teacherController');
const StudentController= require('../../controllers/studentController');
const router= express.Router();
const {AuthRequestValidator} = require('../../middlewares/index');

router.get("/",TeacherController.index);

router.get("/teacherlogin",TeacherController.teacherLoginPage);

router.post(
    '/signup', 
    AuthRequestValidator.validateTeacherAuth,
    TeacherController.create
);

router.post(
    '/teacherlogin',
    AuthRequestValidator.validateTeacherAuth,
    TeacherController.signIn
);

router.get(
    '/logout',
    AuthRequestValidator.isAuthenticated,
    TeacherController.logout
)

// Student CRUD 

router.get(
    '/getAll',
    AuthRequestValidator.isAuthenticated,
    StudentController.getAll
)

router.get(
    '/get/:id',
    AuthRequestValidator.isAuthenticated,
    StudentController.getById
)

router.post(
    '/create',
    AuthRequestValidator.isAuthenticated,
    StudentController.create
)

router.get(
    '/create',
    AuthRequestValidator.isAuthenticated,
    (req,res)=>{
        try{
            res.render('addStudent',{
                isLoggedIn:true,
                csslink: "/css/validation.css",
            });
        }catch(error){
            res.status(500).json({
                err: error
            })
        }
    }
);

router.get(
    '/delete/:id',
    AuthRequestValidator.isAuthenticated,
    StudentController.destroy
)

router.post(
    '/edit/:id',
    AuthRequestValidator.isAuthenticated,
    StudentController.update
)


//STUDENT APIs

router.get(
    '/studentlogin',
    StudentController.studentLogin
)


router.post(
    '/searchResult',
    StudentController.search
)

router.get(
    '/result',
    AuthRequestValidator.isAuthenticatedStudent,
    StudentController.result
)


router.get(
    '/logouts',
    StudentController.logout
)





module.exports=router;