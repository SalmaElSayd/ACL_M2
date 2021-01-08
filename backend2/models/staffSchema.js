const mongoose =require('mongoose')
// var regex = /ac-|hr-/;
// const DaysEnum = Object.freeze({"saturday":1, "sudnday":2, "monday":3, "tuesday":4, "wednesday":5, "thursday":6, "friday": 7});




const slot = new mongoose.Schema({
    id:{ //
        type: Number ,
        min: 1,
        max: 5,
        required:true
    },
    type:{ // 
    type:String,
    required:true
    },
    date:{ //
        type: Date
    },
    replacement:{ //
        type:Boolean,
        default:false
    },
    location_id:{ //
        type:String
    },
    course_id:{ //
        type:String
    },
    group:{ //
        type:String
    }
});
// slot.index({
//     id:{ //
//         type: Number ,
//         min: 1,
//         max: 5,
//         required:true
//     },
//     location_id:{ //
//         type:String
//     },
//   }, {
//     sparse: true
//   });
const staffSchedule = new mongoose.Schema({
    saturday:{
        type:[slot],
        default:[]
    },
    sunday:{
        type:[slot],
        default:[]
    },
    monday:{
        type:[slot],
        default:[]
    },
    tuesday:{
        type:[slot],
        default:[]
    },
    wednesday:{
        type:[slot],
        default:[]
    },
    thursday:{
        type:[slot],
        default:[]
    }
});

let staffSchema = new mongoose.Schema({
    
    id : { 
        type:String,
        required: true,
        unique:true
    },
    name:{
        type:String,
        minlength :2
    },
    gender:{ //true: female
        type:Boolean,
        required:true
    },
    password:{
        type:String,
        required: true
    },
    first_login:{
        type:Boolean,
        default:true
    },
    salary:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true, 
        unique: true
    },   
    day_off:{
        type:String,
        required: true,
        default:"Saturday"
    },
    office_location:{
        type:String,
        required:true
    },
    leave_balance:{
        type:Number,
        required:true, 
        default:2.5
    },
    schedule:staffSchedule,//set a default
    role1:{
        type:String, //HR/Instructor/TA
        required:true
    },
    role2:{
        type:String, //HOD/Coordinator
    },
    faculty:{
        type:String,
    },
    department:{
        type:String,
    },
    courses:{
        type:[String],
        default:[]},
    info:{
        type:String
    }, 
    accidental_leave:{
        type:Number,
        required:true, 
        default:0
    }

});
module.exports.staffsched=mongoose.model('staffSchedule', staffSchedule);
module.exports.staff=mongoose.model('Staff', staffSchema);