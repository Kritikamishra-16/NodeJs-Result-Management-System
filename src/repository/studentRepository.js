const {Student}= require('../models/index');

class StudentRepository{
    async create(data){
        try{
            const student = await Student.create(data);
            return student;
        }catch(error){
            console.log("Something went wrong in the student repository");
            throw {error};
        }
    }
    async getAll(){
        try{
            const students=await Student.findAll();
            return students;
        }catch(error){
            console.log("Something went wrong in the student repository");
            throw {error};
        }
    }

    async findByRollNumberAndDOB(st_rollnumber,st_dob){
        console.log(st_rollnumber,st_dob)
        try{
            const student= await Student.findOne({
                where:{
                    rollnumber: st_rollnumber,
                    dob: st_dob
                }
            });
            return student;
        }catch(error){
            console.log("Something went wrong in the student repository");
            throw {error};
        }

    }

    async update(studentId, data){
        try{
            const student= await Student.update(data,{
                where:{
                    id:studentId
                }
            });
            console.log(student);
            return student;
        }catch(error){
            console.log("Something went wrong in the student repository");
            throw {error};
        }

    }
    async destroy(studentId){
        try{
            await Student.destroy({
                where:{
                    id:studentId
                }
            });
            return true;
        }catch(error){
            console.log("Something went wrong in the student repository");
            throw {error};
        }

    }

    async get(studentId){
        try{
            const student=await Student.findByPk(studentId);
            return student;
        }catch(error){
            console.log("Something went wrong in the student repository");
            throw {error};
        }

    }
}

module.exports= StudentRepository;