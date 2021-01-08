const express = require('express');
const router = express.Router();
const staff_model = require('../models/staffSchema').staff
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

router.route('/assignCourseInstructor').post(async(req, res)=>{
    const instructorID = req.body.instructor_id;
    const courseID = req.body.course_id;
    let token;
    try {
        token = await auth(req, res);
    } catch(error) {
        console.log(error);
    }

    if (!token) {
        return res.send("Please login first");
    }

    if (!instructorID || !courseID) {
        return res.send("Please enter all required data");
    }

    if (!isString(instructorID) || !isString(courseID)) {
        return res.send("Instructor id and course id must be strings");
    }

    try{
        // validate HOD
        const hod = await staff_model.findOne({id: token.id});
        
        if (hod.role2.toLowerCase().trim() !== "hod") {
            return res.send("You are not authorized to perform this action");
        }
        // find instructor with specified id
        const instructor = await staff_model.findOne({id: instructorID.toLowerCase().trim()});
        if (!instructor) {
            return res.send(`The academic member with id ${instructorID} has not been found.`);
        }
        if (instructor.role1.toLowerCase().trim() !== "instructor") {
            return res.send(`The academic member with id ${instructorID} is not an instructor.`);
        }

        // add instructor to course attribute instructor_ids in faculty schema & update instructor in staff schema
        const faculties = await faculty_model.find();

        if (!faculties) {
            return res.send("There are no faculties yet!");
        }
    
        let message = "Your department has not been found";

        faculties.forEach(faculty => {
            faculty.departments.forEach(dep => {
                 if (dep.head_id.toLowerCase().trim() === token.id.toLowerCase().trim()) {
                    message = `Course ${courseID} has not been found`;
                    dep.courses.forEach(async(course) => {   
                        if (courseID.toLowerCase().trim() === course.id.toLowerCase().trim()) {
                            // checks on specified instructor
                            if (instructor.faculty.toLowerCase().trim() !== faculty.name.toLowerCase().trim() || instructor.department.toLowerCase().trim() !== dep.id.toLowerCase().trim()) {
                                return res.send(`The academic member with id ${instructorID} is either not part of your department or your faculty.`);
                            }
                            
                            try {
                                let index = instructor.courses.indexOf(courseID);
                                let index2 = course.instructor_ids.indexOf(instructorID.toLowerCase().trim());
                                if (index !== -1 || index2 !== -1) {
                                    return res.send(`The academic member with id ${instructorID} is already an instructor for course ${courseID}`);
                                }
                                instructor.courses.push(courseID);
                                course.instructor_ids.push(instructorID.toLowerCase().trim());
                                await faculty_model.updateOne({name: faculty.name}, {departments: faculty.departments});
                                await staff_model.updateOne({id: instructorID}, {courses: instructor.courses});
                                message = `Instructor with id ${instructorID} has been assigned to course ${courseID} successfully`;
                                return res.send(message);
                            } catch(error) {
                                console.log(error);
                            }
                        }
                    })
                }
            });
        })
    } catch(error) {
        console.error(error);
    }
});


router.route('/assignCourseTA').post(async(req, res)=>{
    const instructorID = req.body.ta_id;
    const courseID = req.body.course_id;
    let token;
    try {
        token = await auth(req, res);
    } catch(error) {
        console.log(error);
    }

    if (!token) {
        return res.send("Please login first");
    }

    if (!instructorID || !courseID) {
        return res.send("Please enter all required data");
    }

    if (!isString(instructorID) || !isString(courseID)) {
        return res.send("Instructor id and course id must be strings");
    }

    try{
        // validate HOD
        const hod = await staff_model.findOne({id: token.id});
        
        if (hod.role2.toLowerCase().trim() !== "hod") {
            return res.send("You are not authorized to perform this action");
        }
        // find instructor with specified id
        const instructor = await staff_model.findOne({id: instructorID.toLowerCase().trim()});
        if (!instructor) {
            return res.send(`The academic member with id ${instructorID} has not been found.`);
        }
        // console.log(instructor)
        if (instructor.role1.toLowerCase().trim() !== "ta") {
            return res.send(`The academic member with id ${instructorID} is not a TA.`);
        }

        // add instructor to course attribute instructor_ids in faculty schema & update instructor in staff schema
        const faculties = await faculty_model.find();

        if (!faculties) {
            return res.send("There are no faculties yet!");
        }
    
        let message = "Your department has not been found";

        faculties.forEach(faculty => {
            faculty.departments.forEach(dep => {
                 if (dep.head_id.toLowerCase().trim() === token.id.toLowerCase().trim()) {
                    message = `Course ${courseID} has not been found`;
                    dep.courses.forEach(async(course) => {   
                        if (courseID.toLowerCase().trim() === course.id.toLowerCase().trim()) {
                            // checks on specified instructor
                            if (instructor.faculty.toLowerCase().trim() !== faculty.name.toLowerCase().trim() || instructor.department.toLowerCase().trim() !== dep.id.toLowerCase().trim()) {
                                return res.send(`The academic member with id ${instructorID} is either not part of your department or your faculty.`);
                            }
                            
                            try {
                                let index = instructor.courses.indexOf(courseID);
                                let index2 = course.academic_member_ids.indexOf(instructorID.toLowerCase().trim());
                                if (index !== -1 || index2 !== -1) {
                                    return res.send(`The academic member with id ${instructorID} is already an academic member for course ${courseID}`);
                                }
                                instructor.courses.push(courseID);
                                course.academic_member_ids.push(instructorID.toLowerCase().trim());
                                await faculty_model.updateOne({name: faculty.name}, {departments: faculty.departments});
                                await staff_model.updateOne({id: instructorID}, {courses: instructor.courses});
                                message = `Academic member with id ${instructorID} has been assigned to course ${courseID} successfully`;
                                return res.send(message);
                            } catch(error) {
                                console.log(error);
                            }
                        }
                    })
                }
            });
        })
    } catch(error) {
        console.error(error);
    }
});

router.route('/updateCourseInstructor').post(async(req, res)=>{
    const oldInstructorID = req.body.old_instructor_id;
    const newInstructorID = req.body.new_instructor_id;
    const courseID = req.body.course_id;
    let token;
    try {
        token = await auth(req, res);
    } catch(error) {
        console.log(error);
    }

    if (!token) {
        return res.send("Please login first");
    }

    if (!oldInstructorID || !newInstructorID || !courseID) {
        return res.send("Please enter all required data");
    }

    if (!isString(oldInstructorID) || !isString(newInstructorID) || !isString(courseID)) {
        return res.send("Both instructor ids and the course id must be strings");
    }

    try{
        // validate HOD
        const hod = await staff_model.findOne({id: token.id.toLowerCase().trim()});
        if (hod.role2.toLowerCase().trim() !== "hod") {
            return res.send("You are not authorized to perform this action");
        }

        const oldInstructor = await staff_model.findOne({id: oldInstructorID.toLowerCase().trim()});
        const newInstructor = await staff_model.findOne({id: newInstructorID.toLowerCase().trim()});

        if (!oldInstructor || !newInstructor) {
            return res.send("One or both of the specified instructors could not be found.");
        }
        if (oldInstructor.role1.toLowerCase().trim() !== "instructor") {
            return res.send(`The academic member with id ${oldInstructorID} is not an instructor.`);
        }
        if (newInstructor.role1.toLowerCase().trim() !== "instructor") {
            return res.send(`The academic member with id ${newInstructorID} is not an instructor.`);
        }

        const faculties = await faculty_model.find();

        if (!faculties) {
            return res.send("There are no faculties yet!")
        }
    
        let message = "Your department has not been found";
    
        faculties.forEach(faculty => {
            faculty.departments.forEach(dep => {
                 if (dep.head_id.toLowerCase().trim() === token.id.toLowerCase().trim()) {
                    message = `Course ${courseID} has not been found`
                    dep.courses.forEach(async(course) => {
                        if (courseID.toLowerCase().trim() === course.id.toLowerCase().trim()) {
                            // checks on specified instructors
                            if (oldInstructor.faculty.toLowerCase().trim() !== faculty.name.toLowerCase().trim() || oldInstructor.department.toLowerCase().trim() !== dep.id.toLowerCase().trim() 
                            || newInstructor.faculty.toLowerCase().trim() !== faculty.name.toLowerCase().trim() || newInstructor.department.toLowerCase().trim() !== dep.id.toLowerCase().trim()) {
                                return res.send("One or both of the specified academic members may not be part of your department or your faculty.");
                            }

                            try {
                                const index = oldInstructor.courses.indexOf(courseID);
                                if (index === -1) {
                                    return res.send(`The instructor with id ${oldInstructorID} does not teach this course.`);
                                }
                                
                                const index2 = newInstructor.courses.indexOf(courseID);
                                if (index2 !== -1) {
                                    return res.send(`The instructor with id ${newInstructorID} already teaches this course.`);
                                }
                            
                                const index3 = course.instructor_ids.indexOf(oldInstructorID.toLowerCase().trim())
                                if (index3 === -1) {
                                    message = `Instructor with id ${oldInstructorID} has not been found. Update operation cannot be executed`;
                                } else {
                                    // update oldInstructor's schedule
                                    let new_day = [];
                                    const days = [0, 1, 2, 3, 4, 6];
                                    days.forEach(day => {
                                        switch(day) {
                                            case 0: 
                                                oldInstructor.schedule.sunday.forEach(slot => {
                                                    if (slot.course_id !== courseID) {
                                                        new_day.push(slot);
                                                    }
                                                }); 
                                                oldInstructor.schedule.sunday = new_day;
                                                break;
                                            case 1:
                                                oldInstructor.schedule.monday.forEach(slot => {
                                                    if (slot.course_id !== courseID) {
                                                        new_day.push(slot);
                                                    }
                                                }); 
                                                oldInstructor.schedule.monday = new_day;
                                                break;
                                            case 2:
                                                oldInstructor.schedule.tuesday.forEach(slot => {
                                                    if (slot.course_id !== courseID) {
                                                        new_day.push(slot);
                                                    }
                                                }); 
                                                oldInstructor.schedule.tuesday = new_day;
                                                break;
                                            case 3:
                                                oldInstructor.schedule.wednesday.forEach(slot => {
                                                    if (slot.course_id !== courseID) {
                                                        new_day.push(slot);
                                                    }
                                                }); 
                                                oldInstructor.schedule.wednesday = new_day;
                                                break;
                                            case 4:
                                                oldInstructor.schedule.thursday.forEach(slot => {
                                                    if (slot.course_id !== courseID) {
                                                        new_day.push(slot);
                                                    }
                                                }); 
                                                oldInstructor.schedule.thursday = new_day;
                                                break;
                                            case 6:
                                                oldInstructor.schedule.saturday.forEach(slot => {
                                                    if (slot.course_id !== courseID) {
                                                        new_day.push(slot);
                                                    }
                                                }); 
                                                oldInstructor.schedule.saturday = new_day;
                                        }
                                        new_day = [];
                                    })
                                    
                                    course.instructor_ids.splice(index3, 1);
                                    course.instructor_ids.push(newInstructorID.toLowerCase().trim())
                                    await faculty_model.updateOne({name: faculty.name}, {departments: faculty.departments});
                                    oldInstructor.courses.splice(index, 1);
                                    await staff_model.updateOne({id: oldInstructorID.toLowerCase().trim()}, {courses: oldInstructor.courses, schedule: oldInstructor.schedule});
                                    newInstructor.courses.push(courseID);
                                    await staff_model.updateOne({id: newInstructorID.toLowerCase().trim()}, {courses: newInstructor.courses});
                                    message = `Instructor with id ${oldInstructorID} has been updated to instructor with id ${newInstructorID} successfully`
                                }
                                return res.send(message);
                            } catch(error) {
                                console.log(error);
                            }
                        }
                    })
                }
            });
        })
    } catch(error) {
        console.error(error);
    }
})

router.route('/deleteCourseInstructor').post(async(req, res)=>{
    const instructorID = req.body.instructor_id;
    const courseID = req.body.course_id;
    let token;
    try {
        token = await auth(req, res);
    } catch(error) {
        console.log(error);
    }

    if (!token) {
        return res.send("Please login first");
    }
console.log(token)
    if (!instructorID || !courseID) {
        return res.send("Please enter all required data");
    }

    if (!isString(instructorID) || !isString(courseID)) {
        return res.send("Instructor id and course id must be strings");
    }

    try{
        // validate HOD
        const hod = await staff_model.findOne({id: token.id.toLowerCase().trim()});
        if (hod.role2.toLowerCase().trim() !== "hod") {
            return res.send("You are not authorized to perform this action");
        }

        const instructor = await staff_model.findOne({id: instructorID.toLowerCase().trim()});
        if (!instructor) {
            return res.send(`The academic member with id ${instructorID} could not be found.`);
        }
        if (instructor.role1.toLowerCase().trim() !== "instructor") {
            return res.send(`The academic member with id ${instructorID} is not an instructor.`);
        }

        const faculties = await faculty_model.find();

        if (!faculties) {
            return res.send("There are no faculties yet!");
        }
    
        let message = "Your department has not been found";
    
        faculties.forEach(faculty => {
            faculty.departments.forEach(dep => {
                 if (dep.head_id.toLowerCase().trim() === token.id.toLowerCase().trim()) {
                    message = `Course ${courseID} has not been found`;
                    dep.courses.forEach(async(course) => {
                        if (courseID.toLowerCase().trim() === course.id.toLowerCase().trim()) {
                            if (instructor.faculty.toLowerCase().trim() !== faculty.name.toLowerCase().trim() || instructor.department.toLowerCase().trim() !== dep.id.toLowerCase().trim()) {
                                return res.send(`The academic member with id ${instructorID} is not part of either your department or your faculty.`);
                            }
                            
                            try {
                                const index = instructor.courses.indexOf(courseID.toLowerCase());
                                if (index === -1) {
                                    return res.send(`The instructor with id ${instructorID} does not teach this course.`);
                                } 
                                
                                const index2 = course.instructor_ids.indexOf(instructorID.toLowerCase().trim());
                                if (index2 === -1) {
                                    return res.send(`The instructor with id ${instructorID} does not teach this course.`);
                                }
                                console.log("here")
                                // update oldInstructor's schedule
                                let new_day = [];
                                const days = [0, 1, 2, 3, 4, 6];
                                days.forEach(day => {
                                    switch(day) {
                                        case 0: 
                                            instructor.schedule.sunday.forEach(slot => {
                                                if (slot.course_id !== courseID) {
                                                    new_day.push(slot);
                                                }
                                            }); 
                                            instructor.schedule.sunday = new_day;
                                            break;
                                        case 1:
                                            instructor.schedule.monday.forEach(slot => {
                                                if (slot.course_id !== courseID) {
                                                    new_day.push(slot);
                                                }
                                            }); 
                                            instructor.schedule.monday = new_day;
                                            break;
                                        case 2:
                                            instructor.schedule.tuesday.forEach(slot => {
                                                if (slot.course_id !== courseID) {
                                                    new_day.push(slot);
                                                }
                                            }); 
                                            instructor.schedule.tuesday = new_day;
                                            break;
                                        case 3:
                                            instructor.schedule.wednesday.forEach(slot => {
                                                if (slot.course_id !== courseID) {
                                                    new_day.push(slot);
                                                }
                                            }); 
                                            instructor.schedule.wednesday = new_day;
                                            break;
                                        case 4:
                                            instructor.schedule.thursday.forEach(slot => {
                                                if (slot.course_id !== courseID) {
                                                    new_day.push(slot);
                                                }
                                            }); 
                                            instructor.schedule.thursday = new_day;
                                            break;
                                        case 6:
                                            instructor.schedule.saturday.forEach(slot => {
                                                if (slot.course_id !== courseID) {
                                                    new_day.push(slot);
                                                }
                                            }); 
                                            instructor.schedule.saturday = new_day;
                                    }
                                    new_day = [];
                                })
                                console.log("deleteCourseInstructor")
                                instructor.courses.splice(index, 1);
                                await staff_model.updateOne({id: instructorID.toLowerCase().trim()}, {courses: instructor.courses, schedule: instructor.schedule});
                                course.instructor_ids.splice(index2, 1);
                                await faculty_model.updateOne({name: faculty.name}, {departments: faculty.departments});
                                message = `Instructor with id ${instructorID} has been deleted successfully`;
                                return res.send(message);
                            } catch(error) {
                                console.log(error);
                            }
                        }
                    })
                }
            });
        })
    } catch(error) {
        console.error(error);
    }
})

router.route('/viewStaff').get(async(req, res)=>{
    const courseID = req.body.course_id;
    let token;
    
    try {
        token = await auth(req, res);
    } catch(error) {
        console.log(error);
    }

    if (!token) {
        return res.send("Please login first");
    }

    if (courseID && !isString(courseID)) {
        return res.send("Course id must be a string");
    }

    let ids = [];
    let myDepartment = 0;
    let myFaculty = 0;

    try {
        // validate HOD
        const hod = await staff_model.findOne({id: token.id.toLowerCase().trim()});
        if (hod.role2.toLowerCase().trim() !== "hod") {
            return res.send("You are not authorized to perform this action");
        }

        const faculties = await faculty_model.find();
        
        // let message = "Your department has not been found";
    
        if (courseID) {

            faculties.forEach(faculty => {
                faculty.departments.forEach(dep => {
                    if (dep.head_id.toLowerCase().trim() === token.id.toLowerCase().trim()) {
                        // message = `Course ${courseID} has not been found`;
                        dep.courses.forEach(course => {
                            if (course.id.toLowerCase().trim() === courseID.toLowerCase().trim()) {
                                ids = ids.concat(course.instructor_ids, course.academic_member_ids);
                            }
                        })
                    }
                })
            })

            const staff = await staff_model.find({id: {$in: ids}});
            staff.forEach(member => {
                member.password = undefined;
            })
            return res.send(staff);

        } else {

            faculties.forEach(faculty => {
                faculty.departments.forEach(dep => {
                    if (dep.head_id.toLowerCase().trim() === token.id.toLowerCase().trim()) {
                        myFaculty = faculty.name;
                        myDepartment = dep.id;
                    }
                })
            })
            
            if (!myFaculty || !myDepartment) {
                return res.send("Your faculty or department was not found");
            }
            let staff = await staff_model.find({faculty: myFaculty, department: myDepartment});
            staff.forEach(member => {
                member.password = undefined;
            })
            return res.send(staff);
        }
    } catch (error) {
        console.log(error);
    }
    
})

router.route('/viewDayOff').get(async(req, res)=>{
    
        var memberID = req.body.member_id

    
    // const memberID = req.body.member_id.toLowerCase().trim();
    let token;
    try {
        token = await auth(req, res);
    } catch(error) {
        console.log(error);
    }

    if (!token) {
        return res.send("Please login first");
    }

    if (memberID && !isString(memberID)) {
        return res.send("memberID")
    }

    try{
        // validate HOD
        const hod = await staff_model.findOne({id: token.id.toLowerCase().trim()});
        if (hod.role2.toLowerCase().trim() !== "hod") {
            return res.send("You are not authorized to perform this action");
        }

        let myFaculty = 0;
        let myDepartment = 0;

        const faculties = await faculty_model.find();
        faculties.forEach(faculty => {
            faculty.departments.forEach(dep => {
                if (dep.head_id.toLowerCase().trim() === token.id.toLowerCase().trim()) {
                    myFaculty = faculty.name;
                    myDepartment = dep.id;
                }
            })
        })
        
        if (!myFaculty || !myDepartment) {
            return res.send("Your faculty or department was not found");
        }

        if (memberID) {
            const member = await staff_model.findOne({id: memberID});

            if (member.faculty.toLowerCase().trim() !== myFaculty.toLowerCase().trim()) {
                return res.send(`The staff member with id ${memberID} is not your faculty.`)
            }

            if (member.department.toLowerCase().trim() !== myDepartment.toLowerCase().trim()) {
                return res.send(`The staff member with id ${memberID} is not your department.`)
            }

            if (member) {
                return res.send("(Staff Member ID: " + memberID + ", Day Off: " + member.day_off + ")");
            }
        } else {

            const staff = await staff_model.find({faculty: myFaculty, department: myDepartment});

            let result = "";
            staff.forEach(member => {
                result = result + "(Staff Member ID: " + member.id + ", Day Off: " + member.day_off + ")\n";
            })
            
            return res.send(result);
        }
    } catch (error) {
        console.error(error);
    }
})

router.route('/viewRequests').get(async(req, res)=>{
    let token;
    try {
        token = await auth(req, res);
    } catch(error) {
        console.log(error);
    }

    if (!token) {
        return res.send("Please login first");
    }

    try{
        // validate HOD
        const hod = await staff_model.findOne({id: token.id.toLowerCase().trim()});
        if (hod.role2.toLowerCase() !== "hod") {
            return res.send("You are not authorized to perform this action");
        }

        let myFaculty = 0;
        let myDepartment = 0;

        const faculties = await faculty_model.find();
        faculties.forEach(faculty => {
            faculty.departments.forEach(dep => {
                if (dep.head_id.toLowerCase().trim() === token.id.toLowerCase().trim()) {
                    myFaculty = faculty.name;
                    myDepartment = dep.id;
                }
            })
        })

        if (!myFaculty || !myDepartment) {
            return res.send("Your faculty or department was not found");
        }
        const staff = await staff_model.find({faculty: myFaculty, department: myDepartment});
        let ids = [];
        staff.forEach(member => {
            ids.push(member.id);
        })
        
        const requests = await request_model.find({sending_staff: {$in: ids}});
        console.log(requests)
        return res.send(requests);

    } catch(error) {
        console.log(error);
    }
})

router.route('/acceptRequest').post(async(req,res)=>{
    const id = req.body.request_id;
    let token;
    try {
        token = await auth(req, res);
    } catch(error) {
        console.log(error);
    }

    if (!token) {
        return res.send("Please login first");
    }

    if (!id) {
        return res.send("Please all enter all required data");
    }

    try {
        // validate HOD
        const hod = await staff_model.findOne({id: token.id.toLowerCase().trim()});
        if (hod.role2.toLowerCase().trim() !== "hod") {
            return res.send("You are not authorized to perform this action");
        }

        let myFaculty = 0;
        let myDepartment = 0;

        const faculties = await faculty_model.find();
        faculties.forEach(faculty => {
            faculty.departments.forEach(dep => {
                if (dep.head_id.toLowerCase().trim() === token.id.toLowerCase().trim()) {
                    myFaculty = faculty.name;
                    myDepartment = dep.id;
                }
            })
        })
        if (!myFaculty || !myDepartment) {
            return res.send("Your faculty or department have not been found");
        }

        const request = await request_model.findOne({_id: id});

        if (!request) {
            return res.send(`Request ${id} has not been found`);
        }
        if (request.status == "cancelled") {
            return res.send(`Request ${id} has been cancelled`);
        }
        if (request.status != "pending") {
            return res.send(`You have already handled request ${id}`);
        }

        const sender = await staff_model.findOne({id: request.sending_staff.toLowerCase().trim()});
        if (!sender) {
            return res.send(`Sender ${sending_staff} has not been found`);
        }
        if (sender.faculty.toLowerCase().trim() !== myFaculty.toLowerCase().trim()) {
            return res.send(`Request ${id} belongs to a staff member from a different faculty`);
        }
        if (sender.department.toLowerCase().trim() !== myDepartment.toLowerCase().trim()) {
            return res.send(`Request ${id} belongs to a staff member from a different department`);
        }

        const staffAttendance = await attendance_model.findOne({staff_id: request.sending_staff.toLowerCase().trim()});

        if (request.request_type.toLowerCase().trim() === "annual") {
            const replacement_id = request.replacement_id;

            let target_day = request.request_date.getDay();

            let target_slots = 0;
            switch (target_day) {
                case 0: target_slots = sender.schedule.sunday; target_day = "Sunday"; break;
                case 1: target_slots = sender.schedule.monday; target_day = "Monday"; break;
                case 2: target_slots = sender.schedule.tuesday; target_day = "Tuesday"; break;
                case 3: target_slots = sender.schedule.wednesday; target_day = "Wednesday"; break;
                case 4: target_slots = sender.schedule.thursday; target_day = "Thursday"; break;
                case 6: target_slots = sender.schedule.saturday; target_day = "Saturday"; break;
                default: 
                    request.status = "cancelled";
                    await request.save();
                    return res.send("The target day seems to be a Friday, which is already a day off. This request has been automatically cancelled.");
            }

            if (replacement_id.length===0) {
                res.write(`Request ${id} is an annual leave request.\nThe replacing staff member has not been specified.\n`);

                // get all course ids in target day
                let courses = [];
                target_slots.forEach(slot => {
                    courses.push(slot.course_id);
                })

                let replacement_ids = [];

                const faculty = await faculty_model.findOne({name: myFaculty});

                faculty.departments.forEach(dep => {
                    if (dep.head_id === token.id) {
                        dep.courses.forEach(course => {
                            if (courses.indexOf(course.id) !== -1) {
                                if (sender.role1.toLowerCase().trim() === "instructor") {
                                    replacement_ids = replacement_ids.concat(course.instructor_ids);
                                } else if (sender.role1.toLowerCase().trim() === "ta"){
                                    replacement_ids = replacement_ids.concat(course.academic_member_ids);
                                }
                            }
                        })
                    }
                })

                const replacements = await staff_model.find({id: {$in: replacement_ids}});

                res.write(`Available replacements on target day (${target_day}) are:\n`);
                target_slots.forEach(slot => {
                    res.write("Slot " + slot.id + ": ");
                    let chosen = [];
                    replacements.forEach(rep => {
                        let rep_slots = 0;
                        switch (target_day) {
                            case "Sunday": rep_slots = rep.schedule.sunday; break;
                            case "Monday": rep_slots = rep.schedule.monday; break;
                            case "Tuesday": rep_slots = rep.schedule.tuesday; break;
                            case "Wednesday": rep_slots = rep.schedule.wednesday; break;
                            case "Thursday": rep_slots = rep.schedule.thursday; break;
                            case "Saturday": rep_slots = rep.schedule.saturday;
                        }
                        let available = true;
                        rep_slots.forEach(rep_slot => {
                            if (slot.id === rep_slot.id) {
                                available = false;
                            }
                        })

                        if (available) {
                            for (course_id of rep.courses) {
                                if (course_id.trim() === slot.course_id.trim()) {
                                    chosen.push(rep.id);
                                    break;
                                }
                            }
                        }
                    })
                    res.write( "[" + chosen + "]\n");
                })
                return res.end();
                // requires action from HOD 
            } else {
                request.status = "accepted";
                // if date is in the future make an attendance record
                if (request.request_date.getTime() > (new Date()).getTime()) {
                    staffAttendance.attendance.push({
                        day: request.request_date,
                        status: "leave",
                        missing_hours: 0
                    })
                } else {
                    let none = true;
                    staffAttendance.attendance.forEach(record => {
                        if (record.day.getTime() === request.request_date.getTime()) {
                            none = false;
                            record.status = "leave";
                            record.missing_hours = record.missing_hours - 30240;
                        }
                    })
                    if (none) {
                        staffAttendance.attendance.push({
                            day: request.request_date,
                            status: "leave",
                            missing_hours: 0
                        })
                    }
                }
                sender.leave_balance = sender.leave_balance - 1;
                
                const replacements = await staff_model.find({id: {$in: replacement_id}});

                target_slots.forEach(slot => {
                    replacements.forEach(async(rep) => {
                        for (course_id of rep.courses) {
                            if (course_id.trim() === slot.course_id.trim()) {
                                slot.replacement = true;
                                slot.date = request.request_date;
                                switch (target_day) {
                                    case "Sunday": rep.schedule.sunday.push(slot); break;
                                    case "Monday": rep.schedule.monday.push(slot); break;
                                    case "Tuesday": rep.schedule.tuesday.push(slot); break;
                                    case "Wednesday": rep.schedule.wednesday.push(slot); break;
                                    case "Thursday": rep.schedule.thursday.push(slot); break;
                                    case "Saturday": rep.schedule.saturday.push(slot);
                                }
                                await rep.save();
                                break;
                            }
                        }
                    })
                })
                await sender.save();
                await request.save();
                await staffAttendance.save();
                return res.send(`Request ${id} has been successfully accepted`);
            }
        }
        if (request.request_type.toLowerCase().trim() === "accidental") {
            request.status = "accepted";
            sender.leave_balance = sender.leave_balance - 1;
            sender.accidental_leave = sender.accidental_leave + 1; 
            // if date is in the future make an attendance record
            if (request.request_date.getTime() > (new Date()).getTime()) {
                staffAttendance.attendance.push({
                    day: request.request_date,
                    status: "leave",
                    missing_hours: 0
                })
            } else {
                let none = true;
                staffAttendance.attendance.forEach(record => {
                    if (record.day.getTime() === request.request_date.getTime()) {
                        none = false;
                        record.status = "leave";
                        record.missing_hours = record.missing_hours - 30240;
                    }
                })
                if (none) {
                    staffAttendance.attendance.push({
                        day: request.request_date,
                        status: "leave",
                        missing_hours: 0
                    })
                }
            }
            await staffAttendance.save();
            await sender.save();
            await request.save();
            return res.send(`Request ${id} has been successfully accepted`);
        }
        if (request.request_type.toLowerCase().trim() === "sick" || request.request_type.toLowerCase().trim() === "maternity") {
            request.status = "accepted";
            // if date is in the future make an attendance record
            if (request.request_date.getTime() > (new Date()).getTime()) {
                staffAttendance.attendance.push({
                    day: request.request_date,
                    status: "leave",
                    missing_hours: 0
                })
            } else {
                let none = true;
                staffAttendance.attendance.forEach(record => {
                    if (record.day.getTime() === request.request_date.getTime()) {
                        none = false;
                        record.status = "leave";
                        record.missing_hours = record.missing_hours - 30240;
                    }
                })
                if (none) {
                    staffAttendance.attendance.push({
                        day: request.request_date,
                        status: "leave",
                        missing_hours: 0
                    })
                }
            }
            await request.save();
            await staffAttendance.save();
            return res.send(`Request ${id} has been successfully accepted`);
        }
        if (request.request_type.toLowerCase().trim() === "compensation") {
            request.status = "accepted";
            // if date is in the future make an attendance record
            if (request.request_date.getTime() > (new Date()).getTime()) {
                staffAttendance.attendance.push({
                    day: request.request_date,
                    status: "leave",
                    missing_hours: 0
                })
            } else {
                let none = true;
                staffAttendance.attendance.forEach(record => {
                    if (record.day.getTime() === request.request_date.getTime()) {
                        none = false;
                        record.status = "leave";
                        record.missing_hours = record.missing_hours - 30240;
                    }
                })
                if (none) {
                    staffAttendance.attendance.push({
                        day: request.request_date,
                        status: "leave",
                        missing_hours: 0
                    })
                }
            }

            staffAttendance.attendance.push({
                day: request.compensation_date,
                status: "missing",
                missing_hours: 30240
            })

            await staffAttendance.save();
            await request.save();
            return res.send(`Request ${id} has been successfully accepted`);
        }
        if (request.request_type.toLowerCase().trim() === "change day off") {
            request.status = "accepted";
            sender.day_off = request.new_day_off;
            switch(request.new_day_off.toLowerCase().trim()) {
                case "sunday": sender.schedule.sunday = []; break;
                case "monday": sender.schedule.monday = []; break;
                case "tuesday": sender.schedule.tuesday = []; break;
                case "wednesday": sender.schedule.wednesday = []; break;
                case "thursday": sender.schedule.thursday = []; break;
                case "saturday": sender.schedule.saturday = [];
            }
            await sender.save();
            await request.save();
            return res.send(`Request ${id} has been successfully accepted`);
        }   
    } catch(error) {
        console.log(error);
    }
})

router.route('/rejectRequest').post(async(req, res)=>{
    const id = req.body.request_id;
    const comment = req.body.hod_comment;
    let token;
    try {
        token = await auth(req, res);
    } catch(error) {
        console.log(error);
    }

    if (!token) {
        return res.send("Please login first");
    }

    if (!id) {
        return res.send("Please all enter all required data");
    }

    if (comment && !isString(comment)) {
        return res.send("The comment must be of type string")
    }

    try{
        // validate HOD
        const hod = await staff_model.findOne({id: token.id.toLowerCase().trim()});
        if (hod.role2.toLowerCase().trim() !== "hod") {
            return res.send("You are not authorized to perform this action");
        }

        let myFaculty = 0;
        let myDepartment = 0;

        const faculties = await faculty_model.find();
        faculties.forEach(faculty => {
            faculty.departments.forEach(dep => {
                if (dep.head_id.toLowerCase().trim() === token.id.toLowerCase().trim()) {
                    myFaculty = faculty.name;
                    myDepartment = dep.id;
                }
            })
        })
        if (!myFaculty || !myDepartment) {
            return res.send("Your faculty or department have not been found");
        }

        const request = await request_model.findOne({_id: id});

        if (!request) {
            return res.send(`Request with ${id} has not been found`);
        }
        if (request.status.toLowerCase().trim() === "cancelled") {
            return res.send(`Request ${id} has been cancelled`);
        }
        if (request.status.toLowerCase().trim() !== "pending") {
            return res.send(`You have already handled request ${id}`);
        }

        const sender = await staff_model.findOne({id: request.sending_staff.toLowerCase().trim()});
        if (!sender) {
            return res.send(`Sender ${sending_staff} has not been found`);
        }
        if (sender.faculty !== myFaculty) {
            return res.send(`Request ${id} belongs to a staff member from a different faculty`);
        }
        if (sender.department !== myDepartment) {
            return res.send(`Request ${id} belongs to a staff member from a different department`);
        }

        request.status = "rejected";
        request.hod_comment = comment;
        await request.save();
        return res.send(`Request ${id} has been rejected.`);
    } catch(error) {
        console.log(error);
    }
})

router.route('/viewCourseCoverage').get(async(req, res)=>{
    const courseID = req.body.course_id;
    let token;
    try {
        token = await auth(req, res);
    } catch(error) {
        console.log(error);
    }

    if (!courseID) {
        return res.send("Please all enter all required data");
    }

    if (!token) {
        return res.send("Please login first");
    }

    if (!isString(courseID)) {
        return res.send("Course id must be of type string");
    }

    try{
        // validate HOD
        const hod = await staff_model.findOne({id: token.id.toLowerCase().trim()});
        if (hod.role2.toLowerCase().trim() !== "hod") {
            return res.send("You are not authorized to perform this action");
        }

        let courseCoverage = 0;
        
        const faculties = await faculty_model.find();
        faculties.forEach(faculty => {
            faculty.departments.forEach(dep => {
                if (dep.head_id === token.id) {
                    dep.courses.forEach(course => {
                        if (course.id.toLowerCase().trim() === courseID.toLowerCase().trim()) {
                            courseCoverage = course.course_schedule.length / course.coverage;
                        }
                    })
                }
            })
        })

        return res.send(`The total coverage of ${courseID} is ${courseCoverage}`);

    } catch(error) {
        console.log(error);
    }
})

router.route('/viewTeachingAssignments').get(async(req, res)=>{
    const courseID = req.body.course_id;
    let token;
    try {
        token = await auth(req, res);
    } catch(error) {
        console.log(error);
    }

    if (!token) {
        return res.send("Please login first");
    }

    if (!courseID) {
        return res.send("Please all enter all required data");
    }

    if (!isString(courseID)) {
        return res.send("Course id must be of type string");
    }

    try{
        // validate HOD
        const hod = await staff_model.findOne({id: token.id.toLowerCase().trim()});
        if (hod.role2.toLowerCase().trim() !== "hod") {
            return res.send("You are not authorized to perform this action");
        }

        let staff_ids = 0; 
        let inDepartment = false;

        const faculties = await faculty_model.find();
        faculties.forEach(faculty => {
            faculty.departments.forEach(dep => {
                if (dep.head_id.toLowerCase().trim() === token.id.toLowerCase().trim()) {
                    dep.courses.forEach(course => {
                        if (course.id.toLowerCase().trim() === courseID.toLowerCase().trim()) {
                            inDepartment = true;
                            staff_ids = course.instructor_ids.concat(course.academic_member_ids);
                        }
                    })
                }
            })
        })

        if (inDepartment) {
            const staff = await staff_model.find({id: {$in: staff_ids}});

            const days = [1, 2, 3, 4, 5, 7];
            let sched = 0;
            let assignments = [];
            staff.forEach(member => {
                let weekday = 0;
                for (day of days) {
                    switch (day) {
                        case 1: sched = member.schedule.sunday; weekday = "Sunday"; break;
                        case 2: sched = member.schedule.monday; weekday = "Monday"; break;
                        case 3: sched = member.schedule.tuesday; weekday = "Tuesday"; break;
                        case 4: sched = member.schedule.wednesday; weekday = "Wednesday"; break;
                        case 5: sched = member.schedule.thursday; weekday = "Thursday"; break;
                        case 7: sched = member.schedule.saturday; weekday = "Saturday"; 
                    }
                    sched.forEach(slot => {
                        if (slot.course_id === courseID) {
                            let object = {
                                staff_id: member.id,
                                staff_name: member.name,
                                day_of_week: weekday,
                                assignment: slot
                            }
                            assignments.push(JSON.stringify(object));
                        }
                    })
                }
            })
            return res.send(`Assignments for ${courseID}:\n` + "[" + assignments + "]");
        } else {
            return res.send(`Course ${courseID} was not found in your department.`);
        }
    } catch(error) {
        console.log(error);
    }
})
module.exports = router;