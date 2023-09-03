const StudentRepository= require('../repository/studentRepository');
const jwt= require('jsonwebtoken');
const {JWT_KEY}= require('../config/serverConfig');

class StudentService{
    constructor(){
        this.studentRepository= new StudentRepository();
    }
    async create (data){
        try{       
            const student= await this.studentRepository.create(data);
            return student;
        }catch(error){
            console.log("Something went wrong in the service layer");
            throw {error}
        }
    }

    async getAll(){
        try{       
            const response= await this.studentRepository.getAll();
            return response;
        }catch(error){
            console.log("Something went wrong in the service layer");
            throw {error}
        }
    }


    async findByRollNumberAndDOB(rollnumber,dob){
        console.log(rollnumber);
        try{       
            const student= await this.studentRepository.findByRollNumberAndDOB(rollnumber,dob);
            return student;
        }catch(error){
            console.log("Something went wrong in the service layer");
            throw {error}
        }
    }

    async update (studentId,data){
        try{       
            const student= await this.studentRepository.update(studentId,data);
            return student;
        }catch(error){
            console.log("Something went wrong in the service layer");
            throw {error}
        }
    }

    async destroy (studentId){
        try{       
            const response= await this.studentRepository.destroy(studentId);
            return response;
        }catch(error){
            console.log("Something went wrong in the service layer");
            throw {error}
        }
    }

    async get(studentId){
        try{       
            const student= await this.studentRepository.get(studentId);
            return student;
        }catch(error){
            console.log("Something went wrong in the service layer");
            throw {error}
        }
    }

    async isAuthenticated(token){
        try{
            const response= this.verifyToken(token);
            if(!response)
            {
                throw {error: 'Invalid token'};
            }
            const student= this.studentRepository.get(response.id);
            if(!student)
            {
                throw {error: 'No student with the corresponding token exist'};
            }
            return student;
        }catch(error){
            console.log("Something went wrong in token creation");
            throw error;
        }
    }

    createToken(user){
        try{
            const result= jwt.sign(user, JWT_KEY, {expiresIn: '1d'} );
            return result;
        }catch(error){
            console.log("Something went wrong in token creation");
            throw error;
        }
    }
    
    verifyToken(token){
        try{
             //if verify correctly it will return the same user object 
             //using which token is created along with iat(issued at) and exp(expiry at)
            const response= jwt.verify(token,JWT_KEY);
            return response;
        }catch(error){
            console.log("Something went wrong in token validation", error);
            throw error;
        }
    }
}

module.exports=StudentService;