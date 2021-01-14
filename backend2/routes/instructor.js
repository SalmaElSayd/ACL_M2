require('dotenv').config();
const express=require('express');
const inst= express.Router();
const staff_model= require('../models/staffSchema').staff;
const staffSched_model= require('../models/staffSchema').staffSched;
const location_model= require('../models/locationSchema');
const faculty_model= require('../models/facultySchema');
const token_blacklist= require('../models/token_blacklist')
const jwt = require('jsonwebtoken');
const { db } = require('../models/staffSchema').staff;

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

// works
//View the coverage of course(s) he/she is assigned to.
inst.route('/instructor/viewCoverage').post(async (req,res)=>{
    const result = await auth(req,res);
    if(!result){
        return res.send("No Instructor exists");
    }
    const instructor = await staff_model.findOne({id:result.id});
    if(! (instructor.role1.toLowerCase().trim() == "instructor")){
        return res.send("This user isn't an instructor")
    }
    const course = req.body.courseID;
    const courseMems = await staff_model.find({})
    const fac = await faculty_model.findOne({name:instructor.faculty});
    var maxcoverage=1;
    var cover = 0;
    let courseCoverage = 0;
    console.log(fac)
    fac.departments.forEach((dep)=>{
        console.log(dep.name)
        dep.courses.forEach((c)=>{
            if(c.id.toLowerCase().trim() == course.toLowerCase().trim() ){
                courseCoverage =  c.course_schedule.length / c.coverage;
                console.log("schedlen "+courseCoverage);
            }
        })
    })
    var n = instructor.courses.includes(course);
    if(!n){
        return res.send("This isn't a course that the instructor gives");
    }
    
    // courseMems.forEach((mem)=>{
    //     if(mem.courses.includes(course)){
    //         mem.schedule.saturday.forEach((slot)=>{
    //             if(slot.course_id == course){
    //                 cover++;
    //             }
    //         })
    //         mem.schedule.sunday.forEach((slot)=>{
    //             if(slot.course_id == course){
    //                 cover++;
    //             }
    //         })
    //         mem.schedule.monday.forEach((slot)=>{
    //             if(slot.course_id == course){
    //                 cover++;
    //             }
    //         })
    //         mem.schedule.tuesday.forEach((slot)=>{
    //             if(slot.course_id == course){
    //                 cover++;
    //             }
    //         })
    //         mem.schedule.wednesday.forEach((slot)=>{
    //             if(slot.course_id == course){
    //                 cover++;
    //             }
    //         })
    //         mem.schedule.thursday.forEach((slot)=>{
    //             if(slot.course_id == course){
    //                 cover++;
    //             }
    //         })
    //     }
        
    // })
    // console.log("covr "+cover)
    // var fin = cover / maxcoverage
    // console.log("fin"+fin)
    return res.send(`The total coverage is ${courseCoverage}`);
});


// works 
//View the slots' assignment of course(s) he/she is assigned to.
inst.route('/instructor/viewSlots').post(async (req,res) => {
    const result = await auth(req,res);
    if(!result){
        return res.send("No Instructor exists");
    }
    const instructor = await staff_model.findOne({id:result.id});
    const fac = await faculty_model.findOne({name:instructor.faculty});
    if(! (instructor.role1.toLowerCase().trim() == "instructor")){
        return res.send("This user isn't an instructor")
    }
    const course = req.body.courseID;
    // const schedule = instructor.schedule;
    // const saturday = schedule.saturday;
    // const sunday = schedule.sunday;
    // const monday = schedule.monday;
    // const tuesday = schedule.tuesday;
    // const wednesday = schedule.wednesday;
    // const thursday = schedule.thursday;
    fac.departments.forEach((dep)=>{
        dep.courses.forEach((c)=>{
            if(c.id.toLowerCase().trim() == course.toLowerCase().trim()){
                res.send(c.course_schedule)
            }
        })
    })
    // saturday.forEach((slot) => {
    //     if (slot.course_id == course){
    //         ans.push(slot);
    //     }
    // });
    // sunday.forEach((slot) => {
    //     if (slot.course_id == course){
    //         ans.push(slot);
    //     }
    // });
    // monday.forEach((slot) => {
    //     if (slot.course_id == course){
    //         ans.push(slot);
    //     }
    // });
    // tuesday.forEach((slot) => {
    //     if (slot.course_id == course){
    //         ans.push(slot);
    //     }
    // });
    // wednesday.forEach((slot) => {
    //     if (slot.course_id == course){
    //         ans.push(slot);
    //     }
    // });
    // thursday.forEach((slot) => {
    //     if (slot.course_id == course){
    //         ans.push(slot);
    //     }
    // });
    // res.send(ans);
});

// works
//View all the staff in his/her department or per course along with their profiles.
inst.route('/instructor/viewProfilesDepartment').post(async (req,res) => {
    const result = await auth(req,res);
    if(!result){
        return res.send("No Instructor exists");
    }
    const instructor = await staff_model.findOne({id:result.id});
    if(! (instructor.role1.toLowerCase().trim() == "instructor")){
        return res.send("This user isn't an instructor")
    }
    const dep = instructor.department;
    const members = await staff_model.find({department:dep})
    const ans = []
    members.forEach((mem)=>{
            var person = {
                name:mem.name,
                email:mem.email,
                office_location:mem.office_location,
                role1:mem.role1,
                role2:mem.role2,
                gender:mem.gender,
                faculty:mem.faculty,
                department:mem.department,
                courses:mem.courses,
                day_off:mem.day_off,
                info:mem.info

            }
            ans.push(person)
    })
    console.log(ans)
    res.send(ans)

});

inst.route('/instructor/viewProfilesCourse').post(async (req,res) => {
    const result = await auth(req,res);
    if(!result){
        return res.send("No Instructor exists");
    }
    const instructor = await staff_model.findOne({id:result.id});
    if(! (instructor.role1.toLowerCase().trim() == "instructor")){
        return res.send("This user isn't an instructor")
    }
    const course = req.body.courseID
    const members = await staff_model.find({department:instructor.department})
    const ans = []
    if(!instructor.courses.includes(course.toLowerCase().trim())){
        return res.send("This Instructor doesn't give this course");
    }else{
    members.forEach((mem)=>{
        if(mem.courses.includes(course.toLowerCase().trim())){ 
        var person = {
            name:mem.name,
            email:mem.email,
            office_location:mem.office_location,
            role1:mem.role1,
            role2:mem.role2,
            courses:mem.courses,
            gender:mem.gender,
            day_off:mem.day_off,
            department:mem.department,
            faculty:mem.faculty,
            info:mem.info
        }
        ans.push(person)
        }
    })
    res.send(ans)
    }
});

// works
//Assign an academic member to an unassigned slots in course(s) he/she is assigned to.
inst.route('/instructor/assignToSlot').post(async (req,res) => {
    const result = await auth(req,res);
    console.log(result)
    if(!result){
        return res.send("No Insturctor exists");
    }
    const instructor = await staff_model.findOne({id:result.id});
    if(! (instructor.role1.toLowerCase().trim() == "instructor")){
        return res.send("This user isn't an instructor")
    }
    const course = req.body.courseID
    const fac = await faculty_model.findOne({name:instructor.faculty})
    var courseSched;
    const day = req.body.day
    const member = await staff_model.findOne({id:req.body.memID});
    if(!instructor.courses.includes(course)){
        return res.send("This Instructor doesn't give this course")
    }
    console.log(course)
    if(!member.courses.includes(course)){
        return res.send("This member doesn't give this course")
    }
    if(member.day_off.toLowerCase() == day.toLowerCase().trim()){
        return res.send("This is the day off of this member")
    }
    fac.departments.forEach((dep)=>{
        dep.courses.forEach((c)=>{
            if(c.id.toLowerCase().trim() == course.toLowerCase().trim()){
                courseSched = c.course_schedule
            }
        })
    })
    const newSlotSched = ({
        id:req.body.id,
        type:req.body.type,
        location_id:req.body.location_id,
        course_id:req.body.courseID,
        group:req.body.group
    });
    console.log(newSlotSched)
    var slotadded =false;
    if(day.toLowerCase().trim() == "saturday"){
        member.schedule.saturday.forEach((slot)=>{
            if(slot.id == newSlotSched.id){
                return res.send("The TA isn't free in this slot")
            }
        })
            courseSched.forEach((s)=>{
                if(s.day.toLowerCase().trim()=="saturday" && s.id == req.body.id && s.type.toLowerCase().trim() == req.body.type.toLowerCase().trim() && s.location_id == req.body.location_id && s.group == req.body.group){  
                   if (s.taken==false){
                    member.schedule.saturday.push(newSlotSched)
                    s.taken = true
                    member.save()
                    fac.save()
                    slotadded=true;
                    return res.send("Added Successfully")}
                    else{return res.send("This slot is covered")}
                    }
                })
                return res.send("slot does not exist in course schedule")
            
    }
    if(day.toLowerCase().trim() == "sunday"){
        member.schedule.sunday.forEach((slot)=>{
            if(slot.id == newSlotSched.id){
                return res.send("The TA isn't free in this slot")
            }
        })
            courseSched.forEach((s)=>{
                if(s.day.toLowerCase().trim()=="sunday" && s.id == req.body.id && s.type.toLowerCase().trim() == req.body.type.toLowerCase().trim() && s.location_id == req.body.location_id && s.group == req.body.group){
                    if (s.taken==false){
                        member.schedule.sunday.push(newSlotSched)
                        s.taken = true
                        member.save()
                        fac.save()
                        slotadded=true;
                        return res.send("Added Successfully")}
                        else{return res.send("This slot is covered")}
                        }
                    })
                    return res.send("slot does not exist in course schedule")
            
            
    }
    if(day.toLowerCase().trim() == "monday"){
        member.schedule.monday.forEach((slot)=>{
            if(slot.id == newSlotSched.id){
                return res.send("The TA isn't free in this slot")
            }
        })
            courseSched.forEach((s)=>{
                if(s.day.toLowerCase().trim()=="monday" && s.id == req.body.id && s.type.toLowerCase().trim() == req.body.type.toLowerCase().trim() && s.location_id == req.body.location_id && s.group == req.body.group){
                    if (s.taken==false){
                        member.schedule.monday.push(newSlotSched)
                        s.taken = true
                        member.save()
                        fac.save()
                        slotadded=true;
                        return res.send("Added Successfully")}
                        else{return res.send("This slot is covered")}
                        }
                    })
                    return res.send("slot does not exist in course schedule")
            
    }
    if(day.toLowerCase().trim() == "tuesday"){
        member.schedule.tuesday.forEach((slot)=>{
            if(slot.id == newSlotSched.id){
                return res.send("The TA isn't free in this slot")
            }
        })
            courseSched.forEach((s)=>{
                if(s.day.toLowerCase().trim()=="tuesday" && s.id == req.body.id && s.type.toLowerCase().trim() == req.body.type.toLowerCase().trim() && s.location_id == req.body.location_id && s.group == req.body.group){
                    if (s.taken==false){
                        member.schedule.tuesday.push(newSlotSched)
                        s.taken = true
                        member.save()
                        fac.save()
                        slotadded=true;
                        return res.send("Added Successfully")}
                        else{return res.send("This slot is covered")}
                        }
                    })
                    return res.send("slot does not exist in course schedule")
            
            
    }
    if(day.toLowerCase().trim() == "wednesday"){
        member.schedule.wednesday.forEach((slot)=>{
            if(slot.id == newSlotSched.id){
                return res.send("The TA isn't free in this slot")
            }
        })
            courseSched.forEach((s)=>{
                if(s.day.toLowerCase().trim()=="wednesday" &&s.id == req.body.id && s.type.toLowerCase().trim() == req.body.type.toLowerCase().trim() && s.location_id == req.body.location_id && s.group == req.body.group){
                    if (s.taken==false){
                        member.schedule.wednesday.push(newSlotSched)
                        s.taken = true
                        member.save()
                        fac.save()
                        slotadded=true;
                        return res.send("Added Successfully")}
                        else{return res.send("This slot is covered")}
                        }
                    })
                    return res.send("slot does not exist in course schedule")
        
            
    }
    if(day.toLowerCase().trim() == "thursday"){
        member.schedule.thursday.forEach((slot)=>{
            if(slot.id == newSlotSched.id){
                return res.send("The TA isn't free in this slot")
            }
        })
            courseSched.forEach((s)=>{
                if(s.day.toLowerCase().trim()=="thursday" &&s.id == req.body.id && s.type.toLowerCase().trim() == req.body.type.toLowerCase().trim() && s.location_id == req.body.location_id && s.group == req.body.group){
                    if (s.taken==false){
                        member.schedule.thursday.push(newSlotSched)
                        s.taken = true
                        member.save()
                        fac.save()
                        slotadded=true;
                        return res.send("Added Successfully")}
                        else{return res.send("This slot is covered")}
                        }
                    })
                    return res.send("slot does not exist in course schedule")


    }
    res.send();
});

// works
//Update/delete assignment of academic member in course(s) he/she is assigned to.
inst.route('/instructor/updateCourseMem').post(async (req,res) =>{
    const result = await auth(req,res);
    if(!result){
        return res.send("No Insturctor exists");
    }
    const instructor = await staff_model.findOne({id:result.id});
    if(! (instructor.role1.toLowerCase().trim() == "instructor")){
        return res.send("This user isn't an instructor")
    }
    const member = await staff_model.findOne({id:req.body.memID});
    const fac = await faculty_model.findOne({name:instructor.faculty})
    var courseSched;
    var goingToCourse;
    const courseID = req.body.courseID;
    const targetCourse = req.body.targetCourseID;
    fac.departments.forEach((dep)=>{
        dep.courses.forEach((c)=>{
            if(c.id == courseID){
                courseSched = c
            }
        })
    })
    fac.departments.forEach((dep)=>{
        dep.courses.forEach((c)=>{
            if(c.id == targetCourse){
                goingToCourse = c
            }
        })
    })
    if(!instructor.courses.includes(courseID) && !(instructor.courses.includes(targetCourse))){
        return res.send("This Instructor doesn't give this course");
    }else{
        if(!member.courses.includes(courseID)){
            return res.send("This Academic Member isn't assigned to this course");
        }else{
            var s = member.courses.indexOf(courseID);
            member.courses.splice(s,1);
            member.courses.push(targetCourse);
            courseSched.coordinator_id = " "
            courseSched.academic_member_ids.forEach((m)=>{
                if (m == member.id){
                    courseSched.academic_member_ids.splice(courseSched.academic_member_ids.indexOf(m),1)
                }
            })
            courseSched.instructor_ids.forEach((m)=>{
                if (m == member.id){
                    courseSched.academic_member_ids.splice(courseSched.academic_member_ids.indexOf(m),1)
                }
            })
            if(member.role1.toLowerCase().trim == "instructor"){
                goingToCourse.instructor_ids.push(member.id)
                goingToCourse.academic_member_ids.push(member.id)
            }
            if(member.role1.toLowerCase().trim == "ta"){
                goingToCourse.academic_member_ids.push(member.id)
            }
            member.schedule.saturday.forEach((slot)=>{
                courseSched.course_schedule.forEach((ss)=>{
                    if(ss.id == slot.id && ss.day == "saturday" && ss.course_id == slot.course_id && ss.type == slot.type && ss.location_id == slot.location_id && ss.group == slot.group && ss.taken == true){
                        ss.taken = false
                    }
                })
                if(slot.course_id.toLowerCase().trim() == courseID.toLowerCase().trim()){
                    member.schedule.saturday.splice(member.schedule.saturday.indexOf(slot),1)
                }
                
            })
            member.schedule.sunday.forEach((slot)=>{
                courseSched.course_schedule.forEach((ss)=>{
                    if(ss.id == slot.id && ss.day == "sunday" && ss.course_id == slot.course_id && ss.type == slot.type && ss.location_id == slot.location_id && ss.group == slot.group && ss.taken == true){
                        ss.taken = false
                    }
                })
                if(slot.course_id.toLowerCase().trim() == courseID.toLowerCase().trim()){
                    member.schedule.sunday.splice(member.schedule.sunday.indexOf(slot),1)
                }
                
                
            })
            member.schedule.monday.forEach((slot)=>{
                courseSched.course_schedule.forEach((ss)=>{
                    if(ss.id == slot.id && ss.day == "monday" && ss.course_id == slot.course_id && ss.type == slot.type && ss.location_id == slot.location_id && ss.group == slot.group && ss.taken == true){
                        ss.taken = false
                    }
                })
                if(slot.course_id.toLowerCase().trim() == courseID.toLowerCase().trim()){
                    member.schedule.monday.splice(member.schedule.monday.indexOf(slot),1)
                }
            })
            member.schedule.tuesday.forEach((slot)=>{
                courseSched.course_schedule.forEach((ss)=>{
                    if(ss.id == slot.id && ss.day == "tuesday" && ss.course_id == slot.course_id && ss.type == slot.type && ss.location_id == slot.location_id && ss.group == slot.group && ss.taken == true){
                        ss.taken = false
                    }
                })
                if(slot.course_id.toLowerCase().trim() == courseID.toLowerCase().trim()){
                    member.schedule.tuesday.splice(member.schedule.tuesday.indexOf(slot),1)
                }
            })
            member.schedule.wednesday.forEach((slot)=>{
                courseSched.course_schedule.forEach((ss)=>{
                    if(ss.id == slot.id && ss.day == "wednesday" && ss.course_id == slot.course_id && ss.type == slot.type && ss.location_id == slot.location_id && ss.group == slot.group && ss.taken == true){
                        ss.taken = false
                    }
                })
                if(slot.course_id.toLowerCase().trim() == courseID.toLowerCase().trim()){
                    member.schedule.wednesday.splice(member.schedule.wednesday.indexOf(slot),1)
                }
            })
            member.schedule.thursday.forEach((slot)=>{
                courseSched.course_schedule.forEach((ss)=>{
                    if(ss.id == slot.id && ss.day == "thursday" && ss.course_id == slot.course_id && ss.type == slot.type && ss.location_id == slot.location_id && ss.group == slot.group && ss.taken == true){
                        ss.taken = false
                    }
                })
                if(slot.course_id.toLowerCase().trim() == courseID.toLowerCase().trim()){
                    member.schedule.thursday.splice(member.schedule.thursday.indexOf(slot),1)
                }
            })
            member.save();
            fac.save();
            courseSched.save();
            res.send("Change Done Successfully!");
        }
    }
});

inst.route('/instructor/deleteCourseMem').post(async (req,res) =>{
    const result = await auth(req,res);
    console.log(result)
    if(!result){
        return res.send("No Insturctor exists");
    }
    const instructor = await staff_model.findOne({id:result.id});
    const fac = await faculty_model.findOne({name:instructor.faculty})
    
    if(! (instructor.role1.toLowerCase().trim() == "instructor")){
        return res.send("This user isn't an instructor")
    }
    const member = await staff_model.findOne({id:req.body.memID});
    const courseID = req.body.courseID;
    var courseSched;
    fac.departments.forEach((dep)=>{
        dep.courses.forEach((c)=>{
            if(c.id == courseID){
                courseSched = c
            }
        })
    })
    if(!instructor.courses.includes(courseID)){
        return res.send("This Instructor doesn't give this course");
    }else{
        if(!member.courses.includes(courseID)){
            return res.send("This Academic Member isn't assigned to this course");
        }else{
            var s = member.courses.indexOf(courseID);
            member.courses.splice(s,1);
            courseSched.coordinator_id = " "
            courseSched.academic_member_ids.forEach((m)=>{
                if (m == member.id){
                    courseSched.academic_member_ids.splice(courseSched.academic_member_ids.indexOf(m),1)
                }
            })
            courseSched.instructor_ids.forEach((m)=>{
                if (m == member.id){
                    courseSched.academic_member_ids.splice(courseSched.academic_member_ids.indexOf(m),1)
                }
            })
            member.schedule.saturday.forEach((slot)=>{
                courseSched.course_schedule.forEach((ss)=>{
                    if(ss.id == slot.id && ss.day == "saturday" && ss.course_id.toLowerCase().trim() == slot.course_id.toLowerCase().trim() && ss.type == slot.type && ss.location_id == slot.location_id && ss.group == slot.group && ss.taken == true){
                        ss.taken = false
                    }
                })
                if(slot.course_id == courseID){
                    member.schedule.saturday.splice(member.schedule.saturday.indexOf(slot),1)
                }
            })
            member.schedule.sunday.forEach((slot)=>{
                courseSched.course_schedule.forEach((ss)=>{
                    if(ss.id == slot.id && ss.day == "sunday" && ss.course_id.toLowerCase().trim() == slot.course_id.toLowerCase().trim() && ss.type == slot.type && ss.location_id == slot.location_id && ss.group == slot.group && ss.taken == true){
                        ss.taken = false
                    }
                })
                if(slot.course_id == courseID){
                    member.schedule.sunday.splice(member.schedule.sunday.indexOf(slot),1)
                }
            })
            member.schedule.monday.forEach((slot)=>{
                courseSched.course_schedule.forEach((ss)=>{
                    if(ss.id == slot.id && ss.day == "monday" && ss.course_id.toLowerCase().trim() == slot.course_id.toLowerCase().trim() && ss.type == slot.type && ss.location_id == slot.location_id && ss.group == slot.group && ss.taken == true){
                        ss.taken = false
                    }
                })
                if(slot.course_id == courseID){
                    member.schedule.monday.splice(member.schedule.monday.indexOf(slot),1)
                }
            })
            member.schedule.tuesday.forEach((slot)=>{
                courseSched.course_schedule.forEach((ss)=>{
                    if(ss.id == slot.id && ss.day == "tuesday" && ss.course_id.toLowerCase().trim() == slot.course_id.toLowerCase().trim() && ss.type == slot.type && ss.location_id == slot.location_id && ss.group == slot.group && ss.taken == true){
                        ss.taken = false
                    }
                })
                if(slot.course_id == courseID){
                    member.schedule.tuesday.splice(member.schedule.tuesday.indexOf(slot),1)
                }
            })
            member.schedule.wednesday.forEach((slot)=>{
                courseSched.course_schedule.forEach((ss)=>{
                    if(ss.id == slot.id && ss.day == "wednesday" && ss.course_id.toLowerCase().trim() == slot.course_id.toLowerCase().trim() && ss.type == slot.type && ss.location_id == slot.location_id && ss.group == slot.group && ss.taken == true){
                        ss.taken = false
                    }
                })
                if(slot.course_id == courseID){
                    member.schedule.wednesday.splice(member.schedule.wednesday.indexOf(slot),1)
                }
            })
            member.schedule.thursday.forEach((slot)=>{
                courseSched.course_schedule.forEach((ss)=>{
                    if(ss.id == slot.id && ss.day == "thursday" && ss.course_id.toLowerCase().trim() == slot.course_id.toLowerCase().trim() && ss.type == slot.type && ss.location_id == slot.location_id && ss.group == slot.group && ss.taken == true){
                        ss.taken = false
                    }
                })
                if(slot.course_id == courseID){
                    member.schedule.thursday.splice(member.schedule.thursday.indexOf(slot),1)
                }
            })
            member.save();
            fac.save();
            res.send("Change Done Successfully!");
        }
    }
})

// works
//remove
inst.route('/instructor/removeCourseMem').post(async (req,res) =>{
    const result = await auth(req,res);
    if(!result){
        return res.send("No Insturctor exists");
    }
    const instructor = await staff_model.findOne({id:result.id});
    const fac = await faculty_model.findOne({name:instructor.faculty})
    
    if(! (instructor.role1.toLowerCase().trim() == "instructor")){
        return res.send("This user isn't an instructor")
    }
    const member = await staff_model.findOne({id:req.body.memID});
    const courseID = req.body.courseID;
    var courseSched;
    fac.departments.forEach((dep)=>{
        dep.courses.forEach((c)=>{
            if(c.id == courseID){
                courseSched = c
            }
        })
    })
    if(!instructor.courses.includes(courseID)){
        return res.send("This Instructor doesn't give this course");
    }else{
        if(!member.courses.includes(courseID)){
            return res.send("This Academic Member isn't assigned to this course");
        }else{
            var s = member.courses.indexOf(courseID);
            member.courses.splice(s,1);
            courseSched.coordinator_id = " "
            courseSched.academic_member_ids.forEach((m)=>{
                if (m == member.id){
                    courseSched.academic_member_ids.splice(courseSched.academic_member_ids.indexOf(m),1)
                }
            })
            courseSched.instructor_ids.forEach((m)=>{
                if (m == member.id){
                    courseSched.academic_member_ids.splice(courseSched.academic_member_ids.indexOf(m),1)
                }
            })
            member.schedule.saturday.forEach((slot)=>{
                courseSched.course_schedule.forEach((ss)=>{
                    if(ss.id == slot.id && ss.day == "saturday" && ss.course_id.toLowerCase().trim() == slot.course_id.toLowerCase().trim() && ss.type == slot.type && ss.location_id == slot.location_id && ss.group == slot.group && ss.taken == true){
                        ss.taken = false
                    }
                })
                if(slot.course_id == courseID){
                    member.schedule.saturday.splice(member.schedule.saturday.indexOf(slot),1)
                }
            })
            member.schedule.sunday.forEach((slot)=>{
                courseSched.course_schedule.forEach((ss)=>{
                    if(ss.id == slot.id && ss.day == "sunday" && ss.course_id.toLowerCase().trim() == slot.course_id.toLowerCase().trim() && ss.type == slot.type && ss.location_id == slot.location_id && ss.group == slot.group && ss.taken == true){
                        ss.taken = false
                    }
                })
                if(slot.course_id == courseID){
                    member.schedule.sunday.splice(member.schedule.sunday.indexOf(slot),1)
                }
            })
            member.schedule.monday.forEach((slot)=>{
                courseSched.course_schedule.forEach((ss)=>{
                    if(ss.id == slot.id && ss.day == "monday" && ss.course_id.toLowerCase().trim() == slot.course_id.toLowerCase().trim() && ss.type == slot.type && ss.location_id == slot.location_id && ss.group == slot.group && ss.taken == true){
                        ss.taken = false
                    }
                })
                if(slot.course_id == courseID){
                    member.schedule.monday.splice(member.schedule.monday.indexOf(slot),1)
                }
            })
            member.schedule.tuesday.forEach((slot)=>{
                courseSched.course_schedule.forEach((ss)=>{
                    if(ss.id == slot.id && ss.day == "tuesday" && ss.course_id.toLowerCase().trim() == slot.course_id.toLowerCase().trim() && ss.type == slot.type && ss.location_id == slot.location_id && ss.group == slot.group && ss.taken == true){
                        ss.taken = false
                    }
                })
                if(slot.course_id == courseID){
                    member.schedule.tuesday.splice(member.schedule.tuesday.indexOf(slot),1)
                }
            })
            member.schedule.wednesday.forEach((slot)=>{
                courseSched.course_schedule.forEach((ss)=>{
                    if(ss.id == slot.id && ss.day == "wednesday" && ss.course_id.toLowerCase().trim() == slot.course_id.toLowerCase().trim() && ss.type == slot.type && ss.location_id == slot.location_id && ss.group == slot.group && ss.taken == true){
                        ss.taken = false
                    }
                })
                if(slot.course_id == courseID){
                    member.schedule.wednesday.splice(member.schedule.wednesday.indexOf(slot),1)
                }
            })
            member.schedule.thursday.forEach((slot)=>{
                courseSched.course_schedule.forEach((ss)=>{
                    if(ss.id == slot.id && ss.day == "thursday" && ss.course_id.toLowerCase().trim() == slot.course_id.toLowerCase().trim() && ss.type == slot.type && ss.location_id == slot.location_id && ss.group == slot.group && ss.taken == true){
                        ss.taken = false
                    }
                })
                if(slot.course_id == courseID){
                    member.schedule.thursday.splice(member.schedule.thursday.indexOf(slot),1)
                }
            })
            member.save();
            fac.save();
            res.send("Change Done Successfully!");
        }
    }
})
// works
//Assign an academic member in each of his/her course(s) to be a course coordinator.
inst.route('/instructor/assignCoordinator').post(async (req,res) => {
    const result = await auth(req,res);
    if(!result){
        return res.send("No Insturctor exists");
    }
    const instructor = await staff_model.findOne({id:result.id});
    if(!instructor){
        return res.send("user profile not found")
    }
    if(! (instructor.role1.toLowerCase().trim() == "instructor")){
        return res.send("This action cn only be done by an instructor")
    }

    const member = await staff_model.findOne({id:req.body.memID});
    if(!member){
        return res.send("This staff member doesn't exist")
    }
    const course = req.body.courseID;
    if(!instructor.courses.includes(course)){
        return res.send("This Instructor doesn't give this course");
    }else{
        if(!member.courses.includes(course)){
            return res.send("This Academic Member isn't assigned to this course");
        }else{
            db.collection('staffs').updateOne({id:req.body.memID},{$set:{role2:"Coordinator"}});
            var fac=await faculty_model.findOne({name:instructor.faculty})
            fac.departments.forEach((dep) => { 
                console.log(dep);
                dep.courses.forEach((c) => {
                if (c.id.toLowerCase().trim() == req.body.courseID.toLowerCase().trim()){
                    c.coordinator_id=req.body.memID;
                } 
            });
            });
            fac.save()
            res.send("Updated the role successfully!");
        }
    }
});





module.exports = inst;