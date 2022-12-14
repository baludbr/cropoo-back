const mongoose = require('mongoose');
const bookingproduct = new mongoose.Schema({
farmername:{
    type:String,
    required:true
},
farmeraddress:{
    type:String,
    required:true
},
mail:{
    type:String,
    required:true
},
phonenum:{
    type:String,
    required:true
},
godownname:{
    type:String,
    required:true
},
godownaddress:{
    type:String,
    required:true
},
storageno:{
    type:String,
    required:true
},
croptype:{
    type:String,
    required:true
},
quantity:{
    type:String,
    required:true
},
amount:{
    type:String,
    required:true
},
date:{
    type:Date,
    default:Date.now
}
})
module.exports=mongoose.model('RegisteredProducts',bookingproduct)
