require('dotenv').config()

const express = require('express')
const cors = require('cors');

const app =express()
app.use(express.json())
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, auth-token");
    next();
  });

const mongoose = require("mongoose")
const cron = require("node-cron");
const attendance_model= require('./models/attendanceSchema')
const staffSched_model= require('./models/staffSchema').staffsched
const staff_model= require('./models/staffSchema').staff
const counters_model= require('./models/countersSchema')
const location_model= require('./models/locationSchema')
const faculty_model= require('./models/facultySchema')
const token_blacklist= require('./models/token_blacklist')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const publicRoutes = require('./routes/public');
const HODRoutes = require('./routes/hod.js');
const hrRoutes = require('./routes/hr.js');
const insRoutes = require('./routes/instructor.js');
const coordRoutes = require('./routes/coordinator.js')
const taRoutes = require('./routes/academicMembers.js')
app.use('', publicRoutes);
app.use('', HODRoutes);
app.use('', hrRoutes);
app.use('', insRoutes)
app.use('', coordRoutes)
app.use('', taRoutes)





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


async function seed(){
    //first location
    console.log("satrt seeding")
    console.log("first loc "+ location_model.countDocuments())
let loccount = await location_model.countDocuments() 
    if (loccount<1){
        var room1 = new location_model({
            id:"C1.101", 
            type:"office",
            capacity:100
        })
        try {
            room1.save()
        } catch (error) {
           console.log(error) 
        }
}
 
//first staff:hr
const salt = await bcrypt.genSalt(10); //10 ->>computational cost: hashing 2^10 times over
const newPassword = await bcrypt.hash("123456",salt)
let staffcount = await staff_model.countDocuments()
console.log("staff count "+staffcount)
if (staffcount<2){
const hri ='hr-'+ await getNextSequenceValue('hrid');
var hr1 = new staff_model( {
    id:hri,
    name:"firsthr", 
    gender: true,
    password:newPassword,
    first_login:true,
    salary: 2000,
    email:hri+"@gmail.com",
    day_off:"Saturday", 
    office_location:"c1.101", //we need to create an office first ^^^^^^^^
    role1:"hr", 
    schedule: new staffSched_model()
})
var att1 = new attendance_model({
    staff_id:hri
})
try {
    hr1.save()
    att1.save()
} catch (error) {
    console.log(error)
}
}
let faccount = await faculty_model.countDocuments();
if (faccount<1){
var course1 = {
    id:"csen704",
    credit_hours:4,
    coverage:20
}

var dept1 = {
    id:"csen",
    name:"Computer Science and Engineering" , 
    courses:[course1]
}

var faculty1 = new faculty_model({
    name:"met", 
    departments:[dept1]
})
try {
    faculty1.save();
} catch (error) {
    console.log(error)
}   
}

console.log("seeding done")
}
seed()



//can be done by hr1


//can be done by hr1



function checkday(dayname, nowday){
    const weekdays= ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
    console.log(weekdays[nowday])
    if (dayname.toLowerCase().trim()==weekdays[nowday]){
        return true;
    }
    return false;
}
cron.schedule("5 4 * * *", async () => { //   the end expression
    console.log("Running every day");
    var tim = new Date(Date.now()+7200000);
    
    const staff_cursor = staff_model.find().cursor();
    for (let person = await staff_cursor.next(); person != null; person = await staff_cursor.next()){
            
              var sched = person.schedule
              sched.saturday.filter(function(elem, index, arr){ 
                
                if (elem.date<tim & elem.replacement==true){
                    return false
                }
                return true;
            });
            sched.saturday.filter(function(elem, index, arr){ 
                if (elem.date<tim & elem.replacement==true){
                    return false
                }
                return true;
            });
            sched.sunday.filter(function(elem, index, arr){ 
                if (elem.date<tim & elem.replacement==true){
                    return false
                }
                return true;
            });
            sched.monday.filter(function(elem, index, arr){ 
                if (elem.date<tim & elem.replacement==true){
                    return false
                }
                return true;
            });
            sched.tuesday.filter(function(elem, index, arr){ 
                if (elem.date<tim & elem.replacement==true){
                    return false
                }
                return true;
            });
            sched.wednesday.filter(function(elem, index, arr){ 
                if (elem.date<tim & elem.replacement==true){
                    return false
                }
                return true;
            });
            sched.thursday.filter(function(elem, index, arr){ 
                if (elem.date<tim & elem.replacement==true){
                    return false
                }
                return true;
            });
           
   
            }  
  });
cron.schedule("5 3 * * *", async () => { // 5 3 * * *  the end expression
    console.log("Running every day");
    var tim = new Date(Date.now());
    var stat="missing";
    if (tim.getDay()==5){
        stat="dayoff"
    }
    
    const staff_cursor = staff_model.find().cursor();
    for (let person = await staff_cursor.next(); person != null; person = await staff_cursor.next()){

        var curr_id = person.id;  //getting id
                var dayoff = person.day_off;  //getting day off
                console.log("id: "+ curr_id + " dayoff: "+dayoff)
                if (checkday(dayoff.toLowerCase().trim(), tim.getDay())){
                    stat ="dayoff"
                }
                var exists = false;
                var newrec = await attendance_model.findOne({staff_id:curr_id}) //getting their attendance records
                newrec.attendance.forEach(entry => {
                    if (entry.day.getDay()==tim.getDay() & 
                    entry.day.getMonth()==tim.getMonth() &
                    entry.day.getFullYear()==tim.getFullYear())
                    exists=true;
                });
                if(!exists){
                newrec.attendance.push({day:tim, status:stat}) 
                
                //creating new record
                try {
                    await newrec.save();
                    console.log(newrec);
                } catch (error) {
                    console.log(error)
                }
            }
   
            }  
  });

  cron.schedule("5 2 11 * *", async () => { //  5 3 11 * *  the end expression
    console.log("Running every month");
      
    const staff_cursor = staff_model.find().cursor();
    for (let person = await staff_cursor.next(); person != null; person = await staff_cursor.next()){
            //Do somethign with the user
            
               person.leave_balance+=2.5
                await person.save();
   
            }  
    // staff_model.updateMany({}, {$inc:{leave_balance:2.5}})
    
    console.log("balance leave job done")
  });
  
  async function fill_attendance() { // 5 3 * * *  the end expression
    console.log("filling attendance");
    const staff_cursor = staff_model.find().cursor();
    for (let person = await staff_cursor.next(); person != null; person = await staff_cursor.next()){
        console.log(person)
        var curr_id = person.id;  //getting id
           
        var newrec = new attendance_model({staff_id:curr_id}) //getting their attendance records
        try {
            newrec.save();
            console.log(newrec);
        } catch (error) {
            console.log(error)
        }
    }
   

};

// fill_attendance();


module.exports.app=app;