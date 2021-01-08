const mongoose =require('mongoose')



// const slot = new mongoose.Schema({
//     id:{ //
//         type: Number ,
//         min: 1,
//         max: 5,
//         required:true
//     },
//     type:{ // 
//     type:String,
//     required:true
//     },
//     date:{ //
//         type: Date
//     },
//     replacement:{ //
//         type:Boolean,
//         default:false
//     },
//     location_id:{ //
//         type:String
//     },
//     course_id:{ //
//         type:String
//     },
//     group:{ //
//         type:String
//     }
// });

// const locationSchedule = new mongoose.Schema({
//     saturday:{
//         type:[slot],
//         default:[]
//     },
//     sunday:{
//         type:[slot],
//         default:[]
//     },
//     monday:{
//         type:[slot],
//         default:[]
//     },
//     tuesday:{
//         type:[slot],
//         default:[]
//     },
//     wednesday:{
//         type:[slot],
//         default:[]
//     },
//     thursday:{
//         type:[slot],
//         default:[]
//     }
// });


let locationSchema = new mongoose.Schema({
    id:{
        type:String,
        unique:true,
        required:true
    },
    type:{ //office/lab/hall/
        type:String
    },
    capacity:{
        type:Number
    },
    taken:{
        type:Number,
        default:0
    }
    
});

// module.exports.locsched=mongoose.model('locationSchedule', locationSchedule);
module.exports=mongoose.model('location', locationSchema);