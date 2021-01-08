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
    taken:{
        type:Boolean,
        default:false 
    },
    date:{ //
        type: Date
    },
    day:{
        type:String,
        required:true
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
//     id: 1,
//     day:1,
//     location_id:1,
//    }
//    //, {
// //     unique: true,
// //   }
//   );
//add course schedule
let course = new mongoose.Schema({
    id:{
        type:String,
        unique:true,
        required:true
    },
    credit_hours:{
        type:Number
    },
    coverage:{ //check with ahmed emad
        type:Number,
        required:true,
        default:1
    },
    instructor_ids:{
        type:[String], 
        default:[]
    },
    academic_member_ids:{
        type:[String],
        default:[]},
    coordinator_id:String,
    course_schedule:{
        type:[slot],
        default:[]
    }
});

let department = new mongoose.Schema({
    id:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        unique:true
    },
    head_id:{
        type:String,
        unique:true
    },
    courses:{
        type:[course],
        default:[]}

});


let faculty = new mongoose.Schema({
    name:{
        type:String, 
        required:true, 
        unique:true
    },
    departments:{
        type:[department], 
        default:[]}

});

module.exports=mongoose.model('faculty', faculty);