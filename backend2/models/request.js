const mongoose =require('mongoose')

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

const request = new mongoose.Schema({
    seen:{
        type:Boolean,
        default:false
    },
    sending_staff:{
        type:String,
        required:true
    }, 
    receiving_staff:{
        type:String,
        required:true
    },
    request_date:{
        type:Date,
         default:new Date(Date.now())
        },
    replacement_id: {
        type:[String],
        default:[]
    },
    document: {
        type:String
    },
    compensation_date:{
        type:Date
    },
    date_sent:{
        type:Date,
        required:true,
        default:new Date(Date.now())
    },
    request_type:{ // annual, accidental, sick, maternity, compensation, change day off, slot linking, replacement 
        type:String, 
        required:true
    },
    reason:{
        type:String
    },
    status:{
        type:String, //  pending, accepted, rejected, cancelled
        default:"pending"
    },
    course_id:{
        type:String
    },
    hod_comment:{
        type:String
    },
    new_day_off:{
        type:String
    },
    req_slot:slot,
    modified:{
        type:Boolean,
        default:false
    },
    date_modified:{
        type:Date,
        default:new Date(Date.now())
        }
});

module.exports=mongoose.model('request', request);