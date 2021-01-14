//SALMA
const express=require('express');
const router= express.Router()
//const staff_model= require('../models/staffSchema')
const counters_model= require('../models/countersSchema')
const staffSched_model= require('../models/staffSchema').staffsched
const staff_model= require('../models/staffSchema').staff
const location_model= require('../models/locationSchema')
const faculty_model= require('../models/facultySchema')
const attendance_model= require('../models/attendanceSchema')
const token_blacklist= require('../models/token_blacklist')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


async function auth(req, res){
    console.log('authenticating')
   //  console.log(req)
    let is_blacklisted =true;
    try{
    let token_entry = await token_blacklist.findOne({token:req.headers.authorisation})
    console.log(token_entry);
    if (!token_entry){
    const result = jwt.decode(req.headers.authorisation, process.env.TOKEN_SECRET);
    // console.log(result);
    if(!result){
        return false;
    }  

    return result;}
    else{
        return false;
    }
}catch(err){
    console.log("damn auth man ")
}
}



async function getNextSequenceValue(sequenceName){
    const fields = await counters_model.countDocuments();
    console.log(fields);
    console.log("done");
    if (fields<2){
        var acid =await  new counters_model({
                name:"acid",
            sequence_value:0
        })
        acid.save()
        var hrid = await new counters_model({
            name:"hrid",
            sequence_value:0
        })
        hrid.save()
        }
        const res = await counters_model.findOne({name:sequenceName});
        const seq = res.sequence_value+1;
    // console.log(counters_model.findOne({name:sequenceName}));
    var sequenceDocument = await counters_model.updateOne({name:sequenceName},  
        {sequence_value:seq}, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Updated Docs : ", docs); 
            // return docs.sequence_value;
        } }
);
        // const res = await counters_model.findOne({name:sequenceName});
        // return res.sequence_value;
        return seq;
 }
 function valid_location_type(Lt){
     var ltt=Lt.toLowerCase().trim();
    if(ltt=='hall'||ltt=='office'||ltt=='lab'||ltt=='tutorial'){
        {return true;}
    }else{
        return false;
    }
 }
 router.route('/hr/addLocation')
.post(async (req, res)=>{
    const result = await auth(req,res);

    console.log(result);

    if(!result){
        return res.send({mess:"Authenication failed"})
    }
if (result.role1.toLowerCase().trim() == "hr"){
    try{
        
    if(!valid_location_type(req.body.location_type)){
        return res.send({mess:"please enter a valid location tybe 'hall',office'lab,tutorial"});
    }

    var newLoc = new location_model({
        id:req.body.location_id,
        type:req.body.location_type,
        capacity:req.body.capacity,
        
    })
    console.log(newLoc);
await newLoc.save()
res.send({mess:"success"} )

}catch(err){
    return res.send(err);
}}
else{
    return res.send({mess:"Only HR can add a location"})
}
});
router.route('/hr/updateLocation')
.post(async (req, res)=>{
    const result = await auth(req,res);
    console.log(result);
    if(!result){
        return res.send({mess:"Authenication failed"})
    }
    if (result.role1.toLowerCase().trim() == "hr"){
        try{
        
        var loc_result = await location_model.findOne({id:req.body.loc_id});
         console.log(loc_result);
          if (!loc_result){
        return res.send({mess:"This location does not exist"});
         }

         if (!req.body.location_type){
        if (!req.body.capacity){
            return res.send({mess:"please enter updated location info"})
        }else{
            var update = {capacity:req.body.capacity}
        }
        }else{
        
        if (!req.body.capacity){
            var update = {type:req.body.location_type}
        }else{
            
            var update = {type:req.body.location_type, capacity:req.body.capacity}
        }
     }

            await  location_model.updateOne({id:req.body.loc_id},  
        update, function (err0, docs) { 
        if (err0){ 
            return res.send(err0) 
        } 
        else{ 
           
        } 
        }); 

          var newLoc = await location_model.findOne({id:req.body.loc_id});
    res.send({mess:"success"})

}catch(err){
    return res.send(err)
}}
else{
    return res.send({mess:"Only HR can update a location"})
}
});
 
router.route('/hr/deleteLocation')
.post(async (req, res)=>{

    const result = await auth(req,res);

    console.log(result);

    if(!result){
        return res.send({mess:"Authenication failed"})
    }
    if (result.role1.toLowerCase().trim() == "hr"){

   var loc_result = await location_model.findOne({id:req.body.loc_id});
   
   console.log(loc_result);
   if (!loc_result){
       return res.send({mess:"This location does not exist"});
   }

    location_model.deleteOne({id:req.body.loc_id}, function (err, docs) { 
        if (err){ 
            return res.send(err) 
        } 
        else{ 
            console.log("Updated Docs : ", docs); 
        } 
    }); 

res.send({mess: "success"})}
else{
    return res.send("Only HR can delete a location")
}
});
 
function ValidateEmail(mail) 
{
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(mail.match(mailformat))
    {    return true;    }
    else    {    return false;    }
    }

  //  /HR/Instructor/TA
function ValidateRole1(role1){
       if(role1.toLowerCase().trim()!='hr'||role1.toLowerCase().trim()!='instructor'||role1.toLowerCase().trim()!='ta')
       {return true;}
       else{
           return false;
       }
}
//HOD/Coordinator
function ValidateRole2(role2){
    if(role2.toLowerCase().trim()!='hod'||role2.toLowerCase().trim()!='coordinator')
    {return true;}
    else{
        return false;
    }
}

router.route('/hr/addStaff')
.post(async (req, res)=>{
    const result = await auth(req,res);

    console.log(result);

    if(!result){
        return res.send({mess:"Authenication failed"})
    }
if (result.role1.toLowerCase().trim() == "hr"){
        const salt = await bcrypt.genSalt(10); //10 ->>computational cost: hashing 2^10 times over
    const newPassword = await bcrypt.hash("123456",salt)

    if (!req.body.email){
        return res.send({mess:"must add email"})
    }
    if (!ValidateEmail(req.body.email)){
        return res.send({mess:"email must be in format: somename@abc.xyz"})
    }
    if (!req.body.salary){
        return res.send({mess:"must add salary"});
    }
    if (!req.body.office_location){
        return res.send({mess:"must add office location"});
    }
    var office = await location_model.findOne({id:req.body.office_location});
    if(!office){
        return res.send({mess:"this office does not exist. please select another"});
    }
    if(office.type!="office")
    return res.send({mess:"this  is Location is not an office. please select an office location"});
    if (office.taken>=office.capacity){
        return res.send({mess:"this office is full. please select another"});
    }
   
    if (!req.body.role1){
        return res.send({mess:"must add role1"});
    }
    if(!ValidateRole1(req.body.role1)){
        return res.send({mess:"must specify role: hr/instructor/ta"});
    
    }
    if(req.body.gender==null){
        return res.send("must add gender");
    }
    if(!req.body.gender instanceof Boolean)
{
    return res.send({mess:"must add valid format for gender: true for female, false for male"});
}


    if (req.body.role1.toLowerCase().trim() =="hr"){
        var hri = await getNextSequenceValue('hrid')
        // staff_model.countDocuments({id: {$regex:/^hr/ }})+1;
        var newUser = new staff_model({
        
            id:"hr-"+ hri,
            name : req.body.name,
            email : req.body.email,
            salary: req.body.salary,
            missing_hours : 0,
            first_login:true,
            gender: req.body.gender,
            office_location:req.body.office_location,
            leave_balance:2.5,
            day_off:"saturday",
            password: newPassword,
            role1: req.body.role1.toLowerCase().trim(),
            
        })
        var curr_id = "hr-"+hri;  //getting id
           
        var newrec = new attendance_model({staff_id:curr_id}) 
        try {
            newrec.save();
            console.log(newrec);
        } catch (error) {
            return res.write(error)
        }
    }else{

        if (!req.body.faculty){
            return res.send({mess:"must specify faculty"});
        }
        var fac = await faculty_model.findOne({name:req.body.faculty});
        if(!fac){return res.send({mess:"A faculty with that name does not exist"});}
        if (!req.body.dept_id){
            return res.send({mess:"must specify department"});
        }
        var depfound = false;
        fac.departments.forEach(dep => {
            if (dep.id == req.body.dept_id){
                depfound=true;
            }
        });
        if (!depfound){
            return res.send({mess:"department id not found within given faculty"})
        }

        if (!req.body.role2){
            var rolesecond = "";
        }else{
            if(!ValidateRole2(req.body.role2)){
                return res.send({mess:"must specify role2 to be in this format : HOD, Coordinator"});
            }
            else
            var rolesecond =req.body.role2.toLowerCase().trim();
        }

        var aci = await getNextSequenceValue('acid')
        // staff_model.countDocuments({id: {$regex:/^ac/ }})+1;
        var newUser = new staff_model({
        
            

            id:"ac-"+ aci,
            name : req.body.name,
            email : req.body.email,
            salary: req.body.salary,
            missing_hours : 0,
            first_login:true,
            gender: req.body.gender,
            office_location:req.body.office_location,
            leave_balance:2.5,
            password: newPassword,
            role1: req.body.role1.toLowerCase().trim(),
            faculty : req.body.faculty,
            department: req.body.dept_id, 
            role2: rolesecond.toLowerCase().trim(),
            schedule:new staffSched_model()
        })
        var curr_id = "ac-"+aci;  //getting id
           
        var newrec = new attendance_model({staff_id:curr_id}) //getting their attendance records
        try {
            newrec.save();
            console.log(newrec);
        } catch (error) {
            return res.send({mess:"error"})
        }
    }

    console.log(newUser);
    try {
        await newUser.save()
    } catch (error) {
        return res.send({mess:"error"}) 
    }
    

console.log("hod")
    if (req.body.role1.toLowerCase().trim()=="instructor"){
        if (rolesecond.toLowerCase().trim()=="hod"){
            fac.departments.forEach(async(dep) => { 
                console.log(dep);
                if (dep.id == req.body.dept_id){
                    dep.head_id="ac-"+aci;
                } 
            });
        }
    }
    fac.save();
    var new_taken = office.taken+1
    location_model.updateOne({id:req.body.office_location},  
        {taken : new_taken}, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Updated Docs : ", docs); 
        } 
    }); 

   
return res.send({mess:"added : "})}   
else{
    return res.send({mess:"Only HR can add a staff member"})
}

});

//SARAH

router.route('/hr/updatestaff')
.post(async (req, res)=>{
    const result = await auth(req,res);

    console.log(result);

    if(!result){
        return res.send({mess:"Authenication failed"})
    }

if (result.role1.toLowerCase().trim() == "hr"){


    var staff_member = await staff_model.findOne({id:req.body.id});
    console.log(staff_member);
    if (!staff_member){
        return res.send({mess:"This staff_memeber does not exist"});
    }

    if (!req.body.office_location){
        if (!req.body.role1){
            return res.send({mess:"please enter updated  role"})
        }else{
            if(!ValidateRole1(req.body.role1)){
                return res.send({mess:"must specify role: hr/instructor/ta"});
            }else
            var update = {role1:req.body.role1.toLowerCase().trim()}
        }
    }else{
        if(!req.body.role1){
            var office = await location_model.findOne({id:req.body.office_location});
            if(!office)
            return  res.send({mess:"this office does not exist"});
            else{
                var update = {office_location:req.body.office_location}
            }
        }{
            if(ValidateRole1(req.body.role1)){
                if(staff_member.role1==(req.body.role1.toLowerCase().trim())){
                    return  res.send({mess:"this memeber already has this role"});
                }
                else{
                    var office = await location_model.findOne({id:req.body.office_location});
                    if(!office){
                        var update = {role1:req.body.role1.toLowerCase().trim()}
                        return  res.send({mess:"this office does not exist"});
                    }else{
                        var update = {role1:req.body.role1.toLowerCase().trim(),office_location:req.body.office_location};
                    }
                }
            }else{
                if(!office){
                   
                    return  res.send({mess:"this office does not exist"});
                }else{
                    var update = {office_location:req.body.office_location};
                }
                return  res.send({mess:"this role1 is not valid"});
            }
        }
    }

    staff_model.updateOne({id:req.body.id},  
        update, function (err, docs) { 
        if (err){ 
            return res.send({mess:"err"}) 
        } 
        else{ 
            console.log({mess:"Updated Docs "}); 
        }
        
     
    }); 
    res.send("update successful")
}
    else{
        return res.send("Only HR can update a location")
    }
    });
  
////////////////////////////////////////////////////////
router.route('/hr/deletestaff')
.post(async (req, res)=>{

    const result = await auth(req,res);

    console.log(result);

    if(!result){
        return res.send({mes:"Authenication failed"})
    }
    if (result.role1.toLowerCase().trim() == "hr"){

   var staff_memeber = await staff_model.findOne({id:req.body.id});
   
   console.log(staff_memeber);
   if (!staff_memeber){
       return res.send({mess:"This staff_memeber does not exist"});
   }
 try{
   if(!(staff_memeber.role2.toLowerCase().trim() =="coordinator")){
  
try{ // delete staff record 
   attendance_model.deleteOne({staff_id:req.body.id}, function (err, docs) { 
    if (err){ 
        return res.send({mess:"err"}) 
    } 
    else{ 
        console.log("Updated Docs : ", docs); 
    } 
}); }
 catch(error) {
    return res.send({mess:"error"});
}
try{


//////NOT SURE YET

   if(staff_memeber.role2.toLowerCase().trim()=='HOD'){
    // assign a new HOD

const newHOD_id=0;
staff_model.forEach(staff=>{
    if(staff.department==dep){
        if(staff.role1=='Instructor'){
            newHOD_id=staff.id;
        }
    }
})
 
    
var faculty=faculty_model.findOne({name:staff_member.faculty_name});
var department_update_hod=faculty.department.forEach(dep=>{
    if(dep.id==staff_member.id){
        department_update_hod.head_id=newHOD_id;
    }


   })

   }
}catch(error) {
    return res.send({mess:"error HOD"});
}
try{
var faculty=faculty_model.findOne({name:staff_member.faculty});
var department=faculty.findOne({id:staff_member.department})
var courses=department.courses;

if(staff_member.role1=='Instructor'){

    staff_member.courses.forEach(staff_course=>{
       courses.forEach(faculty_course=>{
           if(staff_course==faculty_course.id){ // I found the course schema 
            for (var i = faculty_course.instructor_ids.length - 1; i > -1; i--) {
                if (array[i] == staff_member.id) {
                    array.splice(i, 1);
                }
            }
           }
       })
    })
    await courses.save();
    
    }
    
 if(staff_member.role1=='TA'){

        staff_member.courses.forEach(staff_course=>{
           courses.forEach(faculty_course=>{
               if(staff_course==faculty_course.id){ // I found the course schema 
                for (var i = faculty_course.academic_member_ids.length - 1; i > -1; i--) {
                    if (array[i] == staff_member.id) {
                        array.splice(i, 1);
                    }
                }
               }
           })
        })
        await courses.save();
        
     }
    }catch(err){
        return res.send({mess:"error 590"});

    }
        

staff_member.schedule.saturday.forEach(slot=>{
       courses.forEach(course=>{
        if(course.id.toLowerCase().trim()==slot.course_id.toLowerCase().trim()){
            course.course_schedule.forEach(s=>{
                if(s.day.toLowerCase().trim()=="saturday" && s.id == slot.id && s.type.toLowerCase().trim() == slot.type.toLowerCase().trim() && s.location_id == slot.location_id && s.group == slot.group &&s.taken==true)
                s.taken=false;
            })
           
        }
       })

})

staff_member.schedule.sunday.forEach(slot=>{
    courses.forEach(course=>{
        if(course.id.toLowerCase().trim()==slot.course_id.toLowerCase().trim()){
            course.course_schedule.forEach(s=>{
                if(s.day.toLowerCase().trim()=="sunday" && s.id == slot.id && s.type.toLowerCase().trim() == slot.type.toLowerCase().trim() && s.location_id == slot.location_id && s.group == slot.group &&s.taken==true)
                s.taken=false;
            })
           
        }
    })

})

staff_member.schedule.monday.forEach(slot=>{
    courses.forEach(course=>{
        if(course.id.toLowerCase().trim()==slot.course_id.toLowerCase().trim()){
            course.course_schedule.forEach(s=>{
                if(s.day.toLowerCase().trim()=="monday" && s.id == slot.id && s.type.toLowerCase().trim() == slot.type.toLowerCase().trim() && s.location_id == slot.location_id && s.group == slot.group &&s.taken==true)
                s.taken=false;
            })
           
        }
    })

})

staff_member.schedule.tuesday.forEach(slot=>{
    courses.forEach(course=>{
        if(course.id.toLowerCase().trim()==slot.course_id.toLowerCase().trim()){
            course.course_schedule.forEach(s=>{
                if(s.day.toLowerCase().trim()=="tuesday" && s.id == slot.id && s.type.toLowerCase().trim() == slot.type.toLowerCase().trim() && s.location_id == slot.location_id && s.group == slot.group &&s.taken==true)
                s.taken=false;
            })
           
        }
    })

})

staff_member.schedule.wednesday.forEach(slot=>{
    courses.forEach(course=>{
        if(course.id.toLowerCase().trim()==slot.course_id.toLowerCase().trim()){
            course.course_schedule.forEach(s=>{
                if(s.day.toLowerCase().trim()=="wednesday" && s.id == slot.id && s.type.toLowerCase().trim() == slot.type.toLowerCase().trim() && s.location_id == slot.location_id && s.group == slot.group &&s.taken==true)
                s.taken=false;
            })
           
        }
    })

})


staff_member.schedule.thursday.forEach(slot=>{
    courses.forEach(course=>{
        if(course.id.toLowerCase().trim()==slot.course_id.toLowerCase().trim()){
            course.course_schedule.forEach(s=>{
                if(s.day.toLowerCase().trim()=="thursday" && s.id == slot.id && s.type.toLowerCase().trim() == slot.type.toLowerCase().trim() && s.location_id == slot.location_id && s.group == slot.group &&s.taken==true)
                s.taken=false;
            })
           
        }
    })

})
 await courses.save();
 (await faculty).save();

 staff_model.deleteOne({id:req.body.id}, function (err, docs) { 
    if (err){ 
        return res.send({mess:"err out"}) 
    } 
    else{ 
        console.log("Updated Docs : ", docs); 
    } 
}); 

staff_model.save();

res.send("deleted : "+ staff_memeber)
   }else{
    return res.send({mess:"you can not delete Coordinator, assign a diffrenent  Coordinator first  "})
   }}catch(err){
    return res.send({mess:"error"});

   }
}
else{
    return res.send({mess:"Only HR can delete a staff memeber"})
}
});

router.route('/hr/addFaculty')
.post(async (req, res)=>{
    const result = await auth(req,res);

    console.log(result);
try{
    if(!result){
        return res.send({mess:"Authenication failed"})
    }

if (result.role1.toLowerCase().trim() == "hr"){
    try{

    if(!req.body.faculty_name){
        return res.send({mess:"you need to enter a faculty name  "})
    }
    
        var faculty= await faculty_model.findOne({name:req.body.faculty_name})
    if(faculty ){
        return res.send({mess:"this faculty already exsits "})
    }
    if(!req.body.dep_id){
        return res.send({mess:"you need to add a department id  "})

    }
    if(!req.body.dep_name){
        return res.send({mess:"you need to add a department name  "})
    }
    if(!req.body.head_id){
        return res.send({mess:"you need to enter the department head id "})
    }
    var staff_member = await staff_model.findOne({id:req.body.head_id});
    if (!staff_member){
        return res.send({mess:"This staff_memeber does not exist"});
    }

    if(!req.body.course_id){
        return res.send({mess:"you need to add a course id  "})
    }
   
    
    var faculty1=new faculty_model({
        name:req.body.faculty_name    })    
    var dep={ id:req.body.dep_id,
            name:req.body.dep_name,
            head_id:req.body.head_id,
            courses:[{id:req.body.course_id,coverage:1}]}
  
 faculty1.departments.push(dep);
    console.log(faculty1);
    
 await faculty1.save()

res.send({mess:"added "})
}catch(err){
    console.log(err)
    return res.send({mess:"error" })
}
}
else{
    return res.send({mess:"Only HR can add a faculty"})
}
}catch(err){
    return res.send({mess:"error" })
}
});

 router.route('/hr/updatefaculty')
.post(async (req, res)=>{

    const result = await auth(req,res);

    console.log(result);

    if(!result){
        return res.send({mess:"Authenication failed"})
    }
if (result.role1.toLowerCase().trim() == "hr"){
    if(!req.body.faculty_name)
         return res.send({mess:"Enter faculty name"});
    var faculty = await faculty_model.findOne({name:req.body.faculty_name});
    console.log(faculty);
    if (!faculty){
        return res.send({mess:"This faculty does not exist"});
    }else{

    if (!req.body.faculty_name_update){
            return res.send({mess:"please enter updated faculty  info"})
        }else{
            var update = {name:req.body.faculty_name_update}
        }
    
    }

  await  faculty_model.updateOne({name:req.body.faculty_name},  
        update, function (err, docs) { 
        if (err){ 
            return res.send(err) 
        } 
        else{ 
            console.log("Updated Docs : ", docs); 
        } 
    }); 

    var newFac = await faculty_model.findOne({name:req.body.faculty_name_update});
res.send({mess:"updated "})}
else{
    return res.send({mess:"Only HR can update a faculty "})
}
});

router.route('/hr/deleteFaculty')
.post(async (req, res)=>{

    const result = await auth(req,res);

    console.log(result);

    if(!result){
        return res.send({mess:"Authenication failed"})
    }
if (result.role1.toLowerCase().trim() == "hr"){
    if(!req.body.faculty_name){
        return res.send({mess:"please enter faculty name "})
    }
   var faculty = await faculty_model.findOne({name:req.body.faculty_name});
   
   console.log(faculty);
   if (!faculty){
       return res.send({mess:"This faculty does not exist"});
   }

  await faculty_model.deleteOne({name:req.body.faculty_name}, function (err, docs) { 
        if (err){ 
            return res.send({mess:"err"}) 
        } 
        else{ 
            console.log("Updated Docs : ", docs); 
        } 
    }); 

res.send({mess:"deleted "})}
else{
    return res.send({mess:"Only HR can delete a faculty"})
}
});
 
router.route('/hr/adddepartment')
.post(async (req, res)=>{
    const result = await auth(req,res);

    console.log(result);

    if(!result){
        return res.send({mess:"Authenication failed"})
    }
if (result.role1.toLowerCase().trim() == "hr"){
    if(!req.body.faculty_name){
        return res.send({mess:"please enter the  faculty name "})
    }
    var faculty= await faculty_model.findOne({name:req.body.faculty_name})
    if(!faculty){
        return res.send({mess:"This faculty does not exist"});   
    }else{
        if(!req.body.id)
        return res.send({mess:"please enter the  department id "})
        if(!req.body.name)
        return res.send({mess:"please enter the  department name "})
        if(!req.body.course_id)
        return res.send({mess:"please enter  one  course id in this department"})

        var department=({
            id:req.body.id,
            name:req.body.name,
            courses:[{id:req.body.course_id}]
        })
        faculty.departments.push(department);
    }

    console.log(faculty);
await faculty.save()
var department = faculty.departments.find(dep=>{
    if(dep.id==req.body.id)
    return dep;

})
res.send({mess:"added : "})}
else{
    return res.send({mess:"Only HR can add a department"})
}
});

router.route('/hr/updateDepartment')
.post(async (req, res)=>{

    const result = await auth(req,res);

    console.log(result);

    if(!result){
        return res.send("Authenication failed")
    }
if (result.role1.toLowerCase().trim() == "hr"){
   
    if(!req.body.faculty_name){
        return res.send({mess:"please enter the  faculty name "})
    }
    var headexists = await staff_model.findOne({id:req.body.head_id})
    var faculty = await faculty_model.findOne({name:req.body.faculty_name});
    if (!faculty){
        return res.send({mess:"This faculty does not exist"});
    }else{
        depfound=false;
     faculty.departments.forEach((dep) => { 
        if (dep.id.toLowerCase().trim() == req.body.dep_id.toLowerCase().trim()){
            depfound=true;
            console.log(req.body.dep_id.toLowerCase().trim());
            console.log(req.body.name);
            console.log(req.body.head_id);
            if (!req.body.name){
                if (!req.body.head_id){
                    return res.send({mess:"please enter updated department info"})
                }else{

                   
                    if (!headexists){
                        return res.send({mess:"this staff member does not exist"});
                    }
                    if (headexists.role1.toLowerCase().trim() !== "instructor"){
                        return res.send({mess:"this staff member is not an instructor"});
                    }
                    console.log("valid head")
                    dep.head_id=req.body.head_id
                }
                }
            else{
                if (!req.body.head_id){
                   dep.name=req.body.name;
                }else{
                    
                    console.log("staff new head" + headexists)
                    if (!headexists){
                        return res.send({mess:"this staff member does not exist"});
                    }
                    if (headexists.role1.toLowerCase().trim() !== "instructor"){
                        return res.send({mess:"this staff member is not an instructor"});
                    }
                    dep.name=req.body.name;
                     dep.head_id=req.body.head_id;
                }
            }


        } 
    })
            if (depfound){
                    try{faculty.save();
                        
                    }catch(err){
                        console.log(err)}                
                    
                res.send({mess:"updated "})
                }
                else{
                    res.send({mess:"department not found"})
                }
    // await faculty.departments.push(dep); 
    
    

    }
}
else{
    return res.send("Only HR can update a department")
}
});

router.route('/hr/deleteDepartment')
.post(async (req, res)=>{

    const result = await auth(req,res);

    console.log(result);
    if(!result){
        return res.send({mess:"Authenication failed"})
    }
if (result.role1.toLowerCase().trim() == "hr"){
    if(!req.body.faculty_name){
        return res.send({mess:"please enter the  faculty name "})
    }
   var faculty = await faculty_model.findOne({name:req.body.faculty_name});
   
   console.log(faculty);
   if (!faculty){
       return res.send({mess:"This faculty does not exist"});
   }
   if(!req.body.dep_id){
    return res.send({mess:"please enter the  department id "})
   }
   var department= faculty.departments.find(function (elem){return elem.id==req.body.dep_id})

      if(!department)
   return res.send({mess:"This department does not exist"})
  
      
        for(var i=(faculty.departments).length-1;i>-1;i--){
            if( (faculty.departments)[i].id==req.body.dep_id){
                console.log((faculty.departments)[i].id)
                faculty.departments.splice(i,1);
               
                break;
            }
        }

    await faculty.save();

res.send({mess:"deleted "})}
else{
    return res.send({mess:"Only HR can delete a department"})
}
});
 
router.route('/hr/addCourse')
.post(async (req, res)=>{
    const result = await auth(req,res);

    console.log(result);

    if(!result){
        return res.send({mess:"Authenication failed"})
    }
if (result.role1.toLowerCase().trim() == "hr"){
    try{
        if(!req.body.faculty_name){
            return res.send({mess:"please enter the  faculty name "})
        }
    var faculty= await  faculty_model.findOne({name:req.body.faculty_name})
    if(!faculty)
        return res.send({mess:"This faculty does not exist"});   
        var department=await (faculty.departments).find(function (elem){return elem.id==req.body.dep_id})   
        if(!department)
        return res.send({mess:"This department does not exist"});  
        if(await (department.courses.find(elem=>(elem.id==req.body.id))))
        return res.send({mess:"This course already  exist"});  

       
            var course={
                id:req.body.id,
                credit_hours:req.body.credit_hours,
                instructor_ids:[],
                academic_member_ids:[],
                coordinator_id:"",
              coverage:req.body.coverage

            }
      department.courses.push(course);
      await faculty.save();
      var course=faculty.departments.find(dep=>{
          if(dep.id==req.body.dep_id)
          return dep.courses.find(elem=>(elem.id==req.body.id))

      })
        
res.send({mess:"added"})
}catch(err){
    console.log(err)
}

}
else{
    return res.send("Only HR can add a course")
}
});
 


router.route('/hr/updatecourse')
.post(async (req, res)=>{

    const result = await auth(req,res);

    console.log(result);

    if(!result){
        return res.send({mess:"Authenication failed"})
    }
    try{
if (result.role1.toLowerCase().trim() == "hr"){
    if(!req.body.faculty_name){
        return res.send({mess:"please enter the  faculty name "})
    }
    var faculty = await faculty_model.findOne({name:req.body.faculty_name});
   // console.log(faculty);
    if (!faculty){
        return res.send({mess:"This faculty does not exist"});
    }else{
        if(!req.body.dep_id)
        return res.send({mess:"enter department id"});
     var dep=await faculty.departments.find(function (elem){return elem.id==req.body.dep_id})   
    // console.log("HIIIIIIIIIIIIIIIII"+dep);
     if(!dep)
     return res.send({mess:"This department does not exist"});
else{
    if(!req.body.course_id)
    return res.send({mess:"enter course id"});
    var course=await dep.courses.find(function (elem){return elem.id==req.body.course_id})   
        if(!course)
        return res.send("This course does not exist");
        else{
           
                if(!req.body.credit_hours){
                return res.send({mess:"please enter updated location info (credit hours)"})
                }else{
                    course.credit_hours=req.body.credit_hours
                }

            
        var course=await faculty.departments.find(dep=>{
        if(dep.id==req.body.dep_id)
            return dep.courses.find(elem=>(elem.id==req.body.course_id))
             })
             await faculty.save();
res.send({mess:"updated"})
}}}}
else{
    return res.send({mess:"Only HR can update a course"})
}
    }catch(err){
        console.log(err);
    }





});

router.route('/hr/deletecourse')
.post(async (req, res)=>{

    const result = await auth(req,res);

    console.log(result);
    try{
    if(!result){
        return res.send({mess:"Authenication failed :P"})
    }
   
if (result.role1.toLowerCase().trim() == "hr"){
    try{
    if(!req.body.faculty_name){
        return res.send({mess:"please enter the  faculty name "})
    }
   var faculty = await faculty_model.findOne({name:req.body.faculty_name});
   
 console.log("KABB000"+faculty);
   if (!faculty){
       return res.send({mess:"This faculty does not exist"});
   }
   if(!req.body.dep_id){
    return res.send({mess:"please enter the  department id "})
}
   var department= faculty.departments.find(function (elem){return elem.id==req.body.dep_id})
   if(!department)
   return res.send({mess:"This department does not exist"});
   else{
       if(!req.body.course_id)
       return res.send({mess:"please enter the  course id "})

       var course= department.courses.find(function (elem){return elem.id==req.body.course_id})
       if(!course){
        return res.send({mess:"This course does not exist"});
       }
       else{
        for(var i=(department.courses).length-1;i>-1;i--){
            if( (department.courses)[i].id==req.body.course_id){
               // console.log((department.courses)[i].id)
               department.courses.splice(i,1);
                break;
            }
        }

       }
   }
   await faculty.save();
  

        res.send({mess:"deleted "})
}catch(err){
    return res.send({mess:"err"})}
}
else{
    return res.send({mess:"Only HR can delete a course"})
}
    }catch(err){
console.log("error")
    }


});
 

router.route('/hr/addmissingSignIn')
.post(async (req, res)=>{
    const result = await auth(req,res);

    console.log(result);

    if(!result){
        return res.send({mess:"Authenication failed"})
    }
if (result.role1.toLowerCase().trim() == "hr"){
if(req.body.id==result.id){
    return res.send({mess:"can't do this to an Hr staff memeber "})
}else{

    if(!req.body.signIn){
        return res.send({mess:"please enter a signin and signout"})
    }else{
        
      if(!req.body.signIn instanceof Date)
    return res.send({mess:"please enter a valid format for signin "})
     
     else{
        var att=await attendance_model.findOne({staff_id:req.body.id});
            var signin_body=new Date(req.body.signIn);

            var year=signin_body.getYear();
            var month=signin_body.getMonth();
            var day=signin_body.getDay();

            console.log(att)

            att.attendance.forEach(rec=>{
                if(rec.day.getYear()==(year)&&rec.day.getMonth()==(month)&&rec.day.getDay()==(day)){
                    var signs=rec.signs;
                    for(var i=0;i<signs.length;i++){
                        if(signs[i].signOut>signin_body){
                            try{
                            signs[i].signIn=signin_body;
                            rec.missing_hours-=(signs[i].signOut-signs[i].signIn)/1000
                            return res.send({mess:"update successful"})
                            break;
                            }catch(error){
                                return res.send({mess:"error"});
                            }
                        }

                    }
                   
                }
            })

    //  await  signs.save();
    await att.save();
     }
      }
    
   

}
}

else{
    return res.send({mess:"Only HR can add a missing sign in"})
}
});

router.route('/hr/addmissingSignOut')
.post(async (req, res)=>{
    const result = await auth(req,res);

    console.log(result);

    if(!result){
        return res.send({mess:"Authenication failed"})
    }
if (result.role1.toLowerCase().trim() == "hr"){
if(req.body.id==result.id){
    return res.send({mess:"can't do this to an Hr staff memeber "})
}else{

    if(!req.body.signOut){
        return res.send({mess:"please enter a signout"})
    }else{
        
      
        if(!req.body.signOut instanceof Date)
     return res.send({mess:"please enter a valid format for signout "})
     else{
        var att=await attendance_model.findOne({staff_id:req.body.id});
            var signout_body=new Date(req.body.signOut);

            var year=signout_body.getYear();
            var month=signout_body.getMonth();
            var day=signout_body.getDay();
            att.attendance.forEach(rec=>{
                if(rec.day.getYear()==(year)&&rec.day.getMonth()==(month)&&rec.day.getDay()==(day)){
                    var signs=rec.signs;
                   
                    for(var i=signs.length-1;i>-1;i--){
                        if(signs[i].signIn<signout_body){
                            try{
                                signs[i].signOut=signout_body;
                                rec.missing_hours-=(signs[i].signOut-signs[i].signIn)/1000
                                return res.send({mess:"update successful"})
                                break;
                                }catch(error){
                                    return res.send({mess:"error"});
                                }
                        }
                        
                    }
                }
            })





       
//    await signs.save(); 
    await att.save();
     }
      
   
   

}
}
}
else{
    return res.send({mess:"Only HR can add a missing sign out"})
}
});


router.route('/hr/viewattendanceRec')
.post(async (req, res)=>{
    const result = await auth(req,res);
    try{
    if(!result){
        return res.send({mess:"Authenication failed"})
    }
if (result.role1.toLowerCase().trim() == "hr"){
    var att=await attendance_model.findOne({staff_id:req.body.id});
    return res.send({att:att.attendance});

}
else{
    return res.send({mess:"Only HR can view attendance record"})
}
}catch(err){
console.log("err")
}
});

router.route('/hr/updateSalary')
.post(async (req, res)=>{
    const result = await auth(req,res);

    console.log(result);

    if(!result){
        return res.send({mess:"Authenication failed"})
    }
if (result.role1.toLowerCase().trim() == "hr"){
    
    var sal=req.body.salary;

    if(!isNaN(sal)){  
        var update={salary:sal};
    var staff=staff_model.updateOne({id:req.body.id},  
        update, function (err, docs) { 
        if (err){ 
            return res.send(err) 
        } 
        else{ 
            console.log("Updated Docs : ", docs); 
        } 
    }); }else{
        return res.send({mess:"salary must be a number"});
    }
res.send({mess:"salary updated successfully"})

}
else{
    return res.send({mess:"Only HR can update salary "})
}
});
function checkGUCMonth(recdate, date){
    let month = recdate.getMonth();
    let year = recdate.getYear();
    let day = recdate.getDate()
    console.log("day"+day)
    console.log(recdate.getMonth()+"months"+date.getMonth())
    console.log(recdate.getFullYear()+"months"+date.getFullYear())
    if (day>=11){
        month+=1
    }
    if(date.getMonth()==month-1 & date.getYear()>=year-1 & day>10){
        return true;
    }
    if(date.getMonth()==month & date.getYear()==year & day<=10){
        return true;
    }
    
    return false;
    }

router.route('/hr/viewStaffmemberMissinghours')
.post(async (req, res)=>{
    const result = await auth(req,res);

    console.log(result);

    if(!result){
        return res.send({mess:"Authenication failed"})
    }
if (result.role1.toLowerCase().trim() == "hr"){
 var show=[];
 var tim = new Date(Date.now());

 const attendance_cursor = attendance_model.find().cursor();
 for (let att = await attendance_cursor.next(); att != null; att = await attendance_cursor.next()){
         
console.log(att)
    att.attendance.forEach(rec=>{
        if (rec.status=="attended" & checkGUCMonth(rec.day, tim ) & rec.missing_hours>0){
                    show.push(att.staff_id)
                }
    })

 }
if(show.length>0){
    let show2 = [...new Set(show)];

    return res.send({att:show2})}else{
    return res.send({mess:"no staff members with missing hours"})
}



}
else{
    return res.send({mess:"Only HR can view missing hours "})
}
});


router.route('/hr/viewStaffmemberMissingdays')
.post(async (req, res)=>{
    const result = await auth(req,res);

    console.log(result);

    if(!result){
        return res.send({mess:"Authenication failed"})
    }
if (result.role1.toLowerCase().trim() == "hr"){
 var show=[];
 var tim = new Date(Date.now());

 const attendance_cursor = attendance_model.find().cursor();
 for (let att = await attendance_cursor.next(); att != null; att = await attendance_cursor.next()){
         
console.log(att)
    att.attendance.forEach(rec=>{
        if (rec.status.toLowerCase().trim()=="missing" & checkGUCMonth(rec.day, tim ) ){
                    show.push(att.staff_id)
                }
    })

 }
if(show.length>0){

let show2 = [...new Set(show)];

    return res.send({att:show2})
}else{
    return res.send({mess:"no staff members with missing days"})
}



}
else{
    return res.send("Only HR can view missing days ")
}
});
       
module.exports =router;
