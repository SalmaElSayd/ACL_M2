const mongoose =require('mongoose')


const token_blacklist = new mongoose.Schema({

    token: String

});

module.exports=mongoose.model('token_blacklist', token_blacklist);
