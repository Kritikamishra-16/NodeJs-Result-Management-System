const {Teacher}= require('../models/index');

class TeacherRepository{
    async create(data){
        try{
            const user= await Teacher.create(data);
            return user;
        }catch(error){
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }
    async destroy(userId){
        try{
            await Teacher.destroy({ 
                where:{
                    id: userId
                }
            });
            return true;
        }catch(error){
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async getById(userId){
        try{
            const user= await Teacher.findByPk(userId, {
                attributes: ['email', 'id'] //only these two attributes we are hgoing to return from this api result
            });
            return user;
        }catch(error){
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async getUserByEmail(userEmail){
        try{
            const user=await Teacher.findOne({
                where:{
                    email:userEmail
                }
            });
            return user;
        }catch(error){
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    

}

module.exports=TeacherRepository;