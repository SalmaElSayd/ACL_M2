const express=require('express');
const router= express.Router()
const staff_model= require('../models/staffSchema').staff
const counters_model= require('../models/countersSchema')
const location_model= require('../models/locationSchema')
const faculty_model= require('../models/facultySchema')
const attendance_model= require('../models/attendanceSchema')
const token_blacklist= require('../models/token_blacklist')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
// console.log(counters_model);

async function auth(req, res){
    console.log('authenticating')
    console.log(req.headers)
    let is_blacklisted =true;
    let token_entry = await token_blacklist.findOne({token:req.headers.authorisation})
    console.log(token_entry);
    if (!token_entry){
    const result = jwt.decode(req.headers.authorisation, process.env.TOKEN_SECRET);
    console.log(result);
    if(!result){
        return false;
    }  

    return result;}
    else{
        return false;
    }
}


async function getNextSequenceValue(sequenceName){
    const fields = await counters_model.countDocuments();
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

// router.route('/register')
// .post(async (req, res)=>{
//     console.log('here')
//     const salt = await bcrypt.genSalt(10); //10 ->>computational cost: hashing 2^10 times over
//     const newPassword = await bcrypt.hash("123456",salt)

//     if (req.body.role1 =="hr"){
//         const hri = await getNextSequenceValue('hrid')
//         // staff_model.countDocuments({id: {$regex:/^hr/ }})+1;
//         var newUser = new staff_model({
        
//             id:"hr-"+ hri,
//             name : req.body.name,
//             email : req.body.email,
//             recovery_email:req.body.email,
//             salary: req.body.salary,
//             missing_hours : 100,
//             first_login:true,
//             signIn:"",
//             office_location:req.body.office_location,
//             leave_balance:2.5,
//             password: newPassword,
//             role1: req.body.role1
//         })
//     }else{
//         const aci = await getNextSequenceValue('acid')
//         // staff_model.countDocuments({id: {$regex:/^ac/ }})+1;
//         var newUser = new staff_model({
        
//             id:"ac-"+ aci,
//             name : req.body.name,
//             email : req.body.email,
//             recovery_email:req.body.email,
//             salary: req.body.salary,
//             missing_hours : 100,
//             first_login:true,
//             office_location:req.body.office_location,
//             leave_balance:2.5,
//             password: newPassword,
//             role1: req.body.role1
//         })
//     }
    

//     console.log(newUser);
//     await newUser.save()
//     res.send()
// })

router.route('/getRoles')
.get(async (req, res)=>{

    const result = await auth(req,res);


    console.log(result);

    if(!result){
        return res.send({message:"Authenication failed"})
    }
    const profile  = await staff_model.findOne({id:result.id});

    
    if(!profile){
        return res.send({message:"This account does not exist"})
    }
    else{
        role1=profile.role1;
        role2=profile.role2;

         res.send({role1 :role1, role2:role2});
    }

});

router.route('/salary')
.get(async (req,res)=>{
    const result = await auth(req,res);


    console.log(result);

    if(!result){
        return res.send({message:"Authenication failed"})
    }
    const profile  = await staff_model.findOne({id:result.id});

    
    if(!profile){
        return res.send({message:"This account does not exist"})
    }
    else{
        salary=profile.salary;

         res.send({salary:salary});
    }

});

router.route('/login')
.post(async (req, res)=>{
    console.log("log in")
    if (!req.body.email | !req.body.password){
        return res.send({message: "Please enter email and password to login"});
    }


    const result  = await staff_model.findOne({email: req.body.email});
    if(!result){
        return res.send({message:"You need to sign up first"})
    }
    console.log(result);
    try{
        var correctPass = await bcrypt.compare(req.body.password, result.password)
    }catch(error){
        return res.send(error)
    }
    
    if(correctPass){
        const profile  = await staff_model.findOne({id:result.id});
        console.log(profile.first_login)

        if (profile.first_login){
            console.log("first login")
            console.log("new_password  "+req.body.newPassword)
            const salt = await bcrypt.genSalt(10); //10 ->>computational cost: hashing 2^10 times over
            if (!req.body.newPassword){
                return res.send({message: "please enter new password",
            first:true})
            }
            const newPassword = await bcrypt.hash(req.body.newPassword,salt)
        
          
        try{
            await staff_model.updateOne({id:result.id},  
                {first_login: false, password: newPassword});
            }catch(error){
                return res.send(error)
            }
        
        }

        const token = jwt.sign({id:result.id, role1:result.role1}, process.env.TOKEN_SECRET)
        res.setHeader('Access-Control-Allow-Origin', '*')
        console.log(token)
        res.send({t: token})
    }
    else{
         res.send({message:"Incorrect password "})
    }
});

router.route('/logout')
.post(async(req,res)=>{
    var token_dead = new token_blacklist({
        token:req.headers.authorisation
    });
    try{
    await token_dead.save();}
    catch(error){
        return res.send(error);
    }
        
    res.send({message:'logout successful'});
    // window.location.replace('/index.html');

});

router.route('/myProfile')
.get(async (req, res)=>{

    const result = await auth(req,res);


    console.log(result);

    if(!result){
        return res.send({message:"Authenication failed"})
    }
    const profile  = await staff_model.findOne({id:result.id});

    
    if(!profile){
        return res.send({message:"This account does not exist"})
    }
    else{
        const prof ={
            name:  profile.name,
            email: profile.email,
            day_off: profile.day_off ,
            salary:  profile.salary ,
            missing_hours:  profile.missing_hours,
            office:profile.office_location,
            leave_balance: profile.leave_balance,
            schedule:  profile.schedule,
            information: profile.info
        } 

         res.send({profile :prof});
    }
});

function ValidateEmail(mail) 
{
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(mail.match(mailformat))
    {    return true;    }
    else    {    return false;    }
    }

router.route('/updateProfile')
.post(async (req, res)=>{
    const result =await auth(req,res);

    console.log(result);

    if(!result){
        return res.send({message:"Authentication failed"})
    }
    const profile  = await staff_model.findOne({id:result.id});
    console.log("info           "+req.body.info);
    if(!profile){
        return res.send({message:"This account does not exist"})
    }
    else{
        try {
            var staffDocument = await staff_model.updateOne({id: result.id},  
                {info:req.body.info})
        } catch (error) {
            return res.send({message: "An error occured please try again.", error :error})
        }
        
    }
    var upd = await staff_model.findOne({id:result.id});
    res.send({new_profile: upd.info, message:"update successful"});
});

router.route('/resetPassword')
.post(async (req, res)=>{

    const result = await auth(req,res);

    if(!result){
        return res.send({message :"Authentication failed"})
    }
    if (!req.body.password){
        return res.send({message :'Please enter new password'})
    }
    console.log(req.body.password)
    const salt = await bcrypt.genSalt(10); //10 ->>computational cost: hashing 2^10 times over
    const newPassword = await bcrypt.hash(req.body.password,salt)

  console.log(result.id)
try {
    await staff_model.updateOne({id:result.id},  
       {$set: {password : newPassword}}); 
        console.log(newPassword)

} catch (error) {
    return res.send( {message: "An error occured please try again.", error:error});
}
    
    res.send({message: "password reset done"});
});



router.route('/signIn')
.post(async (req, res)=>{

    const result = await auth(req,res);
console.log(result)
    if(!result){
        return res.send({message:"Authentication failed"})
    }
    var tim = new Date();
    console.log("time " +tim+ "   "+tim.getMonth());

    if (tim.getHours()<7){
        tim.setHours(7)
        tim.setMinutes(00)
    }
    if(tim.getHours()>19){
        tim.setHours(19)
        tim.setMinutes(0)
    }
    console.log(tim.getHours());
    var found =false;
    var attendance_today = await attendance_model.findOne({staff_id:result.id});
    attendance_today.attendance.forEach(record => {
        if ( record.day.getMonth()==tim.getMonth() &
        record.day.getYear()==tim.getYear() & 
        record.day.getDay()==tim.getDay()){
            record.signs.push({signIn:tim, signOut:null})
            found =true;
        }
    });


    if (!found){
        await attendance_today.attendance.push({day:tim,status:"attended", signs:[{signIn:tim, signOut:null}] })

    }
    attendance_today.save();
    res.send({time:tim})
});

router.route('/signOut')
.post(async (req, res)=>{

    const result = await auth(req,res);
    
    if(!result){
        return res.send("Authentication failed")
    }
    var tim = new Date();
    if (tim.getHours()<7){
        tim.setHours(7)
        tim.setMinutes(0)
    }
    if (tim.getHours()>19){
        tim.setHours(19)
        tim.setMinutes(0)
    }
    var found =false;
    var attendance_today = await attendance_model.findOne({staff_id:result.id});
    attendance_today.attendance.forEach(record => {
        if (record.day.getMonth()==tim.getMonth() &
        record.day.getYear()==tim.getYear() & 
        record.day.getDay()==tim.getDay()){
            var last = record.signs.pop();
            if (last.signOut==null){
            var newsign = {signIn:last.signIn, signOut:tim}
            record.signs.push(newsign);
            var timediff = (tim-last.signIn)/1000;
            record.missing_hours-=timediff;
            record.status = "attended";}
            else{
            record.signs.push(last);
            var newsign = {signIn:null, signOut:tim}
            record.signs.push(newsign);
            }
            found =true;

        }
    });

    if (!found){
        await attendance_today.attendance.push({day:tim, signs:[{signIn:null, signOut:tim}] })
    }
    // var attendance_today = await attendance_model.findOne({staff_id:result.id});
    // attendance_today.attendance.forEach(record => {
    //     if (record.day.getMonth()==tim.getMonth() &
    //     record.day.getYear()==tim.getYear() & 
    //     record.day.getDay()==tim.getDay()){
    //         var ret= record;
    //     }
    // });
   
   attendance_today.save();
    // var timediff = -1*(currtime-last.signIn);
    // console.log(currtime);
    // console.log(profile);
    // console.log(profile.signIn);

    // console.log(timediff);


//     const filter = {id: result.id};
//     const update = {signIn : "",  $inc: {missing_hours: timediff  }};
//     const opts = { new: true };
//    staff_model.findOneAndUpdate(filter,update, opts)
   res.send({time:tim});
});

router.route('/viewAttendance')
.get(async (req, res)=>{

    const result = await auth(req,res);
    console.log(result);

    if(!result){
        return res.send("Authentication failed")
    }
    const record  = await  attendance_model.findOne({staff_id:result.id });
    console.log("year"+req.params.month)
    if (req.params.month && req.params.year){
        var monthrecs =[]
        const rec  = await  attendance_model.findOne({staff_id:result.id });
        rec.attendance.forEach(record => {
            if (checkMonth(req.params.month, req.params.year, record.day)){
                monthrecs.push(record)
            }
        });
        console.log(monthrecs)
        res.send({attendance_record:monthrecs})
    }else{
    res.send({attendance_record:record})}
});

function checkMonth(month, year, date){
    console.log(date.getFullYear()+ "  "+year)
    console.log(date.getMonth()+"   "+month)
if(date.getMonth()+1==month & date.getFullYear()==year){
    return true;
}

return false;
}

router.route('/viewAttendance/:month/:year')
.get(async (req, res)=>{
    //req.params.month
    const result =await auth(req,res);
    console.log(result);

    if(!result){
        return res.send("Authentication failed")
    }
    var monthrecs =[]
    const rec  = await  attendance_model.findOne({staff_id:result.id });
    rec.attendance.forEach(record => {
        if (checkMonth(req.params.month, req.params.year, record.day)){
            monthrecs.push(record)
        }
    });
    console.log(monthrecs)
    res.send({attendance_record:monthrecs})
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

router.route('/viewMissingDays')
.get(async (req, res)=>{
    //req.params.month
    const result = await auth(req,res);
    console.log(result);

    if(!result){
        return res.send("Authentication failed")
    }
    var tim = new Date(Date.now());
    var missingdays =[]
    const rec  = await  attendance_model.findOne({staff_id:result.id });
    rec.attendance.forEach(record => {
        console.log(record.status +" "+record.day)
        if (record.status.toLowerCase().trim()=="missing" && checkGUCMonth(record.day, tim )){
            missingdays.push(record)
        }
    });
    console.log(missingdays)
    res.send({days:missingdays})
});


router.route('/viewMissingHours')
.get(async (req, res)=>{
    //req.params.month
    const result = await auth(req,res);
    console.log(result);
    var tim = new Date(Date.now());

    if(!result){
        return res.send("Authentication failed")
    }
    var hours =0;
    const rec  = await  attendance_model.findOne({staff_id:result.id });
    rec.attendance.forEach(record => {
        // if (record.status!="missing" & record.status!="leave" & record.status!="day off" ){
        if (record.status.toLowerCase().trim()=="attended" && checkGUCMonth(record.day, tim)){
            hours+=record.missing_hours
        }
    });

    hours = Math.trunc(hours/60)
    mins  = Math.trunc(hours%60)
    hours = Math.trunc(hours/60)
    if (hours<0){
        res.send({h: hours , m:mins, extra:true});
    }else{
        res.send({h: hours , m:mins, extra:false});
    }
    
});

module.exports =router; 