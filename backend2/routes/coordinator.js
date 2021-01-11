const express = require('express');
const router = express.Router();
const staff_model = require('../models/staffSchema').staff;
const location_model = require('../models/locationSchema')
const faculty_model = require('../models/facultySchema')
const attendance_model = require('../models/attendanceSchema')
const request_model = require('../models/request')
const bcrypt = require('bcrypt')
const token_blacklist= require('../models/token_blacklist')
const jwt = require('jsonwebtoken');
require('dotenv').config()

const isString = (input) => {return (typeof input === 'string' || input instanceof String)};

async function auth(req, res){
    console.log('authenticating')
    // console.log(req)
    let is_blacklisted =true;
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
}
router.route('/coordinator/viewSlotLinkingRequests').get(async(req,res)=>{
    let token = 0;
    try {
        token = await auth(req, res);
    } catch(error) {
        console.log(error);
    }

    if (!token) {
        return res.send("Please login first");
    }

    try{
        const coordinator = await staff_model.findOne({id: token.id.toLowerCase().trim()});

        if (coordinator.role2.toLowerCase().trim() !== "coordinator") {
            return res.send("You are not authorized to perform this action");
        }

        const faculty = await faculty_model.findOne({name: coordinator.faculty});
        let my_courses = [];

        faculty.departments.forEach(dep => {
            if (dep.id === coordinator.department) {
                dep.courses.forEach(course => {
                    if (course.coordinator_id.toLowerCase().trim() === token.id.toLowerCase().trim()) {
                        my_courses.push(course.id);
                    }
                })
            }
        })

        if (my_courses.length === 0) {
            return res.send("We could not find a course with your id set as the coordinator id");
        }

        const requests = await request_model.find({request_type: "slot linking", course_id: {$in: my_courses}});

        return res.send(requests);
    } catch(error) {
        console.log(error);
    }
})

router.route('/coordinator/acceptSlotLinkingRequests').post(async(req, res)=>{
    request_id = req.body.request_id;
    let token = 0;
    try {
        token = await auth(req, res);
    } catch(error) {
        console.log(error);
    }

    if (!token) {
        return res.send("Please login first");
    }

    if (!request_id) {
        return res.send("Please enter the request id. You can see all request ids by viewing the slot linking requests related to your course.");
    }

    if (!isString(request_id)) {
        return res.send("The request id must be in the format of a string.");
    }

    try{
        const coordinator = await staff_model.findOne({id: token.id.toLowerCase().trim()});

        if (coordinator.role2.toLowerCase().trim() !== "coordinator") {
            return res.send("You are not authorized to perform this action");
        }

        const faculty = await faculty_model.findOne({name: coordinator.faculty});
        let my_courses = [];

        faculty.departments.forEach(dep => {
            if (dep.id === coordinator.department) {
                dep.courses.forEach(course => {
                    if (course.coordinator_id.toLowerCase().trim() === token.id.toLowerCase().trim()) {
                        my_courses.push(course.id);
                    }
                })
            }
        })

        const request = await request_model.findOne({_id: request_id.trim()});

        if (my_courses.indexOf(request.course_id) === -1) {
            return res.send(`Request ${request_id} is for a course that is not coordinated by you.`);
        }

        const sender = await staff_model.findOne({id: request.sending_staff.toLowerCase().trim()});

        const target_day = request.req_slot.date.getDay();
        
        switch(target_day) {
            case 0: sender.schedule.sunday.push(request.req_slot); break;
            case 1: sender.schedule.monday.push(request.req_slot); break;
            case 2: sender.schedule.tuesday.push(request.req_slot); break;
            case 3: sender.schedule.wednesday.push(request.req_slot); break;
            case 4: sender.schedule.thursday.push(request.req_slot); break;
            case 6: sender.schedule.saturday.push(request.req_slot); break; 
            default: 
                request.status = "cancelled";
                await request.save();
                return res.send("The target day seems to be a Friday, which is a day off. This request has been automatically cancelled.");
        }
        
        request.status = "accepted";
        await sender.save();
        await request.save();
        return res.send(`Request ${request_id} has been successfully accepted.`);

    } catch(error) {
        console.log(error);
    }
})

router.route('/coordinator/rejectSlotLinkingRequest').post(async(req, res)=>{
    request_id = req.body.request_id;
    let token = 0;
    try {
        token = await auth(req, res);
    } catch(error) {
        console.log(error);
    }

    if (!token) {
        return res.send("Please login first");
    }

    if (!request_id) {
        return res.send("Please enter the request id. You can see all request ids by viewing the slot linking requests related to your course.");
    }

    if (!isString(request_id)) {
        return res.send("The request id must be in the format of a string.");
    }

    try{
        const coordinator = await staff_model.findOne({id: token.id.toLowerCase().trim()});

        if (coordinator.role2.toLowerCase().trim() !== "coordinator") {
            return res.send("You are not authorized to perform this action");
        }

        const faculty = await faculty_model.findOne({name: coordinator.faculty});
        let my_courses = [];

        faculty.departments.forEach(dep => {
            if (dep.id === coordinator.department) {
                dep.courses.forEach(course => {
                    if (course.coordinator_id.toLowerCase().trim() === token.id.toLowerCase().trim()) {
                        my_courses.push(course.id);
                    }
                })
            }
        })

        const request = await request_model.findOne({_id: request_id.trim()});

        if(!request){
            return res.send("could not find request")
        }
        if (my_courses.indexOf(request.course_id) === -1) {
            return res.send(`Request ${request_id} is for a course that is not coordinated by you.`);
        }

        request.status = "rejected";
        await request.save();
        return res.send(`Request ${request_id} has been rejected`);

    } catch(error) {
        console.log(error);
    }
})



router.route('/coordinator/addSlots').post(async(req,res)=>{
    const result = await auth(req,res)
    if(!result){
        return res.send("No one of this sort exists")
    }
    const coordinator = await staff_model.findOne({id:result.id})
    console.log(coordinator)
    const fac = await faculty_model.findOne({name:coordinator.faculty})
    const loc = await location_model.findOne({id:req.body.location_id})
    console.log(fac)
    var course;
    if(!(coordinator.role2.toLowerCase().trim() == "coordinator")){
        return res.send("This member isn't a coordinator")
    }
    fac.departments.forEach((dep) => {
        console.log("gayss" + dep)
        dep.courses.forEach((c)=>{
            if(c.id.toLowerCase().trim() == req.body.courseID.toLowerCase().trim()){
                console.log(c.id)
                course = c
                console.log("gayss" + course)
            }
        })
    })
    if(!loc){
        return res.send("This location doesn't exist")
    }else{
        var slot = {
            id:req.body.id,
            type:req.body.type,
            date:req.body.date,
            location_id:req.body.location_id,
            course_id:req.body.courseID,
            group:req.body.group,
            day:req.body.day
        }
        console.log(slot)
    }
    
    if(!(coordinator.courses.includes(req.body.courseID))){
        return res.send("This coordinator doesn't give this course")
    }else{
        course.course_schedule.push(slot)
        course.coverage++;
        await fac.save()
        res.send("The Slot has been added correctly")
    }

})

router.route('/coordinator/updateSlot').post(async(req,res)=>{
    const result = await auth(req,res)
    if(!result){
        return res.send("No one of this sort exists")
    }
    const coordinator = await staff_model.findOne({id:result.id})
    const fac = await faculty_model.findOne({name:coordinator.faculty})
    const loc = await location_model.findOne({id:req.body.location_id})
    const courseMems = await staff_model.find({})
    var course;
    if(!(coordinator.role2.toLowerCase().trim() == "coordinator")){
        return res.send("This member isn't a coordinator")
    }
    fac.departments.forEach((dep) => {
        dep.courses.forEach((c)=>{
            if(c.id.toLowerCase().trim() == req.body.course_id.toLowerCase().trim()){
                course = c
            }
        })
    })

    if(!(coordinator.courses.includes(req.body.course_id))){
        return res.send("This coordinator doesn't give this course")
    }else{
        course.course_schedule.forEach((slot)=>{
            if(slot.id == req.body.id && slot.type == req.body.type 
                 && slot.day == req.body.day && slot.location_id == req.body.location_id
                  && slot.course_id == req.body.course_id && slot.group == req.body.group){
                    slot.id = req.body.newid
                    slot.type = req.body.newtype
                    slot.date = req.body.newdate
                    slot.day = req.body.newday
                    slot.location_id = req.body.newlocation_id
                    slot.course_id = req.body.newcourse_id
                    slot.group = req.body.newgroup
                    slot.taken = false
            }
        })
        courseMems.forEach((mem)=>{
            if(mem.courses.includes(course.id)){
                mem.schedule.saturday.forEach((slot)=>{
                    if(slot.id == req.body.id && slot.type == req.body.type 
                         && slot.location_id == req.body.location_id
                         && slot.course_id == req.body.course_id && slot.group == req.body.group){
                        mem.schedule.saturday.splice(mem.schedule.saturday.indexOf(slot),1)
                    }
                })
                mem.schedule.sunday.forEach((slot)=>{
                    if(slot.id == req.body.id && slot.type == req.body.type 
                        && slot.location_id == req.body.location_id
                        && slot.course_id == req.body.course_id && slot.group == req.body.group){
                       mem.schedule.sunday.splice(mem.schedule.sunday.indexOf(slot),1)
                   }
                })
                mem.schedule.monday.forEach((slot)=>{
                    if(slot.id == req.body.id && slot.type == req.body.type 
                        && slot.location_id == req.body.location_id
                        && slot.course_id == req.body.course_id && slot.group == req.body.group){
                       mem.schedule.monday.splice(mem.schedule.monday.indexOf(slot),1)
                   }
                })
                mem.schedule.tuesday.forEach((slot)=>{
                    if(slot.id == req.body.id && slot.type == req.body.type 
                        && slot.location_id == req.body.location_id
                        && slot.course_id == req.body.course_id && slot.group == req.body.group){
                       mem.schedule.tuesday.splice(mem.schedule.tuesday.indexOf(slot),1)
                   }
                })
                mem.schedule.wednesday.forEach((slot)=>{
                    if(slot.id == req.body.id && slot.type == req.body.type 
                        && slot.location_id == req.body.location_id
                        && slot.course_id == req.body.course_id && slot.group == req.body.group){
                       mem.schedule.wednesday.splice(mem.schedule.wednesday.indexOf(slot),1)
                   }
                })
                mem.schedule.thursday.forEach((slot)=>{
                    if(slot.id == req.body.id && slot.type == req.body.type 
                        && slot.location_id == req.body.location_id
                        && slot.course_id == req.body.course_id && slot.group == req.body.group){
                       mem.schedule.thursday.splice(mem.schedule.thursday.indexOf(slot),1)
                   }
                })
                mem.save()
            }
        })
        fac.save()
        res.send("Updated Successfully")
    }

})

router.route('/coordinator/deleteSlot').post(async(req,res)=>{
    const result = await auth(req,res)
    if(!result){
        return res.send("No one of this sort exists")
    }
    const coordinator = await staff_model.findOne({id:result.id})
    const fac = await faculty_model.findOne({name:coordinator.faculty})
    const loc = await location_model.findOne({id:req.body.location_id})
    const courseMems = await staff_model.find({})
    var course;
    if(!(coordinator.role2.toLowerCase().trim() == "coordinator")){
        return res.send("This member isn't a coordinator")
    }
    fac.departments.forEach((dep) => {
        dep.courses.forEach((c)=>{
            if(c.id.toLowerCase().trim() == req.body.course_id.toLowerCase().trim()){
                course = c
            }
        })
    })

    if(!(coordinator.courses.includes(req.body.course_id))){
        return res.send("This coordinator doesn't give this course")
    }else{
        course.course_schedule.forEach((slot)=>{
            if(slot.id == req.body.id && slot.type == req.body.type 
                 && slot.day == req.body.day && slot.location_id == req.body.location_id
                  && slot.course_id == req.body.course_id && slot.group == req.body.group){
                    course.course_schedule.splice(course.course_schedule.indexOf(slot),1)
                    course.coverage--
            }
        })
        courseMems.forEach((mem)=>{
            if(mem.courses.includes(course.id)){
                mem.schedule.saturday.forEach((slot)=>{
                    if(slot.id == req.body.id && slot.type == req.body.type 
                         && slot.location_id == req.body.location_id
                         && slot.course_id == req.body.course_id && slot.group == req.body.group){
                        mem.schedule.saturday.splice(mem.schedule.saturday.indexOf(slot),1)
                    }
                })
                mem.schedule.sunday.forEach((slot)=>{
                    if(slot.id == req.body.id && slot.type == req.body.type 
                        && slot.location_id == req.body.location_id
                        && slot.course_id == req.body.course_id && slot.group == req.body.group){
                       mem.schedule.sunday.splice(mem.schedule.sunday.indexOf(slot),1)
                   }
                })
                mem.schedule.monday.forEach((slot)=>{
                    if(slot.id == req.body.id && slot.type == req.body.type 
                        && slot.location_id == req.body.location_id
                        && slot.course_id == req.body.course_id && slot.group == req.body.group){
                       mem.schedule.monday.splice(mem.schedule.monday.indexOf(slot),1)
                   }
                })
                mem.schedule.tuesday.forEach((slot)=>{
                    if(slot.id == req.body.id && slot.type == req.body.type 
                        && slot.location_id == req.body.location_id
                        && slot.course_id == req.body.course_id && slot.group == req.body.group){
                       mem.schedule.tuesday.splice(mem.schedule.tuesday.indexOf(slot),1)
                   }
                })
                mem.schedule.wednesday.forEach((slot)=>{
                    if(slot.id == req.body.id && slot.type == req.body.type 
                        && slot.location_id == req.body.location_id
                        && slot.course_id == req.body.course_id && slot.group == req.body.group){
                       mem.schedule.wednesday.splice(mem.schedule.wednesday.indexOf(slot),1)
                   }
                })
                mem.schedule.thursday.forEach((slot)=>{
                    if(slot.id == req.body.id && slot.type == req.body.type 
                        && slot.location_id == req.body.location_id
                        && slot.course_id == req.body.course_id && slot.group == req.body.group){
                       mem.schedule.thursday.splice(mem.schedule.thursday.indexOf(slot),1)
                   }
                })
                mem.save()
            }
        })
        await fac.save()
        res.send("Removed Successfully")
    }

})



module.exports = router;