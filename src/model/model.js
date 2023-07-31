const mongoose = require("mongoose");
const manviDataschema = new mongoose.Schema({
    firstName: {
       type:String
    },
    middelName: {
       type:String
    },
    lastName: {
       type:String
    },
    email: {
        type:String
    },
    phoneNu: {
        type:String
    },
    dateOfBarith: {
        type:Number
    }
})
const manviData = mongoose.model("manviData", manviDataschema);
module.exports={manviData}