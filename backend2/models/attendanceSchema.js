const mongoose =require('mongoose')



const record = new mongoose.Schema({
    day:{
        type: Date,
        required:true,
    },
    status:{
        type:String,
        default: "missing"
    },
    signs:[{
        signIn:{
            type:Date
        },
        signOut:{
            type:Date
        }
    }],
    missing_hours:{
        type: Number,
        default:30240
    }
});

let attendanceSchema= new mongoose.Schema({
    staff_id:{
        type:String,
        required: true,
        unique:true
    },
    attendance:{
        type:[record],
        default:[]}
});

module.exports=mongoose.model('attendance', attendanceSchema);
