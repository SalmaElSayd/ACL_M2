const express = require('express');
const router = express.Router();
const staff_model = require('../models/staffSchema').staff
const location_model = require('../models/locationSchema')
const faculty_model = require('../models/facultySchema')
const attendance_model = require('../models/attendanceSchema')
const request_model = require('../models/request')
const token_blacklist= require('../models/token_blacklist')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { ReplSet } = require('mongodb');
require('dotenv').config()
///////////////////////////////////////////////////////////////////////////////////
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

//--------------------------------------------------------------------------------
//1- view their schedule
router.route('/academicMember/viewSchedule')
.get(async (req, res)=>{
  const result = await auth(req,res);
    console.log(result);
    if(!result){
        return res.send("Authenication failed")
    }
    const profile  = await staff_model.findOne({id:result.id});
    if(!profile){
        return res.send("This account does not exist")
    }
    if (profile.role1.toLowerCase().trim()!=="ta"){
      return res.send("Only TAs can accept access")
  }
   var schedule=profile.schedule; 

    if(!schedule){
        return res.json({
            error:"you dont have a schedule to view"
        })
    }
    return res.json({
      error:"Here is your schedule with all your teaching activities.",
      schedule
  });
});
//------------------------------------------------------------------------------------
//2a_1- view send replacement request
router.route('/academicMember/viewSendReplacementRequest')
.get(async (req, res)=>{ 
  const result = await auth(req,res);
    console.log(result);
    if(!result){
        return res.send("Authenication failed")
    }
    const profile  = await staff_model.findOne({id:result.id});
    if(!profile){
        return res.send("This account does not exist")
    }
    
    if (profile.role1.toLowerCase()!=='ta'){
      return res.send("Only TAs can accept access")
  }
      
const requests= await request_model.find({sending_staff:profile.id, request_type:"replacement"}) ;
if(!requests){
  return res.json({
    error:"you don't have any replacement request(s)."
});
}
    return res.json({
      error:"Here are all your sent replacements requests.",
      requests
  });
  
});
//2-a_2 view received replacement requests
router.route('/academicMember/viewReceivedReplacementRequest')
.put(async (req, res)=>{
  const result = await auth(req,res);
    console.log(result);
    if(!result){
        return res.send("Authenication failed")
    }
    const profile  = await staff_model.findOne({id:result.id});
    if(!profile){
        return res.send("This account does not exist")
    }
    if (profile.role1.toLowerCase().trim()!=="ta"){
      return res.send("Only TAs can accept access")
  }
try{  
const requests= await request_model.find({receiving_staff:profile.id, request_type:"replacement"}) ;
if(!requests){
  return res.json({
    error:"you don't have any received replacement request(s)."
});
}
    let reqId= req.body.request_id;
    let req_status=req.body.req_status;
  let requesta=request_model.find({_id:reqId});
    if(requesta.length===0){
        return res.json({
            error:"This request ID does not exist."
        });
    }
    if(!req_status){
      return res.json({
        message:"Here are all your received replacements requests.",
        requests
      });
    }else{
      if(req_status.toLowerCase().trim()==="accepted"){
        await request_model.updateOne({_id:reqId}, {status:"accepted"});
        return res.json({
          error:"The request you choose has been accepted.",
          message: "Here are all your received replacements requests.",
          requests
        });
     }
     if(req_status.toLowerCase().trim()==="rejected"){
      await request_model.updateOne({_id:reqId}, {status:"rejected"});
      return res.json({
        error:"The request you choose has been rejected.",
        message: "Here are all your received replacements requests.",
        requests
      });
     }
     if(req_status.toLowerCase().trim()!=="accepted" ||req_status.toLowerCase().trim()==="rejected"){
      return res.json({
        error:"You can either accept or reject a request !!!!!!!",
        message: "Here are all your received replacements requests.",
        requests
      });
     }
      return res.json({
        message:"Here are all your received replacements requests.",
        requests
      });
}
}
catch (err) {
  console.log(err);
  }
});

//-------------------------------------------------------------------------------------------
//3- send a slot linking request       // goes to coordinator automatically
router.route("/academicMember/slotLinkingRequest")
.post(async (req, res) => {
  const result = await auth(req,res);
    console.log(result);
    if(!result){
        return res.send("Authenication failed")
    }
    const profile  = await staff_model.findOne({id:result.id});
    if(!profile){
        return res.send("This account does not exist")
    }
    if (profile.role1.toLowerCase().trim()!=="ta"){
      return res.send("Only TAs can accept access")
  }

   let reason= req.body.reason;
   let courseId=req.body.course_id;
   let date_slot= new Date (req.body.req_slot.date); 
   let req_slot=req.body.req_slot;
   req_slot.date=date_slot;
   let request_date=new Date(req.body.request_date);
   

try {
    if(!courseId || !req_slot){
        return res.send("Please enter the course id or the slot you want.")
       }
        var cooId; 
        const faculties = await faculty_model.find();
        faculties.forEach(faculty => {
            faculty.departments.forEach(dep => {
                if (dep.id === profile.department) {
                  dep.courses.forEach(course => {
                    if (course.id.toLowerCase().trim() === courseId.toLowerCase().trim() ) {
                                 let index=profile.courses.indexOf(course.id);
                                 if(index===-1){
                                   return res.send("you do not teach this course.")
                                 } 
                                 console.log(course)
                                 cooId=course.coordinator_id;   
                       }        
                })
                }
            })
        })
        console.log(cooId)
if (!cooId){
    return res.send("this course has no coordinator")
}
                const newRequest = new request_model({
                  sending_staff:profile.id,
                  receiving_staff: cooId,
                  request_type:"slot linking",
                  reason: reason,
                  date_sent:new Date(Date.now()),
                  course_id:courseId,
                  req_slot:req_slot,
                  request_date:request_date,
                });  

  await newRequest.save();
  return res.send("Your slot Linking request has been send");
      
    } catch(error) {
        console.log(error);
    }
              });    
//----------------------------------------------------------------------------------
// 4-change the day off      // goes to HOD automatically
router.route('/academicMember/changeDayOff')
.put(async (req, res)=>{
  const result = await auth(req,res);
  console.log(result);
  if(!result){
    return res.json({message:"Authenication failed"})
  }
  const profile  = await staff_model.findOne({id:result.id});
  if(!profile){
    return res.json({message:"This account does not exist"})
  }
  if (profile.role1.toLowerCase().trim()!=="ta"){
    return res.json({message:"Only TAs can accept access"})
}
  let hod=0;
  const faculties = await faculty_model.find();
  faculties.forEach(faculty => {
      faculty.departments.forEach(dep => {
          if (dep.id === profile.department) {
            hod=dep.head_id;
          }
      })
  })
  const newRequest = new request_model({
    sending_staff:profile.id,
    receiving_staff:hod,   
    date_sent:new Date(Date.now()),
    request_type:"change day off",
    reason: req.body.reason,
    //request_date:new Date(req.body.request_date),
    new_day_off:req.body.new_day_off
  });
  try{
    const newDay=newRequest.new_day_off;
  if(!newDay.length){
    return res.json({
      message:"you didn't add a new day off yet."
    });
  }
  let foo=true;
    let day=newRequest.new_day_off.toLowerCase().trim();
                switch(day){
                  case "sunday":if(profile.day_off.toLowerCase()==="sunday"){
                    foo=false;    
                  }break;
                  case "monday":if(profile.day_off.toLowerCase()==="monday"){
                    foo=false;
                  }break;
                  case "tuesday":if(profile.day_off.toLowerCase()==="tuesday"){
                    foo=false;
                  } break;
                  case "wednesday":if(profile.day_off.toLowerCase()==="wednesday"){
                    foo=false;
                  } break;
                  case "thursday":if(profile.day_off.toLowerCase()==="thursday"){
                    foo=false;
                  } break;
                  case "saturday":if(profile.day_off.toLowerCase()==="saturday"){
                    foo=false;
                  } break;
                  default:
                    return res.json({message:"The day chosen is not a working day/correct day. Please check your chosen day."});
                        } 
  if(foo){
    await newRequest.save();
    return res.json({
      message:"Your change day off request has been send to HOD ( Head of your department)"
    }) ;
  }
          else{
  return res.json({
    message:"you added your already day off.Please choose another one."

  }
);
}
  }
  catch (err) {
    console.log(err);
    }
});

//---------------------------------------
// function for GUC month check !!! --> used in (5)
function checkGUCMonth(recdate, date){
  let month = recdate.getMonth();
  const year = recdate.getYear();
  const day = recdate.getDate();
  if (day>=11){
      month+=1
  }
  if(date.getMonth()===month-1 & date.getYear()===year & date.getDate()>10){
      return true;
  }
  if(date.getMonth()===month & date.getYear()===year & date.getDate()<=10){
      return true;
  }
  let dateMonth=date.getMonth();
  
  if(dateMonth===0){
    dateMonth=12;
  }

  if(dateMonth===month & (date.getYear()-1)===year & date.getDate()<=10){
    return true;
}
  return false;
  }
//-------------------------------------------------------------------------
// 5- send a leave request       // goes to HOD automatically
router.route('/academicMember/sendLeaveRequest')
.post(async (req, res)=>{
  const result = await auth(req,res);
    console.log(result);
    if(!result){
        return res.send({message:"Authenication failed"})
    }
    const profile  = await staff_model.findOne({id:result.id});
    if(!profile){
        return res.send({message:"This account does not exist"})
    } 
    if (profile.role1.toLowerCase().trim()!=="ta"){
      return res.send({message:"Only TAs can accept access"})
  }
try {
    let hod=0;
    const faculties = await faculty_model.find();
     faculties.forEach(faculty => {
        faculty.departments.forEach(dep => {
            if (dep.id === profile.department) {
              hod=dep.head_id;
            }
        })
    })
  const gender_mem=profile.gender;
  let newRequest = 0;
  
   newRequest = new request_model({
        sending_staff:profile.id,
        receiving_staff:hod, 
        request_type:req.body.request_type,
        reason: req.body.reason,
        replacement_id: req.body.replacement_id,
        request_date: new Date(req.body.request_date),
        document: req.body.document
      });
    
if (!newRequest.request_type) {
return res.send({message:'Request type is required.Please add a request Type.'});
  }
////////// Annual Leaves //////////////
  if(newRequest.request_type.toLowerCase().trim()=="annual"){
    var datereq = new Date();  
       if(!newRequest.request_date){
        return res.send({message:'Please add the specific day you are going to leave in. '});  
      }   
       if(newRequest.request_date<datereq){
      return res.send({message:'Annual leaves should be submitted before the targeted day.'});
    }
                day=newRequest.request_date.getDay();
                let targetDay=0;
                switch(day){
                  case 0:targetDay=profile.schedule.sunday; break;
                  case 1:targetDay=profile.schedule.monday; break;
                  case 2:targetDay=profile.schedule.tuesday; break;
                  case 3:targetDay=profile.schedule.wednesday; break;
                  case 4:targetDay=profile.schedule.thursday; break;
                  case 6:targetDay=profile.schedule.saturday; break;
                  default:
                    return res.send({message:"The day chosen was friday which is not a working day. Please choose a working day."});
                        } 
                        
                  if(newRequest.replacement_id.length===0){
                   
                      await newRequest.save();
                     return res.send({message:"Your annual leave request has been send to HOD ( Head of your department) without your replacement for the day"});
                       } 
                       
                        let req_request=await request_model.find({receiving_staff:{$in:newRequest.replacement_id}, sending_staff:profile.id, request_type:"replacement",status:"accepted"});
                       
                        let counter=0;
                        console.log(targetDay);
                        console.log(req_request);
                        targetDay.forEach(async(slot)=>{
                          
                          let available=false;
                            req_request.forEach(request=>{
                            if(slot.course_id===request.course_id && !available){
                              
                              counter++;
                              available=true;
                            }
                                                                           

                          });
                        });
                        
                          if(targetDay.length===counter){
                            
                            await newRequest.save();
                     return res.send({message:"Your annual leave request has been send to HOD ( Head of your department) with your replacement for the day"});
                          }
                      return res.send({message:"Your annual leave request can not be sent !!!"});

                
    }
   
////////////// Accidental Leaves //////////////////  
  if(newRequest.request_type.toLowerCase().trim()=="accidental"){
    //Accidental leaves can be submitted after the targeted day.
     datereq = new Date(Date.now()); 
    if(datereq.getDate()<=newRequest.request_date.getDate()){
      if(profile.accidental_leave>6){
        return res.send({message:'You have reached your maximum usage of accidental leaves.'});
      }
      else{
        await newRequest.save();
       return res.send({message:"Your Accidental Leave request has been send to HOD."});
      }
      }
    else{
      return res.send({message:'You can not make an accidental leave before the accident happened.'});
    }
     }
  //////////// Sick Leaves ////////////////
  if(newRequest.request_type.toLowerCase().trim()=="sick"){
     datereq = new Date(Date.now()); 
     if(datereq.getTime()-newRequest.request_date.getTime()>=3){
      return res.send({message:'This leave has exceeded the three days limit after the sick day.'});
    }
    if(!newRequest.document){
      return res.send({message:'proper document should be submitted as a link.Please fill the document.'});
    }
    await newRequest.save();
    res.send({message:"Your Sick_Leave request has been send."});
  }
  ///////////// Maternity Leaves ////////////////
  if(newRequest.request_type.toLowerCase().trim()==="maternity"){
    if(gender_mem===true){ // check if female
      if(!newRequest.document){
        return res.send({message:'proper document should be submitted.'});
      }
      else{
        await newRequest.save();
        return res.send({message:"Your Maternity_Leave request has been send."});
      }
    }
  else{
      return res.send({message:'Only Female staff members can have the maternity leave. '});
      }
  } 
  ////////// Compensation Leaves /////////////////   
  if(newRequest.request_type.toLowerCase().trim()==="compensation"){
    console.log("compensations");
    // if(!newRequest.reason){
    //   return res.status(401).send('Reason is required.Please add a reason for you absence.');
    // }
    // if(!newRequest.compensation_date){
    //   return res.status(401).send('Compensation Date is required.Please add a compensation date for your compensation.');
    // }
    
    // if(checkGUCMonth(newRequest.request_date,newRequest.compensation_date)){
    //   var day=newRequest.compensation_date.getDay();
    //   switch(day){
    //     case 0:if(profile.day_off.toLowerCase().trim()==="sunday"){
    //               await newRequest.save();
    //             return res.send("Your Compensation_Leave request has been send.");
    //             } break;
    //     case 1:if(profile.day_off.toLowerCase().trim()==="monday"){
    //                 await newRequest.save();
    //                 return res.send("Your Compensation_Leave request has been send.");
    //                 } break;
    //     case 2:if(profile.day_off.toLowerCase().trim()==="tuesday"){
          
    //               await newRequest.save();
    //               return res.send("Your Compensation_Leave request has been send.");
    //               } break;
    //     case 3:if(profile.day_off.toLowerCase().trim()==="wednesday"){
    //               await newRequest.save();
    //               return res.send("Your Compensation_Leave request has been send.");
    //               } break;
    //     case 4:if(profile.day_off.toLowerCase().trim()==="thursday"){
    //                 await newRequest.save();
    //                 return res.send("Your Compensation_Leave request has been send.");
    //                 } break;
    //     case 6:if(profile.day_off.toLowerCase().trim()==="saturday"){
    //                 await newRequest.save();
    //                 return res.send("Your Compensation_Leave request has been send.");
    //                 } break;
    //     default:
    //         return res.send("Please choose your compensation as your day off.");
    //               } 
    //               return res.status(401).send('Compensation Date is not your day off. Please choose another day.');
    
    // }else{
    //   return res.status(401).send('Compensation Date is not in the same month.To avoid salary deduction please choose another day in the same month. ');
    // }
  }
} catch (err) {
      console.log(err);
      }
      });

      //--------------------------------------------------------------------------------
//6- notify if request accepted or rejected

router.route('/academicMember/notifications')
.get(async (req, res)=>{
  const result = await auth(req,res);
  console.log(result);
  if(!result){
      return res.send("Authenication failed")
  }
  const profile  = await staff_model.findOne({id:result.id});
  if(!profile){
      return res.send("This account does not exist")
  } 
  if (profile.role1.toLowerCase().trim()!=="ta"){
    return res.send("Only TAs can accept access")
}
  const requests=await request_model.find({sending_staff:profile.id, seen:false});
    if(requests.lenghth==0){
        return res.json({
            error:"you dont have any notification."
        });
    } 
 
    requests.forEach(async request=>{
      if(request.modified===true){  
        
        request.modified=false;
        // request.seen=true;
        request.date_modified=new Date(Date.now());
        await request.save();
    }})

    return res.json({
      error:"Your request has been modified",
    requests});

});


router.route('/academicMember/setNotificationSeen')
.post(async (req, res)=>{
  const result = await auth(req,res);
  console.log(result);
  console.log(req.body.id)
  if(!result){
      return res.send("Authenication failed")
  }
  const profile  = await staff_model.findOne({id:result.id});
  if(!profile){
      return res.send("This account does not exist")
  } 
  if (profile.role1.toLowerCase().trim()!=="ta"){
    return res.send("Only TAs can accept access")
}
try {
  const requests=await request_model.updateOne({_id:req.body.id},{$set:{seen:true}});

} catch (error) {
  return res.json({
    error:"Your request has been modified",
  requests});
}
    

});


//-----------------------------------------------------------------------------------------
// 7- view all status of requests
///// view all submitted requests ////
router.route('/academicMember/viewAllRequests')
.get(async (req, res)=>{
  const result = await auth(req,res);
  console.log(result);
  if(!result){
      return res.send("Authenication failed")
  }
  const profile  = await staff_model.findOne({id:result.id});
  if(!profile){
      return res.send("This account does not exist")
  } 
  if (profile.role1.toLowerCase().trim()!=="ta"){
    return res.send("Only TAs can accept access")
}
  const requests = await request_model.find({sending_staff:profile.id});

try{
    if(!requests[0]){
        return res.json({
            error:"you dont have any request(s) to view."
        });
    }
    return res.json({
        error:"These are all your submitted requests.",
        requests
  
    });

} catch(error) {
    console.log(error);
}       
});
/////// view all accepted requests  ////
router.route('/academicMember/viewAcceptedRequests')
.get(async (req, res)=>{
  const result = await auth(req,res);
  console.log(result);
  if(!result){
      return res.send("Authenication failed")
  }
  const profile  = await staff_model.findOne({id:result.id});
  if(!profile){
      return res.send("This account does not exist")
  } 
  if (profile.role1.toLowerCase().trim()!=="ta"){
    return res.send("Only TAs can accept access")
}
  const requests = await request_model.find({sending_staff:profile.id,status:"accepted"});
try{
    if(!requests[0]){
        return res.json({
            error:"you dont have any accepted request(s) to view."
        });
    }
    return res.json({
        error:"These are all your accepted requests.",
        requests
    });
} catch(error) {
    console.log(error);
}       
});
//view all rejected requests
router.route('/academicMember/viewRejectedRequest')
.get(async (req, res)=>{
  const result = await auth(req,res);
  console.log(result);
  if(!result){
      return res.send("Authenication failed")
  }
  const profile  = await staff_model.findOne({id:result.id});
  if(!profile){
      return res.send("This account does not exist")
  } 
  if (profile.role1.toLowerCase().trim()!=="ta"){
    return res.send("Only TAs can accept access")
}
  const requests = await request_model.find({sending_staff:profile.id , status:"rejected"});
try{
    if(requests.length===0){
        return res.json({
            error:"you dont have any rejected request(s) to view."
        });
    }
    return res.json({
        error:"These are all your rejected requests.",
        requests
    });
} catch(error) {
    console.log(error);
}       
});
// view all pending request 
router.route('/academicMember/viewPendingRequest')
.get(async (req, res)=>{
  const result = await auth(req,res);
  console.log(result);
  if(!result){
      return res.send("Authenication failed")
  }
  const profile  = await staff_model.findOne({id:result.id});
  if(!profile){
      return res.send("This account does not exist")
  } 
  if (profile.role1.toLowerCase().trim()!=="ta"){
    return res.send("Only TAs can accept access")
}
try{
  const requests = await request_model.find({sending_staff:profile.id , status:"pending"});
    if(requests.lenghth===0){
        return res.json({
            error:"you dont have any pending request(s) to view."
        });
    }
    return res.json({
        error:"These are all your pending requests.",
        requests
    });
} catch(error) {
    console.log(error);
}       
});
//--------------------------------------------------------------------------
// 8- cancel a pending request
router.route('/academicMember/cancelRequest')
.put(async (req, res)=>{
  const result = await auth(req,res);
  console.log(result);
  if(!result){
      return res.send("Authenication failed")
  }
  const profile  = await staff_model.findOne({id:result.id});
  if(!profile){
      return res.send("This account does not exist")
  } 
  if (profile.role1.toLowerCase().trim()!=="ta"){
    return res.send("Only TAs can accept access")
}
 try{ 
  var reqId= req.body.request_id;
  const requests=await request_model.find({_id:reqId});
    
    if(requests.length===0){
        return res.json({
            error:"This request ID does not exist."
        });
    }
    if(requests[0].status.toLowerCase().trim()==="pending"){
       await request_model.updateOne({_id:reqId}, {status:"cancelled"});
       return res.json({
          error:"your request has been cancelled"});
    }
    var datereq = new Date(Date.now());  // dateStr you get from mongodb
    var d = datereq.getDate();
    var m = datereq.getMonth()+1;
    var y= datereq.getFullYear();  

   if(requests[0].request_date>datereq){ 
      await request_model.updateOne({_id:reqId},{status:"cancelled"});
      return res.json("your request has been cancelled" );  
    }
    else{
      return res.json({
        error:"Request can not be cancelled as its day has already passed." });  
    }
}
catch(error) {
  console.log(error);
}  
});
module.exports =router;
