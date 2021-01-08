const express=require('express');
const router= express.Router()
const staff_model= require('../models/staffSchema')
const counters_model= require('../models/countersSchema')
const location_model= require('../models/locationSchema')
const faculty_model= require('../models/facultySchema')
const attendance_model= require('../models/attendanceSchema')
const token_blacklist= require('../models/token_blacklist')
const request_model = require('../models/request')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

async function auth(req, res){

    let is_blacklisted =true;
    let token_entry = await token_blacklist.findOne({token:req.header('auth-token')})
    console.log(token_entry);
    if (!token_entry){
    
    const result = jwt.decode(req.header('auth-token'), process.env.TOKEN_SECRET);
    // console.log(result);
    if(!result){
        return false;
    }  

    return result;}
    else{
        return false;
    }
}

function isSlotBusy(schedule, slot){
    schedule.saturday.forEach(elem => {
        if (elem.id==slot.id & slot.date.getDay==6){
            return true;
        }
    });
    schedule.sunday.forEach(elem => {
        if (elem.id==slot.id & slot.date.getDay==0){
            return true;
        }
    });
    schedule.monday.forEach(elem => {
        if (elem.id==slot.id & slot.date.getDay==1){
            return true;
        }
    });
    schedule.tuesday.forEach(elem => {
        if (elem.id==slot.id & slot.date.getDay==2){
            return true;
        }
    });
    schedule.wednesday.forEach(elem => {
        if (elem.id==slot.id & slot.date.getDay==3){
            return true;
        }
    });
    schedule.thursday.forEach(elem => {
        if (elem.id==slot.id & slot.date.getDay==4){
            return true;
        }
    });
}

// Accept/reject "slot linking" requests from academic members linked to his/her course.
// Note that once a \slot linking" request is accepted, it should be automatically added to
// the sender’s schedule
router.route('/coordinator/slotLink_accept/:req_id')
.post(async (req, res)=>{
    const result = await auth(req,res);
    if(!result){
        return res.write("Authentication failed")
    }
    const profile  = await staff_model.findOne({id:result.id});
    if (!profile.role1.toLowerCase()=="ta" | !profile.role2.toLowerCase()=="academic coordinator"){
        return res.write("Only coordinator can accept slot linking request")
    }
    var request =await request_model.findOne({_id:req.params.req_id})
    if(!request){
        return res.write("invalid request id")
    }
    if(!request.receiving_staff==result.id){
        return res.write("this request is for another course's coordinator")
    }
//validation setps done

    var ta = await await staff_model.findOne({id:request.sending_staff});
    if (isSlotBusy(ta.schedule, request.slot)){
        res.write("can't link to this slot as it is already busy in academic member's schedule")
    }
    var room = await await location_model.findOne({id:request.slot.location_id});
    if (isSlotBusy(room.schedule, request.slot)){
        res.write("can't link to this slot as it is already busy in this location's schedule. location: "+room.id)
    }
//now I know slot is free

    const newSlot = {  
    id:request.slot.id,
    type:request.slot.type,
    replacement:false,
    location_id:request.slot.location_id,
    course_id:request.slot.course_id,
    group:request.slot.group}

//get course
// add to ta schedule
switch (request.slot.date) {
    case 0:
        room.schedule.sunday.push(newSlot);
        ta.schedule.sunday.push(newSlot);
        break;
        case 1:
            ta.schedule.monday.push(newSlot);
            room.schedule.monday.push(newSlot);
            break;
            case 2:
                ta.schedule.tuesday.push(newSlot);
                room.schedule.tuesday.push(newSlot);
                break;
                case 3:
                    ta.schedule.wednesday.push(newSlot);
                    room.schedule.wednesday.push(newSlot);
                    break;
                    case 4:
                        ta.schedule.thursday.push(newSlot);
                        room.schedule.thursday.push(newSlot);
                        break;
                        case 6:
                            ta.schedule.saturday.push(newSlot);
                            room.schedule.saturday.push(newSlot);
                            break;
                            default:
                                console.log("adding slot to schedule failed.");
                            }
                            console.log(ta)
                            ta.save()
                            room.save()
                            
                            const faculty_coursor = faculty_model.find().cursor();
                                for (let fac = await faculty_coursor.next(); fac != null; person = await faculty_coursor.next()){
                                    fac.departments.forEach(dept =>{
                                        dept.courses.forEach(course =>{
                                            if (course.id==request.slot.course_id){
                                                course.course_schedule.push(newSlot);
                                                console.log("new slot added to course" + coourse.id)
                                                try {
                                                 course.save()
                                                
                                                } catch (error) {
                                                  console.log(error)  
                                            }
                                        }
                                    })
                                    })
                                    }
                                    request_model.updateOne({_id:req.params.req_id}, {status:"accepted"})
                            res.send();
                        });
                        
                        


router.route('/coordinator/slotLink_reject/:req_id')
.post(async (req, res)=>{
    const result = await auth(req,res);
    if(!result){
        return res.write("Authentication failed")
    }
    const profile  = await staff_model.findOne({id:result.id});
    if (!profile.role1.toLowerCase()=="ta" | !profile.role2.toLowerCase()=="academic coordinator"){
        return res.write("Only coordinator can accept slot linking request")
    }
    var request =await request_model.findOne({_id:req.params.req_id})
    if(!request){
        return res.write("invalid request id")
    }
    if(!request.receiving_staff==result.id){
        return res.write("this request is for another course's coordinator")
    }

    request_model.updateOne({id:req.params.req_id}, {status:rejected})



});

module.exports =router; 