const TeacherRepository= require('../repository/teacherRepository');
const jwt= require('jsonwebtoken');
const {JWT_KEY}= require('../config/serverConfig');
const bcrypt= require('bcrypt');

class UserService{
    constructor(){
        this.teacherRepository= new TeacherRepository();
    }

    async create (data){
        try{       
            const user= await this.teacherRepository.create(data);
            return user;
        }catch(error){
            console.log("SOmething went wrong in the service layer");
            throw {error}
        }
    }

    async signIn(email,plainPassword){
        try{
            //Step1. fetch the user using the email
            const user= await this.teacherRepository.getUserByEmail(email);
            if(!user){
                console.log("email doesnot exist");
                throw {error};
            }

            //step2. compare incoming plain pass with stored encrypted pass
            const passwordsMatch= this.checkPassword(plainPassword,user.password);
            
            if(!passwordsMatch){
                console.log("Password dosen't match");
                throw {error: 'Incorrect Password'};
            }

            //step3. Create a token and send as response to the user
            const newJWT= this.createToken({
                email: user.email,
                id:user.id
            });
            return newJWT;

        }catch(error){
            console.log("Something went wrong in the signIn process");
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
            const user= this.teacherRepository.getById(response.id);
            if(!user)
            {
                throw {error: 'No user with the corresponding token exist'};
            }
            return user;
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

    checkPassword(userInputPassword, encryptedPassword){
        try{
            return bcrypt.compareSync(userInputPassword, encryptedPassword);
        }catch(error){
            console.log("Something went wrong in password comparison");
            throw error;
        }
    }

    
}

module.exports= UserService;